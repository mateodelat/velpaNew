import React, { useState } from 'react'
import {
    Alert,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { moradoClaro, moradoOscuro } from '../../../../assets/constants'

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import ListaPersonas from './ListaPersonas';
import ModalItinerario from './ModalItinerario';
import ModalRuta from './ModalRuta';
import { useNavigation } from '@react-navigation/native';

export default function () {
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState("");

    const [openDetails, setOpenDetails] = useState(false);

    const navigation = useNavigation()

    const abrirItinerario = () => {
        setModalVisible(true)
        setTipoModal("itinerario")
    }


    const abrirRuta = () => {
        setModalVisible(true)
        setTipoModal("ruta")
    }

    return (
        <View style={{
            marginLeft: 10,
            marginBottom: 40,
        }}>
            {/* Mostrar detalles cuando se hace click */}
            <Pressable
                onPress={() => setOpenDetails(!openDetails)}

                style={styles.container}>


                {/* Titulo y precio */}
                <View style={styles.row}>
                    <Text
                        numberOfLines={1}
                        style={styles.titulo}
                    >Subida todo incluido</Text>

                    <View style={{}}>
                        <Text
                            style={styles.precio}
                        >18000$</Text>
                        <Text
                            style={{
                                textAlign: 'right',
                                fontSize: 10,
                                color: '#666',
                            }}
                        >*aprox</Text>
                    </View>

                </View>


                {/* Descripcion */}
                <View style={styles.row}>
                    <Text
                        numberOfLines={openDetails ? null : 1}
                        style={styles.descripcion}
                    >{("Texto describiendo detalles de la fecha pero esta muy largo para que quepa por lo que tiene que ser mfdsfasdfs adfasdf adsfadsvgdfgfdsas")}</Text>

                    {!openDetails && <Text
                        style={[styles.precio, { color: '#fff', }]}
                    >18000$</Text>}
                </View>


                {/* Elementos de detalle */}
                {openDetails && <View >
                    {/* Perfil del guia */}
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>

                        <View style={{ alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: 16, }}>Mariana De La Tower</Text>
                            <Text style={styles.nickname}>@lameramer</Text>
                        </View>
                        <Image source={{ uri: "https://thispersondoesnotexist.com/image" }} style={styles.foto} />

                    </View>

                    {/* Iconos presionables */}
                    <View style={{ ...styles.row }}>

                        <View style={styles.cuadradoDatos}>
                            <Text style={styles.tituloCuadro}>PLAN</Text>

                            <Pressable
                                onPress={abrirItinerario}
                                style={styles.botonLogo}>
                                <FontAwesome5 name="tasks" size={27} color="black" />
                            </Pressable>
                        </View>

                        <View style={styles.lineaVertical} />

                        <View style={styles.cuadradoDatos}>
                            <Text style={styles.tituloCuadro}>DIAS</Text>
                            <View style={styles.diasContainer}>
                                <Text style={styles.diasTxt}>6</Text>
                            </View>
                        </View>


                        {
                            true && <>
                                <View style={styles.lineaVertical} />
                                <View style={styles.cuadradoDatos}>
                                    <Text style={styles.tituloCuadro}>RUTA</Text>
                                    <Pressable
                                        onPress={abrirRuta}
                                        style={styles.botonLogo}>
                                        <Image
                                            source={require("../../../../assets/icons/distance.png")}
                                            style={{
                                                width: 30,
                                                height: 30,
                                            }} />
                                    </Pressable>
                                </View>
                            </>
                        }
                    </View>



                </View>}



                {/* Linea */}
                <View style={styles.line} >
                    {!openDetails && <MaterialIcons
                        name={"keyboard-arrow-down"}
                        size={20}
                        color={"lightgray"}
                        style={{ bottom: 10, backgroundColor: '#fff', }}
                    />}

                </View>




                {/* Lista personas */}
                <ListaPersonas
                    personasReservadas={3}
                    personasTotales={6}

                />



                {openDetails && <Pressable
                    onPress={() => navigation.navigate("Logistica")}
                    style={{ ...styles.botonRedondo, width: '50%', alignSelf: 'center', marginBottom: 20, }}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', }}>Reservar</Text>
                </Pressable>}

            </Pressable >

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                {tipoModal === "itinerario" ?
                    <ModalItinerario
                        setModalVisible={setModalVisible}
                    /> :
                    <ModalRuta
                        setModalVisible={setModalVisible}
                    />}
            </Modal>
        </View >)
}

const gris = '#00000099'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '100%',
        padding: 20,
        paddingBottom: 0,
    },

    row: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },

    titulo: {
        fontSize: 17,
        fontWeight: 'bold',
        flex: 1,
        color: '#000',
    },

    descripcion: {
        fontSize: 17,
        flex: 1,
        color: gris,
    },

    precio: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 10,
        color: moradoClaro,
    },

    foto: {
        width: 50,
        height: 50,
        borderRadius: 15,
    },

    line: {
        height: 1,
        width: '100%',
        marginBottom: 20,
        backgroundColor: gris,
        alignItems: 'center',
    },

    nickname: {
        fontSize: 16,
        color: gris,

    },

    cuadradoDatos: {
        flex: 1,
        marginVertical: 30,
        marginBottom: 20,

        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',


    },

    lineaVertical: {
        width: 1,
        marginVertical: 40,
        backgroundColor: "lightgray",
    },

    tituloCuadro: {
        fontSize: 16,
        color: 'lightgray',
        textAlign: 'center',
    },

    botonLogo: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

        marginTop: 7,
        borderRadius: 34,
        backgroundColor: '#fff',


        width: 45,
        height: 45,

        alignItems: 'center', justifyContent: 'center',



    },


    diasContainer: {
        width: 45,
        height: 45,

        alignItems: 'center', justifyContent: 'center',
        flex: 1,
    },

    diasTxt: {
        fontSize: 25,
        // fontWeight: 'bold',
    },

    botonRedondo: {
        backgroundColor: moradoOscuro,
        padding: 14,
        borderRadius: 200,
        alignItems: 'center', justifyContent: 'center',
    },


})
