import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons';


export default function ({ style,
    onPress
}) {
    return (
        <Pressable
            onPress={onPress ? onPress : null}
            style={[styles.container, style]}>
            <Entypo
                name="help"
                size={14}
                color="#fff"
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightgray",
        padding: 5,
        alignSelf: 'center',
        borderRadius: 20,


    }
})
