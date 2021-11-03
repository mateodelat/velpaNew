import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { moradoClaro, moradoOscuro } from '../../../../assets/constants'

export default ({ texto, onPress, selected }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: selected ? moradoOscuro : '#F4F6F6',

                borderRadius: 10,
                width: 95,

                alignItems: 'center', justifyContent: 'center',
            }}>
            <Text style={{
                color: selected ? '#fff' : "#000",
                fontSize: 16,
            }}>{texto}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({})
