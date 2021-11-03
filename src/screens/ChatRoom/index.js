import React, { useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { container, moradoOscuro } from '../../../assets/constants'
import Message from './components/Message';

import { Ionicons } from '@expo/vector-icons';



export default () => {
    const [message, setMessage] = useState("");

    const handleEnviar = () => {
        if (message.length === 0) return

        Alert.alert("Enviar mensaje", message)
        setMessage("")
    }

    return (
        <View style={{ ...container, paddingLeft: 10, }}>
            {/* Mensajes */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.messagesContainer}>
                <Message
                    content={"Hola, tengo una duda.Me quiero llevar perro medio latoso que no se como subirlo"}
                    person={"@GabrielGRV"}
                    time={"11:00 AM"}
                    isMe={false}
                    image={require("../../../assets/IMG/Selfie.png")}
                    firstMessagePerson={true}
                />

                <Message
                    content={"Hola, tengo una duda.Me quiero llevar perro medio latoso que no se como subirlo"}
                    person={"@GabrielGRV"}
                    time={"11:00 AM"}
                    isMe={false}
                    image={require("../../../assets/IMG/Selfie.png")}
                />

                <Message
                    content={"Ah caray el mensaje se mando dos veces"}
                    person={"@GabrielGRV"}
                    time={"11:00 AM"}
                    isMe={false}
                    image={require("../../../assets/IMG/Selfie.png")}
                />

                <Message
                    content={"Tambien tiene zarna y esta bien feo"}
                    person={"@GabrielGRV"}
                    time={"11:00 AM"}
                    isMe={false}
                    image={require("../../../assets/IMG/Selfie.png")}
                    lastMessagePerson={true}
                />

                <Message
                    content={"Perdon tu quien eres ue @GabrielGRV"}
                    person={"@UnaMorraRara"}
                    time={"11:01 AM"}
                    isMe={false}
                    image={require("../../../assets/IMG/Persona.png")}
                    lastMessagePerson={true}
                    firstMessagePerson={true}
                />

                <Message
                    content={"Que tal hablo para preguntar de la ida"}
                    person={"@mateodelat"}
                    time={"11:04 AM"}
                    isMe={true}
                    guia={true}

                    firstMessagePerson={true}
                />

                <Message
                    content={"Ya dejen de pelearse morros ya estuvo suave porfavor"}
                    person={"@mateodelat"}
                    time={"11:04 AM"}
                    isMe={true}
                />

                <Message
                    content={"Estoy bien perdido con esta app"}
                    person={"@mateodelat"}
                    time={"11:04 AM"}
                    isMe={true}
                    lastMessagePerson={true}
                />

            </ScrollView>


            {/* Captura de mensaje */}

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
