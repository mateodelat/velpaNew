import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Image, Keyboard, Platform, Pressable, StyleSheet, View } from 'react-native'
import { Marker } from 'react-native-maps';

import MapView from "react-native-map-clustering";

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { categorias, moradoOscuro, verificarUbicacion } from '../../../assets/constants';

import AdventureItem from './components/AventureItem';
import Header from './components/Header';
import { DataStore } from '@aws-amplify/datastore';
import { Aventura, Categorias } from '../../models';
import { Loading } from '../../components/Loading';



export default function ({ navigation }) {

    useEffect(() => {
        verificarUbicacion()
        obtenerAventuras()
    }, []);


    const [selectedMarkerIdx, setSelectedMarkerIdx] = useState(null);
    const [buscar, setBuscar] = useState("");
    const [aventuras, setAventuras] = useState(null);

    // Variables para cambiar uno a otro
    const flatlist = useRef(null);
    const map = useRef(null);

    function distancia(lat1, lon1, lat2, lon2) {
        const p = 0.017453292519943295
        const hav = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p)) / 2
        return 12742 * Math.asin(Math.sqrt(hav))
    }

    const obtenerAventuras = async () => {
        await DataStore.query(Aventura, ave => ave.estadoAventura("eq", 'AUTORIZADO'))
            .then(r => {

                // Sortear de izquierda a derecha en el mapa
                r = r.sort((a, b) => {
                    const {
                        latitude: latitudeA,
                        longitude: longitudeA
                    } = a.coordenadas
                    const {
                        latitude: latitudeB,
                        longitude: longitudeB
                    } = b.coordenadas
                    return (latitudeA < latitudeB)
                })

                setAventuras(r)
            })
            .catch(e => {
                Alert.alert("Error obteniendo aventura")
                console.log(e)
            })

    }


    const handleVerElemento = (e, idx) => {
        if (!e) return
        setBuscar("")

        setSelectedMarkerIdx(idx)

        const selectedPlace = e;

        const region = {
            latitude: selectedPlace.coordenadas.latitude,
            longitude: selectedPlace.coordenadas.longitude,
            latitudeDelta: 0.8,
            longitudeDelta: 0.8,
        }
        flatlist.current.scrollToIndex({ index: idx })
        map.current.animateToRegion(region);


    }

    // Variables del flatlist
    const viewConfig = useRef({ itemVisiblePercentThreshold: 100 })
    const onViewChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const index = viewableItems[0].index;
            const item = viewableItems[0].item
            handleVerElemento(item, index)
        }
    })

    if (!aventuras) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={map}
                onPress={() => {
                    Keyboard.dismiss()
                }}
                style={styles.map}
                provider={"google"}
                mapType={"terrain"}
                mapPadding={{
                    top: 70,
                }}

                initialRegion={{
                    latitude: 20.696042,
                    longitude: -103.440991,
                    latitudeDelta: 15,
                    longitudeDelta: 15,
                }}

                clusterColor={moradoOscuro}
                showsUserLocation={true}
                loadingEnabled={true}
            >{
                    aventuras ?
                        aventuras.map((e, i) => <Marker
                            key={i.toString()}
                            coordinate={e.coordenadas}
                            tracksViewChanges={false}
                            onPress={() => handleVerElemento(e, i)}
                        >
                            <View style={{
                                ...styles.iconContainer,
                                backgroundColor: selectedMarkerIdx === i ? moradoOscuro : "#fff",
                            }}>

                                {/* Render iconos dependiendo de la categoria    */}
                                {e.categoria === Categorias.APLINISMO ?
                                    <FontAwesome5
                                        name="mountain"
                                        size={15}
                                        color={selectedMarkerIdx === i ? "#fff" : moradoOscuro}
                                    /> :
                                    e.categoria === Categorias.MTB ?
                                        <MaterialIcons
                                            name="directions-bike"
                                            size={24}
                                            color={selectedMarkerIdx === i ? "#fff" : moradoOscuro}
                                        /> :
                                        <Entypo
                                            name="dots-three-horizontal"
                                            size={15}
                                            color={selectedMarkerIdx === i ? "#fff" : moradoOscuro}

                                        />
                                }
                            </View>
                        </Marker>)
                        : <View style={{
                            flex: 1,
                            backgroundColor: 'red',
                            alignItems: 'center', justifyContent: 'center',
                        }}>
                            <ActivityIndicator size={"large"} color={"black"} />
                        </View>
                }
            </MapView>
            <FlatList
                ref={flatlist}
                data={aventuras}
                style={styles.flatList}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}

                showsHorizontalScrollIndicator={false}

                initialNumToRender={2}

                viewabilityConfig={viewConfig.current}
                onViewableItemsChanged={onViewChanged.current}

                keyExtractor={(e, i) => ("ItemAventura-", i)}
                renderItem={({ item, index }) => {
                    return <AdventureItem
                        item={item}
                        navigation={navigation}
                    />
                }}
            />
            <Header
                buscar={buscar}
                setBuscar={setBuscar}
                listaAventuras={aventuras}
                onPress={handleVerElemento}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        ...StyleSheet.absoluteFillObject,
    },

    iconContainer: {
        backgroundColor: '#fff',
        alignItems: 'center', justifyContent: 'center',
        padding: 10,
        borderRadius: 200,
    },


    flatList: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: 30,
    },


})
