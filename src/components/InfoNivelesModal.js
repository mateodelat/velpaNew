import React from 'react'
import { Alert, Modal, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { calculateLvl, colorFondo, levels, moradoOscuro } from '../../assets/constants';
import HeaderModal from '../screens/AgregarFecha/components/HeaderModal';

import { Entypo } from '@expo/vector-icons';

import UserLevel from './UserLevel';

export default function ({
    setModalVisible,
    modalVisible,

    userExp
}) {
    const {
        lvl,
    } = calculateLvl(userExp)


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
                rightIcon={
                    <Entypo
                        onPress={() => Alert.alert("Info", "Los niveles determinan cuanto ganas de el precio pagado por el cliente en cada reservacion")}
                        style={{
                            position: 'absolute', right: 10,
                        }}
                        name="help"
                        size={25}
                        color={moradoOscuro}
                    />
                }

                handleSave={() => {
                    console.log("Guardar")
                }}



                handleCerrar={() => setModalVisible(false)}
                titulo={"Informacion niveles"}
            />


            {/* Cuerpo */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.body}>

                <UserLevel
                    userExp={userExp}
                    hideHelp
                    style={{
                        marginBottom: 30,
                    }}
                />

                <View style={styles.innerContainer}>
                    <Text style={styles.titulo}>Como ganar experiencia</Text>
                    <View style={{
                        marginLeft: 10,
                    }}>

                        <Text style={{ ...styles.tituloNivel, marginBottom: 5, }}>Reservaciones (precio por persona)</Text>
                        <Text style={{ ...styles.descripcion, marginLeft: 5, }}>Reservacion de menos de $150: <Text style={{ fontWeight: 'bold', }}>+1 exp</Text></Text>
                        <Text style={{ ...styles.descripcion, marginLeft: 5, }}>Reservacion de $150 a $400: <Text style={{ fontWeight: 'bold', }}>+2 exp</Text></Text>
                        <Text style={{ ...styles.descripcion, marginLeft: 5, }}>Reservacion de mas de 400$: <Text style={{ fontWeight: 'bold', }}>+3 exp</Text></Text>
                        <Text style={{ ...styles.descripcion, marginBottom: 15, marginLeft: 5, }}>Cada $500 extra: <Text style={{ fontWeight: 'bold', }}>+1 exp</Text></Text>

                        <Text style={styles.tituloNivel}>Buena reputacion</Text>
                        <Text style={{ ...styles.descripcion, marginLeft: 5, }}>Calificacion de 4 o 5: <Text style={{ fontWeight: 'bold', }}>+3 exp</Text></Text>
                        <Text style={{ ...styles.descripcion, marginLeft: 5, }}>Calificacion de 1 o 2: <Text style={{ fontWeight: 'bold', }}>-3 exp</Text></Text>
                    </View>
                </View>


                <View style={styles.innerContainer}>
                    <Text style={styles.titulo}>Niveles</Text>

                    <View style={{
                        marginLeft: 10,
                    }}>
                        {
                            [...Array(6).keys()].map(e => (
                                <View
                                    key={e}
                                    style={styles.levelContainer}>
                                    {lvl === e + 1 && <View style={styles.badgeLevel} />}

                                    <Text style={styles.tituloNivel}>Nivel {e + 1}</Text>
                                    <Text style={styles.descripcion}>Ganancia: <Text style={{ fontWeight: 'bold', }}>{100 - levels[e + 1].comisionVelpa * 100}%</Text></Text>
                                    <Text style={styles.descripcion}>Experiencia necesaria: <Text style={{ fontWeight: 'bold', }}>{levels[e + 1].expBaseLevel} exp</Text></Text>
                                </View>
                            ))
                        }


                    </View>

                </View>


                <View style={{ marginBottom: 20, }} />

            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    body: {
        padding: 20,
        flex: 1,
    },

    tituloNivel: {
        fontSize: 16,
        color: '#000',
    },

    descripcion: {
        color: '#555',
    },

    innerContainer: {
        backgroundColor: "#f4f4f4",
        borderRadius: 7,
        padding: 15,
        marginBottom: 20,
    },

    titulo: {
        fontSize: 18,
        color: moradoOscuro,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    experienceContainer: {
        width: 110,
        height: 110,
        backgroundColor: '#f4f4f4',
        borderRadius: 120,
        alignItems: 'center', justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 10,
    },

    experience: {
        fontSize: 25,
        color: moradoOscuro,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,

    },

    badgeLevel: {
        height: 5,
        width: 5,
        backgroundColor: moradoOscuro,
        borderRadius: 5,
        position: 'absolute',
        left: -15,
    },

    levelContainer: {
        marginBottom: 10,
        justifyContent: 'center',
    }

})
