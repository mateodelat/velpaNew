import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput, Alert, Keyboard } from 'react-native';
import { Auth } from 'aws-amplify';
import { colorFondo, moradoOscuro } from '../../../assets/constants';



export default function ({ navigation, route }) {
    // Variables del texto
    const [code, setCode] = useState("");
    const [name, setName] = useState("");

    const [error, setError] = useState("");
    const [errorName, setErrorName] = useState(false);
    const [errorCode, setErrorCode] = useState(false);

    // Mensaje de correo enviado
    const [message, setMessage] = useState("");

    const { email } = route.params

    const handleContinuar = () => {
        if (!name && !email) {
            setError("El correo no puede estar vacio")
            setErrorCode(false)
            setErrorName(true)
            return

        }

        if (!code) {
            setError("El codigo no puede estar vacio")
            setErrorCode(true)
            setErrorName(false)
            return
        }

        Auth.confirmSignUp(email ? email : name, code)
            .then(() => {
                navigation.popToTop()
                navigation.navigate("Login", { email: email ? email : name })
            }).catch((error) => {
                switch (error.message) {
                    case "Confirmation code cannot be empty":
                        setError("El codigo no puede estar vacio")
                        setErrorName(false)
                        setErrorCode(true)
                        break;
                    case "Invalid verification code provided, please try again.":
                        setError("Codigo incorrecto, vuelve a intentarlo")
                        setErrorName(false)
                        setErrorCode(true)
                        break;
                    case "Username cannot be empty":
                        setErrorName(true)
                        setErrorCode(false)
                        setError("El correo no puede estar vacio")
                        break;
                    case "Username/client id combination not found.":
                        setErrorName(true)
                        setErrorCode(false)
                        setError("Usuario no encontrado vuelve a intentarlo")
                        break;
                    case "User cannot be confirmed. Current status is CONFIRMED":
                        setErrorName(true)
                        setErrorCode(false)
                        setError("Usuario ya confirmado, inicia sesion")
                        break;
                    default:
                        Alert.alert("Unexpected error", error.message)
                        console.log(error)
                        break;
                }
            });

    }

    const clearErrors = () => {
        setErrorCode(false)
        setErrorName(false)
        setError("")
    }

    const handleReenviar = () => {
        Auth.resendSignUp(email ? email : name)
            .then(() => {
                setMessage(
                    !email ? `Codigo enviado a ${name}` :
                        `Codigo enviado a ${email}`
                )
                setTimeout(() => {
                    setMessage("")
                }, 3000);
            }
            ).catch(error => {
                switch (error.message) {
                    case "Username cannot be empty":
                        setErrorName(true)
                        setErrorCode(false)
                        setError("El correo no puede estar vacio")
                        break;
                    case "Username/client id combination not found.":
                        setErrorName(true)
                        setErrorCode(false)
                        setError("Usuario no encontrado vuelve a intentarlo")
                        break;
                    case "Attempt limit exceeded, please try after some time.":
                        setErrorName(false)
                        setErrorCode(false)
                        setError("Limite de intentos alcanzado")
                        break;
                    default:
                        setErrorName(false)
                        setErrorCode(false)
                        setError(error.message)
                        console.log(error)
                        break;
                }
            }

            )
    }

    return (
        <Pressable
            style={styles.cuadro}
            onPress={() => Keyboard.dismiss()}
        >
            <View style={{
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 10,
            }}>

                {error ? <Text style={{
                    alignSelf: 'flex-start',
                    color: 'red',
                    height: 20,
                    marginLeft: 10,
                }}>{error}</Text> : <View style={{ marginTop: 20, }} />}

                {!email ?
                    <>
                        <Text style={{ fontSize: 18, marginVertical: 5, }}>Correo electronico</Text>
                        <TextInput
                            style={{ ...styles.textInput, borderWidth: errorName ? 1 : 0, }}
                            placeholder="Correo electronico"
                            value={name}
                            onChangeText={text => setName(text)}
                            onEndEditing={clearErrors}
                        />
                    </> : null
                }

                <Text style={{ fontSize: 18, marginVertical: 5, }}>Codigo</Text>
                <TextInput
                    style={{ ...styles.textInput, borderWidth: errorCode ? 1 : 0, }}
                    placeholder="Codigo"
                    value={code}
                    onChangeText={text => setCode(text)}
                    keyboardType="phone-pad"
                    onEndEditing={clearErrors}
                    maxLength={6}
                />

                <Pressable
                    style={styles.boton}
                    onPress={handleContinuar}
                >
                    <Text style={{ color: '#fff', fontSize: 18, }}>Continuar</Text>
                </Pressable>

                <Pressable
                    style={styles.reenviar}
                    onPress={handleReenviar}>
                    <Text style={{ color: '#689ADA', fontSize: 18, }}>Reenviar correo de confirmacion</Text>
                </Pressable>

                {
                    message !== "" ?
                        <View style={styles.message}>
                            <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', }}>{message}</Text>
                        </View> : null
                }
            </View>
        </Pressable >
    )
}




const styles = StyleSheet.create({
    cuadro: {
        backgroundColor: colorFondo,
        padding: 20,
        flex: 1,
    },

    textInput: {
        backgroundColor: '#ebebeb',
        height: 50,
        width: '100%',
        paddingHorizontal: 20,
        borderRadius: 7,
        marginBottom: 7,
        flexDirection: 'row',
        borderColor: "red",
        alignItems: 'center',
    },

    boton: {
        marginTop: 10,
        alignItems: 'center',
        height: 50,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 7,
        overflow: 'hidden',
        backgroundColor: moradoOscuro,
    },

    message: {
        backgroundColor: '#53A548',
        position: 'absolute',
        alignSelf: 'center',
        flex: 1,
        width: '100%',
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        padding: 15,
        paddingHorizontal: 5
    },
    reenviar: {
        alignSelf: 'center',
        marginTop: 10,
    }
})
