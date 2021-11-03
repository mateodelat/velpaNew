import React, { useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { colorFondo, container, wait } from '../../../assets/constants'
import ChatRoomItem from './components/ChatRoomItem';


import { Entypo } from '@expo/vector-icons';

export default ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [busqueda, setBusqueda] = useState("");

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);


    const handleChat = (titulo, image) => {
        navigation.navigate("ChatRoom", {
            titulo,
            image
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
                <ChatRoomItem
                    onPress={() => handleChat("Nevado de colima 15 ago", require("../../../assets/IMG/Selfie.png"))}
                    titulo={"Nevado de colima 15 ago"}
                    descripcion={"Hola a que lugar tenemos ir?"}
                    hora={"11:00 am"}
                    image={require("../../../assets/IMG/Selfie.png")}
                    newMessages={99}

                />

                <View style={styles.line} />


                <ChatRoomItem
                    onPress={() => handleChat("Iztacihuatl 01 ene", require("../../../assets/IMG/Montana.jpg"))}
                    titulo={"Iztacihuatl 01 ene"}
                    image={require("../../../assets/IMG/Montana.jpg")}
                />

                <View style={styles.line} />


                <ChatRoomItem
                    onPress={() => handleChat("La hierbabuena", require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg"))}
                    image={require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}

                    titulo={"La hierbabuena"}
                    descripcion={"Todo listo!!"}

                    newMessages={2}

                    hora={"1:00 pm"}

                />

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
