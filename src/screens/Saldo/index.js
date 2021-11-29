import React, { useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { container, formatAMPM, formatCuentaCLABE, formatDateShort, formatMoney, getUserSub, moradoOscuro } from '../../../assets/constants'
import { Loading } from '../../components/Loading';
import { Feather } from '@expo/vector-icons';
import { DataStore } from '@aws-amplify/datastore';
import { Usuario } from '../../models';
import { Reserva } from '../../models';

export default function () {

    const [transacciones, setTransacciones] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const [usuarioActual, setUsuarioActual] = useState({});

    useEffect(() => {
        fetchData()
        getActualUser()

    }, []);

    async function getActualUser() {
        const sub = await getUserSub()

        const usuario = await DataStore.query(Usuario, sub)

        setUsuarioActual(usuario)


    }


    function fetchData() {
        return fetch("https://api.stripe.com/v1/balance_transactions", {
            method: "GET",
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "Authorization": "Bearer " + "rk_test_51J7OwUFIERW56TAE2Af9n7pLq9RrCk5ABDR6EoPFdHzPIM9v3kkxCAt12wdBIvV6b9QKLxMlsPlkK2fmX9SO1MtX00H16Ba1De",
                "Stripe-Account": "acct_1Jzmuz2V1EJMOgyd"
            }
        }).then(r => r.json())
            .then(r => {
                if (r.has_more) {
                    Alert.alert("Faltan", "Faltan transferencias a mostrar, avisa al desarrollador")
                }
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

    function formatDate(input) {
        return formatDateShort(input) + " " + formatAMPM(input)
    }

    async function onRefresh() {
        setRefreshing(true)
        await fetchData()
        setRefreshing(false)

    }
    let saldo = 0

    // Agregar al saldo solo las transferencias pendientes
    transacciones?.map(e => {
        if (e.status === "pending") {
            saldo += e.amount
        }

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
                        <Text style={styles.balanceTxt}>Saldo por enviar a cuenta</Text>
                        <Text style={styles.numberBalance}>{formatMoney(saldo)}</Text>

                        <View style={{ flex: 1, }} />

                        <Text style={styles.accountNumber}>{formatCuentaCLABE(usuarioActual.CuentaBancaria)}</Text>

                    </View>
                </ImageBackground>
                <Text style={styles.aviso}>El pago tarda 7 dias en aparecer en tu cuenta bancaria</Text>

                <View style={styles.transaccionesContainer}>
                    <Text style={styles.transaccionesTitle}>Pagos</Text>

                    {!transacciones ?
                        <Loading indicator /> :
                        transacciones.map((e, i) => (
                            <Pressable
                                onPress={() => Alert.alert("Navgar a detalle de fecha")}
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
        marginTop: 30,
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
    }

})
