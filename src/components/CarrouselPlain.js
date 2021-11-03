import { Video } from 'expo-av';
import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    FlatList,
    Pressable,
    ActivityIndicator
} from 'react-native';
import dificultad from '../../assets/dificultad';

import { Entypo } from '@expo/vector-icons';


export default CarrouselPlain = ({
    width,
    data,
    onPress,
    titulo,
    height,
    dif,
    errorImagenes,
    setErrorImagenes,
    indexAventura
}) => {
    return (
        <View style={{ ...styles.container, height }} >
            <FlatList
                data={data}
                horizontal
                scrollEventThrottle={32}
                pagingEnabled
                keyExtractor={i => i}
                showsHorizontalScrollIndicator={true}
                renderItem={({ item, index }) => {

                    // Si vamos en el primer elemento se renderiza el texto sobre la imagen
                    if (index === 0) {
                        return (
                            <View style={{ ...styles.imgContainer, height }}
                            >

                                <Pressable
                                    onPress={onPress}
                                >
                                    {
                                        errorImagenes[indexAventura][index] ?
                                            <Image
                                                source={require("../../assets/IMG/ImageExample.png")}
                                                style={{ ...styles.imgCarrousel, width }}
                                            />

                                            :
                                            <Image
                                                onError={({ nativeEvent: error }) => {
                                                    let newErrores = [...errorImagenes]
                                                    newErrores[indexAventura][index] = true
                                                    setErrorImagenes(newErrores)

                                                }}
                                                source={{ uri: item }}
                                                style={{ ...styles.imgCarrousel, width }}
                                            />
                                    }
                                    <View style={styles.txtContainer}>
                                        <Text style={styles.titulo}>{titulo}</Text>
                                        <Image source={dificultad[dif]} />
                                    </View>
                                </Pressable>
                            </View>

                        )
                    }

                    else {
                        return (
                            <Pressable
                                style={{ ...styles.imgContainer, width, flex: 1, justifyContent: 'center', }}
                                onPress={onPress}
                            >
                                {
                                    errorImagenes[indexAventura][index] ?
                                        <Entypo
                                            name="image"
                                            size={100}
                                            color="black"
                                        />
                                        :

                                        <Image
                                            onError={({ nativeEvent: error }) => {
                                                let newErrores = [...errorImagenes]
                                                newErrores[indexAventura][index] = true
                                                setErrorImagenes(newErrores)

                                            }}
                                            source={{ uri: item }}
                                            style={{ ...styles.imgCarrousel, width }}
                                        />
                                }
                            </Pressable>

                        )
                    }
                }

                }
            />
        </ View>
    );
}

const styles = StyleSheet.create({
    //contenedor general
    container: {
        alignItems: 'center',
        borderRadius: 10,
    },

    //Estilos de la imagen
    imgContainer: {
        overflow: 'hidden',
        borderRadius: 16,
        alignItems: 'center',
    },

    imgCarrousel: {
        width: '100%',
        height: '100%',
        resizeMode: "cover",
    },

    icon: {
        flex: 1,

    },

    // Estilos del texto
    titulo: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    txtContainer: {
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '75%',
        marginTop: 20 * 2,
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 50,

    }


});