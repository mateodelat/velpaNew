import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    TextInput,
    Pressable,
    Keyboard,
} from 'react-native'


import MapView from "react-native-map-clustering";


import { Entypo, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';


import Boton from '../../components/Boton';
import { mapsAPIKey, moradoClaro, moradoOscuro, verificarUbicacion } from '../../../assets/constants';

import QueLlevar from './components/QueLlevar';
import HeaderConImagen from '../../components/HeaderConImagen';
import { getCurrentPositionAsync, getLastKnownPositionAsync } from 'expo-location';
import { Loading } from '../../components/Loading';
import { obtenerAventurasParaMapa } from '../MapaAventuras';
import { Marker } from 'react-native-maps';
import { Categorias } from '../../models';


const { height } = Dimensions.get("screen")

export default ({ navigation, route }) => {
    const scrollY = useRef(new Animated.Value(0)).current


    const { width, height } = Dimensions.get("screen")

    const map = useRef(null)

    const [aventura, setAventura] = useState({
        "altitud": 3405,
        "ascenso": 322,
        "categoria": "APLINISMO",
        "descripcion": "Descripcion de la aventura",
        "dificultad": 3,
        "distancia": 3.5,
        "duracion": "1 a 2 dias",
        "id": "e496cbdb-6abd-41f8-8932-0f918162c344",
        "imagenDetalle": [
            "imagen-0 ave-e496cbdb-6abd-41f8-8932-0f918162c344.jpg",
        ],
        "imagenFondo": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540mateodelat%252FvelpaNew/ImagePicker/0a14937e-820d-46ed-a503-3c3d0c137baf.jpg",
        "imagenFondoIdx": 0,
        "precioMax": 43243,
        "precioMin": 343,
        "titulo": "Nueva aventura",
    });

    // Variables del mapa
    const [aventurasMapa, setAventurasMapa] = useState([]);
    const [region, setRegion] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    // Variables del buscador
    const [buscar, setBuscar] = useState("");
    const [suggestedPlace, setSuggestedPlace] = useState([]);

    // Checar si la ubicacion esta activada
    useEffect(() => {
        verificarUbicacion()
            .then(async r => {
                const { coords: { latitude, longitude } } = await getLastKnownPositionAsync()

                const defaultLocation = {
                    latitude: 21.76227198730249,
                    longitude: -104.03593288734555,
                    latitudeDelta: 32.71611359157346,
                    longitudeDelta: 60.73143247514963,
                }
                const location = {
                    latitude,
                    longitude,
                    latitudeDelta: 10,
                    longitudeDelta: 10,

                }
                setRegion(latitude ? location : defaultLocation)
            })

        obtenerAventurasParaMapa().then(r => {
            setAventurasMapa(r)
        })
    }, []);

    function handleContinuar() {
        // Verificaciones
        const aventuraAEnviar = {
            ...aventura,
            coordenadas: selectedPlace
        }
        console.log(selectedPlace)
    }

    const handlePressPlace = (coordinate, ubicacionId, ubicacionNombre) => {

        // Si ya habia elemento y es press en mapa, Dismiss el selected place
        if (!ubicacionId && selectedPlace) {
            setSelectedPlace(null)
            return
        }
        setSelectedPlace({
            ...coordinate,
            ubicacionId: ubicacionId ? ubicacionId : null,
            ubicacionNombre: ubicacionNombre ? ubicacionNombre : null
        })


    }
    const handleSearchPlace = (text) => {
        setBuscar(text)
        const { latitude, longitude } = region
        const base = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
        const input = `?input=${text}`
        const location = `&location=${latitude}%2C${longitude}`
        const types = `&types=natural_feature`
        const key = `&key=${mapsAPIKey}`
        const radius = "&radius=1000"
        const language = "&language=es"


        const url =
            base
            + input
            + location
            + radius
            // + types
            + key
            + language


        fetch(url)
            .then(r => {
                r.json().then(r => {
                    r = r.predictions
                    setSuggestedPlace(r)
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    const handleChangeRegionMap = (e) => {
        setRegion(e)
    }
    const clearSugested = () => {
        setBuscar("")
        setSuggestedPlace([])
    }

    const handlePressSuggested = async (e) => {
        const { place_id } = e
        clearSugested()

        const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&placeid=${place_id}&key=${mapsAPIKey}`
        const region = await fetch(url)
            .then(r => {
                return r.json()
                    .then(r => {
                        r = r.result
                        const { lat: latitude, lng: longitude } = r.geometry.location
                        const latitudeDelta = Math.abs(r.geometry.viewport.northeast.lat - r.geometry.viewport.southwest.lat)
                        const longitudeDelta = Math.abs(r.geometry.viewport.northeast.lng - r.geometry.viewport.southwest.lng)

                        return ({
                            latitude,
                            longitude,
                            latitudeDelta,
                            longitudeDelta
                        })
                    })
            })

        map.current.animateToRegion(region);
        const {
            latitude,
            longitude,
        } = region
        setSelectedPlace({
            latitude,
            longitude,
            ubicacionId: place_id,
            ubicacionNombre: e.structured_formatting.main_text
        })
    }


    return (
        <Pressable
            onPress={() => {
                Keyboard.dismiss()
            }}
            style={styles.container}>
            {/* Header */}

            <View style={{
                ...styles.buscarContainer,
                borderBottomRightRadius: !!buscar ? 0 : 7,
                borderBottomLeftRadius: !!buscar ? 0 : 7,

            }}>
                <Feather
                    name="search"
                    size={25}
                    color="#7E7F84"
                    style={{ marginRight: 5, position: 'absolute', bottom: 10, left: 10, }}
                />
                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: 35,
                    }}
                    value={buscar}
                    placeholder="Buscar lugar"
                    underlineColorAndroid={false}
                    onChangeText={handleSearchPlace}
                />
                {!!buscar && <Feather
                    onPress={clearSugested}
                    name="x"
                    size={25}
                    color="#7E7F84"
                    style={{ marginRight: 5, position: 'absolute', bottom: 10, right: 10, }}
                />}

            </View>
            {
                suggestedPlace.length !== 0 &&
                <View style={styles.sugestionsContainer}>
                    <View style={styles.line} />

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {suggestedPlace.map((e, i) => {
                            const titulo = e.structured_formatting?.main_text
                            const descripcion = e.structured_formatting?.secondary_text
                            return <Pressable
                                onPress={() => handlePressSuggested(e)}
                                key={i.toString()}
                                style={styles.suggestedPlace}>
                                <Entypo
                                    style={styles.icon}
                                    name="location-pin"
                                    size={30}
                                    color={moradoOscuro}

                                />

                                <Text numberOfLines={2} style={styles.tituloSugested}>{titulo} <Text style={styles.descripcionSugested}>{descripcion}</Text></Text>
                            </Pressable>
                        })}
                    </ScrollView>
                </View>
            }

            <View style={styles.mapContainer}>

                {region ? <MapView
                    ref={map}
                    provider={"google"}
                    mapType={"terrain"}

                    showsUserLocation={true}
                    loadingEnabled={true}

                    initialRegion={region}
                    clusterColor={moradoOscuro}
                    onTouchStart={() => {
                        setSuggestedPlace([])
                        setBuscar("")

                    }}
                    onPress={({ nativeEvent }) => {
                        const { coordinate } = nativeEvent
                        handlePressPlace(coordinate)
                    }}
                    onPoiClick={({ nativeEvent }) => {
                        const { coordinate, placeId, name } = nativeEvent
                        handlePressPlace(coordinate, placeId, name)
                    }}

                    style={{
                        ...StyleSheet.absoluteFillObject,

                    }}

                    onRegionChangeComplete={handleChangeRegionMap}

                >
                    {/* Marcador de la aventura */}
                    {selectedPlace && <Marker
                        coordinate={selectedPlace}
                    />}

                    {/* Renderizar las aventuras existentes */}
                    {aventurasMapa.map((e, i) => <Marker
                        key={i.toString()}
                        coordinate={e.coordenadas}
                        tracksViewChanges={false}
                        title={e.titulo}
                        onCalloutPress={() => {
                            Alert.alert("Informacion", "Crear una fecha en esa aventura", [
                                {
                                    text: "cancelar"
                                },
                                {
                                    text: "ok",
                                    onPress: () => navigation.navigate("AgregarFecha", { aventura: e })
                                },
                            ])
                        }}

                    >
                        <View style={styles.markerContainer}>

                            {/* Render iconos dependiendo de la categoria    */}
                            {e.categoria === Categorias.APLINISMO ?
                                <FontAwesome5
                                    name="mountain"
                                    size={15}
                                    color={moradoOscuro}
                                /> :
                                e.categoria === Categorias.CICLISMO ?
                                    <MaterialIcons
                                        name="directions-bike"
                                        size={24}
                                        color={moradoOscuro}
                                    /> :
                                    <Entypo
                                        name="dots-three-horizontal"
                                        size={15}
                                        color={moradoOscuro}

                                    />
                            }
                        </View>

                    </Marker>)}
                </MapView> :
                    <Loading indicator />
                }
            </View>

            <Boton
                style={{
                    marginTop: 30,
                }}
                onPress={handleContinuar}
                titulo={"Continuar"}
            />
        </Pressable>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    textInput: {
        fontSize: 17,
        flex: 1,
        backgroundColor: "#f4f6f6",
        padding: 5,
        paddingLeft: 10,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "transparent",
    },

    captionTxt: {
        fontSize: 15,
        color: "black",
        marginLeft: 5,
        marginBottom: 5,
    },



    line: {

        borderTopWidth: .5,
        borderColor: moradoClaro,
        marginHorizontal: 20,

    },

    mapContainer: {
        height: height - 295,
        borderRadius: 7,
        overflow: "hidden",
        alignItems: 'center', justifyContent: 'center',
    },

    markerContainer: {
        backgroundColor: '#fff',
        alignItems: 'center', justifyContent: 'center',
        padding: 10,
        borderRadius: 200,
    },

    buscarContainer: {
        backgroundColor: "#f4f6f6",
        padding: 10,
        marginBottom: 20,
        borderRadius: 7,
        flexDirection: 'row',
    },
    sugestionsContainer: {
        position: 'absolute',
        backgroundColor: "#f4f6f6",
        left: 20,
        top: 68,
        zIndex: 1,
        width: '100%',
        maxHeight: height * 0.4,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        paddingBottom: 10,

    },

    suggestedPlace: {
        padding: 10,
        paddingLeft: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },

    tituloSugested: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },

    descripcionSugested: {
        fontSize: 16,
        color: '#00000066',
    },
    icon: {
        padding: 7,
    }
})
