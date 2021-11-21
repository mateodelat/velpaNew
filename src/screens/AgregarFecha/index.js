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



const { height } = Dimensions.get("screen")

export default function ({ navigation, route }) {
    const { aventura } = {
        aventura: {
            _deleted: null,
            _lastChangedAt: 1637331302114,
            _version: 1,
            altimetriaRecorrida: 345,
            altitud: 98,
            categoria: "APLINISMO",
            comision: 0.2,
            coordenadas: {
                latitude: -12.102202092674586,
                longitude: -77.03518331050873,
            },
            createdAt: "2021-11-19T14:15:02.089Z",
            descripcion: null,
            dificultad: 2,
            distanciaRecorrida: 45,
            duracion: "1 dia",
            estadoAventura: "PENDIENTE",
            id: "1f7a4bf1-79ac-48f7-871c-1091421fa533",
            imagenDetalle: [
                "https://velpabuckets3100617-dev.s3.us-east-1.amazonaws.com/public/imagen-0%20ave-1f7a4bf1-79ac-48f7-871c-1091421fa533.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4D2FQFF7BGQZPC4X%2F20211121%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211121T000624Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLWVhc3QtMSJIMEYCIQDZdeF44vknGMpaotZOkwW7cbmUOiKjTYPYATXl90FbNAIhAM9PMzbdIkk6gNcN33eWGEIgqfJ%2BQ3erz9RQAHOp7%2FoWKs0ECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMODMyODMyNTQ3MTk4Igyg4inEkTrzbPuBobIqoQQNzhwH%2B3kOR8OosmDyloH8CQ6m9xhrM%2F%2F123eRVr%2FeQTlv3QEe%2Fhr%2BqdpBHdp%2F7nECnl6TGuxDyDI4A3%2FFb7Qfx3hIxa%2FkB6N99ii6b6JLEBSMuncAs1Y1RYbS%2F1cjxxvQn47DxrS6OdmHT63rY1%2FLqUyEORTUvQKBw7Jgy9kE2OZ5SPhoo%2B3hgFedhqwMSYDJ2MnQa5JACi9r2uFlSp6cA%2BQHpl0qpZUNhd8XQEDDbQQ97It%2Bm3KsE8%2FDIMjojmjtumJ6I2bbmU9ZIr0vkv4ocnPv0oSoyZWaQ2GllG5jeyqsQBBDCk25PD9BNIYe%2FytKaSXAb6s6%2BfBGL2oJC7hbVHljqR7Gte8dB9MRjmC%2Fa0qrvdITKG3v1um%2FpF%2Fd9X2euB%2Basmp727GQBPwTknCNkFsbdRN7a5Nn4c49yoSbLBZcBz7UBhXaawN47NkjkiWRtlU6hU7polim%2BzppC%2FepPnGJbTSIovBWgpVaauALZG%2FOs%2BmhxDivKWOkr%2BE9%2FDyQi0hlaH4AoH2czYJF6e34xci9C6gCILZaLJN3VF3na3jOgNiK1ehfGCXbA0uWE75EKPCqYWFy90kE6DovGJmvtfbsuozhGffJuZar%2BBbpgAmiu8B%2F1gxunMaW4wV1ZEyoMQsjgk6G%2BVqJAlSGWLE2x69uK3kLobivRKkR4oOAiyIw910QfRCDcN2ak9llGWHaaSfymtShVmpkYSTmP5n07jD%2BmuaMBjqEAp53MOmGzq9ApBcx8ObnoRV%2BYgKLJ6VjrYeLDLFccj40JYP%2BZqw06A6RmhzBtS6rbWqqbwPX%2FLewAdd7KDGJHBQ2ugyB9PTfA0dKO0GXZ4DnUA2iSze4hekc%2FVD44qLdNG%2F3hw38paKdbncqIjVKqNOsH%2FRt3y5ZmZ9cR9LVO7nKrXqDQBA%2BtS0O7tyKgzb%2FC0LpaiLLBFCU3e5DLZYzbbae1VilWhefrhhl7l%2BUOQThgQMMF3WEgBFaXH8ziM6AIqc0pjlmUP8FQUB7DUyVMUIHutsG0spRWCWL8tHRIdNQaM5b0fxh323CB718qvcu0ScA8NQc5k4PMTuTI4Cq0tVM2WDB&X-Amz-Signature=0f3621249d9455e2cc2dccd12d8fc8b67b36fcb92dffb8e78c2e4029b2699d21&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.6.1%20os%2Fother%20lang%2Fjs%20md%2Fbrowser%2Funknown_unknown%20api%2Fs3%2F3.6.1%20aws-amplify%2F4.3.6_react-native&x-id=GetObject",
            ],
            imagenFondoIdx: 0,
            incluidoDefault: null,
            materialDefault: "[[\"Obligatorio\",[\"material\"]],[\"Alimentacion\",[\"comida\"]],[\"Acampada\",[\"material\"]]]",
            notAllowed: false,
            owner: "google_113316946581811190835",
            precioMax: 4342,
            precioMin: 432,
            puntoReunionId: null,
            puntoReunionLink: null,
            puntoReunionNombre: null,
            titulo: "Nueva aventura",
            ubicacionId: "ChIJAAAAAAAAAAARQNrepMgvBhE",
            ubicacionLink: "https://maps.google.com/?cid=1226720487311071808",
            ubicacionNombre: "Parque El Olivar de San Isidro",
            updatedAt: "2021-11-19T14:15:02.089Z",
        }
    }
    /*route?.params*/

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
    const [errorPuntoReunion, setErrorPuntoReunion] = useState(false);

    // Punto de reunion
    const [puntoReunion, setPuntoReunion] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [error, setError] = useState(false);

    const bloquearADia = fechaInicial ? (horaInicial ? new Date(fechaInicial) : fechaFinal ? new Date(fechaFinal) : new Date(fechaInicial)) : new Date()


    // Titulo
    const [titulo, setTitulo] = useState();
    const [errorTitulo, setErrorTitulo] = useState(false);

    const [descripcion, setDescripcion] = useState();

    // Selectores personasTotales/precio
    const [precio, setPrecio] = useState(redondear(precioMin, 50));


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

    const handleOpenPuntoDeReunion = () => {
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

        const { puntoReunionNombre,
            puntoReunionId,
            puntoReunionLink,
            puntoReunionCoords,
        } = puntoReunion
        console.log(puntoReunion)
        return
        const navigate = () => navigation.navigate("AgregarFecha2", {
            personasTotales,
            fechaInicial,
            fechaFinal,
            precio,

            puntoReunionNombre,
            puntoReunionId,
            puntoReunionLink,
            puntoReunionCoords,

            allowTercera,
            allowNinos,

            incluidoDefault,
            materialDefault,

            titulo,
            descripcion,

            tituloAventura,
            aventuraID: aventura.id,
            comision: aventura.comision,

            imagenFondo
        })

        // Verificaciones

        if (error) {
            Alert.alert("Error")
            return
        }

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
                                style={styles.icono}
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
                    onPress={handleOpenPuntoDeReunion}
                    style={{
                        ...styles.item,
                        marginTop: 20,
                    }}>
                    <Text style={styles.captionTxt}>Punto de reunion (inicio y fin)</Text>

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
                                    name="md-location-sharp"
                                    size={25}
                                    color={moradoOscuro}
                                />

                                <Text style={styles.txtLocation}>{puntoReunion.ubicacionNombre}</Text>
                            </View> :
                            <View style={{ flex: 1 }}>
                                <Ionicons
                                    style={styles.icono}
                                    name="add"
                                    size={25}
                                    color={moradoOscuro}
                                />

                                <Text style={styles.txtLocation}>Agregar punto de reunion</Text>
                            </View>
                        }
                    </Pressable>
                </View>



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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ModalPuntoReunion
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}

                    setPuntoReunion={setPuntoReunion}
                    puntoReunion={puntoReunion}
                />


            </Modal>

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
