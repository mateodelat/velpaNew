import React, { useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    Modal,
    TouchableOpacity
} from 'react-native'

import { API, Storage } from 'aws-amplify';

import { Loading } from '../../../components/Loading';
import { getMaterialAventura, listFechasYReservasCat, meses } from '../../../../assets/constants';

import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ModalAventura from '../GuiasAutorizados/ModalAventura';
import ModalFechaDetalle from './Modales/ModalFechaDetalle';

const SeleccionaAventura = ({ navigation }) => {

    useEffect(() => {
        fetchCategoria()
    }, []);


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    async function fetchCategoria() {
        API.graphql({ query: listFechasYReservasCat })
            .then(async r => {
                r = r.data.listCategorias.items

                r.sort((a, b) => a.titulo > b.titulo)

                // Filtrar categorias por aventuras que tengan fechas
                r = r.filter(r => {
                    return r.Aventuras.items[0].Fechas.items.length !== 0
                })

                // Filtrar aventuras por aventuras con fecha
                r = r.map(cat => {
                    const Aventuras = cat.Aventuras.items.filter(ave => ave.Fechas.items.length !== 0)

                    return {
                        ...cat,
                        Aventuras
                    }
                })


                r = (await Promise.all(r.map(async cate => {
                    cate.foto = cate.foto.startsWith("cat") ? await Storage.get(cate.foto) : cate.foto

                    const Aventuras = cate.Aventuras.map(ave => {

                        const Fechas = ave.Fechas.items.map(fe => {
                            const Guia = fe.Guia.items[0]
                            const Reservaciones = fe.Reservaciones.items

                            return {
                                ...fe,
                                Guia,
                                Reservaciones
                            }
                        })
                        return {
                            ...ave,
                            Fechas
                        }
                    })

                    return {
                        ...cate,
                        Aventuras
                    }
                })))


                setData(r)
                setLoading(false)

            })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error obteniendo las aventuras, vuelve a intentarlo")
            })
    }

    const abrirAventura = (aventuraID, titulo) => {
        setModalData({
            tipo: "aventura",
            aventuraID,
            titulo
        })
        setModalVisible(true)
    }

    const abrirPefilGuia = (guiaID) => {
        setModalData({
            tipo: "guia",
            guiaID,
        })
        setModalVisible(true)
    }

    const abrirFechaDetalle = (fechaID, titulo, aventuraID, guiaID, nickname) => {
        setModalData({
            tipo: "fecha",
            fechaID,
            aventuraID,
            guiaID,
            nickname,
            titulo
        })
        setModalVisible(true)
    }


    if (loading) {
        return <Loading valor={1} />
    }

    return (
        <View style={styles.container}>
            {data.length === 0 ?
                <Text>No hay datos</Text> :
                <ScrollView
                    style={{ paddingTop: 20, }}
                    showsVerticalScrollIndicator={false}
                >

                    {data.map((categoria, idxCategoria) => {

                        return (<View
                            key={"categoria-", idxCategoria}
                            style={styles.containerCategoria}>

                            <Pressable
                                style={styles.headerContainer}
                            >
                                <Image source={{ uri: categoria.foto }} style={styles.image} />
                                <Text style={styles.title}>{categoria.titulo}</Text>
                                <View
                                    style={{
                                        width: 60,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }} >
                                </View>

                            </Pressable>

                            {categoria.Aventuras?.map((aventura, index) => {
                                const impar = (!(index % 2))
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            ...styles.elementContainer,
                                            backgroundColor: impar ? '#d4e3dc' : "'#f3f7f5'",
                                        }}
                                    >

                                        {/* Titulo de aventura */}
                                        <Pressable
                                            onPress={() => abrirAventura(aventura.id, aventura.titulo)}
                                            style={{
                                                flexDirection: 'row',
                                                marginVertical: 8,
                                            }}>
                                            <View style={{
                                                width: 60,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }} />

                                            <Text style={{ flex: 1, textAlign: 'center', }}>{aventura.titulo}</Text>
                                            <View style={{
                                                width: 60,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }} />
                                        </Pressable>

                                        {/* Fechas por aventura */}
                                        {aventura.Fechas.map((fe, idxFecha) => {
                                            const fechaInicial = new Date(fe.fechaInicial)
                                            const fechaFinal = new Date(fe.fechaFinal)

                                            return (
                                                <View
                                                    key={"fe", idxFecha}
                                                    style={{
                                                        marginTop: 10,
                                                        borderTopWidth: 1,
                                                        margin: 5,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}>

                                                    {/* Seccion de fecha y nombre de guia */}
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            const titulo = fechaInicial.getUTCDate() + " " + meses[fechaFinal.getUTCMonth()]
                                                            abrirFechaDetalle(fe.id, titulo, aventura.id, fe.Guia.id, fe.Guia.nickname)
                                                            // Alert.alert("*Abrir detalles de fecha*", "Itinerario,Duracion,fecha creacion,Ubicacion Nombre,Link,precio,comision,denyTercera,materialIncluido,Materiales,¿Cambiado por el guia?")
                                                        }}
                                                        style={{
                                                            width: '35%',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            alignSelf: 'stretch',
                                                        }}>
                                                        {/* Si la aventura es un dia se hace una cosa */}
                                                        {fe.fechaInicial === fe.fechaFinal ?
                                                            <View style={styles.numFechaContainer}>
                                                                <Text>{fechaInicial.getUTCDate()} </Text>
                                                                <Text>{meses[fechaInicial.getUTCMonth()]}</Text>
                                                            </View> :
                                                            // Si el mes inicial es igual al final se pone uno solo
                                                            meses[fechaInicial.getUTCMonth()] === meses[fechaFinal.getUTCMonth()] ?
                                                                <View style={styles.numFechaContainer}>
                                                                    <Text>{fechaInicial.getUTCDate()}</Text>
                                                                    <Text> - {fechaFinal.getUTCDate()} </Text>
                                                                    <Text>{meses[fechaFinal.getUTCMonth()]}</Text>
                                                                </View>
                                                                :
                                                                <View style={styles.numFechaContainer}>
                                                                    <Text>{fechaInicial.getUTCDate()} </Text>
                                                                    <Text>{meses[fechaInicial.getUTCMonth()]}</Text>
                                                                    <Text> - {fechaFinal.getUTCDate()} </Text>
                                                                    <Text>{meses[fechaFinal.getUTCMonth()]}</Text>
                                                                </View>
                                                        }
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                abrirPefilGuia(fe.Guia.id)

                                                            }}
                                                        >
                                                            <Text style={{
                                                                padding: 5,
                                                                color: "#3e93c1",
                                                                textDecorationLine: "underline",
                                                            }}>{fe.Guia.nickname}</Text>
                                                        </TouchableOpacity>

                                                        <Text
                                                            style={styles.textosFecha}
                                                        >Max: {fe.personasTotales} </Text>
                                                        <Text
                                                            style={styles.textosFecha}
                                                        >Precio/p: ${fe.precio}</Text>
                                                        <Text
                                                            style={styles.textosFecha}
                                                        >Comision: {fe.comision * 100}%</Text>
                                                        <Entypo
                                                            style={{
                                                                marginVertical: 2,
                                                            }}
                                                            onPress={() => {
                                                                Alert.alert("*Abrir grupo*", "ID: " + fe.messagingID)
                                                            }} name="chat" size={24} color="black" />

                                                    </TouchableOpacity>

                                                    {/* Render de cada Reservacion */}
                                                    <View style={{
                                                        flex: 1,
                                                    }}>
                                                        {fe.Reservaciones.map((res, idxRes) => {
                                                            return (
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        Alert.alert("*Abrir detalle reservacion*",
                                                                            "ID pago, usuario, fecha en que se hizo, personas desgolzadas(Adultos, tercera, niños)"

                                                                        )
                                                                    }}
                                                                    key={idxRes}
                                                                    style={styles.reservacionContainer}>

                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                    }}>
                                                                        <Text
                                                                            style={styles.textosFecha}
                                                                        >{res.personas} </Text>
                                                                        <Ionicons name="people" size={24} color="black" />
                                                                    </View>
                                                                    <Text
                                                                        style={styles.textosFecha}
                                                                    >Sin comision: ${res.total}</Text>
                                                                    <Text
                                                                        style={styles.textosFecha}
                                                                    >Comision: ${Math.round(res.comisionPorPersona)}</Text>
                                                                </TouchableOpacity>
                                                            )
                                                        })}
                                                    </View>

                                                </View>
                                            )
                                        })}

                                    </View>

                                )
                            })}


                        </View>)
                    })}
                </ScrollView>
            }

            {/* Secccion de modales */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                {
                    modalData.tipo === "aventura" ?
                        <ModalAventura
                            setModalVisible={setModalVisible}
                            id={modalData.aventuraID}
                            titulo={modalData.titulo}
                        /> :
                        modalData.tipo === "guia" ?
                            <ModalGuia
                                setModalVisible={setModalVisible}
                                idGuia={modalData.guiaID}
                                admin={true}
                            />
                            :
                            modalData.tipo === "fecha" ?
                                <ModalFechaDetalle
                                    setModalVisible={setModalVisible}
                                    setModalData={setModalData}
                                    data={modalData}
                                />
                                :
                                <ModalGuia
                                    setModalVisible={setModalVisible}
                                    idGuia={modalData.idGuia}
                                    admin={true}
                                />


                }

            </Modal>

        </View >

    )
}

export default SeleccionaAventura

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },

    containerCategoria: {
        borderWidth: .5,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 40,
    },

    headerContainer: {
        padding: 5,
        paddingLeft: 10,
        flexDirection: 'row',
    },

    elementContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },

    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: "cover",
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        flex: 1,
        textAlign: 'center',
    },

    checkContainer: {
        backgroundColor: 'lightgray',
        borderRadius: 5,
        height: 24,
        width: 24,
    },

    numFechaContainer: {
        flexDirection: 'row',
        marginVertical: 1,
    },

    textosFecha: {
        marginVertical: 1,
    },

    reservacionContainer: {
        alignItems: 'center',
        marginVertical: 6,
        borderColor: "gray",
        marginHorizontal: 10,
        borderBottomWidth: 1,
    }
})
