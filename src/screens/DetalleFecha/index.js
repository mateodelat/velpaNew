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


import { colorFondo, formatAMPM, formatDateShort, formatDateWithHour, formatMoney, getImageUrl, getUserSub, mayusFirstLetter, meses, moradoClaro, moradoOscuro, redondear, shadowMarcada } from '../../../assets/constants';
import HeaderDetalleAventura from '../../navigation/components/HeaderDetalleAventura';

import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Line from '../../components/Line';

import { DataStore } from '@aws-amplify/datastore';
import { ChatRoom, Usuario } from '../../models';

import { Reserva } from '../../models';
import ModalItinerario from '../../components/ModalItinerario';
import { Loading } from '../../components/Loading';
import MapView, { Marker } from 'react-native-maps';

import { Fecha } from '../../models';
import DetalleReserva from './DetalleReserva';

import QRScan from '../QRScan';
import Calendario, { calculateMarkedDays } from './components/Calendario';
import ModalMap from '../../components/ModalMap';
import HourEditor from './components/HourEditor';
import Header from '../../components/header';


export const getUsuario = /* GraphQL */ `
  query GetUsuario($id: ID!) {
    getUsuario(id: $id) {
      id
      foto
      nickname
      AventurasAutorizadas(limit:4) {
        items {
            aventura {
                titulo
                id
                imagenFondoIdx
                imagenDetalle
            }
        }
      }
    }
  }
`;



let { width, height } = Dimensions.get("screen")



export default ({ navigation, route }) => {
    //HACER DISTANCIA Y ALTITUD DEPENDIENTE DE SI EXISTE EN LA DB PARA TENER
    //DISTINTAS CATEGORIAS

    const { fecha: fechaGotten, fechaID } =
        route.params



    const [fecha, setFecha] = useState(null);
    // Fecha original para comparaciones de cambio al final
    const [originalDate, setOriginalDate] = useState(null);


    // Tipo modal reserva/ itinerario
    const [tipoModal, setTipoModal] = useState("reserva");

    const [editing, setEditing] = useState(false);

    // Variables para animaciones (Carrousel fotos y header transparencia)
    const scrollY = useRef(new Animated.Value(0)).current

    const [modalVisible, setModalVisible] = useState(false);

    // Reserva seleccionada
    const [actualReservation, setActualReservation] = useState({});

    // Dias seleccionados
    const [markedDays, setMarkedDays] = useState({});

    const [loading, setLoading] = useState(false);




    // Detectar si se manda directamente la fecha de la ruta, si no obtenerla
    useEffect(() => {
        if (fechaGotten) {
            setFecha(fechaGotten)
            setOriginalDate(fechaGotten)

        } else {
            getFecha()
        }


    }, []);




    async function getFecha() {
        if (!fechaID) return


        const fecha = await DataStore.query(Fecha, fechaID)

        const now = new Date()
        const reservas = await DataStore.query(Reserva, res => res.fechaID("eq", fechaID))
        let personasReservadas = []

        await Promise.all(reservas.map(async res => {
            const totalPersonas = res.adultos + res.ninos + res.tercera
            const usuario = await DataStore.query(Usuario, res.usuarioID)
            personasReservadas.push({
                ...res,
                foto: await getImageUrl(usuario.foto),
                nickname: usuario.nickname,
                personasReservadas: totalPersonas,
                precioPagado: res.pagadoAlGuia,
            })
        }))

        let personasReservadasNum = 0
        let precioAcomulado = 0
        let precioAcomuladoSinComision = 0
        reservas.map(e => {
            precioAcomulado += e.total
            precioAcomuladoSinComision += e.pagadoAlGuia
            personasReservadasNum += (e.adultos + e.ninos + e.tercera)
        })


        const f = {
            // Obtener reservas y personas reservadas en la fecha
            ...fecha,
            reservas,
            personasReservadas,

            personasReservadasNum,
            precioAcomulado,
            precioAcomuladoSinComision,

            // imagenFondo: await getImageUrl(fecha.imagenFondo),
            material: JSON.parse(fecha.material),
            incluido: [...(JSON.parse(fecha.incluido)).default.map(e => e),
            ...(JSON.parse(fecha.incluido)).agregado.map(e => e)
            ],
            pasada: fecha.fechaInicial < now

        }
        setOriginalDate(f)
        setFecha(f)

    }


    if (!fecha) {
        return <Loading />
    }


    // Estado del material a llevar ya empacado
    const itinerario = JSON.parse(fecha.itinerario)

    const inicioItinerario = itinerario[0]
    const medioItinerario = itinerario.length === 3 ? itinerario[1] : false
    const finItinerario = itinerario[itinerario.length - 1]


    const selectedPlace = {
        titulo: fecha.puntoReunionNombre,
        ...JSON.parse(fecha.puntoReunionCoords)

    }

    const region = {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        latitudeDelta: 2,
        longitudeDelta: 2,
    }


    async function navigateChat() {
        const chat = (await DataStore.query(ChatRoom, e => e.fechaID("eq", fecha.id)))[0]
        navigation.navigate("ChatRoom", { id: chat.id, titulo: chat.name, image: chat.picture })

    }

    function clearData() {
        const {
            fechaInicial,
            fechaFinal
        } = originalDate

        setMarkedDays(calculateMarkedDays(fechaInicial, fechaFinal, true))
        setFecha(originalDate)

    }

    function handleOpenItinerario() {
        setModalVisible(true)
        setTipoModal("itinerario")

    }

    function handleQR() {
        setModalVisible(true)
        setTipoModal("escaner")
    }

    function handleOpenReservacion(r) {
        setModalVisible(true)
        setTipoModal("reserva")
        setActualReservation(r)
    }

    async function cancelarFecha() {
        Alert.alert("Cancelar fecha", "Cancelar una fecha tiene un costo de 20 pesos mas 10 por persona ya reservada ademas de una calificacion por parte de los usuarios reservados")

    }




    async function codigoEscaneado(scanedID) {

        // Encontrar los ids de reserva y fecha
        const personas = [
            ...fecha.personasReservadas
        ]

        // Mapear todas las personas y ver si existe el id escaneado en las mismas

        const idx = personas.findIndex(e => e.id === scanedID)

        // Si la reserva existe en la fecha y checar si ya paso el cliente 
        if (idx !== -1) {
            if (personas[idx].ingreso) {
                return new Promise((resolve) => {
                    Alert.alert(
                        'Error',
                        'La persona ya ingreso a la fecha',
                        [
                            { text: 'OK', onPress: () => resolve() },
                        ],
                        { cancelable: false }
                    )
                })

            }

            // Asignarle a newPersonas el ingresado y la hora
            let newPersonas = [...personas]
            newPersonas[idx].ingreso = true
            newPersonas[idx].horaIngreso = new Date()

            const newFecha = {
                ...fecha,
                personasReservadas: newPersonas
            }
            console.log(scanedID)
            const reser = await DataStore.query(Reserva, scanedID)
            DataStore.save(Reserva.copyOf(reser, res => {
                res.horaIngreso = new Date().toISOString()
                res.ingreso = true
            }))
                .catch(e => console.log(e))
                .then(r => {
                    console.log(r)
                })
            setFecha(newFecha)

            Alert.alert("Info", "Persona ingresada con exito")
            handleOpenReservacion(newPersonas[idx])

        } else {
            return new Promise((resolve, reject) => {
                Alert.alert(
                    'Error',
                    'La reserva no esta en la fecha',
                    [
                        { text: 'OK', onPress: () => resolve() },
                    ],
                    { cancelable: false }
                )
            })
        }


    }

    async function handleSave() {
        const {
            fechaInicial,
            fechaFinal,
            id
        } = fecha

        // Si no hay fecha final devolver error
        if (!fechaFinal) {
            Alert.alert("Error", "Agrega la hora final")
            return
        }

        const {
            fechaInicial: fechaInicialOrig,
            fechaFinal: fechaFinalOrig
        } = originalDate

        // Si no hubo cambios se devuelve
        if (fechaInicial === fechaInicialOrig && fechaFinalOrig === fechaFinal) {
            setEditing(!editing)
            return
        }

        setLoading(true)
        // Primero ver si hay usuarios reservados en la fecha que no hayan cancelado
        const reservas = await DataStore.query(Reserva, r => r
            .fechaID("eq", id)
        )

        function continuar() {
            setLoading(false)
            setEditing(!editing)
            Alert.alert("Exito", "Fecha actualizada con exito!!")
            // Guardar la fecha y modificar las notificaciones a usuarios
            // DataStore.save(Fecha)


            setOriginalDate({ ...fecha })

        }

        // Revisar si se cambio la fecha inicial y final y si hay reservas en la fecha
        if ((fechaInicial !== fechaInicialOrig || fechaFinal !== fechaFinalOrig) && reservas.length !== 0) {
            Alert.alert("Atencion", "Al cambiar la fecha inicial o final y tener usuarios reservados, se le permite cancelar sin costo y ademas una calificacion a tu perfil\n¿Quieres continuar?", [
                {
                    text: "cancel",
                    onPress: () => {
                        clearData()
                        setLoading(false)
                        setEditing(false)
                    }
                },
                {
                    text: "ok",
                    onPress: continuar
                },
            ])
        }

        // Si no hubo cambios se deja de editar sin guardar datos
        else {
            setEditing(!editing)
            setLoading(false)
        }

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

                    <View style={styles.row}>
                        <Text
                            numberOfLines={1}
                            style={styles.title}>{fecha.tituloAventura}
                        </Text>

                        <Text style={{ ...styles.title, color: "#000", }}>{formatMoney(fecha.precio, true)}<Text style={{ fontWeight: "normal", }}> /persona</Text>
                        </Text>
                    </View>


                    {!!fecha.descripcion && <View style={{ ...styles.row, marginVertical: 10, }}>
                        <Text style={styles.descripcion}>{fecha.descripcion}</Text>
                    </View>
                    }

                    {!!fecha.precioAcomulado && <View style={{
                        flexDirection: 'row',
                        marginTop: 20,
                    }}>
                        <Text style={{ ...styles.title, flex: 1, }}>Suma:</Text>
                        <Text style={{ ...styles.title, color: moradoOscuro, }}>{formatMoney(fecha.precioAcomulado, true)}</Text>

                    </View>}

                    {!!fecha.precioAcomulado && <View style={{
                        flexDirection: 'row',
                    }}>
                        <Text style={{ ...styles.title, flex: 1, }}>Comision:</Text>
                        <Text style={{ ...styles.title, color: moradoOscuro, }}>- {formatMoney(fecha.precioAcomulado - fecha.precioAcomuladoSinComision, true)}</Text>

                    </View>}
                    <View style={{
                        flexDirection: 'row', marginTop: 10,
                    }}>
                        <Text style={{ ...styles.title, flex: 1, }}>Total:</Text>
                        <Text style={{ ...styles.title, color: moradoOscuro, }}>{formatMoney(fecha.precioAcomuladoSinComision, true)}</Text>

                    </View>

                    <Line />

                    <Calendario
                        editDisabled={!editing}
                        fechaID={fecha.id}

                        fecha={fecha}
                        setFecha={setFecha}

                        setMarkedDays={setMarkedDays}
                        markedDays={markedDays}
                    />

                    <View style={{
                        marginTop: 20,
                    }}>
                        <HourEditor
                            fecha={fecha}
                            setFecha={setFecha}

                            enabled={!editing}
                        />

                    </View>
                    <Line />

                    {/* Personas reservadas en la fecha */}
                    {fecha.personasReservadas.length !== 0 ? <View >
                        {/* Titulo */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                marginLeft: 10,
                                flex: 1,
                                fontSize: 16,
                                color: '#000',
                            }}>{fecha.personasReservadasNum}/{fecha.personasTotales} personas reservadas</Text>

                            {!editing && <Ionicons
                                onPress={navigateChat}
                                style={{ ...styles.botonItinerario, marginRight: 0, marginBottom: 0, }} name="chatbox" size={20} color="white" />}

                        </View>

                        {/* Imagenes personas y chat */}
                        {!editing && <View style={{ marginBottom: 20, marginTop: 10, }}>
                            {fecha.personasReservadas.map((persona, i) => {
                                return <Pressable
                                    onPress={() =>
                                        handleOpenReservacion(persona)
                                    }
                                    key={i.toString()}
                                    style={{
                                        marginBottom: 20,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}>

                                    <View style={{
                                        width: 30,
                                        height: 30,
                                        // backgroundColor: 'red',
                                        justifyContent: 'center',
                                    }}>
                                        {
                                            persona.ingreso && <Entypo name="check" size={24} color={moradoOscuro} />
                                        }
                                    </View>

                                    <Image
                                        source={persona.foto ? { uri: persona.foto } : require("../../../assets/user.png")}
                                        style={{
                                            borderRadius: 30,
                                            width: 30,
                                            height: 30,

                                            marginRight: 10,

                                        }}
                                    />

                                    <View style={{ flex: 1, justifyContent: 'center', }}>
                                        <Text style={{
                                            color: "gray",
                                        }}>@{persona.nickname}</Text>
                                    </View>

                                    <View style={{ alignItems: 'flex-end', }}>
                                        <View style={{ flexDirection: 'row', marginBottom: 5, }}>
                                            <Text style={{
                                                color: "gray",
                                            }}>{persona.personasReservadas} </Text>
                                            <Ionicons name="ios-person" size={20} color={"lightgray"} />
                                        </View>
                                        <Text style={{
                                            color: "#000",
                                        }}>{formatMoney(persona.total, true)}</Text>
                                    </View>


                                </Pressable>

                            })}

                        </View>}
                    </View>
                        :
                        <Text style={{
                            marginBottom: 40,
                            height: 30,
                            alignItems: 'center', justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}>No hay personas reservadas</Text>
                    }


                    <Line />


                    <Text style={styles.captionTxt}>Punto de reunion: </Text>
                    <View style={{ height: 300, width: '100%', marginBottom: 40, }}>

                        <MapView
                            onPress={() => {
                                setModalVisible(true)
                                setTipoModal("map")
                            }}

                            onMarkerPress={() => {
                                setModalVisible(true)
                                setTipoModal("map")
                            }}


                            provider={"google"}
                            mapType={"standard"}

                            showsUserLocation={true}
                            loadingEnabled={true}

                            pitchEnabled={false}
                            rotateEnabled={false}
                            zoomEnabled={false}
                            scrollEnabled={false}


                            loadingBackgroundColor={"#fff"}
                            initialRegion={region}

                            style={{ ...StyleSheet.absoluteFill, }}
                        >
                            {/* Marcador de la ubicacion */}
                            {selectedPlace && <Marker
                                coordinate={region}
                            />}

                        </MapView>
                    </View>


                    {/* ITINERARIO */}
                    <Text style={styles.captionTxt}>Itinerario: </Text>
                    <Pressable
                        onPress={handleOpenItinerario}
                        style={styles.itinerarioContainer}>


                        <MaterialCommunityIcons
                            style={styles.botonItinerario}
                            name="calendar-text" size={20} color="#fff" />

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

                    {/* <Ionicons
                        onPress={navigateChat}
                        style={{ ...styles.botonItinerario, marginRight: 0, marginBottom: 0, }} name="chatbox" size={20} color="white" /> */}



                    <View style={{ marginTop: 40, }} />

                    <Text style={[styles.title, { marginBottom: 5, }]}>Incluido:</Text>

                    <Text
                        style={{ fontSize: 16, marginLeft: 10, }}>{fecha.incluido?.map(e => e + "      ")}</Text>

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
                                        return <View
                                            onPress={() => handlePressMaterial(idxCat, idxItem)}
                                            key={idxItem.toString()}
                                            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>

                                            <Text style={{ fontSize: 16, marginLeft: 10, }}>{item}</Text>

                                        </View>
                                    })
                                }
                            </View>
                        })
                    }
                </View>



            </Animated.ScrollView >


            <HeaderDetalleAventura
                scrollY={scrollY}
                height={height * 0.5}
                titulo={fecha.tituloAventura}

                IconLeft={({ style }) => <Pressable style={style}
                    onPress={() => {
                        if (editing) {
                            clearData()
                            setEditing(false)
                        }
                        else navigation.pop()

                    }}>
                    {editing ?
                        <Feather
                            name={"x"}
                            size={30}
                            color={moradoOscuro}
                        />

                        : <MaterialIcons
                            name={"keyboard-arrow-left"}
                            size={35}
                            color={moradoOscuro}
                        />

                    }
                </Pressable>}

                IconRight={() => <Pressable
                    onPress={() => {
                        if (loading) {
                            return
                        }
                        // Si se estaba editando se guarda
                        if (editing) {
                            handleSave()
                        } else {
                            setEditing(!editing)

                        }
                    }}
                    style={{
                        height: 43,
                        width: 43,
                        alignItems: 'center', justifyContent: 'center',

                        borderRadius: 25,

                        backgroundColor: '#fff',
                    }}>
                    {loading ?
                        <ActivityIndicator size={"small"}
                            color={moradoOscuro}
                        />
                        : editing ?
                            <Feather name="check" size={25} color={moradoOscuro} />
                            : <Feather name="edit-2" size={20} color={moradoOscuro} />
                    }
                </Pressable>
                }
            />

            {
                tipoModal === "itinerario" ?

                    < ModalItinerario
                        puntoReunion={{
                            latitude: JSON.parse(fecha.puntoReunionCoords).latitude,
                            longitude: JSON.parse(fecha.puntoReunionCoords).longitude,
                            titulo: fecha.puntoReunionNombre
                        }}



                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}

                        itinerario={itinerario}


                    /> :

                    tipoModal === "map" ?
                        <ModalMap
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}

                            selectedPlace={{
                                latitude: JSON.parse(fecha?.puntoReunionCoords).latitude,
                                longitude: JSON.parse(fecha?.puntoReunionCoords).longitude,
                                titulo: fecha?.puntoReunionNombre,
                            }}

                        /> :
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(false);
                            }}
                        >{
                                tipoModal === "escaner" ?
                                    <QRScan
                                        cerrar={() => setModalVisible(false)}
                                        handleScanned={codigoEscaneado} />
                                    : <DetalleReserva
                                        handleBack={() => setModalVisible(false)}
                                        reserva={actualReservation}
                                    />
                            }

                        </Modal>

            }




            {/* Escanear codigo */}
            <Pressable
                onPress={editing ? cancelarFecha : handleQR}
                style={{
                    width: '100%',
                    backgroundColor: colorFondo,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    padding: 20,
                }}>

                <Text style={{
                    ...styles.textCancel,
                    color: editing ? "red" : moradoOscuro
                }}>{editing ? "Cancelar fecha" : "Registrar entrada"}</Text>
            </Pressable>
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

    queLlevarContainer: {
        marginVertical: 15,

    },

    captionTxt: {
        fontWeight: 'bold',
        marginVertical: 10,
    },

    personaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        flex: 1,
        marginHorizontal: 10,

    },

    textCancel: {
        color: moradoOscuro,
        textAlign: 'center',
        fontWeight: 'bold',

        fontSize: 18,
    }
})
