import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, Keyboard, Pressable, StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'
import { Entypo } from '@expo/vector-icons';

import { API, Storage } from 'aws-amplify';
import { getBlob, updateCategoria, deleteCategoria, openImagePickerAsync } from '../../../../../assets/constants/index.js';

// Funcion que tiene un boton para esconder el modal y un id de guia para fetcharlo
export default ({ setModalVisible, indexCategoria, data, setData }) => {
    const categoria = data[indexCategoria]
    const { titulo: title, foto } = categoria


    const [titulo, setTitulo] = useState(title);
    const [editing, setEditing] = useState(false);
    const [imagen, setImagen] = useState({ uri: foto.uri, key: foto.key });
    const [subiendo, setSubiendo] = useState(false);

    const handleSubmit = () => {
        if (titulo.length === 0) {
            Alert.alert("Error", "El titulo debe tener algo")
        }

        if (imagen.key.length === 0) {
            Alert.alert("Error", "Error con la imagen vuelve a intentarlo")
        }

        // Actualizar en database
        API.graphql({
            query: updateCategoria, variables: {
                input: {
                    id: categoria.id,
                    foto: imagen.key,
                    titulo
                }
            }
        }).then(r => {
            let newData = [...data]
            newData[indexCategoria].foto = {
                uri: imagen.uri,
                key: imagen.key
            }

            newData[indexCategoria].titulo = titulo

            console.log(newData)
            setData(newData)
            Alert.alert("Exito", "Categoria actualizada con exito", [{
                text: "OK",
                onPress: () => setModalVisible(false)
            }])
        })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error subiendo los datos")
            })
    }

    const handleDelete = () => {

        // Actualizar en database
        API.graphql({
            query: deleteCategoria, variables: {
                input: {
                    id: categoria.id,
                }
            }
        }).then(r => {
            let newData = [...data]
            newData.splice(indexCategoria, 1)

            Alert.alert("Exito!!", "Categoria borrada con exito", [{
                text: "OK",
                onPress: () => {
                    setModalVisible(false)
                    setData(newData)
                }
            }])
        })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error borrando los datos")
            })
    }

    const handleChangeImage = async () => {
        const image = await openImagePickerAsync().catch(e => {
            console.log(e)
            Alert.alert("Error", "Error abriendo selector de imagenes")
        })
        if (!image) return
        setSubiendo(true)
        const key = "cat-" + categoria.id + "imagenFondo" + ".jpg"
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
                    }}>Editar {title}</Text>
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

                                    >
                                        <Image
                                            style={{
                                                width: '100%',
                                                borderRadius: 20,
                                                resizeMode: 'contain',
                                                height: 550,
                                            }}
                                            source={{ uri: imagen.uri }}
                                        />
                                    </Pressable>
                            }

                        </View>
                    </ScrollView>
                    <Pressable
                        style={{ alignSelf: 'center', backgroundColor: '#fff', padding: 5, }}
                        onPress={() => {
                            Alert.alert("Borrar", "Seguro que quieres borrar esta categoria?", [{
                                text: "OK",
                                onPress: () => handleDelete()
                            }])

                        }}
                    >
                        <Text style={styles.borrar}>Borrar</Text>
                    </Pressable>

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

    },


    borrar: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    }

})
