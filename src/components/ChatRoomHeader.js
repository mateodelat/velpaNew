import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import React, { useEffect, useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { moradoOscuro } from "../../assets/constants";
import { DataStore } from "@aws-amplify/datastore";
import API from "@aws-amplify/api";

export const getUsersInChat = /* GraphQL */ `
    query getChatRoom($id: ID!) {
        getChatRoom(id: $id) {
            Participantes(limit: 3) {
                items {
                    usuario {
                        nickname
                    }
                }
            }
        }
    }
`;


export default ({ id, titulo, image }) => {
    const navigation = useNavigation()

    const handlePress = () => {
        navigation.pop()
    }


    const handleNavigate = () => {
        // Alert.alert("Navegar a detalles de participantes")
    }

    const [listaUsuarios, setListaUsuarios] = useState(null);

    useEffect(() => {
        obtenerUsuarios()
    }, []);


    async function obtenerUsuarios() {
        await API.graphql({ query: getUsersInChat, variables: { id } })
            .then(r => {
                r = r.data.getChatRoom.Participantes.items.map(e => e.usuario.nickname)
                setListaUsuarios(r)
            })

    }


    return (
        <Pressable
            onPress={handleNavigate}
            style={styles.container}>
            <MaterialIcons
                name="keyboard-arrow-left"
                size={40}
                color={moradoOscuro}
                onPress={handlePress} />



            <View style={styles.textosContainer}>
                <Text
                    numberOfLines={1}
                    style={styles.titulo}>{titulo}</Text>
                {!listaUsuarios ?
                    <Text
                        numberOfLines={1}
                        style={styles.descripcion}></Text>

                    : listaUsuarios.length !== 0 && <Text
                        numberOfLines={1}
                        style={styles.descripcion}>{listaUsuarios?.map((e) => "@" + e + " ")}</Text>}
            </View>

            <Image source={{ uri: image }} style={styles.image} />

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',

        backgroundColor: "#fff",
        padding: 20,
        paddingVertical: 10,
        alignItems: 'center',

    },

    textosContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },

    titulo: {
        fontSize: 18,
    },

    descripcion: {
        color: '#bbb',
        flex: 1,
        fontSize: 11,
    },

    image: {
        width: 40,
        height: 40,
        borderRadius: 40,
    }
});