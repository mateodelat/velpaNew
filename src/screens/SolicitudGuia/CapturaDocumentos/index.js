import React, { useEffect, useRef, useState } from 'react'

import {
    ScrollView,
    Pressable,
    StyleSheet,
    Text,
    View,
    Switch,
    TextInput,
    Alert,
    Image,
    Linking,
} from 'react-native'

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';



import ImageModal from './ImageModal';
import CameraModal from './CameraModal';
import { API, Auth, Storage, } from 'aws-amplify';
import { colorFondo, getBlob, moradoClaro, moradoOscuro, openImagePickerAsync, updateUsuario } from '../../../../assets/constants';
import Boton from '../../../components/Boton';


import * as WebBrowser from 'expo-web-browser';
import * as ImageManipulator from 'expo-image-manipulator';
import { createStripeAcount } from '../../../graphql/mutations.js';


function Icono({ tipo }) {
    if (tipo === "Mas") {
        return <View style={{
            backgroundColor: '#fff',
            padding: 3,
            height: 27,
            width: 30,
            borderRadius: 100,
        }}>
            <View style={{
                backgroundColor: moradoOscuro,
                height: 24,
                width: 24,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Feather name="plus" size={20} color="#fff" />
            </View>
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

const containerColor = "#fff"
export default ({ navigation }) => {
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////Variables///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    const [certificacionEnabled, setCertificacionEnabled] = useState(false);
    const [certificaciones, setCertificaciones] = useState([]);//Fotos

    const [telefono, setTelefono] = useState(null);
    const [sitioWeb, setSitioWeb] = useState(null);
    const [redSocial, setRedSocial] = useState(null);
    const [comentarios, setComentarios] = useState("");

    const [loading, setLoading] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);

    const buttonRef = useRef()


    /////////////////////////Fotos locales/////////////////////////////
    const [datos, setDatos] = useState({
        licencia: ["", ""],
        INE: ["", ""],
        selfie: "",
        tarjeta: ""
    });

    // Modal para mostrar la foto
    const [dataModal, setDataModal] = useState({
        titulo: "titulo",
        imagen: "imagen"
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [linkStripe, setLinkStripe] = useState("");
    const [linkPressed, setLinkPressed] = useState(false);

    const [agencia, setAgencia] = useState(false);



    /////////////////////////Obtener link de Stripe/////////////////////////////
    useEffect(() => {
        // ObtenerLinkUsuarioStripe()
    }, []);


    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////Funciones///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    const handleConducir = () => {
        setTipoModal("licencia")
        setModalVisible(true)
    }
    const handleINE = () => {
        setTipoModal("INE")
        setModalVisible(true)
    }

    const handleSelfie = () => {
        setModalVisible(true)
        setTipoModal("selfie")
    }

    const handleTarjeta = () => {
        setModalVisible(true)
        setTipoModal("tarjeta")
    }

    const ObtenerLinkUsuarioStripe = () => {
        return Auth.currentUserInfo()
            .then(async r => {
                const { sub, email } = r.attributes

                return API.graphql({
                    query: createStripeAcount,
                    variables: { email, sub, url: "http://localhost:19000/" }
                }).then(r => {
                    const link = r.data.CreateStripeAcount.url
                    console.log(link)
                    setLinkStripe(link)
                    return link
                })
            })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error obteninendo el link de stripe, contacta al desarollador")
            })
    }

    const handleStripe = async () => {
        if (linkStripe.length === 0) {
            Alert.alert("Atencion", "El link aun no ha cargado")
            return
        }

        if (!linkPressed) {
            setLinkPressed(true)
            await WebBrowser.openBrowserAsync(linkStripe)
        } else {
            Alert.alert("Vuelve a cargar la pagina hubo un error")
        }
    }



    const handleCertificacion = () => {
        setCertificacionEnabled(!certificacionEnabled)
    }

    const handleAgregarCert = async () => {
        const image = await openImagePickerAsync()
        if (image) {
            setCertificaciones([...certificaciones, image])

        }
    }

    const handleContinuar = async () => {
        // Verificaciones
        navigation.navigate("SeleccionaAventura", { esSelector: true })
        return

        // Si no se presiono el link se devuelve error
        if (!linkPressed) {
            // ObtenerLinkUsuarioStripe()
            Alert.alert("Error", "No capturaste todos los datos, vuelve a intentarlo")
            return
        }
        if (agencia) {
            if (datos.selfie === "") {
                Alert.alert("Captura una foto de tu rostro")
                return
            }
            if (datos.INE[0] === "" || datos.INE[1] === "") {
                Alert.alert("Captura tu INE por delante y por atras")
                return
            }
            if (!sitioWeb && !redSocial) {
                Alert.alert("Introduce al menos una red de tu agencia")
                return
            }

            if (!telefono) {
                Alert.alert("Introduce el numero telefonico de la agencia")
                return
            }
            if (telefono.length !== 10 || Number(telefono).isInteger) {
                Alert.alert("El numero de telefono es incorrecto")
                return
            }

            setLoading(true)
            // Pedir usuario
            let sub = ""
            let usr = await Auth.currentAuthenticatedUser().then(e => {
                sub = e.attributes.sub
                return e
            })

            // Subir las imagenes al bucket S3
            // Selfie
            const selfieBlob = await getBlob(datos.selfie)

            // INEFrente
            const INEFrenteBlob = await getBlob(datos.INE[0])

            // INEReverso
            const INEReversoBlob = await getBlob(datos.INE[1])


            // Promesas de subida
            let Promises = []
            Promises.push(Storage.put("usr-" + sub + "Selfie" + ".jpg", selfieBlob))
            Promises.push(Storage.put("usr-" + sub + "INEFrente" + ".jpg", INEFrenteBlob))
            Promises.push(Storage.put("usr-" + sub + "INEReverso" + ".jpg", INEReversoBlob))

            Promise.all(Promises)
                .then(r => {
                    const selfie = r[0].key
                    const INEFrente = r[1].key
                    const INEReverso = r[2].key


                    // Datos actualizados en database
                    API.graphql({
                        query: updateUsuario, variables: {
                            input: {
                                id: sub,
                                tipo: "agencia",
                                sitioWeb,
                                redSocial,
                                selfie: selfie,
                                INE: [INEFrente, INEReverso],
                                telefono,
                                comentariosAdicionales: comentarios,

                                capacidadMaxima: 0,
                            }
                        }
                    })
                        .catch(e => {
                            console.log(e)
                            Alert.alert("Error subiendo los datos")
                            return
                        })
                    setLoading(false)
                    setDoneLoading(true)
                })
                .then(r => {
                    Alert.alert("Exito", "Los datos se han subido con exito", [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.popToTop()
                                navigation.navigate("SolicitudGuia", {
                                    screen:
                                        "SeleccionaAventura"
                                })
                            }
                        }
                    ])
                })
                .catch(e => {
                    console.log(e)
                    Alert.alert("Error subiendo los datos")
                    return
                })



        }
        else {
            const i = new Date
            // Verificaciones
            if (datos.selfie === "") {
                Alert.alert("Captura una foto de tu rostro")
                return
            }
            if (datos.licencia[0] === "" || datos.licencia[1] === "") {
                Alert.alert("Captura tu INE por delante y por atras")
                return
            }
            if (datos.tarjeta === "") {
                Alert.alert("Captura la tarjeta de circulacion de tu carro")
                return

            }

            if (!telefono) {
                Alert.alert("Introduce tu numero telefonico")
                return
            }
            if (telefono.length !== 10 || Number(telefono).isInteger) {
                Alert.alert("El numero de telefono es incorrecto")
                return
            }

            setLoading(true)
            // Pedir usuario
            let sub = ""
            let usr = await Auth.currentAuthenticatedUser().then(e => {
                sub = e.attributes.sub
                return e
            }).catch(e => console.log(e))


            // Obtener blobs de imagen
            // Selfie
            const selfieBlob = await getBlob(datos.selfie)

            // licenciaFrente
            const licenciaFrenteBlob = await getBlob(datos.licencia[0])

            // licenciaReverso
            const licenciaReversoBlob = await getBlob(datos.licencia[1])

            // Tarjeta circulacion
            const tarjetaCirculacionBlob = await getBlob(datos.tarjeta)


            // Promesas de subida
            let Promises = []

            ///////////////Si se agregaron certificaciones//////////////////
            if (certificacionEnabled && certificaciones.length !== 0) {
                Promises = certificaciones.map(async (c, idx) => {
                    const manipResult = await ImageManipulator.manipulateAsync(
                        c, [{ resize: { width: 800 } }], { compress: 0.6, }
                    )

                    const certBlob = await getBlob(manipResult.uri)

                    return await Storage.put("usr-" + sub + "cert" + (idx + 1) + + ".jpg", certBlob)
                })
            }

            let selfie
            let licenciaFrente
            let licenciaReverso
            let tarjetaCirculacion
            let cert = []
            if (certificacionEnabled && certificaciones.length !== 0) {
                certificaciones.map((c, idx) => {
                    cert.push("usr-" + sub + "cert" + (idx + 1) + ".jpg")
                })
            }
            selfie = "usr-" + sub + "Selfie" + ".jpg"
            licenciaFrente = "usr-" + sub + "licenciaFrente" + ".jpg"
            licenciaReverso = "usr-" + sub + "licenciaReverso" + ".jpg"
            tarjetaCirculacion = "usr-" + sub + "tarjetaCirc" + ".jpg"

            // Subir las imagenes al bucket S3
            Promises.push(Storage.put(selfie, selfieBlob))
            Promises.push(Storage.put(licenciaFrente, licenciaFrenteBlob))
            Promises.push(Storage.put(licenciaReverso, licenciaReversoBlob))
            Promises.push(Storage.put(tarjetaCirculacion, tarjetaCirculacionBlob))

            Promise.all(Promises)
                .then(r => {


                    // Actualizar datos en database
                    API.graphql({
                        query: updateUsuario, variables: {
                            input: {
                                id: sub,
                                tipo: "guiaIndividual",

                                selfie,
                                licencia: [licenciaFrente, licenciaReverso],
                                tarjetaCirculacion,
                                certificaciones: cert,
                                telefono,
                                comentariosAdicionales: comentarios,

                                capacidadMaxima: 0,
                            }
                        }
                    })
                        .then(r => {
                            const final = new Date
                        })
                        .catch(e => {
                            console.log(e)
                            Alert.alert("Error subiendo los datos")
                        })
                })
                .then(r => {
                    setLoading(false)
                    setDoneLoading(true)
                    Alert.alert("Exito", "Los datos se han subido con exito", [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.popToTop()
                                navigation.navigate("SolicitudGuia", {
                                    screen:
                                        "SeleccionaAventura"
                                })
                            }
                        }
                    ])
                })
                .catch(e => {
                    console.log(e)
                    Alert.alert("Error subiendo los datos")
                })
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
                        setAgencia(true)
                    }}
                    style={{
                        ...styles.agenciaTxt,
                        borderTopLeftRadius: 50,
                        borderBottomLeftRadius: 50,
                        borderColor: agencia ? moradoOscuro : "gray",
                        backgroundColor: agencia ? moradoOscuro + "10" : null,
                    }}>
                    <Text>Agencia</Text>

                </Pressable>
                <Pressable
                    onPress={() => {
                        setAgencia(false)
                    }}
                    style={{
                        ...styles.agenciaTxt,
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                        borderColor: agencia === false ? moradoOscuro : "gray",
                        backgroundColor: agencia === false ? moradoOscuro + "10" : null,
                    }}>
                    <Text>Guia individual</Text>

                </Pressable>
            </View>
            {agencia ? <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                {/* Texto de introduccion */}
                <View style={styles.header}>
                    <Text style={{ fontSize: 15, }}>
                        Por tu seguridad necesitamos
                        <Text style={styles.txtResaltado}> foto de tu rostro</Text>,
                        de tu<Text style={styles.txtResaltado}> identificacion oficial </Text>
                        y las<Text style={styles.txtResaltado}> redes sociales </Text>
                        de la agencia para verificar tu identidad
                    </Text>
                    <Text style={styles.noComparte}>
                        *Velpa no comparte estos datos con terceros
                    </Text>
                </View>



                {/* Selfie */}
                <Pressable
                    onPress={handleSelfie}
                    style={styles.selfieContainer}>
                    {datos.selfie === "" ?
                        <Feather name="camera" size={24} color="black" /> :
                        <Image

                            style={{ height: 80, width: 80, borderRadius: 40, }}
                            source={{ uri: datos.selfie }}
                        />
                    }
                    <View style={{ position: 'absolute', right: 0, bottom: 0, }}>
                        {datos.selfie === "" ?
                            <Icono tipo={"Mas"} /> :
                            <View style={{ backgroundColor: '#fff', borderRadius: 40, padding: 2, }}>
                                <Icono tipo={"Check"} />

                            </View>

                        }
                    </View>
                </Pressable>

                {/* Foto ine */}
                <Pressable
                    onPress={handleINE}
                    style={styles.addImageContainer}>
                    <View style={{ flexDirection: 'row', }}>
                        <AntDesign name="idcard" size={24} color="black" />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>INE o IFE</Text>
                        <Text>Debes capturar el
                            <Text onPress={() => {
                                if (datos.INE[0] !== "") {
                                    setDataModal({
                                        titulo: "INE de frente",
                                        imagen: datos.INE[0]
                                    })
                                    setTipoModal("displayFoto")
                                    setModalVisible(true)
                                }
                            }}
                                style={{ fontWeight: 'bold', color: datos.INE[0] !== "" ? "blue" : '#000', }}> frente </Text>
                            y el
                            <Text onPress={() => {
                                if (datos.INE[1] !== "") {
                                    setDataModal({
                                        titulo: "INE reverso",
                                        imagen: datos.INE[1]
                                    })
                                    setTipoModal("displayFoto")
                                    setModalVisible(true)
                                }
                            }}
                                style={{ fontWeight: 'bold', color: datos.INE[1] !== "" ? "blue" : '#000', }}> reverso </Text>
                            , asegurate que este vigente y toda la informacion sea legible
                        </Text>

                    </View>
                    <View style={styles.masContainer}>
                        {datos.INE[0] === "" && datos.INE[1] === "" ?
                            <Icono tipo={"Mas"} /> :

                            datos.INE[0] !== "" && datos.INE[1] !== "" ?
                                <Icono tipo={"Check"} /> :
                                <Icono tipo={"Cross"} />

                        }


                    </View>
                </Pressable>


                {/* Sitio web */}
                <View style={styles.textInput}>
                    <MaterialCommunityIcons name="web" size={24} color="black" />
                    <Text style={{
                        marginLeft: 20,

                    }}>https://</Text>
                    <TextInput
                        autoCorrect={false}
                        autoCapitalize={"none"}
                        style={{ flex: 1, }}
                        value={sitioWeb}
                        placeholder="sitio web"
                        onChangeText={setSitioWeb} />

                </View>


                {/* Red social */}
                <View style={styles.textInput}>
                    <Feather name="instagram" size={24} color="black" />
                    <Text style={{
                        marginLeft: 20,

                    }}>@</Text>
                    <TextInput
                        autoCorrect={false}
                        autoCapitalize={"none"}
                        style={{ flex: 1, marginLeft: 1, }}
                        value={redSocial}
                        placeholder="red social"
                        onChangeText={setRedSocial} />

                </View>


                {/* Numero de telefono */}
                <View style={styles.textInput}>
                    <Feather name="phone" size={24} color="black" />
                    <Text style={{
                        marginLeft: 20,

                    }}>+52 (1)</Text>
                    <TextInput

                        maxLength={10}
                        style={{ flex: 1, marginLeft: 5, }}
                        value={telefono}
                        placeholder="Telefono de la agencia"
                        keyboardType={"number-pad"}
                        onChangeText={setTelefono} />

                </View>

                {/* Comentarios adicionales */}
                <View style={{ ...styles.textInput, height: 100, alignItems: 'flex-start', }}>
                    <Entypo
                        style={{
                            marginTop: 10,
                        }}
                        name="text"
                        size={24}
                        color="black"
                    />
                    <TextInput
                        style={{
                            marginLeft: 20,
                            margin: 10,
                            flex: 1,
                        }}
                        multiline={true}
                        numberOfLines={5}
                        value={comentarios}
                        textAlignVertical={"top"}
                        placeholder="Descripcion breve"
                        onChangeText={setComentarios} />

                </View>


                {/* Boton de datos bancarios */}
                <Pressable onPress={handleStripe} style={styles.addImageContainer}>
                    <View style={{ flexDirection: 'row', }}>
                        <Entypo name="credit-card" size={24} color="black" />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>Datos bancarios</Text>
                        <Text>Captura tus datos bancarios de manera segura con Stripe para hacer las transferencias</Text>

                    </View>

                </Pressable>







                {   ///////////////////////////////////////////////////////////
                    ////////////////////////Individual/////////////////////////
                    ////////////////////////////////////////////////////////////
                }
            </ScrollView > :
                <ScrollView
                    showsVerticalScrollIndicator={false}

                    style={styles.container}>
                    {/* Texto de introduccion */}
                    <View style={styles.header}>
                        <Text style={{ fontSize: 15, }}>
                            Por tu seguridad necesitamos
                            <Text style={styles.txtResaltado}> foto de tu rostro </Text>
                            y de tu
                            <Text style={styles.txtResaltado}> identificacion oficial </Text> para verificar tu identidad
                        </Text>
                        <Text style={styles.noComparte}>
                            *Velpa no comparte estos datos con terceros
                        </Text>
                    </View>



                    {/* Selfie */}
                    <Pressable
                        onPress={handleSelfie}
                        style={styles.selfieContainer}>
                        {datos.selfie === "" ?
                            <Feather name="camera" size={24} color="black" /> :
                            <Image

                                style={{ height: 80, width: 80, borderRadius: 40, }}
                                source={{ uri: datos.selfie }}
                            />
                        }
                        <View style={{ position: 'absolute', right: 0, bottom: 0, }}>
                            {datos.selfie === "" ?
                                <Icono tipo={"Mas"} /> :
                                <View style={{ backgroundColor: '#fff', borderRadius: 40, padding: 2, }}>
                                    <Icono tipo={"Check"} />

                                </View>

                            }
                        </View>
                    </Pressable>


                    {/* Foto ine */}
                    <Pressable onPress={handleConducir} style={styles.addImageContainer}>
                        <View style={{ flexDirection: 'row', }}>
                            <AntDesign name="idcard" size={24} color="black" />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, }}>Licencia de conducir</Text>
                            <Text>Debes capturar el
                                <Text onPress={() => {
                                    if (datos.licencia[0] !== "") {
                                        setDataModal({
                                            titulo: "Licencia de frente",
                                            imagen: datos.licencia[0]
                                        })
                                        setTipoModal("displayFoto")
                                        setModalVisible(true)
                                    }
                                }}
                                    style={{ fontWeight: 'bold', color: datos.licencia[0] !== "" ? "blue" : '#000', }}> frente </Text>
                                y el
                                <Text onPress={() => {
                                    if (datos.licencia[1] !== "") {
                                        setDataModal({
                                            titulo: "Licencia reverso",
                                            imagen: datos.licencia[1]
                                        })
                                        setTipoModal("displayFoto")
                                        setModalVisible(true)
                                    }
                                }}
                                    style={{ fontWeight: 'bold', color: datos.licencia[1] !== "" ? "blue" : '#000', }}> reverso </Text>
                                , asegurate que este vigente y toda la informacion sea legible
                            </Text>

                        </View>

                        <View style={styles.masContainer}>
                            {datos.licencia[0] === "" && datos.licencia[1] === "" ?
                                <Icono tipo={"Mas"} /> :

                                datos.licencia[0] !== "" && datos.licencia[1] !== "" ?
                                    <Icono tipo={"Check"} /> :
                                    <Icono tipo={"Cross"} />

                            }

                        </View>
                    </Pressable>


                    {/* Tarjeta de circulacion */}
                    <Pressable onPress={handleTarjeta} style={styles.addImageContainer}>
                        <View style={{ flexDirection: 'row', }}>
                            <MaterialCommunityIcons name="card-bulleted-outline" size={24} color="black" />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, }}>Tarjeta de circulacion</Text>
                            <Text>Debes capturar la
                                <Text
                                    onPress={() => {
                                        if (datos.tarjeta !== "") {
                                            setDataModal({
                                                imagen: datos.tarjeta,
                                                titulo: "Tarjeta de circulacion"
                                            })
                                            setTipoModal("displayFoto")
                                            setModalVisible(true)
                                        }
                                    }}
                                    style={{ fontWeight: datos.tarjeta !== "" ? 'bold' : "normal", color: datos.tarjeta !== "" ? "blue" : '#000', }}> tarjeta </Text>
                                de el<Text style={{ fontWeight: datos.tarjeta === "" ? 'bold' : "normal", }}> carro </Text>que vas a utilizar para ser guia de las aventuras
                            </Text>

                        </View>

                        <View style={styles.masContainer}>
                            {datos.tarjeta === "" ?
                                <Icono tipo={"Mas"} /> :
                                <Icono tipo={"Check"} />

                            }

                        </View>
                    </Pressable>


                    {/* Certificaciones */}
                    <View style={styles.certificacionesContainer}>

                        <Pressable
                            onPress={handleCertificacion}
                            style={{
                                padding: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 10,
                            }}
                        >
                            <MaterialCommunityIcons name="certificate" size={24} color="black" />
                            <View style={styles.textContainer}>
                                <Text>¿Cuentas con alguna certificacion?</Text>
                            </View>
                            <Switch
                                trackColor={{
                                    true: moradoOscuro + "20",
                                    false: colorFondo
                                }}
                                thumbColor={moradoClaro}
                                onValueChange={handleCertificacion}
                                value={certificacionEnabled}
                            />
                        </Pressable>

                        {
                            certificacionEnabled
                            && <View style={styles.mapCertificaciones}
                            >

                                {/* Mapeo de certificaciones */}
                                {certificaciones.map((item, index) => {
                                    return <Pressable
                                        onPress={() => {
                                            setDataModal({
                                                imagen: item,
                                                titulo: "Imagen " + (index + 1)
                                            })
                                            setTipoModal("displayFoto")
                                            setModalVisible(true)
                                        }}
                                        key={"archivo-", index}
                                        style={{
                                            flexDirection: 'row',
                                            padding: 20,
                                            paddingTop: 0,
                                            alignItems: 'center',
                                        }}>
                                        <Text style={{
                                            marginLeft: 40,
                                            flex: 1,
                                            textAlign: 'center',
                                            color: 'blue',
                                        }}>Imagen {index + 1}</Text>
                                        <View style={styles.masContainer}>

                                            <Feather name="minus" size={20} color="red" onPress={() => {
                                                let newArray = [...certificaciones]
                                                newArray.splice(index, 1)
                                                setCertificaciones(newArray)
                                            }} />
                                        </View>
                                    </Pressable>
                                })}
                                <Pressable
                                    onPress={handleAgregarCert}
                                    style={{
                                        flexDirection: 'row',
                                        padding: 20,
                                        paddingTop: 0,
                                        marginLeft: 40,
                                        alignItems: 'center',
                                    }}>
                                    <Text style={{ flex: 1, textAlign: 'center', }}>Agregar certificacion</Text>
                                    <View style={styles.masContainer}>
                                        <Icono tipo={"Mas"} />
                                    </View>
                                </Pressable>


                            </View>
                        }
                    </View>


                    {/* Numero de telefono */}
                    <View style={styles.textInput}>
                        <Feather name="phone" size={24} color="black" />
                        <Text style={{
                            marginLeft: 20,

                        }}>+52 (1)</Text>
                        <TextInput
                            maxLength={10}
                            style={{ flex: 1, marginLeft: 5, }}
                            value={telefono}
                            placeholder="Telefono"
                            keyboardType={"number-pad"}
                            onChangeText={setTelefono} />

                    </View>

                    {/* Comentarios adicionales */}
                    <View style={{ ...styles.textInput, height: 100, alignItems: 'flex-start', }}>
                        <Entypo
                            style={{
                                marginTop: 10,
                            }}
                            name="text"
                            size={24}
                            color="black"
                        />

                        <TextInput
                            style={{
                                marginLeft: 20,
                                margin: 10,
                                flex: 1,
                            }}
                            multiline={true}
                            numberOfLines={5}
                            value={comentarios}
                            textAlignVertical={"top"}
                            placeholder="Comentarios adicionales"
                            onChangeText={setComentarios} />

                    </View>


                    {/* Boton de datos bancarios */}
                    <Pressable onPress={handleStripe} style={styles.addImageContainer}>
                        <View style={{ flexDirection: 'row', }}>
                            <Entypo name="credit-card" size={24} color="black" />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, }}>Datos bancarios</Text>
                            <Text>Captura tus datos bancarios de manera segura con Stripe para hacer las transferencias</Text>

                        </View>

                    </Pressable>

                </ScrollView >}
            <View style={{
                padding: 20,
                backgroundColor: colorFondo,
            }}>
                <Boton
                    buttonRef={buttonRef}
                    titulo={"Continuar"}
                    loading={loading}
                    done={doneLoading}
                    onPress={handleContinuar} />

                {tipoModal === "displayFoto" ? <ImageModal
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
                />}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorFondo,
        padding: 20,
    },

    header: {
        marginHorizontal: 15,
    },

    selfieContainer: {
        borderRadius: 20,
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
        borderRadius: 20,
        marginBottom: 20,
        backgroundColor: containerColor,
        padding: 20,
        flexDirection: 'row',
    },

    certificacionesContainer: {
        borderRadius: 20,
        backgroundColor: containerColor,
        marginBottom: 20,
    },

    textContainer: {
        flex: 1,
        marginLeft: 15,
    },

    masContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput: {
        backgroundColor: containerColor,
        height: 50,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 10,
        marginVertical: 7,
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },

    agencia: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 20,
        width: '70%',
        backgroundColor: '#fff',

    },
    agenciaTxt: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        borderWidth: .5,
    },

    txtResaltado: {
        fontWeight: 'bold',
        color: moradoClaro,

    },

    noComparte: {
        fontSize: 12,
        marginTop: 10
    }

})
