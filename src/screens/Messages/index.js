import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { colorFondo, container, getImageUrl, getUserSub, wait } from '../../../assets/constants'
import ChatRoomItem from './components/ChatRoomItem';


import { Entypo } from '@expo/vector-icons';
import { DataStore, Predicates } from '@aws-amplify/datastore';

import { ChatRoomUsuario } from '../../models';
import { Loading } from '../../components/Loading';
import { Mensaje } from '../../models';
import { Usuario } from '../../models';

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
            .filter(e => e.usuario.id === sub)
            .sort((a, b) => a.chatroom.updatedAt < b.chatroom.updatedAt)
            .map(async e => {

                // Mensajes nuevos en la relacion de usuario chat
                const { newMessages } = e

                const chatRoomUsuario = e
                e = e.chatroom
                // Obtener el ultimo mensaje
                e = {
                    ...e,
                    chatRoomUsuario,
                    newMessages,
                    picture: await getImageUrl(e.picture),
                    lastMessage: e.chatRoomLastMessageId ? await DataStore.query(Mensaje, e.chatRoomLastMessageId) : null
                }

                return e
            })
        )

        setChats(chatRooms)
        return chatRooms
    }

    const handleChat = async (chat, index) => {
        const sub = chat?.chatRoomUsuario?.usuario?.id

        try {
            // Si el chat presionado tiene nuevos mensajes restarselos a los unread del usuario
            DataStore.query(Usuario, sub)
                .then(usuario => {
                    const newMessagesUsuario = usuario?.newMessages
                    const messagesInChat = chats.newMessages

                    // Si los usuarios tienen nuevos mensajes actualizarlos
                    if (!!newMessagesUsuario && usuario) {
                        DataStore.save(Usuario.copyOf(usuario, n => {
                            n.newMessages = newMessagesUsuario - messagesInChat
                        }))
                    }

                })



            // Poner en leido los mensajes del chat para esa persona
            let newChats = [...chats]
            newChats[index].newMessages = 0
            setChats(newChats)

            DataStore.save(ChatRoomUsuario.copyOf(chat.chatRoomUsuario, n => {
                n.newMessages = 0
            }))
        } catch (e) {
            Alert.alert("Error", "Error actualizando notificaciones del chat")
            console.log(e)
        }
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
            showsVerticalScrollIndicator={false}

            style={{ ...container, borderLeftWidth: .25, }}>


            {/* Barra de busqueda */}
            <View style={{ ...styles.innerContainer, flexDirection: 'row', paddingRight: 17, }}>


                <View
                    style={styles.lupa}>
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
            <View style={{ flex: 1, }}>

                {
                    !chats ?
                        <Loading indicator={true} /> :
                        chats.length === 0 ?
                            <View
                                style={styles.container}
                            >
                                <Text style={styles.noHayTxt}>No hay mensajes</Text>
                            </View>
                            :
                            <View style={{
                                ...styles.innerContainer,
                                // marginTop: 20,
                            }}>

                                {chats.map((item, index) => {
                                    return <View
                                        key={index.toString()}
                                        style={{
                                            width: '100%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <ChatRoomItem
                                            index={index}
                                            setChatRooms={setChats}
                                            onPress={() => handleChat(item, index)}
                                            item={item}
                                        />

                                        {/* Ver si se pone la linea al final */}
                                        {index !== chats.length - 1 && <View style={styles.line} />}
                                    </View>

                                }
                                )}
                            </View>
                }
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center', justifyContent: 'center', flex: 1,
    },

    innerContainer: {
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
    },

    noHayTxt: {
        fontSize: 18,
        fontWeight: 'bold',
    }

})
