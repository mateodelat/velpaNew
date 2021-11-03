import React from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons';

export default ({ titulo, descripcion, tiempo, onPress, image }) => {
    return (
        <Pressable
            onPress={onPress}
            style={styles.container}>

            {/* Imagen de notificacion */}
            <Image
                style={styles.image}
                source={image}
            />

            {/* Textos */}
            <View style={styles.textos}>
                <View style={{ flex: 1, }}>
                    <Text style={styles.titulo}
                        numberOfLines={1}
                    >{titulo}</Text>
                    <Text style={styles.descripcion}>{descripcion}</Text>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                    <AntDesign name="clockcircle" size={15} color="gray" />

                    <Text style={styles.tiempo}>{tiempo}</Text>
                </View>

            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    image: {
        width: 45,
        height: 45,
        borderRadius: 60,
        marginRight: 5,
    },

    textos: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },

    titulo: {
        fontWeight: 'bold',
    },

    descripcion: {
        fontSize: 11,
        lineHeight: 13,
    },

    tiempo: {
        fontSize: 10,
        marginLeft: 4,
    }

})
