import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Entypo } from '@expo/vector-icons';
import { vibrar } from '../../assets/constants/constant';

export default ({
    cantidad,
    setCantidad,

    maxReached,
    maxValue,

    minValue,

    titulo,
    descripcion,

    style,
}) => {

    minValue = minValue ? minValue : 0
    maxValue = maxValue ? maxValue : false

    const minReached = cantidad <= minValue
    maxReached = maxReached ? maxReached : (maxValue ? cantidad >= maxValue : false)



    function handleSuma() {
        vibrar('light')
        setCantidad(cantidad + 1)
    }

    function handleResta() {
        vibrar('light')
        setCantidad(cantidad - 1)

    }

    return (
        <View style={[styles.container, style]}>
            {/* Titulos */}
            <View style={{ flex: 1, }}>
                <Text style={styles.titulo}>{titulo}</Text>
                {descripcion && <Text style={styles.descripcion}>{descripcion}</Text>}
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
                <Text style={styles.cantidad}>{cantidad}</Text>
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
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },

    titulo: {
        fontSize: 18,
        // fontWeight: 'bold',
    },

    descripcion: {
        fontSize: 14,
        color: '#aaa',

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
        width: 40,
        textAlign: 'center',
        fontSize: 16,
    }

})
