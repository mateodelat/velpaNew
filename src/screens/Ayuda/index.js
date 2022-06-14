import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { container } from '../../../assets/constants'

export default function () {
    return (
        <View style={container}>
            <Text>Pantalla de ayuda</Text>
            <Text>Solicitudes de ayuda</Text>
            <Text>Pantalla de ayuda</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',

    }
})