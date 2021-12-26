import React, { useState } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { formatDateShort, moradoOscuro, shadowMedia } from '../../../../assets/constants'

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Loading } from '../../../components/Loading';
import { useNavigation } from '@react-navigation/native';

export default function ({
    experiencias
}) {
    const navigation = useNavigation()

    function goToDate(titulo, imagenFondo, aventuraID) {
        navigation.navigate("FechasAventura", {
            titulo,
            imagenFondo,
            aventuraID
        })

    }

    return (
        <View>
            {
                !experiencias ?
                    <Loading indicator />
                    :
                    experiencias.map((ave, idxAve) => (
                        <View
                            key={idxAve.toString()}
                            style={[styles.innerContainer, { marginTop: idxAve ? 20 : 0, }]}>
                            <View style={styles.aventuraInfo}>
                                <Image
                                    resizeMode={"cover"}
                                    source={{ uri: ave.imagenFondo.uri }}
                                    style={styles.imagenAventura}
                                    blurRadius={1.5}
                                />
                                <View style={styles.filtroOscuro} />
                                <Text style={styles.tituloAventura}>{ave.titulo}</Text>
                            </View>

                            {/* Render de cada fecha */}
                            {
                                ave?.fechas?.map((e, idxFecha) => {
                                    const pasada = e.fechaInicial < new Date()
                                    return (
                                        <View
                                            style={{
                                                opacity: pasada ? 0.3 : 1
                                            }}
                                            key={idxFecha.toString()}>

                                            <Pressable
                                                style={styles.fechaContainer}
                                                onPress={() => goToDate(ave.titulo, ave.imagenFondo, ave.id)}>
                                                <Text style={styles.fechaTxt}>{formatDateShort(e.fechaInicial, e.fechaFinal)}</Text>
                                                <MaterialIcons
                                                    name={"keyboard-arrow-right"}
                                                    size={26}
                                                    color={moradoOscuro}
                                                />

                                            </Pressable>
                                            {/* Si es el ultimo elemento no se renderiza */}
                                            {idxFecha !== ave.fechas.length - 1 && <View style={styles.line} />}

                                        </View>
                                    )
                                }
                                )
                            }
                        </View>
                    ))}
        </View>
    )
}

const styles = StyleSheet.create({


    innerContainer: {
        // backgroundColor: '#f4f4f4',
        marginTop: 20,

        overflow: "hidden",
        borderRadius: 7,
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


    fechaContainer: {
        padding: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',

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

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

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

    filtroOscuro: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: "#00000044",
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
