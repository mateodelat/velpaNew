import React, { useRef, useState } from 'react'
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
    TextInput,
    ActivityIndicator
} from 'react-native'


import ImageFullScreen from '../../../components/ImageFullScreen';



import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';


import { getPlaceElevation, mayusFirstLetter, moradoClaro, moradoOscuro } from '../../../../assets/constants';

import { Categorias } from '../../../models';

import ModalMap from './components/ModalMap';
import ModalMaterial from './components/ModalMaterial';
import { DataStore } from '@aws-amplify/datastore';
import { Aventura } from '../../../models';
import { Loading } from '../../../components/Loading';
import Carrousel from '../../AgregarAventura/components/Carrousel';


const { height } = Dimensions.get("screen")
const colorInput = "#f4f6f6"

export default ({ navigation, route }) => {
    const aventuraDef = route.params
    //DISTINTAS CATEGORIAS
    const scrollX = useRef(new Animated.Value(0)).current


    let { width, height } = Dimensions.get("screen")

    const listCategorias = Object.values(Categorias)

    // Variables del visor imagenes
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState("images");

    const [images, setImages] = useState(aventuraDef.imagenDetalle.map(e => {
        return {
            ...e,
            url: e.uri
        }
    }).filter(e => !e.video))

    const [categoria, setCategoria] = useState(aventuraDef.categoria);
    const [showCategorias, setShowCategorias] = useState(false);

    const [aventura, setAventura] = useState(aventuraDef);

    const [initialImageIdx, setInitialImageIdx] = useState(0);


    // Manejador de erorres
    const [errorTitulo, setErrortitulo] = useState(false);
    const [errorPrecioMin, setErrorprecioMin] = useState(false);
    const [errorPrecioMax, setErrorprecioMax] = useState(false);

    const [buttonLoading, setButtonLoading] = useState(false);

    const handleShowCategoria = () => {
        setShowCategorias(!showCategorias)
    }

    const handleSelectCategoria = (index) => {
        setCategoria(listCategorias[index])
        setAventura({
            ...aventura,
            categoria: listCategorias[index]
        })
        setShowCategorias(false)
    }


    async function handleContinuar() {
        const precioMin = isNaN(parseFloat(aventura.precioMin, 10)) ? null : parseFloat(aventura.precioMin, 10)
        const precioMax = isNaN(parseFloat(aventura.precioMax, 10)) ? null : parseFloat(aventura.precioMax, 10)

        const distanciaRecorrida = isNaN(parseFloat(aventura.distanciaRecorrida, 10)) ? null : parseFloat(aventura.distanciaRecorrida, 10)
        const altimetriaRecorrida = isNaN(parseFloat(aventura.altimetriaRecorrida, 10)) ? null : parseFloat(aventura.altimetriaRecorrida, 10)

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
            imagenDetalle,
            imagenFondoIdx: aventura.imagenFondoIdx,
            precioMax,
            precioMin,

            duracion: aventura.duracion,

            // Parametros que dependen de la categoria para enviarse
            distanciaRecorrida: (categoria === Categorias.APLINISMO || categoria === Categorias.CICLISMO) ? distanciaRecorrida : null,
            altimetriaRecorrida: (categoria === Categorias.APLINISMO || categoria === Categorias.CICLISMO) ? altimetriaRecorrida : null,

            categoria,
            titulo: aventura.titulo,
            descripcion: aventura.descripcion,

            coordenadas: aventura.coordenadas,
            ubicacionId: aventura.ubicacionId,
            ubicacionLink: aventura.ubicacionLink,
            ubicacionNombre: aventura.ubicacionNombre,
            altitud: aventura.altitud,

            materialDefault: aventura.materialDefault

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


        if ((!!aventura.precioMax) && precioMin > precioMax) {
            setErrorprecioMax(true)
            Alert.alert("Error", "El precio maximo debe ser mayor que el precio minimo")
            return
        }
        setButtonLoading(true)
        try {
            const modelAventura = await DataStore.query(Aventura, aventura.id)
            await DataStore.save(Aventura.copyOf(modelAventura, av => {
                av.imagenDetalle = aventuraAEnviar.imagenDetalle
                av.imagenFondoIdx = aventuraAEnviar.imagenFondoIdx
                av.precioMax = aventuraAEnviar.precioMax
                av.precioMin = aventuraAEnviar.precioMin

                av.duracion = aventuraAEnviar.duracion

                av.distanciaRecorrida = aventuraAEnviar.distanciaRecorrida
                av.altimetriaRecorrida = aventuraAEnviar.altimetriaRecorrida

                av.categoria = aventuraAEnviar.categoria
                av.titulo = aventuraAEnviar.titulo
                av.descripcion = aventuraAEnviar.descripcion

                av.coordenadas = aventuraAEnviar.coordenadas
                av.ubicacionId = aventuraAEnviar.ubicacionId
                av.ubicacionLink = aventuraAEnviar.ubicacionLink
                av.ubicacionNombre = aventuraAEnviar.ubicacionNombre
                av.altitud = aventuraAEnviar.altitud

                av.materialDefault = aventuraAEnviar.materialDefault

            }))

            navigation.pop()
            setButtonLoading(false)

        } catch (e) {
            Alert.alert("Error", "Error guardando aventura")
            console.log(e)
            setButtonLoading(false)

        }


    }

    function handleSelectDificultad(index) {
        setAventura({
            ...aventura,
            dificultad: index
        })
    }

    async function handleSaveLocation(ubi) {
        setModalVisible(false)
        const {
            latitude,
            longitude,
            ubicacionId,
            ubicacionLink,
            ubicacionNombre,
        } = ubi
        const altitud =
            aventura.categoria === Categorias.APLINISMO ||
                aventura.categoria === Categorias.CICLISMO ? await getPlaceElevation(latitude, longitude) : null

        const coordenadas = {
            latitude,
            longitude,

        }

        setAventura({
            ...aventura,
            coordenadas,
            ubicacionId,
            ubicacionLink,
            ubicacionNombre,
            altitud
        })
    }
    const ubicacionAventura = {
        latitude: aventura.coordenadas.latitude,
        longitude: aventura.coordenadas.longitude,
        ubicacionId: aventura.ubicacionId,
        ubicacionLink: aventura.ubicacionLink,
        ubicacionNombre: aventura.ubicacionNombre,
    }

    const handleShowMaterial = () => {
        setModalVisible(true)
        setTipoModal("material")
    }


    function handleSaveMaterial(material) {
        setModalVisible(false)
        setAventura({
            ...aventura,
            materialDefault: JSON.stringify(material)
        })

    }

    return (
        <View style={{ flex: 1, }}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <MaterialIcons name="keyboard-arrow-left" size={35} color="white" style={styles.backButton} onPress={() => navigation.pop()} />
                <Text style={styles.tituloHeader}>{mayusFirstLetter(aventura.titulo)}</Text>
                {buttonLoading ?
                    <View style={styles.saveButton}>
                        <ActivityIndicator color="#fff" size={"large"} />
                    </View>
                    :
                    <MaterialIcons name="done" size={35} color="white" style={styles.saveButton} onPress={handleContinuar} />
                }
            </View>

            <ScrollView
                onScroll={() => setShowCategorias(false)}
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <Carrousel
                    aventura={aventura}
                    setAventura={setAventura}

                    images={images}
                    setImages={setImages}

                    setModalVisible={(data) => setModalVisible(data) && setTipoModal("images")}
                    setInitialImageIdx={setInitialImageIdx}

                    height={height * 0.35}
                    width={width}

                    scrollX={scrollX}
                />

                <View style={styles.bodyContainer}>

                    {/* Primer grupo */}
                    <View>

                        <View style={{
                            ...styles.row,
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
                                }}>Rango precio /persona</Text>

                                <View style={{
                                    ...styles.row,
                                    marginLeft: 10
                                }}>
                                    <Text style={styles.precioIndicadores}>$ </Text>

                                    {/* PrecioMin */}
                                    <TextInput
                                        value={String(Number(aventura.precioMin))}
                                        placeholderTextColor={"#00000040"}
                                        placeholder="1800"
                                        onPressIn={() => {
                                            setErrorprecioMin(false)
                                        }}
                                        onChangeText={(e) => {
                                            setAventura({
                                                ...aventura,
                                                precioMin: Number(e)
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
                                        value={String(Number(aventura.precioMax))}
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

                        <View style={{
                            ...styles.row,
                            marginVertical: 30,
                        }}>

                            {/* Categoria */}
                            <View style={styles.categoriaContainer}>
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


                    </View>



                    <View style={styles.line} />

                    <Pressable
                        onPress={() => {
                            setModalVisible(true)
                            setTipoModal("mapa")
                        }}
                        style={styles.ubicacionContainer}>
                        <Ionicons name="md-location-sharp" size={25} color={moradoOscuro} />
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#0000009E",
                                flex: 1,
                                marginLeft: 10,
                            }}>{aventura.ubicacionNombre}{aventura.altitud && ` (${aventura.altitud}) m`}</Text>

                    </Pressable>

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
                            {categoria === Categorias.APLINISMO || categoria === Categorias.CICLISMO ? <View style={{
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
                                        value={String(Number(aventura.distanciaRecorrida))}
                                        maxLength={5}
                                        placeholderTextColor={"#00000040"}
                                        placeholder="3.6"
                                        keyboardType={"numeric"}
                                        onChangeText={(e) => {
                                            setAventura({
                                                ...aventura,
                                                distanciaRecorrida: Number(e)
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
                            {(categoria === Categorias.CICLISMO || categoria === Categorias.APLINISMO) && <View>
                                <Text style={[styles.captionTxt, { textAlign: 'right', }]}>Altimetria recorrida</Text>
                                <View style={styles.row}>
                                    <View style={{ width: 35, height: 27, justifyContent: 'center', alignItems: 'center', marginRight: 8, }}>
                                        <Image source={require("../../../../assets/icons/elevation.png")} style={{ height: 28, width: 25, }} />
                                    </View>
                                    <TextInput
                                        value={String(Number(aventura.altimetriaRecorrida))}
                                        maxLength={4}
                                        placeholderTextColor={"#00000040"}
                                        placeholder="750"
                                        keyboardType={"numeric"}
                                        onChangeText={(e) => {
                                            setAventura({
                                                ...aventura,
                                                altimetriaRecorrida: Number(e)
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

                    {/* Material a llevar */}
                    <Pressable
                        onPress={handleShowMaterial}
                        style={{
                            height: 45,
                            ...styles.categoriaContainer,
                            marginTop: 20,
                        }}>

                        <View style={{
                            paddingHorizontal: 15,
                            flexDirection: 'row',
                            alignItems: 'center',

                            backgroundColor: colorInput,
                            flex: 1,

                        }}>

                            <Text style={styles.categoriaTxt}>Material a llevar sugerido</Text>
                            <MaterialIcons
                                name={"keyboard-arrow-right"}
                                size={30}
                                color={moradoClaro}
                            />
                        </View>

                    </Pressable>



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




                </View>

                {/* Mostrar imagenes y mapa */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    {tipoModal === "images" ?
                        <ImageFullScreen
                            initialImageIdx={initialImageIdx}
                            setModalVisible={setModalVisible}
                            images={images}
                            titulo={aventura.titulo}
                        />
                        :
                        tipoModal === "material" ?
                            <ModalMaterial
                                setModalVisible={setModalVisible}
                                data={JSON.parse(aventura.materialDefault)}
                                handleSave={handleSaveMaterial}
                            />
                            :
                            <ModalMap
                                setModalVisible={setModalVisible}
                                place={ubicacionAventura}
                                handleGuardar={handleSaveLocation}
                            />
                    }
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

    headerContainer: {
        width: '100%',
        height: 60,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: moradoOscuro,
    },

    backButton: {
        left: 16,
        position: 'absolute',
    },

    saveButton: {
        right: 16,
        position: 'absolute',
    },

    tituloHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 1,
        textAlign: 'center',
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
    },

    sugestionsContainer: {
        left: 0,
        top: 48,
    },

    ubicacionContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: colorInput,
        borderRadius: 7,
    }
})
