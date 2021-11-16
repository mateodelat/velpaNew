import { DataStore, OpType } from '@aws-amplify/datastore'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { formatAMPM, moradoClaro, moradoOscuro } from '../../../../assets/constants'

import moment from "moment";


export default ({
    onPress,
    item,

}) => {
    const { name,
        picture,
        newMessages,
        lastMessage
    } = item


    return (
        <Pressable
            onPress={onPress}
            style={styles.container}>
            <Image source={{ uri: picture }} style={styles.image} />
            {!!newMessages && <View style={styles.badge}>
                <Text
                    numberOfLines={1}
                    style={styles.badgeTxt}>{newMessages}</Text>
            </View>}
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={styles.titulo}>{name}</Text>
                {lastMessage && <Text style={styles.descripcion}>{lastMessage.content}</Text>}
            </View>

            {lastMessage && <Text style={{ ...styles.titulo, color: moradoClaro, }}>{moment(lastMessage?.createdAt).from(moment())}</Text>}
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
