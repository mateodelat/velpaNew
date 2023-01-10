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
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';


import Boton from '../../components/Boton';
import { colorFondo, moradoClaro, moradoOscuro, verificarUbicacion } from '../../../assets/constants';

import uuid from 'react-native-uuid';
import { Categorias } from '../../models';


const { height } = Dimensions.get("screen")
const colorInput = "#f4f6f6"

export default ({ navigation }) => {
    //DISTINTAS CATEGORIAS
    const scrollX = useRef(new Animated.Value(0)).current


    let { width, height } = Dimensions.get("screen")
    height = height * 0.35
    const listCategorias = Object.values(Categorias)

    // Variables del visor imagenes
    const [modalVisible, setModalVisible] = useState(false);
    const [images, setImages] = useState([]);

    const [categoria, setCategoria] = useState(Categorias.ALPINISMO);
    const [showCategorias, setShowCategorias] = useState(false);

    const [aventura, setAventura] = useState({
        imagenDetalle: [],
        imagenFondoIdx: 0,
        id: uuid.v4()
    });

    const [uploadingImage, setUploadingImage] = useState(null);

    const [initialImageIdx, setInitialImageIdx] = useState(0);

    // Manejador de erorres
    const [errorTitulo, setErrortitulo] = useState(false);


    const handleShowCategoria = () => {
        setShowCategorias(!showCategorias)
    }

    const handleSelectCategoria = (index) => {
        setCategoria(listCategorias[index])
        setShowCategorias(false)
    }


    function handleContinuar() {
        const distanciaRecorrida = isNaN(parseFloat(aventura.distanciaRecorrida, 10)) ? null : parseFloat(aventura.distanciaRecorrida, 10)
        const altimetriaRecorrida = isNaN(parseFloat(aventura.altimetriaRecorrida, 10)) ? null : parseFloat(aventura.altimetriaRecorrida, 10)

        // Si se esta subiendo no poder continuar
        if (uploadingImage !== null) {
            Alert.alert("Espera", "Espera a que se suban todas las imagenes")
            return

        }
        console.log(aventura.imagenDetalle)

        // Verificacion de index de imagen fondo
        if (aventura.imagenFondoIdx === null || aventura.imagenFondoIdx >= aventura.imagenDetalle.length) {
            Alert.alert("Error", "Selecciona una imagen principal para la aventura")
            return
        }


        // Verificacion de index de imagen fondo
        if (aventura.imagenDetalle[aventura.imagenFondoIdx].video) {
            Alert.alert("Error", "La imagen principal no puede ser un video")
            return
        }


        // Obtener la key de cada imagen
        const imagenDetalle = aventura.imagenDetalle.map(e => {
            return e.key
        })

        // Verificaciones
        const aventuraAEnviar = {
            ...aventura,
            imagenDetalle,

            // Parametros que dependen de la categoria para enviarse
            distanciaRecorrida: (
                categoria === Categorias.ALPINISMO ||
                categoria === Categorias.CICLISMO ||
                categoria === Categorias.MOTO ||
                categoria === Categorias.SKI) ? distanciaRecorrida : null,
            altimetriaRecorrida: (
                categoria === Categorias.CICLISMO ||
                categoria === Categorias.ALPINISMO ||
                categoria === Categorias.SKI) ? altimetriaRecorrida : null,

            categoria,
        }
        // Existencia de parametros
        if (!aventura.titulo) {
            setErrortitulo(true)
            Alert.alert("Error", "Se requiere un titulo para la aventura")
            return
        }

        if (aventura.imagenDetalle.length === 0 || (aventura.imagenDetalle.length === 1 && aventura.imagenDetalle[0].video)) {
            Alert.alert("Error", "Agrega minimo una imagen de la aventura")
            return
        }

        // Validacion de parametros
        if (aventura.titulo?.length < 3) {
            setErrortitulo(true)
            Alert.alert("Error", "Escribe minimo 3 caracteres como titulo")
            return
        }


        navigation.navigate("AgregarAventura2", aventuraAEnviar)
    }


    return (
        <View style={{ flex: 1, }}>

            <ScrollView
                onScroll={() => setShowCategorias(false)}
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <Carrousel
                    uploading={uploadingImage}
                    setUploading={setUploadingImage}

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

                <View style={styles.bodyContainer}>

                    {/* Primer grupo */}
                    <View style={{
                        ...styles.row,
                        marginBottom: 30,
                    }}>
                        {/* Titulo */}
                        <View style={{ flex: 1, }}>
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
                                    marginRight: 10,
                                }}
                            />
                        </View>


                        <View style={{ flex: 1, }}>
                            <Text style={{
                                ...styles.captionTxt,
                                textAlign: 'left',
                            }}>Categoria*</Text>
                            <Pressable
                                onPress={handleShowCategoria}
                                style={{
                                    height: 45,
                                }}>

                                <View style={{
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                    backgroundColor: colorInput,
                                    flex: 1,

                                    borderRadius: 7,

                                }}>

                                    <Text style={styles.categoriaTxt}>{categoria}</Text>
                                    <MaterialIcons
                                        name={showCategorias ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                        size={30}
                                        color={moradoClaro}
                                    />
                                </View>

                            </Pressable>
                            {showCategorias && <View style={{
                                width: '100%',
                                zIndex: 1,
                                position: 'absolute',
                                backgroundColor: colorInput,
                                top: 65,
                                paddingTop: 5,
                                borderBottomLeftRadius: 7,
                                borderBottomRightRadius: 7,
                            }}>
                                {
                                    listCategorias.map((e, idx) => (
                                        <Pressable
                                            key={idx.toString()}
                                            style={{
                                                paddingHorizontal: 15,
                                                paddingVertical: 10,
                                                backgroundColor: categoria === e ? moradoClaro : "transparent",
                                            }}
                                            onPress={() => handleSelectCategoria(idx)}

                                        >

                                            <Text
                                                style={{
                                                    ...styles.categoriaTxt,
                                                    color: categoria !== e ? moradoClaro : "#fff",
                                                }}
                                            >{e}</Text>
                                        </Pressable>
                                    ))
                                }

                            </View>
                            }

                        </View>
                    </View>


                    <View style={styles.line} />

                    {/* Iconos informativos */}
                    <View style={{
                        marginHorizontal: 4,
                        marginBottom: 20,
                    }}>
                        {/* Contenedor dist y dur */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            marginBottom: 10,
                        }}>
                            {/* Duracion */}
                            <View style={{ flex: 1, marginRight: 20, }}>
                                <Text style={[styles.captionTxt, { marginLeft: 40, }]}>Duracion aprox</Text>
                                <View style={styles.row}>
                                    <View style={{ width: 35, }}>
                                        <Feather name="clock" size={25} color="gray" />
                                    </View>
                                    <TextInput
                                        value={aventura.duracion}
                                        maxLength={15}
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
                            {categoria === Categorias.ALPINISMO ||
                                categoria === Categorias.CICLISMO ||
                                categoria === Categorias.MOTO ||
                                categoria === Categorias.SKI ? <View style={{
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
                                        value={aventura.distanciaRecorrida}
                                        maxLength={5}
                                        placeholderTextColor={"#00000040"}
                                        placeholder="3.6"
                                        keyboardType={"numeric"}
                                        onChangeText={(e) => {
                                            setAventura({
                                                ...aventura,
                                                distanciaRecorrida: e
                                            })
                                        }}
                                        style={[styles.textInput, {
                                            flex: 0,
                                            width: 60,
                                            textAlign: 'center',

                                        }]}
                                    />
                                    <Text style={{
                                        color: 'gray',
                                        fontSize: 15,
                                    }}>  KM</Text>
                                </View>
                            </View> : <View style={{ flex: 1, }} />}
                        </View>



                        {/* Contenedor Altitud y ascenso */}
                        {categoria !== Categorias.OTROS && <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 5,
                            marginBottom: 20,
                        }}>

                            {/* Ascenso recorrido */}
                            {(categoria === Categorias.CICLISMO ||
                                categoria === Categorias.ALPINISMO ||
                                categoria === Categorias.SKI) && <View>
                                    <Text style={[styles.captionTxt, { textAlign: 'right', }]}>Desnivel recorrido</Text>
                                    <View style={styles.row}>
                                        <View style={{ width: 35, height: 27, justifyContent: 'center', alignItems: 'center', marginRight: 8, }}>
                                            <Image source={require("../../../assets/icons/elevation.png")} style={{ height: 28, width: 25, }} />
                                        </View>
                                        <TextInput
                                            value={aventura.altimetriaRecorrida}
                                            maxLength={4}
                                            placeholderTextColor={"#00000040"}
                                            placeholder="750"
                                            keyboardType={"numeric"}
                                            onChangeText={(e) => {
                                                setAventura({
                                                    ...aventura,
                                                    altimetriaRecorrida: e
                                                })
                                            }}
                                            style={[styles.textInput, {
                                                flex: 0,
                                                width: 60,
                                                textAlign: 'center',

                                            }]}
                                        />
                                        <Text style={{
                                            color: 'gray',
                                            fontSize: 15,
                                            width: 30,
                                            textAlign: 'center',
                                        }}>  m</Text>
                                    </View>
                                </View>}
                        </View>}
                    </View>


                    <View style={styles.line} />


                    {/* Descripcion */}
                    <View style={{
                        marginTop: 20,

                        flex: 1,
                    }}>
                        <Text style={styles.captionTxt}>Descripcion</Text>
                        <TextInput
                            value={aventura.descripcion}
                            numberOfLines={6}
                            multiline={true}
                            placeholderTextColor={"#00000040"}
                            placeholder="Esta experiencia contiene pedazos con alto nivel tecnico pero al final de cuentas se disfruta mucho..."
                            onChangeText={(e) => {
                                setAventura({
                                    ...aventura,
                                    descripcion: e
                                })
                            }}
                            style={{
                                ...styles.textInput,
                                textAlignVertical: "top",
                            }}
                        />
                    </View>

                    <Boton
                        onPress={handleContinuar}
                        style={{ marginTop: 40, }}
                        titulo={"Continuar"}
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

            </ScrollView>
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
        paddingBottom: 0,
        paddingTop: 25
    },
    textInput: {
        fontSize: 17,
        flex: 1,
        backgroundColor: colorInput,
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
        marginBottom: 10,
        borderTopWidth: .5,
        borderColor: moradoClaro,
        marginHorizontal: 20,

    },

    dificultad: {
        flex: 1,
        // marginTop: 20,

    },

    dificultadIconContainer: {
        padding: 3,
        paddingVertical: 0
    },

    mapContainer: {
        width: '100%',
        height: height * 0.3,
        alignItems: 'center', justifyContent: 'center',
    },

    queLlevarContainer: {
        marginTop: 20,
    },

    categoriaContainer: {
        flex: 1,
    },

    categoriaTxt: {
        fontSize: 17,
        color: moradoClaro,
        flex: 1,
        // textAlign: 'right',
    }
})
