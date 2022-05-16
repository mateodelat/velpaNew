import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'

export default ({ titulo, backgroundColor, onPress, loading }) => {
    return (
        <Pressable onPress={loading ? null : onPress} style={{ ...styles.boton, backgroundColor }}>
            {
                loading ?
                    <ActivityIndicator
                        size={"small"}
                        color="white"
                    />

                    : <Text style={{ color: '#fff', fontSize: 18, }}>{titulo}</Text>
            }
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
