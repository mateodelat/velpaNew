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
import { formatAMPM, formatDateShort, formatDateWithHour, formatMoney, getImageUrl, getUserSub, mayusFirstLetter, moradoClaro, moradoOscuro, redondear } from '../../../assets/constants';
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

    const fecha = route.params.fecha
    const reserva = route.params.reserva

    // Variables para animaciones (Carrousel fotos y header transparencia)
    const scrollY = useRef(new Animated.Value(0)).current



    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState("map");
    const [guia, setGuia] = useState({});

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
        await DataStore.query(Reserva, reserva.id)
            .then((r) => {
                setMaterialChecked(r.materialChecked ?
                    JSON.parse(r.materialChecked)
                    :
                    materialDefault
                )
            })

        // Obtener el usuario y la imagen de las aventuras autorizadas
        const sub = await getUserSub()
        API.graphql({ query: getUsuario, variables: { id: sub } })
            .then(async r => {
                r = r.data.getUsuario
                const AventurasAutorizadas = await Promise.all(r.AventurasAutorizadas.items.map(async e => {
                    e = e.aventura

                    const imagenFondo = await getImageUrl(e.imagenDetalle[e.imagenFondoIdx])

                    const titulo = mayusFirstLetter(e.titulo)
                    // Obtener la imagen de fondo
                    return {
                        ...e,
                        imagenFondo,
                        titulo
                    }
                }))

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
                    // console.log("Error extraño por")
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

                        <Text style={{ ...styles.title, color: moradoOscuro, }}>{formatMoney(reserva.total, true)}
                        </Text>
                    </View>


                    {fecha.descripcion ? <View style={{ ...styles.row, marginVertical: 10, }}>
                        <Text style={styles.descripcion}>{fecha.descripcion}</Text>
                    </View>
                        :
                        null
                        // < View style={{ marginTop: 30, }} />
                    }

                    <Line />


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

                    <Text style={{
                        marginVertical: 10,
                    }}>Punto de reunion: </Text>
                    <Pressable
                        onPress={handleOpenMap}
                        style={styles.reunionContainer}>
                        <Ionicons
                            name="location-sharp"
                            size={24}
                            color={moradoOscuro}
                        />
                        <Text style={styles.locationTxt}>{fecha.puntoReunionNombre}</Text>
                    </Pressable>

                    <Line />



                    {/* ITINERARIO */}
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

                    {/* Guia de la aventura */}
                    <View style={styles.guiaContainer}>
                        <Image
                            source={{ uri: guia.foto }}
                            style={styles.imagenGuia}
                        />

                        <Text style={styles.guiaNickname}>{guia.nickname}</Text>

                        <Ionicons
                            onPress={navigateChat}
                            style={{ ...styles.botonItinerario, marginRight: 0, marginBottom: 0, }} name="chatbox" size={20} color="white" />
                    </View>


                    {/* Aventuras sugeridas del guia */}
                    {guia?.AventurasAutorizadas?.length > 0 && <View style={{ flex: 1, height: 180, flexDirection: 'row', }}>
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
                                style={{ flex: 1, marginBottom: 5, }}>
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

                    <Text style={[styles.title, { marginBottom: 5, }]}>Incluido:</Text>

                    <Text
                        style={{ fontSize: 16, marginLeft: 10, }}>{fecha.incluido?.map(e => e + "      ")}</Text>

                    <View style={{ marginTop: 40, }} />

                    {/* Que llevar */}
                    {/* <Text>Material a llevar</Text> */}
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
                </View>

            </Animated.ScrollView >


            <HeaderDetalleAventura
                scrollY={scrollY}
                height={height * 0.5}
                handleBack={handleBack}
                titulo={fecha.tituloAventura}
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
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}

                        itinerario={itinerario}


                    />
            }

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
        bottom: 0,
        width: '100%',
        // fontSize: 16,
        color: '#fff',
        flex: 1,
        marginLeft: 20,
    },

    queLlevarContainer: {
        marginVertical: 15,

    },

    checkIcon: {
        borderRadius: 100,
        borderWidth: .5,
    }
})
