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

import dificultad from '../../../assets/dificultad';
import ImageFullScreen from '../../components/ImageFullScreen';

import Carrousel from './components/Carrousel';

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



import Descripcion from './components/Descripcion';
import CuadradoImagen from '../../components/CuadradoImagen';
import Boton from '../../components/Boton';
import { getAventura, listAventurasAutorizadas, moradoOscuro } from '../../../assets/constants';
import HeaderDetalleAventura from '../../navigation/components/HeaderDetalleAventura';
import { Loading } from '../../components/Loading';
import Header from '../../components/header';



export default ({ navigation, route }) => {
    //HACER DISTANCIA Y ALTITUD DEPENDIENTE DE SI EXISTE EN LA DB PARA TENER
    //DISTINTAS CATEGORIAS

    const [loading, setLoading] = useState(true);

    // Variables del visor imagenes
    const [modalVisible, setModalVisible] = useState(false);
    const [images, setImages] = useState([]);

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

                    // Formatear las imagen detalle
                    r = {
                        ...r,
                        imagenDetalle: r.imagenDetalle.map(e => {
                            return {
                                uri: e,
                                // Verificar si es video
                                video: e.endsWith(".mp4")
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

                })
        }

        // Obtener aventuras sugeridas
        listAventurasAutorizadas(3).then(r => {
            setAventurasSugeridas(r)
            setLoading(false)

        })
    }, []);



    function handleContinuar() {
        navigation.navigate("FechasAventura", {
            aventuraID: aventura.id,
            imagenFondo: aventura.imagenDetalle[aventura.imagenFondoIdx].uri,
            titulo: aventura.titulo
        })
    }


    function verEnGoogleMaps() {
        Linking.openURL(aventura.ubicacionLink)
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

                    setModalVisible={setModalVisible}
                    setInitialImageIdx={setInitialImageIdx}

                    height={height}
                    width={width}

                    images={aventura.imagenDetalle}
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

                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginLeft: 15,
                        }}>$ {aventura.precioMin} - {aventura.precioMax}
                        </Text>
                    </View>

                    {/* Dificultad */}
                    <View style={{
                        marginTop: 20,
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{
                                fontSize: 16,
                            }}>Dificultad   </Text>
                            <Image source={dificultad[aventura.dificultad]} />
                        </View>
                    </View>



                    {/* Iconos informativos */}
                    <View style={{
                        marginHorizontal: 4,
                        marginTop: 10,
                    }}>
                        {/* Contenedor dist y dur */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            {/* Duracion */}
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <View style={{ width: 35, }}>
                                    <Feather name="clock" size={25} color="gray" />
                                </View>
                                <Text style={{
                                    fontSize: 16,
                                    color: 'gray',
                                }}>{aventura.duracion}</Text>
                            </View>

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



                        {/* Contenedor ubicacion y altitud */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                            {/* Ubicacion aventura */}
                            <Pressable
                                onPress={verEnGoogleMaps}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <View style={{ width: 35, }}>
                                    <Ionicons name="md-location-sharp" size={25} color="#0000009E" />
                                </View>
                                <Text style={{
                                    fontSize: 16,
                                    color: "#0000009E",
                                }}>{aventura.ubicacionNombre}</Text>
                            </Pressable>

                            {/* Distancia */}
                            {
                                aventura.altimetriaRecorrida && <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <View style={{ width: 35, height: 27, justifyContent: 'center', alignItems: 'center', }}>
                                        <Image source={require("../../../assets/icons/elevation.png")} style={{ height: 28, width: 25, }} />
                                    </View>
                                    <Text style={{
                                        marginLeft: 5,
                                        fontSize: 16,
                                        color: 'gray',
                                    }}>{aventura.altimetriaRecorrida} m</Text>
                                </View>}
                        </View>
                    </View>





                    {/* Descripcion */}
                    <Descripcion
                        descripcion={aventura.descripcion}
                    />

                    {/* Lugares recomendados */}
                    {
                        aventurasSugeridas.length !== 0 && <View>

                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 20,
                                marginTop: 30,
                                marginBottom: 20,
                            }}>Lugares similares</Text>

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
                        onPress={handleContinuar}
                        style={{ marginTop: 40, }}
                        titulo={"Reservar ahora"}
                    />
                </View>

            </Animated.ScrollView >
            <HeaderDetalleAventura
                scrollY={scrollY}
                height={height * 1.4}
                titulo={aventura.titulo}
                modalActive={modalVisible}
            />


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
                    titulo={"El nevado de colima"}
                />
            </Modal>


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
