import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    Keyboard,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'


import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


import { categorias, colorFondo, listAventurasAutorizadas, moradoOscuro } from '../../../assets/constants';
import BotonDificultad from './components/BotonDificultad';

import CuadradoImagen from '../../components/CuadradoImagen';

import { Categorias } from '../../models';

export default ({ navigation, onPress, handleBack }) => {

    // Mostrar solo aventuras que tengan minimo una fecha futura sin llenarse y cumpla los filtros

    const [buscar, setBuscar] = useState("");

    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([true, true, true]);
    const [dificultad, setDificultad] = useState([true, true, true]);
    const [filtrarAbierto, setFiltrarAbierto] = useState(false);

    const [aventuras, setAventuras] = useState(null);
    const [aventurasAMostrar, setAventurasAMostrar] = useState(null);

    const { height, width } = Dimensions.get("window")


    useEffect(() => {
        listAventurasAutorizadas(8, 0).then(r => {
            setAventuras(r)
            setAventurasAMostrar(r)
        })
    }, []);


    const handleBorrarBusqueda = () => {
        setBuscar("")
        setAventurasAMostrar(aventuras)
    }


    const handleNavigateAventura = (id) => {
        navigation.navigate("DetalleAventura", {
            id
        })
    }


    const handleSelectCategoria = (index) => {
        let newCategoriasSelect = [...categoriasSeleccionadas]
        newCategoriasSelect[index] = !newCategoriasSelect[index]

        setCategoriasSeleccionadas(newCategoriasSelect)


        // Filtrar por categoria y por dificultad
        const nuevasAve = aventuras.filter(e => {
            return (
                (// Es igual al titulo en minusculas
                    e.titulo.toLowerCase().includes(buscar.toLowerCase())
                    ||

                    // Es igual a la descripcion
                    e.descripcion?.toLowerCase().includes(buscar.toLowerCase()))
                &&

                (// ALPINISMO
                    (newCategoriasSelect[0] && e.categoria === Categorias.APLINISMO) ||

                    // Dificultad media
                    (newCategoriasSelect[1] && e.categoria === Categorias.CICLISMO) ||

                    // Dificultad dificil
                    (newCategoriasSelect[2] && e.categoria === Categorias.OTROS)
                ) && (
                    // Dificultad facil
                    (dificultad[0] && e.dificultad < 3) ||

                    // Dificultad media
                    (dificultad[1] && e.dificultad === 3) ||

                    // Dificultad dificil
                    (dificultad[2] && e.dificultad > 3)


                )
            )
        })
        setAventurasAMostrar(nuevasAve)
    }

    const handleClickDificultad = (index) => {
        let newDificultades = [...dificultad]
        newDificultades[index] = !newDificultades[index]

        setDificultad(newDificultades)

        const nuevasAve = aventuras.filter(e => {
            return (
                (// Es igual al titulo en minusculas
                    e.titulo.toLowerCase().includes(buscar.toLowerCase())
                    ||

                    // Es igual a la descripcion
                    e.descripcion?.toLowerCase().includes(buscar.toLowerCase()))
                &&
                ( // Dificultad facil
                    (newDificultades[0] && e.dificultad < 3) ||

                    // Dificultad media
                    (newDificultades[1] && e.dificultad === 3) ||

                    // Dificultad dificil
                    (newDificultades[2] && e.dificultad > 3)) &&
                (// ALPINISMO
                    (categoriasSeleccionadas[0] && e.categoria === Categorias.APLINISMO) ||

                    // Dificultad media
                    (categoriasSeleccionadas[1] && e.categoria === Categorias.CICLISMO) ||

                    // Dificultad dificil
                    (categoriasSeleccionadas[2] && e.categoria === Categorias.OTROS)
                )

            )
        })
        setAventurasAMostrar(nuevasAve)

    }

    const handleChangeText = (text) => {
        setBuscar(text)

        let nuevasAve


        // Si no hay texto solo aplicar filtros de categoria/dificultad
        if (text === "") {
            nuevasAve = filtroSinBusqueda()
        } else {
            nuevasAve = aplicarTodosLosFiltros(text)
        }

        setAventurasAMostrar(nuevasAve)
    }

    const filtroSinBusqueda = () => {
        return aventuras.filter(e => {
            return (
                (// ALPINISMO
                    (categorias[0] && e.categoria === Categorias.APLINISMO) ||

                    // MOUNTAIN BIKE
                    (categorias[1] && e.categoria === Categorias.CICLISMO) ||

                    // OTROS
                    (categorias[2] && e.categoria === Categorias.OTROS)
                ) && (
                    // Dificultad facil
                    (dificultad[0] && e.dificultad < 3) ||

                    // Dificultad media
                    (dificultad[1] && e.dificultad === 3) ||

                    // Dificultad dificil
                    (dificultad[2] && e.dificultad > 3)
                ))
        })
    }

    const aplicarTodosLosFiltros = (newText) => {
        return aventuras.filter(e => {
            return (
                (// Es igual al titulo en minusculas
                    e.titulo.toLowerCase().includes(newText ? newText.toLowerCase() : buscar.toLowerCase())
                    ||

                    // Es igual a la descripcion
                    e.descripcion?.toLowerCase().includes(newText ? newText.toLowerCase() : buscar.toLowerCase()))
                &&
                (// ALPINISMO
                    (categorias[0] && e.categoria === Categorias.APLINISMO) ||

                    // Dificultad media
                    (categorias[1] && e.categoria === Categorias.CICLISMO) ||

                    // Dificultad dificil
                    (categorias[2] && e.categoria === Categorias.OTROS)
                ) && (
                    // Dificultad facil
                    (dificultad[0] && e.dificultad < 3) ||

                    // Dificultad media
                    (dificultad[1] && e.dificultad === 3) ||

                    // Dificultad dificil
                    (dificultad[2] && e.dificultad > 3)
                )

            )
        })
    }

    return (
        <View
            onPress={() => Keyboard.dismiss()}

            style={styles.container}>

            {/* Barra de busqueda*/}
            <View style={{
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent: 'center',
            }}>
                <MaterialIcons
                    style={{
                        padding: 5,
                    }}
                    onPress={handleBack ? handleBack : () => navigation.pop()}
                    name={"keyboard-arrow-left"}
                    size={35}
                    color={moradoOscuro}
                />

                <View style={{
                    marginLeft: 10,
                    backgroundColor: "#fff",
                    flexDirection: 'row',
                    flex: 1,
                }}>

                    <TextInput
                        style={{ padding: 0, flex: 1, padding: 10, paddingLeft: 40, }}
                        value={buscar}
                        placeholder="Buscar aventuras"
                        placeholderTextColor={"#7E7F84"}
                        onChangeText={handleChangeText}
                    />
                    <Feather
                        name="search"
                        size={25}
                        color="#7E7F84"
                        style={{ marginRight: 5, position: 'absolute', bottom: 10, left: 10, }}
                    />
                    {buscar.length !== 0 && <Entypo
                        onPress={handleBorrarBusqueda}
                        style={{
                            marginRight: 5,
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                        }}
                        name="cross"
                        size={24}
                        color="black"
                    />}
                </View>

            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={{
                }}>


                    {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
                    {/* $$$$$$$$$$    FILTRAR   $$$$$$$$$$$*/}
                    {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
                    <Pressable
                        onPress={() => setFiltrarAbierto(!filtrarAbierto)}
                        style={styles.filtrar}>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                        }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: moradoOscuro,
                                }}>Filtrar</Text>

                            <MaterialIcons name={filtrarAbierto ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={35} color={moradoOscuro} />
                        </View>


                        {
                            filtrarAbierto ? <View
                            >

                                {/* $$$$$$$$$$  DIFICULTAD  $$$$$$$$$$$*/}
                                <View style={{
                                    flexDirection: 'row',
                                    height: 45,
                                    marginTop: 15,
                                    justifyContent: 'space-between',
                                }}>
                                    <BotonDificultad
                                        onPress={() => handleClickDificultad(0)}
                                        texto={"Facil"}
                                        selected={dificultad[0]}
                                    />


                                    <BotonDificultad
                                        onPress={() => handleClickDificultad(1)}
                                        texto={"Medio"}
                                        selected={dificultad[1]}
                                    />

                                    <BotonDificultad
                                        onPress={() => handleClickDificultad(2)}
                                        texto={"Dificil"}
                                        selected={dificultad[2]}
                                    />
                                </View>



                                {/* Categorias*/}
                                <View style={{
                                    marginTop: 15,
                                    marginBottom: 30,
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                    }}>Categorias</Text>

                                    <View style={{
                                        marginTop: 20,
                                        flexDirection: 'row',
                                        justifyContent: "space-evenly"
                                    }}>
                                        {categorias.map((item, index) => (
                                            <Pressable
                                                onPress={() => handleSelectCategoria(index)}
                                                key={"Cat-", index}
                                                style={{
                                                    alignItems: 'center',
                                                    width: 70,
                                                }}>
                                                <View
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: 50,
                                                        backgroundColor: categoriasSeleccionadas[index] ? moradoOscuro : '#F4F6F6',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',

                                                    }}>
                                                    {/* Icono  */}
                                                    {item.icono(categoriasSeleccionadas[index] ? "#fff" : '#000', 25)}
                                                </View>
                                                <Text
                                                    style={{
                                                        textAlign: 'center',

                                                    }}
                                                >{item.titulo}</Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                </View>
                            </View> : null
                        }
                    </Pressable>

                    {/* $$$$$$$$$$$$$*/}
                    {/* Lista lugares*/}
                    {/* $$$$$$$$$$$$$*/}
                    {/* Mapear todas las aventuras */}
                    {
                        aventurasAMostrar === null ?
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: height - 55 * 3 - 20 * 2,
                            }}>
                                <ActivityIndicator
                                    size={"large"}
                                    color={"black"}
                                />
                            </View> :
                            aventuras.length === 0 ?
                                <Text style={styles.noAventuras}>No hay aventuras</Text>

                                :
                                aventurasAMostrar.length === 0 ?
                                    <Text style={styles.noAventuras}>No se encontraron aventuras</Text>

                                    :
                                    [...Array(Math.round(aventurasAMostrar.length / 2)).keys()].map((_, row) => (
                                        <View
                                            key={"row", row}
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginBottom: 15,
                                            }}>
                                            {[aventurasAMostrar[row * 2], row * 2 + 1 < aventurasAMostrar.length && aventurasAMostrar[row * 2 + 1]].map((e, idxAve) => {

                                                if (!e) return
                                                return (

                                                    <CuadradoImagen
                                                        tamañoCuadrado={(width / 2 - 30)}
                                                        item={e}
                                                        key={"Ave", idxAve}
                                                        onPress={() => onPress ? onPress(e) : handleNavigateAventura(e.id)}
                                                    />
                                                )
                                            })}

                                        </View>
                                    ))
                    }
                </View>
            </ScrollView>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colorFondo,
        flex: 1,
        padding: 20,
        paddingBottom: 0,
    },

    filtrar: {
        // position: 'absolute',
        // elevation: 1,
        // top: 50,
        // backgroundColor: '#fff',
        borderRadius: 20,
    },

    noAventuras: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: moradoOscuro,
        marginTop: 20,
    }
})
