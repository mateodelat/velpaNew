import React, { useState } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { moradoClaro, moradoOscuro, shadowMedia } from '../../../../assets/constants'

import { Entypo } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';

export default function () {
    const aventuras = [1,]

    const fechas = [1, 2,]

    function abrirItinerario() {
        Alert.alert("Abrir itinerario")

    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            {aventuras.map((e, idxAve) => (
                <View
                    key={idxAve.toString()}
                    style={styles.innerContainer}>
                    <View style={styles.aventuraInfo}>
                        <Image
                            resizeMode={"cover"}
                            source={require("../../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                            style={styles.imagenAventura} />
                        <Text style={styles.tituloAventura}>Nevado de colima</Text>
                    </View>

                    {/* Render de cada fecha */}
                    {
                        fechas.map((e, idxFecha) => {

                            return (
                                <Pressable
                                    key={idxFecha.toString()}
                                    onPress={() => Alert.alert("Ir a detalle de fecha")}
                                >

                                    <View
                                        style={styles.row}
                                    >
                                        <Entypo name="calendar" size={24} color={moradoClaro} />

                                        <View style={styles.middleContainer}>
                                            <Text style={styles.fechaTxt}>5 AGO - 9 AGO</Text>
                                        </View>
                                        <MaterialIcons
                                            name={"keyboard-arrow-right"}
                                            size={26}
                                            color={moradoOscuro}
                                        />



                                    </View>

                                    {/* Si es el ultimo elemento no se renderiza */}
                                    {idxFecha !== 1 && <View style={styles.line} />}
                                </Pressable>
                            )
                        }
                        )
                    }
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: 20,
        paddingTop: 20,
        backgroundColor: '#fff',

    },

    innerContainer: {
        marginBottom: 40,

        overflow: "hidden",
        borderRadius: 10,
    },

    aventuraInfo: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    tituloAventura: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        position: 'absolute',
    },

    imagenAventura: {
        width: '100%',
        height: 60,
    },


    row: {
        padding: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',

    },

    middleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    fechaTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    icono: {
        borderRadius: 30,
        backgroundColor: moradoOscuro + '0d',
        alignSelf: 'flex-start',
        padding: 8,
    },


    line: {
        marginHorizontal: 20,
        backgroundColor: moradoOscuro,

        borderColor: moradoOscuro,
        borderBottomWidth: 0.5,
    },

    cuadradoDatos: {
        flex: 1,
        marginVertical: 30,
        marginBottom: 20,

        alignItems: 'center',
        justifyContent: 'center',


    },


    tituloCuadro: {
        fontSize: 16,
        color: 'lightgray',
        textAlign: 'center',
    },

    botonLogo: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

        marginTop: 7,
        borderRadius: 34,
        backgroundColor: '#fff',


        width: 45,
        height: 45,

        alignItems: 'center', justifyContent: 'center',



    },


    personasContainer: {
        width: 45,
        height: 45,

        alignItems: 'center', justifyContent: 'center',
        flex: 1,
    },

    personasTxt: {
        fontSize: 25,
    },
})
