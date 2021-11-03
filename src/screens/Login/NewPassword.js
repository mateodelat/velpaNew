import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput, Alert, Keyboard } from 'react-native';
import { Auth } from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';



export default function ({ navigation, route }) {
    // Variables del texto
    const [code, setCode] = useState("");
    const [new_password, setNew_pasword] = useState("");

    const [error, setError] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorCode, setErrorCode] = useState(false);

    const [hidePassword, setHidePassword] = useState(true);

    const { username } = route.params

    const [message, setMessage] = useState("");

    const handleReenviar = () => {
        Auth.forgotPassword(username)
            .then(() => {
                setMessage("Codigo enviado correctamente")
                setTimeout(() => {
                    setMessage("")
                }, 3000);
            }
            ).catch(error => {
                switch (error.message) {
                    case "Attempt limit exceeded, please try after some time.":
                        setError("Limite de intentos alcanzado, intentalo en un rato")
                        break;
                    default:
                        setError(error.message)
                        console.log(error)
                        break;
                }
            }

            )
    }


    const handleContinuar = () => {
        Auth.forgotPasswordSubmit(username, code, new_password)
            .then(() => {
                Alert.alert("Contraseña actualizada correctamente")
                navigation.navigate("Login")
            })
            .catch(err => {
                switch (err.message) {
                    case "Confirmation code cannot be empty":
                        setError("El codigo no puede estar vacio")
                        setErrorPassword(false)
                        setErrorCode(true)
                        break;
                    case "Invalid verification code provided, please try again.":
                        setError("Codigo incorrecto, vuelve a intentarlo")
                        setErrorPassword(false)
                        setErrorCode(true)
                        break;

                    case "Password did not conform with policy: Password not long enough":
                        setError("La contraseña debe tener minimo 8 caracteres")
                        setErrorPassword(true)
                        setErrorCode(false)
                        break;

                    case "Password did not conform with policy: Password must have uppercase characters":
                        setError("La contraseña debe tener minimo una mayuscula")
                        setErrorPassword(true)
                        setErrorCode(false)
                        break;

                    default:
                        clearErrors()
                        console.log(err)
                        break;
                }
            });


    }

    const clearErrors = () => {
        setErrorCode(false)
        setErrorPassword(false)
        setError("")
    }


    return (
        <Pressable
            style={styles.cuadro}
            onPress={() => Keyboard.dismiss()}
        >
            {error ? <Text style={{
                alignSelf: 'flex-start',
                color: 'red',
                height: 20,
                marginLeft: 10,
            }}>{error}</Text> : <View style={{ marginTop: 20, }} />}

            <TextInput
                style={{ ...styles.textInput, borderWidth: errorCode ? 1 : 0, }}
                placeholder="Codigo de verificacion"
                value={code}
                onChangeText={text => setCode(text)}
                keyboardType="phone-pad"
                onEndEditing={clearErrors}
                maxLength={6}
            />

            <View style={{ ...styles.textInput, borderWidth: errorPassword ? 1 : 0, }}>
                <TextInput
                    style={{ flex: 1, }}
                    placeholder="Nueva contraseña"
                    value={new_password}
                    onChangeText={text => setNew_pasword(text)}
                    onEndEditing={clearErrors}
                    secureTextEntry={hidePassword}
                />
                {
                    hidePassword ?
                        <Ionicons name="eye-off" size={26} color="#a0a0a0" onPress={() => setHidePassword(!hidePassword)} />
                        :
                        <Ionicons name="eye" size={26} color="#a0a0a0" onPress={() => setHidePassword(!hidePassword)} />

                }

            </View>


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


        </Pressable >
    )
}




const styles = StyleSheet.create({
    cuadro: {
        backgroundColor: 'white',
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
        backgroundColor: '#000',
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
