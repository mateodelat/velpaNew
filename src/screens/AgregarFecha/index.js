import React, { useEffect, useState } from 'react'
import { Alert, Animated, Dimensions, Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { abrirEnGoogleMaps, colorFondo, formatAMPM, getCapacidadUsuario, getUserSub, moradoClaro, moradoOscuro, msInMinute, shadowMedia } from '../../../assets/constants'


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



const { height } = Dimensions.get("screen")

export default function ({ navigation, route }) {
    const { aventura } = route?.params
    const {
        puntoReunionNombre,
        puntoReunionLink,
        precioMin,
        precioMax,
        titulo: tituloAventura } = aventura

    const scrollY = React.useRef(new Animated.Value(0)).current



    // Obtener el limite de personas para el usuario
    useEffect(() => {
        obtenerPersonasMaxUsuario()
    }, []);

    const obtenerPersonasMaxUsuario = async () => {
        const sub = await getUserSub()
        const personasMax = await API.graphql({ query: getCapacidadUsuario, variables: { id: sub } })
            .then(r => r.data.getUsuario?.capacidadMaxima)

        if (!personasMax) {
            Alert.alert("Error", "Ocurrio un error, no estas autorizado a llevar gente, contactanos para mas informacion", [
                {
                    text: "OK",
                    onPress: () => navigation.pop()
                }
            ])
        } else {
            setError(false)
            setMaxPersonas(personasMax)
            setPersonas(personasMax)
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

    const [error, setError] = useState(false);

    const bloquearADia = fechaInicial ? (horaInicial ? new Date(fechaInicial) : fechaFinal ? new Date(fechaFinal) : new Date(fechaInicial)) : new Date()


    // Titulo
    const [titulo, setTitulo] = useState();
    const [errorTitulo, setErrorTitulo] = useState(false);

    const [descripcion, setDescripcion] = useState();

    // Selectores personasTotales/precio
    const [precio, setPrecio] = useState(precioMin);


    const [personasTotales, setPersonas] = useState(1);
    const [maxPersonas, setMaxPersonas] = useState(0);

    // Permitir tercera edad / niños
    const [allowNinos, setAllowNinos] = useState(true);
    const [allowTercera, setAllowTercera] = useState(true);





    const handleInfoPersonas = () => {
        Alert.alert("Informacion", "Solo has sido autorizado a llevar a " + maxPersonas + " personas")

    }
    const handleInfoPrecio = () => {
        Alert.alert("Informacion", "El precio por persona puede subir hasta el doble dependiendo de la cantidad de gente en la reserva")

    }

    const handlePuntoDeReunion = () => {
        abrirEnGoogleMaps(puntoReunionLink)
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

        const navigate = () => navigation.navigate("AgregarFecha2", {
            personasTotales,
            fechaInicial,
            fechaFinal,
            precio,

            puntoReunionNombre,
            puntoReunionLink,
            allowTercera,
            allowNinos,

            incluidoDefault,
            materialDefault,

            titulo,
            descripcion,

            tituloAventura,
            aventuraID: aventura.id,
            comision: aventura.comision
        })

        // Verificaciones

        if (error) {
            Alert.alert("Error")
            return
        }

        if (!fechaInicial) {
            Alert.alert("Error", "Por favor selecciona una fecha")
            return
        }
        if (!fechaFinal) {
            Alert.alert("Error", "Por favor selecciona hora final")
            setErrorHoraFinal(true)
            return

        }

        if (errorHoraFinal || errorHoraInicial) {
            Alert.alert("Error", "Por verifica los errores")
            return
        }

        navigate()

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
                        }}>Hora inicial</Text>
                        <View style={{
                            ...styles.row,
                            ...styles.puntoDeReunion,
                            borderWidth: errorHoraInicial ? 1 : 0,
                        }}>
                            <Feather
                                style={{
                                    position: 'absolute',
                                    left: 10,
                                }}
                                name="clock"
                                size={25}
                                color={moradoOscuro}
                            />

                            <Text style={styles.txtLocation}>{!fechaInicial ? "--:--" : formatAMPM(fechaInicial)}</Text>

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
                        }}>Hora final</Text>
                        <View style={{
                            ...styles.row,
                            ...styles.puntoDeReunion,
                            borderWidth: errorHoraFinal ? 1 : 0,
                        }}>
                            <Feather
                                style={{
                                    position: 'absolute',
                                    left: 10,
                                }}
                                name="clock"
                                size={25}
                                color={moradoOscuro}
                            />

                            <Text style={styles.txtLocation}>{!fechaFinal ? "--:--" : formatAMPM(fechaFinal)}</Text>

                        </View>

                    </Pressable>
                </View>

                {/* Ubicacion punto de reunion */}
                <Pressable
                    onPress={handlePuntoDeReunion}
                    style={styles.item}>
                    <Text style={styles.captionTxt}>Punto de reunion (inicio y fin)</Text>
                    <View style={[styles.row, styles.puntoDeReunion]}>
                        <Ionicons
                            style={{
                                position: 'absolute',
                                left: 10,
                            }}
                            name="md-location-sharp"
                            size={25}
                            color={moradoOscuro}
                        />

                        <Text style={styles.txtLocation}>{puntoReunionNombre}</Text>

                    </View>

                </Pressable>



                <View style={styles.linea} />

                {/* Texto de titulo */}
                <View style={styles.item}>
                    <Text style={styles.captionTxt}>Titulo</Text>
                    <TextInput
                        maxLength={25}
                        style={{
                            ...styles.textInput,
                            borderColor: "red",
                            borderWidth: errorTitulo ? 1 : 0,
                        }}
                        value={titulo}
                        onChangeText={setTitulo}
                        onPressIn={() => setErrorTitulo(false)}
                    />
                </View>

                {/* Texto de descripcion */}
                <View style={styles.item}>
                    <Text style={styles.captionTxt}>Descripcion evento</Text>
                    <TextInput
                        style={{ ...styles.textInput, textAlignVertical: 'top', }}
                        multiline={true}
                        numberOfLines={3}
                        value={descripcion}
                        onChangeText={setDescripcion} />
                </View>


                <View style={styles.linea} />

                {/* <Pressable
                        onPress={handleInfoPrecio}
                        style={styles.question}>
                        <Text style={styles.questionTxt}>?</Text>
                    </Pressable> */}

                {/* Cantidad de personas */}
                <View style={{
                    ...styles.item,
                    flexDirection: 'row',
                    alignItems: 'center',

                }}>
                    <View style={styles.contenedorSelector}>
                        <SelectorInput
                            cantidad={personasTotales}
                            setCantidad={setPersonas}
                            minValue={1}
                            maxValue={maxPersonas}


                            titulo={"Personas maximas"}

                            cambio={1}
                        />

                    </View>

                    {/* <Pressable
                        onPress={handleInfoPersonas}
                        style={styles.question}>
                        <Text style={styles.questionTxt}>?</Text>
                    </Pressable> */}

                </View>


                {/* Precio por persona */}
                <View style={{
                    ...styles.item,
                    // marginTop: 20,
                    flexDirection: 'row',
                    alignItems: 'center',

                }}>


                    <View style={styles.contenedorSelector}>
                        <SelectorInput
                            cantidad={precio}
                            setCantidad={setPrecio}
                            minValue={precioMin}
                            maxValue={precioMax}

                            titulo={"Precio min /persona"}

                            cambio={50}
                            showSigno={true}
                        />

                    </View>
                </View>

                {/* Permitir/negar tercera edad y niños */}
                <View style={styles.allowContainer}>
                    {/* Tercera edad */}
                    <Pressable
                        onPress={() => setAllowTercera(!allowTercera)}
                        style={styles.allowInnerContainer}>
                        <Text style={styles.textAllow}>Permitir tercera edad</Text>
                        <RadioButton
                            checked={allowTercera}
                            setChecked={setAllowTercera}
                        />

                    </Pressable>
                    <View style={{
                        ...styles.linea,
                        marginBottom: 5,
                        marginTop: 5,
                    }}>

                    </View>

                    {/* Niños */}
                    <Pressable
                        onPress={() => setAllowNinos(!allowNinos)}
                        style={styles.allowInnerContainer}>
                        <Text style={styles.textAllow}>Permitir niños</Text>
                        <RadioButton
                            checked={allowNinos}
                            setChecked={setAllowNinos}
                        />

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

        </View>
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
        backgroundColor: moradoOscuro,
        padding: 10,
        borderRadius: 100,
        alignItems: 'center', justifyContent: 'center',
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
        marginVertical: 15,
        paddingRight: 2.5,
    },

    textAllow: {
        fontSize: 16,
        flex: 1,
    }
})
