import React, { Children, useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { container, formatAMPM, formatCuentaCLABE, formatDateShort, mayusFirstLetter, formatMoney, getUserSub, moradoOscuro, isUrl, getImageUrl } from '../../../assets/constants'
import { Loading } from '../../components/Loading';

import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { DataStore } from '@aws-amplify/datastore';
import { Fecha, Usuario } from '../../models';

import Header from '../../components/header';


import moment from "moment";
import 'moment/locale/es'
import { Reserva } from '../../models';
import Line from '../../components/Line';
import { TipoPago } from '../../models';
import DetalleReserva from '../DetalleFecha/DetalleReserva';
import { PaymentIntents } from '@stripe/stripe-react-native';
import PaymentRow from './components/PaymentRow';

moment.locale('es')


export default function ({ navigation, route }) {

    const [fechas, setFechas] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const [saldo, setSaldo] = useState(0);

    const [usuarioActual, setUsuarioActual] = useState({});

    const [independentTransactions, setIndependentTransactions] = useState([]);
    const [payouts, setPayouts] = useState(false);

    const [pagosAlBanco, setPagosAlBanco] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const [reservas, setReservas] = useState([]);


    useEffect(() => {
        getActualUser()
            .then(usr => {
                fetchPayments(usr)
                fetchPayouts(usr)


            })
    }, []);

    async function getActualUser() {
        const id = route.params?.id

        const sub = id ? id : await getUserSub()

        const usuario = await DataStore.query(Usuario, sub)

        setUsuarioActual(usuario)
        return usuario

    }

    async function fetchPayments(user) {
        let i = new Date()
        return fetch("https://api.stripe.com/v1/balance_transactions?"
            + "limit=100"
            // + "&&fields=[source]"
            // + "&&type=payout"
            + "&&expand[]=data.source.source_transfer.source_transaction"
            + "&&expand[]=data.source.charge"
            , {
                method: "get",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + "sk_test_51J7OwUFIERW56TAEe1Ih8TU1SRyeoyLvP17jicv86HOaEJCjEakiYqMqMJ5ZdsCf3OdXV5Km1qwEN7QYvwEgjv4J00XeAeyKE1",
                    "Stripe-Account": user.stripeID,
                },
            }).then(r => r.json())
            .then(async r => {
                if (r.error) {
                    console.log(r)
                    Alert.alert("Error", "Ocurrio un error obteniendo las transferencias")
                    setFechas([])
                    return
                }
                r = r.data
                let f = {}

                // Transacciones desconocidas por el momento
                let transaccionesIndependientes = []

                let total = 0

                // Lista de todos los pagos a la cuenta que tienen una fecha, reserva y usuario asociadas
                let listaPagos = []


                // Lista de todos los fees cobrados sobre comision en efectiv
                let listaFeesEfectivo = []

                /*
                Lista con las transacciones que no son en efectivo (Cancelacion de pago, cancelacion
                    de app fee, app fee sobre pago en efectivo)
                */
                let listaAlternativo = []

                // Iterar todas las transacciones de stripe
                r?.map(e => {
                    // Agregar al saldo total por enviar al banco
                    const amount = (e.net / 100)
                    total += amount

                    let r = {
                        id: e.id,

                        status: e.status,
                        amount,
                        creado: new Date(e.created * 1000),

                        reporting_category: e.reporting_category,
                        type: e.type,

                        comision: e.fee,
                        disponible: moment(e.available_on * 1000).from(moment()),
                    }

                    // Si es un fee es porque fue devuelto
                    if (e.reporting_category === "fee") {
                        const source = e.source.balance_transaction
                        listaAlternativo.push({
                            ...r,
                            source
                        })
                    }

                    // Si es un refund es devolucion a la app
                    // Encontrar el id fuente
                    else if (e.reporting_category === "refund") {
                        const source = e.source.charge.balance_transaction
                        listaAlternativo.push({
                            ...r,
                            source
                        })

                    }

                    // Si es charge es un deposito a la cuenta
                    else if (e.reporting_category === "charge") {
                        // Sacar id's fuentes
                        const reservaID = e?.source?.source_transfer?.source_transaction?.metadata?.reservaID
                        const fechaID = e?.source?.source_transfer?.source_transaction?.metadata?.fechaID
                        const usuarioID = e?.source?.source_transfer?.source_transaction?.metadata?.usuarioID
                        let otherFees = e?.source?.source_transfer?.source_transaction?.metadata?.otherFees


                        // Si tenemos transacciones sobre el efectivo
                        if (otherFees) {
                            otherFees = JSON.parse(otherFees)

                            listaFeesEfectivo.push(...otherFees.map(e => {
                                return {
                                    ...e,
                                    amount: -e.amount,
                                    creado: e.createdAt,
                                    reporting_category: "fee"
                                }
                            }))


                        }

                        r = {
                            id: e.id,
                            reservaID,
                            fechaID,
                            usuarioID,

                            status: e.status,
                            amount,
                            creado: new Date(e.created * 1000),

                            reporting_category: e.reporting_category,
                            type: e.type,

                            comision: e.fee,
                            disponible: moment(e.available_on * 1000).from(moment()),
                        }

                        // Si el pago tiene fecha ID se agrega a la lista de objetos asi

                        if (fechaID) {
                            if (!f[fechaID]) {
                                f[fechaID] = [r]
                            } else {
                                f[fechaID] = [...f[fechaID], r]

                            }

                            // Agregar el pago a la lista de pagos para despues poderle poner cancelaciones o fees
                            listaPagos.push({
                                id: r.id,
                                fechaID,
                                reservaID
                            })
                        }
                    }
                    // Si no tiene es porque se obtuvo de otro que no es payment intent
                    else {
                        Alert.alert("Atencion", "Hay transaccion sin fecha asociada")
                        transaccionesIndependientes = [...transaccionesIndependientes, r]
                    }

                    return r
                })

                setSaldo(total)

                // Partir en dos objetos para tener una lista de ids fecha y otro con los pagos por fecha
                let fechas = Object.values(f)
                f = Object.keys(f)

                let reser = []
                fechas = await Promise.all(fechas.map(async (Pagos, idx) => {
                    const fechaID = f[idx]

                    const fe = await DataStore.query(Fecha, fechaID)

                    // Obtener la reserva
                    const res = await DataStore.query(Reserva, r => r.fechaID("eq", fechaID), {
                        sort: e => e.createdAt("DESCENDING")
                    })
                        .then(async r => {

                            r = await Promise.all(r.map(async r => {
                                const personasReservadas = r.adultos + r.ninos + r.tercera

                                const usuario = await DataStore.query(Usuario, r.usuarioID).then(r => {
                                    return ({
                                        ...r,
                                        foto: isUrl(r.foto) ? r.foto : "https://picsum.photos/200/200"
                                    })
                                }
                                )
                                reser = [...reser, { ...r, usuario, personasReservadas }]
                                // Encontrar el pago asociado a la reservacion

                                let pago
                                let extra = []


                                // Retirar el mismo de la lista de pagos de la fecha
                                Pagos = Pagos.filter(e => {
                                    if (e.reservaID === r.id) {
                                        listaAlternativo.forEach(alt => {

                                            // Detectar para cancelaciones
                                            if (alt.source === e.id) {
                                                extra.push(alt)
                                            }
                                        })
                                        pago = e
                                    }
                                    return e.reservaID !== r.id
                                })

                                // Hacer por objeto
                                const paymentCancel = extra.find(e => e.reporting_category === "refund")
                                let fees = extra.filter(e => e.reporting_category === "fee")

                                if (r.tipoPago === "EFECTIVO") {
                                    // Poner si tenemos un fee de efectivo
                                    const efectiveFee = listaFeesEfectivo.find(fee => fee.id === r.id)
                                    if (efectiveFee) {
                                        fees.push(efectiveFee)

                                    }

                                }





                                /* Devolver una reserva con el usuario creador,
                                    los datos de la misma el pago asociado si existe y la
                                    informacion sobre si fue cancelado o si tiene comisiones
                                */
                                return {
                                    ...r,
                                    usuario,
                                    pago,
                                    paymentCancel,
                                    fees

                                }
                            }))

                            return r
                        })


                    // Ciclo para agregar los pagos que quedaron sobrando sin reservacion
                    Pagos.map(p => {
                        transaccionesIndependientes = [...transaccionesIndependientes, p]
                    })

                    return {
                        id: fe.id,
                        titulo: fe.tituloAventura,
                        imagen: await getImageUrl(fe.imagenFondo),
                        fechaInicial: fe.fechaInicial,
                        fechaFinal: fe.fechaFinal,

                        Reservas: res
                    }
                }))

                console.log("Tiempo en cargar: ", new Date() - i + " ms")

                setIndependentTransactions(transaccionesIndependientes)
                setFechas(fechas)
                setReservas(reser)
            })
    }

    async function fetchPayouts(user) {
        return fetch("https://api.stripe.com/v1/balance_transactions?"
            + "limit=100"
            + "&&type=payout"
            //  + "&&starting_after=txn_1K6Mum2V1EJMOgydz9hCwNxA"
            , {
                method: "get",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + "sk_test_51J7OwUFIERW56TAEe1Ih8TU1SRyeoyLvP17jicv86HOaEJCjEakiYqMqMJ5ZdsCf3OdXV5Km1qwEN7QYvwEgjv4J00XeAeyKE1",
                    "Stripe-Account": user.stripeID,
                },
            }).then(r => r.json())
            .then(r => {
                if (r.has_more) {
                    console.log("Faltan transferencias a mostrar, avisa al desarrollador")
                }
                if (r.error) {
                    console.log(r)
                    Alert.alert("Error", "Ocurrio un error obteniendo las transferencias")
                    setFechas([])
                    return
                }
                r = r.data
                const transferencias = r?.map(e => ({
                    status: e.status,
                    amount: (e.net / 100) - (e.net / 100) * 2,
                    creado: new Date(e.created * 1000)
                })).sort((a, b) => a.creado < b.creado)


                setPagosAlBanco(transferencias)
                return
            })
    }

    function formatDate(input) {
        return formatDateShort(input) + " a las " + formatAMPM(input, false, true)
    }

    async function onRefresh() {
        setRefreshing(true)
        fetchPayments(usuarioActual)
        fetchPayouts(usuarioActual)

        setRefreshing(false)

    }



    let saldoEnviado = 0
    pagosAlBanco?.map(e => {
        saldoEnviado += e.amount
    })

    function handleHelp() {
        Alert.alert("Info", "Aqui deben aparecer todos los movimientos de dinero en la app, cualquier cosa no dudes en contactarnos")

    }

    async function handleVerReserva(id) {
        const r = reservas.find(r => r.id === id)
        if (r) {


            setSelectedReservation({
                ...r,
                ...r.usuario,
                createdAt: r.createdAt
            })
            setModalVisible(true)

        } else {
            Alert.alert("Error", "No se encontro la reservacion")
        }


    }

    function handleVerFecha(id) {
        navigation.navigate("DetalleFecha", { fechaID: id })
    }


    return (
        <>
            <Header
                title={"Saldo"}
                iconRight={<Pressable
                    onPress={handleHelp}
                    style={{
                        backgroundColor: '#fff',
                        position: 'absolute',
                        right: 16,
                        padding: 5,
                        borderRadius: 20,
                        alignItems: 'center', justifyContent: 'center',


                    }}>
                    <Ionicons name="help" size={26} color={moradoOscuro} />
                </Pressable>
                }
            />
            <View style={container}>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            style={{
                                position: 'absolute',
                                elevation: 20
                            }}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}

                >
                    <ImageBackground style={styles.card} source={require("../../../assets/IMG/Card.png")}>

                        <View style={styles.insideCard}>
                            <Text style={styles.balanceTxt}>{!payouts ? "Saldo por enviar a banco" : "Enviado al banco"}</Text>
                            <Text style={styles.numberBalance}>{formatMoney(payouts ? saldoEnviado : saldo)}</Text>

                            <View style={{ flex: 1, }} />

                            <Text style={styles.accountNumber}>{formatCuentaCLABE(usuarioActual.CuentaBancaria)}</Text>

                        </View>
                    </ImageBackground>
                    <View style={styles.iconsContainer}>

                        <MaterialCommunityIcons
                            onPress={() => setPayouts(false)}

                            style={{
                                marginRight: 45,
                            }}
                            name="send-circle"
                            size={45}
                            color={moradoOscuro + (payouts ? "44" : "ff")}
                        />

                        <Pressable
                            onPress={() => setPayouts(true)}
                            style={{
                                padding: 4,
                                width: 38,
                                height: 38,
                                backgroundColor: moradoOscuro + (!payouts ? "44" : "ff"),
                                borderRadius: 45,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <FontAwesome5
                                name="hand-holding-usd"
                                size={20}
                                color="#fff"
                            />
                        </Pressable>
                    </View>

                    <Text style={styles.aviso}>Por seguridad, el pago tarda 7 dias en enviarse a tu cuenta bancaria</Text>


                    <View style={styles.transaccionesContainer}>
                        <Text style={styles.transaccionesTitle}>{payouts ? "Enviado al banco" : "Pagos de reservaciones"}</Text>
                        {
                            (!payouts ? (fechas) : pagosAlBanco)?.length === 0 && <View style={{
                                paddingTop: 20,
                            }}>
                                <Text>No hay elementos</Text>
                            </View>
                        }
                        {!fechas || !pagosAlBanco ?
                            <Loading indicator /> :
                            payouts ? pagosAlBanco
                                .map((e, i) => (
                                    <Pressable
                                        key={i.toString()}
                                        style={styles.transaccion}>

                                        <View style={styles.dataPerson}>
                                            <View>
                                                <Text style={styles.transaccionDate}>{formatDate(e.creado)}</Text>

                                            </View>

                                            <View style={{ alignItems: 'flex-end' }}>
                                                <Text style={styles.monney}>{formatMoney(e.amount)}</Text>
                                                <Text style={[styles.status, { color: e.status === "pending" ? "orange" : "green", }]}>{e.status === "pending" ? mayusFirstLetter(e.disponible) : "depositado"}</Text>

                                            </View>

                                        </View>
                                    </Pressable>

                                ))
                                :
                                <View style={{
                                    flex: 1,
                                }}>

                                    {fechas.map(fecha => {

                                        return (
                                            <Pressable
                                                onPress={() => handleVerFecha(fecha.id)}
                                                key={fecha.id}
                                                style={{
                                                    marginVertical: 10,
                                                    backgroundColor: '#fff',
                                                    borderRadius: 7,
                                                    overflow: "hidden",
                                                    padding: 0,
                                                    flex: 1,
                                                }}>

                                                {/* Header, detalle de fecha, titulo */}
                                                <View style={{
                                                    flexDirection: 'row',
                                                }}>

                                                    <Image
                                                        source={{ uri: fecha.imagen }}
                                                        style={{
                                                            aspectRatio: 3 / 2,
                                                            height: 80,
                                                        }}
                                                    />
                                                    <View style={{
                                                        flex: 1,
                                                        alignItems: 'center', justifyContent: 'center',
                                                    }}>
                                                        <Text style={{
                                                            fontWeight: 'bold',
                                                        }}>{fecha.titulo}</Text>
                                                        <Text style={{
                                                            color: moradoOscuro,
                                                            fontWeight: 'bold',
                                                        }}>{formatDateShort(fecha.fechaInicial, fecha.fechaFinal)}</Text>
                                                    </View>
                                                </View>

                                                {
                                                    fecha.Reservas.map((res, idx) => {
                                                        const {
                                                            paymentCancel,
                                                            fees
                                                        } = res

                                                        return <Pressable
                                                            onPress={() => handleVerReserva(res.id)}
                                                            key={res.id}
                                                        >


                                                            <View
                                                                style={{
                                                                    flexDirection: 'row',
                                                                    padding: 10,
                                                                    alignItems: 'center',
                                                                    paddingBottom: (paymentCancel || fees.length !== 0) ? 5 : 10,

                                                                }}>
                                                                <Image
                                                                    source={{ uri: res.usuario.foto }}
                                                                    style={{
                                                                        width: 25,
                                                                        height: 25,
                                                                        marginRight: 10,
                                                                        borderRadius: 20,
                                                                    }}
                                                                />

                                                                <PaymentRow
                                                                    style={{ paddingLeft: 0, }}
                                                                    amount={{
                                                                        color: res.tipoPago === "EFECTIVO" ? "black" : "green",
                                                                        content: (res.tipoPago === "EFECTIVO" ? res.total : res.pagadoAlGuia)

                                                                    }}

                                                                    status={{
                                                                        color: res.tipoPago === "EFECTIVO" ? "black" : "orange",
                                                                        content: res.tipoPago === "EFECTIVO" ? "En efectivo" : res.pago.disponible

                                                                    }}
                                                                    description={formatDate(res.pago ? res.pago.creado : res.createdAt)}
                                                                    title={"@" + res.usuario.nickname}
                                                                />
                                                            </View>


                                                            {/* Render de cancelacion de pago en reserva */}
                                                            {paymentCancel && <PaymentRow
                                                                style={{
                                                                    paddingRight: 20,
                                                                }}
                                                                amount={{ content: (paymentCancel.amount) }}
                                                                description={formatDate(paymentCancel.creado)}
                                                                title="Pago cancelado"
                                                            />
                                                            }


                                                            {/* Render de app fees */}
                                                            {
                                                                fees.map((fee, idx) => {
                                                                    // Si es mayor a 0 es una devolucion
                                                                    // Si es menor a 0 es un cobro al efectivo
                                                                    const titulo = fee.amount > 0 ? "Comision devuelta" : "Comision Velpa"


                                                                    return (

                                                                        <PaymentRow
                                                                            key={idx}
                                                                            style={{
                                                                                paddingRight: 20,
                                                                            }}
                                                                            amount={{ content: (fee.amount) }}
                                                                            description={formatDate(fee.creado)}
                                                                            title={titulo}
                                                                        />

                                                                    )
                                                                })
                                                            }



                                                            {idx !== fecha.Reservas.length - 1 && <Line style={{ marginVertical: 0, }} />}
                                                        </Pressable>


                                                        // Casos especiales cuando no hay pago asociado y cuando es en efectivo
                                                        // }
                                                        // // else if (res.tipoPago === TipoPago.EFECTIVO) {
                                                        // //     return <Pressable
                                                        // //         onPress={() => handleVerReserva(res.id)}
                                                        // //         key={res.id}
                                                        // //     >

                                                        // //         <View
                                                        // //             style={{
                                                        // //                 flexDirection: 'row',
                                                        // //                 padding: 10,
                                                        // //                 alignItems: 'center',

                                                        // //             }}>
                                                        // //             <Image
                                                        // //                 source={{ uri: res.usuario.foto }}
                                                        // //                 style={{
                                                        // //                     width: 25,
                                                        // //                     height: 25,
                                                        // //                     marginRight: 10,
                                                        // //                     borderRadius: 20,
                                                        // //                 }}
                                                        // //             />

                                                        // //             {/* Fecha de creacion */}
                                                        // //             <PaymentRow
                                                        // //                 style={{ paddingLeft: 0, }}
                                                        // //                 amount={{
                                                        // //                     content: res.total

                                                        // //                 }}

                                                        // //                 status={{
                                                        // //                     color: "black",
                                                        // //                     content: res.tipoPago
                                                        // //                 }}
                                                        // //                 description={formatDate(res.createdAt)}
                                                        // //                 title={"@" + res.usuario.nickname}
                                                        // //             />

                                                        // //         </View>

                                                        // //         {idx !== fecha.Reservas.length - 1 && <Line style={{ marginVertical: 0, }} />}
                                                        // //     </Pressable>

                                                        // // }

                                                        // else {
                                                        //     return (
                                                        //         <Pressable
                                                        //             onPress={() => handleVerReserva(res.id)}
                                                        //             key={res.id}
                                                        //         >

                                                        //             <Text style={{
                                                        //                 height: 63,
                                                        //                 textAlignVertical: 'center',
                                                        //                 textAlign: 'center',

                                                        //             }}>Error: Reserva con tarjeta sin pago asociado</Text>

                                                        //             {idx !== fecha.Reservas.length - 1 && <Line style={{ marginVertical: 0, }} />}
                                                        //         </Pressable>

                                                        //     )

                                                        // }


                                                    })
                                                }
                                            </Pressable>
                                        )
                                    })}
                                    <View style={{
                                        marginTop: 20,
                                    }} />
                                    {
                                        independentTransactions
                                            .map((e, i) => (
                                                <View
                                                    key={i.toString()}
                                                    style={styles.transaccion}>
                                                    <View style={styles.dataPerson}>
                                                        <View>
                                                            <Text style={styles.transaccionDate}>{formatDate(e.creado)}</Text>

                                                        </View>

                                                        <View style={{ alignItems: 'flex-end' }}>
                                                            <Text style={styles.monney}>{formatMoney(e.amount)}</Text>
                                                            <Text style={[styles.status, { color: e.status === "pending" ? "orange" : "green", }]}>{e.status === "pending" ? mayusFirstLetter(e.disponible) : "depositado"}</Text>
                                                        </View>

                                                    </View>
                                                </View>

                                            ))
                                    }
                                </View>
                        }
                    </View>
                </ScrollView>
            </View >

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <DetalleReserva
                    handleBack={() => setModalVisible(false)}
                    reserva={selectedReservation}
                />


            </Modal>
        </>

    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        overflow: "hidden",
        resizeMode: "contain",
    },

    insideCard: {
        padding: 30,
        flex: 1,
    },

    balanceTxt: {
        color: '#ffffff',
        opacity: .60,
        marginBottom: 5,
    },

    numberBalance: {
        fontSize: 28,
        color: '#fff',
    },

    accountNumber: {
        fontSize: 16,
        color: '#fff',
    },

    transaccionesContainer: {
        marginTop: 20,
    },

    aviso: {
        marginTop: 10,
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
    transaccionesTitle: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',

    },

    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: '#fff',
        marginRight: 5,
    },

    transaccion: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 7,
    },

    dataPerson: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',

    },
    nickname: {
        marginBottom: 5,
    },

    transaccionDate: {
        color: '#000',
        fontSize: 12,
    },

    monney: {
        color: moradoOscuro,
    },

    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },


})
