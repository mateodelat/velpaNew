import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { colorFondo } from '../../../assets/constants';

import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function ({ setModalVisible }) {

    const navigation = useNavigation()
    const [innerModal, setInnerModal] = useState(false);

    useEffect(() => {
        setInnerModal(true)
    }, []);

    const colorLogo = "#000000bb"

    function handleNuevaFecha() {
        handleCloseModal()
        navigation.navigate("SeleccionaAventura", {})
    }

    function handleNuevaAventura() {
        handleCloseModal()
        navigation.navigate("AgregarAventura")
    }

    function handleCloseModal() {
        setInnerModal(false)
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={innerModal}
                onRequestClose={() => {
                    setInnerModal(false);
                    setModalVisible(false)
                }}
            >
                <Pressable
                    onPress={handleCloseModal}
                    style={{ flex: 1, }}
                />
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Agregar</Text>
                        <Feather
                            onPress={handleCloseModal}
                            name="x"
                            size={30}
                            color="gray"
                        />
                    </View>

                    <Pressable
                        onPress={handleNuevaFecha}
                        style={styles.row}>

                        <FontAwesome
                            style={styles.icon}
                            name="calendar-plus-o"
                            size={20}
                            color={colorLogo} />
                        <Text style={styles.subTitle}>Nueva fecha en aventura</Text>

                    </Pressable>

                    <Pressable
                        onPress={handleNuevaAventura}
                        style={styles.row}>
                        <Foundation
                            style={styles.icon}
                            name="mountains"
                            size={24}
                            color={colorLogo}
                        />

                        <Foundation
                            style={styles.mas}
                            name="plus"
                            size={10}
                            color={colorLogo}
                        />

                        <Text style={styles.subTitle}>Solicitar aventura</Text>

                    </Pressable>

                </View>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000cc',

    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    innerContainer: {
        backgroundColor: colorFondo,
        padding: 15,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    icon: {
        padding: 15,
        borderRadius: 100,
        backgroundColor: '#00000022',
        marginRight: 20,
    },

    row: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },

    subTitle: {
        fontSize: 18,
    },

    mas: {
        position: 'absolute',
        left: 32,
        top: 13,
    }


})
