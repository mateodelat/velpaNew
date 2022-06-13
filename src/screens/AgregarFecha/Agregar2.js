import React, { useEffect, useState } from 'react'
import { Alert, Animated, Dimensions, Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import {
    calculateExpPerPerson,
    calculateLvl,
    colorFondo,
    formatDia,
    getUserSub,
    moradoClaro,
    moradoOscuro,
    redondear,
} from '../../../assets/constants'



import SelectorInput from '../../components/SelectorInput'
import HeaderConImagen from '../../components/HeaderConImagen';
import Boton from '../../components/Boton';

import RadioButton from '../../components/RadioButton';


import { Foundation } from '@expo/vector-icons';
import { DataStore } from 'aws-amplify';
import { Usuario } from '../../models';
import { Loading } from '../../components/Loading';

import { Entypo } from '@expo/vector-icons';
import InfoNivelesModal from '../../components/InfoNivelesModal';


const { height } = Dimensions.get("screen")

export default function ({ navigation,
    route

}) {
    const {
        fechaInicial,
        fechaFinal
    } = route?.params?.fecha

    let {
        precioMin,
        precioMax,
        tituloAventura,
        maxPersonas,

    } = route.params

    precioMin = !precioMin ? 20 : precioMin

    const scrollY = React.useRef(new Animated.Value(0)).current

    const usuario = route.params?.usuario

    const [modalVisible, setModalVisible] = useState(false);



    // Titulo y descripcion
    const [titulo, setTitulo] = useState(null);
    const [descripcion, setDescripcion] = useState(null);

    // Selectores personasTotales/precio
    const [precio, setPrecio] = useState(redondear(precioMin, 50));
    const [personasTotales, setPersonas] = useState(maxPersonas);

    // Permitir tercera edad / niños
    const [allowNinos, setAllowNinos] = useState(true);
    const [allowTercera, setAllowTercera] = useState(true); 7

    // Permitir pagos en efectivo
    const [allowEfectivo, setAllowEfectivo] = useState(false);

    // Dificultad de la fecha
    const [dificultad, setDificultad] = useState(3);

    const comisionVelpa = calculateLvl(usuario?.experience)?.comisionVelpa * 100
    const lvl = calculateLvl(usuario?.experience)?.lvl
    const pagadoAlUsr = precio - precio * ((1 * comisionVelpa) / 100)
    const expPerPerson = calculateExpPerPerson(precio)



    const handleContinuar = () => {
        if (!comisionVelpa || !usuario) {
            console.log({
                comisionVelpa,
                lvl,
                pagadoAlUsr,
                expPerPerson,
            })
            Alert.alert("Error", "Error inesperado, no hay usario")
            return
        }

        const { incluidoDefault, materialDefault } = route.params


        navigation.navigate("AgregarFecha3", {
            personasTotales,
            precio,

            allowTercera,
            allowNinos,

            incluidoDefault,
            materialDefault,

            titulo,
            descripcion,

            dificultad,

            efectivo: allowEfectivo,

            comision: comisionVelpa / 100,
            experienciaPorPersona: expPerPerson,

            ...route.params.fecha,
            ...route.params
        })

    }

    const handleClickDificultad = (index) => {
        setDificultad(index)
    }


    return (
        <View style={styles.container}>

            {!usuario ?
                <Loading
                    containerStyle={{
                        backgroundColor: colorFondo,
                    }}
                    indicator
                />
                :
                <Animated.ScrollView
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}

                    showsVerticalScrollIndicator={false}
                    style={{
                        padding: 20,
                        flex: 1,

                    }}>

                    <View style={{ height: height * 0.24 }} />

                    {/* Texto de titulo */}
                    <View style={styles.item}>
                        <Text style={styles.captionTxt}>Titulo fecha (opcional)</Text>
                        <TextInput
                            maxLength={30}
                            style={styles.textInput}
                            value={titulo}
                            onChangeText={setTitulo}
                        />
                    </View>

                    {/* Texto de descripcion */}
                    <View style={styles.item}>
                        <Text style={styles.captionTxt}>Descripcion fecha (opcional)</Text>
                        <TextInput
                            style={{ ...styles.textInput, textAlignVertical: 'top', }}
                            multiline={true}
                            numberOfLines={3}
                            value={descripcion}
                            onChangeText={setDescripcion} />
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.captionTxt}>Dificultad*</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            {
                                [...Array(5).keys()].map(e => {
                                    return <Foundation
                                        onPress={() => handleClickDificultad(e + 1)}
                                        style={{
                                            paddingHorizontal: 5,
                                        }}
                                        key={e}
                                        name="mountains"
                                        size={35}
                                        color={dificultad > e ? "black" : "gray"}
                                    />
                                })
                            }
                        </View>
                    </View>


                    <View style={styles.linea} />

                    {/* Cantidad de personas */}
                    <View style={{
                        ...styles.item,
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                        <View style={styles.contenedorSelector}>
                            <SelectorInput
                                cantidad={personasTotales}
                                setCantidad={setPersonas}
                                minValue={1}
                                maxValue={maxPersonas}


                                titulo={"Personas maximas"}

                                cambio={1}
                            />

                        </View>
                    </View>


                    {/* Precio por persona */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>



                        <View style={styles.contenedorSelector}>

                            <SelectorInput
                                cantidad={precio}
                                setCantidad={setPrecio}
                                minValue={precioMin}
                                maxValue={precioMax}

                                titulo={"Precio /persona"}

                                cambio={50}
                                showSigno={true}
                            />
                        </View>
                    </View>

                    {/* Informacion comisiones */}
                    <Pressable
                        onPress={() => setModalVisible(true)}
                        style={{
                            ...styles.item,
                            backgroundColor: '#fff',
                            padding: 10,
                            paddingTop: 0,
                            alignItems: 'center',
                        }}>
                        <View style={{
                            ...styles.linea,
                            marginTop: 0,
                            marginBottom: 10,
                        }} />

                        <Entypo name="info-with-circle" size={24} color={moradoOscuro + "55"} />

                        <View style={styles.infoPriceContainer}>
                            <Text style={styles.infoPriceTitle}>Nivel actual:</Text>
                            <Text style={styles.infoPriceNumber}>{lvl}</Text>

                        </View>

                        <View style={styles.infoPriceContainer}>
                            <Text style={styles.infoPriceTitle}>Comision Velpa:</Text>
                            <Text style={styles.infoPriceNumber}>{comisionVelpa}%</Text>

                        </View>

                        <View style={styles.infoPriceContainer}>
                            <Text style={styles.infoPriceTitle}>Ganancia /persona:</Text>
                            <Text style={styles.infoPriceNumber}>${pagadoAlUsr}</Text>
                        </View>

                        <View style={styles.infoPriceContainer}>
                            <Text style={styles.infoPriceTitle}>Experiencia ganada /persona:</Text>
                            <Text style={styles.infoPriceNumber}>+{expPerPerson} exp</Text>
                        </View>

                        <View style={styles.infoPriceContainer}>
                            <Text style={styles.infoPriceTitle}>Experiencia fecha llena:</Text>
                            <Text style={styles.infoPriceNumber}>+{expPerPerson * personasTotales} exp</Text>
                        </View>

                    </Pressable>

                    {/* Permitir/negar tercera edad y niños */}
                    <View style={styles.allowContainer}>
                        {/* Tercera edad */}
                        <Pressable
                            onPress={() => setAllowTercera(!allowTercera)}
                            style={styles.allowInnerContainer}>
                            <Text style={styles.textAllow}>Permitir tercera edad</Text>
                            <RadioButton
                                checked={allowTercera}
                                setChecked={setAllowTercera}
                            />

                        </Pressable>
                        <View style={{
                            ...styles.linea,
                            marginTop: 0,
                            marginBottom: 0,
                        }} />

                        {/* Niños */}
                        <Pressable
                            onPress={() => setAllowNinos(!allowNinos)}
                            style={styles.allowInnerContainer}>
                            <Text style={styles.textAllow}>Permitir niños</Text>
                            <RadioButton
                                checked={allowNinos}
                                setChecked={setAllowNinos}
                            />

                        </Pressable>



                    </View>


                    <View style={{
                        marginBottom: 20,
                        padding: 5,
                        paddingHorizontal: 10,
                        backgroundColor: '#fff',
                    }}>
                        {/* Efectivo */}
                        <Pressable
                            onPress={() => {
                                const change = () => setAllowEfectivo(!allowEfectivo)

                                if (!allowEfectivo) {
                                    Alert.alert("Atencion", "Al permitir pagos en efectivo te arriesgas a que los clientes reserven y no se presenten y en ese caso las comisiones no se pueden devolver\n¿Deseas continuar?", [
                                        {
                                            text: "Cancelar",
                                            style: "cancel"
                                        },
                                        {
                                            text: "OK",
                                            onPress: change
                                        },
                                    ])
                                }

                                else {
                                    change()
                                }

                            }}
                            style={styles.allowInnerContainer}>
                            <Text style={styles.textAllow}>Permitir pagos en efectivo</Text>
                            <RadioButton
                                checked={allowEfectivo}
                                setChecked={setAllowEfectivo}
                            />

                        </Pressable>

                    </View>



                    <Boton
                        style={{
                            marginBottom: 40,
                            marginTop: 20,
                        }}
                        titulo={"Continuar"}
                        onPress={handleContinuar}
                    />

                </Animated.ScrollView >
            }

            <HeaderConImagen
                titulo={tituloAventura + " " + formatDia(fechaInicial)}
                imagen={require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                scrollY={scrollY}
                maxHeight={height * 0.24}
            />

            <InfoNivelesModal
                userExp={usuario?.experience}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />


        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorFondo,
    },

    fecha: {
        height: 3000,
    },

    captionTxt: {
        fontSize: 15,
        marginBottom: 15,
        marginLeft: 5,

    },

    textInput: {
        // flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        paddingHorizontal: 10,

    },

    item: {
        marginBottom: 25,
    },

    question: {
        position: 'absolute',
        backgroundColor: moradoClaro,
        borderRadius: 100,

        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    questionTxt: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "white",

    },

    infoPriceTitle: {
        flex: 1,
        fontSize: 15,
        color: '#000',
    },

    infoPriceNumber: {
        fontSize: 15,
        color: moradoOscuro,
        fontWeight: 'bold',
        minWidth: 36,
        textAlign: 'center',
    },
    infoPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },


    agregar: {
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    contenedorSelector: {
        backgroundColor: '#fff',
        padding: 10,
        // alignItems: 'flex-end',
        flex: 1,
    },

    tituloAgregar: {
        fontSize: 15,
        flex: 1,
        textAlign: 'center',
    },

    icono: {
        // ...shadowMedia,
        // backgroundColor: moradoOscuro,
        // padding: 10,
        // borderRadius: 100,
        // alignItems: 'center', justifyContent: 'center',

        position: 'absolute',
        left: 10,

    },


    linea: {
        borderBottomWidth: 0.5,
        marginTop: 20,
        marginBottom: 40,
        borderColor: "gray",
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center',
    },

    puntoDeReunion: {
        padding: 10,
        // paddingLeft: 0,
        backgroundColor: '#fff',
        borderColor: "red",
    },

    txtLocation: {
        color: moradoOscuro,
        fontSize: 16,
        flex: 1,
        textAlign: 'center',

        marginLeft: 10,


    },

    allowContainer: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
    },

    allowInnerContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingRight: 2.5,
    },

    textAllow: {
        fontSize: 16,
        flex: 1,
    }
})
