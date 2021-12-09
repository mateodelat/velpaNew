import React, { useEffect, useState } from 'react'
import {
    Alert,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { colorFondo, diffDays, formatAMPM, formatDateShort, isUrl, moradoClaro, moradoOscuro } from '../../../../assets/constants'

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


import ListaPersonas from './ListaPersonas';
import ModalRuta from './ModalRuta';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { Usuario } from '../../../models';
import ModalItinerario from '../../AgregarFecha/components/ModalItinerario';

import Storage from '@aws-amplify/storage';
import { reverseGeocodeAsync } from 'expo-location';
import ModalMap from '../../../components/ModalMap';
import { Foundation } from '@expo/vector-icons';


export default function ({ fecha, handleContinuar, idx }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState("");

    const [openDetails, setOpenDetails] = useState(false);

    const navigation = useNavigation()

    const abrirItinerario = () => {
        setModalVisible(true)
        setTipoModal("itinerario")
    }


    const abrirRuta = () => {
        setModalVisible(true)
        setTipoModal("ruta")
    }

    const abrirMapa = () => {
        setModalVisible(true)
        setTipoModal("map")
    }


    let {
        titulo,
        descripcion,
        precio,
        fechaInicial,
        fechaFinal,
        usuarioID
    } = fecha
    precio *= (fecha.comision + 1)
    precio = Math.round(precio)

    const handleNavigateGuia = () => {
        // navigation.navigate("PerfilScreen", { id: usuarioID })
    }

    // Obtener el guia
    const [guia, setGuia] = useState(null);
    useEffect(() => {
        (async () => {
            const perfil = await DataStore.query(Usuario, usuarioID)
                .then(async r => {
                    return {
                        ...r,
                        foto: !r.foto ? null : isUrl(r.foto) ? r.foto : await Storage.get(r.foto),
                        superGuia: r.superGuia
                    }
                })
            setGuia(perfil)
        })()
    }, []);

    // Personas reservadas

    const coords = JSON.parse(fecha.puntoReunionCoords)
    const puntoReunion = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        titulo: fecha.puntoReunionNombre,
    }

    return (
        <View style={{
            marginLeft: 10,
            marginBottom: 40,
        }}>
            {/* Mostrar detalles cuando se hace click */}
            <Pressable
                onPress={() => setOpenDetails(!openDetails)}

                style={styles.container}>

                {/* Hora y superguia */}
                <View style={styles.superGuiaContainer}>
                    <Text style={styles.superGuiaTxt}>{formatAMPM(fecha.fechaInicial, false)}</Text>
                    <Text style={styles.superGuiaTxt}>SuperGuia</Text>

                </View>


                {/* Titulo y precio */}
                <View style={styles.row}>
                    {titulo ? <Text
                        numberOfLines={1}
                        style={styles.titulo}
                    >{titulo}</Text> :
                        <Text numberOfLines={1} style={styles.titulo}
                        >{formatDateShort(fechaInicial, fechaFinal)}</Text>}

                    <View>
                        <Text
                            style={styles.precio}
                        >{precio}$</Text>
                        <Text
                            style={{
                                textAlign: 'right',
                                fontSize: 10,
                                color: '#666',
                            }}
                        >*aprox</Text>
                    </View>

                </View>




                {/* Descripcion */}
                {descripcion && <View style={styles.row}>
                    <Text
                        numberOfLines={openDetails ? null : 1}
                        style={styles.descripcion}
                    >{descripcion}</Text>

                    {!openDetails && <Text
                        style={[styles.precio, { color: '#fff', }]}
                    >{precio * (fecha.comision + 1)}$</Text>}
                </View>}


                {/* Elementos de detalle */}
                {openDetails && <View >
                    {fecha.dificultad !== null && fecha.dificultad !== undefined && <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                        {
                            [...Array(fecha.dificultad).keys()].map(e => {
                                return <Foundation
                                    style={{
                                        paddingHorizontal: 2

                                    }}
                                    key={e}
                                    name="mountains"
                                    size={25}
                                    color={3 > e ? "black" : "gray"}
                                />
                            })
                        }
                    </View>}

                    {/* Perfil del guia */}
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>

                        <View style={{ alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: 16, }}>{guia?.nombre} {guia?.apellido}</Text>
                            <Text style={styles.nickname}>@{guia?.nickname}</Text>
                        </View>
                        <Pressable
                            onPress={handleNavigateGuia}

                        >

                            {guia.foto ? <Image
                                source={{ uri: guia?.foto }} style={styles.foto} />
                                : <Feather
                                    style={{
                                        backgroundColor: "#f4f4f4",
                                        borderRadius: 15,
                                    }}
                                    name="user"
                                    size={50}
                                    color="black"
                                />}
                        </Pressable>

                    </View>
                    {/* ubicacion */}
                    <Pressable
                        onPress={abrirMapa}
                        style={{
                            marginTop: 40,
                        }}>
                        <Text style={{ marginBottom: 10, }}>Punto de reunion:</Text>

                        <View style={{ ...styles.row }}>

                            <View style={{ width: 30, alignItems: 'center', justifyContent: 'center', }}>
                                <Ionicons name="location-sharp" size={24} color={moradoOscuro} />
                            </View>
                            <Text numberOfLines={1} style={styles.ubicacionTxt}>{fecha.puntoReunionNombre}</Text>
                        </View>

                    </Pressable>


                    {/* Iconos presionables */}
                    <View style={{ ...styles.row }}>

                        <View style={styles.cuadradoDatos}>
                            <Text style={styles.tituloCuadro}>PLAN</Text>

                            <Pressable
                                onPress={abrirItinerario}
                                style={styles.botonLogo}>
                                <FontAwesome5 name="tasks" size={27} color="black" />
                            </Pressable>
                        </View>

                        <View style={styles.lineaVertical} />

                        <View style={styles.cuadradoDatos}>
                            <Text style={styles.tituloCuadro}>DIAS</Text>
                            <View style={styles.diasContainer}>
                                <Text style={styles.diasTxt}>{Math.round(diffDays(fechaInicial, fechaFinal) + 1)}</Text>
                            </View>
                        </View>


                        {
                            !!fecha.imagenRuta && <>
                                <View style={styles.lineaVertical} />
                                <View style={styles.cuadradoDatos}>
                                    <Text style={styles.tituloCuadro}>RUTA</Text>
                                    <Pressable
                                        onPress={abrirRuta}
                                        style={styles.botonLogo}>
                                        <Image
                                            source={require("../../../../assets/icons/distance.png")}
                                            style={{
                                                width: 30,
                                                height: 30,
                                            }} />
                                    </Pressable>
                                </View>
                            </>
                        }
                    </View>


                </View>}



                {/* Linea */}
                <View style={styles.line} >
                    {!openDetails && <MaterialIcons
                        name={"keyboard-arrow-down"}
                        size={20}
                        color={gris}
                        style={{ backgroundColor: '#fff', position: 'absolute', }}
                    />}
                </View>



                {/* Lista personas */}
                <ListaPersonas
                    personasReservadas={fecha.personasReservadas}
                    personasTotales={fecha.personasTotales}

                />



                {openDetails && <Pressable
                    onPress={() => handleContinuar(fecha, guia, idx)}
                    style={{ ...styles.botonRedondo, width: '50%', alignSelf: 'center', marginBottom: 20, }}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', }}>Reservar</Text>
                </Pressable>}

            </Pressable >

            {tipoModal === "map" ?
                <ModalMap
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}

                    selectedPlace={puntoReunion}

                /> :
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    {tipoModal === "itinerario" ?
                        <ModalItinerario
                            editAllowed={false}
                            setModalVisible={setModalVisible}
                            itinerario={JSON.parse(fecha.itinerario)}
                        /> :
                        <ModalRuta
                            img={fecha?.imagenRuta?.url}
                            setModalVisible={setModalVisible}
                        />}
                </Modal>}
        </View >)
}

const gris = '#00000099'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '100%',
        padding: 20,
        paddingBottom: 0,
    },

    superGuiaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },

    superGuiaTxt: {
        fontWeight: 'bold',
        color: moradoOscuro,
    },

    row: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },

    titulo: {
        fontSize: 17,
        fontWeight: 'bold',
        flex: 1,
        color: '#000',
    },

    descripcion: {
        fontSize: 17,
        flex: 1,
        color: gris,
    },

    precio: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 10,
        color: moradoOscuro,
    },

    foto: {
        width: 50,
        height: 50,
        borderRadius: 15,
    },

    line: {
        height: 1,
        width: '100%',
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: gris,
        alignItems: 'center',
        justifyContent: 'center',
    },

    nickname: {
        fontSize: 16,
        color: gris,

    },

    cuadradoDatos: {
        flex: 1,
        marginVertical: 30,
        marginBottom: 20,

        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',


    },

    lineaVertical: {
        width: 1,
        marginVertical: 40,
        backgroundColor: "lightgray",
    },

    tituloCuadro: {
        fontSize: 16,
        color: 'lightgray',
        textAlign: 'center',
    },

    botonLogo: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

        marginTop: 7,
        borderRadius: 34,
        backgroundColor: '#fff',


        width: 45,
        height: 45,

        alignItems: 'center', justifyContent: 'center',



    },


    diasContainer: {
        width: 45,
        height: 45,

        alignItems: 'center', justifyContent: 'center',
        flex: 1,
    },

    diasTxt: {
        fontSize: 25,
        // fontWeight: 'bold',
    },

    botonRedondo: {
        backgroundColor: moradoOscuro,
        padding: 14,
        borderRadius: 200,
        alignItems: 'center', justifyContent: 'center',
    },


    ubicacionTxt: {
        color: moradoOscuro,
        maxWidth: "80%"
    }
})
