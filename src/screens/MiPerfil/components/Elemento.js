import React from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';


export default function Elemento({ icono, texto, onPress, loading }) {
    return (
        <Pressable
            onPress={onPress}
            style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <View style={{
                width: 40,
                alignItems: 'center', justifyContent: 'center',
            }}>
                {loading ? <ActivityIndicator
                    color={"black"}
                    size={"large"}
                /> : icono}
            </View>

            <Text style={{
                flex: 1,
                marginLeft: 10,
                fontSize: 16,
                fontWeight: 'bold',
            }}>{texto}</Text>

            <MaterialIcons
                name={"keyboard-arrow-right"}
                size={40}
                color={"black"}
            />

        </Pressable>
    )
}
