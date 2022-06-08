import { DataStore } from '@aws-amplify/datastore';
import React, { useEffect, useState } from 'react'
import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { container, formatDateShort, formatMoney, getImageUrl, getUserSub, moradoOscuro } from '../../../assets/constants'
import { Loading } from '../../components/Loading';
import { Reserva } from '../../models';

import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Fecha } from '../../models';
import ModalMap from '../../components/ModalMap';

import { Usuario } from '../../models';

function Item({ e, handleNavigate }) {
    const selectedPlace = {
        titulo: e.puntoReunionNombre,
        ...JSON.parse(e.puntoReunionCoords)

    }

    // Variables de ver en el mapa
    const [showModalMap, setShowModalMap] = useState(false);
    return (
        <Pressable
            onPress={() => handleNavigate(e.id)}

            style={styles.reservaContainer}>
            <Image
                source={{ uri: e.imagenFondo }}
                style={styles.image}
            />
            <View style={styles.txtContainer}>

                <View style={styles.row}>
                    <View >
                        <Text style={styles.tituloAventura}>{e.tituloAventura}</Text>
                        <Text style={styles.dateTxt}>{formatDateShort(e.fechaInicial, e.fechaFinal)}</Text>
                    </View>
                    <MaterialIcons
                        style={styles.iconContinuar}
                        name="keyboard-arrow-right"
                        size={24}
                        color={"#ffff"}
                    />
                </View>

                <View style={[styles.row, { marginTop: 10 }]}>
                    <Text >{e.personasReservadasNum}/{e.personasTotales} personas</Text>
                    {e.personasReservadasNum === 0 ? <Text style={styles.precio}>{formatMoney(e.precio, true)} /p</Text>
                        :
                        <Text style={styles.precio}>{formatMoney(e.precioAcomuladoSinComision, true)}</Text>
                    }

                </View>

                <Pressable
                    onPress={() => {
                        setShowModalMap(true)
                    }}
                    style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', }}>

                    <Ionicons
                        name="location-sharp"
                        size={24}
                        color={moradoOscuro}
                    />
                    <Text numberOfLines={1} style={{ ...styles.precio, flex: 1, }}>{e.puntoReunionNombre}</Text>

                </Pressable>

            </View>
            {selectedPlace && <ModalMap
                modalVisible={showModalMap}
                setModalVisible={setShowModalMap}

                selectedPlace={selectedPlace}

            />}

        </Pressable>
    )
}


export default function ({ navigation }) {
    useEffect(() => {
        fetchReservas()
    }, []);

    const [fechas, setFechas] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const [reservasProximas, setReservasProximas] = useState(true);

    const fetchReservas = async () => {
        const sub = await getUserSub()

        // Obtener fechas
        const fechas = await DataStore.query(Fecha, r => r.usuarioID("eq", sub), {
            sort: e => e.fechaInicial("DESCENDING")
        })
            .then(async r => {
                return await Promise.all(r.map(async fecha => {

                    const now = new Date()
                    const reservas = await DataStore.query(Reserva, res => res.fechaID("eq", fecha.id))
                    let personasReservadas = []

                    await Promise.all(reservas.map(async res => {
                        const totalPersonas = res.adultos + res.ninos + res.tercera


                        const usuario = await DataStore.query(Usuario, res.usuarioID)
                        personasReservadas.push({
                            ...res,

                            foto: await getImageUrl(usuario.foto),
                            nickname: usuario.nickname,
                            personasReservadas: totalPersonas,

                            precioPagado: res.pagadoAlGuia,
                        })
                    }))

                    let personasReservadasNum = 0
                    let precioAcomulado = 0
                    let precioAcomuladoSinComision = 0

                    reservas.map(e => {
                        precioAcomulado += e.total
                        precioAcomuladoSinComision += e.pagadoAlGuia
                        personasReservadasNum += (e.adultos + e.ninos + e.tercera)
                    })


                    return {
                        // Obtener reservas y personas reservadas en la fecha
                        reservas,
                        personasReservadas,

                        personasReservadasNum,
                        precioAcomulado,
                        precioAcomuladoSinComision,

                        ...fecha,
                        imagenFondo: await getImageUrl(fecha.imagenFondo),
                        material: JSON.parse(fecha.material),
                        incluido: {
                            incluido: JSON.parse(fecha.incluido)?.incluido,
                            agregado: (JSON.parse(fecha.incluido))?.agregado
                        },
                        pasada: fecha.fechaInicial < now

                    }
                }))
            })

        setFechas(fechas)
    }

    function onRefresh() {
        fetchReservas()
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 300);

    }

    function handleNavigate(id) {
        const idx = fechas.findIndex(e => e.id === id)
        const e = fechas[idx]


        // Ir a detalle fecha y pasarle un parametro de fechas con el index selecionado
        navigation.navigate("DetalleFecha", { fecha: e, setFechas, idx, fechas })


    }

    const nextDates = fechas?.filter(e => !e.pasada)
    const pastDates = fechas?.filter(e => e.pasada)

    return (
        <ScrollView
            refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />}

            showsVerticalScrollIndicator={false}
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
                !fechas ?
                    <Loading indicator /> :
                    reservasProximas ?

                        // Reservas proximas
                        (
                            nextDates.length === 0 ?
                                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', }}>
                                    <Text style={styles.noHay}>No hay fechas proximas</Text>

                                </View>
                                :
                                nextDates.map((reserva, i) => {

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
                            pastDates.length === 0 ?
                                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', }}>
                                    <Text style={styles.noHay}>No hay fechas pasadas</Text>

                                </View>
                                :
                                pastDates.map((reserva, i) => {
                                    return <Item
                                        handleNavigate={handleNavigate}
                                        key={i.toString()}
                                        e={reserva}
                                    />

                                })
                        )}

            <View style={{
                marginBottom: 20,
            }} />
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
