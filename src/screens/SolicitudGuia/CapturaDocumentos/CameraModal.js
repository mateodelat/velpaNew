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


import ModalInfo from "./ModalInfo"
import * as ImageManipulator from 'expo-image-manipulator';

let { width, height } = Dimensions.get('window');



const CameraModal = ({ modalVisible, setModalVisible, tipo, fotos, setFotos }) => {
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
        let fotosLocal = fotos

        if (loaded) {
            image = await camaraRef.current.takePictureAsync()
            const pixRel = image.width / width
            const manipResult = await ImageManipulator.manipulateAsync(
                image.uri,
                [
                    {
                        crop: {
                            originX: 30 * pixRel,
                            originY: 90 * pixRel,
                            width: (width - 60) * pixRel,
                            height: (height - 180) * pixRel,
                        }
                    },
                    {
                        resize: {
                            width: 800
                        }
                    }
                ],
                { compress: 0.6, }
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

            // Alert.alert("La camara no ha cargado")
        }
        switch (tipoLocal) {
            case "selfie":
                fotosLocal.selfie = image
                setFotos(
                    fotosLocal
                )
                setModalVisible(false)
                break;

            case "INE":
                fotosLocal.INE[0] = image
                setFotos(
                    fotosLocal
                )
                setCondicionesInfo(["INE reverso", "Debe ser a color", "Con fondo claro y buena iluminacion", "Todos los datos deben ser legibles", "No puede ser fotografia de la copia"])
                setMensajeTituloCamara("INE/IFE reverso")
                setImagenEjemplo(require("../../../../assets/IMG/INE-Reverso.png"))
                setModalInfoVisible(true)

                setTipoLocal("INEReverso")

                break;

            case "licencia":
                fotosLocal.licencia[0] = image
                setFotos(
                    fotosLocal
                )
                setCondicionesInfo(["Licencia reverso", "Debe ser a color", "Con fondo claro y buena iluminacion", "Todos los datos deben ser legibles", "No puede ser fotografia de la copia"])
                setMensajeTituloCamara("Licencia atras")
                setImagenEjemplo(require("../../../../assets/IMG/Licencia-Reverso.png"))
                setModalInfoVisible(true)

                setTipoLocal("licenciaReverso")

                break;

            case "tarjeta":
                fotosLocal.tarjeta = image
                setFotos(
                    fotosLocal
                )
                setModalVisible(false)
                break;

            case "licenciaReverso":
                fotosLocal.licencia[1] = image
                setFotos(
                    fotosLocal
                )
                setModalVisible(false)
                break;

            case "INEReverso":
                fotosLocal.INE[1] = image
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

                    case "INE":
                        setMensajeTituloCamara("INE/IFE frente")
                        setCondicionesInfo(["Debe ser a color", "Con fondo claro y buena iluminacion", "Todos los datos deben ser legibles", "No puede ser fotografia de la copia"])
                        setMensajeDetalleCamara("Asegurate que tu INE/IFE encaje en el marco")
                        setImagenEjemplo(require("../../../../assets/IMG/INE-Frente.png"))
                        break;

                    case "licencia":
                        setMensajeDetalleCamara("Asegurate que tu licencia encaje en el marco")
                        setCondicionesInfo(["Debe ser a color", "Con fondo claro y buena iluminacion", "Todos los datos deben ser legibles", "No puede ser fotografia de la copia"])
                        setMensajeTituloCamara("Licencia frente")
                        setImagenEjemplo(require("../../../../assets/IMG/Licencia-Frente.png"))
                        break;

                    case "tarjeta":
                        setMensajeDetalleCamara("Asegurate que la tarjeta encaje en el marco")
                        setCondicionesInfo(["Debe ser a color", "Con fondo claro y buena iluminacion", "Todos los datos deben ser legibles", "No puede ser fotografia de la copia"])
                        setMensajeTituloCamara("Tarjeta de circulacion")
                        setImagenEjemplo(require("../../../../assets/IMG/tarjeta-circulacion.png"))
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


    return (
        <Modal
            statusBarTranslucent={true}
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
                                bottom: width / 5,
                                color: '#fff',
                            }}>{mensajeDetalleCamara}</Text>

                        </View>

                        <View style={styles.barraSuperior}>
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

                        <View style={styles.barraInferior}>
                            <Entypo
                                style={{
                                    position: 'absolute',
                                    left: 25,
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


                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalInfoVisible}
                            onRequestClose={() => {
                                setModalInfoVisible(false);
                            }}

                        >
                            <ModalInfo condiciones={condicionesInfo} image={imagenEjemplo} setModalVisible={setModalInfoVisible} />
                        </Modal>
                    </View>
                </View>
            </View>

        </Modal >
    )
}

export default CameraModal

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
        height: 80,
        padding: 10,
        paddingLeft: 15,
        alignItems: 'flex-start',
    },


    barraInferior: {
        backgroundColor: '#000',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20
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
        alignSelf: 'center',
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
