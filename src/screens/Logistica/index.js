import React, { useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { calculatePrice, colorFondo, moradoClaro, moradoOscuro } from '../../../assets/constants'
import Selector from '../../components/Selector';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


import QueLlevar from './components/QueLlevar';
import Boton from '../../components/Boton';
import RadioButton from '../../components/RadioButton';

export default ({ navigation }) => {

    const [tercera, setTercera] = useState(0);
    const [adultos, setAdultos] = useState(1);
    const [ninos, setNinos] = useState(0);

    const [queLlevar, setQueLlevar] = useState(false);

    const [aceptoMaterial, setAceptoMaterial] = useState(false);
    const [aceptoTerminos, setAceptoTerminos] = useState(false);

    const personasMaximas = 10
    const total = tercera + adultos + ninos



    const comisionVelpa = .2

    let precioIndividualSinComision = 400
    const precioIndividual = calculatePrice(precioIndividualSinComision, total, comisionVelpa)

    function handlePagar(params) {
        if (!aceptoTerminos || !aceptoMaterial) {
            Alert.alert("Error", "No se ha aceptado todo")
            return
        }


        navigation.navigate("Pagar", {
            adultos,
            tercera,
            ninos,

            comisionVelpa,
            precioIndividualSinComision: calculatePrice(precioIndividualSinComision, total),

        })
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >

            {/*Selector de personas y precio*/}
            <View style={styles.innerContainer}>

                <View style={styles.personasContainer}>

                    <Ionicons style={{ marginRight: 20, }} name="ios-person" size={24} color="black" />
                    <Text style={styles.personasTotales}><Text style={{ fontWeight: 'bold', }}>{total}</Text>/{personasMaximas}</Text>

                </View>

                <Selector
                    titulo={"Tercera edad"}
                    descripcion={"Edad 65 años en adelante"}
                    setCantidad={setTercera}
                    cantidad={tercera}
                    maxReached={total >= personasMaximas}
                />

                <Selector
                    titulo={"Adultos"}
                    descripcion={"Edad de 12 a 65 años"}
                    setCantidad={setAdultos}
                    cantidad={adultos}
                    minValue={1}
                    maxReached={total >= personasMaximas}
                />

                <Selector
                    titulo={"Niños"}
                    descripcion={"Menores de 12 años"}
                    setCantidad={setNinos}
                    cantidad={ninos}
                    maxReached={total >= personasMaximas}
                />


                {/* Precios */}
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ color: '#aaa', }}>(${precioIndividual}/persona)</Text>
                    <Text style={styles.precio}>${Math.floor(precioIndividual * total)}</Text>
                </View>
                <Text style={{ color: '#aaa', marginTop: 10, textAlign: 'center', }}>*El precio individual depende de las personas totales en el grupo</Text>
            </View>




            {/* Que llevar */}
            <Pressable
                onPress={() => setQueLlevar(!queLlevar)}
                style={[styles.innerContainer]}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.titulos} >¿Que llevar?</Text>
                    <MaterialIcons
                        name={queLlevar ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                        size={30}
                        color={moradoClaro}
                    />
                </View>

                {/* Cuerpo */}
                {
                    queLlevar && <View >
                        <View style={styles.linea} />

                        <QueLlevar
                            datos={{
                                materialObligatorio: ["Ropa para el frio"],
                                materialAcampada: ["Una casita de campaña", "Una casita de campaña", "Una casita de campaña", "Una casita de campaña"],
                                materialOpcional: ["Ahi tu gorro"],
                                alimentacion: [],
                            }}
                        />
                    </View>
                }
            </Pressable>


            {/* Material incluido */}
            <View
                style={styles.innerContainer}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.titulos}>Incluido</Text>
                    <MaterialIcons
                        name={"check"}
                        size={30}
                        color={moradoClaro}
                    />
                </View>

                <View style={styles.linea} />

                {/* Cuerpo */}
                <View style={{ marginTop: 10, marginLeft: 10, }}>
                    {
                        ["Electrolit", "Suero", "Transporte hasta campamento",].map((el, idx) => (
                            <Text
                                style={styles.incluido}
                                key={idx.toString()}
                            >{el}</Text>

                        ))
                    }

                </View>
            </View>

            {/* Terminos y condiciones */}
            <View style={styles.innerContainer}>
                {/* Material */}
                <Pressable
                    onPress={() => setAceptoMaterial(!aceptoMaterial)}
                    style={styles.personasContainer}>
                    <Text style={styles.textoTerminos}>Estoy de acuerdo que cualquier material que me falte es bajo mi responsabilidad</Text>
                    <RadioButton
                        checked={aceptoMaterial}
                        setChecked={setAceptoMaterial}
                    />

                </Pressable>

                {/* Velpa */}
                <Pressable
                    onPress={() => setAceptoTerminos(!aceptoTerminos)}

                    style={styles.personasContainer}>
                    <Text style={styles.textoTerminos}>
                        Acepto los
                        <Text
                            onPress={() => Alert.alert("", "*Link a nuestros terminos y condiciones*")}
                            style={{ color: 'blue', }}> terminos y condiciones </Text>
                        de Velpa
                    </Text>

                    <RadioButton
                        checked={aceptoTerminos}
                        setChecked={setAceptoTerminos}
                    />
                </Pressable>

            </View>


            {/* Boton de pagar */}
            <Boton
                onPress={handlePagar}
                style={{
                    marginBottom: 40,
                }}
                titulo={"Pagar"}
            />

        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: colorFondo,
        padding: 20,
    },

    innerContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,

    },

    personasContainer: {
        paddingTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    personasTotales: {
        fontSize: 18,
    },

    precio: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 110,
    },


    linea: {
        marginHorizontal: 20,
        marginTop: 20,
        // marginBottom: 10,

        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },

    incluido: {
        fontSize: 17,
        padding: 3,
        paddingLeft: 0,
    },

    titulos: {
        fontSize: 18,
        color: moradoOscuro,
        fontWeight: 'bold',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },



    textoTerminos: {
        flex: 1,
        textAlign: 'center',
        marginRight: 10,
    },



})
