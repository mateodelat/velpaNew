import React, { useEffect, useRef, useState } from 'react'
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

import { colorFondo, formatAMPM, formatDateShort, formatDia, getUserSub, mayusFirstLetter, moradoClaro, moradoOscuro, msInDay, msInHour, shadowMedia } from '../../../assets/constants'
import Boton from '../../components/Boton';


import {
    confirmPaymentSheetPayment,
    useStripe
} from '@stripe/stripe-react-native';

import API from '@aws-amplify/api';
import ElementoPersonas from './components/ElementoPersonas';
import { createPaymentIntent, createReserva } from '../../graphql/mutations';
import { DataStore } from '@aws-amplify/datastore';
import { ChatRoom, ChatRoomUsuarios, Notificacion, Reserva, TipoNotificacion } from '../../models';
import { Fecha } from '../../models';
import { Usuario } from '../../models';

import uuid from "react-native-uuid"


import { notificacionesRecordatorio, sendPushNotification } from '../../../assets/constants/constant';
import { Comision } from '../../models';


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

        efectivo,

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

    const [reservaID, setReservaID] = useState(uuid.v4());

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

    // Objeto de comisiones retenidas si el usuario tuvo
    const comisiones = useRef()

    const [payed, setPayed] = useState(false);

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

    // Devolver las comisiones al usuario de no ser cobradas
    useEffect(() => {

        return () => {
            // Devolver el objeto de comisiones al usuario solo si no estamos despues de pagar con tarjeta
            if (comisiones.current && comisiones.current.length !== 0 && !payed) {
                comisiones.current.map(com => {
                    DataStore.save(Comision.copyOf(com, ne => {
                        ne.editing = false
                        ne.payed = true
                    })).then(r => {
                        console.log("Devolviendo comision: ", r)
                    })
                })
            }

        }
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
        navigation.pop()
        navigation.pop()
        navigation.pop()
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

            const description = tituloAventura + " " + formatDateShort(fechaInicial, fechaFinal) + "  -----  " + personasTotales + " persona" + (personasTotales === 1 ? "" : "s")

            // Poner la comision a enviar como numero de pesos y no porcentaje
            let localComision = Math.round(precioTotal) * comision

            // Pedir el usuario para ver si debe comisiones
            const coms = await DataStore.query(Comision, r => r
                // Id coincidente
                .usuarioID("eq", guiaID)

                // Que no lo este viendo alguien mas
                .editing("ne", true)

                // Que no haya sido procesada
                .payed("ne", true)
            )
                .then(com => {
                    let newComisiones = []
                    // Si debe comisiones, entonces ponerla como editing true
                    com.map(e => {
                        // Mientras la comision no pase al precio total se siguen agregando
                        if ((localComision + e.amount) < precioTotal) {

                            // Si el usuario debe comisiones agregarselos a la comision a enviar
                            localComision += e.amount

                            newComisiones = [...newComisiones, e]

                            DataStore.save(Comision.copyOf(e, n => {
                                n.editing = true
                            }))

                        } else {
                            console.log("Hay pagos no cobrados que se quedaran sin la bandera de editing")
                        }
                    })

                    console.log(newComisiones)
                    comisiones.current = (newComisiones)

                    // Lista de comisiones realizadas
                    return JSON.stringify(newComisiones.map(com => {
                        return {
                            id: com.id,
                            amount: com.amount
                        }
                    }))
                })

            const response = (await API.graphql({
                query: createPaymentIntent, variables:
                {
                    amount: Math.round(precioTotal),
                    destinationStripeID: stripeID,
                    comision: localComision,

                    description,

                    otherFees: coms,

                    reservaID,
                    fechaID,
                    usuarioID: sub
                }
            })
                .catch(e => {
                    Alert.alert("Error", "Error realizando el pago: funcion crear pago devolvio error")
                    console.log(e)
                    return {}
                })
            )?.data?.createPaymentIntent


            if (!response.id || !response.clientSecret) {
                Alert.alert("Error", "Error realizando el pago: client secret no obtenido")
                console.log(response.error)
                setError(true)
                return
            }

            // Obtener el id de pago y el client secret
            setIdPago(response.id)
            setClientSecret(response.clientSecret)

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
            allowsDelayedPaymentMethods: false,

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
        const reservas = await DataStore.query(Reserva, r => r
            .cancelado("ne", true)
            .fechaID("eq", fechaID))
        let personasReservadas = 0

        reservas.map(res => {
            const personas = res.tercera + res.adultos + res.ninos
            personasReservadas += personas
        })

        return (personasReservadas + personasTotales > fecha?.personasTotales)
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
                    let coms = comisiones.current
                    let guia = await DataStore.query(Usuario, guiaID)
                    // Pago con tarjeta
                    if (tipoPago === "TARJETA") {

                        // Verificar pago
                        if (!paymentOption?.label || !paymentOption?.image) {
                            Alert.alert("Error", "Agrega una tarjeta o paga en efectivo")
                            setButtonLoading(false)
                            return
                        }

                        const { error } = await confirmPaymentSheetPayment()

                            // Si el pago se confirma con exito, se eliminan las comisiones que se debian del usuario
                            .then((r) => {
                                if (!r.error) {
                                    console.log("Eliminando comisiones del estado y actualizando en datastore a pagadas...")
                                    comisiones.current?.map(com => {
                                        DataStore.save(Comision.copyOf(com, ne => {
                                            ne.editing = false
                                            ne.payed = true
                                            ne.pagadoEnReservaID = reservaID
                                        })).then(console.log)
                                    })
                                    setPayed(true)
                                    comisiones.current = (null)
                                }
                                return r
                            })
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

                    // Si fue pago en efectivo, se agrega la comision al usuario
                    else {
                        DataStore.save(new Comision({
                            reservaID,
                            amount: precioTotal * comision,
                            editing: false,
                            payed: false,

                            usuarioID: guiaID
                        }))

                        // Actualizar estado de las comisiones viejas a dejando de editar
                        coms.map(com => {
                            DataStore.save(com, e => {
                                e.editing = false
                            })
                        })

                        comisiones.current = (null)

                    }




                    const experienciaGanada = (fecha.experienciaPorPersona) * personasTotales

                    //////////////////////////////////////////////////////////////////////////////
                    ////////////////////VERIFICAR QUE EL USUARIO NO ESTE EN EL CHAT///////////////
                    //////////////////////////////////////////////////////////////////////////////
                    // Obtener id del chatroom correspondiente a la aventura
                    const chatroom = (await DataStore.query(ChatRoom, chat => chat.fechaID("eq", fechaID)))[0]

                    // Obtener el usuario logeado
                    const usuario = await DataStore.query(Usuario, sub)


                    // Verificar que el usuario no este agregado ya al chatroom
                    const relacion = (await DataStore.query(ChatRoomUsuarios)).find(rel => (rel.usuario.id === usuario.id && rel.chatroom.id === chatroom.id))
                    if (!relacion) {
                        // Si no esta el usuario se agrega
                        DataStore.save(new ChatRoomUsuarios({
                            usuario,
                            chatroom
                        }))
                    }

                    const datosReserva = {
                        id: reservaID,
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


                    // Crear la reservacion en API para pasar ID
                    await API.graphql({ query: createReserva, variables: { input: datosReserva } })

                    //////////////////////////////////////////////////////////////////////////////
                    //////////////////////////MANDAR LAS NOTIFICACIONES///////////////////////////
                    //////////////////////////////////////////////////////////////////////////////

                    // Notificacion a el guia en telefono
                    const { notificationToken, experience } = guia

                    // Agregar la experiencia al usuario
                    let newExp = (experience ? experience : 0) + experienciaGanada
                    DataStore.save(Usuario.copyOf(guia, n => {
                        n.experience = newExp
                    }))

                    if (notificationToken) {
                        sendPushNotification({
                            title: "Nueva reserva",
                            descripcion: "Tienes una nueva reserva en " + tituloAventura + " " + formatDia(fecha.fechaInicial) + " +" + experienciaGanada + " exp",
                            token: notificationToken
                        })
                    }


                    // Notificacion al guia IN-APP
                    DataStore.save(new Notificacion({
                        tipo: TipoNotificacion.RESERVAENFECHA,

                        titulo: "Nueva reserva",
                        descripcion: "Tienes una nueva reserva en " + tituloAventura + " " + formatDia(fecha.fechaInicial) + " +" + experienciaGanada + " exp",

                        showAt: new Date().getTime(),

                        // Autorizar al guia a ver la misma
                        usuarioID: fecha?.usuarioID,

                        fechaID: fecha?.id,
                        reservaID
                    }))


                    // Notificacion a el usuario
                    DataStore.save(new Notificacion({
                        tipo: TipoNotificacion.RESERVACREADA,

                        titulo: "Reserva exitosa!!",
                        descripcion: "Se ha creado una reserva exitosamente en " + tituloAventura + " para el " + formatDateShort(fechaInicial, fechaFinal) + " a las " + formatAMPM(fechaInicial),

                        showAt: new Date().getTime(),

                        usuarioID: sub,

                        fechaID: fecha?.id,
                        reservaID
                    }))

                    notificacionesRecordatorio({
                        scheduled: true,
                        // Datos del cliente para la notificacion de calificar
                        cliente: {
                            calificaClienteImage: imagenFondo.key,
                            tipoPago,
                            precioTotal,
                            nickname: (usuario.nombre ? mayusFirstLetter(usuario.nombre) : usuario.nickname),
                        },

                        // Datos del guia para la notificacion de calificar
                        guia: {
                            guiaID,
                            nickname: nicknameGuia,
                        },

                        // Datos otras notificaciones
                        fechaInicial: fecha.fechaInicial,
                        fechaFinal: fecha.fechaFinal,
                        sub,
                        tituloAventura,

                        aventuraID: fecha.aventuraID,
                        reservaID,
                        fechaID,
                    })

                    navigation.navigate("ExitoScreen", { descripcion: ("Reservacion en " + tituloAventura + " creada con exito!!") })
                    setButtonLoading(false)
                }
            } catch (error) {
                if (error !== "Cancelada") {
                    Alert.alert("Error", "Error creando la reservacion")
                    console.log(error)
                }
                setButtonLoading(false)
            }
        }

    }

    return (

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
                    {efectivo && <><View style={{
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
                    </>}

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
