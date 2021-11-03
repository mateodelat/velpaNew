import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { container } from '../../../assets/constants'

export default function ({ route }) {
    const { aventura } = route.params

    return (
        <View style={container}>
            <Text>Solicitar permiso para aventura {aventura.titulo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
