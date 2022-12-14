import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, TextInput, Pressable, Linking } from 'react-native'


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
} from '../../../../assets/constants';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import HeaderModal from './HeaderModal';


const ItemItinerario = ({
    modify,

    item,

    handleCambiarHora,
    cambiarTitulo,

    errorHora,
    errorTitulo,

    idx,

    handleAdd,
    handleRemove,

    allowAgregar,

    nuevoDia


}) => {
    const {
        titulo,
        hora,
        ubicacionNombre,
        ubicacionLink,
        tipo,

    } = item

    const modifiable = (tipo !== "inicio" && tipo !== "fin")



    return <View style={{
        ...styles.elementContainer,
        height: modify ? 180 : 120,
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

        <View style={{
            flex: 1,
            marginTop: 10,
        }}>{

                modify ?
                    modifiable !== false ?
                        <View style={styles.row}>
                            <TextInput
                                numberOfLines={2}
                                multiline={true}

                                value={titulo}
                                placeholder="Titulo"
                                placeholderTextColor={moradoOscuro + "44"}
                                onChangeText={cambiarTitulo}
                                style={{
                                    ...styles.textInput,
                                    borderWidth: errorTitulo ? 1 : 0
                                }}
                                maxLength={40}
                            />

                        </View>
                        :
                        <Text

                            numberOfLines={2}
                            style={styles.title}>{titulo}</Text>

                    :
                    <Text
                        numberOfLines={2}
                        style={styles.title}>{titulo}</Text>
            }


            {/* Hora */}
            {
                modify && modifiable ?
                    <View style={{
                        ...styles.row,
                        marginTop: 10,
                    }}>
                        <Text
                            onPress={handleCambiarHora}
                            style={{
                                ...styles.horaModify,
                                borderWidth: errorHora ? 1 : 0
                            }}>{formatAMPM(hora)}</Text>
                        <Entypo
                            name="minus"
                            size={30}
                            color="red"
                            onPress={handleRemove}
                        />

                    </View>
                    :
                    <Text style={styles.hora}>{formatAMPM(hora)}</Text>

            }
            {/* Ubicacion */}
            {ubicacionNombre &&
                <Pressable
                    onPress={() => abrirEnGoogleMaps(ubicacionLink)}
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

            {/* Agregar aventura */}
            {allowAgregar && < Pressable
                onPress={handleAdd}
                style={{
                    alignSelf: 'center',
                    marginTop: 10,
                    ...shadowMedia,
                    backgroundColor: '#fff',

                    borderRadius: 100,

                    // marginBottom: !nuevoDia ? 20 : 0,
                    bottom: 0,
                }}>

                <MaterialIcons name="add" size={40} color="black" />
            </Pressable>}

        </View>
    </View >

}


const ModalItinerario = ({
    setModalVisible,

    fechaInicial, fechaFinal,

    editAllowed,

    itinerario,
    setItinerario,


}) => {
    // Variables selector de hora
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [modify, setModify] = useState(editAllowed ? false : undefined);

    const [fechaMin, setFechaMin] = useState(fechaInicial);
    const [fechaMax, setFechaMax] = useState(fechaFinal);

    const [errorHora, setErrorHora] = useState(null);
    const [errorTitulo, setErrorTitulo] = useState(null);

    const [itinerarioLocal, setItinerarioLocal] = useState(itinerario);

    const [horaSeleccionada, setHoraSeleccionada] = useState([null, null]);
    // [index,"inicial"/"final"]


    // Actualizar cada que cambie el itinerario
    useEffect(() => {
        setItinerarioLocal(itinerario)
    }, [itinerario]);

    // Funciones para seleccionar hora de itinerario
    const hideDatePicker = () => {
        setDatePickerVisibility(false)

    }
    const handleConfirmHour = (date) => {
        hideDatePicker()

        const horaEnMs = date.getTime()

        const index = horaSeleccionada
        let newItinerario = [...itinerarioLocal]

        // Si la hora es menor a la hora inicial o mayor a la final se da error
        if (horaEnMs <= newItinerario[0].hora) {
            setErrorHora(index)
            newItinerario[index].hora = newItinerario[0].hora + msInMinute
            Alert.alert("Error", "La hora de la actividad debe ser mayor a la hora de salida")
        }
        else if (horaEnMs >= newItinerario[itinerarioLocal.length - 1].hora) {
            newItinerario[index].hora = newItinerario[itinerarioLocal.length - 1].hora - msInMinute
            setErrorHora(index)
            Alert.alert("Error", "La hora de la actividad debe ser menor a la hora de llegada")
        }
        else {
            newItinerario[index].hora = horaEnMs
        }

        newItinerario.sort(sortArray)
        setItinerarioLocal(newItinerario)
    }

    const sortArray = (a, b) => {
        if (a.tipo === "fin") {
            return 1
        }
        return a.hora > b.hora
    }


    const handleCambiarHora = (index) => {
        // Limpiar errores en la hora
        setErrorHora(null)

        analizarIndex(index)

        setHoraSeleccionada(index)
        setDatePickerVisibility(true)
    }

    const cambiarTitulo = (txt, idx) => {
        // Limpiar errores en el titulo
        setErrorTitulo(null)


        let nuevoItinerario = [...itinerarioLocal]
        nuevoItinerario[idx].titulo = txt
        setItinerarioLocal(nuevoItinerario)

    }



    // Funcion para ver si el elemento presionado es el primer o ultimo
    // Entonces se bloquea a solo un dia
    function analizarIndex(index) {
        switch (index) {
            case 0:
                setFechaMax(fechaInicial)
                setFechaMin(fechaInicial)
                break;

            case itinerarioLocal.length - 1:
                setFechaMin(fechaFinal)
                setFechaMax(fechaFinal)

                break;

            default:
                setFechaMin(fechaInicial)
                setFechaMax(fechaFinal)
                break;
        }

    }

    function handleSave() {

        if (modify) {
            // Verificaciones
            let redFlag = false

            // Revisar titulos vacios
            itinerarioLocal.find((e, i) => {
                if (!e.titulo || e.titulo === "") {
                    Alert.alert("Error", "Agrega un titulo a la actividad")
                    setErrorTitulo(i)
                    redFlag = true
                }
            })

            if (!redFlag) {
                Alert.alert("Exito", "Itinerario modificado con exito")
                setItinerario(itinerarioLocal)
                setModify(!modify)
                setModalVisible(false)
            }
        } else {
            setModify(!modify)
        }
    }

    const handleAdd = (idx) => {
        clearErrors()
        let newItinerario = [...itinerarioLocal]
        if (itinerarioLocal.find((i, idx) => {
            if (i.titulo === "") {
                setErrorTitulo(idx)
                return true
            }
        })) {
            Alert.alert("Primero escribe el titulo")
            return
        }

        newItinerario.splice(idx, 0, {
            hora: itinerarioLocal[idx - 1].hora + msInMinute,
            titulo: ""
        })

        // newItinerario.sort(sortArray)
        setItinerarioLocal(newItinerario)

        setFechaMax(fechaFinal)
        setFechaMin(fechaInicial)
    }

    const handleRemove = (idx) => {
        clearErrors()

        let newItinerario = [...itinerarioLocal]

        newItinerario.splice(idx, 1)

        setItinerarioLocal(newItinerario)
    }


    const handleCerrar = () => {
        setItinerarioLocal({
            ...itinerario
        })
        setModalVisible(false)
    }

    const clearErrors = () => {
        // Limpiar errores en el titulo
        setErrorTitulo(null)
        // Limpiar errores en la hora titulo
        setErrorHora(null)

    }

    let dateSelected = new Date(itinerarioLocal[horaSeleccionada]?.hora)

    return (
        <View style={styles.container}>
            <HeaderModal
                titulo={"Itinerario"}

                handleCerrar={handleCerrar}
                editAllowed={editAllowed}
                modify={modify}
                handleSave={handleSave}

            />


            <ScrollView
                showsVerticalScrollIndicator={false}
            >


                {/* Cuerpo */}
                <View
                    showsVerticalScrollIndicator={false}
                    style={styles.body}>
                    {
                        itinerarioLocal.map((elemento, idx) => {
                            var nuevoDia = false

                            const fechaActual = new Date(itinerarioLocal[idx].hora)

                            // Ver si el dia de la actividad es distinto al anterior
                            if (idx && fechaActual.getDay() !== (new Date(itinerarioLocal[idx - 1].hora).getDay())) {
                                nuevoDia = true
                            }


                            return <View
                                key={idx.toString()}
                            >



                                <ItemItinerario
                                    errorHora={errorHora === idx}
                                    errorTitulo={errorTitulo === idx}

                                    item={elemento}
                                    key={idx.toString()}

                                    modify={modify}

                                    idx={idx}
                                    nuevoDia={nuevoDia}

                                    handleCambiarHora={() => handleCambiarHora(idx)}
                                    cambiarTitulo={(txt) => cambiarTitulo(txt, idx)}

                                    allowAgregar={modify && idx !== itinerarioLocal.length - 1}

                                    handleAdd={() => handleAdd(idx + 1)}
                                    handleRemove={() => handleRemove(idx)}
                                />
                            </View>

                        })
                    }

                    <View style={{ position: 'absolute', left: 67, top: 10, }}>
                        <View style={{
                            width: 6,
                            height: (itinerarioLocal.length - 1) * (modify ? 180 : 120),
                            backgroundColor: moradoClaro,
                        }} />

                    </View>
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    date={dateSelected}
                    minimumDate={new Date(fechaMin)}
                    maximumDate={new Date(fechaMax)}
                    onConfirm={handleConfirmHour}
                    onCancel={hideDatePicker}
                />



            </ScrollView>
        </View>
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

    horaModify: {
        color: 'gray',
        fontSize: 16,
        fontStyle: "italic",

        backgroundColor: "#F4F6F6",
        borderRadius: 7,
        padding: 5,
        paddingLeft: 10,

        borderColor: "red",
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
