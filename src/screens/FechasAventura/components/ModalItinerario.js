import React from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'


import { MaterialIcons } from '@expo/vector-icons';
import { colorFondo, moradoClaro, moradoOscuro } from '../../../../assets/constants';


const ItemItinerario = ({ detalles, onPress, titulo, horaInicial, horaFinal }) => {
    return <View style={styles.elementContainer}>
        <View style={styles.bola} />
        <View style={{
            flex: 1,
        }}>
            <Text
                numberOfLines={2}
                style={styles.title}>{titulo}</Text>
            <Text style={styles.hora}>{horaInicial} - {horaFinal}</Text>
            {detalles && <Text onPress={onPress} style={styles.detalles}>{detalles}</Text>}
        </View>
    </View>

}


const ModalItinerario = ({ setModalVisible }) => {
    const elementosItinerario = 8

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={{
                    flex: 1,
                    fontSize: 20,
                    textAlign: 'center',
                    color: moradoClaro,
                }}>ITINERARIO</Text>

                <MaterialIcons
                    onPress={() => setModalVisible(false)}
                    name={"keyboard-arrow-left"}
                    size={35}
                    color={moradoClaro}
                    style={{ position: 'absolute', left: 20, }}
                />
            </View>

            {/* Cuerpo */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.body}>
                <ItemItinerario
                    titulo={"Elemento prueba"}
                    horaInicial={"8:30 am"}
                    horaFinal={"8:30 pm"}

                    onPress={() => Alert.alert("Ver ubicacion")}
                    detalles={"Ver ubicacion"}
                />


                {
                    [...Array(elementosItinerario).keys()].map((elemento, idx) => {

                        return <ItemItinerario
                            titulo={"Elemento " + (idx + 1)}
                            horaInicial={"8:30 am"}
                            horaFinal={"9:30 am"}
                            key={idx.toString()}
                        />

                    })
                }

                <View style={{ position: 'absolute', left: 12, top: 10, }}>
                    <View style={{
                        width: 6,
                        height: elementosItinerario * 120,
                        backgroundColor: moradoClaro,
                    }} />

                </View>
            </ScrollView>

        </View>
    )
}

export default ModalItinerario

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorFondo,
        // padding: 20,
    },

    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },


    body: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 40,
    },

    elementContainer: {
        flexDirection: 'row',
        height: 120,

    },

    title: {
        color: moradoClaro,
        fontSize: 16,
        fontWeight: 'bold',
    },

    hora: {
        color: 'gray',
        fontSize: 16,
        fontStyle: "italic"
    },

    bola: {
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: moradoClaro,
        marginRight: 25,
        top: 6,
    },

    detalles: {
        marginTop: 5,
        color: 'gray',
        fontSize: 16,
        textDecorationLine: "underline"

    }

})
