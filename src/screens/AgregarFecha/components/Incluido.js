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

    const vacio = datos.agregado?.length === 0 && datos.default?.length === 0

    const agregarItem = (texto) => {
        let nuevosDatos = {
            ...datos
        }
        nuevosDatos.agregado.push(texto)
        setDatos(nuevosDatos)
    }

    const handleRemoveItem = (idx) => {
        let agregado = [...datos.agregado]
        agregado.splice(idx, 1)


        setDatos({
            ...datos,
            agregado
        })
    }



    return (
        <View>
            {vacio && !modify ? <Text style={styles.text}>Nada incluido</Text>
                :
                <>
                    {
                        datos?.default && datos?.default?.length !== 0 ?
                            <>
                                <Text style={styles.title}>De parte de Velpa:</Text>
                                {/* Render de incluido por velpa */}
                                {datos?.default?.map((item, i) => {
                                    return <View
                                        key={i.toString()}
                                        style={styles.container}>
                                        <View style={styles.containerItem}
                                            key={"mo-" + index}
                                        >
                                            <Text
                                                style={styles.text}>{item}</Text>
                                        </View>
                                    </View>
                                })}
                                <View style={{ marginTop: 20, }} />
                            </> : null
                    }


                    <Text style={styles.title}>Por tu cuenta:</Text>
                    {datos.agregado?.length === 0 && !modify && <Text style={{
                        ...styles.text,
                        marginLeft: 5,
                    }}></Text>}
                    {/* Render de incluido por el guia */}
                    {datos?.agregado?.map((item, i) => {

                        return <View style={styles.containerItem}
                            key={i.toString()}
                        >
                            <Text
                                style={styles.text}>{item}</Text>
                            {
                                modify &&
                                <Entypo
                                    style={styles.icon}
                                    name="minus"
                                    size={30}
                                    color="red"
                                    onPress={() => handleRemoveItem(i)}
                                />


                            }
                        </View>
                    })}
                    {
                        modify &&
                        <ListaEditable
                            lista={datos}
                            agregarALista={txt => agregarItem(txt)}
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

    text: {
        fontSize: 18,
        // fontWeight: 'bold',
        color: "moradoOscuro",
        textAlign: 'center',
    },

    containerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,

        paddingVertical: 2,

        justifyContent: 'space-between',
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
        paddingHorizontal: 10,
    }

});