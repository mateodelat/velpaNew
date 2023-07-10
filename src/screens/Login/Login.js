import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Pressable, TextInput, Alert, Keyboard, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


import PasswordForget from './PasswordForget';
import { Auth } from 'aws-amplify';
import { colorFondo, handleGoogle, moradoClaro, moradoOscuro } from '../../../assets/constants';
import Boton from './components/Boton';



export default function Register({ navigation, route }) {


    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);

    // Variables del texto
    const [email, setEmail] = useState(route?.params?.email ? route.params.email : "");
    const [password, setPassword] = useState("");

    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [error, setError] = useState("");

    const [modal, setModal] = useState(false);

    const handleLogin = () => {
        if (email === "") {
            setError("El correo no puede estar vacio")
            setErrorEmail(true)
            return
        }

        if (password === "") {
            setError("La contraseña no puede estar vacia")
            setErrorEmail(false)
            setErrorPassword(true)
            return
        }

        console.log("Logging in ")

        setLoading(true)
        Auth.signIn(email, password)
            .then(() => {
                console.log("Loggin")
                setError("")
                setErrorEmail()
                setErrorPassword()
                setPassword("")
                setEmail("")
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                switch (errorCode) {
                    case 'UserNotConfirmedException':
                        setError("Por favor confirma tu usuario")
                        setErrorPassword(false)
                        setErrorEmail(true)
                        break;

                    case 'UserNotFoundException':
                        setError("El usuario no existe")
                        setErrorPassword(false)
                        setErrorEmail(true)
                        break;

                    case 'NotAuthorizedException':
                        setError("Contraseña incorrecta, vuelve a intentarlo")
                        setErrorPassword(true)
                        setErrorEmail(false)
                        break;

                    default:
                        console.log(error)
                        setError(error.message)
                        setLoading(false)
                        setErrorEmail(false)
                        setErrorPassword(false)

                        break;
                }
            })
            .finally(r => {
                setLoading(false)
            })
    }

    const handleRegistrarse = () => {
        navigation.pop()
        navigation.navigate("Register")
    }

    const handleOlvidado = () => {
        setModal(true)
    }

    const handleConfirmar = () => {
        navigation.navigate("Confirm", { email })
    }

    return (
        <Pressable
            onPress={() => Keyboard.dismiss()}
            style={styles.cuadro}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(false);
                }}
            >
                <PasswordForget correo={email} setModal={setModal} navigation={navigation} />
            </Modal>
            <View style={styles.header}>
                <Image source={require('../../../assets/VELPA.png')} style={{ width: 100, height: 100, }} />
            </View>

            <View style={{
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 10,
                flex: 1,
            }}>

                <Text style={{ fontSize: 18, marginVertical: 5, }}>Correo electronico</Text>
                <TextInput
                    style={{ ...styles.textInput, borderWidth: errorEmail ? 1 : 0, marginTop: 0, }}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    onEndEditing={() => {
                        setErrorEmail(false)
                        setErrorPassword(false)
                        setError("")
                    }}
                />

                <Text style={{ fontSize: 18, marginVertical: 5, }}>Contraseña</Text>
                <View style={{ ...styles.textInput, borderWidth: errorPassword ? 1 : 0, marginTop: 0, }}>
                    <TextInput
                        value={password}
                        style={{ flex: 1, }}
                        secureTextEntry={hidePassword}
                        onChangeText={text => setPassword(text)}
                        onEndEditing={() => {
                            setErrorEmail(false)
                            setErrorPassword(false)
                            setError("")
                        }}
                    />


                    {
                        hidePassword ?
                            <Ionicons
                                style={{
                                    alignSelf: 'center',
                                    marginRight: 20,
                                }}
                                name="eye-off"
                                size={26}
                                color="#a0a0a0"
                                onPress={() => setHidePassword(!hidePassword)}
                            />
                            :
                            <Ionicons
                                style={{
                                    alignSelf: 'center',
                                    marginRight: 20,
                                }}
                                name="eye"
                                size={26}
                                color="#a0a0a0"
                                onPress={() => setHidePassword(!hidePassword)}
                            />

                    }

                </View>

                {/* Texto de error */}
                {error ? <Text style={{
                    color: 'red',
                    height: 20,
                }}>{error}</Text> : <View style={{ paddingTop: 20, }} />}

                <Boton
                    loading={loading}

                    onPress={handleLogin}
                    titulo={"Iniciar sesion"}
                    backgroundColor={moradoOscuro}
                />

                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <Pressable style={{ flex: 1, }} onPress={handleConfirmar}>
                        <Text style={{ color: '#689ADA', fontSize: 14, textAlign: 'center', marginTop: 10, }}>Confirmar codigo</Text>
                    </Pressable>

                    <Pressable style={{ flex: 1, }} onPress={handleOlvidado}>
                        <Text style={{ color: '#689ADA', flex: 1, fontSize: 14, textAlign: 'center', marginTop: 10, }}>Recupera contraseña</Text>
                    </Pressable>

                </View>

                {/* ----------- o ------------ */}
                <View style={{ borderTopWidth: 1, borderColor: 'lightgray', }} />
                <Text style={{ backgroundColor: '#fff', alignSelf: 'center', paddingHorizontal: 20, bottom: 10, marginBottom: 10, }}>o</Text>



                {/* Boton de google */}
                <Pressable onPress={handleGoogle} style={styles.boton}>
                    <Image source={require('../../../assets/GoogleIcon.png')} style={{ width: 25, height: 25, }} />
                    <Text style={{ color: '#fff', fontSize: 18, }}>   Iniciar sesion con Google</Text>
                </Pressable>

                <View style={{ marginTop: 40, justifyContent: 'flex-end', }}>
                    <Text style={{
                        textAlign: 'center',
                        color: '#8C8FA2',
                    }}>No tienes cuenta?
                        <Text onPress={handleRegistrarse} style={{ color: '#689ADA', }}> Registrarse</Text>
                    </Text>
                </View>
            </View>
        </Pressable >
    )
}




const styles = StyleSheet.create({
    cuadro: {
        backgroundColor: colorFondo,
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },

    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    logoText: {
        fontSize: 30,
    },
    textInput: {
        backgroundColor: '#F4F6F6',
        height: 50,
        width: '100%',
        paddingLeft: 20,
        borderRadius: 7,
        marginVertical: 7,
        flexDirection: 'row',
        borderColor: 'red',
    },

    boton: {
        marginBottom: 10,
        alignItems: 'center',
        height: 50,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 7,
        backgroundColor: moradoClaro,
    }
})
