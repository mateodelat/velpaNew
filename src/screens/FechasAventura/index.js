import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Animated, Dimensions, RefreshControl, StyleSheet, Text, View } from 'react-native'

import { calculateComision, colorFondo, formatDiaMesCompeto, getImageUrl, getUserSub, moradoClaro, moradoOscuro, msInDay, wait } from '../../../assets/constants';
import ElementoFecha from './components/ElementoFecha';
import HeaderConImagen from '../../components/HeaderConImagen';

import { DataStore, OpType, SortDirection } from '@aws-amplify/datastore';
import { Fecha } from '../../models';
import { Reserva } from '../../models';
import { Usuario } from '../../models';

import { Loading } from '../../components/Loading';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default ({ route, navigation }) => {
    const { height, width } = Dimensions.get("screen")

    const scrollY = React.useRef(new Animated.Value(0)).current
    const [refreshing, setRefreshing] = useState(false);

    const { titulo, imagenFondo, aventuraID } = route.params

    // el index que se presiona para verificar la fecha llena
    const [indexPresionado, setIndexPresionado] = useState(null);

    // fechas
    const [fechas, setFechas] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let subscriptions = []
        fetchFechas()
            .then(async r => {
                const sub = await getUserSub()
                // Crear las subscripciones
                r.map((f, idx) => {
                    // Suscribirse a la fecha para ver si se ha cancelado o se modifico por el guia
                    subscriptions.push(DataStore.observe(Fecha, fe => fe.id("eq", f.id))
                        .subscribe(async msg => {
                            if (msg.opType === OpType.UPDATE || msg.opType === OpType.DELETE) {
                                const {
                                    fechaInicial,
                                    fechaFinal,
                                } = msg.element

                                if (fechaFinal !== f.fechaFinal || fechaInicial !== f.fechaInicial) {
                                    Alert.alert("Alerta", "La fecha inicial o final han cambiado, revisalo", [{
                                        text: "VER",
                                        onPress: () => {

                                            navigation.navigate("FechasAventura", {
                                                aventuraID: aventuraID,
                                                imagenFondo,
                                                titulo

                                            })
                                            fetchFechas()
                                        }
                                    }], {
                                        cancelable: false

                                    })
                                }
                            }
                        })
                    )

                    subscriptions.push(DataStore.observe(Reserva, res => res.fechaID("eq", f.id).usuarioID("ne", sub))
                        .subscribe(async msg => {
                            if (msg.opType === OpType.INSERT) {
                                const reserva = msg.element

                                const totalPersonas = reserva.adultos + reserva.ninos + reserva.tercera

                                const usuario = await DataStore.query(Usuario, reserva.usuarioID)
                                let nuevasFechas = fechas?.length !== 0 ? fechas : r
                                if (nuevasFechas) {

                                    nuevasFechas[idx] = {
                                        ...f,
                                        totalPersonasReservadas: nuevasFechas[idx].totalPersonasReservadas += totalPersonas,
                                        personasReservadas: [...nuevasFechas[idx].personasReservadas, {
                                            foto: await getImageUrl(usuario.foto),
                                            nickname: usuario.nickname,
                                            personasReservadas: totalPersonas
                                        }]
                                    }

                                    // Si la fecha esta llena, esta se quita
                                    if (isFechaFull(nuevasFechas[idx])) {
                                        console.log(indexPresionado, idx)
                                        if (indexPresionado === idx) {
                                            Alert.alert("Atencion", "Lo sentimos, la fecha se ha llenado pero puedes ver mas opciones", [
                                                {
                                                    text: "Ver",
                                                    onPress: () => {
                                                        navigation.navigate("FechasAventura")
                                                        setIndexPresionado(null)
                                                    }
                                                }
                                            ])
                                        }

                                        nuevasFechas.splice(idx, 1)
                                    }

                                    setFechas([...nuevasFechas])
                                }
                            }
                        }))
                })
            })

        return () => {
            subscriptions.map(r => {
                r.unsubscribe()
            })
        }

    }, []);

    const isFechaFull = (fecha) => {
        return fecha.totalPersonasReservadas >= fecha.personasTotales
    }

    const fetchFechas = async () => {
        const i = new Date()
        // Pedir todas las fechas que tengan fecha inicial mayor a hoy y de la aventura pedida
        return await DataStore.query(Fecha, f => f.aventuraID("eq", aventuraID).fechaInicial("gt", i), {
            sort: s => s.fechaInicial(SortDirection.ASCENDING)
        })
            .then(async r => {

                r = await Promise.all(r.map(async fecha => {
                    let personasReservadas = []
                    let totalPersonasReservadas = 0
                    // Obtener todas las reservaciones en la fecha que no hayan sido canceladas
                    const reservaciones = await DataStore.query(Reserva, res => res
                        .cancelado("ne", true)
                        .fechaID("eq", fecha.id))

                    // Primero mapear todas las reservaciones y sacar las que esten llenas
                    reservaciones.map(res => {
                        const totalPersonas = res.adultos + res.ninos + res.tercera
                        totalPersonasReservadas += totalPersonas
                    })
                    if (totalPersonasReservadas >= fecha.personasTotales) {
                        return false
                    }

                    await Promise.all(reservaciones.map(async res => {
                        const totalPersonas = res.adultos + res.ninos + res.tercera

                        const usuario = await DataStore.query(Usuario, res.usuarioID)
                        personasReservadas.push({
                            foto: await getImageUrl(usuario.foto),
                            nickname: usuario.nickname,
                            personasReservadas: totalPersonas
                        })
                    }))

                    const imagenRuta = fecha.imagenRuta ? {
                        key: fecha.imagenRuta,
                        url: await getImageUrl(fecha.imagenRuta)
                    } : null


                    return {
                        ...fecha,
                        imagenRuta,
                        personasReservadas,
                        totalPersonasReservadas
                    }
                }))
                r = r.filter(e => e)
                setFechas(r)
                setLoading(false)
                const f = new Date()
                console.log("Tiempo de carga:", (f - i), "ms")
                return r
            })
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const handleContinuar = (fecha, guia) => {
        navigation.navigate("Logistica", {
            ...fecha,

            // Comision actual para el guia guia
            comision: calculateComision(guia.experience),

            imagenFondo,
            tituloAventura: titulo,
            nicknameGuia: guia.nickname,
            calificacionGuia: guia.calificacion,
            stripeID: guia.stripeID,
            precio: fecha.precio,

            fechaID: fecha.id,
            guiaID: fecha.usuarioID
        })
    }

    const insets = useSafeAreaInsets()
    return (
        <View style={{
            flex: 1,
            backgroundColor: colorFondo,
        }}>
            {/* Fechas */}
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                refreshControl={
                    <RefreshControl
                        tintColor="transparent"
                        colors={['transparent']}

                        style={{
                            backgroundColor: 'transparent',
                        }}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}

                style={{
                    padding: 20,
                }}>
                <View style={{
                    height: height * 0.24 + 10 + insets.top,
                }} />
                {
                    !fechas ? <Loading indicator /> :
                        fechas?.length === 0 ?
                            <Text style={styles.noHayTxt}>No hay fechas disponibles</Text>
                            :
                            loading ?
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                    height: height / 2,
                                }}>
                                    <ActivityIndicator color={"black"} size={"large"} />
                                </View> :
                                fechas.map((e, idx) => {

                                    const feInicial = new Date(e.fechaInicial)
                                    const feAnterior = idx && new Date(fechas[idx - 1].fechaInicial)

                                    // Si el dia inicial es distinto al dia inicial de la siguiente fecha
                                    return <View key={idx}>
                                        {(!idx || feInicial.getDate() !== feAnterior.getDate()) && <Text style={styles.fecha}>{formatDiaMesCompeto(e.fechaInicial)}</Text>}
                                        <ElementoFecha

                                            showDetails={indexPresionado === idx}
                                            handlePress={() => indexPresionado === idx ? setIndexPresionado(null) : setIndexPresionado(idx)}
                                            idx={idx}
                                            fecha={e}
                                            handleContinuar={handleContinuar}

                                        />
                                    </View>

                                })
                }
            </Animated.ScrollView >
            <HeaderConImagen
                titulo={titulo}
                imagen={{ uri: imagenFondo.uri }}
                scrollY={scrollY}
                maxHeight={height * 0.24 + insets.top}
            // showFilter={false}
            />
        </View >
    )
}


const styles = StyleSheet.create({
    fecha: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16,
        color: moradoClaro,
    },
    noHayTxt: {
        fontSize: 18,
        color: moradoOscuro,
        textAlign: 'center',
    }

})
