import React, { useState } from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

export default ({ personasReservadas, personasTotales }) => {
    const tamañoFotos = 15

    const [verTodo, setVerTodo] = useState(false);

    const length = personasReservadas.length > 3 ? 3 : personasReservadas.length

    let totalPersonas = 0
    personasReservadas.map(e => {
        totalPersonas += (e.personasReservadas)
    })

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
                    personasReservadas?.map((persona, idx) => {
                        // Solo renderizar 3 primeras imagenes
                        if (idx > 2) return
                        return (
                            <Image
                                key={idx.toString()}
                                source={persona.foto ? { uri: persona.foto } : require("../../../../assets/user.png")}
                                style={{
                                    ...styles.imagenPersonas,
                                    borderWidth: persona.foto ? 3 : 0,
                                    left: tamañoFotos * idx,
                                }}
                            />

                        )
                    })
                }


                <View style={{
                    marginLeft:
                        !verTodo ? length && ((30 + (tamañoFotos * (length - 1))) + 5) : 5,

                    flexDirection: 'row',
                    flex: 1,
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                    }}>{totalPersonas} / {personasTotales}</Text>
                    <Text style={{
                        marginLeft: 4,
                        fontWeight: 'normal',
                        color: '#00000060',
                    }}>Personas</Text>
                </View>

                {!!length && <Pressable
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

                </Pressable>}
            </View>


            {verTodo && <View style={{ marginTop: 10, }}>
                {
                    personasReservadas.map((persona, idx) => {
                        return (
                            <View
                                key={idx.toString()}
                                style={{
                                    marginBottom: 5,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                <Image
                                    source={persona.foto ? { uri: persona.foto } : require("../../../../assets/user.png")}
                                    style={{
                                        ...styles.imagenPersonas,
                                        borderWidth: persona.foto ? 3 : 0,
                                        position: 'relative',
                                        marginRight: 10,
                                    }}
                                />
                                <Text style={{
                                    flex: 1,
                                    color: "gray",
                                }}>@{persona.nickname}</Text>
                                <Text style={{
                                    color: "gray",
                                }}>{persona.personasReservadas} </Text>
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
