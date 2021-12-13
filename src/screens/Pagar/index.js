import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native'

import { Entypo } from '@expo/vector-icons';


import { colorFondo, formatDateShort, formatDia, getUserSub, moradoClaro, moradoOscuro, shadowMedia } from '../../../assets/constants'
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
import { getBadgeCountAsync, scheduleNotificationAsync } from 'expo-notifications';
import { sendPushNotification } from '../../../assets/constants/constant';




export default function ({ route, navigation }) {

    let {
        adultos,
        ninos,
        tercera,
        precioIndividualSinComision,
        comisionVelpa: comision,

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
    } = route.params
    // Variables de stripe
    const { initPaymentSheet, presentPaymentSheet } = useStripe()

    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(false);
    const [paymentLoaded, setPaymentLoaded] = useState(false);

    // Id de transaccion
    const [idPago, setIdPago] = useState("");

    const [paymentOption, setPaymentOption] = useState({});


    // UI del boton
    const [buttonLoading, setButtonLoading] = useState(false);

    // Fecha
    const [fecha, setFecha] = useState(null);
    const [sub, setSub] = useState("");


    const personasTotales = adultos + ninos + tercera

    const precioIndividualConComision = precioIndividualSinComision * (1 + comision)
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

    const handleConfirm = async () => {
        // Revisar que no se haya llenado la fecha
        if (await isFechaFull(fecha)) {
            Alert.alert("Atencion",
                "Lo sentimos, la fecha ya esta llena pero puedes ver mas opciones",
                [
                    {
                        text: "Ver",
                        // onPress: verOpciones
                    },
                ],
                { cancelable: false }
            )
        } else {
            // Verificar pago
            if (!paymentOption?.label || !paymentOption?.image) {
                Alert.alert("Error", "Agrega primero un metodo de pago")
                return
            }

            setButtonLoading(true)
            const { error } = await confirmPaymentSheetPayment()
                .catch(e => {
                    Alert.alert("Error", "Error realizando el pago")
                    console.log(e)
                })

            if (error) {
                Alert.alert(`Error code: ${error.code}`, error.message);
            } else {
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
                    await DataStore.save(new ChatRoomUsuario({
                        usuario,
                        chatroom
                    }))
                    console.log("Usuario agregado al grupo")
                }


                const datosReserva = {
                    total: precioTotal,
                    comision: precioTotal * comision,
                    pagadoAlGuia: precioTotal - (precioTotal * comision),

                    adultos, ninos, tercera,

                    pagoID: idPago,

                    fechaID,
                    guiaID,
                    usuarioID: sub
                }

                // Crear la reservacion en DataStore
                const reserva = await DataStore.save(new Reserva(datosReserva))


                //////////////////////////////////////////////////////////////////////////////
                //////////////////////////MANDAR LAS NOTIFICACIONES///////////////////////////
                //////////////////////////////////////////////////////////////////////////////

                // Notificacion a el guia
                const tokenGuia = (await DataStore.query(Usuario, fecha.usuarioID))?.notificationToken

                if (tokenGuia) {
                    sendPushNotification({
                        title: "Nueva reserva",
                        descripcion: "Tienes una nueva reserva en " + tituloAventura + " " + formatDia(fecha.fechaInicial),
                        token: tokenGuia
                    })
                }

                // // Enviar notificaciones al usuario faltando una semana y un dia
                // scheduleNotificationAsync({
                //     content: {
                //         title: tituloAventura,
                //         body: "'Change sides!'",
                //         badge: await getBadgeCountAsync() + 1
                //     },
                //     trigger: {
                //         seconds: 60,
                //     },
                // });



                await DataStore.save(new Notificacion({
                    tipo: TipoNotificacion.RESERVAENFECHA,

                    titulo: "Nueva reserva",
                    descripcion: "Tienes una nueva reserva en " + tituloAventura + " " + formatDia(fecha.fechaInicial),

                    // Autorizar al guia a ver la misma
                    owner: fecha?.owner,
                    usuarioID: fecha?.usuarioID,
                    imagen: imagenFondo,

                    fechaID: fecha?.id,
                    reservaID: reserva.id
                }))

                // Notificacion a el usuario
                await DataStore.save(new Notificacion({
                    tipo: TipoNotificacion.RESERVACREADA,

                    titulo: "Reserva exitosa!!",
                    descripcion: "Se ha creado una reserva exitosamente en " + tituloAventura,
                    imagen: imagenFondo,

                    usuarioID: sub,

                    fechaID: fecha?.id,
                    reservaID: reserva.id
                }))


                navigation.navigate("ExitoScreen", {})
            }
            setButtonLoading(false)
        }
    }

    return (
        < StripeProvider
            publishableKey="pk_test_51J7OwUFIERW56TAEOt1Uo5soBi8WRK6LSSBAgU8btdFoTF1z05a84q9N1DMcnlQcFF7UuXS3dr6ugD2NdiXgcfOe00K4vcbETd"
            // urlScheme={localRedirectSignIn} // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        >

            <View style={styles.container}>



                {/* Mostrar la aventura a pagar */}
                <View style={[styles.innerContainer, { flexDirection: 'row', }]}>
                    <Image
                        source={{ uri: imagenFondo }}
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
                                <Entypo name="star" size={11} color="#F4984A" />
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


                {/* Metodo de pago */}
                {
                    // Si no se tiene el ultimo numero y la imagen, se muestra agregar
                    (!paymentOption?.label && !paymentOption?.image) ?
                        <Pressable
                            onPress={handleAddPaymentMethod}
                            style={{ ...styles.metodoDePago, justifyContent: 'space-between', }}>
                            <Text style={styles.titulo}>Agregar metodo de pago</Text>
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: 24, }}>
                                {paymentLoaded ? <Entypo name="plus" size={24} color={moradoClaro} /> : <ActivityIndicator color={moradoClaro} />}

                            </View>
                        </Pressable>
                        :

                        <View style={styles.metodoDePago}>
                            <View style={styles.bolita} />

                            <Image
                                source={{
                                    uri: `data:image/png;base64,${paymentOption?.image}`,
                                }}
                                style={{
                                    width: '30%',
                                    height: '100%',
                                }}
                            />
                            <Text style={styles.cardNumber}>{paymentOption?.label}</Text>

                        </View>
                }

                <View style={{ flex: 1, }} />
                <Boton
                    loading={buttonLoading}
                    titulo={"Confirmar"}
                    onPress={handleConfirm}
                />
            </View>
        </StripeProvider >

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorFondo,
        flex: 1,
        padding: 20,
    },

    innerContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
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
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: "hidden",
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },

    titulo: {
        fontSize: 18,
        color: '#000',
    },

    cardNumber: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
        textAlign: 'right',
    },

    bolita: {
        ...shadowMedia,

        borderRadius: 100,
        borderWidth: 3,
        borderColor: "#fff",
        backgroundColor: moradoOscuro,
        height: 30,
        width: 30,
        marginRight: 20,
    }
})
