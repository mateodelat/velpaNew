import React, { useEffect, useState } from 'react'
import { Animated, Dimensions, RefreshControl, StyleSheet, Text, View } from 'react-native'

import { colorFondo, moradoClaro, msInDay, wait } from '../../../assets/constants';
import ElementoFecha from './components/ElementoFecha';
import HeaderConImagen from '../../components/HeaderConImagen';

import { DataStore } from '@aws-amplify/datastore';
import { Fecha } from '../../models';

export default index = ({ route }) => {
    const { height, width } = Dimensions.get("screen")

    const scrollY = React.useRef(new Animated.Value(0)).current
    const [refreshing, setRefreshing] = useState(false);

    const { titulo, imagenFondo, aventuraID } = route.params

    useEffect(() => {

    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const crearFecha = async () => {
        const initialDate = 1875433509
        const itinerario = {

        }

        const incluido = {

        }
        console.log({
            "personasTotales": 2,
            "fechaInicial": 1875433509,
            "fechaFinal": 1875433509 + msInDay * 2,
            "precio": 1230,
            "comision": 123.45,
            "itinerario": JSON.stringify(itinerario),
            "ubicacionNombre": "Lorem ipsum dolor sit amet",
            "ubicacionLink": "Lorem ipsum dolor sit amet",
            "allowTercera": true,
            "allowNinos": true,
            "material": "Lorem ipsum dolor sit amet",
            "incluido": JSON.stringify(incluido),
            "usuarioID": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d"
        })
        // await DataStore.save(
        //     new Fecha({
        //         "personasTotales": 2,
        //         "fechaInicial": 1875433509,
        //         "fechaFinal": 1875433509 + msInDay * 2,
        //         "precio": 1230,
        //         "comision": 123.45,
        //         "itinerario":  /* Provide init commands */,
        //         "ubicacionNombre": "Lorem ipsum dolor sit amet",
        //         "ubicacionLink": "Lorem ipsum dolor sit amet",
        //         "allowTercera": true,
        //         "allowNinos": true,
        //         "material": "Lorem ipsum dolor sit amet",
        //         "incluido":  /* Provide init commands */,
        //         "usuarioID": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d"
        //     })
        // );
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
                    paddingTop: height * 0.24 + 20,
                }}>
                {/* Texto de fecha inicial */}
                <Text style={styles.fecha}>30 OCTUBRE</Text>

                <ElementoFecha />
                <ElementoFecha />
                <Text style={styles.fecha}>31 OCTUBRE</Text>

                <ElementoFecha />
                <ElementoFecha />
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
