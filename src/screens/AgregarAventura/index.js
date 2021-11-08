import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    Pressable,
    TextInput
} from 'react-native'

import ImageFullScreen from '../../components/ImageFullScreen';
import MapView from 'react-native-maps';

import Carrousel from './components/Carrousel';

import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';


import Boton from '../../components/Boton';
import { colorFondo, moradoClaro, moradoOscuro, verificarUbicacion } from '../../../assets/constants';
import dificultad from '../../../assets/dificultad';

const { height } = Dimensions.get("screen")

export default ({ navigation }) => {
    //HACER DISTANCIA Y ALTITUD DEPENDIENTE DE SI EXISTE EN LA DB PARA TENER
    //DISTINTAS CATEGORIAS


    const scrollX = useRef(new Animated.Value(0)).current
    const scrollY = useRef(new Animated.Value(0)).current


    let { width, height } = Dimensions.get("screen")
    height = height * 0.35


    // Variables del visor imagenes
    const [modalVisible, setModalVisible] = useState(false);
    const [images, setImages] = useState([]);
    const [aventura, setAventura] = useState({
        imagenDetalle: [],
    });



    const [initialImageIdx, setInitialImageIdx] = useState(0);
    const [dificultad, setDificultad] = useState(3);

    // Manejador de erorres
    const [errorTitulo, setErrortitulo] = useState(false);
    const [errorPrecioMin, setErrorprecioMin] = useState(false);
    const [errorPrecioMax, setErrorprecioMax] = useState(false);

    const [errorDistancia, setErrordistancia] = useState(false);
    const [errorAltitud, setErroraltitud] = useState(false);
    const [errorAscenso, setErrorascenso] = useState(false);

    const [errorDescripcion, setErrordescripcion] = useState(false);

    const [buttonLoading, setButtonLoading] = useState(false);

    // Variables del mapa
    const [region, setRegion] = useState({
        latitude: 21.76227198730249,
        latitudeDelta: 32.71611359157346,
        longitude: -104.03593288734555,
        longitudeDelta: 60.73143247514963,
    });

    // Checar si la ubicacion esta activada
    useEffect(() => {
        verificarUbicacion()
    }, []);

    function handleContinuar() {
        const precioMin = isNaN(parseFloat(aventura.precioMin, 10)) ? null : parseFloat(aventura.precioMin, 10)
        const precioMax = isNaN(parseFloat(aventura.precioMax, 10)) ? null : parseFloat(aventura.precioMax, 10)

        const distancia = isNaN(parseFloat(aventura.distancia, 10)) ? null : parseFloat(aventura.distancia, 10)
        const altitud = isNaN(parseFloat(aventura.altitud, 10)) ? null : parseFloat(aventura.altitud, 10)
        const ascenso = isNaN(parseFloat(aventura.ascenso, 10)) ? null : parseFloat(aventura.ascenso, 10)


        // Verificaciones
        const aventuraAEnviar = {
            ...aventura,
            precioMax,
            precioMin,
            distancia,
            altitud,
            ascenso,

            dificultad,
            region
        }

        // Existencia de parametros
        if (!aventura.titulo) {
            setErrortitulo(true)
            Alert.alert("Error", "Se requiere un titulo para la aventura")
            return
        }

        if (aventura.imagenDetalle.length === 0) {
            Alert.alert("Error", "Agrega minimo una imagen de la aventura")
            return
        }

        // Validacion de parametros
        if (aventura.titulo?.length < 3) {
            setErrortitulo(true)
            Alert.alert("Error", "Escribe minimo 3 caracteres como titulo")
            return
        }

        if ((!!aventura.precioMax) && aventura.precioMin > aventura.precioMax) {
            setErrorprecioMax(true)
            Alert.alert("Error", "El precio maximo debe ser mayor que el precio minimo")
            return
        }


        setButtonLoading(true)

        setTimeout(() => {
            setButtonLoading(false)
            navigation.navigate("ExitoScreen", {
                txtExito: "Solicitud enviada con exito, espera nuestra respuesta!!",
            })

        }, 1000);
        console.log(aventuraAEnviar)
    }

    function handleSelectDificultad(index) {
        setDificultad(index)
    }

    const handleRegionMap = (e) => {
        const { latitude, longitude } = e

        console.log(e)

        setRegion(e)

    }

    return (
        <View style={{ flex: 1, }}>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}

                style={styles.container}>
                <Carrousel
                    aventura={aventura}
                    setAventura={setAventura}

                    images={images}
                    setImages={setImages}

                    setModalVisible={setModalVisible}
                    setInitialImageIdx={setInitialImageIdx}

                    height={height}
                    width={width}

                    scrollX={scrollX}
                />
                {/* <Pressable
                onPress={() => navigation.pop()}
                style={{
                    position: 'absolute',
                    left: 10,
                    top: 10,
                    padding: 4,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                }}>
                <MaterialIcons
                    name={"keyboard-arrow-left"}
                    size={35}
                    color={moradoOscuro}
                />

            </Pressable> */}


                <View style={styles.bodyContainer}>

                    {/* Primer grupo */}
                    <View>

                        <View style={styles.row}>
                            {/* Titulo */}
                            <View style={{ flex: 1, marginRight: 20, }}>
                                <Text style={styles.captionTxt}>Titulo*</Text>

                                <TextInput
                                    value={aventura.titulo}
                                    maxLength={25}
                                    placeholderTextColor={"#00000035"}
                                    placeholder="Nevado de Colima"
                                    onPressIn={() => {
                                        setErrortitulo(false)
                                    }}
                                    onChangeText={(e) => {
                                        setAventura({
                                            ...aventura,
                                            titulo: e
                                        })
                                    }}
                                    style={{
                                        ...styles.textInput,
                                        borderColor: errorTitulo ? "red" : "transparent",
                                    }}
                                />
                            </View>


                            <View style={{ width: 160, }}>
                                <Text style={styles.captionTxt}>Rango precio /persona</Text>

                                <View style={styles.row}>
                                    <Text style={styles.precioIndicadores}>$ </Text>

                                    {/* PrecioMin */}
                                    <TextInput
                                        value={aventura.precioMin}
                                        maxLength={5}
                                        placeholderTextColor={"#00000040"}
                                        placeholder="1800"
                                        onPressIn={() => {
                                            setErrorprecioMin(false)
                                        }}
                                        onChangeText={(e) => {
                                            setAventura({
                                                ...aventura,
                                                precioMin: e
                                            })
                                        }}
                                        style={[styles.textInput, {
                                            borderColor: errorPrecioMin ? "red" : "transparent",
                                            fontWeight: 'bold',
                                        }]}
                                        keyboardType={"numeric"}
                                    />
                                    <Text style={styles.precioIndicadores}> - </Text>

                                    {/* PrecioMax */}
                                    <TextInput
                                        keyboardType={"numeric"}
                                        value={aventura.precioMax}
                                        maxLength={5}
                                        placeholderTextColor={"#00000040"}
                                        placeholder="3500"
                                        onPressIn={() => {
                                            setErrorprecioMax(false)
                                        }}
                                        onChangeText={(e) => {
                                            setAventura({
                                                ...aventura,
                                                precioMax: e
                                            })
                                        }}
                                        style={[styles.textInput, {
                                            borderColor: errorPrecioMax ? "red" : "transparent",
                                            fontWeight: 'bold',
                                        }]}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Dificultad */}
                        <View style={styles.dificultad}>
                            <Text style={styles.captionTxt}>Dificultad*</Text>
                            <View style={styles.row}>
                                {[...Array(5).keys()].map((e, i) => {

                                    return (
                                        <Pressable
                                            key={i}
                                            onPress={() => handleSelectDificultad(i + 1)}
                                            style={styles.dificultadIconContainer}
                                        >
                                            <Foundation name="mountains" size={30} color={i < dificultad ? "black" : "#00000077"} />
                                        </Pressable>
                                    )
                                })}

                            </View>
                        </View>
                    </View>


                    <View style={styles.line} />

                    {/* Iconos informativos */}
                    <View style={{
                        marginHorizontal: 4,
                        marginBottom: 10,
                    }}>
                        {/* Contenedor dist y dur */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            marginBottom: 10,
                        }}>
                            {/* Duracion */}
                            {/* Titulo */}
                            <View style={{ flex: 1, marginRight: 20, }}>
                                <Text style={[styles.captionTxt, { marginLeft: 40, }]}>Duracion</Text>
                                <View style={styles.row}>
                                    <View style={{ width: 35, }}>
                                        <Feather name="clock" size={25} color="gray" />
                                    </View>
                                    <TextInput
                                        value={aventura.duracion}
                                        maxLength={10}
                                        placeholderTextColor={"#00000040"}
                                        placeholder="1 a 2 dias"
                                        onChangeText={(e) => {
                                            setAventura({
                                                ...aventura,
                                                duracion: e
                                            })
                                        }}
                                        style={styles.textInput}
                                    />

                                </View>
                            </View>

                            {/* Distancia */}
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={[styles.captionTxt, { textAlign: 'right', }]}>Distancia inicio a fin</Text>

                                <View style={{
                                    ...styles.row,
                                    justifyContent: 'flex-end',
                                }}>
                                    <View style={{ width: 35, }}>
                                        <MaterialCommunityIcons name="map-marker-distance" size={25} color="gray" />
                                    </View>
                                    <TextInput
                                        value={aventura.distancia}
                                        maxLength={5}
                                        placeholderTextColor={"#00000040"}
                                        placeholder="3.6"
                                        keyboardType={"numeric"}
                                        onPressIn={() => {
                                            setErrordistancia(false)
                                        }}
                                        onChangeText={(e) => {
                                            setAventura({
                                                ...aventura,
                                                distancia: e
                                            })
                                        }}
                                        style={[styles.textInput, {
                                            flex: 0,
                                            width: 60,
                                            textAlign: 'center',
                                            borderColor: errorDistancia ? "red" : "transparent",

                                        }]}
                                    />
                                    <Text style={{
                                        color: 'gray',
                                        fontSize: 15,
                                    }}>  KM</Text>
                                </View>
                            </View>
                        </View>



                        {/* Contenedor ubicacion y altitud */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                            {/* Ubicacion aventura */}
                            <View>
                                <Text style={[styles.captionTxt, { textAlign: 'left', marginLeft: 40, }]}>Altitud cima</Text>
                                <View style={styles.row}>
                                    <View style={{ width: 35, }}>
                                        <FontAwesome5
                                            name="mountain"
                                            size={20}
                                            color="gray"
                                        />
                                    </View>

                                    <TextInput
                                        value={aventura.altitud}
                                        maxLength={4}
                                        placeholderTextColor={"#00000040"}
                                        placeholder="750"
                                        keyboardType={"numeric"}
                                        onPressIn={() => {
                                            setErroraltitud(false)
                                        }}
                                        onChangeText={(e) => {
                                            setAventura({
                                                ...aventura,
                                                altitud: e
                                            })
                                        }}
                                        style={[styles.textInput, {
                                            flex: 0,
                                            width: 60,
                                            textAlign: 'center',
                                            borderColor: errorAltitud ? "red" : "transparent",

                                        }]}
                                    />
                                    <Text style={{
                                        color: 'gray',
                                        fontSize: 15,
                                    }}>  m</Text>
                                </View>
                            </View>

                            {/* Distancia */}
                            <View>
                                <Text style={[styles.captionTxt, { textAlign: 'right', }]}>Ascenso recorrido</Text>
                                <View style={styles.row}>
                                    <View style={{ width: 35, height: 27, justifyContent: 'center', alignItems: 'center', marginRight: 8, }}>
                                        <Image source={require("../../../assets/icons/elevation.png")} style={{ height: 28, width: 25, }} />
                                    </View>
                                    <TextInput
                                        value={aventura.ascenso}
                                        maxLength={4}
                                        placeholderTextColor={"#00000040"}
                                        placeholder="750"
                                        keyboardType={"numeric"}
                                        onPressIn={() => {
                                            setErrorascenso(false)
                                        }}
                                        onChangeText={(e) => {
                                            setAventura({
                                                ...aventura,
                                                ascenso: e
                                            })
                                        }}
                                        style={[styles.textInput, {
                                            flex: 0,
                                            width: 60,
                                            textAlign: 'center',
                                            borderColor: errorAscenso ? "red" : "transparent",

                                        }]}
                                    />
                                    <Text style={{
                                        color: 'gray',
                                        fontSize: 15,
                                        width: 30,
                                        textAlign: 'center',
                                    }}>  m</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Text style={{
                        ...styles.captionTxt,
                        marginTop: 20,
                    }}>Ubicacion aproximada aventura*</Text>
                    <View style={styles.mapContainer}>

                        <MapView
                            provider={"google"}
                            mapType={"standard"}

                            showsUserLocation={true}
                            loadingEnabled={true}

                            initialRegion={region}

                            style={{
                                ...StyleSheet.absoluteFillObject,

                            }}

                            onRegionChangeComplete={handleRegionMap}

                        />
                        <Entypo
                            style={{
                                bottom: 16,
                            }}
                            name="location-pin"
                            size={40}
                            color={moradoOscuro}
                        />

                    </View>


                    <View style={styles.line} />


                    {/* Descripcion */}
                    <View style={{
                        marginTop: 40,

                        flex: 1,
                    }}>
                        <Text style={styles.captionTxt}>Descripcion</Text>
                        <TextInput
                            value={aventura.descripcion}
                            numberOfLines={6}
                            multiline={true}
                            placeholderTextColor={"#00000040"}
                            placeholder="Esta aventura contiene pedazos con alto nivel tecnico pero al final de cuentas se disfruta mucho..."
                            onPressIn={() => {
                                setErrordescripcion(false)
                            }}
                            onChangeText={(e) => {
                                setAventura({
                                    ...aventura,
                                    descripcion: e
                                })
                            }}
                            style={{
                                ...styles.textInput,
                                textAlignVertical: "top",
                                borderColor: errorDescripcion ? "red" : "transparent",
                            }}
                        />
                    </View>

                    <Boton
                        onPress={handleContinuar}
                        style={{ marginTop: 40, }}
                        titulo={"Enviar"}
                        loading={buttonLoading}
                    />
                </View>


                {/* Mostrar imagenes */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <ImageFullScreen
                        initialImageIdx={initialImageIdx}
                        setModalVisible={setModalVisible}
                        images={images}
                        titulo={aventura.titulo}
                    />
                </Modal>

            </Animated.ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    bodyContainer: {
        backgroundColor: '#fff',
        width: '100%',
        top: -30,
        borderRadius: 30,
        padding: 20,
        paddingTop: 25,
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

    precioIndicadores: {
        fontSize: 18,
        fontWeight: "bold",
    },

    row: {
        alignItems: 'center',
        flexDirection: 'row',
    },

    line: {
        marginTop: 30,
        marginBottom: 10,
        borderTopWidth: .5,
        borderColor: moradoClaro,
        marginHorizontal: 20,

    },

    dificultad: {
        flex: 1,
        marginTop: 20,

    },

    dificultadIconContainer: {
        padding: 6,
    },

    mapContainer: {
        width: '100%',
        height: height * 0.3,
        alignItems: 'center', justifyContent: 'center',
    }
})
