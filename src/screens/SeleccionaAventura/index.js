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
import { useNavigation } from '@react-navigation/native';
import Boton from '../../components/Boton';
import AddElemento from './components/AddElemento';



export default ({
    route,
}) => {
    const { esSelector } = route.params

    let titulo
    let descripcion

    // Si es para seleccionar muchas aventuras
    if (esSelector) {
        titulo = "Selecciona aventuras"
        descripcion = "Selecciona las aventuras en las que te quieres certificar"
    }

    // Si es para hacer click en una sola aventura
    else {
        titulo = "Escoge aventura"
        descripcion = "Escoge la aventura a agregar la fecha"

    }
    const navigation = useNavigation()

    // Mostrar solo aventuras que tengan minimo una fecha futura sin llenarse y cumpla los filtros


    const [buscar, setBuscar] = useState("");

    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([true, false, false]);
    const [dificultad, setDificultad] = useState([true, true, true]);
    const [filtrarAbierto, setFiltrarAbierto] = useState(false);

    // UI boton
    const [buttonLoading, setButtonLoading] = useState(false);

    const rowsAventura = 2
    const [selectedItems, setSelectedItems] = useState([...Array(rowsAventura + 1).keys()].map((_, row) => {
        return (
            [{
                selected: false,
                key: "Id izquierda",
            },
            {
                selected: false,
                key: "Id derecha",
            },
            ]
        )
    }
    ))
    // [0,1,idAve]
    // [1,1,idAve]


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


    // Funcion continuar solo en caso que sea selector
    const handleContinuar = () => {
        // Extraer solos los id's de aventuras seleccionadas
        let listaIDs = []

        selectedItems.map((row) => {
            row.map(e => {
                if (e.selected) {
                    listaIDs.push(e.key)
                }
            })
        })

        if (listaIDs.length === 0) {
            Alert.alert("Error", "Selecciona minimo una aventura a validar")
            return
        }

        setButtonLoading(true)
        setTimeout(() => {
            setButtonLoading(false)
            Alert.alert("Crear solicitud", "Se crea una solicitud con los ids:\n" + listaIDs)
            navigation.popToTop()
            navigation.navigate("ExitoScreen", {
                txtExito: "Solicitud enviada con exito, espera nuestra llamada!!",
                txtOnPress: "Volver al incio",
            })
        }, 500);
    }



    const handlePressAventura = (id, row, column) => {

        if (esSelector) {
            let newSelectedItems = [...selectedItems]

            // Se cambia el valor del item seleccionado
            newSelectedItems[row][column].selected = !newSelectedItems[row][column].selected

            setSelectedItems(newSelectedItems)
        } else {
            navigation.navigate("AgregarFecha", {
                id
            })
        }
    }

    const handleAventuraNoAutorizado = (index) => {
        Alert.alert("Error", "No estas autorizado a esta aventura, deseas enviar una solicitud?",
            [{
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "OK",
                onPress: () => navigation.navigate("SolicitudAventuraScreen", {
                    aventura: {
                        titulo: "El nevado de colima"
                    }
                })
            },]
        )

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

    const handleAddAventura = () => {
        Alert.alert("Agregar aventura", "¿Deseas agregar una aventura nueva y certificarte en ella?", [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "OK",
                onPress: () => navigation.navigate("AgregarAventura")
            },
        ])
    }

    const tamañoCuadrado = width * 0.5 - 25

    return (
        <View
            style={styles.container}>

            <Header navigation={navigation} titulo={titulo} />

            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={{
                    flex: 1,
                }}>

                    <Text style={styles.textInfo}>{descripcion}</Text>
                    {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
                    {/* $$$$$$$$$$     BUSCAR   $$$$$$$$$$$*/}
                    {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
                    <View style={{
                        backgroundColor: "#fff",
                        flexDirection: 'row',
                        flex: 1,
                        marginVertical: 10,
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
                        [...Array(rowsAventura).keys()].map((_, row) => (
                            <View
                                key={"row", row}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 15,
                                }}>
                                {[...Array(2).keys()].map((e, column) => {

                                    return (

                                        <CuadradoImagen
                                            selected={esSelector ? selectedItems[row][column].selected : undefined}
                                            tamañoCuadrado={(width / 2 - 30)}
                                            titulo={"El nevado de colima"}
                                            key={"Ave", column}
                                            onPress={() => handlePressAventura("Idave", row, column)}
                                        />
                                    )
                                })
                                }

                            </View>
                        ))
                    }
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 15,
                        }}>
                        <CuadradoImagen
                            notAllowed={true}
                            selected={esSelector ? selectedItems[rowsAventura][0].selected : undefined}
                            tamañoCuadrado={(width / 2 - 30)}
                            titulo={"El nevado de colima"}
                            onPress={handleAventuraNoAutorizado}
                        />
                        <AddElemento
                            tamañoCuadrado={(width / 2 - 30)}
                            onPress={() => handleAddAventura()}
                        />

                    </View>


                </View>

            </ScrollView>

            {esSelector && <Boton
                style={{
                    marginVertical: 20
                }}

                loading={buttonLoading}
                titulo={"Continuar"}
                onPress={handleContinuar}
            />}
        </View >
    )
}

function Header({ navigation, titulo }) {
    return <View style={styles.selectContainer}>
        <Text style={styles.headerTitle}>{titulo}</Text>
        <MaterialIcons
            style={{
                padding: 5,
            }}
            onPress={() => navigation.pop()}
            name={"keyboard-arrow-left"}
            size={35}
            color={moradoOscuro}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorFondo,
        flex: 1,
        padding: 20,
        paddingBottom: 0,
        paddingTop: 10

    },

    filtrar: {
        borderRadius: 20,
    },

    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    headerTitle: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: moradoOscuro,
    },

    textInfo: {
        fontSize: 16,
        color: moradoClaro,
        textAlign: 'center',
        marginBottom: 10,

    }
})
