import React, { useEffect, useState } from 'react'
import { Animated, Dimensions, RefreshControl, StyleSheet, Text, View } from 'react-native'

import { colorFondo, formatDia, formatDiaMesCompeto, moradoClaro, msInDay, wait } from '../../../assets/constants';
import ElementoFecha from './components/ElementoFecha';
import HeaderConImagen from '../../components/HeaderConImagen';

import { DataStore } from '@aws-amplify/datastore';
import { Fecha } from '../../models';

export default index = ({ route, navigation }) => {
    const { height, width } = Dimensions.get("screen")

    const scrollY = React.useRef(new Animated.Value(0)).current
    const [refreshing, setRefreshing] = useState(false);

    const { titulo, imagenFondo, aventuraID } = {
        "aventuraID": "5b10a5bf-5374-4a4a-b179-7b9e0209dd96",
        "imagenFondo": "https://cdn.britannica.com/84/120884-004-D21DFB10/Iztaccihuatl-Mexico.jpg",
        "titulo": "Iztacihuatl",
    }

    // fechas
    const [fechas, setFechas] = useState([]);
    useEffect(() => {
        fetchFechas()
    }, []);

    const fetchFechas = async () => {
        DataStore.query(Fecha, f => f.aventuraID("eq", aventuraID))
            .then(r => {
                setFechas(r)
            })

    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const handleContinuar = (fecha, guia) => {
        navigation.navigate("Logistica", {
            ...fecha,
            imagenFondo,
            tituloAventura: titulo,
            nicknameGuia: guia.nickname,
            calificacionGuia: guia.calificacion,
            stripeID: guia.stripeID,

            fechaID: fecha.id
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
                    fechas.map((e, idx) => {

                        const feInicial = new Date(e.fechaInicial)
                        // Si es el primer elemento
                        if (!idx) return <View key={idx.toString()}>
                            <Text style={styles.fecha}>{formatDiaMesCompeto(e.fechaInicial)}</Text>
                            <ElementoFecha
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
                                    fecha={e}
                                    handleContinuar={handleContinuar}

                                />
                            </View>

                        return <ElementoFecha
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
    }
})
