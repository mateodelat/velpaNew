import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Entypo } from '@expo/vector-icons';


export default function ({
    usuario,
    hideNumResenas
}) {
    if (usuario?.numResenas) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', }}>{!usuario.calificacion ? 0 : (Math.round(usuario.calificacion * 100) / 100)}</Text>

                <Entypo name="star" size={22} color="#F5BE18" />
                {!hideNumResenas && <Text style={{ fontSize: 16, marginLeft: 5, }}>({usuario.numResenas})</Text>}

            </View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({})
