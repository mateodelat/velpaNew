import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moradoOscuro } from '../../../../assets/constants'

import { Ionicons } from '@expo/vector-icons';


export default function ({ handleQR, trash }) {
    return (
        <Pressable
            onPress={handleQR}
            style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                width: 41,
                height: 41,
                borderRadius: 40,
            }}>
            <Ionicons
                style={{
                    padding: 5,
                    borderRadius: 30,
                }}

                name={trash ? "md-trash" : "ios-qr-code"}
                size={20}
                color={moradoOscuro}
            />

        </Pressable>)
}