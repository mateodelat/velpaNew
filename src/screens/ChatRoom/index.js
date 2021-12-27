import React, { useEffect, useState } from 'react'
import { Alert, FlatList, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { container, formatDateShort, getUserSub, moradoOscuro } from '../../../assets/constants'
import MessageComponent from './components/Message';

import { Ionicons } from '@expo/vector-icons';
import { DataStore, OpType } from '@aws-amplify/datastore';
import { ChatRoom, Mensaje } from '../../models';
import { Loading } from '../../components/Loading';

import API from '@aws-amplify/api';
import { sendPushNotification } from '../../../assets/constants/constant';
import { ChatRoomUsuario } from '../../models';
import { Usuario } from '../../models';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/stack';

const getUsersInChat = /* GraphQL */ `
    query getChatRoom($id: ID!) {
        getChatRoom(id: $id) {
            Participantes {
                items {
                    id
                    newMessages
                    usuario {
                        id
                        nickname
                        foto
                        notificationToken
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
        await DataStore.save(new Mensaje({
            content: message,
            chatroomID,
            usuarioID
        })).then(async lastMessage => {
            setMessage("")


            // Configurar cambiar el chat para que el mensaje sea el ultimo
            const chatroom = await DataStore.query(ChatRoom, chatroomID)
            DataStore.save(ChatRoom.copyOf(chatroom, chat => {
                chat.lastMessage = lastMessage
            }))

            // Mandar notificaciones de nuevo mensaje a todos los participantes del grupo
            // Agregar 1 a cada newMessages chatRoomUsuario de los participantes
            listaUsuarios.filter(e => e.id !== usuarioID).map(async e => {
                // Actualizar nuevos mensajes del Chat
                const model = await DataStore.query(ChatRoomUsuario, e.usuarioChatRoomId)
                const newMessages = !model.newMessages ? 0 : model.newMessages
                DataStore.save(ChatRoomUsuario.copyOf(model, n => {
                    n.newMessages = newMessages + 1
                }))

                // Actualizar nuevos mensajes del usuario
                const userModel = await DataStore.query(Usuario, e.id)
                const newUserMessages = userModel.newMessages
                DataStore.save(Usuario.copyOf(userModel, n => {
                    n.newMessages = newUserMessages + 1
                }))


                sendPushNotification({
                    title: "Nuevo mensaje en " + chatroom.name,
                    descripcion: lastMessage.content + " @" + listaUsuarios.find(e => e.id === usuarioID)?.nickname,

                    token: e.notificationToken
                })

            })

        })


    }

    useEffect(() => {
        fectchData()
        const subscription = DataStore.observe(Mensaje, msg => msg.chatroomID("eq", chatroomID))
            .subscribe((msg) => {
                // Subir solo si es la primera solicitud
                if (msg.opType === OpType.INSERT) {
                    setChatMessages((existingMessages) => [{
                        ...msg.element,
                        createdAt: msg.element.createdAt ? msg.element.createdAt : new Date().getTime()
                    }, ...existingMessages])
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
            .then(async r => {
                return r
            })


        // Obtener chatrooms usuario en el chat para nombres y mensajes nuevos
        await API.graphql({ query: getUsersInChat, variables: { id: chatroomID } })
            .then(r => {

                r = r.data.getChatRoom.Participantes.items.map(e => ({
                    ...e.usuario,
                    usuarioChatRoomId: e.id,
                    newMessages: e.newMessages
                }))

                setListaUsuarios(r)
            })


        setChatMessages(mensajes)

    }

    function formatAMPM(dateInMs, hideAMPM, localTime) {

        const date = new Date(dateInMs)
        var hours = date[localTime ? "getHours" : "getUTCHours"]();
        var minutes = date[localTime ? "getMinutes" : "getUTCMinutes"]();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;


        var strTime = hours + ':' + minutes;

        !hideAMPM ? strTime += " " + ampm : null


        return strTime;
    }
    const headerHeight = useHeaderHeight()
    const insets = useSafeAreaInsets()
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight - insets.bottom + 10 : headerHeight + 40}

            style={{ ...container, paddingLeft: 10, }}>
            {!chatMessages ? <Loading indicator /> :

                <FlatList
                    inverted
                    showsVerticalScrollIndicator={false}
                    data={chatMessages}
                    renderItem={({ item, index }) => {

                        const isMe = item.usuarioID === usuarioID

                        const date = new Date(item.createdAt)
                        const prevDate = index !== chatMessages.length - 1 ? new Date(chatMessages[index + 1]?.createdAt) : null

                        const hora = formatAMPM(date, false, true)

                        const lastMessagePerson = !index ? true : item.usuarioID !== chatMessages[index - 1].usuarioID
                        const firstMessagePerson = index === chatMessages.length - 1 ? true : item.usuarioID !== chatMessages[index + 1].usuarioID

                        // Ver si renderizar otro de hora
                        const horaAnteriorMsg = index !== chatMessages.length - 1 ? formatAMPM(chatMessages[index + 1]?.createdAt, false, true) : null
                        const diferentToPreviousTime = horaAnteriorMsg !== hora

                        const newDay = index !== chatMessages.length - 1 ? date.getDate() !== prevDate.getDate() || date.getMonth() !== prevDate.getMonth() : true

                        const usuarioMsg = listaUsuarios.find(usr => {
                            return usr.id === item.usuarioID
                        })



                        return <MessageComponent

                            newDay={newDay ? formatDateShort(date) : false}

                            key={index.toString()}
                            content={item.content}
                            person={"@" + usuarioMsg?.nickname}
                            time={hora}
                            isMe={isMe}
                            diferentToPreviousTime={diferentToPreviousTime}
                            image={usuarioMsg?.foto}
                            firstMessagePerson={firstMessagePerson}
                            lastMessagePerson={lastMessagePerson}
                        // guia={true}
                        />

                    }}
                />
            }

            <View style={{
                paddingBottom: insets.bottom,

            }}>

                <View style={{
                    ...styles.footerContainer,
                }}>
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

        </KeyboardAvoidingView>
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
