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
    Linking
} from 'react-native'

import dificultad from '../../../assets/dificultad';
import ImageFullScreen from '../../components/ImageFullScreen';

import Carrousel from './components/Carrousel';

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



import Descripcion from './components/Descripcion';
import CuadradoImagen from '../../components/CuadradoImagen';
import Boton from '../../components/Boton';
import { moradoOscuro } from '../../../assets/constants';
import HeaderDetalleAventura from '../../navigation/components/HeaderDetalleAventura';



export default ({ navigation }) => {
    //HACER DISTANCIA Y ALTITUD DEPENDIENTE DE SI EXISTE EN LA DB PARA TENER
    //DISTINTAS CATEGORIAS

    const linkNevado = "https://www.google.com.mx/maps/place/Nevado+de+Colima/"



    const scrollX = useRef(new Animated.Value(0)).current
    const scrollY = useRef(new Animated.Value(0)).current


    let { width, height } = Dimensions.get("screen")
    height = height * 0.35


    // Variables del visor imagenes
    const [modalVisible, setModalVisible] = useState(false);
    const [images, setImages] = useState([
        { url: "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=cagatay-orhan-PYh4QCX_fmE-unsplash.jpg" },
        { url: "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=cagatay-orhan-PYh4QCX_fmE-unsplash.jpg" }
    ]);
    const [initialImageIdx, setInitialImageIdx] = useState(0);

    function handleContinuar() {
        navigation.navigate("FechasAventura")
    }


    function verEnGoogleMaps() {
        Linking.openURL(linkNevado)
    }

    function handleNavegarSugerido() {
        navigation.pop()
        navigation.navigate("DetalleAventura")
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

                    setModalVisible={setModalVisible}
                    setInitialImageIdx={setInitialImageIdx}

                    height={height}
                    width={width}

                    images={[
                        { uri: "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=cagatay-orhan-PYh4QCX_fmE-unsplash.jpg" },
                        { uri: "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=cagatay-orhan-PYh4QCX_fmE-unsplash.jpg" },
                        { uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4", video: true },
                    ]}
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

                            }}>Nevado de Colima{"\n"}(4700m)</Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginLeft: 15,
                        }}>$ 1800-35000
                        </Text>
                    </View>

                    {/* Dificultad */}
                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{
                                fontSize: 16,
                            }}>Dificultad   </Text>
                            <Image source={dificultad[3]} />
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
                                }}>1 a 2 dias</Text>
                            </View>

                            {/* Distancia */}
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <View style={{ width: 35, }}>
                                    <MaterialCommunityIcons name="map-marker-distance" size={25} color="gray" />
                                </View>
                                <Text style={{
                                    fontSize: 16,
                                    color: 'gray',
                                }}>5 KM</Text>
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
                                }}>Mexico</Text>
                            </Pressable>

                            {/* Distancia */}
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <View style={{ width: 35, height: 27, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image source={require("../../../assets/icons/elevation.png")} style={{ height: 28, width: 25, }} />
                                </View>
                                <Text style={{
                                    marginLeft: 5,
                                    fontSize: 16,
                                    color: 'gray',
                                }}>850m</Text>
                            </View>
                        </View>
                    </View>





                    {/* Descripcion */}
                    <Descripcion
                        aventura={{
                            descripcion: "El nevado de colima es un cerro muy grande con mucha vegetacion y vasta variedad ecologica. Es uno de los picos mas grandes de Mexico y es el inicio perfecto para princpiantes que se quieren adentrar en el mundo del hikking. Aqui vas a poder contemplar en un dia despejado unas vistas increibles hacia el volcan de colima asi como tambien de todos los cerros aldeaños y en epocas frias un revestimiento de nieve.",
                        }}
                    />

                    {/* Lugares recomendados */}
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginTop: 30,
                        marginBottom: 20,
                    }}>Lugares similares</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >


                        <CuadradoImagen
                            onPress={handleNavegarSugerido}
                            tamañoCuadrado={180}
                            titulo={"Iztacihuatl"}
                            style={{
                                marginRight: 20,
                            }}
                        />
                        <CuadradoImagen
                            onPress={handleNavegarSugerido}
                            titulo={"Nevado de toluca"}
                            tamañoCuadrado={180}
                            style={{
                                marginRight: 20,
                            }}
                        />
                        <CuadradoImagen
                            onPress={handleNavegarSugerido}
                            titulo={"Kilimanjaro"}
                            tamañoCuadrado={180}
                        />

                    </ScrollView>

                    <Boton
                        onPress={handleContinuar}
                        style={{ marginTop: 40, }}
                        titulo={"Reservar ahora"}
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
                        titulo={"El nevado de colima"}
                    />
                </Modal>

            </Animated.ScrollView>
            <HeaderDetalleAventura
                scrollY={scrollY}
                height={height * 1.4}
                titulo={"Nevado de Colima"}
            />


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
    }
})
