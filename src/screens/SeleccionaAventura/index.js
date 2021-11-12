import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    Keyboard,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'


import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


import { categorias, colorFondo, listAventurasAutorizadas, moradoClaro, moradoOscuro } from '../../../assets/constants';
import BotonDificultad from './components/BotonDificultad';

import CuadradoImagen from '../../components/CuadradoImagen';
import { useNavigation } from '@react-navigation/native';
import Boton from '../../components/Boton';
import AddElemento from './components/AddElemento';
import { Categorias } from '../../models';
import { DataStore } from '@aws-amplify/datastore';
import { AventuraUsuario } from '../../models';
import Auth from '@aws-amplify/auth';



export default ({
    route,
}) => {

    // Mostrar solo aventuras que tengan minimo una fecha futura sin llenarse y cumpla los filtros

    // Variables iniciales
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

    // Obtener aventuras
    const [aventuras, setAventuras] = useState(null);
    const [aventurasAMostrar, setAventurasAMostrar] = useState(null);

    useEffect(() => {
        fetchAventuras().then(r => {
            setAventuras(r)
            setAventurasAMostrar(r)
        })
    }, []);


    const fetchAventuras = async () => {
        return await listAventurasAutorizadas(100)
            // Obtener aventuras ya perimitidas
            .then(async r => {

                const { attributes: { sub } } = await Auth.currentUserInfo().catch(e => {
                    console.log(e)
                })

                // Obtener relaciones con usuario
                let aventurasAutorizadasAlUsr = await DataStore
                    .query(AventuraUsuario, c => c.usuario("eq", sub))
                    .catch(e => {
                        console.log(e)
                        Alert.alert("Error", "Error obteniendo aventuras autorizadas")
                    })

                console.log(sub)
                console.log(aventurasAutorizadasAlUsr)

                r = r.map((ave, idx) => {
                    console.log()

                    return {
                        ...ave,
                        notAllowed: true
                    }
                })
                return r
            })

    }


    const [buscar, setBuscar] = useState("");

    // Variables del filtro
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([true, false, false]);
    const [dificultad, setDificultad] = useState([true, true, true]);
    const [filtrarAbierto, setFiltrarAbierto] = useState(false);

    // UI boton
    const [buttonLoading, setButtonLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

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


    const handleBorrarBusqueda = () => {

        const nuevasAve = aplicarTodosLosFiltros(aventuras, false)
        setBuscar("")

        setAventurasAMostrar(nuevasAve)


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



    const handlePressAventura = (aventura, row, column) => {
        if (esSelector) {
            let newSelectedItems = [...selectedItems]

            // Se cambia el valor del item seleccionado
            newSelectedItems[row][column].selected = !newSelectedItems[row][column].selected

            setSelectedItems(newSelectedItems)
        } else {
            navigation.navigate("AgregarFecha", {
                aventura
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


        // Filtrar por categoria y por dificultad
        const nuevasAve = aventuras.filter(e => {
            return (
                (// Es igual al titulo en minusculas
                    e.titulo.toLowerCase().includes(buscar.toLowerCase())
                    ||

                    // Es igual a la descripcion
                    e.descripcion.toLowerCase().includes(buscar.toLowerCase()))
                &&

                (// ALPINISMO
                    (newCategoriasSelect[0] && e.categoria === Categorias.APLINISMO) ||

                    // Dificultad media
                    (newCategoriasSelect[1] && e.categoria === Categorias.MTB) ||

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
                    e.descripcion.toLowerCase().includes(buscar.toLowerCase()))
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
                    (categoriasSeleccionadas[1] && e.categoria === Categorias.MTB) ||

                    // Dificultad dificil
                    (categoriasSeleccionadas[2] && e.categoria === Categorias.OTROS)
                )

            )
        })
        setAventurasAMostrar(nuevasAve)

    }

    const handleChangeText = (text) => {
        setBuscar(text)
        const nuevasAve = aplicarTodosLosFiltros(aventuras)

        setAventurasAMostrar(nuevasAve)
    }

    const aplicarTodosLosFiltros = (aventuras, denyBusqueda) => {
        return aventuras.filter(e => {
            return (
                !denyBusqueda ? (// Es igual al titulo en minusculas
                    e.titulo.toLowerCase().includes(buscar.toLowerCase())
                    ||

                    // Es igual a la descripcion
                    e.descripcion.toLowerCase().includes(buscar.toLowerCase())) : true
                    &&
                    (// ALPINISMO
                        (categorias[0] && e.categoria === Categorias.APLINISMO) ||

                        // Dificultad media
                        (categorias[1] && e.categoria === Categorias.MTB) ||

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

    const onRefresh = () => {
        setRefreshing(true)

        fetchAventuras().then(r => {
            setAventuras(r)

            // Aplicar filtros a nuevas aventuras
            const nuevasAve = aplicarTodosLosFiltros(r)
            setAventurasAMostrar(nuevasAve)

        })
        setTimeout(() => {
            setRefreshing(false)
        }, 300);
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

    return (
        <View
            style={styles.container}>

            <Header navigation={navigation} titulo={titulo} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }

            >
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



                    {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
                    {/* $$$$$$$$$$    FILTRAR   $$$$$$$$$$$*/}
                    {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
                    <View
                        style={styles.filtrar}>

                        <Pressable
                            onPress={() => setFiltrarAbierto(!filtrarAbierto)}

                            style={{
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
                        </Pressable>


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
                    </View>

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
                                height: height / 2,
                            }}>
                                <ActivityIndicator
                                    size={"large"}
                                    color={"black"}
                                />
                            </View> :
                            aventuras?.length === 0 ?
                                <Text style={styles.noAventuras}>No hay aventuras</Text>

                                :
                                [...Array(Math.round(aventurasAMostrar.length / 2))].map((_, row) => (
                                    <View
                                        key={"row", row}
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginBottom: 15,
                                        }}>
                                        {[aventurasAMostrar[row * 2], row * 2 + 1 < aventurasAMostrar.length && aventurasAMostrar[row * 2 + 1]].map((e, column) => {

                                            if (!e) {
                                                return (
                                                    // Si es el ultimo item y es impar agregar plus button

                                                    <View
                                                        style={{
                                                            marginBottom: 15,
                                                        }}>
                                                        <AddElemento
                                                            tamañoCuadrado={(width / 2 - 30)}
                                                            onPress={() => handleAddAventura()}
                                                        />
                                                    </View>

                                                )

                                            }





                                            return (

                                                <CuadradoImagen
                                                    notAllowed={e.notAllowed}
                                                    selected={esSelector ? selectedItems[row][column].selected : undefined}
                                                    tamañoCuadrado={(width / 2 - 30)}
                                                    item={e}
                                                    key={"Ave", column}
                                                    onPress={() => e.notAllowed ? handleAventuraNoAutorizado() : handlePressAventura(e, row, column)}
                                                />
                                            )
                                        })
                                        }

                                    </View>
                                ))
                    }
                    {
                        // Si el numero de aventuras es par y hay aventuras
                        (aventurasAMostrar !== null && aventuras?.length !== 0) &&
                        (aventurasAMostrar.length % 2 === 0) &&
                        <View
                            style={{
                                marginBottom: 15,
                            }}>
                            <AddElemento
                                tamañoCuadrado={(width / 2 - 30)}
                                onPress={() => handleAddAventura()}
                            />
                        </View>

                    }
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

    },
    noAventuras: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: moradoOscuro,
        marginTop: 20,
    }

})
