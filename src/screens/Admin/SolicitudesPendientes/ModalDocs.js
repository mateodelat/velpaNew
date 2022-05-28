import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { Loading } from '../../../components/Loading';

import ImageViewer from 'react-native-image-zoom-viewer';
import { obtenerUriImagenesGuia } from '../../../../assets/constants';



// Funcion para ver las imagenes en pantalla completa
export default ({ setModalVisible, data }) => {
    const [images, setImages] = useState([{
    }]);
    const [loading, setLoading] = useState(true);

    // Obtener los links de las imagenes
    useEffect(() => {

        fetch()
    }, []);

    const fetch = async () => {
        const fotos = await obtenerUriImagenesGuia(data)
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error cargando las fotos", [{
                    text: "OK",
                    onPress: () => setModalVisible(false)
                }])
            })

        setImages(fotos)
        setLoading(false)
    }

    return (
        <View style={{ flex: 1, }}>
            {loading ? <Loading /> :

                <ImageViewer
                    renderHeader={(e) => {
                        const titulo = images[e]?.titulo
                        return (
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Text style={styles.texto}>{titulo}</Text>
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
            }

        </View>
    )
}

const styles = StyleSheet.create({

    button: {
        marginLeft: 20,
        padding: 6,
        alignSelf: 'flex-start',

    },

    texto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
    }
})
