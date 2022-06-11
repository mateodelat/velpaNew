import { DataStore, OpType } from '@aws-amplify/datastore'
import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { moradoClaro } from '../../../../assets/constants'

import moment from "moment";
moment.locale('es')


import { ChatRoom } from '../../../models'
import { Mensaje } from '../../../models'


export default ({
    onPress,
    item,
    setChatRooms,
    index

}) => {
    let { name,
        picture,
        lastMessage,
        newMessages
    } = item

    const [timeAgo, setTimeAgo] = useState(() => moment(lastMessage?.createdAt).from(moment()));

    useEffect(() => {
        const i = setInterval(() => {
            setTimeAgo(() => moment(lastMessage?.createdAt).from(moment()))
        }, 1000)

        return () => {
            clearTimeout(i)
        }
    }, [timeAgo]);

    useEffect(() => {
        // Subscribirse a actualizaciones de mensajes nuevos
        const subscription = DataStore.observe(ChatRoom, item.id)
            .subscribe(async (msg) => {
                const newElement = msg.element
                if (msg.opType === OpType.UPDATE && !!newElement.name) {
                    const lastMessage = await DataStore.query(Mensaje, newElement?.chatRoomLastMessageId)

                    setChatRooms((existingChats) => {
                        let newChats = [...existingChats]


                        newChats[index] = {
                            ...newChats[index],
                            ...newElement,
                            lastMessage
                        }

                        newChats = newChats.sort((a, b) => a.updatedAt < b.updatedAt)
                        return [...newChats]
                    })
                }
            })

        return () => {
            subscription.unsubscribe()
        }


    }, []);

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
            <View
                style={{ flex: 1, justifyContent: 'center', }}>
                <Text
                    numberOfLines={1}
                    style={styles.titulo}>{name}</Text>
                {!!lastMessage?.content && <Text
                    numberOfLines={1}
                    style={styles.descripcion}>{lastMessage.content}</Text>}
            </View>

            {!!lastMessage?.createdAt && <Text style={{ ...styles.titulo, color: moradoClaro, }}>{timeAgo}</Text>}
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
        left: 30,

        backgroundColor: 'red',
    },

    badgeTxt: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff',
    }


})
