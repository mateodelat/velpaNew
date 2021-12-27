import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { moradoClaro, moradoOscuro } from '../../../../assets/constants'

const { width } = Dimensions.get("screen")

export default function ({
    content,
    person,
    time,
    isMe,
    image,

    guia,

    lastMessagePerson,
    firstMessagePerson,

    diferentToPreviousTime,

    onPress,

    newDay
}) {

    // SI EL EMISOR ES EL USUARIO
    if (isMe) return (
        <View
            style={{
                ...styles.container, marginBottom: lastMessagePerson ? 25 : 5,
                marginTop: newDay && !firstMessagePerson ? 10 : 0,
            }}>
            {/* Mensaje */}
            <View style={{ alignItems: 'flex-end', }}>

                <View>
                    {firstMessagePerson ?
                        <View style={{
                            height: 20,
                            bottom: 15,
                            marginBottom: 5,
                        }}>
                            {/* Truco para poner la hora y persona al final */}
                            <Text style={{ ...styles.contentTxt, color: 'transparent', }}>{content}</Text>

                            <View style={styles.infoContainer}>
                                <Text
                                    numberOfLines={1}
                                    style={{ ...styles.headerMe, right: 0 }}>
                                    <Text>{person}, </Text>
                                    {newDay && <Text>{newDay} </Text>}
                                    <Text>{time}</Text>
                                </Text>

                                {guia && <Text style={styles.guia}>Guia</Text>}

                            </View>

                        </View>
                        :
                        diferentToPreviousTime && <View style={{
                            height: 20,
                            alignItems: 'flex-end',
                        }}>
                            <View style={styles.infoContainer}>
                                {newDay && <Text style={{
                                    ...styles.headerMe,
                                    right: 0,
                                }}>{newDay} </Text>}

                                <Text style={{
                                    ...styles.headerMe,
                                    right: 0,
                                }}>{time}</Text>
                            </View>

                        </View>
                    }
                </View>

                {/* Contenedor de mensaje */}
                <View style={{ ...styles.content, borderBottomRightRadius: lastMessagePerson ? 4 : 15, backgroundColor: moradoClaro, }}>
                    <Text style={{ ...styles.contentTxt, color: '#fff', }}>{content}</Text>
                </View>
            </View>
        </View >
    )





    // Si el emisor es alguien mas
    return (
        <View style={{
            ...styles.container,
            marginTop: newDay && !firstMessagePerson ? 10 : 0,
            marginBottom: lastMessagePerson ? 25 : 5,
        }}>
            {/* Emisor y hora */}

            {/* Imagen y mensaje */}
            <View style={{ flexDirection: 'row', }}>
                {/* Imagen */}
                <View style={styles.imageContainer}>
                    {lastMessagePerson ? <View style={styles.image}>
                        <Image source={image ? { uri: image } : require("../../../../assets/user.png")} style={{ width: '100%', height: '100%', }} />
                    </View>
                        :
                        <View style={{ width: 30, flex: 1, }} />
                    }
                </View>

                {/* Contenedor de mensaje */}
                <View >
                    {firstMessagePerson ?
                        <View style={{ ...styles.infoContainer, bottom: 0 }}>
                            {/* <Text style={{ ...styles.contentTxt, color: 'transparent', }}>{content}</Text> */}

                            <Text
                                numberOfLines={1}
                                style={styles.header}>
                                <Text>{person}, </Text>
                                {newDay && <Text>{newDay} </Text>}
                                <Text>{time}</Text>
                            </Text>
                            {guia && <Text style={styles.guia}>Guia</Text>}

                        </View>
                        :
                        diferentToPreviousTime && <View style={styles.infoContainer}>
                            <Text style={styles.header}>
                                {newDay && <Text>{newDay} </Text>}
                                {time}
                            </Text>
                        </View>


                    }
                    <View style={{
                        ...styles.content,
                        borderBottomLeftRadius: lastMessagePerson ? 4 : 15

                    }}>
                        <Text style={{
                            ...styles.contentTxt,
                        }}>{content}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
    },

    header: {
        flexDirection: 'row',
        fontSize: 12,
        fontWeight: 'bold',
        color: "black"
    },
    headerMe: {
        fontSize: 12,
        fontWeight: 'bold',
        right: 30,
        color: "black"

    },
    content: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        maxWidth: (width * 0.85) - 50,
        flexDirection: 'row',
    },

    imageContainer: {
        justifyContent: 'flex-end',
        marginRight: 10,
    },

    image: {
        top: 10,
        width: 30,
        height: 30,

        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 30,

        overflow: "hidden"
    },

    contentTxt: {
        fontSize: 14, color: 'black',
    },

    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: (width * 0.85) - 50,
        marginBottom: 4,

    },

    guia: {
        color: moradoOscuro,
        fontWeight: 'bold',
        marginLeft: 10,
    }
})
