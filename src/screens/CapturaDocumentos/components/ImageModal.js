import React from 'react'
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { moradoOscuro } from '../../../../assets/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default ({ imagen, titulo, modalVisible, setModalVisible }) => {
    const insets = useSafeAreaInsets()
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.container}>


                <View style={{
                    ...styles.header,
                    height: insets.top ? insets.top + 50 : 60,

                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                        <Text style={styles.titulo}>{titulo}</Text>
                        <Pressable
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            style={styles.button}
                        >
                            <Feather name="x" size={30} color="#fff" />
                        </Pressable>

                    </View>
                </View>
                <View style={styles.innerContainer}>
                    <Image
                        style={{ flex: 1, }}
                        resizeMode={"cover"}
                        source={{ uri: imagen }}
                    />
                </View>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    innerContainer: {
        flex: 1,
        // margin: 10,
        marginTop: 0,
        // borderRadius: 20,
        overflow: "hidden"
    },

    header: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: moradoOscuro,

    },

    button: {
        borderRadius: 20,
        padding: 15,

    },

    titulo: {
        fontSize: 20,
        position: 'absolute',
        fontWeight: 'bold',
        color: "#fff",
        textAlign: 'center',
        width: '100%',
    }
})
