import React, { useEffect, useState } from 'react'

import {
    ScrollView,
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    KeyboardAvoidingView,
} from 'react-native'

import DateTimePickerModal from "react-native-modal-datetime-picker";


import { shadowMarcada, moradoOscuro, meses, moradoClaro, shadowMedia, msInDay, emailValido, isUrl, formatTelefono, getBlob } from '../../../assets/constants';
import Boton from '../../components/Boton';

import { Feather } from '@expo/vector-icons';
import Line from '../../components/Line';

import Storage from '@aws-amplify/storage';

const containerColor = "#fff"
const colorFondo = "#F4F6F6"




export default ({ navigation, route }) => {
    const agencia = route.params.agencia

    //////////////////////////////////////////////////////////////////////////
    ////////////////////////////Variables texto///////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    // Variables individuales
    const [nombre, setNombre] = useState(route.params.nombre);
    const [errorNombre, setErrorNombre] = useState(false);

    const [apellido, setApellido] = useState(route.params.apellido);
    const [errorApellido, setErrorApellido] = useState(false);



    const [direccion, setDireccion] = useState({});
    const [errorDireccion, setErrorDireccion] = useState({});

    // Variables comunes
    const [email, setEmail] = useState(route.params.email);
    const [errorEmail, setErrorEmail] = useState(false);

    // Variables agencia
    const [nombreAgencia, setNombreAgencia] = useState(route.params.nombreAgencia);
    const [errorNombreAgencia, setErrorNombreAgencia] = useState(false);

    const [sitioWeb, setSitioWeb] = useState(null);
    const [errorSitioWeb, setErrorSitioWeb] = useState(false);

    // Telefono
    const [telefono, setTelefono] = useState(null);
    const [errorTelefono, setErrorTelefono] = useState(false);


    const today = new Date()


    // Variables de la fecha de nacimiento
    const [DOB, setDOB] = useState({});
    const [DOBVisible, setDOBVisible] = useState(false);
    const [defaultDate, setDefaultDate] = useState(new Date(today - (msInDay * 365 * 13)));
    const [errorDOB, setErrorDOB] = useState(false);


    const [imagesToSend, setImagesToSend] = useState(null);

    // Empezar a subir imagenes a S3
    useEffect(() => {
        uploadImages()
    }, []);
    async function uploadImages() {
        const { IDAtras, IDFrente, selfie, certificaciones, sub } = route.params

        const nameIDAtras = "usr-" + sub + "-IDAtras" + ".jpg"
        const nameIDFrente = "usr-" + sub + "-IDFrente" + ".jpg"
        const nameSelfie = "usr-" + sub + "-Selfie" + ".jpg"
        try {

            const blobIDAtras = await getBlob(IDAtras.uri)
            const blobIDFrente = await getBlob(IDFrente.uri)
            const blobSelfie = await getBlob(selfie.uri)


            // Subir imagenes
            await Storage.put(nameIDAtras, blobIDAtras)
            await Storage.put(nameIDFrente, blobIDFrente)
            await Storage.put(nameSelfie, blobSelfie)

            let certificacionesIDs = []
            // Subir certificaciones
            if (certificaciones && certificaciones.length !== 0) {
                await Promise.all(certificaciones?.map(async (e, i) => {
                    const name = "usr-" + sub + "-Certificacion " + i + ".jpg"
                    const blob = await getBlob(e.uri)

                    await Storage.put(name, blob)
                    certificacionesIDs.push({ S3Key: name })
                }))

            }
            setImagesToSend({
                IDAtras: {
                    S3Key: nameIDAtras,
                    stripeKey: IDAtras.key
                },
                IDFrente: {
                    S3Key: nameIDFrente,
                    stripeKey: IDFrente.key
                },
                selfie: {
                    S3Key: nameSelfie,
                },
                certificaciones: certificacionesIDs,
            })
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Ocurrio un error", [{
                text: "OK",
                onPress: () => navigation.pop(1)
            }])
        }



    }



    const handleContinuar = async () => {
        if (!imagesToSend) {
            Alert.alert("Espera", "Se estan subiendo las imagenes")
            return
        }

        // Verificar datos principales
        if (!agencia && !nombre) {
            setErrorNombre(true)
            Alert.alert("Error", "Por favor agrega el nombre")
            return
        }


        if (!agencia && !apellido) {
            setErrorApellido(true)
            Alert.alert("Error", "Por favor agrega el apellido")
            return
        }

        // Email
        if (!email) {
            setErrorEmail(true)
            Alert.alert("Error", "Por favor agrega el correo electronico")
            return
        }

        if (!emailValido(email)) {
            setErrorEmail(true)
            Alert.alert("Error", "El correo electronico no es valido")
            return
        }


        // Telefono
        if (!telefono) {
            setErrorTelefono(true)
            Alert.alert("Error", "Agrega un telefono de contacto")
            return
        }

        if (!agencia && !DOB.dia) {
            setErrorDOB(true)
            Alert.alert("Error", "Agrega la fecha de nacimiento")
            return

        }


        // Verificar direccion
        if (!direccion.line1) {
            setErrorDireccion({ ...errorDireccion, line1: true })
            Alert.alert("Error", "Por favor agrega la direccion")
            return
        }

        if (!direccion.city) {
            setErrorDireccion({ ...errorDireccion, city: true })
            Alert.alert("Error", "Por favor agrega la ciudad")
            return
        }

        if (!direccion.state) {
            setErrorDireccion({ ...errorDireccion, state: true })
            Alert.alert("Error", "Por favor agrega el estado")
            return
        }

        if (!direccion.postal_code || direccion.postal_code.length !== 5 || isNaN(Number(direccion.postal_code))) {
            setErrorDireccion({ ...errorDireccion, postal_code: true })
            Alert.alert("Error", "Por favor agrega el codigo postal correctamente")
            return
        }



        const dataToSend = {
            agencia,
            ...imagesToSend,
            apellido,
            nombre,
            email,
            telefono: "+52" + telefono.replace(/\s+/g, ''),

            nickname: agencia ? nombreAgencia : null,
            sitioWeb: sitioWeb ? ("https://" + sitioWeb) : null,

            DOB: DOB.dia ? DOB : null,
            direccion
        }
        navigation.navigate("CapturaDocumentos3", dataToSend)
    }

    const handleConfirmDOB = (date) => {
        setDOBVisible(false)

        const dia = date.getUTCDate()
        const mes = date.getUTCMonth()
        const año = date.getUTCFullYear()

        setDefaultDate(date)
        setDOB({
            dia,
            mes,
            año
        })

    }



    //////////////////////////////////////////////////////////////////////////
    /////////////////////////////////Render///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    return (
        <View style={{ flex: 1, backgroundColor: colorFondo, }}>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, }}
            >
                {/* Cuerpo */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.container}>

                    {/* Nombre individial */}
                    {
                        // Nombre
                        !agencia && <View style={styles.innerContainer}>
                            <Text style={styles.captionTxt}>Nombre*</Text>
                            <View style={{ ...styles.textInput, borderColor: errorNombre ? "red" : "transparent", }}>
                                <TextInput
                                    autoCapitalize={"words"}
                                    onTouchStart={() => setErrorNombre(false)}
                                    style={{ flex: 1 }}
                                    value={nombre}
                                    onChangeText={setNombre}
                                />

                                {!!nombre && <Feather
                                    style={styles.cancelInput}
                                    name="x"
                                    size={24}
                                    color="black"
                                    onPress={() => setNombre("")}
                                />}

                            </View>
                        </View>
                    }

                    {/* Apellido individual */}
                    {!agencia && <View style={styles.innerContainer}>
                        <Text style={styles.captionTxt}>Apellido*</Text>
                        <View style={{ ...styles.textInput, borderColor: errorApellido ? "red" : "transparent", }}>
                            <TextInput
                                style={{ flex: 1, }}
                                onTouchStart={() => setErrorApellido(false)}
                                autoCapitalize={"words"}
                                value={apellido}
                                onChangeText={setApellido}
                            />

                            {!!apellido && <Feather
                                style={styles.cancelInput}
                                name="x"
                                size={24}
                                color="black"
                                onPress={() => setApellido("")}
                            />}

                        </View>
                    </View>
                    }


                    {/* Nombre de la agencia */}
                    {agencia && <View style={styles.innerContainer}>
                        <Text style={styles.captionTxt}>Nombre de la agencia*</Text>
                        <View style={{ ...styles.textInput, borderColor: errorNombreAgencia ? "red" : "transparent", }}>
                            <TextInput
                                style={{ flex: 1, }}
                                onTouchStart={() => setErrorNombreAgencia(false)}
                                value={nombreAgencia}
                                onChangeText={setNombreAgencia}
                            />

                            {!!nombreAgencia && <Feather
                                style={styles.cancelInput}
                                name="x"
                                size={24}
                                color="black"
                                onPress={() => setNombreAgencia("")}
                            />}

                        </View>
                    </View>
                    }

                    {/* Correo electronico */}
                    <View style={styles.innerContainer}>
                        <Text style={styles.captionTxt}>Correo electronico*</Text>
                        <View style={{ ...styles.textInput, borderColor: errorEmail ? "red" : "transparent", }}>
                            <TextInput
                                style={{ flex: 1, }}
                                onTouchStart={() => setErrorEmail(false)}
                                autoCapitalize={"none"}
                                value={email}
                                onChangeText={setEmail}
                            />

                            {!!email && <Feather
                                style={styles.cancelInput}
                                name="x"
                                size={24}
                                color="black"
                                onPress={() => setEmail("")}
                            />}

                        </View>
                    </View>

                    {/* Telefono */}
                    <View style={styles.innerContainer}>
                        <Text style={styles.captionTxt}>Telefono*</Text>
                        <View style={{ ...styles.textInput, borderColor: errorTelefono ? "red" : "transparent", }}>
                            <Text >+52 (1) </Text>
                            <TextInput
                                onTouchStart={() => setErrorTelefono(false)}
                                style={{ flex: 1, }}
                                autoCapitalize={"none"}
                                value={telefono}

                                textContentType="telephoneNumber"
                                autoCompleteType="tel"

                                keyboardType={"numeric"}
                                onChangeText={(r) => setTelefono(formatTelefono(r))}
                            />

                            {!!telefono && <Feather
                                style={styles.cancelInput}
                                name="x"
                                size={24}
                                color="black"
                                onPress={() => setTelefono("")}
                            />}

                        </View>
                    </View>

                    {/* Fecha nacimiento */}
                    {!agencia && <Pressable
                        onPress={() => {
                            setErrorDOB(false)
                            setDOBVisible(true)
                        }}
                        style={{ marginBottom: 40, }}>
                        <Text style={styles.captionTxt}>Fecha de nacimiento*</Text>

                        <View style={{
                            ...styles.textInput,
                            borderColor: errorDOB ? "red" : "transparent",

                        }}>

                            {/* Dia */}
                            <Text style={styles.diaContainer}>{DOB.dia ? DOB.dia : "DD"}</Text>

                            <View style={styles.lineVertical} />

                            {/* Mes */}
                            <Text style={styles.diaContainer}>{DOB.mes ? meses[DOB.mes] : "MM"}</Text>

                            <View style={styles.lineVertical} />

                            {/* Año */}
                            <Text style={styles.diaContainer}>{DOB.año ? DOB.año : "AAAA"}</Text>


                        </View>
                    </Pressable>}


                    {/* Sitio web */}
                    {agencia && <View style={styles.innerContainer}>
                        <Text style={styles.captionTxt}>Sitio web</Text>
                        <View style={{ ...styles.textInput, borderColor: errorSitioWeb ? "red" : "transparent", }}>
                            <Text style={{ color: moradoClaro, }}>https://</Text>
                            <TextInput
                                onTouchStart={() => setErrorSitioWeb(false)}
                                style={{ flex: 1, color: moradoClaro, }}
                                value={sitioWeb}
                                onChangeText={setSitioWeb}
                            />

                            {!!sitioWeb && <Feather
                                style={styles.cancelInput}
                                name="x"
                                size={24}
                                color="black"
                                onPress={() => setSitioWeb("")}
                            />}

                        </View>
                    </View>}


                    <Line style={{
                        marginBottom: 40,
                    }} />


                    <View style={styles.innerContainer}>
                        <Text style={styles.captionTxt}>Direccion* (calle y numero)</Text>
                        <View style={{ ...styles.textInput, borderColor: errorDireccion.line1 ? "red" : "transparent", }}>
                            <TextInput
                                style={{ flex: 1, }}
                                onTouchStart={() => setErrorDireccion({ ...errorDireccion, line1: false })}
                                value={direccion.line1}

                                textContentType="fullStreetAddress"
                                autoCompleteType="street-address"

                                onChangeText={(r) => setDireccion({ ...direccion, line1: r })}
                            />

                            {!!(direccion.line1) && <Feather
                                style={styles.cancelInput}
                                name="x"
                                size={24}
                                color="black"
                                onPress={() => setDireccion({ ...direccion, line1: "" })}
                            />}
                        </View>

                        <View style={{ marginBottom: 10, }} />

                        <Text style={styles.captionTxt}>Ciudad*</Text>
                        <View style={{ ...styles.textInput, borderColor: errorDireccion.city ? "red" : "transparent", }}>
                            <TextInput
                                style={{ flex: 1, }}
                                onTouchStart={() => setErrorDireccion({ ...errorDireccion, city: false })}
                                value={direccion.city}

                                textContentType="addressCity"

                                onChangeText={(r) => setDireccion({ ...direccion, city: r })}
                            />

                            {!!(direccion.city) && <Feather
                                style={styles.cancelInput}
                                name="x"
                                size={24}
                                color="black"
                                onPress={() => setDireccion({ ...direccion, city: "" })}
                            />}
                        </View>

                        <View style={{ marginBottom: 10, }} />

                        <Text style={styles.captionTxt}>Estado*</Text>
                        <View style={{ ...styles.textInput, borderColor: errorDireccion.state ? "red" : "transparent", }}>
                            <TextInput
                                style={{ flex: 1, }}
                                onTouchStart={() => setErrorDireccion({ ...errorDireccion, state: false })}
                                value={direccion.state}

                                textContentType="addressState"

                                onChangeText={(r) => setDireccion({ ...direccion, state: r })}
                            />

                            {!!(direccion.state) && <Feather
                                style={styles.cancelInput}
                                name="x"
                                size={24}
                                color="black"
                                onPress={() => setDireccion({ ...direccion, state: "" })}
                            />}
                        </View>

                        <View style={{ marginBottom: 10, }} />

                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ flex: 1, marginRight: 10, }}>
                                <Text style={styles.captionTxt}>Codigo postal*</Text>
                                <View style={{ ...styles.textInput, borderColor: errorDireccion.postal_code ? "red" : "transparent", }}>
                                    <TextInput
                                        autoCompleteType="postal-code"
                                        onTouchStart={() => setErrorDireccion({ ...errorDireccion, postal_code: false })}
                                        textContentType="postalCode"

                                        style={{ flex: 1, }}
                                        keyboardType={'numeric'}
                                        maxLength={5}
                                        value={direccion.postal_code}
                                        onChangeText={(r) => setDireccion({ ...direccion, postal_code: r })}
                                    />

                                    {!!(direccion.postal_code) && <Feather
                                        style={styles.cancelInput}
                                        name="x"
                                        size={24}
                                        color="black"
                                        onPress={() => setDireccion({ ...direccion, postal_code: "" })}
                                    />}
                                </View>
                            </View>

                            <Pressable
                                onPress={() => {
                                    Alert.alert("", "Actualmente solo se puede con ubicacion fiscal en mexico")
                                }}
                                style={{ flex: 1, marginLeft: 10, }}>
                                <Text style={styles.captionTxt}>Pais</Text>
                                <View style={{ ...styles.textInput, height: 48, }}>
                                    <Text style={{
                                        color: 'gray',
                                    }}>México</Text>
                                </View>
                            </Pressable>

                        </View>
                    </View>



                    <Line style={{
                        marginBottom: 40,
                    }} />



                    <Boton
                        titulo={"Continuar"}
                        disabled={false}
                        loading={!imagesToSend}
                        onPress={handleContinuar} />
                    <View style={{
                        height: 40,
                    }} />


                </ScrollView>
                <DateTimePickerModal
                    isVisible={DOBVisible}
                    mode="date"
                    date={defaultDate}
                    maximumDate={new Date(today - (msInDay * 365 * 13))}
                    onConfirm={handleConfirmDOB}
                    onCancel={() => setDOBVisible(false)}
                />

            </KeyboardAvoidingView >
        </View>
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
        borderWidth: 1,
        borderColor: "transparent",
    },

    agenciaTxt: {
        fontSize: 15,
    },

    cancelInput: {
        backgroundColor: 'white',
    },

    diaContainer: {
        flex: 1,
        textAlign: 'center',
        color: moradoOscuro,

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
