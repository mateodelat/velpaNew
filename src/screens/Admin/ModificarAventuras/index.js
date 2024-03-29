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


import { categorias, catFilter, colorFondo, enumToArray, getImageUrl, isVideo, moradoClaro, moradoOscuro, verdeTurquesa } from '../../../../assets/constants';

import CuadradoImagen from './components/CuadradoImagen';
import { useNavigation } from '@react-navigation/native';
import AddElemento from './components/AddElemento';
import { Aventura, Categorias, Usuario } from '../../../models';
import { DataStore } from '@aws-amplify/datastore';

import Boton from '../../../components/Boton';
import { EstadoAventura } from '../../../models';
import { vibrar } from '../../../../assets/constants/constant';
import { AventuraUsuarios } from '../../../models';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const { height, width } = Dimensions.get("window")

export default ({
    route,
}) => {

    let titulo
    let descripcion

    titulo = "Aventuras existentes"

    const navigation = useNavigation()

    // Obtener aventuras
    const [aventuras, setAventuras] = useState(null);
    const [aventurasAMostrar, setAventurasAMostrar] = useState(null);

    const [selector, setSelector] = useState(false);

    useEffect(() => {
        fetchAventuras().then(r => {
            setAventuras(r)
            setAventurasAMostrar(r)
        })
    }, []);


    const fetchAventuras = async () => {
        return await DataStore.query(Aventura)
            .then(async r => {
                r = await Promise.all(r.map(async ave => {
                    // Obtener urls de Storage
                    const imagenDetalle = await Promise.all(ave.imagenDetalle.map(async e => {

                        if (!e) return {
                            uri: "https://picsum.photos/400?random=101.jpg",
                            key: "https://picsum.photos/400?random=101.jpg",
                            video: false

                        }


                        return {
                            uri: await getImageUrl(e),
                            key: e,
                            video: isVideo(e)
                        }
                    }
                    ))
                    const usuario = await DataStore.query(Usuario, ave.usuarioID)
                    return {
                        ...ave,
                        imagenDetalle,
                        usuario
                    }
                }))
                return r
            })
            .catch(e => {
                Alert.alert("Error", "Error obteniendo aventuras")
                console.log(e)
            })
            // Obtener aventuras ya perimitidas
            .then(async r => {
                resetSelectedItems(r?.length)
                return r
            })

    }


    const [buscar, setBuscar] = useState("");

    // Variables del filtro
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(enumToArray(Categorias).map(_ => true));
    const [filtrarAbierto, setFiltrarAbierto] = useState(false);

    // UI boton
    const [buttonLoading, setButtonLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [selectedItems, setSelectedItems] = useState(null)




    const handleBorrarBusqueda = () => {

        const nuevasAve = filtroSinBusqueda()
        setBuscar("")

        setAventurasAMostrar(nuevasAve)


    }


    // Reiniciar los items seleccionados
    function resetSelectedItems(length) {
        length = length ? length : aventuras?.length
        setSelectedItems([...Array(length + 1).keys()].map((_, row) => {
            return (
                [{
                    selected: false,
                },
                {
                    selected: false,
                },
                ]
            )
        }
        ))
    }


    const handlePressAventura = (aventura, row, column) => {
        navigation.navigate("EditarAventura1", aventura)
    }


    const handleLongPressAventura = (e, row, column) => {
        vibrar('select')

        // Seleccionar el elemento presionado
        let newSelectedItems = [...selectedItems]
        newSelectedItems[row][column].selected = true
        // Se agrega el id del item seleccionado
        newSelectedItems[row][column].aventura = e

        setSelectedItems(newSelectedItems)

        // Poner el estado de seleccionar como true
        setSelector(true)

    }

    const handleSelectAventura = (aventura, row, column) => {
        aventurasSeleccionadas().length !== 0

        let newSelectedItems = [...selectedItems]

        // Se cambia el valor del item seleccionado
        newSelectedItems[row][column].selected = !newSelectedItems[row][column].selected

        // Se agrega el id del item seleccionado
        newSelectedItems[row][column].aventura = aventura
        if (aventurasSeleccionadas(newSelectedItems).length === 0) {
            setSelector(false)
        }

        setSelectedItems(newSelectedItems)
    }

    const aventurasSeleccionadas = (newSelected) => {
        let selectItems = selectedItems ? selectedItems : newSelected
        let listaAventuras = []
        selectItems.map((row) => {
            row.map((e) => {
                if (e.selected) {
                    listaAventuras.push({
                        id: e.aventura.id,
                        idx: aventuras.findIndex(ave => ave.id === e.aventura.id)
                    })
                }
            })
        })
        return listaAventuras
    }

    const handleRemoveItems = async () => {
        const eliminar = async () => {
            // Extraer solos los id's de aventuras seleccionadas
            const listaAventuras = aventurasSeleccionadas()

            if (listaAventuras.length === 0) {
                Alert.alert("Selecciona minimo una aventura a eliminar")
                return
            }
            let newAventuras = [...aventuras]

            try {

                // Mapear la lista de id's y borrarlas
                listaAventuras.map(async (item, idx) => {
                    newAventuras.splice(item.idx - idx, 1)
                    DataStore.delete(Aventura, item.id)
                })


                setAventuras(newAventuras)
                setAventurasAMostrar(newAventuras)
                resetSelectedItems(newAventuras.length)
                setSelector(false)
            } catch (error) {
                Alert.alert("Error", "Erorr borrando las aventuras")
                console.log(error)
            }
        }

        Alert.alert("Eliminar", "Seguro que quieres eliminar las aventuras?", [
            {
                text: "CANCEL",
                style: "cancel"
            },
            {
                text: "OK",
                onPress: eliminar
            },
        ])
    }

    function handleAprovarAventuras() {
        const listaAventuras = aventurasSeleccionadas()
        let newAventuras = [...aventuras]
        try {
            // Mapear la lista de id's y aprovarlas
            listaAventuras.map(async (item) => {
                const idx = item.idx
                const aventuraNueva = { ...aventuras[idx] }

                newAventuras[idx] = {
                    ...aventuraNueva,
                    estadoAventura: EstadoAventura.AUTORIZADO
                }

                // Obtener el modelo de la aventura para datastore
                const modelAventura = await DataStore.query(Aventura, newAventuras[idx].id)

                // Si la aventura estaba en pendiente se autoriza al usuario creador
                if (modelAventura.estadoAventura === EstadoAventura.PENDIENTE) {
                    const modelUsuario = await DataStore.query(Usuario, modelAventura.usuarioID)
                    DataStore.save(new AventuraUsuarios({
                        aventura: modelAventura,
                        usuario: modelUsuario
                    }))
                }


                DataStore.save(Aventura.copyOf(modelAventura, nuevo => {
                    nuevo.estadoAventura = EstadoAventura.AUTORIZADO
                }))
            })

        } catch (error) {
            Alert.alert("Error", "Error actualizando aventuras")
            console.log(error)
        }

        setAventuras([...newAventuras])
        setAventurasAMostrar([...newAventuras])

        setSelector(false)
        resetSelectedItems()
    }

    function handleRechazarAventuras() {
        const listaAventuras = aventurasSeleccionadas()
        let newAventuras = [...aventuras]
        try {
            // Mapear la lista de id's y aprovarlas
            listaAventuras.map(async (item) => {
                const idx = item.idx
                const aventuraNueva = { ...aventuras[idx] }

                newAventuras[idx] = {
                    ...aventuraNueva,
                    estadoAventura: EstadoAventura.RECHAZADO
                }

                // Obtener el modelo de la aventura para datastore
                const modelAventura = await DataStore.query(Aventura, newAventuras[idx].id)

                DataStore.save(Aventura.copyOf(modelAventura, nuevo => {
                    nuevo.estadoAventura = EstadoAventura.RECHAZADO
                }))
            })

        } catch (error) {
            Alert.alert("Error", "Error actualizando aventuras")
            console.log(error)
        }

        setAventuras([...newAventuras])
        setAventurasAMostrar([...newAventuras])

        setSelector(false)
        resetSelectedItems()
    }




    // Funciones del filtro
    const handleSelectCategoria = (index) => {
        resetSelectedItems()
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
                catFilter(newCategoriasSelect, e.categoria)
            )
        })
        setAventurasAMostrar(nuevasAve)
    }

    const handleChangeText = (text) => {
        resetSelectedItems()
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
        resetSelectedItems()

        return aventuras.filter(e => {
            return catFilter(categorias, e.categoria)
        })
    }

    const aplicarTodosLosFiltros = (newText) => {
        resetSelectedItems()

        return aventuras.filter(e => {
            return (
                (// Es igual al titulo en minusculas
                    e.titulo.toLowerCase().includes(newText ? newText.toLowerCase() : buscar.toLowerCase())
                    ||

                    // Es igual a la descripcion
                    e.descripcion?.toLowerCase().includes(newText ? newText.toLowerCase() : buscar.toLowerCase()))
            )
        })
    }


    const onRefresh = () => {
        setRefreshing(true)

        fetchAventuras().then(r => {
            setAventuras(r)

            // Aplicar filtros a nuevas aventuras
            const nuevasAve = aplicarTodosLosFiltros()
            setAventurasAMostrar(nuevasAve)

        })
        setTimeout(() => {
            setRefreshing(false)
        }, 300);
    }


    // Agregar aventura
    const handleAddAventura = () => {
        navigation.navigate("AgregarAventura")

    }


    const { top } = useSafeAreaInsets()

    return (
        <View
            style={{
                ...styles.container,
                paddingTop: top + 20
            }}>

            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{titulo}</Text>
                {
                    selector ?
                        <Entypo
                            style={{
                                padding: 5,
                            }}
                            onPress={() => setSelector(false)}
                            name={"cross"}
                            size={35}
                            color={moradoOscuro}
                        /> :
                        <MaterialIcons
                            style={{
                                padding: 5,
                            }}
                            onPress={() => navigation.pop()}
                            name={"keyboard-arrow-left"}
                            size={35}
                            color={moradoOscuro}
                        />
                }

                {selector && aventurasSeleccionadas().length !== 0 &&
                    <Feather
                        style={{
                            padding: 5,
                        }}
                        onPress={handleRemoveItems}
                        name="trash-2"
                        size={30}
                        color={moradoOscuro} />
                }
            </View>




            {/* Cuerpo */}
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
                            placeholder="Buscar experiencias"
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


                                {/* Categorias*/}
                                <View style={{
                                    marginTop: 15,
                                    marginBottom: 30,
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                    }}>Categorias</Text>

                                    <ScrollView
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                        style={{
                                            marginTop: 20,
                                            paddingBottom: 5,
                                        }}
                                    >
                                        {categorias.map((item, index) => (
                                            <Pressable
                                                onPress={() => handleSelectCategoria(index)}
                                                key={"Cat-" + index}
                                                style={{
                                                    alignItems: 'center',
                                                    width: 70,
                                                    marginVertical: 10
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
                                    </ScrollView>
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
                                        key={"row" + row}
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
                                                        key={"plusButton"}
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
                                                    key={"Ave" + column}

                                                    selected={selector ? selectedItems[row][column]?.selected : undefined}
                                                    tamañoCuadrado={(width / 2 - 30)}
                                                    item={e}

                                                    onPress={() => handlePressAventura(e, row, column)}
                                                    onLongPress={() => handleLongPressAventura(e, row, column)}
                                                    handleSelectElemento={() => handleSelectAventura(e, row, column)}
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

            {selector && aventurasSeleccionadas().length !== 0 &&
                < View style={{
                    marginVertical: 20,
                    flexDirection: 'row',
                }}>

                    <Boton
                        style={{ flex: 1, marginRight: 10, backgroundColor: '#d90936', }}
                        loading={buttonLoading}
                        titulo={"Rechazar"}
                        onPress={handleRechazarAventuras}
                    />
                    <Boton
                        style={{ flex: 1, marginLeft: 10, backgroundColor: verdeTurquesa, }}
                        loading={buttonLoading}
                        titulo={"Aprovar"}
                        onPress={handleAprovarAventuras}
                    />
                </View>}
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colorFondo,
        flex: 1,
        padding: 20,
        paddingBottom: 0,
        paddingTop: 10,
        position: 'absolute',
        width,
        height,
    },

    filtrar: {
        borderRadius: 20,
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
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
