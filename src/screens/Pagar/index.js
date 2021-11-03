import React, { useEffect, useState } from 'react'
import {
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native'

import { Entypo } from '@expo/vector-icons';


import { colorFondo, moradoClaro, moradoOscuro, shadowMediaa } from '../../../assets/constants'
import Boton from '../../components/Boton';

import { createPaymentIntent } from '../../graphql/mutations';
import {
    confirmPaymentSheetPayment,
    useStripe
} from '@stripe/stripe-react-native';

import API from '@aws-amplify/api';
import ElementoPersonas from './components/ElementoPersonas';

export default function ({ route, navigation }) {

    let {
        adultos,
        ninos,
        tercera,
        precioIndividualSinComision,
        comisionVelpa: comision
    } = route.params

    // Variables de stripe
    const { initPaymentSheet, presentPaymentSheet } = useStripe()

    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(false);
    const [paymentLoaded, setPaymentLoaded] = useState(false);
    const [idPago, setIdPago] = useState("");

    const [paymentOption, setPaymentOption] = useState({});


    // UI del boton
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDoneLoading, setButtonDoneLoading] = useState(false);


    const personasTotales = adultos + ninos + tercera

    const precioIndividualConComision = precioIndividualSinComision * (1 + comision)
    const precioTotal = precioIndividualConComision * personasTotales


    useEffect(() => {
        // Empezar a cargar el client secret primero
        fetchPaymentIntent()
            .catch(e => {
                setError(true)
                console.log(e)

            })
            .then(async r => {
                // obtener uri de imagen de fondo
                // Obtener la imagen de fondo
                // setImagenFondo(imgKey?.startsWith("ave-") ? await Storage.get(imgKey) : imgKey)

            })
    }, []);


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

    // Obtener el clientSecret del backend
    const fetchPaymentIntent = async () => {

        const stripeID = "acct_1JWXsT2YEdZJT2E7"
        if (!stripeID) {
            Alert.alert("Error", "Lo sentimos, guia no ha registrado sus datos bancarios")
            setError(true)
            return
        }

        const response = await API.graphql({
            query: createPaymentIntent, variables:
            {
                amount: Math.floor(precioIndividualSinComision * personasTotales * comision),
                destinationStripeID: stripeID,
                comision
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
        // Obtener cuenta del guia
        // API.graphql({
        //     query: getStripeIDGuia,
        //     variables: {
        //         id: fechaID
        //     }
        // })
        //     .then(async r => {
        // todo lo de arriba
        // })
        // .catch(e => {
        //     console.log(e)
        //     setError(true)
        // })
    }

    const address = {
        city: 'San Francisco',
        country: 'AT',
        line1: '510 Townsend St.',
        line2: '123 Street',
        postalCode: '94102',
        state: 'California',
    };
    const billingDetails = {
        name: 'Jane Doe',
        email: 'foo@bar.com',
        phone: '555-555-555',
        address: address,
    };


    //Empezar a cargar el modal de pago
    const initializePaymentSheet = async () => {
        if (!clientSecret) return
        const { error } = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: 'Velpa adventures',
            primaryButtonColor: moradoOscuro,

            customFlow: true,

            defaultBillingDetails: billingDetails,


        });

        if (error) {
            setError(true)
            Alert.alert(error)
            return
        }
    }

    // Crear en la base de datos la reserva
    // const handleCreateReservacion = async () => {
    //     function OK() {
    //         navigation.navigate("PagoExitoso", {
    //             personasTotales: personasTotales,
    //             imagenFondo,
    //             guia,
    //             titulo,
    //             fecha,
    //             precio: precioTotalConComision,
    //             personasTotales,
    //             chatroomID
    //         })
    //     }

    //     // Obtener sub usuario
    //     const sub = await Auth.currentUserInfo()
    //         .then(r => {
    //             return (r.attributes.sub)
    //         }).catch(e => console.log("Error obteniendo el usuario", e))

    //     // Verificar que no exista ya esa relacion
    //     const exists = (await API.graphql({
    //         query: listChatRoomUsuarios,
    //         variables: {
    //             filter: { usuarioID: { "eq": sub }, chatroomID: { "eq": chatroomID } }
    //         }
    //     }).then(r => {
    //         return r.data.listChatRoomUsuarios.items
    //     })).length === 0 ? false : true
    //     console.log("Existe grupo con esa persona:", exists)

    //     // Si no existe la relacion se agrega usuario al chat
    //     if (!exists) {
    //         // Agregar usuario al grupo de chat
    //         await API.graphql({
    //             query: createChatRoomUsuario,
    //             variables: {
    //                 input: {
    //                     chatroomID,
    //                     usuarioID: sub
    //                 }
    //             }
    //         }).catch(e => {
    //             console.log(e)
    //             Alert.alert("Error", "Error agregando usuario al grupo")
    //         })
    //     }


    //     // Query base de datos con reservacion exitosa
    //     API.graphql({
    //         query: createReservaciones, variables: {
    //             input: {
    //                 fechaID,

    //                 // Variables del precio
    //                 total: totalSinComision,
    //                 comisionPorPersona,

    //                 // Variable de personas
    //                 personas: adultos + ninos + tercera,
    //                 adultos, ninos: ninos, tercera,

    //                 idPago,

    //                 usuarioID: sub
    //             }
    //         }
    //     })
    //         .then(c => {
    //             setButtonLoading(false)
    //             setButtonDoneLoading(true)

    //             Alert.alert("Reservacion exitosa",
    //                 "La reservacion fue creada con exito!!",
    //                 [
    //                     {
    //                         text: "OK",
    //                         onPress: OK
    //                     },
    //                 ],
    //                 { cancelable: false }
    //             )
    //         })
    //         .catch(e => {
    //             Alert.alert("Error", "Error creando reservacion, comunicate con nosotros para mas info")
    //             console.log(e)
    //         })


    // }


    // Abrir modal opciones de pago


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
        // setButtonLoading(true)


        // function verOpciones() {
        //     navigation.pop(3)
        // }

        // Checar que no se haya llenado la fecha
        // let fecha = await API.graphql({
        //     query: getPersonasEnFecha,
        //     variables: { id: fechaID }
        // })
        // fecha = fecha.data.getFecha
        // let numReservaciones = 0
        // fecha.Reservaciones.items.map(f => {
        //     numReservaciones += f.personas
        // })

        // if (numReservaciones + personasTotales <= fecha.personasTotales) {
        if (clientSecret !== null) {
            openPaymentSheet()
        }
        // }
        else {
            Alert.alert("Atencion",
                "Lo sentimos, la fecha ya esta llena pero puedes ver mas opciones",
                [
                    {
                        text: "OK",
                        // onPress: verOpciones
                    },
                ],
                { cancelable: false }
            )

        }
    }


    const handleConfirm = async () => {
        if (!paymentOption?.label || !paymentOption?.image) {
            Alert.alert("Error", "Agrega primero un metodo de pago")
            return
        }

        setButtonLoading(true)
        const { error } = await confirmPaymentSheetPayment().catch(e => {
            console.log(e)
        })


        if (error) {
            setButtonLoading(false)
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            setButtonLoading(false)
            setButtonDoneLoading(true)
            navigation.navigate("ExitoScreen", {})
        }
    }

    return (
        <View style={styles.container}>



            {/* Mostrar la aventura a pagar */}
            <View style={[styles.innerContainer, { flexDirection: 'row', }]}>
                <Image
                    source={require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                    style={styles.imgAventura}
                />

                <View style={styles.adventureTextContainer}>


                    <View style={[styles.row, { marginTop: 0, }]}>
                        {/* Titulo de la aventura */}
                        <Text style={{
                            fontSize: 16,
                            flex: 1,
                        }}>Nevado de colima</Text>
                    </View>

                    <Text style={{
                        color: moradoClaro,
                        fontSize: 12,
                        marginBottom: 5,

                    }}>AGO 30 - SEP 02</Text>



                    <View style={styles.row}>

                        {/* Guia */}
                        <View style={{ flexDirection: 'row', }}>
                            <Image
                                source={require("../../../assets/icons/guia.png")}
                                style={styles.guiaIcon}

                            />
                            <Text style={{ color: "#0000009E", }}>@mateodelat</Text>
                        </View>

                        {/* Calificacion guia */}
                        <View style={{ ...styles.row, marginTop: 0, }}>
                            <Entypo name="star" size={11} color="#F4984A" />
                            <Text style={{ fontSize: 11, }}>4.7</Text>
                        </View>
                    </View>

                    {/* Descripcion fecha */}
                    <Text style={{ fontSize: 10, marginTop: 10, }}>Esta es la descripcion de la fecha hecha por el guia. Normalmente se incluye toda la info de la fecha en una manera reducida </Text>
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
                        <Entypo name="plus" size={24} color={moradoClaro} />
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
                done={buttonDoneLoading}
                titulo={"Confirmar"}
                onPress={handleConfirm}
            />
        </View>
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
        ...shadowMediaa,

        borderRadius: 100,
        borderWidth: 3,
        borderColor: "#fff",
        backgroundColor: moradoOscuro,
        height: 30,
        width: 30,
        marginRight: 20,
    }
})
