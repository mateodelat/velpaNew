import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

export default ({ titulo, backgroundColor, onPress }) => {
    return (
        <Pressable onPress={onPress} style={{ ...styles.boton, backgroundColor }}>
            <Text style={{ color: '#fff', fontSize: 18, }}>{titulo}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    boton: {
        marginVertical: 10,
        alignItems: 'center',
        height: 50,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 7,
    }
})
