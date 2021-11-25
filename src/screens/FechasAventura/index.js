import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Animated, Dimensions, RefreshControl, StyleSheet, Text, View } from 'react-native'

import { colorFondo, formatDia, formatDiaMesCompeto, isFechaFull, isUrl, moradoClaro, moradoOscuro, msInDay, wait } from '../../../assets/constants';
import ElementoFecha from './components/ElementoFecha';
import HeaderConImagen from '../../components/HeaderConImagen';

import { DataStore, OpType, SortDirection } from '@aws-amplify/datastore';
import { Fecha } from '../../models';
import { Reserva } from '../../models';
import { Usuario } from '../../models';
import { useNavigation } from '@react-navigation/core';
import Storage from '@aws-amplify/storage';
import { Loading } from '../../components/Loading';

export default index = ({ route, navigation }) => {
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
            .then(r => {
                // Crear las subscripciones
                r.map((f, idx) => {
                    const subs = DataStore.observe(Reserva, res => res.fechaID("eq", f.id))
                        .subscribe(async msg => {
                            if (msg.opType === OpType.INSERT) {
                                const reserva = msg.element

                                const totalPersonas = reserva.adultos + reserva.ninos + reserva.tercera

                                const usuario = await DataStore.query(Usuario, reserva.usuarioID)
                                let nuevasFechas = fechas.length !== 0 ? [...fechas] : [...r]
                                nuevasFechas[idx] = {
                                    ...f,
                                    totalPersonasReservadas: nuevasFechas[idx].totalPersonasReservadas += totalPersonas,
                                    personasReservadas: [...nuevasFechas[idx].personasReservadas, {
                                        foto: usuario.foto,
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
                        })
                    subscriptions.push(subs)

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
                    // Obtener todas las reservaciones en la fecha
                    const reservaciones = await DataStore.query(Reserva, res => res.fechaID("eq", fecha.id))

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
                            foto: isUrl(usuario.foto) ? usuario.foto : await Storage.get(usuario.foto),
                            nickname: usuario.nickname,
                            personasReservadas: totalPersonas
                        })
                    }))

                    const imagenRuta = fecha.imagenRuta ? {
                        key: fecha.imagenRuta,
                        url: isUrl(fecha.imagenRuta) ? fecha.imagenRuta : await Storage.get(fecha.imagenRuta)
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

    const handleContinuar = (fecha, guia, idx) => {
        setIndexPresionado(idx)

        navigation.navigate("Logistica", {
            ...fecha,
            imagenFondo,
            tituloAventura: titulo,
            nicknameGuia: guia.nickname,
            calificacionGuia: guia.calificacion,
            stripeID: guia.stripeID,
            precio: fecha.precio,

            fechaID: fecha.id,
        })
    }


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
                        style={{
                            position: 'absolute',
                            elevation: 20
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
                    height: height * 0.24 + 20,
                }} />
                {
                    !fechas ? <Loading indicator /> :
                        fechas.length === 0 ?
                            <Text style={styles.noHayTxt}>No hay fechas disponibles pero puedes suscribirte a la aventura para cuando salga una</Text>
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
                                    // Si es el primer elemento
                                    if (!idx) return <View key={idx.toString()}>
                                        <Text style={styles.fecha}>{formatDiaMesCompeto(e.fechaInicial)}</Text>
                                        <ElementoFecha
                                            idx={idx}
                                            fecha={e}
                                            handleContinuar={handleContinuar}
                                        />
                                    </View>

                                    const feAnterior = new Date(fechas[idx - 1].fechaInicial)
                                    // Si el dia inicial es distinto al dia inicial de la siguiente fecha
                                    if (feInicial.getUTCDate() !== feAnterior.getUTCDate())
                                        return <View key={idx.toString()}>
                                            <Text style={styles.fecha}>{formatDiaMesCompeto(e.fechaInicial)}</Text>
                                            <ElementoFecha
                                                idx={idx}
                                                fecha={e}
                                                handleContinuar={handleContinuar}

                                            />
                                        </View>

                                    return <ElementoFecha
                                        idx={idx}
                                        key={idx.toString()}
                                        fecha={e}
                                        handleContinuar={handleContinuar}
                                    />

                                })
                }
            </Animated.ScrollView >
            <HeaderConImagen
                titulo={titulo}
                imagen={{ uri: imagenFondo }}
                scrollY={scrollY}
                maxHeight={height * 0.24}
                showFilter={true}
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
