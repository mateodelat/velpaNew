import React, { useEffect, useState } from 'react'
import { Alert, Animated, Dimensions, Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { abrirEnGoogleMaps, colorFondo, formatAMPM, formatDate, formatDateShort, formatDia, getCapacidadUsuario, getUserSub, moradoClaro, moradoOscuro, msInMinute, redondear, shadowMedia } from '../../../assets/constants'


import SelectorInput from '../../components/SelectorInput'
import HeaderConImagen from '../../components/HeaderConImagen';
import Boton from '../../components/Boton';

import RadioButton from '../../components/RadioButton';


import { Foundation } from '@expo/vector-icons';


const { height } = Dimensions.get("screen")

export default function ({ navigation, route }) {

    const {
        fechaInicial,
        fechaFinal
    } = route?.params?.fecha

    const {
        precioMin,
        precioMax,
        tituloAventura,
        maxPersonas,

    } = route.params

    const scrollY = React.useRef(new Animated.Value(0)).current





    // Titulo y descripcion
    const [titulo, setTitulo] = useState(null);
    const [descripcion, setDescripcion] = useState(null);

    // Selectores personasTotales/precio
    const [precio, setPrecio] = useState(redondear(precioMin, 50));
    const [personasTotales, setPersonas] = useState(maxPersonas);

    // Permitir tercera edad / niños
    const [allowNinos, setAllowNinos] = useState(true);
    const [allowTercera, setAllowTercera] = useState(true);

    // Dificultad de la fecha
    const [dificuldad, setDificuldad] = useState(3);



    const handleContinuar = () => {
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

            dificuldad,

            ...route.params.fecha,
            ...route.params
        })

    }

    const handleClickDificultad = (index) => {
        setDificuldad(index)
    }

    return (
        <View style={styles.container}>

            {/* Fechas */}
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
                                    color={dificuldad > e ? "black" : "gray"}
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
                    ...styles.item,
                    // marginTop: 20,
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
                        marginBottom: 5,
                        marginTop: 5,
                    }}>

                    </View>

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




                <Boton
                    style={{
                        marginBottom: 40,
                        marginTop: 20,
                    }}
                    titulo={"Continuar"}
                    onPress={handleContinuar}
                />

            </Animated.ScrollView >

            <HeaderConImagen
                titulo={tituloAventura + " " + formatDia(fechaInicial)}
                imagen={require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                scrollY={scrollY}
                maxHeight={height * 0.24}
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

    infoPrice: {
        fontSize: 12,
        color: '#444',
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
        alignItems: 'flex-end',
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
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 40,
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
