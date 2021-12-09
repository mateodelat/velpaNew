import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, TextInput, Pressable, Linking, Modal } from 'react-native'


import { MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import {
    colorFondo,
    formatAMPM,
    moradoClaro,
    moradoOscuro,
    shadowMedia,
    formatDia,
    msInMinute,
    abrirEnGoogleMaps
} from '../../assets/constants';
import HeaderModal from '../screens/AgregarFecha/components/HeaderModal';
import ModalMap from './ModalMap';



const ItemItinerario = ({

    item,
    idx,
    nuevoDia,

    abrirUbicacion

}) => {
    const {
        titulo,
        hora,
        ubicacionNombre,
        ubicacionLink,

    } = item

    return <View style={{
        ...styles.elementContainer,
        height: 120,
    }}>
        {/* Si el primer indice es 0 se renderiza con marginTop bajo*/}
        {/* Se agregar el boton de add en el primer item */}
        {(!idx) ? <View style={styles.diaContainer}>
            <Text style={styles.dayTxt}>{formatDia(item.hora)}</Text>

        </View> :
            // Si esa actividad esta en nuevo dia se pone el letrero
            nuevoDia ? <View style={styles.diaContainer}>
                <Text style={styles.dayTxt}>{formatDia(item.hora)}</Text>

            </View> : null}
        <View style={styles.bola} />

        {/* Titulo */}
        <View style={{
            flex: 1,
            marginTop: 10,
        }}>
            <Text
                numberOfLines={2}
                style={styles.title}>{titulo}</Text>



            {/* Hora */}
            <Text style={styles.hora}>{formatAMPM(hora)}</Text>

            {/* Ubicacion */}
            {ubicacionNombre &&
                <Pressable
                    onPress={abrirUbicacion}
                    style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text
                        numberOfLines={1}
                        style={styles.ubicacion}>{ubicacionNombre}</Text>
                    <Entypo
                        name="location-pin"
                        size={30}
                        color={moradoOscuro}
                    />

                </Pressable>
            }
        </View>
    </View >

}


const ModalItinerario = ({
    setModalVisible,
    itinerario,
    modalVisible,

    puntoReunion

}) => {
    // Variable del mapa
    const [modalMapVisible, setModalMapVisible] = useState(false);

    const handleCerrar = () => {
        setModalVisible(false)
    }



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
                <HeaderModal
                    titulo={"Itinerario"}

                    handleCerrar={handleCerrar}
                    editAllowed={false}
                />


                <ScrollView
                    showsVerticalScrollIndicator={false}
                >


                    {/* Cuerpo */}
                    <View
                        showsVerticalScrollIndicator={false}
                        style={styles.body}>
                        {
                            itinerario.map((elemento, idx) => {
                                var nuevoDia = false

                                const fechaActual = new Date(itinerario[idx].hora)

                                // Ver si el dia de la actividad es distinto al anterior
                                if (idx && fechaActual.getUTCDay() !== (new Date(itinerario[idx - 1].hora).getUTCDay())) {
                                    nuevoDia = true
                                }


                                return <View
                                    key={idx.toString()}
                                >



                                    <ItemItinerario
                                        item={elemento}
                                        key={idx.toString()}

                                        abrirUbicacion={() => setModalMapVisible(true)}

                                        idx={idx}
                                        nuevoDia={nuevoDia}
                                    />
                                </View>

                            })
                        }

                        <View style={{ position: 'absolute', left: 67, top: 10, }}>
                            <View style={{
                                width: 6,
                                height: (itinerario.length - 1) * 120,
                                backgroundColor: moradoClaro,
                            }} />

                        </View>
                    </View>
                </ScrollView>

                <ModalMap
                    setModalVisible={setModalMapVisible}
                    modalVisible={modalMapVisible}
                    selectedPlace={puntoReunion}
                />
            </View>
        </Modal>

    )
}

export default ModalItinerario

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    body: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 40,
        marginLeft: 20,
    },

    elementContainer: {
        flexDirection: 'row',
        height: 120,
        paddingLeft: 55,

    },

    title: {
        color: moradoClaro,
        fontSize: 16,
        fontWeight: 'bold',
    },

    textInput: {
        color: moradoClaro,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: "#F4F6F6",
        borderRadius: 7,
        padding: 5,
        paddingLeft: 10,

        borderColor: "red",

        flex: 1,
    },

    hora: {
        color: 'gray',
        fontSize: 16,
        fontStyle: "italic",
        marginTop: 5,

    },

    bola: {
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: moradoClaro,
        marginRight: 25,
        top: 6,
    },

    ubicacion: {
        marginTop: 5,
        color: 'gray',
        fontSize: 16,
        textDecorationLine: "underline",
        flex: 1,

    },

    diaContainer: {
        justifyContent: 'center',
        position: 'absolute',
        marginTop: 10,
        left: -5,
    },

    dayTxt: {
        color: moradoOscuro,
        fontWeight: 'bold',
        fontSize: 16,
    }


})
