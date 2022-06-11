import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import { colorFondo, formatAMPM, formatDateWithHour, meses, moradoOscuro } from '../../../assets/constants';

import ElementoPersonas from '../Pagar/components/ElementoPersonas';
import Persona from './Persona';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


export default function ({ handleBack, reserva, }) {
    const navigation = useNavigation()

    const {
        tercera,
        adultos,
        ninos
    } = reserva

    const insets = useSafeAreaInsets();


    const precioIndividualConComision = reserva.total / reserva.personasReservadas
    const comision = reserva.comision * 100 / reserva.total

    const efectivo = reserva?.tipoPago === "EFECTIVO"

    const cancelado = reserva.cancelado


    const formatDateWithHour = (time) => {
        if (!time) {
            return "31 de dic a las 11:59 pm"
        }
        const dateInicial = new Date(new Date(time).getTime())

        const ddInicial = String(dateInicial.getDate())
        const mmInicial = String(dateInicial.getMonth())


        return ddInicial + " de " + meses[mmInicial] + " a las " + formatAMPM(dateInicial)

    }

    function openProfile() {
        handleBack()
        navigation.navigate("PerfilScreen", { id: reserva.usuarioID })

    }


    return (
        <View style={{ flex: 1, }}>
            <View style={[styles.header, { height: insets.top + 60, }]}>
                <Text style={styles.headerTitle}>Reserva</Text>
                <Feather
                    onPress={handleBack && handleBack}

                    style={{ padding: 5, }}
                    name="x" size={30} color="white" />



            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}>


                <View style={styles.body}>


                    <View style={styles.innerContainer}>


                        {/* Numero de personas */}
                        <View style={styles.personasContainer}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', }}>{reserva.personasReservadas}</Text>
                            <Ionicons style={{ marginLeft: 10, }} name="ios-person" size={24} color="black" />

                        </View>

                        {/* <View style={[styles.line, { backgroundColor: '#000', }]} /> */}
                        <View style={[styles.innerContainer, { padding: 15, }]}>

                            {!!tercera && <View>
                                <ElementoPersonas
                                    precio={precioIndividualConComision}
                                    titulo={"Tercera edad"}

                                    cantidad={tercera}
                                />
                                <View style={styles.line} />
                            </View>}

                            <ElementoPersonas
                                precio={precioIndividualConComision}
                                titulo={"Adultos"}

                                cantidad={adultos}
                            />

                            <View style={styles.line} />

                            {!!ninos && <View>
                                <ElementoPersonas
                                    precio={precioIndividualConComision}
                                    titulo={"Niños"}

                                    cantidad={ninos}
                                />

                                <View style={styles.line} />
                            </View>
                            }
                            {/* Precio desglosado */}
                            <View style={{ width: "100%", marginTop: 20, }}>

                                {/* Comision */}
                                <View style={styles.precioContainer}>
                                    <Text
                                        style={styles.titulo}>Comision ({Math.round(comision)}%)</Text>
                                    <Text
                                        style={styles.precioTotal}>$ {Math.round(reserva.comision)}</Text>

                                </View>

                                {/* Ganado */}
                                <View style={styles.precioContainer}>
                                    <Text
                                        style={styles.titulo}>Para mi</Text>
                                    <Text
                                        style={styles.precioTotal}>$ {Math.round(reserva.pagadoAlGuia)}</Text>

                                </View>
                                {/* Total */}
                                <View style={{ ...styles.precioContainer, marginTop: 10, }}>
                                    <Text
                                        style={styles.titulo}>Total</Text>
                                    <Text
                                        style={styles.precioTotal}>$ {Math.round(reserva.total)}</Text>

                                </View>

                            </View>

                        </View>


                    </View>

                    <View style={styles.innerContainer}>
                        {!cancelado && <Text style={{
                            marginVertical: 15,
                            marginBottom: 5,
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>Reservado el {formatDateWithHour(reserva.createdAt)}</Text>}

                        {cancelado && <Text style={{
                            marginVertical: 15,
                            marginBottom: 5,
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'red',
                        }}>Cancelado el {formatDateWithHour(reserva.canceledAt)}</Text>}

                        {!!reserva.horaIngreso && <Text style={{
                            marginVertical: 15,
                            fontSize: 18,
                        }}>Ingreso: {formatDateWithHour(reserva.horaIngreso)}</Text>}

                        <View style={styles.line}>

                        </View>

                        <Persona
                            onPress={openProfile}
                            usuario={reserva}
                        />

                    </View>

                    <View style={styles.innerContainer}>
                        <View style={{ flexDirection: 'row', width: '100%', }}>
                            {
                                cancelado ?
                                    <MaterialIcons name="cancel" size={24} color={"red"} /> :
                                    efectivo ?

                                        < FontAwesome5 style={styles.iconoIzquierda} name="money-bill-wave-alt" size={24} color={moradoOscuro} />
                                        :
                                        <AntDesign name="creditcard" size={24} color={moradoOscuro} />
                            }

                            <Text style={{
                                position: 'absolute',
                                width: '100%',

                                textAlign: 'center',

                                fontWeight: 'bold',
                                fontSize: 18,

                                color: cancelado ? "red" : efectivo ? "coral" : moradoOscuro,

                            }}>
                                {
                                    cancelado ? "CANCELADO" :
                                        efectivo ?

                                            "POR PAGAR"
                                            : "PAGADO"
                                }
                            </Text>


                        </View>
                    </View>


                </View>

            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 10,
        backgroundColor: moradoOscuro,
        alignItems: 'center',

        flexDirection: 'row',

        height: 60,

    },

    headerTitle: {
        width: '100%',
        paddingHorizontal: 10,
        position: 'absolute',
        textAlign: 'center',

        left: 10,
        color: '#fff',

        fontSize: 25,
    },

    container: {
        flex: 1,
        backgroundColor: colorFondo,

    },

    body: {
        padding: 20,
        flex: 1,
        backgroundColor: colorFondo,
    },

    innerContainer: {
        backgroundColor: '#fff',
        padding: 20,
        paddingVertical: 10,
        borderRadius: 10,

        alignItems: 'center',

        marginBottom: 20, width: '100%',

    },


    personasContainer: {
        paddingTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    filaPersona: {
        flexDirection: 'row',
        padding: 4,
        marginVertical: 10,
        backgroundColor: 'red',
    },

    line: {
        backgroundColor: colorFondo,
        width: '80%',
        marginVertical: 5,

        height: 1,
    },

    titulo: {
        fontSize: 18,
        color: '#AAA',
        fontWeight: 'bold',
        flex: 1,
    },
    precioTotal: {
        textAlign: 'right',
        color: '#000',
        paddingRight: 15,
        fontWeight: 'bold',
        fontSize: 18,
    },

    precioContainer: {
        flexDirection: 'row',
        marginVertical: 3,
        justifyContent: 'space-between',
    }



})