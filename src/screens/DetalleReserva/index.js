import React, { useEffect, useRef, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
import { AsyncAlert, cancelAppFee, cancelTransfer, colorFondo, comisionStripe, fetchAsociatedStripeIds, formatAMPM, formatDateShort, formatDateWithHour, formatMoney, getImageUrl, getUserSub, mayusFirstLetter, moradoClaro, moradoOscuro, msInDay, redondear, refundPaymentIntent } from '../../../assets/constants';
import HeaderDetalleAventura from '../../navigation/components/HeaderDetalleAventura';

import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Line from '../../components/Line';
import ModalMap from '../../components/ModalMap';
import { DataStore } from '@aws-amplify/datastore';
import { ChatRoom, Fecha, TipoNotificacion, Usuario } from '../../models';
import API from '@aws-amplify/api';
import { Reserva } from '../../models';
import ModalItinerario from '../../components/ModalItinerario';
import { Loading } from '../../components/Loading';
import QRIcon from '../DetalleFecha/components/QRIcon';
import { TipoPago } from '../../models';
import Calendario from '../DetalleFecha/components/Calendario';
import { Comision } from '../../models';
import { Notificacion } from '../../models';
import { ChatRoomUsuarios } from '../../models';
import { sendNotification } from '../../../assets/constants/constant';
import { AventuraUsuarios } from '../../models';






let { width, height } = Dimensions.get("screen")



export default ({ navigation, route }) => {
    //HACER DISTANCIA Y ALTITUD DEPENDIENTE DE SI EXISTE EN LA DB PARA TENER
    //DISTINTAS CATEGORIAS

    const fecha = route.params.fecha
    const setReservas = route.params.setReservas


    // Variables para animaciones (Carrousel fotos y header transparencia)
    const scrollY = useRef(new Animated.Value(0)).current


    const [reserva, setReserva] = useState(route.params.reserva);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState("map");
    const [guia, setGuia] = useState({});

    const [loading, setLoading] = useState(false);

    // Estado del material a llevar ya empacado
    const materialDefault = fecha.material.map(cat => {
        return cat[1].map(e => false)
    })

    useEffect(() => {
        fetchData()
    }, []);
    const itinerario = JSON.parse(fecha.itinerario)

    const inicioItinerario = itinerario[0]
    const medioItinerario = itinerario.length === 3 ? itinerario[1] : false
    const finItinerario = itinerario[itinerario.length - 1]

    const [materialChecked, setMaterialChecked] = useState(materialDefault)


    const selectedPlace = {
        titulo: fecha.puntoReunionNombre,
        ...JSON.parse(fecha.puntoReunionCoords)

    }

    const fetchData = async () => {
        const { guiaID } = await DataStore.query(Reserva, reserva.id)
            .then((r) => {
                setMaterialChecked(r.materialChecked ?
                    JSON.parse(r.materialChecked)
                    :
                    materialDefault
                )
                return r
            })
        // Obtener el usuario y la imagen de las aventuras autorizadas
        DataStore.query(Usuario, guiaID)
            .then(async r => {
                const AventurasAutorizadas = await DataStore.query(AventuraUsuarios)
                    .then(async e => {
                        e = (await Promise.all(e.map(async av => {

                            // Si no es del usuario se cancela
                            if (av.usuario.id !== guiaID) {
                                return false
                            }

                            av = av.aventura

                            const imagenFondo = await getImageUrl(av.imagenDetalle[av.imagenFondoIdx])

                            const titulo = mayusFirstLetter(av.titulo)
                            // Obtener la imagen de fondo
                            return {
                                ...av,
                                imagenFondo,
                                titulo
                            }


                        }))).filter(e => e).slice(0, 4)

                        return e
                    })

                setGuia({
                    ...r,
                    AventurasAutorizadas
                })
            })
    }

    function handleBack() {
        DataStore.query(Reserva, reserva.id)
            .then(r => {
                DataStore.save(Reserva.copyOf(r, (updated) => {
                    updated.materialChecked = JSON.stringify(materialChecked)
                }
                )).catch(e => {
                })
            })

        navigation.pop()

    }

    async function navigateChat() {
        const chat = (await DataStore.query(ChatRoom, e => e.fechaID("eq", fecha.id)))[0]
        navigation.navigate("ChatRoom", { id: chat.id, titulo: chat.name, image: chat.picture })

    }

    function handleNavigateAventura(id) {
        navigation.navigate("DetalleAventura", { id })
    }

    function handlePressMaterial(idxCat, idxItem) {
        let newMaterialChecked = [...materialChecked]

        newMaterialChecked[idxCat][idxItem] = !newMaterialChecked[idxCat][idxItem]

        setMaterialChecked(newMaterialChecked)

    }

    function handleOpenMap() {
        setModalType("map")
        setModalVisible(true)
    }

    function handleOpenItinerario() {
        setModalType("itinerario")
        setModalVisible(true)
    }

    async function handleCancel() {
        const {
            dateModified,
            fechaInicial
        } = fecha
        const {
            pagoID,
            id
        } = reserva



        const efectivo = reserva.tipoPago === TipoPago.EFECTIVO ? true : false

        try {
            // Si fue en efectivo solamente cancelarlo
            if (efectivo) {
                await AsyncAlert("Atencion", "¿Seguro que quieres cancelar la fecha?")
                setLoading(true)

            }

            // Si fue pago con tarjeta
            else {
                let aDevolver = reserva.total - comisionStripe(reserva.total)

                // Si se cambio la fecha no se cobra comision al usuario mas que la de stripe
                if (dateModified) {
                    await AsyncAlert("Atencion", "¿Seguro que quieres cancelar la fecha?, se devolveran " + (formatMoney(aDevolver, true)) + " por comisiones de cancelacion")

                    setLoading(true)

                }

                // Si fue con tarjeta pero no se cambio la fecha, se cobra comision al usuario y detecta si ya paso el plazo de cancelacion
                else {
                    // No poder cancelar si faltan 24 horas para la fecha 
                    if (fechaInicial - new Date().getTime() < (msInDay)) {
                        await AsyncAlert("Atencion", "Faltando 24 horas para la fecha ya no es posible cancelarla")
                        return
                    } else {
                        // Restarle 20 por comision de plataforma por cancelacion
                        aDevolver -= 20

                        await AsyncAlert("Atencion", "¿Seguro que quieres cancelar la fecha?, se devolveran " + (formatMoney(aDevolver, true)) + " por comisiones de cancelacion")
                        setLoading(true)

                    }
                }


                /////////////////////////////////////////////////////////
                //////////////// Cancelar desde stripe //////////////////
                /////////////////////////////////////////////////////////
                // Obtener info del pago
                const {
                    otherFees,
                    transferID,
                    fee,
                } = await fetchAsociatedStripeIds(pagoID)

                let promises = []
                // Devolver una parte del pago quitandole la comision
                promises.push(refundPaymentIntent(pagoID, aDevolver)
                    .then(e => {
                        const { error } = e
                        if (error) {
                            throw error
                        }
                    })
                )
                // Devolver solo la comision asociada con la reserva
                promises.push(cancelAppFee(fee.id, reserva.comision)
                    .then(e => {
                        const { error } = e
                        if (error) {
                            throw error
                        }
                    }))

                // Cancelar transferencia
                promises.push(cancelTransfer(transferID)
                    .then(e => {
                        const { error } = e
                        if (error) {
                            throw error
                        }
                    })
                )

                // Esperar a que se cancelen los pagos
                await Promise.all(promises)

                // Si hay comisiones asociadas al pago simplemente habilitarlas con payed = false en datastore
                // otherFees.map(o => {
                //     DataStore.query(Comision, o.id)
                //         .then(c => {
                //             DataStore.save(Comision.copyOf(c, com => {
                //                 com.payed = false
                //                 com.pagadoEnReservaID = null
                //                 com.editing = false
                //             }))
                //         })
                // })
            }

            const sub = await getUserSub()

            // Borrar notificaciones de recordatorio asociadas
            DataStore.query(Notificacion, not => not
                .reservaID("eq", reserva.id)
                .usuarioID("eq", sub)
                .or(
                    r => r
                        .tipo("eq", TipoNotificacion.RECORDATORIOFECHA)
                        .tipo("eq", TipoNotificacion.CALIFICAUSUARIO)
                )
                .fechaID("eq", fecha.id)
            ).then(r => {
                console.log("Notificaciones borrando: ", r.length)
                r.map(not => {
                    DataStore.delete(not)
                })
            })

            const client = await DataStore.query(Usuario, reserva.usuarioID)

            // Agregar notificacion de califica al guia
            DataStore.save(
                new Notificacion({
                    tipo: TipoNotificacion.CALIFICAUSUARIO,

                    titulo: "Califica al usuario",
                    descripcion:
                        (client.nombre ? mayusFirstLetter(client.nombre) : client.nickname) + " ayudanos a hacer de Velpa un lugar mejor, calfica a " +
                        guia.nickname +
                        " en " +
                        fecha.tituloAventura,

                    showAt: new Date().getTime(),

                    usuarioID: reserva.usuarioID,
                    aventuraID: fecha.aventuraID,

                    imagen: fecha.imagenFondo,

                    guiaID: guia.guiaID,
                })
            );

            // Mandar notificacion de reserva cancelada al guia
            sendNotification({
                titulo: "Usuario cancelado",
                descripcion: "El usuario @" + client.nickname + " ha cancelado su reserva",
                showAt: new Date().getTime(),
                reservaID: reserva.id,
                tipo: TipoNotificacion.RESERVACANCELADA,
                usuarioID: fecha.usuarioID,
                token: guia.notificationToken
            })

            // Mandar notificacion de reserva cancelada con exito al usuario
            sendNotification({
                titulo: "Reserva cancelada",
                descripcion: "La reserva en " + fecha.tituloAventura + " ha sido cancelada" + (!efectivo ? "\nEn caso de no reembolsarse tu pago dentro de 5 a 10 dias habiles contacta a soporte" : ""),
                reservaID: reserva.id,
                tipo: TipoNotificacion.RESERVACANCELADA,
                usuarioID: reserva.usuarioID,
            })

            // Quitar relacion de usuario chatroom
            DataStore.query(ChatRoom, c => c.fechaID("eq", reserva.fechaID))
                .then(r => {
                    r = r[0]
                    DataStore.query(ChatRoomUsuarios, c => c
                        .chatroom("eq", r)
                    )
                        // Mapear las relaciones chatUsuario y borrar la que coincida con el usuario id
                        .then(r => {
                            r = r.find(chat => chat.usuario.id === reserva.usuarioID)
                            if (!r) {
                                console.log("No hay chat asociado")

                                return
                            }
                            DataStore.delete(r)
                        })
                })

            // Poner la reserva en cancelado
            DataStore.query(Reserva, reserva.id)
                .then(async r => {
                    await DataStore.save(Reserva.copyOf(r, r => {
                        r.cancelado = true
                        r.canceledAt = new Date().toISOString()
                    }))

                    Alert.alert("Exito", "Reserva cancelada con exito")
                    setReserva(r)

                    setReservas(old => {
                        const idx = old.findIndex(e => e.id === r.id)

                        old[idx] = {
                            ...r,
                            reserva: r,
                            fecha: fecha,
                            pasada: fecha.fechaInicial < new Date()
                        }

                        return [...old]
                    })

                    setLoading(false)
                })
        } catch (error) {
            setLoading(false)
            if (error !== "Cancelada") {
                console.log(error)
                Alert.alert("Error", "Error cancelando la reserva")
            }
        }

    }

    function handleQR() {
        const {
            tituloAventura,
            fechaInicial,
            fechaFinal,
            imagenFondo

        } = fecha

        navigation.navigate("QRCode", {
            ...reserva,
            tituloAventura,

            nickname: guia?.nickname,
            fechaInicial,
            fechaFinal,
            imagenFondo,
            personas: reserva.adultos + reserva.tercera + reserva.ninos,


        })
    }

    async function deleteReserva() {
        setLoading(true)
        await DataStore.delete(reserva)

        // Guardar estado de mis reservas
        setReservas((old) => {
            const idx = old.findIndex(o => o.id === reserva.id)
            old.splice(idx, 1)
            return [...old]
        })

        navigation.pop()
        Alert.alert("Exito", "Reserva eliminada con exito")
        setLoading(false)
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}

                style={styles.container}>
                <Image
                    source={{ uri: fecha.imagenFondo }}
                    style={styles.imagenFondo}
                />

                <View style={styles.bodyContainer}>

                    {/* Titulo cantidad y estatus tarjeta/efectivo */}
                    <View style={styles.row}>
                        <Text
                            numberOfLines={1}
                            style={styles.title}>{fecha.tituloAventura}
                        </Text>

                        {!reserva.cancelado && <View style={{
                            alignItems: 'center',
                        }}>

                            <Text style={{ ...styles.title, color: moradoOscuro, }}>{formatMoney(reserva.total, true)} </Text>
                            {
                                reserva.tipoPago === TipoPago.TARJETA && <AntDesign style={{ marginTop: 5, }} name="creditcard" size={22} color={moradoOscuro} />
                            }
                        </View>}
                    </View>

                    {reserva.cancelado && <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'red',
                        textAlign: 'center',
                        marginTop: 10,
                    }}>
                        Reserva cancelada
                    </Text>}

                    <View style={{
                        alignItems: 'center',
                    }}>

                        {(!reserva.cancelado && reserva.tipoPago === TipoPago.EFECTIVO) && <Text
                            style={{
                                fontSize: 16,
                                color: 'orange',
                                marginTop: 10,
                            }}>Recuerda llevar tu pago en efectivo</Text>}
                    </View>




                    {fecha.descripcion ? <View style={{ ...styles.row, marginVertical: 10, }}>
                        <Text style={styles.descripcion}>{fecha.descripcion}</Text>
                    </View>
                        :
                        null
                        // < View style={{ marginTop: 30, }} />
                    }

                    <Line />


                    <Calendario
                        editDisabled={true}
                        denyFechasGuia
                        fecha={fecha}
                    />



                    <Pressable
                        onPress={handleOpenMap}
                        style={{
                            marginTop: 40,
                        }}
                    >

                        <Text style={{
                            marginVertical: 10,
                        }}>Punto de reunion: </Text>
                        <View
                            style={styles.reunionContainer}>
                            <Ionicons
                                name="location-sharp"
                                size={24}
                                color={moradoOscuro}
                            />
                            <Text style={styles.locationTxt}>{fecha.puntoReunionNombre}</Text>
                        </View>
                    </Pressable>

                    <Line />



                    {/* ITINERARIO */}
                    <Pressable
                        onPress={handleOpenItinerario}
                        style={styles.itinerarioContainer}>


                        <View
                            style={styles.botonItinerario}
                        >

                            <MaterialCommunityIcons
                                name="calendar-text" size={20} color="#fff" />
                        </View>

                        <View style={styles.lineItinerarioContainer}>
                            {/* Linea de itinerario */}
                            <View style={{
                                backgroundColor: '#E5E5E5',
                                height: 10,
                                borderRadius: 10,
                                width: '100%',
                            }} />

                            {/* 3 Bolitas de itinerario */}
                            <View style={{ ...styles.bolita, left: 0, }} />
                            <View style={styles.bolita} />
                            <View style={{ ...styles.bolita, right: 0, }} />
                        </View>


                        {/* Itinerario textos */}
                        <View style={{ flexDirection: 'row', }}>

                            <View style={styles.itinerarioItem}>
                                <Text style={styles.dayItinerario}>{formatDateShort(inicioItinerario.hora)}</Text>
                                <Text style={styles.titleItinerario}>{inicioItinerario.titulo}</Text>
                                <Text style={styles.horaItinerario}>{formatAMPM(inicioItinerario.hora)}</Text>
                            </View>

                            {medioItinerario ? <View style={styles.itinerarioItem}>
                                <Text style={styles.dayItinerario}>{formatDateShort(medioItinerario.hora)}</Text>
                                <Text style={styles.titleItinerario}>{medioItinerario.titulo}</Text>
                                <Text style={styles.horaItinerario}>{formatAMPM(medioItinerario.hora)}</Text>
                            </View> :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, }}>
                                    <Entypo name="dots-three-horizontal" size={24} color="#999" />
                                </View>}

                            <View style={styles.itinerarioItem}>
                                <Text style={styles.dayItinerario}>{formatDateShort(finItinerario.hora)}</Text>
                                <Text style={styles.titleItinerario}>{finItinerario.titulo}</Text>
                                <Text style={styles.horaItinerario}>{formatAMPM(finItinerario.hora)}</Text>
                            </View>

                        </View>

                    </Pressable>

                    <Line style={{ marginTop: 40, }} />

                    {/* Guia de la aventura */}
                    <View style={styles.guiaContainer}>
                        <Image
                            source={guia.foto ? { uri: guia.foto } : require("../../../assets/user.png")}
                            style={styles.imagenGuia}
                        />

                        <Text style={styles.guiaNickname}>{guia.nickname}</Text>

                        <View
                            style={{ ...styles.botonItinerario, marginRight: 0, marginBottom: 0, }}
                        >
                            <Ionicons
                                onPress={navigateChat}
                                name="chatbox" size={20} color="white" />
                        </View>

                    </View>


                    {/* Aventuras sugeridas del guia */}
                    {!guia.AventurasAutorizadas ?
                        <View style={{ height: 180, }}>
                            <Loading indicator />

                        </View>
                        :
                        guia.AventurasAutorizadas?.length > 0 && <View style={{ flex: 1, height: 180, flexDirection: 'row', }}>
                            <Pressable
                                onPress={() => handleNavigateAventura(guia.AventurasAutorizadas[0]?.id)}
                                style={{ flex: 1, marginRight: 5, }}>
                                <Image
                                    source={{ uri: guia.AventurasAutorizadas[0]?.imagenFondo }}
                                    style={{ flex: 1, }}
                                />

                                <Text style={styles.titleAventura}
                                    numberOfLines={1}
                                >{guia.AventurasAutorizadas[0]?.titulo}</Text>

                                <LinearGradient
                                    colors={['rgba(40, 46, 192, 0)', 'rgba(40, 46, 192, .7)',]}
                                    style={styles.linearGradient}
                                />
                            </Pressable>
                            {guia?.AventurasAutorizadas[1]?.imagenFondo && <View style={{ flex: 2, marginLeft: 5, }}>
                                <Pressable
                                    onPress={() => handleNavigateAventura(guia.AventurasAutorizadas[1]?.id)}
                                    style={{ flex: 1, marginBottom: guia?.AventurasAutorizadas[2]?.imagenFondo ? 5 : 0, }}>
                                    <Image
                                        source={{ uri: guia.AventurasAutorizadas[1]?.imagenFondo }}
                                        style={{ flex: 1, }}
                                    />

                                    <Text style={styles.titleAventura}
                                        numberOfLines={1}
                                    >{guia.AventurasAutorizadas[1]?.titulo}</Text>

                                    <LinearGradient
                                        colors={['rgba(40, 46, 192, 0)', 'rgba(40, 46, 192, 1)',]}
                                        style={styles.linearGradient}
                                    />

                                </Pressable>
                                {guia?.AventurasAutorizadas[2]?.imagenFondo && <View style={{ flex: 1, marginTop: 5, flexDirection: 'row', }}>
                                    <Pressable
                                        onPress={() => handleNavigateAventura(guia.AventurasAutorizadas[2]?.id)}
                                        style={{ flex: 1, marginRight: 5, }}>
                                        <Image
                                            source={{ uri: guia.AventurasAutorizadas[2]?.imagenFondo }}
                                            style={{ flex: 1, }}
                                        />

                                        <Text style={styles.titleAventura}
                                            numberOfLines={1}
                                        >{guia.AventurasAutorizadas[2]?.titulo}</Text>

                                        <LinearGradient
                                            colors={['rgba(40, 46, 192, 0)', 'rgba(40, 46, 192, 1)',]}
                                            style={styles.linearGradient}
                                        />

                                    </Pressable>
                                    {guia?.AventurasAutorizadas[3]?.imagenFondo && <Pressable
                                        onPress={() => handleNavigateAventura(guia.AventurasAutorizadas[3]?.id)}
                                        style={{ flex: 1, marginLeft: 5, }}>
                                        <Image
                                            source={{ uri: guia.AventurasAutorizadas[3]?.imagenFondo }}
                                            style={{ flex: 1, }}
                                        />

                                        <Text style={styles.titleAventura}
                                            numberOfLines={1}
                                        >{guia.AventurasAutorizadas[3]?.titulo}</Text>

                                        <LinearGradient
                                            colors={['rgba(40, 46, 192, 0)', 'rgba(40, 46, 192, 1)',]}
                                            style={styles.linearGradient}
                                        />


                                    </Pressable>}
                                </View>}
                            </View>}
                        </View>}

                    <View style={{ marginTop: 40, }} />

                    {!reserva.cancelado && <View style={{

                    }}>

                        <Text style={[styles.title, { marginBottom: 5, }]}>Incluido:</Text>

                        {fecha.incluido?.map((e, idx) => {
                            return <Text
                                key={idx}
                                style={{ fontSize: 16, marginLeft: 10, marginBottom: 4, }}>{e}</Text>
                        })}

                        <View style={{ marginTop: 40, }} />

                        {/* Que llevar */}
                        {
                            fecha.material.map((e, idxCat) => {
                                return <View
                                    key={idxCat.toString()}
                                    style={styles.queLlevarContainer}>

                                    <Text style={[styles.title, { marginBottom: 5, }]}>{e[0]}:</Text>
                                    {
                                        e[1].map((item, idxItem) => {
                                            return <Pressable
                                                onPress={() => handlePressMaterial(idxCat, idxItem)}
                                                key={idxItem.toString()}
                                                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>


                                                <AntDesign
                                                    style={{ ...styles.checkIcon, borderColor: materialChecked[idxCat][idxItem] ? "transparent" : moradoOscuro, }}
                                                    name="checkcircle"
                                                    size={24}
                                                    color={materialChecked[idxCat][idxItem] ? moradoOscuro : "transparent"}
                                                />
                                                <Text style={{ fontSize: 16, marginLeft: 10, }}>{item}</Text>

                                            </Pressable>
                                        })
                                    }
                                </View>
                            })
                        }
                    </View>}
                </View>

            </Animated.ScrollView >


            <HeaderDetalleAventura
                scrollY={scrollY}
                height={height * 0.5}
                handleBack={handleBack}
                titulo={fecha.tituloAventura}

                IconRight={!reserva.cancelado ? () => <QRIcon
                    trash={reserva.cancelado ? true : false}
                    handleQR={handleQR} /> : null}

            />
            {
                modalType === "map" ?
                    <ModalMap
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}

                        selectedPlace={selectedPlace}

                    />
                    :
                    <ModalItinerario
                        puntoReunion={{
                            latitude: JSON.parse(fecha.puntoReunionCoords).latitude,
                            longitude: JSON.parse(fecha.puntoReunionCoords).longitude,
                            titulo: fecha.puntoReunionNombre
                        }}

                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}

                        itinerario={itinerario}


                    />
            }



            {loading && <View style={{
                backgroundColor: '#00000099',
                alignItems: 'center', justifyContent: 'center',
                width: '100%',
                height: '100%',
                position: 'absolute',
            }}>
                <ActivityIndicator
                    size={"large"}
                    color={moradoOscuro}
                />
            </View>}

            {/* Cancelar reserva*/}
            {!reserva.cancelado && <View style={{
                width: '100%',
                backgroundColor: colorFondo,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
            }}>
                <Pressable
                    onPress={() => {
                        if (reserva.cancelado) {
                            return
                        }
                        if (loading) {
                            Alert.alert("Espera", "Cancelacion en proceso")
                        } else {
                            handleCancel()
                        }
                    }}
                >
                    <Text style={{ ...styles.textCancel, color: "red" }}>{loading ? "Cancelando..." : "Cancelar"}</Text>
                </Pressable>


            </View>}

        </View >
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    imagenFondo: {
        width: '100%',
        height: height / 3,
    },

    bodyContainer: {
        backgroundColor: '#fff',
        width: '100%',
        top: -30,
        borderRadius: 30,
        padding: 20,
        paddingTop: 25,
    },

    title: {
        fontSize: 16,
        fontWeight: "bold",
    },


    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    descripcion: {
        lineHeight: 19,
        color: 'gray',
    },

    fechaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: 10,
    },


    fechaTxt: {
        marginLeft: 10,
        fontSize: 16,
        color: "#000",
        textAlign: 'center',
    },
    fechaTitle: {
        color: moradoOscuro,
    },


    reunionContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },

    locationTxt: {
        textAlign: 'center',
        flex: 1,
        color: moradoOscuro,
    },

    itinerarioContainer: {
        marginTop: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        left: -20,
        width,
    },

    lineItinerarioContainer: {
        flexDirection: 'row',
        marginHorizontal: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },

    bolita: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: moradoOscuro,
        position: 'absolute',
    },

    botonItinerario: {
        padding: 7,
        backgroundColor: moradoOscuro,
        borderRadius: 20,
        marginBottom: 20,
        marginRight: 20,
    },

    itinerarioItem: {
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },

    dayItinerario: {
        position: 'absolute',
        top: -40,
        fontWeight: 'bold',
        color: '#000',
    },

    titleItinerario: {
        marginTop: 5,
        color: '#000',
        textAlign: 'center',
    },

    horaItinerario: {
        marginTop: 10,
        textAlign: 'center',
        color: '#999',
        fontWeight: 'bold',
    },

    guiaContainer: {
        flexDirection: 'row',
        marginVertical: 30,
        alignItems: 'center',
    },
    guiaNickname: {
        fontSize: 16,
        flex: 1,
    },

    imagenGuia: {
        width: 33,
        height: 33,
        borderRadius: 33,
        marginRight: 10,
    },

    linearGradient: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

    titleAventura: {
        zIndex: 1,
        position: 'absolute',
        bottom: 5,
        width: '90%',
        // fontSize: 16,
        color: '#fff',
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
    },

    queLlevarContainer: {
        marginVertical: 15,

    },

    checkIcon: {
        borderRadius: 100,
        borderWidth: .5,
    },

    textCancel: {
        color: moradoOscuro,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 20,
        fontSize: 18,
    }

})
