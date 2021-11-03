import React, { useState } from 'react'
import { Alert, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
// import DetalleAventuraScreen from '../../../Explorar/3DetalleAventura/DetalleAventuraScreen';
import API from '@aws-amplify/api';
import { createAventura } from '../../../../../assets/constants';

const { width } = Dimensions.get('screen');
// Funcion que tiene un boton para esconder el modal y un id de guia para fetcharlo
export default ({ setModalVisible, setData, data, indexCategoria }) => {

    const categoria = data[indexCategoria]

    const aventuraID = categoria.id + "ave" + categoria.Aventuras.items.length

    const aventuraDefault = {
        id: aventuraID,
        imagenFondo: "",
        imagenDetalle: [],
        precioMin: 0,
        precioMax: 0,
        duracion: "",
        descripcionCorta: "",
        descripcionLarga: "",

        materialObligatorio: [],
        materialOpcional: [],
        materialAcampada: [],
        alimentacion: [],
        materialIncluido: [],

        categoriaID: categoria.id,

        dificultad: 0,

        comision: 0.2,

    }

    const [aventura, setAventura] = useState(aventuraDefault);

    const addAventura = () => {
        // Regular imagenes para solo keys
        const imagenDetalle = aventura.imagenDetalle.map(i => {
            return i.key
        })
        const imagenFondo = aventura.imagenFondo.key

        // Verificar valores
        if (imagenDetalle.length === 0) {
            Alert.alert("Error", "Agrega imagenes")
            return
        }

        if (!aventura.titulo) {
            Alert.alert("Error", "Agrega el titulo de la aventura")
            return
        }
        if (!aventura.precioMax) {
            Alert.alert("Error", "Agrega el precio maximo")
            return
        }

        if (aventura.duracion.length === 0) {
            Alert.alert("Error", "Agrega una duracion")
            return
        }

        if (!aventura.dificultad) {
            Alert.alert("Error", "Agrega la dificultad")
            return
        }

        if (aventura.descripcionCorta.length === 0) {
            Alert.alert("Error", "Agrega una descripcion corta")
            return
        }

        if (aventura.descripcionLarga.length === 0) {
            Alert.alert("Error", "Agrega una descripcion larga")
            return
        }

        if (!aventura.ubicacionNombre) {
            Alert.alert("Error", "Agrega el nombre de la ubicacion inicial")
            return
        }

        if (!imagenFondo) {
            Alert.alert("Error", "Agrega una imagen de fondo")
            return
        }

        const newAventura = {
            ...aventura,
            imagenDetalle,
            imagenFondo
        }
        let newData = [...data]

        newData[indexCategoria].Aventuras.items.push({
            id: aventura.id,
            titulo: aventura.titulo
        })


        API.graphql({
            query: createAventura, variables: {
                input: {
                    ...aventura,
                    imagenDetalle,
                    imagenFondo
                }
            }
        }).then(r => {
            console.log(r)
            Alert.alert("Exito!!", "Aventura creada con exito", [
                {
                    text: "OK",
                    onPress: () => {
                        setData([...newData])
                        setModalVisible(false)
                    }
                }
            ])
        }).catch(e => {
            console.log(e)
            Alert.alert("Error", "Error creando la aventura")
        })
    }

    return (
        <View style={styles.centeredView}
            onPress={() => setModalVisible(false)}
        >
            <View style={styles.modalView}>
                <View style={{
                    overflow: 'hidden',
                    borderRadius: 20,
                    flex: 1,
                }}>

                    <View style={styles.header}>
                        <Pressable
                            onPress={() => setModalVisible(false)}
                            style={styles.button}
                        >
                            <Entypo name="cross" size={25} color="black" />
                        </Pressable>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}>{aventura.titulo ? aventura.titulo : ("Agregar a " + categoria.titulo.toLowerCase())}</Text>
                        <Pressable
                            onPress={addAventura}
                            style={{
                                position: 'absolute',
                                right: 20,
                                padding: 8,
                            }}
                        >
                            <Entypo name="check" size={25} color="green" />
                        </Pressable>

                    </View>
                    <DetalleAventuraScreen
                        aventura={aventura}
                        setAventura={setAventura}
                        editar={true}
                        width={width - 70}
                        add={true}
                    />

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
    }
})
