import { Hub, retry } from '@aws-amplify/core';
import { DataStore } from '@aws-amplify/datastore';
import { PredicateAll } from '@aws-amplify/datastore/lib-esm/predicates';
import React, { useEffect, useRef, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    FlatList,
    Image,
    Keyboard,
    Linking,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'

import { distancia2Puntos, formatCalificacion, getImageUrl, listAventurasAutorizadas, moradoClaro, moradoOscuro, redondear, redondearNDecimales, verificarUbicacion, wait } from '../../../assets/constants';
import Flecha from '../../components/Flecha';
import { Loading } from '../../components/Loading';
import { TipoPublicidad } from '../../models';
import { Usuario } from '../../models';
import { Publicidad } from '../../models';
import ComponentePublicidad from './components/ComponentePublicidad';
import Indicador from './components/Indicador';

import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { getLastKnownPositionAsync } from 'expo-location';


export default ({ navigation }) => {
    const { height, width } = Dimensions.get("window")


    const flatList = useRef(null)

    const [actualIdx, setActualIdx] = useState(null);
    const [aventuras, setAventuras] = useState(null);

    const [publicidad, setPublicidad] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const [guias, setGuias] = useState(null);

    let timer

    function empezarTimer(duration) {
        if (actualIdx === null) {
            setActualIdx(1)
            return
        }


        timer = setTimeout(() => {
            publicidad?.length !== 0 && (flatList?.current?.scrollToIndex({
                index: actualIdx < (publicidad?.length) ? actualIdx : 0
            }) &&
                setActualIdx(actualIdx < (publicidad?.length - 1) ? actualIdx + 1 : 0)
            )
        }, duration);
    }

    useEffect(() => {
        // Timer de publicidad
        if (actualIdx === null) {
            empezarTimer()
        }
        empezarTimer(5000)
        return () => clearTimeout(timer)
    }, [actualIdx]);


    useEffect(() => {
        fetchData()
    }, []);


    const fetchData = async () => {
        fetchPublicidad()
        const status = await verificarUbicacion()


        let location = false

        if (status) {
            location = getLastKnownPositionAsync();
        }

        listAventurasAutorizadas(4, 0)
            .then(async r => {



                // Obtener distancia al usuario si existe
                const loc = await location


                // Si hay coordenadas del dispositivo se ordenan las experiencias 
                // de la mas cercana a la mas lejana
                if (loc?.coords) {


                    r = r.map(ave => {
                        // Coordenadas del usuario
                        const { latitude: userLat, longitude: userLong } = loc.coords
                        const { latitude, longitude } = ave.coordenadas
                        const distanciaAlUsuario = distancia2Puntos(userLat, userLong, latitude, longitude,)

                        return {
                            ...ave,
                            distanciaAlUsuario
                        }
                    }).sort((a, b) => a.distanciaAlUsuario > b.distanciaAlUsuario)

                }

                setAventuras(r)
            })

        fetchUsuariosGuia()

    }

    async function fetchUsuariosGuia() {
        try {
            setGuias(await DataStore.query(Usuario,
                usr => usr
                    .guia.eq( true)
                ,
                {
                    sort: e => e
                        .experience("DESCENDING"),
                    // .createdAt("ASCENDING"),
                    limit: 4
                }
            )
                .then(async r => {
                    return await Promise.all(r.map(async usr => ({
                        ...usr,
                        foto: await getImageUrl(usr.foto)
                    })
                    )
                    )
                })
            )

        } catch (error) {
            console.log(error)

        }
    }

    const fetchPublicidad = async () => {
        DataStore.query(Publicidad)
            .then(async r => {
                r = await Promise.all(r.map(async publi => ({
                    ...publi,
                    imagenFondo: {
                        uri: await getImageUrl(publi.imagenFondo),
                        key: publi.imagenFondo
                    },
                    video: {
                        uri: await getImageUrl(publi.video),
                        key: publi.video
                    },
                    selected: false
                })
                ))
                setPublicidad(r)
            }
            )

    }



    const scrollX = useRef(new Animated.Value(0)).current

    // calcular el promedio de dos precios
    const promedioPrecios = (inicial, final) => {
        return Math.round((inicial + final) / 2)
    }

    const handleNavigateAventura = (id) => {
        navigation.navigate("DetalleAventura", { id })
    }


    const handleOpenAnuncio = (link) => {
        if (!link) {
            Alert.alert("Error", "No se pudo obtener el link del anuncio")
            return
        }


        Alert.alert("Link externo", "Deseas salir de velpa para abrir el link", [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "OK",
                onPress: () => Linking.openURL(link)
            },
        ])
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData()

        wait(300).then(() => setRefreshing(false));
    }, []);

    const handleNavigateProfile = (id) => {
        navigation.navigate("PerfilScreen", { id })
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}

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
                {
                    !publicidad ?
                        <View style={{
                            marginVertical: 10,
                            height: height * 0.25

                        }}>
                            <Loading indicator />

                        </View>
                        :
                        publicidad.length === 0 ?
                            <View style={{
                                height:
                                    10
                                // height * 0.25,
                            }}>

                            </View> :
                            <>
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

                                    data={publicidad}
                                    renderItem={({ item, index, }) => {

                                        const { tipo } = item

                                        return <ComponentePublicidad
                                            item={item}
                                            onPress={
                                                tipo === TipoPublicidad.AVENTURA ?
                                                    () => handleNavigateAventura(item.aventuraID) :

                                                    tipo === TipoPublicidad.ANUNCIO ?
                                                        () => handleOpenAnuncio(item.linkAnuncio) :

                                                        // Actualizacion
                                                        () => navigation.navigate("DetalleAventura", { id: item.aventuraID })
                                            }
                                        />
                                    }}
                                />
                                <Indicador
                                    scrollX={scrollX}
                                    width={width - 40}
                                    data={publicidad}
                                />

                                <View style={{
                                    marginBottom: 20,
                                }}>

                                </View>
                            </>
                }

            </View>



            {/* $$$$$$$$$$*/}
            {/* Aventuras recomendadas*/}
            {/* $$$$$$$$$$*/}
            <View style={{ flex: 1, }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>

                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>Experiencias cercanas</Text>

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
                {
                    !aventuras ?
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',

                            marginTop: 20,
                            marginBottom: 10,

                            height: height * 0.2 + 62,

                            width: "100%",
                        }}>
                            <ActivityIndicator
                                size={"large"}
                                color={"black"}
                            />

                        </View>
                        :

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                marginBottom: 10,

                            }}>

                            {/* Mapear todas las aventuras */}
                            {
                                aventuras.length !== 0 ?
                                    aventuras.map((e, idxAve) => (

                                        <Pressable
                                            key={"idxAve" + idxAve}
                                            onPress={() => navigation.navigate("DetalleAventura", {
                                                id: e.id
                                            })}
                                            style={{
                                                overflow: "hidden",
                                                marginRight: idxAve === aventuras.length - 1 ? 0 : 30,
                                                borderRadius: 7,
                                                width: width * 0.6,

                                            }}>
                                            {/* Imagenes */}
                                            <View style={{
                                                width: width * 0.6,
                                                height: height * 0.2,

                                                resizeMode: 'cover',
                                            }}>

                                                <Loading indicator
                                                    color={moradoOscuro}
                                                    containerStyle={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                    }} />
                                                <Image
                                                    source={{ uri: e.imagenDetalle[e.imagenFondoIdx].uri }}
                                                    style={{
                                                        flex: 1,
                                                        resizeMode: 'cover',
                                                    }} />
                                            </View>


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
                                                    {e.precioMax ? <Text
                                                        style={{
                                                            color: '#000',
                                                            fontWeight: 'bold',
                                                            fontSize: 14,
                                                            marginBottom: 5,
                                                        }}
                                                    >$ {promedioPrecios(e.precioMin, e.precioMax)}</Text>
                                                        : <View style={{ flex: 1, }} />}


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
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                        }}>No hay aventuras sugeridas</Text>
                                    </View>
                            }

                        </ScrollView>
                }
            </View>

            {/* Guias de Velpa */}
            {guias?.length !== 0 && <View style={{ marginBottom: 40, marginTop: 20, }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 10,
                }}>Guias</Text>

                {!guias ?
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',

                        height: 130,

                        width: "100%",
                    }}>
                        <ActivityIndicator
                            size={"large"}
                            color={"black"}
                        />

                    </View>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal >

                        {
                            guias?.map(usr => <Pressable
                                onPress={() => handleNavigateProfile(usr.id)}
                                key={usr.id}
                                style={{
                                    marginRight: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                {usr.foto ? <Image
                                    style={styles.imageUsr}
                                    source={{ uri: usr.foto }}
                                />
                                    :
                                    <View style={{
                                        ...styles.imageUsr,
                                        backgroundColor: "#f4f4f4",
                                        overflow: "hidden",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 200,
                                    }}>

                                        <Feather
                                            name="user"
                                            size={80}
                                            color="black"
                                        />
                                    </View>
                                }
                                <Text style={{ flex: 1, }}>@{usr.nickname}</Text>
                                {usr.calificacion && <View style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Entypo
                                        style={{
                                            position: 'absolute',
                                            left: 10,
                                        }}
                                        name="star" size={20} color="#F5BE18" />
                                    <Text >{formatCalificacion(usr.calificacion)}</Text>

                                </View>}

                            </Pressable>)
                        }
                    </ScrollView>
                }
            </View>}



            {/* <Pressable
                onPress={handleMisAventuras}
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
                    }}>Mis experiencias</Text>
            </Pressable> */}
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

    imageUsr: {
        width: 90,
        height: 90,
        borderRadius: 120,
    }
})
