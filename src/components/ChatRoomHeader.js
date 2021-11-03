import { Feather } from "@expo/vector-icons";
import { Alert, Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import React, { useEffect, useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getChatRoomHeader, moradoClaro, validURL } from "../../assets/constants";

import { S3Image } from 'aws-amplify-react-native';


export default ({ titulo, image }) => {
    const navigation = useNavigation()

    const [data, setData] = useState({});

    const handlePress = () => {
        navigation.pop()
    }


    const handleNavigate = () => {
        Alert.alert("Navegar a detalles de participantes")


        // navigation.navigate("DetalleChatRoom", {
        //     image,
        //     titulo
        // })   
    }

    const listaUsuarios = ["@alguienpar", "@mateodelat", "@gabrielGRV"]

    return (
        <Pressable
            onPress={handleNavigate}
            style={styles.container}>
            <MaterialIcons
                name="keyboard-arrow-left"
                size={40}
                color={moradoClaro}
                onPress={handlePress} />



            <View style={styles.textosContainer}>
                <Text
                    numberOfLines={1}
                    style={styles.titulo}>{titulo}</Text>
                <Text
                    numberOfLines={1}
                    style={styles.descripcion}>{listaUsuarios.map((e) => e + " ")}</Text>

            </View>

            <Image source={image} style={styles.image} />

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