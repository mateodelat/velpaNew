import React from 'react'
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'


import { FontAwesome5 } from '@expo/vector-icons';
import { moradoOscuro } from '../../../../assets/constants';
import { TipoPublicidad } from '../../../models';


const { height, width } = Dimensions.get("window")


export default ({
    onPress,
    item,
    style
}) => {
    const {
        imagenFondo,
        video,
        titulo,
        descripcion,
        tipo
    } = item

    return (
        <View
            style={[styles.container, style]}
        >

            <Image
                source={{ uri: imagenFondo.uri }}
                style={styles.imagenFondo} />

            {/* Filtro negro */}
            <View style={styles.filtro} />
            <View style={{ flexDirection: 'row', padding: 15, }}>

                <View style={{
                    flex: 2,
                    justifyContent: 'center',
                }}>
                    <Text style={styles.titulo}>{titulo}</Text>

                    <Text
                        numberOfLines={2}
                        style={styles.descripcion}>{descripcion}</Text>

                    {/* Boton para ir a la aventura */}
                    <Pressable
                        onPress={onPress}
                        style={styles.boton}
                    >
                        <Text style={{
                            color: '#fff',
                            fontSize: 16,
                        }}>{tipo === TipoPublicidad.ANUNCIO ? "Ver" : "Ir ahora"}</Text>
                    </Pressable>

                </View>
                {video?.uri && <Pressable
                    onPress={() => Alert.alert("Reproducir video en pantalla completa")}
                    style={{
                        flex: 1,
                        alignItems: 'center', justifyContent: 'center',
                    }}>
                    <Image
                        style={{
                            width: 90,
                            height: 90,
                            borderRadius: 7,
                        }}
                        source={{ uri: video?.uri }}
                    />
                    <FontAwesome5 style={{
                        position: 'absolute',
                        opacity: 0.55
                    }} name="play" size={20} color="white" />

                </Pressable>}
            </View>
        </View>)
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.25,
        width: width - 40,
        overflow: 'hidden',
        borderRadius: 10,
    },

    imagenFondo: {
        position: 'absolute',
        resizeMode: 'cover',
        height: height * 0.25,
        width: width - 40,
    },


    titulo: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },

    descripcion: {
        fontSize: 16,
        color: '#fff',
    },

    boton: {
        backgroundColor: moradoOscuro,
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        width: '50%',
        marginTop: 7,
    },

    filtro: {
        backgroundColor: '#00000033',
        width: '100%',
        height: '100%',
        position: 'absolute',
    }
})
