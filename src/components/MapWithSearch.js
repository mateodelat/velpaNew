import React, { useEffect, useRef, useState } from 'react'
import {
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



import { defaultLocation, googleMapsSearchPlace, mapsAPIKey, moradoClaro, moradoOscuro, verificarUbicacion } from '../../assets/constants';

import { getLastKnownPositionAsync, reverseGeocodeAsync } from 'expo-location';

import { Loading } from './Loading';
import Boton from './Boton';

import { Marker } from 'react-native-maps';




const { height } = Dimensions.get("screen")

export default ({
    selectedPlace, setSelectedPlace,

    handleContinuar,

    buscarInitial,
    aventurasInicial,
    onCalloutPress,

    previewTxt,

    denySelectPlaceInMap,

    style,
    sugestionsContainerStyle,

}) => {

    const map = useRef(null)

    const [region, setRegion] = useState(null);

    // Variables del buscador
    const [buscar, setBuscar] = useState(buscarInitial);
    const [suggestedPlace, setSuggestedPlace] = useState([]);

    const [buttonLoading, setButtonLoading] = useState(false);

    const [locationPermision, setLocationPermision] = useState(null);

    // Checar si la ubicacion esta activada
    useEffect(() => {
        verificarUbicacion()
            .then(async r => {
                // Si no hay permisos de ubicacion
                setLocationPermision(r)

                let latitude, longitude

                const coords = (await getLastKnownPositionAsync())?.coords
                latitude = coords?.latitude
                longitude = coords?.longitude

                if (selectedPlace) {
                    const region = {
                        latitude: selectedPlace.latitude,
                        longitude: selectedPlace.longitude,
                        latitudeDelta: selectedPlace.latitudeDelta ? selectedPlace.latitudeDelta : 1,
                        longitudeDelta: selectedPlace.longitudeDelta ? selectedPlace.longitudeDelta : 1,

                    }
                    setRegion(region)

                    return
                }

                const location = {
                    latitude,
                    longitude,
                    latitudeDelta: 10,
                    longitudeDelta: 10,

                }
                const region = (coords || latitude) ? location : defaultLocation

                // Buscar elemento default
                buscarInitial ? handleSearchPlace(buscarInitial, region) : null

                setRegion(region)

            })
    }, []);


    const handlePressPlace = async (coordinate, ubicacionId, ubicacionNombre) => {

        // Si se presiona el mapa buscar lugares por ahi
        if (!ubicacionId && !denySelectPlaceInMap) {
            reverseGeocodeAsync(coordinate)
                .then(r => {
                    r = r[0]
                    let ubicacionNombre
                    if (!r) return {
                        ...coordinate,
                        ubicacionNombre: null
                    }


                    const city = r?.city ? r.city : ""
                    const country = r?.country ? r.country : ""
                    let name = r?.name ? r.name + ", " : ""
                    const region = r?.region ? r.region + ", " : ""
                    const street = r?.street ? r.street : ""


                    if (!r.city) {
                        if (r.name === r.region) {
                            ubicacionNombre = (region + country)

                        } else {
                            ubicacionNombre = (name + region + country)

                        }
                    } else {
                        name = r.name

                        if (r.street === r.name) {
                            ubicacionNombre = (name + ", " + region + city)

                        } else {

                            ubicacionNombre = (street + " " + name + ", " + city)

                        }
                    }
                    setSelectedPlace({
                        ...coordinate,
                        ubicacionNombre
                    })
                })
            return
        }

        setSelectedPlace({
            ...coordinate,
            ubicacionId: ubicacionId ? ubicacionId : null,
            ubicacionNombre: ubicacionNombre ? ubicacionNombre : null
        })


    }

    // Buscar lugares con autocomplete
    const handleSearchPlace = (text, reg) => {
        setBuscar(text)
        if (!text) return

        // Ver si se le paso una region definida desde el useEffect si no buscar por la posicion del mapa
        const regionABuscar = reg ? reg : region
        const { latitude, longitude } = regionABuscar

        const base = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
        const input = `?input=${text}`
        const location = `&location=${latitude}%2C${longitude}`
        const key = `&key=${mapsAPIKey}`
        const radius = "&radius=1000"
        const language = "&language=es"


        const url =
            base
            + input
            + location
            + radius
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

    const clearSugested = () => {
        Keyboard.dismiss()
        setBuscar("")
        setSuggestedPlace([])
    }

    const handlePressSuggested = async (e) => {
        clearSugested()
        const { place_id } = e

        const region = await googleMapsSearchPlace(place_id)

        map?.current?.animateToRegion(region);

        setSelectedPlace(region)
    }


    return (
        <View
            onPress={() => {
                Keyboard.dismiss()
            }}
            style={[styles.container, style]}>
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
                !!buscar && buscar?.length !== 0 && (
                    suggestedPlace.length !== 0 ?
                        <View style={[styles.sugestionsContainer, sugestionsContainerStyle]}>
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
                        : <View style={[styles.sugestionsContainer, sugestionsContainerStyle]}>
                            <View style={styles.line} />
                            <View style={{
                                ...styles.suggestedPlace,
                                flex: 1,
                            }}>
                                <Text numberOfLines={2} style={{
                                    ...styles.tituloSugested,
                                    textAlign: 'center',
                                }}>No se han encontrado lugares</Text>

                            </View>
                        </View>
                )
            }

            {previewTxt !== null && <Text style={styles.infoTxt}>{previewTxt ? previewTxt : "Selecciona el pin de la aventura"}</Text>}
            <View style={styles.mapContainer}>
                {region && locationPermision !== null ? <MapView
                    ref={map}
                    provider={"google"}
                    mapType={"terrain"}

                    showsUserLocation={locationPermision}
                    loadingEnabled={true}

                    initialRegion={region}
                    clusterColor={moradoOscuro}
                    onTouchStart={clearSugested}
                    onPress={({ nativeEvent }) => {
                        const { coordinate } = nativeEvent
                        handlePressPlace(coordinate)
                    }}
                    onLongPress={({ nativeEvent }) => {
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

                    onRegionChangeComplete={setRegion}

                >
                    {/* Marcador de la aventura */}
                    {selectedPlace && <Marker
                        coordinate={selectedPlace}
                    />}

                    {/* Renderizar las aventuras existentes */}
                    {aventurasInicial?.map((e, i) => <Marker
                        key={i.toString()}
                        coordinate={e.coordenadas}
                        tracksViewChanges={false}
                        title={e.titulo}
                        onCalloutPress={onCalloutPress}

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

            {handleContinuar && <Boton
                onPress={handleContinuar}
                titulo={"Continuar"}
                loading={buttonLoading}
                style={{
                    marginTop: 30,
                }}
            />}
        </View>
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
        flex: 1,
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
        marginBottom: 10,
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
        maxHeight: height * 0.45,
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
    },

    infoTxt: {
        fontSize: 16,
        color: moradoOscuro,
    }
})
