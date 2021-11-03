import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { moradoClaro, moradoOscuro } from '../../../../assets/constants'


export default ({
    titulo,
    descripcion,
    hora,
    image,
    onPress,
    newMessages
}) => {

    return (
        <Pressable
            onPress={onPress}
            style={styles.container}>
            <Image source={image} style={styles.image} />
            {!!newMessages && <View style={styles.badge}>
                <Text
                    numberOfLines={1}
                    style={styles.badgeTxt}>{newMessages}</Text>
            </View>}
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={styles.titulo}>{titulo}</Text>
                {(descripcion && descripcion.length !== 0) && <Text style={styles.descripcion}>{descripcion}</Text>}
            </View>

            <Text style={{ ...styles.titulo, color: moradoClaro, }}>{hora}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 15,
        alignItems: 'center',
    },

    image: {
        width: 40,
        height: 40,
        borderRadius: 33,
        marginRight: 10,
    },

    titulo: {
        lineHeight: 15,
        marginBottom: 1,
        fontSize: 16,
        color: '#000',

    },

    descripcion: {
        fontSize: 13,
        color: '#999',
    },

    badge: {
        position: 'absolute',
        borderRadius: 10,
        height: 15,
        width: 15,
        alignItems: 'center', justifyContent: 'center',

        top: 10,
        left: -4,

        backgroundColor: 'red',
    },

    badgeTxt: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff',
    }


})
