import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { colorFondo, container, getUserSub, wait } from '../../../assets/constants'
import ChatRoomItem from './components/ChatRoomItem';


import { Entypo } from '@expo/vector-icons';
import { DataStore } from '@aws-amplify/datastore';

import { ChatRoomUsuario } from '../../models';
import { Loading } from '../../components/Loading';
import { Mensaje } from '../../models';

export default ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [busqueda, setBusqueda] = useState("");

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(300).then(() => {
            setRefreshing(false)
            fetchChatRooms()
        });
    }, []);


    const [chats, setChats] = useState(null);
    useEffect(() => {
        fetchChatRooms()
    }, []);

    const fetchChatRooms = async () => {
        const sub = await getUserSub()

        // Obtener todos los chatrooms que pertenecen al usuario
        const chatRooms = await Promise.all((await DataStore.query(ChatRoomUsuario))
            .filter(e => e.usuario.id === sub).map(async e => {
                e = e.chatroom
                // Obtener el ultimo mensaje
                e = {
                    ...e,
                    lastMessage: await DataStore.query(Mensaje, e.chatRoomLastMessageId)
                }

                return e
            }))

        setChats(chatRooms)
        return chatRooms
    }

    const handleChat = (chat) => {
        const {
            id,
            name: titulo,
            picture: image
        } = chat
        navigation.navigate("ChatRoom", {
            id,
            titulo, image
        })
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            }
            style={{ ...container, borderLeftWidth: .25, }}>


            {/* Barra de busqueda */}
            <View style={{ ...styles.innerContainer, flexDirection: 'row', paddingRight: 17, }}>


                <View style={styles.lupa}>
                    <Entypo
                        name="magnifying-glass" size={25} color="black" />

                </View>

                <TextInput
                    style={styles.textInput}
                    value={busqueda}
                    placeholder="Buscar chats"
                    onChangeText={setBusqueda} />

                {busqueda.length !== 0 && <Entypo
                    onPress={() => setBusqueda("")}
                    name="cross"
                    size={24}
                    color="black"
                />}


            </View>

            {/* Lista de chatRooms */}
            <View style={styles.innerContainer}>

                {
                    !chats ?
                        <Loading indicator={true} /> :
                        chats.map((item, index) => {
                            // Ver si se pone la linea al final
                            if (index === chats.length - 1) {
                                return <ChatRoomItem
                                    key={index.toString()}
                                    onPress={() => handleChat(item)}
                                    item={item}
                                />

                            } else {
                                return <View
                                    key={index.toString()}
                                    style={{
                                        width: '100%',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ChatRoomItem
                                        onPress={() => handleChat(item)}
                                        item={item}
                                    />

                                    <View style={styles.line} />
                                </View>
                            }
                        })}
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,

        paddingVertical: 5,

        borderRadius: 15,
        marginBottom: 20,

        alignItems: 'center',
    },

    line: {
        width: "80 %",

        borderColor: colorFondo,
        borderBottomWidth: 1,
    },

    lupa: {
        width: 40,
        alignItems: 'center',
    },

    textInput: {
        padding: 10,
        flex: 1,
    }
})
