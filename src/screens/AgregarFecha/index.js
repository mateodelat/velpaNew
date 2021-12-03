import React, { useEffect, useState } from 'react'
import { Alert, Animated, Dimensions, Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { abrirEnGoogleMaps, colorFondo, formatAMPM, getCapacidadUsuario, getUserSub, moradoClaro, moradoOscuro, msInMinute, redondear, shadowMedia } from '../../../assets/constants'


import SelectorInput from '../../components/SelectorInput'
import { Entypo, Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

import Calendario from './components/Calendario';
import HeaderConImagen from '../../components/HeaderConImagen';
import Boton from '../../components/Boton';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import API from '@aws-amplify/api';
import { DataStore } from '@aws-amplify/datastore';
import RadioButton from '../../components/RadioButton';
import ModalItinerario from './components/ModalItinerario';
import ModalPuntoReunion from './components/ModalPuntoReunion';
import { Usuario } from '../../models';



const { height } = Dimensions.get("screen")

export default function ({ navigation, route }) {
    const { aventura } =
    {
        aventura: {
            _deleted: null,
            _lastChangedAt: 1638313118797,
            _version: 12,
            altimetriaRecorrida: 1000,
            altitud: 5230,
            categoria: "APLINISMO",
            comision: 0.2,
            coordenadas: {
                latitude: 19.178481,
                longitude: -98.642455,
            },
            createdAt: "2021-11-11T17:55:38.692Z",
            descripcion: "Aqui el Izta esta grandecito y si se ve potente varios se han muerto pero tambien es una montaña grande que tiene unas vistas increibles. No se sabe cuando empezaron las escursiones para alla solo que se no se nada.Sobre aristoteles hay mucho que decir este carnalito hizo demasiados aporte a la filosofia por cierto ser o no ser es la cuestion.",
            dificultad: 5,
            distanciaRecorrida: 7.4,
            duracion: "1-2 dias",
            estadoAventura: "AUTORIZADO",
            id: "5b10a5bf-5374-4a4a-b179-7b9e0209dd96",
            imagenDetalle: [
                {
                    key: "https://cdn.britannica.com/84/120884-004-D21DFB10/Iztaccihuatl-Mexico.jpg",
                    uri: "https://cdn.britannica.com/84/120884-004-D21DFB10/Iztaccihuatl-Mexico.jpg",
                },
                {
                    key: "https://picsum.photos/400?random=103.jpg",
                    uri: "https://picsum.photos/400?random=103.jpg",
                },
                {
                    key: "imagen-2 ave-5b10a5bf-5374-4a4a-b179-7b9e0209dd96.jpg",
                    uri: "https://velpabuckets3100617-dev.s3.us-east-1.amazonaws.com/public/imagen-2%20ave-5b10a5bf-5374-4a4a-b179-7b9e0209dd96.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4D2FQFF7LTAH6FMT%2F20211203%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211203T220141Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLWVhc3QtMSJHMEUCIQD7OB989Jb4dY2f4NrbSUCo6VbmkajQdjznz0XyPvvSYQIgKqinL2XuDA8rSeQdIlygzOU7fWP948kgdODU99GAQRAqxAQITxACGgw4MzI4MzI1NDcxOTgiDLFAoxqjY3GszGuktSqhBB3dQ4IaScFI9eGzoLWPvz%2FDNh%2BC11ZOTGr29e3QHCaSsKtD%2FsLDC1GFfe1GAiw70Z4pNlrGN4KIpXmj8qb3gAIDNYta2qLMvb%2Fdn%2ByYGsSQCeKIQUz3gX9cbjwuw01n%2B3kWeeizyWhXhVJcYfMUXZVLvekXVNzUBBkhn5xeXNikks9uR0AueCAK5g3jeBcQAPAbTIq7I7xI8uS%2F4uUfuOxHrK7fyKadm7u31RyUpphwyO7CXPFz8KHZS%2FmbyuTqSZq0WWmXUIhg6H1sqt%2FXi7XHDjzZ4rW%2B9al0mcypsqPT2iSMW108QOWKCGbW02R7CGRMDo91Mv8kKTIpF9NdaGv%2F0xcy59jeZvxTv9gwg7VD6jpoMGjzU8dniO8xMsiEDtcoHeyUOF9kUGLrJYKZALWlBzfG8uSqzJnqx3lgT6vIblDJvh9KZlSchyl7OkDCjeEyuB9D864ORssRz9oJX6HSclpFinA0VOXdgfLIbC1vpwzBFhTW8Nwe6UG1pXCsvQty2c9VrNSRqDTYp0%2Bgdb3g%2FBMVGyu%2BBKgYt2GAjQJ0Tf0wo9uHeDMe8mpwy3TjFBeRriOjs4JuisyGH6P%2BBGO26%2FCjVx3MWenU8qRL9JLun4UZrcmnW3XjG8Dr%2BIyGz02d0BlNK%2BPGpvo0y6clRsKs8E9Mhisy1RCSEKJ4DrZhzhiWuolbEBOwargQm5doNoP%2FGMLI7UAaQ1oxvBuvrqm4MLunqo0GOoUCcf5WbO69Rt1zeHM2SJVySQ2TMfriWq8JkLj1AJ2NiW1qm8jDTicYO7C%2BSYqA1U2Nc1zOVu8zmYufG3s7MFdfZzNzcOa2K1WSfh0cOjgYkthUAFDmKvQqOv%2Bz5k0dozCvMLpLDPcBPYr9s0DLzfkE8JT4EPhU4RM%2BV598leM37O8K6zmicK6BffcrTFcuv7wMPEXNIjjaa%2BYND7PG%2B47oIYv6ae1LmCN1gBUgSDfgVKM7oGoaW6Kjxl0K3dOKHLVy%2BK%2BM3TxZU%2BfoM8%2BHXTTvzHctQhLLpSG6WAwHe1IzTVvLwAu%2Bd14VSt4dTee0Ah0JOucJKVp4D71dZGGfBcrCvalj5%2FwD&X-Amz-Signature=7fe29084222ace808a8ac52c4b823ed0d585b3753af9d4bc05507e6315bfdaee&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.6.1%20os%2Fother%20lang%2Fjs%20md%2Fbrowser%2Funknown_unknown%20api%2Fs3%2F3.6.1%20aws-amplify%2F4.3.6_react-native&x-id=Get",
                },
                {
                    key: "https://picsum.photos/400?random=101.jpg",
                    uri: "https://picsum.photos/400?random=101.jpg",
                },
                {
                    key: "https://picsum.photos/400?random=394.jpg",
                    uri: "https://picsum.photos/400?random=394.jpg",
                },
            ],
            imagenFondoIdx: 0,
            incluidoDefault: [
                "Electrolit",
            ],
            materialDefault: "[[\"Obligatorio\",[\"Botas o tenis\",\"Impermeable\",\"Chamarra\",\"Camisa deportiva\",\"Mochila\"]],[\"Alimentacion\",[\"Bote con agua\",\"Barras o snacks\"]],[\"Acampada\",[\"Casa de campaña\",\"Colchoneta para dormir\",\"Casa de campaña\"]]]",
            notAllowed: false,
            owner: "939aadbe-55d5-45a0-9628-654049e8a682",
            precioMax: 1000,
            precioMin: 500,
            titulo: "Iztacihuatl",
            ubicacionId: "ChIJEfm5R3OuKIQRTGNKuFVAsMA",
            ubicacionLink: null,
            ubicacionNombre: "Puebla",
            updatedAt: "2021-11-30T22:58:38.770Z",
            usuarioID: "2ebd46eb-b627-4bd9-a158-ee23ad738130",
        },
    }













    const {
        precioMin,
        precioMax,
        titulo: tituloAventura } = aventura

    const scrollY = React.useRef(new Animated.Value(0)).current

    // Obtener el limite de personas para el usuario
    useEffect(() => {
        obtenerPersonasMaxUsuario()
    }, []);

    const obtenerPersonasMaxUsuario = async () => {

        // Verificar si el guia tiene autorizado llevar gente y si tiene una cuenta de stripe
        const sub = await getUserSub()
        const usuario = await DataStore.query(Usuario, sub)
        const { stripeID, capacidadMaxima } = usuario

        if (!stripeID) {
            Alert.alert("Error", "Ocurrio un error, no tienes cuenta bancaria asociada, vuelve a mandar tus datos", [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.pop(2)
                        navigation.navigate("Configuracion")
                    },
                }
            ], { cancelable: false })
            return
        }

        if (!capacidadMaxima) {
            Alert.alert("Error", "Ocurrio un error, no estas autorizado a llevar gente, contactanos para mas informacion", [
                {
                    text: "OK",
                    onPress: () => navigation.pop(2),
                }
            ], { cancelable: false })
        } else {
            setMaxPersonas(capacidadMaxima)
        }

    }

    // Fechas del calendario
    const [fechaInicial, setFechaInicial] = useState(null);
    const [fechaFinal, setFechaFinal] = useState(null);


    // Selector de hora
    const [horaInicial, setHoraInicial] = useState(null);
    const [hourPickerVisible, setHourPickerVisible] = useState(false);
    const [errorHoraFinal, setErrorHoraFinal] = useState(false);
    const [errorHoraInicial, setErrorHoraInicial] = useState(false);
    const [errorPuntoReunion, setErrorPuntoReunion] = useState(false);

    // Punto de reunion
    const [puntoReunion, setPuntoReunion] = useState(null);
    const [itinerario, setItinerario] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState("puntoReunion");


    // Verificar cuanta gente puede llevar el guia
    const [maxPersonas, setMaxPersonas] = useState(0);




    let bloquearADia = fechaInicial ? (horaInicial ? new Date(fechaInicial) : fechaFinal ? new Date(fechaFinal) : new Date(fechaInicial)) : new Date()
    // Hacer el dia bloqueado a hora local para escoger fecha
    bloquearADia.setTime(bloquearADia.getTime() + bloquearADia.getTimezoneOffset() * 60 * 1000)

    const handleOpenPuntoDeReunion = () => {
        setErrorPuntoReunion(false)
        setTipoModal("puntoReunion")
        setModalVisible(true)
    }

    const handleVerItinerario = () => {
        // Verificaciones que exista fecha y punto reunion
        if (!fechaInicial) {
            Alert.alert("Error", "Agrega primero la fecha")
            return
        }

        if (!fechaFinal) {
            Alert.alert("Error", "Agrega primero la hora final")
            setErrorHoraFinal(true)
            return
        }
        if (!puntoReunion) {
            Alert.alert("Error", "Agrega primero el punto de reunion")
            setErrorPuntoReunion(true)
            return

        }

        setTipoModal("itinerario")
        setModalVisible(true)

    }

    // Manejadores de selector de hora
    const handleHora = (tipo) => {
        // Limpiar errores de hora

        if (!fechaInicial) {
            Alert.alert("Selecciona primero una fecha")
            return
        }

        if (tipo === "inicial") {
            setErrorHoraInicial(false)
            setHoraInicial(true)
            setHourPickerVisible(true)
        } else {
            setErrorHoraFinal(false)
            setHoraInicial(false)
            setHourPickerVisible(true)
        }
    }
    function handleConfirmHour(hora) {
        setHourPickerVisible(false)

        // Regresar de hora local para el modal a UTC
        hora.setTime(hora.getTime() - hora.getTimezoneOffset() * 60 * 1000)

        if (horaInicial) {
            // Verificacion hora valida
            if (hora.getTime() >= fechaFinal) {
                setFechaInicial(fechaFinal - msInMinute)
                setErrorHoraInicial(true)
                Alert.alert("Error", "La hora inicial debe ser menor a la hora final")
            } else {

                setFechaInicial(hora.getTime())

                // Actualizar la hora inicial del itinerario
                updateItinerario(hora.getTime(), true)

            }

        } else {
            // Verificacion hora valida
            if (hora.getTime() <= fechaInicial) {
                setFechaFinal(fechaInicial + msInMinute)
                setErrorHoraFinal(true)
                Alert.alert("Error", "La hora final debe ser mayor que la hora inicial")
            } else {

                setFechaFinal(hora.getTime())

                // Actualizar hora final del itinerario
                updateItinerario(hora.getTime(), false)

            }
        }


    }


    const handleContinuar = () => {
        const { incluidoDefault, materialDefault } = aventura
        const imagenFondo = aventura.imagenDetalle[aventura.imagenFondoIdx]

        if (!puntoReunion) {
            Alert.alert("Error", "Por favor selecciona el punto de reunion")
            setErrorPuntoReunion(true)
            return

        }

        const {
            ubicacionNombre: puntoReunionNombre,
            puntoReunionId: puntoReunionId,
            puntoReunionLink: puntoReunionLink,

            latitude,
            latitudeDelta,
            longitude,
            longitudeDelta,
        } = puntoReunion

        const puntoReunionCoords = {
            latitude,
            latitudeDelta,
            longitude,
            longitudeDelta,
        }


        const navigate = () => navigation.navigate("AgregarFecha2", {
            fecha: {
                fechaInicial,
                fechaFinal,

                puntoReunionNombre,
                puntoReunionId,
                puntoReunionLink,
                puntoReunionCoords,

                itinerario,


                comision: aventura.comision,
            },

            incluidoDefault,
            materialDefault,

            precioMin, precioMax,

            tituloAventura,
            aventuraID: aventura.id,
            maxPersonas,
            imagenFondo
        })
        navigate()
        // Verificaciones

        // Fecha
        if (!fechaInicial) {
            Alert.alert("Error", "Por favor selecciona una fecha")
            return
        }
        if (!fechaFinal) {
            Alert.alert("Error", "Por favor selecciona hora final")
            setErrorHoraFinal(true)
            return

        }


        // Error en la hora
        if (errorHoraFinal || errorHoraInicial || errorPuntoReunion) {
            Alert.alert("Error", "Por verifica los errores")
            return
        }

        navigate()

    }


    async function handleGuardarPuntoReunion(selectedPlace) {
        if (!selectedPlace) return
        setPuntoReunion({
            ...selectedPlace
        })


        updateItinerario(null, null, selectedPlace)

        setModalVisible(false)
        Alert.alert("Exito", "Punto de reunion guardado con exito")
    }

    function updateItinerario(time, horaInicial, selectedPlace) {
        selectedPlace = selectedPlace ? selectedPlace : puntoReunion

        setItinerario([
            {
                titulo: "Punto de reunion en " + selectedPlace?.ubicacionNombre,
                hora: (time && horaInicial ? time : fechaInicial),
                ubicacionLink: selectedPlace?.ubicacionLink,
                ubicacionNombre: selectedPlace?.ubicacionNombre,

                modifiable: false,
                tipo: "inicio"
            },
            {
                titulo: "Aventura en " + tituloAventura,
                hora: ((time && horaInicial ? time : fechaInicial) + msInMinute),
            },
            {
                titulo: "Punto de reunion en " + selectedPlace?.ubicacionNombre,
                hora: time && !horaInicial ? time : fechaFinal,

                ubicacionLink: selectedPlace?.ubicacionLink,
                ubicacionNombre: selectedPlace?.ubicacionNombre,


                modifiable: false,
                tipo: "fin"
            },
        ])

    }


    return (
        <View style={styles.container}>

            {/* Fechas */}
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}

                showsVerticalScrollIndicator={false}
                style={{
                    padding: 20,
                    flex: 1,

                }}>

                <View style={{ height: height * 0.24 }} />


                {/* Calendario */}
                <View style={styles.item}>
                    <Text style={styles.captionTxt}>Fecha*</Text>


                    <Calendario
                        fechaInicial={fechaInicial}
                        fechaFinal={fechaFinal}

                        setFechaFinal={setFechaFinal}
                        setFechaInicial={setFechaInicial}
                    />

                </View>


                {/* Horas de reunion */}
                <View style={{
                    marginVertical: 10, flexDirection: 'row',
                }}>
                    {/* Hora inicial */}
                    <Pressable
                        onPress={() => handleHora("inicial")}
                        style={{
                            flex: 1,
                            marginRight: 10,
                        }}>
                        <Text style={{
                            ...styles.captionTxt,
                            marginBottom: 5,
                        }}>Hora inicial*</Text>
                        <View style={{
                            ...styles.row,
                            ...styles.puntoDeReunion,
                            borderWidth: errorHoraInicial ? 1 : 0,
                        }}>

                            <Text style={styles.txtLocation}>{!fechaInicial ? "--:--" : formatAMPM(fechaInicial)}</Text>

                            <Feather
                                style={styles.icono}
                                name="clock"
                                size={25}
                                color={moradoOscuro}
                            />
                        </View>

                    </Pressable>
                    {/* Hora final */}
                    <Pressable
                        onPress={() => handleHora("final")}
                        style={{
                            marginLeft: 10,
                            flex: 1,
                        }}>
                        <Text style={{
                            ...styles.captionTxt,
                            marginBottom: 5,
                        }}>Hora final*</Text>
                        <View style={{
                            ...styles.row,
                            ...styles.puntoDeReunion,
                            borderWidth: errorHoraFinal ? 1 : 0,
                        }}>
                            <Feather
                                style={styles.icono}
                                name="clock"
                                size={25}
                                color={moradoOscuro}
                            />

                            <Text style={styles.txtLocation}>{!fechaFinal ? "--:--" : formatAMPM(fechaFinal)}</Text>

                        </View>

                    </Pressable>
                </View>

                {/* Ubicacion punto de reunion */}
                <View
                    style={{
                        ...styles.item,
                        marginTop: 20,
                    }}>
                    <Text style={styles.captionTxt}>Punto de reunion (inicio y fin)*</Text>

                    {/* Si existe el punto de reunion de pone un boton para abrirlo */}
                    <Pressable
                        onPress={handleOpenPuntoDeReunion}
                        style={[styles.row, styles.puntoDeReunion, {
                            borderWidth: errorPuntoReunion ? 1 : 0,
                        }]}>
                        {(puntoReunion) ?
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Ionicons
                                    // style={styles.icono}

                                    name="md-location-sharp"
                                    size={25}
                                    color={moradoOscuro}
                                />

                                <Text style={styles.txtLocation}>{puntoReunion.ubicacionNombre}</Text>
                                <Ionicons
                                    name="add"
                                    size={25}
                                    color={"transparent"}
                                />

                            </View> :
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Ionicons
                                    name="add"
                                    size={25}
                                    color={moradoOscuro}
                                />

                                <Text style={styles.txtLocation}>Agregar punto de reunion</Text>
                                <Ionicons
                                    name="add"
                                    size={25}
                                    color={"transparent"}
                                />
                            </View>
                        }
                    </Pressable>
                </View>

                {/* Agregar itinerario */}

                <View>
                    <Text style={styles.captionTxt}>Itinerario</Text>

                    <Pressable
                        onPress={handleVerItinerario}
                        style={styles.row}>

                        <View style={styles.agregar}>

                            <FontAwesome5
                                style={{
                                    width: 30,
                                    alignItems: 'center', justifyContent: 'center',
                                }}
                                name="tasks"
                                size={20}
                                color={moradoClaro} />

                            <Text style={styles.txtLocation}>Ver itinerario</Text>
                            <Entypo name="plus" size={30} color={"transparent"} />
                        </View>

                    </Pressable>
                </View>




                <Boton
                    style={{
                        marginBottom: 40,
                        marginTop: 20,
                    }}
                    titulo={"Continuar"}
                    onPress={handleContinuar}
                />

            </Animated.ScrollView >

            <HeaderConImagen
                titulo={tituloAventura}
                imagen={require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                scrollY={scrollY}
                maxHeight={height * 0.24}
            />


            <DateTimePickerModal
                isVisible={hourPickerVisible}
                mode="datetime"
                date={bloquearADia}
                minimumDate={bloquearADia}
                maximumDate={bloquearADia}
                onConfirm={handleConfirmHour}
                onCancel={() => setHourPickerVisible(false)}

            />

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
                        editAllowed={true}
                        setModalVisible={setModalVisible}

                        fechaInicial={new Date(fechaInicial)}
                        fechaFinal={fechaFinal ? new Date(fechaFinal) : new Date(fechaInicial)}

                        itinerario={itinerario}
                        setItinerario={setItinerario}

                    /> :

                    <ModalPuntoReunion


                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}

                        handleGuardar={handleGuardarPuntoReunion}
                        puntoReunion={puntoReunion}
                    />

                }

            </Modal>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorFondo,
    },

    fecha: {
        height: 3000,
    },

    captionTxt: {
        fontSize: 15,
        marginBottom: 15,
        marginLeft: 5,

    },

    textInput: {
        // flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        paddingHorizontal: 10,

    },

    item: {
        marginBottom: 25,
    },

    question: {
        position: 'absolute',
        backgroundColor: moradoClaro,
        borderRadius: 100,

        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    questionTxt: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "white",

    },

    infoPrice: {
        fontSize: 12,
        color: '#444',
    },

    agregar: {
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    contenedorSelector: {
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'flex-end',
        flex: 1,
    },

    tituloAgregar: {
        fontSize: 15,
        flex: 1,
        textAlign: 'center',
    },

    icono: {
        // ...shadowMedia,
        // backgroundColor: moradoOscuro,
        // padding: 10,
        // borderRadius: 100,
        // alignItems: 'center', justifyContent: 'center',

        position: 'absolute',
        left: 10,

    },


    linea: {
        borderBottomWidth: 0.5,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 40,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center',
    },

    puntoDeReunion: {
        padding: 10,
        // paddingLeft: 0,
        backgroundColor: '#fff',
        borderColor: "red",
    },

    txtLocation: {
        color: moradoOscuro,
        fontSize: 16,
        flex: 1,
        textAlign: 'center',

        marginLeft: 10,


    },

    allowContainer: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
    },

    allowInnerContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingRight: 2.5,
    },

    textAllow: {
        fontSize: 16,
        flex: 1,
    }
})
