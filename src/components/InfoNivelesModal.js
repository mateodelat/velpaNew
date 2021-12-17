import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import HeaderModal from '../screens/AgregarFecha/components/HeaderModal';

export default function ({
    setModalVisible,
    modalVisible
}) {

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <HeaderModal
                handleCerrar={() => setModalVisible(false)}
                titulo={"Informacion niveles"}
            />

        </Modal>
    )
}

const styles = StyleSheet.create({})
