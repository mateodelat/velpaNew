import React, { PureComponent, useEffect, useRef, useState } from 'react'
import { FlatList, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Marker } from 'react-native-maps';

import * as Location from 'expo-location';
import MapView from "react-native-map-clustering";

import { FontAwesome5 } from '@expo/vector-icons';
import { moradoOscuro } from '../../../assets/constants';

import AdventureItem from './components/AventureItem';
import Header from './components/Header';



export default function ({ navigation }) {

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Permisos no obtenidos para la ubicacion")

                return;
            }
        })()
    }, []);

    const [selectedMarkerIdx, setSelectedMarkerIdx] = useState(null);
    const [buscar, setBuscar] = useState("");

    // Variables para cambiar uno a otro
    const flatlist = useRef();
    const map = useRef();

    const categorias = [


        "Otros"
    ]

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


    const handleVerElemento = (index) => {
        setBuscar("")

        setSelectedMarkerIdx(index)

        const selectedPlace = listaAventuras[index];

        const region = {
            latitude: selectedPlace.coordinates.latitude,
            longitude: selectedPlace.coordinates.longitude,
            latitudeDelta: 0.8,
            longitudeDelta: 0.8,
        }
        map.current.animateToRegion(region);
        flatlist.current.scrollToIndex({ index })


    }

    // Variables del flatlist
    const viewConfig = useRef({ itemVisiblePercentThreshold: 70 })
    const onViewChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const index = viewableItems[0].index;
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
                showsHorizontalScrollIndicator={false}

                initialNumToRender={2}

                viewabilityConfig={viewConfig.current}
                onViewableItemsChanged={onViewChanged.current}

                keyExtractor={(e, i) => i.toString()}
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
