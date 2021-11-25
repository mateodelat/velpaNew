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
    const { aventura } = route?.params

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
            setMaxPersonas(personasMax)
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




    const bloquearADia = fechaInicial ? (horaInicial ? new Date(fechaInicial) : fechaFinal ? new Date(fechaFinal) : new Date(fechaInicial)) : new Date()


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


        if (horaInicial) {
            // Verificacion hora valida
            if (hora.getTime() >= fechaFinal) {
                setFechaInicial(fechaFinal - msInMinute)
                setErrorHoraInicial(true)
                Alert.alert("Error", "La hora inicial debe ser menor a la hora final")
            } else {

                setFechaInicial(hora.getTime())
            }

        } else {
            // Verificacion hora valida
            if (hora.getTime() <= fechaInicial) {
                setFechaFinal(fechaInicial + msInMinute)
                setErrorHoraFinal(true)
                Alert.alert("Error", "La hora final debe ser mayor que la hora inicial")
            } else {

                setFechaFinal(hora.getTime())
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


        // Si ya existe itinerario solo se modifican primer y ultimos valores
        if (itinerario) {
            let newItinerario = [...itinerario]

            // Modificar primer valor
            newItinerario[0] = {
                titulo: "Punto de reunion en " + selectedPlace?.ubicacionNombre,
                hora: (fechaInicial),
                ubicacionLink: selectedPlace?.ubicacionLink,
                ubicacionNombre: selectedPlace?.ubicacionNombre,

                modifiable: false,
                tipo: "inicio"
            }
            newItinerario[itinerario.length - 1] = {
                titulo: "Punto de reunion en " + selectedPlace?.ubicacionNombre,
                hora: fechaFinal,

                ubicacionLink: selectedPlace?.ubicacionLink,
                ubicacionNombre: selectedPlace?.ubicacionNombre,


                modifiable: false,
                tipo: "fin"
            }


            setItinerario([...newItinerario])


        }
        // Si no existe itinerario se agrega con la ubicacion seleccionada
        else {
            setItinerario([
                {
                    titulo: "Punto de reunion en " + selectedPlace?.ubicacionNombre,
                    hora: (fechaInicial),
                    ubicacionLink: selectedPlace?.ubicacionLink,
                    ubicacionNombre: selectedPlace?.ubicacionNombre,

                    modifiable: false,
                    tipo: "inicio"
                },
                {
                    titulo: "Aventura en " + tituloAventura,
                    hora: (fechaInicial + msInMinute),
                },
                {
                    titulo: "Punto de reunion en " + selectedPlace?.ubicacionNombre,
                    hora: fechaFinal,

                    ubicacionLink: selectedPlace?.ubicacionLink,
                    ubicacionNombre: selectedPlace?.ubicacionNombre,


                    modifiable: false,
                    tipo: "fin"
                },
            ])

        }

        setModalVisible(false)
        Alert.alert("Exito", "Punto de reunion guardado con exito")
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
