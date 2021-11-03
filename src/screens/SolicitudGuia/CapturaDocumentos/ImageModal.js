import React from 'react'
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { moradoOscuro } from '../../../../assets/constants';

const ImageModal = ({ imagen, titulo, modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.container}>


                <View style={styles.header}>
                    <Text style={styles.titulo}>{titulo}</Text>
                    <Pressable
                        onPress={() => {
                            setModalVisible(false)
                        }}
                        style={styles.button}
                    >
                        <Entypo name="cross" size={24} color="black" />
                    </Pressable>
                </View>
                <View style={styles.innerContainer}>
                    <Image
                        style={{ flex: 1, }}
                        resizeMode={"contain"}
                        source={{ uri: imagen }}
                    />
                </View>
            </View>
        </Modal >
    )
}

export default ImageModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        borderRadius: 20,
        backgroundColor: '#fff',
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 7,
    },

    innerContainer: {
        flex: 1,
        margin: 10,
        marginTop: 0,
        borderRadius: 20,
        overflow: "hidden"
    },

    header: {
        alignItems: 'center',
        // justifyContent: 'center',
        margin: 5,
        marginLeft: 10,
        flexDirection: 'row',
    },

    button: {
        borderRadius: 20,
        padding: 15,

    },

    titulo: {
        fontSize: 20,
        position: 'absolute',
        fontWeight: 'bold',
        color: moradoOscuro,
        textAlign: 'center',
        width: '100%',
    }
})
