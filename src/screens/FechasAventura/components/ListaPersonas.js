import React, { useState } from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

export default ({ personasReservadas, personasTotales }) => {
    const tamañoFotos = 15
    const lenght = 3

    const [verTodo, setVerTodo] = useState(false);


    return (
        <View style={styles.listaPersonasContainer}>
            <View style={{
                flexDirection: 'row',
                height: 30,
                alignItems: 'center',
            }}>

                {/* Calcular el ancho de las fotos */}


                {
                    !verTodo &&
                    [...Array(lenght).keys()].map((foto, idx) => {
                        return (
                            <Image
                                key={idx.toString()}
                                source={{ uri: "https://thispersondoesnotexist.com/image" }}
                                style={{
                                    ...styles.imagenPersonas,
                                    left: tamañoFotos * idx,
                                }}
                            />

                        )
                    })
                }


                <View style={{
                    marginLeft: (30 + (tamañoFotos * (lenght - 1))) + 5,
                    flexDirection: 'row',
                    flex: 1,
                }}>
                    <Text style={{
                        letterSpacing: 3,
                        fontWeight: 'bold',
                    }}>{personasReservadas}/{personasTotales}</Text>
                    <Text style={{
                        marginLeft: 4,
                        letterSpacing: 0,
                        fontWeight: 'normal',
                        color: '#00000060',
                    }}>Personas</Text>
                </View>
                <Pressable
                    onPress={() => setVerTodo(!verTodo)}
                >
                    <Text
                        style={{
                            marginLeft: 4,
                            letterSpacing: 0,
                            fontWeight: 'normal',
                            color: '#00000060',
                            padding: 5,
                        }}>{verTodo ? "Ocultar" : "Ver"}</Text>

                </Pressable>
            </View>


            {verTodo && <View style={{ marginTop: 10, }}>
                {
                    [...Array(lenght).keys()].map((foto, idx) => {
                        return (
                            <View
                                key={idx.toString()}
                                style={{
                                    marginBottom: 5,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                <Image
                                    source={{ uri: "https://thispersondoesnotexist.com/image" }}
                                    style={{
                                        ...styles.imagenPersonas,
                                        position: 'relative',
                                        marginRight: 10,
                                    }}
                                />
                                <Text style={{
                                    flex: 1,
                                    color: "gray",
                                }}>@elfnd</Text>
                                <Text style={{
                                    color: "gray",
                                }}>1 </Text>
                                <Ionicons name="ios-person" size={20} color={"lightgray"} />
                            </View>

                        )
                    })
                }
            </View>}

        </View >)
}


const styles = StyleSheet.create({
    listaPersonasContainer: {
        marginBottom: 20,
    },

    imagenPersonas: {
        width: 30,
        height: 30,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#fff",

        position: 'absolute',
    }

})
