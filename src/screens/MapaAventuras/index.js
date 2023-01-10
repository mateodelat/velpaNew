import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Image, Keyboard, Platform, Pressable, StyleSheet, View } from 'react-native'
import { Marker } from 'react-native-maps';

import MapView from "react-native-map-clustering";

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { categorias, defaultLocation, moradoOscuro, obtenerAventurasParaMapa, renderCategoIcon, verificarUbicacion } from '../../../assets/constants';

import AdventureItem from './components/AventureItem';
import Header from './components/Header';

import { Aventura, Categorias } from '../../models';
import { Loading } from '../../components/Loading';
import { getLastKnownPositionAsync } from 'expo-location';




export default function ({ navigation }) {
    const [region, setRegion] = useState(null);

    const [locationPermision, setLocationPermision] = useState(null);


    useEffect(() => {
        verificarUbicacion()
            .then(async r => {
                let latitude, longitude


                let coords
                if (r) {
                    coords = (await getLastKnownPositionAsync())?.coords

                }
                latitude = coords?.latitude
                longitude = coords?.longitude

                const location = {
                    latitude,
                    longitude,
                    latitudeDelta: 10,
                    longitudeDelta: 10,

                }
                setRegion(latitude ? location : defaultLocation)
            })
        obtenerAventurasParaMapa().then(r => {
            setAventuras(r)
        })
    }, []);


    const [selectedMarkerIdx, setSelectedMarkerIdx] = useState(null);
    const [buscar, setBuscar] = useState("");
    const [aventuras, setAventuras] = useState(null);

    // Variables para cambiar uno a otro
    const flatlist = useRef(null);
    const map = useRef(null);



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
        map?.current?.animateToRegion(region);


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
            {region ? <MapView
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

                initialRegion={region}

                clusterColor={moradoOscuro}
                showsUserLocation={true}
                loadingEnabled={true}
            >{
                    aventuras ?
                        aventuras.map((e, i) => {
                            return <Marker
                                key={i.toString()}
                                coordinate={e.coordenadas}
                                onPress={() => {
                                    handleVerElemento(e, i)
                                }}
                            >
                                <View style={{
                                    ...styles.iconContainer,
                                    backgroundColor: selectedMarkerIdx === i ? moradoOscuro : "#fff",
                                }}>

                                    {/* Render iconos dependiendo de la categoria    */}
                                    {renderCategoIcon(e.categoria, 24, selectedMarkerIdx === i ? "#fff" : moradoOscuro)}
                                </View>
                            </Marker>
                        })
                        : <View style={{
                            flex: 1,
                            backgroundColor: 'red',
                            alignItems: 'center', justifyContent: 'center',
                        }}>
                            <ActivityIndicator size={"large"} color={"black"} />
                        </View>
                }
            </MapView> : <Loading indicator />}
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
        borderRadius: 200,
        width: 40,
        height: 40,
    },


    flatList: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: 30,
    },


})
