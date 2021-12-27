import React, { useEffect, useState } from 'react'

import {
    ScrollView,
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    Dimensions,
} from 'react-native'

import DateTimePickerModal from "react-native-modal-datetime-picker";


import { shadowMarcada, moradoOscuro, meses, moradoClaro, msInDay, RFCValido, formatCuentaCLABE, getUserSub } from '../../../assets/constants';
import Boton from '../../components/Boton';

import { Feather, MaterialIcons } from '@expo/vector-icons';
import Line from '../../components/Line';

import { AntDesign } from '@expo/vector-icons';
import RadioButton from '../../components/RadioButton';
import API from '@aws-amplify/api';
import { createStripeAcount } from '../../graphql/mutations';
import { useNetInfo } from '@react-native-community/netinfo';
import { DataStore } from '@aws-amplify/datastore';
import { TipoUsuario, Usuario } from '../../models';
import { vibrar } from '../../../assets/constants/constant';

const containerColor = "#fff"
const colorFondo = "#F4F6F6"




const { height } = Dimensions.get("screen")

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


    const [RFCIndividual, setRFCIndividual] = useState(null);
    const [RFCAgencia, setRFCAgencia] = useState(null);
    const [errorRFC, setErrorRFC] = useState(false);


    const [numeroDeCuenta, setNumeroDeCuenta] = useState(null);
    const [errorNumeroDeCuenta, setErrorNumeroDeCuenta] = useState(false);

    const [aceptoTerminos, setAceptoTerminos] = useState(false);
    const [errorTerminos, setErrorTerminos] = useState(false);

    const [buttonLoading, setButtonLoading] = useState(false);

    const today = new Date()


    // Variables de la fecha de nacimiento
    const [DOB, setDOB] = useState({});
    const [DOBVisible, setDOBVisible] = useState(false);
    const [defaultDate, setDefaultDate] = useState(new Date(today - (msInDay * 365 * 13)));
    const [errorDOB, setErrorDOB] = useState(false);


    const [ip, setIp] = useState("8.8.8.8");
    const [sub, setSub] = useState(null);
    useEffect(() => {
        // Pedir ip para terminos y condiciones y sub usuario
        (async () => {
            setIp(await fetch("https://api.ipify.org?format=json").then(r => r.json().then(r => r.ip)))
            setSub(await getUserSub())
        }
        )()
    }, []);


    const handleContinuar = async () => {

        const numeroDeCuentaEnviar = numeroDeCuenta?.replace(/\D/g, '');

        // Fecha de aceptancia terminos
        const date = Math.round((((new Date) - 1) / 1000))

        if (!validar()) return

        setButtonLoading(true)
        const {
            IDAtras: {
                S3Key: S3Atras,
                stripeKey: StripeKeyAtras,
            },
            IDFrente: {
                S3Key: S3Frente,
                stripeKey: StripeKeyFrente,
            },
            certificaciones,
            direccion: {
                city,
                line1,
                postal_code,
                state,
            },
            email,
            nombreAgencia,
            selfie: {
                S3Key: S3Selfie,
            },
            sitioWeb,
            telefono,
        } = route.params
        const año = agencia ? DOB.año : route.params.DOB.año
        const mes = agencia ? DOB.mes : route.params.DOB.mes
        const dia = agencia ? DOB.dia : route.params.DOB.dia

        try {
            // Crear cuenta en stripe
            API.graphql({
                query: createStripeAcount, variables: {
                    email,
                    phone: telefono,

                    first_name: nombre,
                    last_name: apellido,

                    accountNumber: numeroDeCuentaEnviar,
                    userSub: sub,

                    documentIdBack: StripeKeyAtras,
                    documentIdFront: StripeKeyFrente,

                    // Fecha nacimiento persona / representante legal
                    day: dia,
                    month: mes,
                    year: año,

                    // Direccion del representante/empresa o personal
                    city,
                    country: "MX",
                    line1,
                    postal_code,
                    state,

                    // IP y fecha de terminos y condiciones
                    ip,
                    date,

                    companyName: nombreAgencia,
                    url: sitioWeb,
                    accountType: agencia ? "COMPANY" : "INDIVIDUAL",
                    rfcIndividual: (agencia && !RFCIndividual) ? null : RFCIndividual,
                    rfcCompania: !RFCAgencia ? null : RFCAgencia,
                }
            }).then(async r => {
                r = r.data.createStripeAcount
                if (r.errors) {
                    setButtonLoading(false)
                    Alert.alert("Error", "Hubo un error creando tu cuenta bancaria")
                    return
                }
                else {
                    // Actualizar al usuario con todos los campos
                    const user = await DataStore.query(Usuario, sub)
                    await DataStore.save(Usuario.copyOf(user, (nuevo) => {
                        nuevo.nombre = nombre
                        nuevo.apellido = apellido

                        nuevo.stripeID = r.id

                        nuevo.selfie = S3Selfie
                        nuevo.ID = [S3Frente, S3Atras]

                        nuevo.telefono = telefono
                        nuevo.certificaciones = certificaciones.length === 0 ? null : certificaciones.map(e => e.S3Key)
                        nuevo.tipo = agencia ? TipoUsuario.AGENCIA : TipoUsuario.GUIAINDIVIDUAL
                        nuevo.sitioWeb = sitioWeb

                        nuevo.rfcIndividual = RFCIndividual
                        nuevo.rfcCompania = RFCAgencia

                        nuevo.fechaNacimiento = { day: dia, month: mes, year: año }
                        nuevo.direccion = {
                            city,
                            country: "MX",
                            line1,
                            postal_code,
                            state,
                        }

                        nuevo.CuentaBancaria = numeroDeCuentaEnviar

                    }))

                    navigation.popToTop()
                    navigation.navigate("SeleccionaAventura")
                    setButtonLoading(false)
                }
            })
        } catch (error) {
            setButtonLoading(false)
            console.log(error)
        }

    }

    function validar() {
        const numeroDeCuentaEnviar = numeroDeCuenta?.replace(/\D/g, '');

        // Validar
        if (agencia && !nombre) {
            console.log(nombre)
            setErrorNombre(true)
            Alert.alert("Error", "Escribe el nombre del representante legal de la empresa")
            return false
        }

        if (agencia && !apellido) {
            setErrorApellido(true)
            Alert.alert("Error", "Escribe el apellido del representante legal")
            return false
        }

        if (agencia && RFCAgencia && !RFCValido(RFCAgencia)) {
            setErrorRFC(true)
            Alert.alert("Error", "El RFC de la empresa no es valido")
            return false
        }
        if (agencia && !DOB.dia) {
            setErrorDOB(true)
            Alert.alert("Error", "Agrega la fecha de nacimiento")
            return false
        }

        if (!agencia && RFCIndividual && !RFCValido(RFCIndividual)) {
            setErrorRFC(true)
            Alert.alert("Error", "El RFC no es valido")
            return false
        }

        if (!numeroDeCuentaEnviar || numeroDeCuentaEnviar.length !== 18) {
            setErrorNumeroDeCuenta(true)
            Alert.alert("Error", "El numero de cuenta no es valido")
            return false
        }

        if (!aceptoTerminos) {
            setErrorTerminos(true)
            Alert.alert("Error", "Debes aceptar los terminos y condiciones de Velpa")
            return false
        }

        return true
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

    function handleAbrirTerminos() {
        // Alert.alert("Link a terminos y condiciones de velpa")

    }



    //////////////////////////////////////////////////////////////////////////
    /////////////////////////////////Render///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    return (
        <View style={{ flex: 1, backgroundColor: colorFondo, }}>
            {/* Cuerpo */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}>

                <View style={{
                    minHeight: height - 350

                }}>

                    {/* Nombre individial */}
                    {
                        // Nombre
                        agencia && <View style={styles.innerContainer}>
                            <Text style={styles.title}>Representante legal</Text>

                            <Text style={styles.captionTxt}>Nombre*</Text>
                            <View style={{ ...styles.textInput, borderColor: errorNombre ? "red" : "transparent", }}>
                                <TextInput
                                    onTouchStart={() => setErrorNombre(false)}
                                    autoCapitalize={"words"}
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
                    {agencia && <View style={styles.innerContainer}>
                        <Text style={styles.captionTxt}>Apellido*</Text>
                        <View style={{ ...styles.textInput, borderColor: errorApellido ? "red" : "transparent", }}>
                            <TextInput
                                onTouchStart={() => setErrorApellido(false)}
                                style={{ flex: 1, }}
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
                    {/* Fecha nacimiento */}
                    {agencia && <Pressable
                        onPress={() => {
                            setErrorDOB(false)
                            setDOBVisible(true)
                        }}
                        style={{ marginBottom: 10, }}>
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



                    {agencia && <Line style={{
                        marginTop: 30,
                        marginBottom: 40,
                    }} />}

                    <View style={{ marginBottom: 20, }}>
                        <Text style={styles.captionTxt}>{agencia ? "RFC empresa" : "RFC (opcional)"}</Text>
                        <View style={{ ...styles.textInput, borderColor: errorRFC ? "red" : "transparent", }}>

                            <TextInput
                                onTouchStart={() => setErrorRFC(false)}
                                maxLength={13}
                                style={{ flex: 1, }}
                                autoCapitalize={"characters"}
                                value={agencia ? RFCAgencia : RFCIndividual}
                                onChangeText={agencia ? setRFCAgencia : setRFCIndividual}
                            />

                            {!!(agencia ? RFCAgencia : RFCIndividual) && <Feather
                                style={styles.cancelInput}
                                name="x"
                                size={24}
                                color="black"
                                onPress={() => {
                                    agencia ? setRFCAgencia("") : setRFCIndividual("")
                                    setErrorRFC(false)
                                }}
                            />}

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }}>
                        <Text style={styles.captionTxt}>Cuenta CLABE (18 digitos)*</Text>
                    </View>
                    <View style={{ ...styles.textInput, marginBottom: 20, borderColor: errorNumeroDeCuenta ? "red" : "transparent" }}>
                        {/* <MaterialIcons name="account-balance-wallet" size={24} color="black" /> */}
                        <TextInput
                            onTouchStart={() => setErrorNumeroDeCuenta(false)}
                            style={{ flex: 1, marginLeft: 10, }}
                            // maxLength={24}
                            keyboardType={"numeric"}

                            value={numeroDeCuenta}
                            onChangeText={(r) => setNumeroDeCuenta(formatCuentaCLABE(r))}
                        />
                        <AntDesign
                            name="Safety"
                            size={24}
                            color={moradoOscuro}
                        />

                    </View>





                    <Line style={{ marginBottom: 40, }} />
                </View>

                <Pressable
                    onPress={() => {
                        setAceptoTerminos(!aceptoTerminos)
                        setErrorTerminos(false)
                        vibrar("medium")
                    }}
                    style={{ ...styles.textInput, marginBottom: 40, borderColor: errorTerminos ? "red" : "transparent", }}>
                    <Text style={styles.textoTerminos}>Acepto <Text style={{ color: moradoOscuro, }} onPress={handleAbrirTerminos}>terminos y condiciones</Text> de velpa</Text>
                    <RadioButton
                        checked={aceptoTerminos}
                        setChecked={setAceptoTerminos}
                    />

                </Pressable>

                <Boton
                    loading={buttonLoading}
                    titulo={"Continuar"}
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
        marginBottom: 10,

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
        position: 'absolute',
        right: 10,
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

    title: {
        fontWeight: 'bold', textAlign: 'center',
        marginBottom: 10,
    },

    textoTerminos: {
        flex: 1,
        padding: 10,
        marginRight: 20,
    }
})
