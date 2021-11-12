import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { Feather } from '@expo/vector-icons';

import { colorFondo, moradoOscuro } from '../../../../assets/constants';


export default ({
    tamañoCuadrado,
    onPress,
    style,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                borderRadius: 15,
                overflow: "hidden",
                width: tamañoCuadrado,
                height: tamañoCuadrado,
                marginBottom: 20,
                ...style
            }}>
            {/* Imagenes */}
            <View style={{
                backgroundColor: colorFondo,
                flex: 1,
                alignItems: 'center', justifyContent: 'center',

            }}>
                <Feather name="plus" size={50} color={moradoOscuro} />
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    puntitoSelected: {
        backgroundColor: colorFondo,
        borderRadius: 10,
        position: 'absolute',
        left: 10,
        top: 10,
        opacity: 0.8,
        padding: 5,
    },

    puntitoInterior: {
        width: 10,
        height: 10,
        borderRadius: 10,

    }
})
