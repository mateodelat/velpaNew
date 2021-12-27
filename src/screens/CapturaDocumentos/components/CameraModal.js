import { Camera } from 'expo-camera';


import React, { useEffect, useRef, useState } from 'react'

import {
    Alert,
    Dimensions,
    Image,
    Linking,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native'

import { Entypo } from '@expo/vector-icons';


import ModalInfo from "../ModalInfo"
import * as ImageManipulator from 'expo-image-manipulator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraType } from 'expo-camera/build/Camera.types';

let { width, height } = Dimensions.get('window');



export default ({ modalVisible, setModalVisible, tipo, fotos, setFotos }) => {
    const [condicionesInfo, setCondicionesInfo] = useState(["Debe ser a color", "Con fondo claro y buena iluminacion", "Todos los datos deben ser legibles", "No puede ser fotografia de la copia"]);
    const [imagenEjemplo, setImagenEjemplo] = useState(require("../../../../assets/IMG/INE-Frente.png"));
    const [mensajeDetalleCamara, setMensajeDetalleCamara] = useState("");
    const [mensajeTituloCamara, setMensajeTituloCamara] = useState("");

    const [tipoLocal, setTipoLocal] = useState(tipo);

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const [loaded, setLoaded] = useState(false);



    const [modalInfoVisible, setModalInfoVisible] = useState(false);

    const camaraRef = useRef()


    async function handlePicture() {
        let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
        let fotosLocal = { ...fotos }
        if (loaded) {
            image = await camaraRef.current.takePictureAsync()
            const manipResult = await ImageManipulator.manipulateAsync(
                image.uri,
                [
                    {
                        resize: {
                            width: 800
                        }
                    }
                ],
                { compress: 0.7, }
            );

            image = manipResult.uri
        } else {
            const manipResult = await ImageManipulator.manipulateAsync(
                image,
                [{
                    resize: {
                        width: 1000
                    }
                }],
                { compress: 1, }
            );
            image = manipResult.uri
        }
        switch (tipoLocal) {
            case "selfie":
                fotosLocal.selfie = image
                setFotos(
                    fotosLocal
                )
                setModalVisible(false)
                break;

            case "ID":
                fotosLocal.ID[0] = {
                    uri: image
                }
                setFotos(
                    fotosLocal
                )
                setCondicionesInfo(["Identificacion reverso", "Debe ser a color", "Con fondo claro y buena iluminacion", "Todos los datos deben ser legibles", "No puede ser fotografia de la copia"])
                setMensajeTituloCamara("Identificacion oficial reverso")
                setImagenEjemplo(require("../../../../assets/IMG/INE-Reverso.png"))
                setModalInfoVisible(true)

                setTipoLocal("IDReverso")

                break;

            case "IDReverso":
                fotosLocal.ID[1] = {
                    uri: image
                }
                setFotos(
                    fotosLocal
                )
                setModalVisible(false)
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        if (!modalVisible) return
        (async () => {
            if (modalVisible) {
                setTipoLocal(tipo)
                switch (tipo) {
                    case "selfie":
                        setMensajeDetalleCamara("Asegurate que tu rostro encaje en el marco, la foto es solo para verificar tu identidad")
                        setMensajeTituloCamara("")
                        setCondicionesInfo(["Debe ser a color", "Con fondo claro y buena iluminacion", "De frente, sólo tu rostro y parte del cuello debe aparecer", "Orejas descubiertas", "No puede ser foto de una fotocopia"])
                        setImagenEjemplo(require("../../../../assets/IMG/Selfie.png"))
                        break;

                    case "ID":
                        setMensajeTituloCamara("Identificacion frente")
                        setCondicionesInfo(["Debe ser a color", "Con fondo claro y buena iluminacion", "Todos los datos deben ser legibles", "No puede ser fotografia de la copia"])
                        setMensajeDetalleCamara("Asegurate que tu identificacion encaje en el marco")
                        setImagenEjemplo(require("../../../../assets/IMG/INE-Frente.png"))
                        break;

                    default:
                        break;
                }


                tipo === "selfie" ? setType(Camera.Constants.Type.front) : setType(Camera.Constants.Type.back)
                const { status } = await Camera.requestCameraPermissionsAsync();
                setHasPermission(status === 'granted');
                setModalInfoVisible(true)
            }
        })();
    }, [modalVisible]);


    if (hasPermission === null) {
        return <View />;
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



                <View style={{ flex: 1, }}>
                    <Camera
                        useCamera2Api={type === CameraType.front ? true : false}
                        autoFocus={Camera.Constants.AutoFocus.on}
                        onCameraReady={() => setLoaded(true)}
                        ref={camaraRef}
                        style={styles.camera}
                        type={type}
                    />
                    <View style={styles.elementosCamara}>
                        {tipoLocal === "selfie" ?
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <Image
                                    style={{
                                        flex: 1,
                                    }}
                                    resizeMode={"stretch"}
                                    source={require("../../../../assets/IMG/Silueta.png")}
                                />
                            </View>
                            :
                            <View
                                style={{

                                    position: 'absolute',
                                    top: -width / 2 + 200,
                                    left: -width / 2 + 20,
                                    right: -width / 2 + 20,
                                    bottom: -width / 2 + 200,

                                    borderWidth: width / 2,
                                    borderColor: 'black',
                                    opacity: 0.7,
                                }}
                            >
                                <View style={{
                                    flex: 1,
                                    borderWidth: 1,
                                    borderColor: "#fff",
                                }}>

                                </View>
                            </View>
                        }

                        <View style={{
                            width,
                            height,
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            padding: 20,
                        }}>
                            <Text style={{

                                fontSize: 15,
                                bottom: 120,
                                color: '#fff',
                            }}>{mensajeDetalleCamara}</Text>

                        </View>

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
                                }}>{mensajeTituloCamara}</Text>

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

                                <Entypo
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                    }}
                                    name="info-with-circle"
                                    size={45}
                                    color="#ffffffc9"
                                    onPress={() => setModalInfoVisible(true)}
                                />
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
            </View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={false}
                onRequestClose={() => {
                    setModalInfoVisible(false);
                }}

            >
                <ModalInfo condiciones={condicionesInfo} image={imagenEjemplo} setModalVisible={setModalInfoVisible} />
            </Modal>
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
