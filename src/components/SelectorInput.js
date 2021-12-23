import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { Entypo } from '@expo/vector-icons';
import { redondear } from '../../assets/constants';
import { vibrar } from '../../assets/constants/constant';

export default ({
    cantidad,
    setCantidad,

    maxValue,
    minValue,

    titulo,

    cambio,
    showSigno
}) => {

    minValue = minValue ? minValue : 0
    maxValue = maxValue ? maxValue : 10000000
    cambio = cambio ? cambio : 1

    const minReached = cantidad <= minValue
    const maxReached = (cantidad >= maxValue)



    function handleSuma() {
        vibrar('light')
        setCantidad(redondear(cantidad + cambio <= maxValue ? cantidad + cambio : maxValue, cambio))
    }

    function handleResta() {
        vibrar('light')
        setCantidad(cantidad - cambio >= minValue ? redondear(cantidad - cambio, cambio) : minValue)

    }

    function verificarNumero() {
        if (cantidad < minValue) {
            setCantidad(minValue)
        } else if (cantidad > maxValue) {
            setCantidad(maxValue)
        }


    }

    return (
        <View style={[styles.container]}>
            {/* Titulos */}
            <View style={{ flex: 1, }}>
                <Text style={styles.titulo}>{titulo}</Text>
            </View>

            {/* Numero y mas/menos */}
            <View style={styles.controlsContainer}>
                <TouchableOpacity
                    onPress={handleResta}
                    disabled={minReached}
                    style={{
                        ...styles.botonContainer,
                        opacity: minReached ? .4 : 1
                    }}>
                    <Entypo name="minus" size={24} color="#908F94" />
                </TouchableOpacity>
                <View style={{
                    borderBottomWidth: 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 5
                }}>

                    {showSigno && <Text>$</Text>}
                    <TextInput
                        keyboardType={"numeric"}
                        value={cantidad.toString()}
                        onChangeText={(c) => {
                            if (c === "") {
                                setCantidad("")
                                return
                            }
                            setCantidad(Number(c))

                        }}

                        onEndEditing={verificarNumero}
                        style={styles.cantidad}
                    />
                </View>
                <TouchableOpacity
                    onPress={handleSuma}
                    disabled={maxReached}
                    style={{
                        ...styles.botonContainer,
                        opacity: maxReached ? .4 : 1
                    }}>
                    <Entypo name="plus" size={24} color="#908F94" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
    },

    titulo: {
        fontSize: 15,
    },

    botonContainer: {
        backgroundColor: '#F0EFF4',
        width: 35,
        height: 35,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 30,
    },

    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },


    cantidad: {
        width: 45,
        textAlign: 'center',
        fontSize: 16,
        padding: 0,
    },


})
