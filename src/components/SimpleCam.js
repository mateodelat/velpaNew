import { Camera } from 'expo-camera';


import React, { useEffect, useRef, useState } from 'react'

import {
    Alert,
    Dimensions,
    Linking,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native'

import { Entypo } from '@expo/vector-icons';


import * as ImageManipulator from 'expo-image-manipulator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraType } from 'expo-camera/build/Camera.types';

let { width, height } = Dimensions.get('window');



export default ({ modalVisible, setModalVisible, done, titulo }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const [loaded, setLoaded] = useState(false);

    const camaraRef = useRef()



    async function handlePicture() {
        let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
        if (loaded) {
            image = await camaraRef.current.takePictureAsync()
            // const manipResult = await ImageManipulator.manipulateAsync(
            //     image.uri,
            //     [
            //         {
            //             resize: {
            //                 width: 800
            //             }
            //         }
            //     ],
            //     { compress: 0.9, }
            // );

            // image = manipResult.uri
        } else {
            // const manipResult = await ImageManipulator.manipulateAsync(
            //     image,
            //     [{
            //         resize: {
            //             width: 1000
            //         }
            //     }],
            //     { compress: 1, }
            // );
            // image = manipResult.uri
        }

        console.log(image)

    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted')
        })()

    }, []);


    if (hasPermission === null) {
        return <View >
            <Text>No hay permiso para tomar la foto</Text>

        </View>
    }


    if (modalVisible && !hasPermission) {
        Alert.alert("Es necesario el permiso para acceder a la camara del dispositivo", "", [
            {
                text: "Cancelar", onPress: () => {
                    setModalVisible(false)
                }
            },
            {
                text: "Configuracion", onPress: () => {
                    Linking.openSettings()
                    setModalVisible(false)
                }
            }
        ], { cancelable: true })
        return <View />
    }

    const insets = useSafeAreaInsets()

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}
        >
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
            }}>
                <Camera
                    useCamera2Api={type === CameraType.front ? true : false}
                    autoFocus={Camera.Constants.AutoFocus.on}
                    onCameraReady={() => setLoaded(true)}
                    ref={camaraRef}
                    style={styles.camera}
                    type={type}
                />
                <View style={styles.elementosCamara}>

                    <View style={{
                        ...styles.barraSuperior,
                        paddingTop: insets.top ? insets.top : 10,
                        height: insets.top ? insets.top + 50 : 80,

                    }}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}>
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={styles.botones}
                            >
                                <Entypo name="cross" size={24} color="black" />
                            </Pressable>

                            <Text style={{
                                color: '#fff',
                                fontSize: 16,
                            }}>{titulo ? titulo : ""}</Text>

                        </View>

                    </View>

                    <View style={{
                        ...styles.barraInferior,
                        paddingBottom: insets.bottom,
                    }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                        }}>

                            <Pressable
                                onPress={handlePicture}
                                style={styles.tomarFoto}
                            >
                                <View style={{
                                    flex: 1,
                                    backgroundColor: '#fff',
                                    borderRadius: 60,
                                }}>

                                </View>
                            </Pressable>
                        </View>


                    </View>


                </View>
            </View>

        </Modal >
    )
}


const styles = StyleSheet.create({
    camera: {
        height: '100%',
        width: '100%',
    },


    elementosCamara: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },

    barraSuperior: {
        flexDirection: 'row',
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        padding: 10,
        paddingLeft: 15,
        alignItems: 'flex-start',
    },


    barraInferior: {
        backgroundColor: '#000',
        justifyContent: 'center',
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 10,
    },


    botones: {
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 45,
        position: 'absolute',

        left: 0,
    },

    tomarFoto: {
        padding: 2,
        width: 75,
        height: 75,
        borderRadius: 60,
        backgroundColor: '#000',
        borderWidth: 7,
        borderColor: "#fff",
    },



    modalInfo: {
        flex: 1,
        backgroundColor: '#fff',
    },

    closeInfoModal: {
        padding: 15,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },

    imageInfoContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: "#fafafa",
        borderRadius: 6,
    },

    textInfoContainer: {
        marginTop: 30,
        paddingHorizontal: 40,
        flex: 1,
    }
})
