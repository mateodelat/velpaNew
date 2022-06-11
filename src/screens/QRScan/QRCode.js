import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import { colorFondo, formatAMPM, formatDia, moradoClaro, moradoOscuro } from '../../../assets/constants';

import QRCode from 'react-native-qrcode-svg';




export default function ({ handleBack, route, }) {
    const reserva = route.params


    const {
        nickname,
        fechaInicial,
        descripcion,
        imagenFondo,
        tituloAventura,
        personas
    } = reserva

    const efectivo = reserva?.tipoPago === "EFECTIVO"

    const { width } = Dimensions.get("window")

    return (
        <View style={{ flex: 1, }}>

            <View style={styles.container}>
                {/* Mostrar la aventura a pagar */}
                <View style={[styles.innerContainer, { flexDirection: 'row', }]}>
                    <Image
                        source={{ uri: imagenFondo }}
                        style={styles.imgAventura}
                    />

                    <View style={styles.adventureTextContainer}>

                        <View style={{
                            ...styles.row,
                            marginBottom: 20,
                        }}>
                            <View style={{ flex: 1, }}>


                                <View style={[styles.row, { marginTop: 0, }]}>
                                    {/* Titulo de la aventura */}
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                    }}>{tituloAventura}</Text>
                                </View>


                                <Text style={{
                                    color: moradoClaro,
                                    fontSize: 14,
                                }}>{formatDia(fechaInicial) + " a las " + formatAMPM(fechaInicial, false, true)}</Text>

                            </View>

                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{personas} <Ionicons name="person" size={16} color="black" /></Text>
                        </View>


                        <View style={styles.row}>

                            {/* Guia */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Image
                                    source={require("../../../assets/icons/guia.png")}
                                    style={styles.guiaIcon}

                                />
                                <Text style={{ color: "#0000009E", flex: 1, }}>@{nickname}</Text>

                                {
                                    efectivo ?

                                        < FontAwesome5 style={styles.iconoIzquierda} name="money-bill-wave-alt" size={22} color={moradoOscuro} />
                                        :
                                        <AntDesign name="creditcard" size={22} color={moradoOscuro} />
                                }

                            </View>
                        </View>

                        {/* Descripcion fecha */}
                        {descripcion && <Text style={{ fontSize: 10, marginTop: 10, }}>{descripcion}</Text>}
                    </View>
                </View>

                <View style={{
                    width: '100%',
                    aspectRatio: 1,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    marginTop: 10,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        borderRadius: 15,
                        overflow: 'hidden',
                        alignItems: 'center', justifyContent: 'center',

                    }}>

                        <QRCode
                            value={JSON.stringify({ reserva: reserva.id })}
                            size={width - 80}
                        />
                        <View style={{
                            width: 40,
                            height: 40,
                            position: 'absolute',
                            backgroundColor: '#fff',
                            borderRadius: 30,
                            padding: 5,

                        }}>
                            <Image source={require("../../../assets/VELPA.png")} style={{
                                width: '100%',
                                height: '100%',
                            }} />

                        </View>
                    </View>
                </View>



            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 10,
        backgroundColor: moradoOscuro,
        alignItems: 'center',

        flexDirection: 'row',

        height: 60,

    },


    imgAventura: {
        width: "33%",
        height: '100%',
    },

    adventureTextContainer: {
        padding: 10,
        paddingVertical: 15,
        paddingRight: 15,
        flex: 1,

    },



    headerTitle: {
        width: '100%',
        paddingHorizontal: 10,
        position: 'absolute',
        textAlign: 'center',

        left: 10,
        color: '#fff',

        fontSize: 25,
    },

    container: {
        flex: 1,
        backgroundColor: colorFondo,
        padding: 20,
    },

    body: {
        padding: 20,
        flex: 1,
        backgroundColor: colorFondo,
    },

    innerContainer: {
        backgroundColor: '#fff',
        padding: 20,
        paddingVertical: 10,
        borderRadius: 10,

        alignItems: 'center',

        marginBottom: 20, width: '100%',

    },

    guiaIcon: {
        width: 20,
        height: 20,
        tintColor: "#0000009E"
    },



    personasContainer: {
        paddingTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    filaPersona: {
        flexDirection: 'row',
        padding: 4,
        marginVertical: 10,
        backgroundColor: 'red',
    },

    line: {
        backgroundColor: colorFondo,
        width: '80%',
        marginVertical: 5,

        height: 1,
    },

    titulo: {
        fontSize: 18,
        color: '#AAA',
        fontWeight: 'bold',
        flex: 1,
    },
    precioTotal: {
        width: '20%',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
    },

    precioContainer: {
        flexDirection: 'row',
        marginVertical: 3,
        justifyContent: 'space-between',
    },

    innerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 20,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
    },


})