import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native'
import { colorFondo, moradoOscuro } from '../../../../assets/constants'

import { Entypo } from '@expo/vector-icons';
import ListaEditable from './ListaEditable';


export default ({
    datos,
    setDatos,
    modify
}) => {

    const vacio = datos.length === 0

    const agregarCategoria = (texto) => {
        let nuevosDatos = [...datos]
        nuevosDatos.push([
            texto, []
        ])

        setDatos(nuevosDatos)

    }

    const agregarItem = (texto, indexCat) => {
        let nuevosDatos = [...datos]

        nuevosDatos[indexCat][1].push(texto)

        setDatos(nuevosDatos)
    }

    return (
        <View>

            {datos.map((e, i) => {
                const guardarTitulo = (titulo) => {
                    let nuevosDatos = [...datos]
                    nuevosDatos[i][0] = titulo

                    setDatos(nuevosDatos)
                }
                const handleRemoveTitulo = () => {
                    let newData
                    newData = datos

                    // Borrar categoria
                    newData.splice(i, 1)

                    setDatos([...newData])
                }



                return <View
                    key={i.toString()}
                    style={styles.container}>

                    {modify ? <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',

                        justifyContent: 'center',
                    }}>
                        <TextInput
                            autoCapitalize="sentences"
                            value={e[0]}
                            onChangeText={guardarTitulo}
                            style={styles.titleInput}
                        />
                        <Entypo
                            style={{ position: 'absolute', right: 10, }}
                            name="minus"
                            size={30}
                            color="red"
                            onPress={handleRemoveTitulo}
                        />

                    </View> : <Text style={styles.title}>{e[0]}:</Text>
                    }
                    {datos[i][1]?.map((item, index) => {

                        const submitValor = (value) => {
                            let nuevosDatos = [...datos]

                            nuevosDatos[i][1][index] = value

                            setDatos([...nuevosDatos])
                        }

                        const handleRemoveItem = () => {
                            let newData
                            newData = datos

                            newData[i][1].splice(index, 1)

                            setDatos([...newData])
                        }

                        if (modify) {
                            return (
                                <View
                                    key={index.toString()}
                                    style={styles.row}>
                                    <TextInput
                                        autoCapitalize="sentences"

                                        value={item}
                                        onChangeText={submitValor}
                                        style={styles.itemInput}
                                    />

                                    <Entypo
                                        style={styles.icon}
                                        name="minus"
                                        size={30}
                                        color="red"
                                        onPress={handleRemoveItem}
                                    />


                                </View>

                            )
                        } else {
                            return (
                                <Text style={styles.containerItem}
                                    key={"mo-" + index}
                                >
                                    <Text
                                        style={styles.text}>{item}</Text>
                                </Text>

                            )

                        }

                    })
                    }
                    {modify && < ListaEditable
                        lista={datos}
                        agregarALista={txt => agregarItem(txt, i)}
                        showMas
                    />}



                </View>
            })}
            {modify && <ListaEditable
                preview={"Categoria"}
                lista={datos}
                colorMas={"transparent"}
                textStyle={{
                    color: moradoOscuro,
                    textAlign: 'center'
                }}
                agregarALista={agregarCategoria}
            />}
        </View>
    )
}




const styles = StyleSheet.create({
    titleInput: {
        fontSize: 17,
        color: moradoOscuro,
        padding: 5,

        marginBottom: 6,

        backgroundColor: "#f4f6f6",
        borderRadius: 7,


        textAlign: 'center',


    },

    container: {
        marginBottom: 20,
    },

    containerItem: {
        padding: 5,

        marginLeft: 5,
    },

    text: {
        fontSize: 17,
        padding: 4,
    },


    itemInput: {
        fontSize: 17,
        padding: 5,

        backgroundColor: "#f4f6f6",

        flex: 1,
    },


    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
    },

    icon: {
        padding: 10,

    },

    title: {
        fontSize: 18,
        color: moradoOscuro,
    },

});