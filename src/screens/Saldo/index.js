import React, { useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { container, formatAMPM, formatCuentaCLABE, formatDateShort, formatMoney, getUserSub, moradoOscuro } from '../../../assets/constants'
import { Loading } from '../../components/Loading';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { DataStore } from '@aws-amplify/datastore';
import { Usuario } from '../../models';
import { Reserva } from '../../models';

export default function () {

    const [transacciones, setTransacciones] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const [usuarioActual, setUsuarioActual] = useState({});
    const [payouts, setPayouts] = useState(false);

    const [pagosAlBanco, setPagosAlBanco] = useState(null);


    useEffect(() => {
        getActualUser()
            .then(usr => {
                fetchPayments(usr)
                fetchPayouts(usr)


            })
    }, []);

    async function getActualUser() {
        const sub = await getUserSub()

        const usuario = await DataStore.query(Usuario, sub)

        setUsuarioActual(usuario)
        return usuario

    }


    function fetchPayments(user) {
        return fetch("https://api.stripe.com/v1/balance_transactions?"
            + "limit=100"
            + "&&type=payment"
            //  + "&&starting_after=txn_1K6Mum2V1EJMOgydz9hCwNxA"
            , {
                method: "get",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + "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",
                    "Stripe-Account": user.stripeID,
                },
            }).then(r => r.json())
            .then(r => {
                if (r.error) {
                    Alert.alert("Error", "Ocurrio un error obteniendo las transferencias")
                    setTransacciones([])
                    return
                }
                r = r.data
                const transferencias = r?.map(e => ({
                    status: e.status,
                    amount: (e.net / 100),
                    creado: new Date(e.created * 1000)
                })).sort((a, b) => a.creado < b.creado)


                setTransacciones(transferencias)
                return
            })
    }

    function fetchPayouts(user) {
        return fetch("https://api.stripe.com/v1/balance_transactions?"
            + "limit=100"
            + "&&type=payout"
            //  + "&&starting_after=txn_1K6Mum2V1EJMOgydz9hCwNxA"
            , {
                method: "get",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + "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",
                    "Stripe-Account": user.stripeID,
                },
            }).then(r => r.json())
            .then(r => {
                if (r.has_more) {
                    console.log("Faltan transferencias a mostrar, avisa al desarrollador")
                }
                if (r.error) {
                    Alert.alert("Error", "Ocurrio un error obteniendo las transferencias")
                    setTransacciones([])
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
        return formatDateShort(input) + " " + formatAMPM(input, false, true)
    }

    async function onRefresh() {
        setRefreshing(true)
        fetchPayments(usuarioActual)
        fetchPayouts(usuarioActual)

        setRefreshing(false)

    }
    let saldo = 0

    // Agregar al saldo solo las transferencias pendientes
    transacciones?.map(e => {
        if (e.status === "pending") {
            saldo += e.amount
        }
    })

    let saldoEnviado = 0
    pagosAlBanco?.map(e => {
        saldoEnviado += e.amount
    })




    return (
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

                <Text style={styles.aviso}>El pago tarda 7 dias en enviarse a tu cuenta bancaria</Text>


                <View style={styles.transaccionesContainer}>
                    <Text style={styles.transaccionesTitle}>{payouts ? "Enviado al banco" : "Pagos de reservaciones"}</Text>

                    {!transacciones || !pagosAlBanco ?
                        <Loading indicator /> :
                        (!payouts ? (transacciones) : pagosAlBanco)
                            .map((e, i) => (
                                <Pressable
                                    key={i.toString()}
                                    style={styles.transaccion}>

                                    {/* <Image source={require("../../../assets/IMG/Persona.png")} style={styles.profileImage} /> */}

                                    <View style={styles.dataPerson}>
                                        <View>
                                            {/* <Text style={styles.nickname}>@mateo delat</Text> */}
                                            <Text style={styles.transaccionDate}>{formatDate(e.creado)}</Text>

                                        </View>

                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={styles.monney}>{formatMoney(e.amount)}</Text>
                                            <Text style={[styles.status, { color: e.status === "pending" ? "orange" : "green", }]}>{e.status === "pending" ? "en camino" : "depositado"}</Text>

                                        </View>

                                    </View>
                                </Pressable>

                            ))
                    }
                </View>
            </ScrollView>
        </View>

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
        // fontWeight: 'bold',

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
    },

    monney: {
        color: moradoOscuro,
    },

    status: {
        color: "orange",
        marginTop: 5,
    },

    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },


})
