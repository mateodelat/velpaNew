import React, { useEffect, useRef, useState } from 'react'
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    FlatList,
    Image,
    Keyboard,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'

import { listAventurasAutorizadas, moradoClaro, moradoOscuro } from '../../../assets/constants';
import Flecha from '../../components/Flecha';
import ComponentePublicidad from './components/ComponentePublicidad';
import Indicador from './components/Indicador';

export default ({ navigation }) => {
    const { height, width } = Dimensions.get("window")


    const flatList = useRef(null)

    const [actualIdx, setActualIdx] = useState(null);
    const [aventuras, setAventuras] = useState([]);
    const [loadingAventuras, setLoadingAventuras] = useState(true);

    const lenghtPublicidad = 3

    let timer

    function empezarTimer(duration) {
        if (actualIdx === null) {
            setActualIdx(1)
            return
        }


        timer = setTimeout(() => {
            flatList?.current?.scrollToIndex({
                index: actualIdx
            })
            setActualIdx(actualIdx < (lenghtPublicidad - 1) ? actualIdx + 1 : 0)
        }, duration);
    }

    useEffect(() => {

        // Timer de publicidad
        if (actualIdx === null) {
            empezarTimer()
        }
        empezarTimer(4000)
    }, [actualIdx]);


    useEffect(() => {
        // Pedir 5 aventuras autorizadas
        listAventurasAutorizadas(5)
            .then(r => {
                setAventuras(r)
            })

    }, []);



    const scrollX = useRef(new Animated.Value(0)).current

    // calcular el promedio de dos precios
    const promedioPrecios = (inicial, final) => {
        return Math.round((inicial + final) / 2)
    }


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}

            onPress={() => Keyboard.dismiss()}

            style={styles.container}>



            {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
            {/* Barra de novedades y publicidad*/}
            {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
            <View style={{
                justifyContent: 'center',
                width: '100%',
                marginTop: 20,
                alignItems: 'center',
            }}>
                <Animated.FlatList
                    pagingEnabled
                    horizontal
                    ref={flatList}

                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(i, idx) => idx.toString()}

                    onTouchStart={() => {
                        clearTimeout(timer)
                        empezarTimer(10000)
                    }}

                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}


                    data={[require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg"), require("../../../assets/IMG/ImageExample.png"), require("../../../assets/IMG/Montana.jpg")]}
                    renderItem={({ item, index, }) => {

                        return <ComponentePublicidad
                            imagenVideo={require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                            imagenFondo={item}
                            titulo={"Nevado de colima"}
                            descripcion={"Descubre esta nueva aventura"}
                            onPress={
                                () => navigation.navigate("DetalleAventura")
                            }
                        />
                    }}
                />
                <Indicador
                    scrollX={scrollX}
                    width={width - 40}
                    data={[1, 2, 3]}
                />

            </View>

            {/* $$$$$$$$$$*/}
            {/* Aventuras recomendadas*/}
            {/* $$$$$$$$$$*/}
            <View style={{
                marginTop: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>

                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>Aventuras recomendadas</Text>

                    <Text
                        onPress={() => navigation.navigate("Busqueda")}
                        style={{
                            fontSize: 18,
                            color: moradoClaro,
                            fontWeight: 'bold',
                        }}>Ver todo</Text>

                </View>


                {/* $$$$$$$$$$$$$*/}
                {/* Lista lugares*/}
                {/* $$$$$$$$$$$$$*/}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        marginBottom: 20,

                    }}>

                    {/* Mapear todas las aventuras */}
                    {
                        aventuras.length !== 0 ?
                            aventuras.map((e, idxAve) => (

                                <Pressable
                                    key={"idxAve", idxAve}
                                    onPress={() => navigation.navigate("DetalleAventura", {
                                        id: e.id
                                    })}
                                    style={{
                                        overflow: "hidden",
                                        marginRight: idxAve === 4 - 1 ? 0 : 30,
                                        borderRadius: 7,
                                        width: width * 0.6,

                                    }}>
                                    {/* Imagenes */}
                                    <Image
                                        source={{ uri: e.imagenDetalle[e.imagenFondoIdx] }}
                                        style={{
                                            width: width * 0.6,
                                            height: height * 0.2,

                                            resizeMode: 'cover',
                                        }} />



                                    {/* Footer */}
                                    <View style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#F4F6F6',
                                        padding: 5,
                                        paddingTop: 7,
                                        // width: '100%',
                                    }}>
                                        {/* Titulo y desc */}
                                        <View style={{
                                            flex: 1,
                                        }}>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                }}
                                            >{e.titulo}</Text>
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    fontSize: 14,
                                                    marginTop: 5,
                                                }}
                                            >{e.descripcion}</Text>
                                        </View>


                                        {/* Precio y flecha de continuar */}
                                        <View style={{
                                            width: 50,
                                            height: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Text
                                                style={{
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    fontSize: 14,
                                                    marginBottom: 5,
                                                }}
                                            >$ {promedioPrecios(e.precioMin, e.precioMax)}</Text>


                                            <Flecha />
                                        </View>
                                    </View>
                                </Pressable>
                            )) :
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 198.6,
                                width: width - 40,
                            }}>
                                <ActivityIndicator
                                    size={"large"}
                                    color={"black"}
                                />
                            </View>
                    }

                </ScrollView>
                <Pressable
                    onPress={() => navigation.navigate("MisReservas")}
                    style={{
                        backgroundColor: moradoOscuro,
                        padding: 10,
                        borderRadius: 30,
                        alignItems: 'center',
                        width: '40%',
                        marginTop: 7,
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            color: '#fff',
                            fontSize: 16,
                        }}>Mis aventuras</Text>
                </Pressable>
            </View>
        </ScrollView >
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
        paddingVertical: 0,
    },
})
