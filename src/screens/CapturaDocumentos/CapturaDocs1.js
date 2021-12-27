import React, { useEffect, useState } from 'react'

import {
    ScrollView,
    Pressable,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    Alert,
} from 'react-native'


import { moradoOscuro, moradoClaro, openImagePickerAsync, uploadImageToStripe } from '../../../assets/constants';
import Boton from '../../components/Boton';

import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Line from '../../components/Line';

import { AntDesign } from '@expo/vector-icons';
import ImageModal from './components/ImageModal';
import CameraModal from './components/CameraModal';
import Certificaciones from './components/Certificaciones';
import Auth from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';
import { Usuario } from '../../models';
import { vibrar, VibrationType } from '../../../assets/constants/constant';

const containerColor = "#fff"
const colorFondo = "#F4F6F6"



function Icono({ tipo }) {
    if (tipo === "Mas") {
        return <View style={{
            backgroundColor: moradoOscuro,
            overflow: "hidden",
            borderRadius: 100,
            padding: 2,
        }}>

            <Feather name="plus" size={20} color={"#fff"} />
        </View>
    }

    if (tipo === "Check") {
        return <View style={{}}>

            <Feather name="check" size={24} color="green" />
        </View>
    }


    else {
        return <View style={{}}>

            <Entypo name="circle-with-cross" size={24} color="red" />
        </View>

    }
}


export default ({ navigation }) => {
    // Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [datos, setDatos] = useState({
        ID: [null, null],
        selfie: "",
    });


    // Modal para mostrar la foto
    const [dataModal, setDataModal] = useState({
        titulo: "titulo",
        imagen: "imagen"
    });

    // Subiendo fotos a Stripe
    const [identificacionUploading, setIdentificacionUploading] = useState(null);

    // Variables de la certificacion
    const [certificacionEnabled, setCertificacionEnabled] = useState(false);
    const [certificaciones, setCertificaciones] = useState([]);//Fotos

    const [agencia, setAgencia] = useState(false);


    // Datos a prellenar en la siguiente pantalla
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState(null);
    const [nombreAgencia, setNombreAgencia] = useState("");

    const [sub, setSub] = useState("");

    // Subir imagenes a stripe si existen frente y atras
    useEffect(() => {
        uploadIdImagesStripe()
    }, [datos]);

    // Obtener datos del usuario
    useEffect(() => {
        fetchUser()
    }, []);

    async function fetchUser() {
        const sub = await Auth.currentAuthenticatedUser().then((r) => {
            setEmail(r.attributes.email)
            return r.attributes.sub
        })

        DataStore.query(Usuario, sub)
            .then(r => {
                setSub(r.id)
                setNombre(r.nombre)
                setApellido(r.apellido)

                setNombreAgencia(r.nickname)

            })
    }



    const uploadIdImagesStripe = async () => {
        // Si ya tenemos las fotos de adelante y atras y aun no tienen id
        if (!!datos.ID[0] && !!datos.ID[1] && !datos.ID[0]?.key) {
            setIdentificacionUploading(true)
            setDatos({
                ...datos,
                ID: await Promise.all(datos.ID.map(async image => {
                    // Subir la imagen al servidor de stripe
                    const key = await uploadImageToStripe(image.uri)
                    return {
                        uri: image.uri,
                        key
                    }
                })
                )
                    // Cuando acabe de subirse hacer el uploading false
                    .then(r => {
                        setIdentificacionUploading(false)
                        return r
                    })
            })
        }


    }

    const handleID = () => {
        setTipoModal("ID")
        setModalVisible(true)
    }

    const handleSelfie = () => {
        setModalVisible(true)
        setTipoModal("selfie")
    }

    const handleContinuar = () => {
        const datosAEnviar = {
            agencia,
            certificaciones: certificacionEnabled ? certificaciones.map(e => ({ uri: e.uri })) : null,
            IDFrente: datos.ID[0],
            IDAtras: datos.ID[1],
            selfie: { uri: datos.selfie },

            email,
            nombreAgencia,
            nombre,
            apellido,

            sub
        }



        if (identificacionUploading) {
            Alert.alert("Espera", "Se estan subiendo las imagenes")
        } else {
            // Realizar verificaciones
            if (!datos.selfie) {
                Alert.alert("Error", "Captura una foto de tu rostro")
                return
            }

            if (!datos.ID[0]?.key && !datos.ID[0]?.key) {
                Alert.alert("Error", "Captura tu identificacion al frente y al reverso")
                return
            }

            navigation.navigate("CapturaDocumentos2", datosAEnviar)
        }
    }


    // Funcion para abrir un documento
    function abrirDetalleImagen(imagen, titulo) {
        if (!imagen) return
        setDataModal({
            titulo,
            imagen
        })
        setTipoModal("displayFoto")
        setModalVisible(true)
    }

    function abrirImagenCert(item, index) {
        setDataModal({
            imagen: item,
            titulo: "Imagen " + (index + 1)
        })
        setTipoModal("displayFoto")
        setModalVisible(true)
    }

    function eliminarCert(index) {
        let newArray = [...certificaciones]
        newArray.splice(index, 1)
        setCertificaciones(newArray)
    }

    const handleAgregarCert = async () => {
        const image = await openImagePickerAsync()
        if (image) {
            setCertificaciones([...certificaciones, image])

        }
    }



    //////////////////////////////////////////////////////////////////////////
    /////////////////////////////////Render///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    return (
        <View style={{ flex: 1, backgroundColor: colorFondo, }}>

            {/* Opcion de agencia */}
            <View style={styles.agencia}>
                <Pressable
                    onPress={() => {
                        vibrar("medium")
                        setAgencia(true)
                    }}
                    style={{
                        ...styles.agenciaPressable,
                        backgroundColor: agencia ? moradoOscuro : null,
                    }}>
                    <Text style={{
                        ...styles.agenciaTxt,
                        color: agencia ? "white" : "black",
                    }}>Agencia</Text>

                </Pressable>
                <Pressable
                    onPress={() => {
                        vibrar("medium")
                        setAgencia(false)
                    }}
                    style={{
                        ...styles.agenciaPressable,
                        backgroundColor: agencia === false ? moradoOscuro : null,
                    }}>
                    <Text style={{
                        ...styles.agenciaTxt,
                        color: agencia === false ? "white" : "black",
                    }}>Guia individual</Text>

                </Pressable>
            </View>


            {/* Cuerpo */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}>

                {/* Texto de introduccion que depende si es agencia o usuario */}
                {agencia ? <View style={styles.headerTxt}>
                    <Text style={{ fontSize: 15, }}>
                        Por seguridad necesitamos
                        <Text style={styles.txtResaltado}> foto de tu rostro</Text> y los datos del<Text style={styles.txtResaltado}> representante legal </Text>
                        de la agencia para verificar tu identidad
                    </Text>
                    <Text style={styles.noComparte}>
                        *Velpa no comparte estos datos con terceros*
                    </Text>
                </View> :
                    <View style={styles.headerTxt}>
                        <Text style={{ fontSize: 15, }}>
                            Por seguridad necesitamos
                            <Text style={styles.txtResaltado}> foto de tu rostro </Text>
                            y de tu
                            <Text style={styles.txtResaltado}> identificacion oficial </Text> para verificar tu identidad
                        </Text>
                        <Text style={styles.noComparte}>
                            *Velpa no comparte estos datos con terceros*
                        </Text>
                    </View>
                }


                <Pressable
                    onPress={handleSelfie}
                    style={styles.selfieContainer}>
                    {!datos.selfie ?
                        <Feather name="camera" size={24} color="black" /> :
                        <Image

                            style={{ height: 80, width: 80, borderRadius: 40, }}
                            source={{ uri: datos.selfie }}
                        />
                    }
                    <View style={{ position: 'absolute', right: 0, bottom: 0, }}>
                        {
                            !datos.selfie ?
                                <Icono tipo={"Mas"} /> :
                                <View style={{ backgroundColor: '#fff', borderRadius: 40, padding: 2, }}>
                                    <Icono tipo={"Check"} />

                                </View>

                        }
                    </View>
                </Pressable>


                {/* Foto identificacion */}
                <Text style={styles.captionTxt}>Identificacion oficial</Text>
                <Pressable
                    onPress={handleID}
                    style={styles.addImageContainer}>
                    <View style={{ flexDirection: 'row', }}>
                        <AntDesign name="idcard" size={24} color="black" />
                    </View>

                    <View style={styles.textContainer}>
                        <Text>Debes capturar el

                            <Text
                                onPress={() => abrirDetalleImagen(datos.ID[0]?.uri, "Identificacion frente")}
                                style={{ fontWeight: 'bold', color: !!datos.ID[0] ? "blue" : '#000', }}> frente </Text>

                            y el

                            <Text
                                onPress={() => abrirDetalleImagen(datos.ID[0]?.uri, "Identificacion reverso")}
                                style={{ fontWeight: 'bold', color: !!datos.ID[1] ? "blue" : '#000', }}> reverso </Text>

                            , asegurate que este vigente y toda la informacion sea legible
                        </Text>

                    </View>

                    <View style={styles.masContainer}>
                        {/* Si no existen se pone el mas */}
                        {

                            identificacionUploading ?
                                <ActivityIndicator style={{ padding: 2, }} color={"black"} />
                                :

                                !datos.ID[0] && !datos.ID[1] ?
                                    <Icono tipo={"Mas"} /> :

                                    // Si ya existen los dos un check
                                    !!datos.ID[0] && !!datos.ID[1] ?
                                        <Icono tipo={"Check"} /> :

                                        // Si existe solo uno una cruz
                                        <Icono tipo={"Cross"} />
                        }


                    </View>
                </Pressable>

                <Line style={{
                    marginBottom: 40,
                }} />




                <Certificaciones
                    handleAgregarCert={handleAgregarCert}
                    certificaciones={certificaciones}

                    eliminarCert={eliminarCert}
                    abrirImagenCert={abrirImagenCert}

                    certificacionEnabled={certificacionEnabled}
                    setCertificacionEnabled={setCertificacionEnabled}
                />


            </ScrollView>

            <View style={{
                padding: 20,
            }}>
                <Boton
                    titulo={"Continuar"}
                    onPress={handleContinuar} />
            </View>
            {
                tipoModal === "displayFoto" ? <ImageModal
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    imagen={dataModal.imagen}
                    titulo={dataModal.titulo}
                /> : <CameraModal
                    fotos={datos}
                    setFotos={setDatos}
                    tipo={tipoModal}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                />
            }
        </View >
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorFondo,
        padding: 20,
    },


    agencia: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 10,
        width: '70%',
        backgroundColor: containerColor,

    },

    agenciaPressable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,

    },

    innerContainer: {
        marginBottom: 20,

    },

    captionTxt: {
        marginBottom: 5,

    },

    textInput: {
        padding: 10,
        backgroundColor: containerColor,
        borderRadius: 7,
        alignItems: 'center',
        flexDirection: 'row',
    },

    agenciaTxt: {
        fontSize: 15,
    },

    cancelInput: {
        position: 'absolute',
        right: 10,
    },

    diaContainer: {
        flex: 1,
        textAlign: 'center',
        color: '#000',

    },

    lineVertical: {
        height: '100%',
        borderRightWidth: 1,
        borderColor: "#000",
    },

    headerTxt: {
        marginHorizontal: 15,
    },

    txtResaltado: {
        fontWeight: 'bold',
        color: moradoClaro,

    },

    noComparte: {
        color: '#00000099',
        marginTop: 10
    },

    selfieContainer: {
        marginVertical: 40,
        backgroundColor: containerColor,

        alignItems: 'center',
        justifyContent: 'center',

        height: 80,
        width: 80,
        alignSelf: 'center',
        borderRadius: 40,
    },

    addImageContainer: {
        borderRadius: 7,
        marginBottom: 20,
        backgroundColor: containerColor,
        padding: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    textContainer: {
        flex: 1,
        marginLeft: 15,
    },

})
