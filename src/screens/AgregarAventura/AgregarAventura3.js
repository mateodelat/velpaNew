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
} from 'react-native'


import MapView from "react-native-map-clustering";


import { Entypo, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';


import Boton from '../../components/Boton';
import { moradoClaro, moradoOscuro, verificarUbicacion } from '../../../assets/constants';

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

    const [materialALlevar, setMaterialALlevar] = useState([["Obligatorio", ["material"]], ["Alimentacion", ["comida"]], ["Acampada", ["material"]]]);

    const [buttonLoading, setButtonLoading] = useState(false);

    // Variables del mapa
    const [aventurasMapa, setAventurasMapa] = useState([]);
    const [region, setRegion] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [buscar, setBuscar] = useState("");

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

        // // Existencia de parametros
        // setButtonLoading(true)

        // setTimeout(() => {
        //     setButtonLoading(false)
        //     navigation.navigate("ExitoScreen", {
        //         txtExito: "Solicitud enviada con exito, espera nuestra respuesta!!",
        //     })
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
        console.log(text)
        setBuscar(text)

    }

    const handleChangeRegionMap = (e) => {
        setRegion(e)
    }
    return (
        <View style={{ flex: 1, }}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                style={styles.container}>
                <View style={{
                    marginBottom: 40,
                }}>
                    <View style={{ height: height * 0.22 }} />


                    <Text style={{
                        ...styles.captionTxt,
                        marginTop: 20,
                    }}>Ubicacion aproximada aventura*</Text>

                    <View style={styles.buscarContainer}>
                        <TextInput
                            style={{
                                flex: 1,
                            }}
                            value={buscar}
                            placeholder="Buscar lugar"
                            underlineColorAndroid={false}
                            onChangeText={handleSearchPlace}
                        />
                        <Feather
                            name="search"
                            size={25}
                            color="#7E7F84"
                            style={{ marginRight: 5, position: 'absolute', bottom: 10, right: 10, }}
                        />

                    </View>
                    <View style={styles.mapContainer}>

                        {region ? <MapView
                            provider={"google"}
                            mapType={"standard"}


                            showsUserLocation={true}
                            loadingEnabled={true}

                            initialRegion={region}
                            clusterColor={moradoOscuro}
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


                    <View style={styles.line} />


                    {/* Material a llevar */}
                    <View style={styles.queLlevarContainer}>
                        <Text style={{
                            ...styles.captionTxt,
                            marginBottom: 20,
                        }}>Material a llevar</Text>

                        <QueLlevar
                            datos={materialALlevar}
                            modify={true}
                            setDatos={setMaterialALlevar}
                        />
                    </View>

                    <View style={styles.line} />


                    <Boton
                        style={{
                            marginTop: 30,
                        }}
                        onPress={handleContinuar}
                        titulo={"Enviar"}
                        loading={buttonLoading}
                    />
                </View>
            </ScrollView>
            <HeaderConImagen
                titulo={aventura.titulo}
                imagen={{ uri: aventura.imagenFondo }}
                scrollY={scrollY}
                maxHeight={height * 0.24}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
        marginTop: 30,
        marginBottom: 10,
        borderTopWidth: .5,
        borderColor: moradoClaro,
        marginHorizontal: 20,

    },

    mapContainer: {
        width: '100%',
        height: height * 0.3,
        borderRadius: 7,
        overflow: "hidden",
        alignItems: 'center', justifyContent: 'center',
    },

    queLlevarContainer: {
        marginTop: 20,
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
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 7,
        flexDirection: 'row',
    },
})
