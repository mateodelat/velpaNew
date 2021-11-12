import React from 'react'
import { ActivityIndicator, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Funcion para ver las imagenes en pantalla completa
const ImageFullScreen = ({ setModalVisible, images, titulo, initialImageIdx }) => {

    initialImageIdx !== undefined ? initialImageIdx : 0
    const { height } = Dimensions.get("screen")

    return (
        <View style={{
            height,
        }}>
            <ImageViewer
                index={initialImageIdx}
                renderHeader={() => {
                    return (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text style={styles.titulo}>{titulo}</Text>
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={styles.button}
                            >
                                <Entypo name="cross" size={24} color="white" />
                            </Pressable>
                        </View>
                    )
                }}
                loadingRender={() => <ActivityIndicator size="large" color={"white"} />}
                enableSwipeDown={true}
                onSwipeDown={() => setModalVisible(false)}
                imageUrls={images}

            />
        </View>

    )
}

export default ImageFullScreen

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
    },

    button: {
        marginLeft: 20,
        padding: 6,
        alignSelf: 'flex-start',

    },

})
