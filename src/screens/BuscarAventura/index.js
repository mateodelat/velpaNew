import React, { useState } from 'react'
import {
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


import { colorFondo, moradoClaro, moradoOscuro } from '../../../assets/constants';
import BotonDificultad from './components/BotonDificultad';

import CuadradoImagen from '../../components/CuadradoImagen';

export default ({ navigation }) => {

    // Mostrar solo aventuras que tengan minimo una fecha futura sin llenarse y cumpla los filtros


    const [buscar, setBuscar] = useState("");

    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([true, false, false]);
    const [dificultad, setDificultad] = useState([true, true, true]);
    const [filtrarAbierto, setFiltrarAbierto] = useState(false);

    const { height, width } = Dimensions.get("window")


    const categorias = [
        {
            titulo: "Alpinismo",
            icono: (color) => <FontAwesome5 name="hiking" size={25} color={color} />
        },
        {
            titulo: "MTB",
            icono: (color) => <Ionicons name="bicycle" size={25} color={color} />
        },
        {
            titulo: "Otros",
            icono: (color) => <Ionicons name="md-reorder-three" size={25} color={color} />
        },
    ]

    const handleBorrarBusqueda = () => {
        setBuscar("")
    }


    const handleNavigateAventura = (id) => {
        Alert.alert("Navegar a aventura", id)
        navigation.navigate("DetalleAventura")
    }


    const handleSelectCategoria = (index) => {
        let newCategoriasSelect = [...categoriasSeleccionadas]
        newCategoriasSelect[index] = !newCategoriasSelect[index]

        setCategoriasSeleccionadas(newCategoriasSelect)
    }

    const handleClickDificultad = (index) => {
        let newDificultades = [...dificultad]
        newDificultades[index] = !newDificultades[index]

        setDificultad(newDificultades)
    }

    const tamañoCuadrado = width * 0.5 - 25

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
                    onPress={() => navigation.pop()}
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
                        onSubmitEditing={() => Alert.alert("Buscar", "Se busca la aventura que tenga \"" + buscar + "\" en su titulo o descripcion")}
                        value={buscar}
                        placeholder="Buscar aventuras"
                        placeholderTextColor={"#7E7F84"}
                        onChangeText={(value) => setBuscar(value)}
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
                                        texto={"Dificil"}
                                        selected={dificultad[0]}
                                    />

                                    <BotonDificultad
                                        onPress={() => handleClickDificultad(1)}
                                        texto={"Medio"}
                                        selected={dificultad[1]}
                                    />

                                    <BotonDificultad
                                        onPress={() => handleClickDificultad(2)}
                                        texto={"Facil"}
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
                                                    {item.icono(categoriasSeleccionadas[index] ? "#fff" : '#000')}
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
                        [...Array(4).keys()].map((_, row) => (
                            <View
                                key={"row", row}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 15,
                                }}>
                                {[...Array(2).keys()].map((e, idxAve) => (

                                    <CuadradoImagen
                                        tamañoCuadrado={(width / 2 - 30)}
                                        titulo={"El nevado de colima"}
                                        key={"Ave", idxAve}
                                        onPress={() => handleNavigateAventura("Idave")}
                                    />
                                ))}

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
    }
})
