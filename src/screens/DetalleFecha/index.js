import React, { useEffect, useRef, useState } from 'react'
import {
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
import { colorFondo, formatAMPM, formatDateShort, formatDateWithHour, formatMoney, getImageUrl, getUserSub, mayusFirstLetter, meses, moradoClaro, moradoOscuro, redondear } from '../../../assets/constants';
import HeaderDetalleAventura from '../../navigation/components/HeaderDetalleAventura';

import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Line from '../../components/Line';
import ModalMap from '../../components/ModalMap';
import { DataStore } from '@aws-amplify/datastore';
import { ChatRoom, Usuario } from '../../models';
import API from '@aws-amplify/api';
import { Reserva } from '../../models';
import ModalItinerario from '../../components/ModalItinerario';
import { Loading } from '../../components/Loading';
import MapView, { Marker } from 'react-native-maps';
import ListaPersonas from '../FechasAventura/components/ListaPersonas';
import { Fecha } from '../../models';


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

    const { fecha: fechaGotten, fechaID, reservaID } = route.params

    const [fecha, setFecha] = useState(null);

    // Detectar si se manda directamente la fecha de la ruta, si no obtenerla
    useEffect(() => {
        if (fechaGotten) {
            setFecha(fechaGotten)
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
                foto: await getImageUrl(usuario.foto),
                nickname: usuario.nickname,
                personasReservadas: totalPersonas,
                precioPagado: res.pagadoAlGuia,
                total: res.total
            })
        }))

        let personasReservadasNum = 0
        let precioAcomulado = 0
        reservas.map(e => {
            precioAcomulado += e.pagadoAlGuia
            personasReservadasNum += (e.adultos + e.ninos + e.tercera)
        })


        setFecha({
            // Obtener reservas y personas reservadas en la fecha
            ...fecha,
            reservas,
            personasReservadas,

            personasReservadasNum,
            precioAcomulado,

            imagenFondo: await getImageUrl(fecha.imagenFondo),
            material: JSON.parse(fecha.material),
            incluido: [...(JSON.parse(fecha.incluido)).default.map(e => e),
            ...(JSON.parse(fecha.incluido)).agregado.map(e => e)
            ],
            pasada: fecha.fechaInicial < now

        })

    }

    // Variables para animaciones (Carrousel fotos y header transparencia)
    const scrollY = useRef(new Animated.Value(0)).current

    const [modalVisible, setModalVisible] = useState(false);

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

    function handleOpenItinerario() {
        setModalVisible(true)
    }


    return (
        <View style={{
            flex: 1,
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

                        <Text style={{ ...styles.title, color: moradoOscuro, }}>{formatMoney(fecha.precio, true)}<Text style={{ fontWeight: "normal", }}> /persona</Text>
                        </Text>
                    </View>


                    {!!fecha.descripcion && <View style={{ ...styles.row, marginVertical: 10, }}>
                        <Text style={styles.descripcion}>{fecha.descripcion}</Text>
                    </View>
                    }

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 20,
                    }}>
                        <Text style={{ ...styles.title, flex: 1, }}>Total:</Text>
                        <Text style={{ ...styles.title, color: moradoOscuro, }}>{formatMoney(fecha.precioAcomulado, true)}</Text>

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
                                marginLeft: 10,
                                flex: 1,
                                fontSize: 16,
                                color: '#000',
                            }}>{fecha.personasReservadasNum}/{fecha.personasTotales} personas reservadas:</Text>

                            <Ionicons
                                onPress={navigateChat}
                                style={{ ...styles.botonItinerario, marginRight: 0, marginBottom: 0, }} name="chatbox" size={20} color="white" />

                        </View>

                        {/* Imagenes personas y chat */}
                        <View style={{ marginBottom: 50, marginTop: 10, }}>
                            {fecha.personasReservadas.map((persona, i) => {
                                return <View
                                    key={i.toString()}
                                    style={{
                                        marginBottom: 20,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}>
                                    <Image
                                        source={persona.foto ? { uri: persona.foto } : require("../../../assets/user.png")}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: 30,

                                            marginRight: 10,
                                        }}
                                    />
                                    <Text style={{
                                        flex: 1,
                                        color: "gray",
                                    }}>@{persona.nickname}</Text>

                                    <View style={{ alignItems: 'flex-end', }}>
                                        <View style={{ flexDirection: 'row', marginBottom: 5, }}>
                                            <Text style={{
                                                color: "gray",
                                            }}>{persona.personasReservadas} </Text>
                                            <Ionicons name="ios-person" size={20} color={"lightgray"} />
                                        </View>
                                        <Text style={{
                                            color: moradoOscuro,
                                        }}>{formatMoney(persona.precioPagado, true)}</Text>
                                    </View>


                                </View>

                            })}

                        </View>
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


                    {formatDateWithHour(fecha.fechaInicial, fecha.fechaFinal).mismoDia ?
                        <View style={{ ...styles.fechaContainer, marginBottom: 30, }}>
                            <MaterialCommunityIcons style={{ position: 'absolute', left: 0, }} name="calendar-today" size={24} color={moradoOscuro} />
                            <Text style={{ ...styles.fechaTxt, flex: 1, textAlign: 'center', }}>{formatDateWithHour(fecha.fechaInicial, fecha.fechaFinal).txt}</Text>
                        </View>
                        :
                        <View style={{ marginBottom: 10, }}>
                            <View style={styles.fechaContainer}>
                                <Text style={styles.fechaTitle}>Inicio: </Text>
                                <Text style={styles.fechaTxt}>{formatDateWithHour(fecha.fechaInicial, fecha.fechaFinal).txtInicial}</Text>
                            </View>

                            <View style={styles.fechaContainer}>
                                <Text style={styles.fechaTitle}>Fin: </Text>
                                <Text style={styles.fechaTxt}>{formatDateWithHour(fecha.fechaInicial, fecha.fechaFinal).txtFinal}</Text>
                            </View>
                        </View>}



                    <Line />


                    <Text style={styles.captionTxt}>Punto de reunion: </Text>
                    <View style={{ height: 300, width: '100%', marginBottom: 40, }}>

                        <MapView
                            provider={"google"}
                            mapType={"standard"}

                            showsUserLocation={true}
                            loadingEnabled={true}

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
            />

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

    }
})
