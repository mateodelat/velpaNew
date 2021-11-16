import React, { useState } from 'react'
import { Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import { Feather, Entypo, } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { colorFondo } from '../../../../assets/constants';

const { height } = Dimensions.get("window")


export default function ({
    buscar,
    setBuscar,
    listaAventuras,
    onPress
}) {

    const handleBorrarBusqueda = () => {
        setBuscar("")
    }

    const sugested = listaAventuras.map((e, i) => {
        // Primero asignar el index a una variable
        return { ...e, index: i }
    }).filter(e => (e.titulo.toLowerCase().includes(buscar.toLowerCase()) || e.categoria.toLowerCase().includes(buscar.toLowerCase()))
    )

    return <View style={styles.headerContainer}>

        {/* Barra de busqueda */}
        <View style={{

            paddingVertical: 5,
            justifyContent: 'center',

        }}>

            <TextInput
                style={{ padding: 5, flex: 1, paddingLeft: 55, }}
                value={buscar}
                placeholder="Buscar aventuras"
                placeholderTextColor={"#7E7F84"}
                onChangeText={(value) => setBuscar(value)}
            />
            <Feather
                name="search"
                size={24}
                color="#7E7F84"
                style={{ position: 'absolute', left: 20, }}
            />
            {buscar?.length !== 0 && <Entypo
                onPress={handleBorrarBusqueda}
                style={{
                    position: 'absolute',
                    right: 10,
                }}
                name="cross"
                size={24}
                color="black"
            />
            }
        </View>


        {/* Barra de sugerencias */}
        {buscar.length > 0 && <View style={styles.sugerenciasContainer}>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {
                    sugested.length !== 0 ?
                        sugested.map((e, i) => (
                            <Pressable
                                key={i.toString()}
                                onPress={() => onPress(e, e.index)}
                                style={styles.sugerenciaItem}>
                                <Entypo
                                    name="location-pin"
                                    size={24}
                                    color="black"
                                    style={{ marginRight: 10, marginLeft: 10, }}
                                />
                                <View style={styles.txtSugestContainer}>
                                    <Text style={styles.sugerenciaTxt}>{e.titulo}</Text>

                                </View>
                            </Pressable>
                        )) : <View
                            style={styles.sugerenciaItem}>
                            <Entypo
                                name="location-pin"
                                size={24}
                                color="transparent"
                                style={{ marginRight: 10, marginLeft: 10, }}
                            />
                            <View style={styles.txtSugestContainer}>
                                <Text style={styles.sugerenciaTxt}>No hay resultados</Text>

                            </View>
                        </View>


                }
            </ScrollView>
        </View>
        }
    </View>
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 10,

        overflow: "hidden"
    },

    sugerenciasContainer: {
        padding: 10,
        backgroundColor: '#fff',
        maxHeight: height * 0.3
    },

    sugerenciaTxt: {
        fontSize: 16,
        flex: 1,
    },

    txtSugestContainer: {
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,

        borderColor: colorFondo,
        flex: 1,

        flexDirection: 'row',

    },

    sugerenciaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
