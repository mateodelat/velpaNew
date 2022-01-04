import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Pressable, TextInput, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';
import { colorFondo, createUsuario, handleGoogle, isAlphaNumeric, moradoClaro, moradoOscuro } from '../../../assets/constants';
import Boton from './components/Boton';



export default function Register({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true);

    // Variables del texto
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");

    const [errorNombre, setErrorNombre] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [error, setError] = useState("");


    const clearError = () => {
        setErrorPassword(false)
        setErrorEmail(false)
        setErrorNombre(false)
        setError("")
    }

    const handleRegistrarse = () => {
        if (nombre.length < 4) {
            clearError()
            setError("El usuario tiene que ser mayor a 4 caracteres")
            setErrorNombre(true)
            return
        }

        if (email === "") {
            clearError()
            setError("El correo no puede estar vacio")
            setErrorEmail(true)
            return
        }
        if (password === "") {
            clearError()
            setError("La contraseña no puede estar vacia")
            setErrorPassword(true)
            return
        }


        Auth.signUp({
            username: email,
            password,
            attributes: {
                email,
                nickname: nombre
            }
        }).then((user) => {
            //Una vez le damos a registrar, se crea el nuevo perfil con la api key
            createUsuario({
                nickname: nombre,
                sub: user.userSub
            }, true).then(r => {
                navigation.navigate("Confirm", { email })
                clearError()

                setNombre("")
                setEmail("")
                setPassword("")
            })


        }).catch((error) => {
            switch (error.message) {
                case "Invalid email address format.":
                    clearError()
                    setErrorEmail(true)
                    setError("Email no invalido")

                    break;

                case "Password cannot be empty":
                    clearError()
                    setErrorPassword(true)
                    setError("La contraseña no puede estar vacia")

                    break;

                case "User already exists":
                    clearError()
                    setErrorEmail(true)
                    setError("La cuenta ya existe por favor inicia sesion")

                    break;

                case "Username cannot be empty":
                    clearError()
                    setErrorEmail(true)
                    setError("El correo puede estar vacio")

                    break;

                case "Password did not conform with policy: Password must have uppercase characters":
                    clearError()
                    setErrorPassword(true)
                    setError("La contraseña debe contener minimo una mayuscula")

                    break;

                case "Password did not conform with policy: Password not long enough":
                    clearError()
                    setErrorPassword(true)
                    setError("La contraseña debe contener minimo 8 caracteres")

                    break;

                case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\\S]+.*[\\S]+$":
                    clearError()
                    setErrorPassword(true)
                    setError("La contraseña debe ser alfanumerica")

                    break;

                default:
                    clearError()
                    console.log(error)
                    setError(error.message)
                    break;
            }
        });

    }

    const handleLogin = () => {
        navigation.pop()
        navigation.navigate("Login", { username: nombre })
    }

    const handleFace = () => {
        Alert.alert("Actualmente no manejamos login con Facebook")

    }
    const handlePhone = () => {
        console.log("Registrarse con apple")
    }


    return (
        <Pressable
            style={styles.cuadro}
            onPress={() => Keyboard.dismiss()}
        >
            <View style={styles.header}>
                <Image source={require('../../../assets/VELPA.png')} style={{ width: 100, height: 100, }} />
            </View>
            <View style={{
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 10,
                // flex: 1,
            }}>

                <View style={styles.body}>
                    <Text style={{ fontSize: 18, marginVertical: 5, }}>Nombre de usuario</Text>
                    <View style={{ ...styles.textInput, borderWidth: errorNombre ? 1 : 0, marginTop: 0, }}>
                        <TextInput
                            style={{ flex: 1, }}
                            // placeholder="Nombre de usuario"
                            value={nombre}
                            onChangeText={text => {
                                setNombre(text)
                            }}
                            onEndEditing={clearError}
                        />

                    </View>

                    <Text style={{ fontSize: 18, marginVertical: 5, }}>Correo electronico</Text>
                    <TextInput
                        style={{ ...styles.textInput, borderWidth: errorEmail ? 1 : 0, marginTop: 0, }}
                        // placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        onEndEditing={clearError}

                    />

                    <Text style={{ fontSize: 18, marginVertical: 5, }}>Contraseña</Text>
                    <View style={{ ...styles.textInput, borderWidth: errorPassword ? 1 : 0, marginTop: 0, }}>
                        <TextInput
                            style={{ flex: 1, }}
                            // placeholder="Contraseña"
                            secureTextEntry={hidePassword}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            onEndEditing={clearError}

                        />

                        {
                            hidePassword ?
                                <Ionicons name="eye-off" size={26} color="#a0a0a0" onPress={() => setHidePassword(!hidePassword)} />
                                :
                                <Ionicons name="eye" size={26} color="#a0a0a0" onPress={() => setHidePassword(!hidePassword)} />

                        }

                    </View>
                </View>
                {error ? <Text style={{
                    alignSelf: 'flex-start',
                    color: 'red',
                    height: 20,
                    marginLeft: 10,
                }}>{error}</Text> : <View style={{ marginTop: 20, }} />}

                <Boton
                    onPress={handleRegistrarse}
                    titulo={"Registrarse"}
                    backgroundColor={moradoOscuro}
                />

                {/* ----------- o ------------ */}
                <View style={{ borderTopWidth: 1, marginTop: 30, borderColor: 'lightgray', }} />
                <Text style={{ backgroundColor: '#fff', alignSelf: 'center', paddingHorizontal: 20, bottom: 10, marginBottom: 10, }}>o</Text>



                {/* Boton de google */}
                <Pressable onPress={handleGoogle} style={styles.boton}>
                    <Image source={require('../../../assets/GoogleIcon.png')} style={{ width: 25, height: 25, }} />
                    <Text style={{ color: '#fff', fontSize: 18, }}>   Registrarse con Google</Text>
                </Pressable>


                <View style={{ justifyContent: 'flex-end', }}>
                    <Text style={{ textAlign: 'center', color: '#8C8FA2' }}>Ya tienes cuenta?
                        <Text onPress={handleLogin} style={{ color: '#689ADA', }}> Iniciar Sesion</Text>
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

    body: {
        // alignItems: 'center',
        // justifyContent: 'center',
        marginBottom: 10,
    },

    textInput: {
        backgroundColor: '#F4F6F6',
        height: 50,
        width: '100%',
        paddingHorizontal: 20,
        borderRadius: 7,
        marginVertical: 7,
        flexDirection: 'row',
        borderColor: "red",
        alignItems: 'center',
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
