import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native'
import { colorFondo, moradoOscuro } from '../../../../assets/constants'

import { Entypo } from '@expo/vector-icons';
import ListaEditable from './ListaEditable';


export default ({
    datos,
    modify,
    setDatos
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
            {vacio && !modify ? <Text style={{
                fontSize: 18,
                // fontWeight: 'bold',
                textAlign: 'center',
            }}>Nada que llevar</Text>
                :
                <>
                    {datos.map((e, i) => {
                        const guardarTitulo = (titulo) => {
                            let nuevosDatos = [...datos]
                            nuevosDatos[i][0] = titulo

                            setDatos(nuevosDatos)
                        }

                        return <View
                            key={i.toString()}
                            style={styles.container}>

                            {
                                modify ?
                                    <View style={{
                                        alignItems: 'flex-start',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        <TextInput
                                            value={e[0]}
                                            onChangeText={guardarTitulo}
                                            style={styles.titleInput}
                                        />
                                        {/* <Text style={styles.titleInput}>:</Text> */}

                                    </View>
                                    :
                                    <Text style={styles.title}>{e[0]}:</Text>
                            }
                            {datos[i][1]?.map((item, index) => {

                                if (modify) {
                                    const submitValor = (value) => {
                                        let nuevosDatos = [...datos]

                                        nuevosDatos[i][1][index] = value

                                        setDatos([...nuevosDatos])
                                    }

                                    const handleRemoveItem = () => {
                                        let newData
                                        newData = datos

                                        newData[i][1].splice(index, 1)

                                        // Si ya no hay elementos, se borra el titulo tambien
                                        if (newData[i][1].length === 0) {
                                            newData.splice(i, 1)
                                        }

                                        setDatos([...newData])
                                    }


                                    return (
                                        <View
                                            key={index.toString()}
                                            style={styles.row}>
                                            <TextInput
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
                                            {/* <Text style={styles.text}>• </Text> */}
                                            <Text
                                                style={styles.text}>{item}</Text>
                                        </Text>

                                    )

                                }

                            })
                            }
                            {
                                modify &&
                                <ListaEditable
                                    lista={datos}
                                    agregarALista={txt => agregarItem(txt, i)}
                                />

                            }


                        </View>
                    })}
                    {
                        modify &&
                        <ListaEditable
                            preview={"Agregar categoria"}
                            lista={datos}
                            textStyle={{
                                textAlign: 'center',
                                color: moradoOscuro,
                            }}

                            colorMas={moradoOscuro}
                            agregarALista={agregarCategoria}
                        />
                    }


                </>
            }
        </View>
    )
}




const styles = StyleSheet.create({
    info: {
        fontSize: 17,
    },


    ///////////////////////
    title: {
        fontSize: 18,
        color: moradoOscuro,
    },

    titleInput: {
        fontSize: 18,
        color: moradoOscuro,
        padding: 5,
        paddingBottom: 0,

        marginBottom: 6,

        borderBottomWidth: 0.5,
        borderBottomColor: moradoOscuro,

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
        padding: 4,
        paddingBottom: 0,
        borderBottomWidth: 0.5,

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
});