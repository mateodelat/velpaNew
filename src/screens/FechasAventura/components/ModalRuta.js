import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Image, Pressable } from 'react-native'


import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { colorFondo, moradoClaro, moradoOscuro, openImagePickerAsync } from '../../../../assets/constants';
import ImageViewer from 'react-native-image-zoom-viewer'





export default ({
    setModalVisible,
    modify,
    img,
    setImg
}) => {

    const [imagenRuta, setImagenRuta] = useState(img);
    // "https://cdn-assets.alltrails.com/es/static-map/production/at-map/19133508/trail-mexico-jalisco-nevado-de-colima-at-map-19133508-1590530248-414x200-2.png"

    const handleAddImg = async () => {
        openImagePickerAsync(true).then(r => {
            if (r) {
                setImagenRuta(r.uri)
            }
        }).catch(e => {
            console.log(e)
            Alert.alert("Error", "Error selecionando imagen")
        })
    }

    const handleGuardarImagen = () => {
        setImg(imagenRuta)
        setModalVisible(false)
        Alert.alert("Exito", "Imagen de ruta guardada con exito!!")
    }

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={{
                    flex: 1,
                    fontSize: 20,
                    textAlign: 'center',
                    color: moradoClaro,
                }}>RUTA</Text>

                <Entypo
                    onPress={() => setModalVisible(false)}
                    name={"cross"}
                    size={35}
                    color={moradoClaro}
                    style={{ position: 'absolute', left: 20, }}
                />
                {modify && <MaterialIcons
                    onPress={handleGuardarImagen}
                    name={"check"}
                    size={35}
                    color={moradoClaro}
                    style={{ position: 'absolute', right: 20, }}
                />}
            </View>
            {
                // Si estamos en modificar imagen se detecta si ya se escogio una
                modify && !imagenRuta ? <Pressable
                    onPress={handleAddImg}
                    style={styles.body}>
                    <MaterialIcons name="add-a-photo" size={40} color="black" />
                    <Text style={styles.agregarTxt}>Agregar imagen de ruta</Text>
                </Pressable>
                    : !!imagenRuta && modify ? <Pressable
                        onPress={handleAddImg}
                        style={styles.body}>
                        <Image
                            source={{ uri: imagenRuta }}
                            style={styles.imagen} />
                    </Pressable>
                        :
                        <ImageViewer
                            onSwipeDown={() => setModalVisible(false)}
                            renderIndicator={() => null}
                            enableSwipeDown={true}
                            backgroundColor={"#fff"}
                            imageUrls={[{ url: imagenRuta }]}

                        />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // padding: 20,
    },

    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colorFondo,
    },


    body: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', justifyContent: 'center',
    },

    agregarTxt: {
        fontSize: 16,
        color: "#000",
        marginTop: 10,
    },

    imagen: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})
