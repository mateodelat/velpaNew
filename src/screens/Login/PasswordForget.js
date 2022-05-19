import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Pressable, TextInput, Alert, Keyboard } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';
import { colorFondo, moradoOscuro } from '../../../assets/constants';


export default ({ correo, setModal, navigation }) => {

    const [email, setEmail] = useState(correo);
    const [check, setCheck] = useState(false);

    const [error, setError] = useState("");

    const handleRecuperar = () => {
        if (email === "") {
            setError("El usuario no puede estar vacio")
            setCheck(false)
            return
        }
        Auth.forgotPassword(email)
            .then(() => {
                Alert.alert("Codigo enviado correctamente")
                setModal(false)
                navigation.navigate("NewPassword", { username: email })
            })
            .catch(error => {
                var errorMessage = error.message;

                console.log(error)

                switch (errorMessage) {

                    case "Username/client id combination not found.":
                        setError("Este usuario no existe")
                        setCheck(false)
                        break;

                    case "Username cannot be empty":
                        setError("El usuario no puede estar vacio")
                        setCheck(false)
                        break;

                    case "Cognito received the following":
                        setError("Error, el usuario no esta verificado")
                        setCheck(false)
                        break;

                    default:
                        setError(errorMessage)
                        setCheck(false)
                        break;
                }
            })

    }


    return (
        <View style={styles.container}>
            <Pressable
                style={styles.innerContainer}
                onPress={() => Keyboard.dismiss()}
            >
                <Pressable
                    onPress={() => setModal(false)}
                    style={styles.button}
                >
                    <Entypo name="cross" size={25} color="black" />
                </Pressable>


                {error ? <Text style={{
                    alignSelf: 'flex-start',
                    color: 'red',
                    fontSize: 18,
                    height: 22,
                    marginBottom: 10,
                }}>{error}</Text> : <Text style={{ fontSize: 18, height: 20, color: '#000', marginBottom: 10, }}>Correo electronico</Text>}


                <View style={{ ...styles.textInput, borderWidth: error !== "" ? 1 : 0, }}>
                    <TextInput
                        style={{ flex: 1, }}
                        value={email}
                        placeholder="Correo electronico"
                        onChangeText={text => setEmail(text)}
                        editable={!check}
                        onEndEditing={() => setError("")}
                    />
                    {
                        check ?
                            <View style={{ backgroundColor: '#38B000', height: 30, width: 30, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginRight: 10, }}>
                                <Entypo name="check" size={25} color="white" />
                            </View> : null
                    }

                </View>
                <Pressable
                    style={styles.boton}
                    onPress={handleRecuperar}
                    disabled={check}
                >
                    <Text style={{ color: '#fff', fontSize: 18, }}>Enviar codigo</Text>
                </Pressable>

            </Pressable>

        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'flex-end',
    },
    innerContainer: {
        flex: 1,
        borderRadius: 20,
        elevation: 5,
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,


    },
    textInput: {
        backgroundColor: '#ebebeb',
        height: 50,
        width: '100%',
        paddingLeft: 20,
        borderRadius: 7,
        flexDirection: 'row',
        borderColor: 'red',
        fontSize: 14,
        alignItems: 'center',
    },

    boton: {
        alignItems: 'center',
        height: 50,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 7,
        overflow: 'hidden',
        backgroundColor: moradoOscuro,
        marginTop: 30,
    },

    button: {
        marginBottom: 30,
    }



})
