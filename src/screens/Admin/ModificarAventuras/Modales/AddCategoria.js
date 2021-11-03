import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, Keyboard, Pressable, StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'
import { Entypo } from '@expo/vector-icons';


import { API, Storage } from 'aws-amplify';
import { getBlob, createCategoria, openImagePickerAsync } from '../../../../../assets/constants/index.js';

// Funcion que tiene un boton para esconder el modal y un id de guia para fetcharlo
export default ({ setModalVisible, data, setData }) => {
    const id = "cat" + data?.length

    const [titulo, setTitulo] = useState("");
    const [editing, setEditing] = useState(false);
    const [imagen, setImagen] = useState({ uri: "", key: "" });
    const [subiendo, setSubiendo] = useState(false);

    const handleSubmit = () => {

        if (titulo.length === 0) {
            Alert.alert("Error", "El titulo debe tener algo")
        }

        if (imagen.key.length === 0) {
            Alert.alert("Error", "Error con la imagen vuelve a intentarlo")
        }

        // Crear datos en database
        API.graphql({
            query: createCategoria, variables: {
                input: {
                    id,
                    foto: imagen.key,
                    titulo
                }
            }
        }).then(r => {
            let newData = [...data]
            newData.push({
                foto: {
                    uri: imagen.uri,
                    key: imagen.key
                },
                titulo,
                id,
            })

            Alert.alert("Exito", "Categoria creada con exito", [{
                text: "OK",
                onPress: () => {
                    setModalVisible(false)
                    setData(newData)

                }
            }])
        })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error subiendo los datos")
            })
    }

    const handleChangeImage = async () => {
        const image = await openImagePickerAsync().catch(e => {
            console.log(e)
            Alert.alert("Error", "Error abriendo selector de imagenes")
        })
        if (!image) return
        setSubiendo(true)
        const key = "cat-" + id + "imagenFondo" + ".jpg"
        const blob = await getBlob(image)

        // Subir imagen
        await Storage.put(key, blob)
            .then(async r => {
                setImagen({
                    key,
                    uri: image,
                })
            })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error subiendo imagen")
                setSubiendo(false)
            })
            .finally(r => setSubiendo(false))

    }

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        onPress={() => setModalVisible(false)}
                        style={styles.button}
                    >
                        <Entypo name="cross" size={25} color="black" />
                    </Pressable>

                    <Pressable
                        onPress={handleSubmit}
                        style={{
                            position: 'absolute',
                            right: 20,
                            padding: 8,
                        }}
                    >
                        <Entypo name="check" size={25} color="green" />
                    </Pressable>

                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                    }}>Crear categoria</Text>
                </View>

                {/* Body */}
                <View style={styles.body}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        onPress={() => Keyboard.dismiss()}
                    >
                        {/* Titulo */}
                        <View style={styles.titleContainer}>
                            <Text style={{
                                fontSize: 12,
                                color: editing ? 'blue' : "black",
                            }}>Nombre</Text>
                            <TextInput
                                onTouchStart={() => setEditing(true)}
                                onEndEditing={() => setEditing(false)}
                                style={{
                                    textAlign: 'center',
                                    borderColor: editing ? 'blue' : "black",
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}
                                value={titulo}
                                placeholder="   Titulo categoria   "
                                onChangeText={setTitulo} />
                        </View>

                        {/* Imagen */}
                        <View style={styles.imageContainer}>
                            <Text style={{
                                fontSize: 16,
                                color: "black",
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}>Imagen:</Text>
                            {
                                subiendo ?
                                    <View style={{
                                        width: '100%',
                                        height: 550,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text>Subiendo imagen...</Text>
                                        <ActivityIndicator
                                            size={"large"}
                                            color={"black"}
                                        />
                                    </View>
                                    :
                                    <Pressable
                                        onPress={handleChangeImage}
                                        style={{
                                            width: '100%',
                                            borderRadius: 20,
                                            resizeMode: 'contain',
                                            height: 550,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {imagen.uri.length !== 0 ?
                                            <Image
                                                style={{
                                                    width: '100%',
                                                    height: 550,
                                                    resizeMode: 'contain',
                                                }}
                                                source={{ uri: imagen.uri }}
                                            />
                                            :
                                            <Entypo
                                                name="image"
                                                size={50}
                                                color="black"
                                            />
                                        }
                                    </Pressable>}

                        </View>
                    </ScrollView>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // Estilos del modal
    modalView: {

        flex: 1,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingBottom: 20,
    },
    centeredView: {
        flex: 1,
        padding: 15,
    },

    header: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    button: {
        position: 'absolute',
        left: 20,
        padding: 8,
    },


    // Estilos del body
    imageContainer: {
        width: '100%',
        marginTop: 20,

    },

    body: {
        overflow: 'hidden',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,

        marginHorizontal: 20,
        flex: 1,

    }
})
