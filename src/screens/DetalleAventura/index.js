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
    Linking,
    ActivityIndicator
} from 'react-native'

import ImageFullScreen from '../../components/ImageFullScreen';

import Carrousel from './components/Carrousel';

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



import Descripcion from './components/Descripcion';
import CuadradoImagen from '../../components/CuadradoImagen';
import Boton from '../../components/Boton';
import { colorFondo, getAventura, listAventurasSugeridas, moradoOscuro, redondear } from '../../../assets/constants';
import HeaderDetalleAventura from '../../navigation/components/HeaderDetalleAventura';
import { Loading } from '../../components/Loading';
import ModalMap from '../../components/ModalMap';
import Header from '../../components/header';
import MapView, { Marker } from 'react-native-maps';




export default ({ navigation, route }) => {
    //HACER DISTANCIA Y ALTITUD DEPENDIENTE DE SI EXISTE EN LA DB PARA TENER
    //DISTINTAS CATEGORIAS

    const [loading, setLoading] = useState(true);

    // Variables del visor imagenes
    const [modalVisible, setModalVisible] = useState(false);
    const [images, setImages] = useState([]);

    // Variables del mapa
    const [tipoModal, setTipoModal] = useState("map");

    // Variables para animaciones (Carrousel fotos y header transparencia)
    const scrollX = useRef(new Animated.Value(0)).current
    const scrollY = useRef(new Animated.Value(0)).current

    let { width, height } = Dimensions.get("screen")
    height = height * 0.35


    const [initialImageIdx, setInitialImageIdx] = useState(0);


    // Obtener aventura
    const [aventura, setAventura] = useState({});
    const [aventurasSugeridas, setAventurasSugeridas] = useState([]);
    useEffect(() => {
        const id = route.params?.id

        if (id) {
            getAventura(id)
                .then(r => {
                    if (!r) {
                        setAventura(null)
                        setLoading(false)
                        return false
                    }

                    // Formatear las imagen detalle
                    r = {
                        ...r,
                        imagenDetalle: r.imagenDetalle.map(e => {
                            return {
                                uri: e.uri,
                                // Verificar si es video
                                video: e.uri.endsWith(".mp4"),
                                key: e.key
                            }
                        })
                    }
                    setAventura(r)


                    // Formatear con url antes del link y quitar todos los videos
                    const imagenesVisor = r.imagenDetalle.filter(img => !img.video)
                        .map(img => ({
                            url: img.uri
                        }))

                    // Imagenes del visor
                    setImages(imagenesVisor)
                    return r
                })
                .then(ave => {
                    if (ave) {
                        // Obtener aventuras sugeridas
                        listAventurasSugeridas(id, 4, ave).then(r => {
                            setAventurasSugeridas(r)
                            setLoading(false)

                        })
                    }

                })
        }

    }, []);


    function handleContinuar() {
        navigation.navigate("FechasAventura", {
            aventuraID: aventura.id,
            imagenFondo: {
                uri: aventura.imagenDetalle[aventura.imagenFondoIdx].uri,
                key: aventura.imagenDetalle[aventura.imagenFondoIdx].key
            },
            titulo: aventura.titulo
        })
    }



    function handleNavegarSugerido(id) {
        navigation.pop()
        navigation.navigate("DetalleAventura", {
            id
        })
    }

    if (loading) return <View style={{ flex: 1, }}>
        <Loading />

    </View>

    if (!aventura) {
        return <View style={styles.container}>
            <Header
                title={"Experiencia"}
            />
            <View style={{ padding: 20, }}>

                <Text>Error, no existe la experiencia</Text>
            </View>

        </View>
    }

    const region = {
        latitude: aventura.coordenadas.latitude,
        longitude: aventura.coordenadas.longitude,
        latitudeDelta: 2,
        longitudeDelta: 2,

    }


    return (
        <View style={{
            flex: 1,
        }}>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}

                style={styles.container}>
                <Carrousel

                    setModalVisible={(params) => {
                        setModalVisible(params)
                        setTipoModal("images")
                    }}
                    setInitialImageIdx={setInitialImageIdx}

                    height={height}
                    width={width}

                    images={aventura.imagenDetalle}
                    scrollX={scrollX}
                />

                <View style={styles.bodyContainer}>
                    {/* <Text style={{
                        marginBottom: 10,
                        fontSize: 16,
                        color: moradoOscuro,
                        flex: 1,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}>{aventura.categoria}</Text>
 */}

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text
                            numberOfLines={3}
                            style={{
                                fontSize: 18,
                                flex: 1,

                            }}>{aventura.titulo}  {aventura.altitud && <Text
                                style={{
                                    fontSize: 18,

                                }}>({aventura.altitud}m)</Text>}</Text>
                        {aventura.precioMin && <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginLeft: 15,
                        }}>$ {redondear(aventura.precioMin, 50)} - {redondear(aventura.precioMax, 50, true)}
                        </Text>}
                    </View>




                    {/* Iconos informativos */}
                    <View style={{
                        marginHorizontal: 4,
                        marginTop: 20,
                    }}>
                        {/* Contenedor dist y dur */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            {/* Duracion */}
                            {aventura.duracion ? <View style={{
                                flexDirection: 'row',
                            }}>
                                <View style={{ width: 35, }}>
                                    <Feather name="clock" size={25} color="gray" />
                                </View>
                                <Text style={{
                                    fontSize: 16,
                                    color: 'gray',
                                }}>{aventura.duracion}</Text>
                            </View> : <View />
                            }

                            {/* Distancia */}
                            {aventura.distanciaRecorrida && <View style={{
                                flexDirection: 'row',
                            }}>
                                <View style={{ width: 35, }}>
                                    <MaterialCommunityIcons name="map-marker-distance" size={25} color="gray" />
                                </View>
                                <Text style={{
                                    fontSize: 16,
                                    color: 'gray',
                                }}>{aventura.distanciaRecorrida} KM</Text>
                            </View>}
                        </View>



                        {/* Contenedor altitud */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                        }}>

                            {/* Altimetria */}
                            {
                                aventura.altimetriaRecorrida && <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <View style={{ width: 25, height: 27, justifyContent: 'center', alignItems: 'center', }}>
                                        <Image source={require("../../../assets/icons/elevation.png")} style={{ height: 28, width: 25, }} />
                                    </View>
                                    <Text style={{
                                        marginLeft: 10,
                                        fontSize: 16,
                                        color: 'gray',
                                    }}>{aventura.altimetriaRecorrida} m</Text>
                                </View>}
                        </View>

                        {/* Descripcion */}
                        {!!aventura.descripcion ? <Descripcion
                            descripcion={aventura.descripcion}
                        /> :
                            <View style={{
                                marginBottom: 30,
                            }}>

                            </View>
                        }


                        {/* Ubicacion de la aventura*/}
                        <View
                            style={{
                                marginVertical: 20,
                                height: height * 0.7,
                                backgroundColor: colorFondo,
                            }}>
                            <MapView
                                onPress={() => {
                                    setModalVisible(true)
                                    setTipoModal("map")
                                }}

                                loadingIndicatorColor='black'
                                loadingEnabled
                                loadingBackgroundColor={colorFondo}

                                pitchEnabled={false}
                                rotateEnabled={false}
                                zoomEnabled={false}
                                scrollEnabled={false}

                                provider={"google"}
                                mapType={"standard"}

                                initialRegion={region}

                                style={{
                                    ...StyleSheet.absoluteFill,
                                }}
                            >
                                {/* Marcador de la ubicacion */}
                                <Marker
                                    coordinate={region}
                                />
                            </MapView>

                        </View>
                    </View>


                    {/* Lugares recomendados */}
                    {
                        aventurasSugeridas?.length !== 0 && <View>

                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 20,
                                marginTop: 30,
                                marginBottom: 20,
                            }}>Experiencias cercanas</Text>

                            {
                                aventurasSugeridas === null ?
                                    <View style={{
                                        height: 190,
                                        alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <ActivityIndicator
                                            color={"black"}
                                            size={"large"}
                                        />
                                    </View> :
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {
                                            aventurasSugeridas.map((ave, i) => {
                                                return <CuadradoImagen
                                                    key={ave.id}
                                                    onPress={() => handleNavegarSugerido(ave.id)}
                                                    tamañoCuadrado={180}
                                                    item={ave}
                                                    style={{
                                                        marginRight: i === aventurasSugeridas.length - 1 ? 0 : 20,
                                                    }}
                                                />
                                            })
                                        }
                                    </ScrollView>
                            }
                        </View>}


                    <Boton
                        red
                        onPress={handleContinuar}
                        style={{ marginTop: 40, }}
                        titulo={"Reservar ahora"}
                    />
                </View>

            </Animated.ScrollView >
            <HeaderDetalleAventura
                scrollY={scrollY}
                height={height * 2}
                titulo={aventura.titulo}
                modalActive={modalVisible}
            />


            {/* Mostrar imagenes */}
            {
                tipoModal === "map" ?
                    (aventura ? <ModalMap
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}

                        selectedPlace={{
                            latitude: aventura.coordenadas.latitude,
                            longitude: aventura.coordenadas.longitude,
                            titulo: aventura.ubicacionNombre,
                        }}

                    /> : null)
                    :
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
                            titulo={"El nevado de colima"}
                        />
                    </Modal>
            }
        </View >
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
    }
})
