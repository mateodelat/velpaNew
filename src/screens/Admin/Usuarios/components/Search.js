import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Feather } from '@expo/vector-icons';

import React, { useState } from 'react'

export default function () {
    const [buscar, setBuscar] = useState("");

    function handleSearchPlace(r) {
        setBuscar(r)

    }

    function clearSugested() {
        Keyboard.dismiss()
        setBuscar("")
    }

    return (
        <View
            style={{
                ...styles.buscarContainer,
            }}>
            <Feather
                name="search"
                size={25}
                color="#7E7F84"
                style={{ position: 'absolute', marginLeft: 10, }}
            />

            <TextInput
                style={{
                    flex: 1,
                    marginLeft: 45,
                }}
                value={buscar}
                placeholder="Buscar usuario"
                onChangeText={handleSearchPlace}
            />

            {!!buscar && <Feather
                onPress={clearSugested}
                name="x"
                size={25}
                color="#7E7F84"
                style={{ marginRight: 5, position: 'absolute', bottom: 10, right: 10, }}
            />}

        </View>
    )
}

const styles = StyleSheet.create({

    buscarContainer: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,

        height: 50,
        justifyContent: 'center',
        margin: 10,


    },
})