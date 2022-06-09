import { DataStore } from '@aws-amplify/datastore';
import React, { useEffect, useState } from 'react'
import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { container, formatDateShort, formatMoney, getImageUrl, getUserSub, isUrl, moradoOscuro } from '../../../assets/constants'
import { Loading } from '../../components/Loading';
import { Reserva } from '../../models';

import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Fecha } from '../../models';
import ModalMap from '../../components/ModalMap';

function Item({ e, handleNavigate }) {
    // Variables de ver en el mapa
    const [showModalMap, setShowModalMap] = useState(false);
    const personasReservadas = e.ninos + e.tercera + e.adultos

    const selectedPlace = {
        titulo: e.fecha.puntoReunionNombre,
        ...JSON.parse(e.fecha.puntoReunionCoords)

    }




    return (
        <Pressable
            onPress={() => handleNavigate(e)}

            style={styles.reservaContainer}>
            <Image
                source={{ uri: e.fecha.imagenFondo }}
                style={styles.image}
            />
            <View style={styles.txtContainer}>

                <View style={styles.row}>
                    <View >
                        <Text style={styles.tituloAventura}>{e.fecha.tituloAventura}</Text>
                        <Text style={styles.dateTxt}>{formatDateShort(e.fecha.fechaInicial, e.fecha.fechaFinal)}</Text>
                    </View>
                    <View style={styles.iconContinuar}>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={24}
                            color={"#ffff"}
                        />
                    </View>
                </View>

                {e.cancelado ?
                    <Text style={{ marginTop: 10, textAlign: 'center', color: 'red', }}>Reserva cancelada</Text>

                    :
                    <View >

                        <View style={[styles.row, { marginTop: 10 }]}>
                            <Text >{personasReservadas} persona{personasReservadas !== 1 ? "s" : ""}</Text>
                            <Text style={styles.precio}>{formatMoney(e.total, true)}</Text>

                        </View>

                        <Pressable
                            onPress={() => {
                                setShowModalMap(true)
                            }}
                            style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', }}>

                            <Ionicons
                                name="location-sharp"
                                size={24}
                                color={moradoOscuro}
                            />
                            <Text numberOfLines={1} style={{ ...styles.precio, flex: 1, }}>{e.fecha.puntoReunionNombre}</Text>

                        </Pressable>
                    </View>}


            </View>
            {selectedPlace && !e.cancelado && <ModalMap
                modalVisible={showModalMap}
                setModalVisible={setShowModalMap}

                selectedPlace={selectedPlace}

            />}

            {
                // Filtro oscuro en resrva cancelada
                e.cancelado && <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#00000055',
                    position: 'absolute',
                }} />
            }

        </Pressable>
    )
}


export default function ({ route, navigation }) {
    const idReserva = route.params

    useEffect(() => {
        fetchReservas()
    }, []);

    const [reservas, setReservas] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [reservasProximas, setReservasProximas] = useState(true);

    const fetchReservas = async () => {
        const sub = await getUserSub()

        // Obtener reservas y fechas para cada una canceladas y no canceladas
        const reservas = await DataStore.query(Reserva, r => r.usuarioID("eq", sub), {
            sort: e => e.createdAt("DESCENDING"),
        })
            .then(async r => {
                return await Promise.all(r.map(async res => {

                    const fecha = await DataStore.query(Fecha, res.fechaID)
                        .then(async r => {
                            return {
                                ...r,
                                imagenFondo: await getImageUrl(r.imagenFondo),
                                material: JSON.parse(r.material),
                                incluido: [...(JSON.parse(r.incluido))?.incluido?.map(e => e),
                                ...(JSON.parse(r.incluido)).agregado.map(e => e)
                                ]
                            }
                        })

                    const now = new Date()

                    return ({
                        ...res,
                        reserva: res,
                        fecha,
                        pasada: fecha.fechaInicial < now
                    })
                }))
            })

        setReservas(reservas)

        // Si hay un id de reserva encontrar la reserva para hacer reservas proximas o pasadas

        if (idReserva) {
            const selected = reservas.find(e => e.id === idReserva)
            if (!selected) return

            selected.pasada && setReservasProximas(false)
        }
    }

    function handleNavigate(e) {
        navigation.navigate("DetalleReserva", {
            ...e, setReservas
        })
    }

    function onRefresh() {
        fetchReservas()
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)

        }, 300);
    }

    const nextReservations = reservas?.filter(e => !e.pasada)
    const pastReservations = reservas?.filter(e => e.pasada)

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />}


            style={container}>
            <View style={styles.selectorContainer}>
                <Pressable
                    onPress={() => setReservasProximas(true)}
                    style={{
                        ...styles.itemSelector,
                        backgroundColor: reservasProximas ? moradoOscuro : '#fff',

                    }}>
                    <Text style={{ color: reservasProximas ? "#fff" : "#444", }}>Proximas</Text>
                </Pressable>

                <Pressable
                    onPress={() => setReservasProximas(false)}
                    style={{
                        ...styles.itemSelector,
                        backgroundColor: !reservasProximas ? moradoOscuro : '#fff',

                    }}>
                    <Text style={{ color: !reservasProximas ? "#fff" : "#444", }}>Pasadas</Text>
                </Pressable>


            </View>
            {
                !reservas ?
                    <Loading indicator /> :
                    reservasProximas ?

                        // Reservas proximas
                        (
                            nextReservations.length === 0 ?
                                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', }}>
                                    <Text style={styles.noHay}>No hay reservaciones a aventuras proximas</Text>

                                </View>
                                :
                                nextReservations.map((reserva, i) => {
                                    return <Item
                                        handleNavigate={handleNavigate}
                                        key={i.toString()}
                                        e={reserva}
                                    />

                                })
                        )
                        :

                        // Reservas pasadas
                        (
                            pastReservations.length === 0 ?
                                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', }}>
                                    <Text style={styles.noHay}>No hay reservaciones pasadas</Text>

                                </View>
                                :
                                pastReservations.map((reserva, i) => {
                                    return <Item
                                        handleNavigate={handleNavigate}
                                        key={i.toString()}
                                        e={reserva}
                                    />

                                })
                        )}
            <View style={{ marginTop: 20, }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    selectorContainer: {
        alignSelf: 'center',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 7,
        height: 50,
        marginBottom: 40,
        overflow: "hidden",
        flexDirection: 'row',
    },
    itemSelector: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },

    reservaContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 2,
        marginBottom: 20,
    },

    tituloAventura: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    image: {
        flex: 7,
        height: '100%',
    },

    txtContainer: {
        flex: 10,
        justifyContent: 'center',
        padding: 10,
        paddingVertical: 20,

    },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },


    iconContinuar: {
        padding: 3,
        backgroundColor: moradoOscuro,
        borderRadius: 100,
    },

    dateTxt: {
        color: "#999",
        fontSize: 15,
    },

    precio: {
        color: moradoOscuro,
        fontWeight: 'bold',
    },

    noHay: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})
