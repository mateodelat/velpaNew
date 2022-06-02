import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colorFondo, formatAMPM, moradoOscuro, msInMinute } from '../../../../assets/constants';
import { Feather } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const HourEditor = ({
    fecha,
    setFecha,

    enabled
}) => {

    const {
        fechaInicial,
        fechaFinal
    } = fecha

    // Funciones para editar la fecha inicial y final
    function setFechaInicial(fechaInicial) {
        setFecha({
            ...fecha,
            fechaInicial
        })
    }


    function setFechaFinal(fechaFinal) {
        setFecha({
            ...fecha,
            fechaFinal
        })
    }

    const [hourPickerVisible, setHourPickerVisible] = useState(false);
    const [errorHoraInicial, setErrorHoraInicial] = useState(false);
    const [errorHoraFinal, setErrorHoraFinal] = useState(false);
    const [horaInicial, setHoraInicial] = useState(null);

    let bloquearADia = fechaInicial ? (horaInicial ? new Date(fechaInicial) : fechaFinal ? new Date(fechaFinal) : new Date(fechaInicial)) : new Date()

    const handleHora = (t) => {
        // Limpiar errores de hora

        if (!fechaInicial) {
            Alert.alert("Selecciona primero una fecha")
            return
        }

        if (t === "inicial") {
            setErrorHoraInicial(false)
            setHoraInicial(true)
            setHourPickerVisible(true)
        } else {
            setErrorHoraFinal(false)
            setHoraInicial(false)
            setHourPickerVisible(true)
        }
    }

    function updateItinerario(hora) {
        console.log(horaInicial ? "Hora inicial" : "Hora final")
        Alert.alert("Actualizar el itinerario")

    }

    function handleConfirmHour(hora) {
        setHourPickerVisible(false)

        // Regresar de hora local para el modal a UTC
        hora.setTime(hora.getTime() - hora.getTimezoneOffset() * 60 * 1000)

        if (horaInicial) {
            // Verificacion hora valida
            if (fechaFinal && hora.getTime() >= fechaFinal) {
                setFechaInicial(fechaFinal - msInMinute)
                setErrorHoraInicial(true)
                Alert.alert("Error", "La hora inicial debe ser menor a la hora final")
            } else {

                setFechaInicial(hora.getTime())

                // Actualizar la hora inicial del itinerario
                updateItinerario(hora.getTime(), true)


            }

        } else {
            // Verificacion hora valida
            if (hora.getTime() <= fechaInicial) {
                setFechaFinal(fechaInicial + msInMinute)
                setErrorHoraFinal(true)
                Alert.alert("Error", "La hora final debe ser mayor que la hora inicial")
            } else {

                setFechaFinal(hora.getTime())

                // Actualizar hora final del itinerario
                updateItinerario(hora.getTime(), false)

            }
        }


    }


    return (
        <View style={{
            marginVertical: 10, flexDirection: 'row',
        }}>
            {/* Hora inicial */}
            <Pressable
                onPress={() => !enabled && handleHora("inicial")}
                style={{
                    flex: 1,
                    marginRight: 10,
                }}>
                <Text style={{
                    ...styles.captionTxt,
                    marginBottom: 5,
                }}>Hora inicial</Text>
                <View style={{
                    ...styles.row,
                    ...styles.puntoDeReunion,
                    borderWidth: errorHoraInicial ? 1 : 0,
                }}>

                    <Text style={styles.txtLocation}>{!fechaInicial ? "--:--" : formatAMPM(fechaInicial)}</Text>

                    <Feather
                        style={styles.icono}
                        name="clock"
                        size={25}
                        color={moradoOscuro}
                    />
                </View>

            </Pressable>
            {/* Hora final */}
            <Pressable
                onPress={() => !enabled && handleHora("final")}
                style={{
                    marginLeft: 10,
                    flex: 1,
                }}>
                <Text style={{
                    ...styles.captionTxt,
                    marginBottom: 5,
                }}>Hora final</Text>
                <View style={{
                    ...styles.row,
                    ...styles.puntoDeReunion,
                    borderWidth: errorHoraFinal ? 1 : 0,
                }}>
                    <Feather
                        style={styles.icono}
                        name="clock"
                        size={25}
                        color={moradoOscuro}
                    />

                    <Text style={styles.txtLocation}>{!fechaFinal ? "--:--" : formatAMPM(fechaFinal)}</Text>

                </View>

            </Pressable>
            <DateTimePickerModal
                isVisible={hourPickerVisible}
                mode="datetime"
                date={bloquearADia}
                minimumDate={bloquearADia}
                maximumDate={bloquearADia}
                onConfirm={handleConfirmHour}
                onCancel={() => setHourPickerVisible(false)}

            />

        </View>)
}

export default HourEditor

const styles = StyleSheet.create({
    icono: {
        position: 'absolute',
        left: 10,

    },

    captionTxt: {
        fontSize: 15,
        marginBottom: 15,
        marginLeft: 5,

    },

    txtLocation: {
        color: moradoOscuro,
        fontSize: 16,
        flex: 1,
        textAlign: 'center',

        marginLeft: 10,


    },

    row: {
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center',
    },

    puntoDeReunion: {
        padding: 10,
        // paddingLeft: 0,
        backgroundColor: "#f9f9f9",
        borderColor: "red",
    },


})