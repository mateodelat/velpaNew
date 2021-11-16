import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { container, formatAMPM, getUserSub, moradoOscuro } from '../../../assets/constants'
import MessageComponent from './components/Message';

import { Ionicons } from '@expo/vector-icons';
import { DataStore, OpType } from '@aws-amplify/datastore';
import { ChatRoom, Mensaje } from '../../models';
import { Loading } from '../../components/Loading';
import { ChatRoomUsuario } from '../../models';
import API from '@aws-amplify/api';

export const getUsersInChat = /* GraphQL */ `
    query getChatRoom($id: ID!) {
        getChatRoom(id: $id) {
            Participantes {
                items {
                    usuario {
                        id
                        nickname
                        foto
                    }
                }
            }
        }
    }
`;


export default ({ route }) => {
    const [message, setMessage] = useState("");
    const [usuarioID, setUsuarioID] = useState(null);
    const [listaUsuarios, setListaUsuarios] = useState([]);

    const [chatMessages, setChatMessages] = useState(null);


    const { id: chatroomID } = route.params

    const handleEnviar = async () => {
        if (message.length === 0 || !usuarioID) return

        // Guardar el mensaje
        const lastMessage = await DataStore.save(new Mensaje({
            content: message,
            chatroomID,
            usuarioID
        }))

        // Configurar cambiar el chat para que el mensaje sea el ultimo
        const chatroom = await DataStore.query(ChatRoom, chatroomID)
        await DataStore.save(ChatRoom.copyOf(chatroom, chat => {
            chat.lastMessage = lastMessage
        }))


        setMessage("")
    }

    useEffect(() => {
        fectchData()
        const subscription = DataStore.observe(Mensaje, msg => msg.chatroomID("eq", chatroomID))
            .subscribe((msg) => {
                if (msg.opType === OpType.UPDATE) {
                    setChatMessages((existingMessages) => [msg.element, ...existingMessages])
                }
            })

        return () => subscription.unsubscribe()
    }, []);

    const fectchData = async () => {
        const sub = await getUserSub()
        setUsuarioID(sub)
        const mensajes = await DataStore.query(Mensaje, me => me.chatroomID("eq", chatroomID),
            {
                sort: e => e.createdAt("DESCENDING")
            })


        // Obtener participantes del chat
        await API.graphql({ query: getUsersInChat, variables: { id: chatroomID } })
            .then(r => {
                r = r.data.getChatRoom.Participantes.items.map(e => e.usuario)
                setListaUsuarios(r)
            })


        setChatMessages(mensajes)

    }

    return (
        <View style={{ ...container, paddingLeft: 10, }}>
            {!chatMessages ? <Loading indicator /> :

                <FlatList
                    inverted
                    showsVerticalScrollIndicator={false}
                    data={chatMessages}
                    renderItem={({ item, index }) => {

                        const isMe = item.usuarioID === usuarioID
                        let hora = new Date(item.createdAt)
                        hora = formatAMPM(hora, false, true)


                        const lastMessagePerson = !index ? true : item.usuarioID !== chatMessages[index - 1].usuarioID
                        const firstMessagePerson = index === chatMessages.length - 1 ? true : item.usuarioID !== chatMessages[index + 1].usuarioID

                        // Ver si renderizar otro de hora
                        const horaAnteriorMsg = !index ? null : formatAMPM(chatMessages[index - 1].createdAt, false, true)
                        const diferentToPreviousTime = !index ? true : horaAnteriorMsg !== hora


                        const usuarioMsg = listaUsuarios.find(usr => {
                            return usr.id === item.usuarioID
                        })

                        return <MessageComponent
                            key={index.toString()}
                            content={item.content}
                            person={"@" + usuarioMsg?.nickname}
                            time={hora}
                            isMe={!isMe}
                            diferentToPreviousTime={diferentToPreviousTime}
                            image={usuarioMsg?.foto}
                            firstMessagePerson={firstMessagePerson}
                            lastMessagePerson={lastMessagePerson}
                        // guia={true}
                        />

                    }}
                />
            }

            <View style={styles.footerContainer}>
                {/* Contenedor blanco */}
                <TextInput
                    onSubmitEditing={handleEnviar}
                    style={styles.capturaMensaje}
                    value={message}
                    placeholder="Escribe tu mensaje..."
                    onChangeText={setMessage}
                />

                {message.length !== 0 && <Pressable
                    onPress={handleEnviar}
                    style={styles.enviar}>
                    <Ionicons name="send" size={24} color="white" />
                </Pressable>}
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    messagesContainer: {
        flex: 1,
    },

    footerContainer: {
        flexDirection: 'row',
        marginTop: 20,
        height: 50,
        alignItems: 'center',
    },

    capturaMensaje: {
        backgroundColor: '#fff',
        padding: 10,
        paddingLeft: 15,
        borderRadius: 500,
        flex: 1,

    },

    enviar: {
        backgroundColor: moradoOscuro,
        width: 48,
        height: 48,
        borderRadius: 50,
        marginLeft: 10,
        alignItems: 'center', justifyContent: 'center',
    }
})
