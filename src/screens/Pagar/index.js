import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'

import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { colorFondo, formatDateShort, formatDia, getUserSub, mayusFirstLetter, moradoClaro, moradoOscuro, msInDay, msInHour, shadowMedia } from '../../../assets/constants'
import Boton from '../../components/Boton';

import {
    confirmPaymentSheetPayment,
    StripeProvider,
    useStripe
} from '@stripe/stripe-react-native';

import API from '@aws-amplify/api';
import ElementoPersonas from './components/ElementoPersonas';
import { createPaymentIntent } from '../../graphql/mutations';
import { DataStore } from '@aws-amplify/datastore';
import { ChatRoom, ChatRoomUsuario, Notificacion, Reserva, TipoNotificacion } from '../../models';
import { Fecha } from '../../models';
import { Usuario } from '../../models';

import { AndroidNotificationPriority, cancelAllScheduledNotificationsAsync, getAllScheduledNotificationsAsync, getPresentedNotificationsAsync, scheduleNotificationAsync } from 'expo-notifications';


import { sendPushNotification } from '../../../assets/constants/constant';


export default function ({ route, navigation }) {

    let {
        adultos,
        ninos,
        tercera,
        comisionVelpa: comision,

        precioIndividual: precioIndividualConComision,

        nicknameGuia,
        tituloAventura,
        fechaFinal,
        fechaInicial,
        descripcion,
        imagenFondo,
        calificacionGuia,
        stripeID,

        fechaID,
        guiaID
    } =
        route.params

    // Variables de stripe
    const { initPaymentSheet, presentPaymentSheet } = useStripe()

    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(false);
    const [paymentLoaded, setPaymentLoaded] = useState(false);

    // Id de transaccion
    const [idPago, setIdPago] = useState("");

    // Opciones que se llenan cuando tenemos tarjeta seleccionada
    const [paymentOption, setPaymentOption] = useState({});

    const [tipoPago, setTipoPago] = useState(null);

    // UI del boton
    const [buttonLoading, setButtonLoading] = useState(false);

    // Fecha
    const [fecha, setFecha] = useState(null);
    const [sub, setSub] = useState("");


    const personasTotales = adultos + ninos + tercera

    const precioTotal = precioIndividualConComision * personasTotales

    useEffect(() => {
        fetchFecha()
        // Empezar a cargar el client secret primero
        fetchPaymentIntent()
            .catch(e => {
                setError(true)
                console.log(e)

            })
    }, []);

    const fetchFecha = async () => {
        setFecha(await DataStore.query(Fecha, fechaID))

    }

    useEffect(() => {
        // Una vez se obtiene preparar el modal de pago
        if (clientSecret) {
            initializePaymentSheet()
                .then(r => {
                    setPaymentLoaded(true)
                })
                .catch(e => {
                    console.log(e)
                    setError(true)
                })
        }
    }, [clientSecret]);



    ///////////////////////////////////////////////////////////////////
    /////////////////////////////FUNCIONES/////////////////////////////
    ///////////////////////////////////////////////////////////////////
    function verOpciones() {
        navigation.pop(2)
    }

    // Obtener el clientSecret del backend
    const fetchPaymentIntent = async () => {
        try {


            const sub = await getUserSub()
            setSub(sub)

            if (!stripeID) {
                Alert.alert("Error",
                    "Lo sentimos, el guia no ha registrado sus datos bancarios pero puedes ver mas opciones",
                    [
                        {
                            text: "OK",
                            onPress: verOpciones
                        },
                    ],
                    { cancelable: false }
                )
                setError(true)
                return
            }

            const response = await API.graphql({
                query: createPaymentIntent, variables:
                {
                    amount: Math.round(precioTotal),
                    destinationStripeID: stripeID,
                    comision,
                    fechaID,
                    usuarioID: sub
                }
            })

            if (!response?.data?.createPaymentIntent?.id || !response?.data?.createPaymentIntent?.clientSecret) {
                Alert.alert("Error", "Error obteniendo el clientSecret")
                setError(true)
                return
            }

            // Obtener el id de pago y el client secret
            setIdPago(response.data.createPaymentIntent.id)
            setClientSecret(response.data.createPaymentIntent.clientSecret)

            return response

        } catch (error) {
            return error
        }
    }

    //Empezar a cargar el modal de pago
    const initializePaymentSheet = async () => {
        if (!clientSecret) return
        const { error } = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: 'Velpa adventures',
            customFlow: true,
        });

        if (error) {
            setError(true)
            Alert.alert(error)
            return
        }
    }


    const openPaymentSheet = async () => {
        const { error, paymentOption } = await presentPaymentSheet({
            confirmPayment: false,

        });


        if (error) {
            setButtonLoading(false)
            setError(true)

            Alert.alert(`${error.code}`, error.message);
        }
        else {
            // handleCreateReservacion()
            setPaymentOption(paymentOption)
        }
    };


    // Action tras darle click a agregar metodo de pago
    const handleAddPaymentMethod = async () => {


        if (!paymentLoaded) {
            Alert.alert("Espera", "Espera unos segundos, todavia no carga la ventana de pago")
            return
        }

        if (error) {
            Alert.alert("Error", "Error haciendo el pago, vuelve a intentarlo mas tarde")
            return
        }
        if (clientSecret !== null) {
            openPaymentSheet()
        } else {
            Alert.alert("Error", "Ocurrio un error, vuelve a intentarlo mas tarde")
            setError(true)
        }
    }

    const isFechaFull = async (fecha) => {
        const reservas = await DataStore.query(Reserva, r => r.fechaID("eq", fechaID))
        let personasReservadas = 0

        reservas.map(res => {
            const personas = res.tercera + res.adultos + res.ninos
            personasReservadas += personas
        })

        return (personasReservadas + personasTotales > fecha?.personasTotales)
    }


    async function sendNotifications(reservaID, user) {
        /*Enviar notificaciones:
        _Faltando 1 semana
        _Faltando 1 dia
        _Faltando 1 hora
        _A las 8 del dia siguiente de la reserva para calificar
        */
        const initialDate = new Date(fecha.fechaInicial)

        // Poner fecha final al dia siguiente de que acabe a las 8
        let finalDate = new Date(fecha.fechaFinal)
        if (finalDate.getUTCHours() >= 8) {
            finalDate = new Date(finalDate.getTime() + msInDay)
        }
        finalDate.setUTCHours(8)

        const remainingFor1Week = Math.round((initialDate - msInDay * 7 - new Date) / 1000)
        const remainingFor1Day = Math.round((initialDate - msInDay - new Date) / 1000)
        const remainingFor1Hour = Math.round((initialDate - msInHour - new Date) / 1000)
        const remainingForNextDay = Math.round((finalDate - new Date) / 1000)


        // Enviar notificacion de califica al guia
        // Alerta cel
        scheduleNotificationAsync({
            content: {
                title: ((user.nombre ? mayusFirstLetter(user.nombre) : user.nickname) + ", aydanos a hacer de Velpa un lugar mejor"),
                body: "Calfica tu experiencia en " + tituloAventura + " con " + nicknameGuia,
            },
            trigger: {
                seconds: remainingForNextDay,
            },

        })

        // Notificacion IN-APP
        DataStore.save(new Notificacion({
            tipo: TipoNotificacion.CALIFICAUSUARIO,

            titulo: "Califica tu experiencia",
            descripcion: ((user.nombre ? mayusFirstLetter(user.nombre) : user.nickname) + ", ayudanos a hacer de Velpa un lugar mejor, calfica a " + nicknameGuia + " en " + tituloAventura),

            showAt: finalDate.getTime(),

            usuarioID: sub,
            aventuraID: fecha.aventuraID,

            imagen: imagenFondo.key,

            guiaID
        }))



        // Si falta mas de una semana para la fecha enviar notificacion
        if (remainingFor1Week > 0) {
            // Alerta cel
            scheduleNotificationAsync({
                content: {
                    title: "Todo listo??",
                    body: "Tu experiencia en " + tituloAventura + " es en 1 semana, revisa el material a llevar",
                    priority: AndroidNotificationPriority.HIGH,
                    vibrate: true,
                    data: {
                        reservaID
                    }

                },
                trigger: {
                    seconds: remainingFor1Week,
                },

            })

            // Notificacion IN-APP
            DataStore.save(new Notificacion({
                tipo: TipoNotificacion.RECORDATORIOFECHA,

                titulo: "Experiencia en 1 semana",
                descripcion: "Tu experiencia en " + tituloAventura + " es en 1 semana, ya tienes todo listo?",

                showAt: (new Date(initialDate - msInDay * 7)).getTime(),

                usuarioID: sub,

                fechaID: fecha?.id,
                reservaID
            }))

        }


        // Si falta mas de una dia para la fecha enviar notificacion
        if (remainingFor1Day > 0) {
            // Alerta cel
            scheduleNotificationAsync({
                content: {
                    title: "Solo falta 1 dia!!",
                    body: "Tu experiencia en " + tituloAventura + " es mañana, revisa todo tu material y el punto de reunion",
                    priority: AndroidNotificationPriority.MAX,
                    vibrate: true,
                    data: {
                        reservaID
                    }

                },
                trigger: {
                    seconds: remainingFor1Day,
                },
            })

            // Notificacion IN-APP
            DataStore.save(new Notificacion({
                tipo: TipoNotificacion.RECORDATORIOFECHA,

                titulo: "Experiencia mañana",
                descripcion: "Tu experiencia en " + tituloAventura + " es mañana, revisa todo tu material y el punto de reunion",

                showAt: (new Date(initialDate - msInDay)).getTime(),

                usuarioID: sub,

                fechaID: fecha?.id,
                reservaID
            }))

        }

        // Enviar notificacion de en menos de 1 hora
        // Alerta cel
        scheduleNotificationAsync({
            content: {
                title: "Estas a nada de irte",
                body: "Tu experiencia en " + tituloAventura + " es en menos de 1 hora, no hagas esperar al guia!!" + (tipoPago === "EFECTIVO" ? "\nRecuerda llevar el pago de $" + precioTotal + " en efectivo de la aventura" : ""),
                priority: AndroidNotificationPriority.MAX,
                vibrate: true,
                data: {
                    reservaID
                }

            },
            trigger: {
                seconds: remainingFor1Hour > 0 ? remainingFor1Hour : 1,
            },

        })

        // Notificacion IN-APP
        DataStore.save(new Notificacion({
            tipo: TipoNotificacion.RECORDATORIOFECHA,

            titulo: "Experiencia en menos de 1 hora",
            descripcion: "Tu experiencia en " + tituloAventura + " es en menos de 1 hora, no hagas esperar al guia!!" + (tipoPago === "EFECTIVO" ? "\nRecuerda llevar el pago de $" + precioTotal + " en efectivo de la aventura" : ""),

            showAt: (new Date(initialDate - msInHour)).getTime(),

            usuarioID: sub,

            fechaID: fecha?.id,
            reservaID
        }))


    }

    const handleConfirm = async () => {
        if (tipoPago === null) {
            Alert.alert("Error", "Selecciona un tipo de pago")
        } else {

            try {
                setButtonLoading(true)

                // Revisar que no se haya llenado la fecha
                if (await isFechaFull(fecha)) {
                    setButtonLoading(false)

                    Alert.alert("Atencion",
                        "Lo sentimos, la fecha ya esta llena pero puedes ver mas opciones",
                        [
                            {
                                text: "Ver",
                            },
                        ],
                        { cancelable: false }
                    )
                } else {

                    // Pago con tarjeta
                    if (tipoPago === "TARJETA") {

                        // Verificar pago
                        if (!paymentOption?.label || !paymentOption?.image) {
                            Alert.alert("Error", "Agrega una tarjeta o paga en efectivo")
                            setButtonLoading(false)
                            return
                        }

                        const { error } = await confirmPaymentSheetPayment()
                            .catch(e => {
                                Alert.alert("Error", "Error realizando el pago")
                                console.log(e)
                            })

                        // Si hubo un error con la tarjeta, se sale de la funcion
                        if (error) {
                            setButtonLoading(false)
                            Alert.alert(`Error code: ${error.code}`, error.message);
                            return
                        }
                    }

                    const experienciaGanada = (fecha.experienciaPorPersona) * personasTotales

                    //////////////////////////////////////////////////////////////////////////////
                    ////////////////////VERIFICAR QUE EL USUARIO NO ESTE EN EL CHAT///////////////
                    //////////////////////////////////////////////////////////////////////////////
                    // Obtener id del chatroom correspondiente a la aventura
                    const chatroom = (await DataStore.query(ChatRoom, chat => chat.fechaID("eq", fechaID)))[0]

                    // Obtener el usuario logeado
                    const usuario = await DataStore.query(Usuario, sub)


                    // Verificar que el usuario no este agregado ya al chatRoom
                    const relacion = (await DataStore.query(ChatRoomUsuario)).find(rel => (rel.usuario.id === usuario.id && rel.chatroom.id === chatroom.id))
                    if (!relacion) {
                        // Si no esta el usuario se agrega
                        DataStore.save(new ChatRoomUsuario({
                            usuario,
                            chatroom
                        }))
                    }


                    const datosReserva = {
                        total: precioTotal,
                        comision: precioTotal * comision,
                        pagadoAlGuia: precioTotal - (precioTotal * comision),

                        adultos, ninos, tercera,

                        // Si fue con tarjeta se agrega la referencia al pago
                        pagoID: tipoPago === "TARJETA" ? idPago : null,

                        tipoPago,

                        fechaID,
                        guiaID,
                        usuarioID: sub,
                    }

                    // Crear la reservacion en DataStore
                    const reserva = await DataStore.save(new Reserva(datosReserva))


                    //////////////////////////////////////////////////////////////////////////////
                    //////////////////////////MANDAR LAS NOTIFICACIONES///////////////////////////
                    //////////////////////////////////////////////////////////////////////////////

                    // Notificacion a el guia en telefono
                    DataStore.query(Usuario, guiaID)
                        .then(r => {
                            const { notificationToken, experience } = r

                            // Agregar la experiencia al usuario
                            let newExp = (experience ? experience : 0) + experienciaGanada
                            DataStore.save(Usuario.copyOf(r, n => {
                                n.experience = newExp
                            }))

                            if (notificationToken) {
                                sendPushNotification({
                                    title: "Nueva reserva",
                                    descripcion: "Tienes una nueva reserva en " + tituloAventura + " " + formatDia(fecha.fechaInicial) + " +" + experienciaGanada + " exp",
                                    token: notificationToken
                                })
                            }
                        })


                    // Notificacion al guia IN-APP
                    DataStore.save(new Notificacion({
                        tipo: TipoNotificacion.RESERVAENFECHA,

                        titulo: "Nueva reserva",
                        descripcion: "Tienes una nueva reserva en " + tituloAventura + " " + formatDia(fecha.fechaInicial) + " +" + experienciaGanada + " exp",

                        showAt: new Date().getTime(),

                        // Autorizar al guia a ver la misma
                        owner: fecha?.owner,
                        usuarioID: fecha?.usuarioID,

                        fechaID: fecha?.id,
                        reservaID: reserva.id
                    }))


                    // Notificacion a el usuario
                    DataStore.save(new Notificacion({
                        tipo: TipoNotificacion.RESERVACREADA,

                        titulo: "Reserva exitosa!!",
                        descripcion: "Se ha creado una reserva exitosamente en " + tituloAventura,

                        showAt: new Date().getTime(),

                        usuarioID: sub,

                        fechaID: fecha?.id,
                        reservaID: reserva.id
                    }))

                    sendNotifications(
                        reserva.id,
                        usuario
                    )

                    navigation.navigate("ExitoScreen", { descripcion: ("Reservacion en " + tituloAventura + " creada con exito!!") })
                    setButtonLoading(false)
                }
            } catch (error) {
                setButtonLoading(false)
                console.log(error)
            }
        }

    }

    return (
        < StripeProvider
            publishableKey="pk_live_51J7OwUFIERW56TAETjQ7dMTgYLXQnjLxuss5HmvufxrC3kl0jv6jnQQmTsLCn6UhG3vQPeryjQi04xSQm1XUhs4900866NxYwP"
        // urlScheme={localRedirectSignIn} // required for 3D Secure and bank redirects
        // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        >




            <View style={styles.container}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    style={{
                        padding: 20,
                    }}
                >
                    {/* Mostrar la aventura a pagar */}
                    <View style={[styles.innerContainer, { flexDirection: 'row', }]}>
                        <Image
                            source={{ uri: imagenFondo.uri }}
                            style={styles.imgAventura}
                        />

                        <View style={styles.adventureTextContainer}>


                            <View style={[styles.row, { marginTop: 0, }]}>
                                {/* Titulo de la aventura */}
                                <Text style={{
                                    fontSize: 16,
                                    flex: 1,
                                }}>{tituloAventura}</Text>
                            </View>

                            <Text style={{
                                color: moradoClaro,
                                fontSize: 12,
                                marginBottom: 5,

                            }}>{formatDateShort(fechaInicial, fechaFinal)}</Text>



                            <View style={styles.row}>

                                {/* Guia */}
                                <View style={{ flexDirection: 'row', }}>
                                    <Image
                                        source={require("../../../assets/icons/guia.png")}
                                        style={styles.guiaIcon}

                                    />
                                    <Text style={{ color: "#0000009E", }}>@{nicknameGuia}</Text>
                                </View>

                                {/* Calificacion guia */}
                                {!!calificacionGuia && <View style={{ ...styles.row, marginTop: 0, }}>
                                    <Entypo name="star" size={11} color="#F5BE18" />
                                    <Text style={{ fontSize: 11, }}>{calificacionGuia}</Text>
                                </View>}
                            </View>

                            {/* Descripcion fecha */}
                            {descripcion && <Text style={{ fontSize: 10, marginTop: 10, }}>{descripcion}</Text>}
                        </View>
                    </View>




                    <View style={[styles.innerContainer, { padding: 15, }]}>

                        <ElementoPersonas
                            precio={precioIndividualConComision}
                            titulo={"Tercera edad"}

                            cantidad={tercera}
                        />

                        <View style={styles.line} />

                        <ElementoPersonas
                            precio={precioIndividualConComision}
                            titulo={"Adultos"}

                            cantidad={adultos}
                        />

                        <View style={styles.line} />

                        <ElementoPersonas
                            precio={precioIndividualConComision}
                            titulo={"Niños"}

                            cantidad={ninos}
                        />

                        <View style={styles.line} />

                        {/* Precio */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text
                                style={{ ...styles.titulo, fontWeight: 'bold', }}>Total</Text>
                            <Text
                                style={styles.precioTotal}>$ {Math.round(precioTotal)}</Text>

                        </View>

                    </View>


                    {/* Metodos de pago */}
                    <View style={styles.paymentContainer}>
                        {/* 
                        // Si no se tiene el ultimo numero y la imagen, se muestra agregar
                        // (!paymentOption?.label && !paymentOption?.image) ? 
                        */}

                        <Pressable
                            onPress={() => {
                                paymentLoaded && setTipoPago("TARJETA")

                                // Si esta seleccionado por tarjeta 
                                handleAddPaymentMethod()
                            }}
                            style={styles.metodoDePago}>

                            <View style={{
                                ...styles.iconoIzquierda,
                                alignItems: 'center',

                            }}>
                                <AntDesign name="creditcard" size={30} color="black" />

                            </View>

                            <Text style={{
                                ...styles.titulo,
                                color: tipoPago === "TARJETA" ? "#000" : "#aaa"
                            }}>TARJETA</Text>

                            <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, }}>
                                {paymentLoaded ?
                                    paymentOption?.label ?
                                        tipoPago === "TARJETA" && <Entypo name="check" size={30} color={moradoClaro} />
                                        :
                                        <Entypo name="plus" size={30} color={"#aaa"} />
                                    : <ActivityIndicator size={25} color={"gray"} />}

                            </View>
                        </Pressable>
                        <View style={{
                            borderColor: '#aaa',
                            borderBottomWidth: 1,
                            marginHorizontal: 30,
                        }} />

                        <Pressable
                            onPress={() => {
                                setTipoPago("EFECTIVO")
                            }}
                            style={styles.metodoDePago}>

                            <FontAwesome5 style={styles.iconoIzquierda} name="money-bill-wave-alt" size={24} color={moradoOscuro} />

                            <Text style={{
                                ...styles.titulo,
                                color: tipoPago === "EFECTIVO" ? "#000" : "#aaa"
                            }}>EFECTIVO</Text>
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, }}>
                                {tipoPago === "EFECTIVO" && <Entypo name="check" size={30} color={moradoClaro} />}
                            </View>
                        </Pressable>

                    </View>
                    <View style={{ height: 40, }} />

                </ScrollView>
                <View style={{ flex: 1, }} />
                <View style={{
                    padding: 20,
                }}>

                    <Boton
                        red
                        loading={buttonLoading}
                        titulo={"Confirmar"}
                        onPress={handleConfirm}
                    />
                </View>
            </View>
        </StripeProvider >

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorFondo,
        flex: 1,
    },

    innerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 20,
    },

    imgAventura: {
        width: "33%",
        height: '100%',
    },

    adventureTextContainer: {
        padding: 10,
        paddingVertical: 15,
        paddingRight: 15,
        flex: 1,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
        justifyContent: 'space-between',
    },

    precioTotal: {
        width: '20%',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
    },

    guiaIcon: {
        width: 20,
        height: 20,
        tintColor: "#0000009E"
    },

    line: {
        height: 1,
        marginHorizontal: 20,
        marginVertical: 5,
        backgroundColor: "lightgray"
    },

    metodoDePago: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },

    paymentContainer: {
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: '#fff',
    },

    iconoIzquierda: {
        paddingHorizontal: 15,
        paddingRight: 30,

    },

    titulo: {
        fontSize: 18,
        color: '#AAA',
        fontWeight: 'bold',
        flex: 1,
    },

})
