import React from 'react'

import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { moradoOscuro } from '../../../../../assets/constants'

export default ({ setModalVisible, image, condiciones }) => {
    return (
        <View style={styles.modalInfo}>
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    alignItems: 'center',
                    marginTop: 40,
                }}>
                    <View style={styles.imageInfoContainer}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: 250,
                                height: 200,
                            }}
                            source={image}
                        />
                    </View>

                </View>
                <View style={styles.textInfoContainer}>
                    <Text style={{
                        fontSize: 19,
                        fontWeight: 'bold',
                    }}>
                        Requisitos de la fotografía:
                    </Text>

                    <View style={{
                        marginTop: 15,

                    }}>
                        {condiciones.map((condicion, i) => (
                            <View
                                key={i}
                                style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 4, }}>
                                <View style={{ width: 4, height: 4, backgroundColor: '#000', borderRadius: 4, marginRight: 15, }} />
                                <Text style={{ fontSize: 16, }}>{condicion}</Text>
                            </View>

                        ))}
                    </View>
                </View>
            </View>
            <Pressable
                style={styles.closeInfoModal}
                onPress={() => {
                    setModalVisible(false)
                }} >
                <Text style={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Entendido</Text>
            </Pressable>
        </View>)
}

const styles = StyleSheet.create({


    modalInfo: {
        flex: 1,
        backgroundColor: '#fff',
    },

    closeInfoModal: {
        padding: 15,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: moradoOscuro,
    },

    imageInfoContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: "#fafafa",
        borderRadius: 6,
    },

    textInfoContainer: {
        marginTop: 30,
        paddingHorizontal: 40,
        flex: 1,
    }
})
