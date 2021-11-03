import React from 'react'
import { Pressable, Text, StyleSheet, View, Linking, Alert } from 'react-native'

import { Fontisto } from '@expo/vector-icons';

export default function ContactoWhatsapp() {
    function handleLinkWhatsapp() {
        Alert.alert("Abrir link de whatsapp", "Abrir link de whatsapp para contactar con Velpa", [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "OK",
                onPress: () => Linking.openURL("https://wa.link/tg8kxl")
            },
        ])

    }

    return (
        <Pressable
            onPress={handleLinkWhatsapp}
            style={styles.container}>
            <Fontisto name="whatsapp" size={50} color="white" />
        </Pressable>
    )
}
// Precio de guia: 400
// Precio mostrado a cliente: 480
// Precio 1 cliente: 1210

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#25D366',
        padding: 15,
        borderRadius: 30,
    }
});