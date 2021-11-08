import React, { PureComponent, useEffect, useRef, useState } from 'react'
import { FlatList, Image, Keyboard, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Marker } from 'react-native-maps';

import MapView from "react-native-map-clustering";

import { FontAwesome5 } from '@expo/vector-icons';
import { moradoOscuro, verificarUbicacion } from '../../../assets/constants';

import AdventureItem from './components/AventureItem';
import Header from './components/Header';



export default function ({ navigation }) {

    useEffect(() => {
        verificarUbicacion()
    }, []);

    const [selectedMarkerIdx, setSelectedMarkerIdx] = useState(null);
    const [buscar, setBuscar] = useState("");

    // Variables para cambiar uno a otro
    const flatlist = useRef(null);
    const map = useRef(null);


    const listaAventuras = [
        {
            titulo: "El nevado de colima",
            precioMin: 400,
            precioMax: 3500,
            dificultad: 3,
            coordinates: {
                latitude: 20.696042,
                longitude: -103.440991,
            },
            image: { uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" },
            categoria: "Alpinismo",
        },
        {
            titulo: "Huaxtla",
            precioMin: 400,
            precioMax: 3500,
            dificultad: 1,
            coordinates: {
                latitude: 20.80,
                longitude: -103.440991,
            },
            image: { uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" },
            categoria: "Alpinismo",
        },
        {
            titulo: "La barranca de huentitan",
            precioMin: 400,
            precioMax: 3500,
            dificultad: 2,
            coordinates: {
                latitude: 20,
                longitude: -103.440991,
            },
            image: { uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" },
            categoria: "Alpinismo",
        },
        {
            titulo: "Kilimanjaro",
            precioMin: 400,
            precioMax: 3500,
            dificultad: 2,
            coordinates: {
                longitude: 20,
                latitude: -103.440991,
            },
            image: { uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" },
            categoria: "Alpinismo",
        },
        {
            titulo: "Iztacihuatl",
            precioMin: 400,
            precioMax: 3500,
            dificultad: 5,
            coordinates: {
                latitude: 21.696042,
                longitude: -102.440991,
            },
            image: { uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" },
            categoria: "Bici de montaña",
        },
        {
            titulo: "Chupinaya",
            precioMin: 400,
            precioMax: 3500,
            dificultad: 2,
            coordinates: {
                latitude: 20.696042,
                longitude: -104.440991,
            },
            image: { uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" },
            categoria: "Otros",
        },
    ]

    const handleVerElemento = (idx) => {
        setBuscar("")

        setSelectedMarkerIdx(idx)

        const selectedPlace = listaAventuras[idx];

        const region = {
            latitude: selectedPlace.coordinates.latitude,
            longitude: selectedPlace.coordinates.longitude,
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
            console.log(index)
            handleVerElemento(index)
        }
    })


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
            >
                {listaAventuras.map((e, i) => <Marker
                    key={i.toString()}
                    coordinate={e.coordinates}
                    tracksViewChanges={false}
                    onPress={() => handleVerElemento(i)}
                >
                    <View style={{
                        ...styles.iconContainer,
                        backgroundColor: selectedMarkerIdx === i ? moradoOscuro : "#fff",
                    }}>
                        <FontAwesome5
                            style={styles.icono}
                            name="mountain"
                            size={15}
                            color={selectedMarkerIdx === i ? "#fff" : moradoOscuro}
                        />
                    </View>
                </Marker>)}
            </MapView>
            <FlatList
                ref={flatlist}
                data={listaAventuras}
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
                listaAventuras={listaAventuras}
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
