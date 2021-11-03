import React, { useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    Modal
} from 'react-native'

import { API, Storage } from 'aws-amplify';
import { listCategorias, validURL } from '../../../../assets/constants';

import { Loading } from '../../../components/Loading';

import { Entypo } from '@expo/vector-icons';
import AddAventura from './Modales/AddAventura';
import EditCategoria from './Modales/EditCategoria';
import AddCategoria from './Modales/AddCategoria';
import EditAventura from './Modales/EditAventura';

const SeleccionaAventura = ({ navigation }) => {

    useEffect(() => {
        fetchCategoria()
    }, []);


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    async function fetchCategoria() {
        API.graphql({ query: listCategorias })
            .then(async r => {
                r = r.data.listCategorias.items

                r.sort((a, b) => a.titulo > b.titulo)


                r = await Promise.all(r.map(async e => {

                    e.foto = {
                        uri: e.foto.startsWith("cat") ? await Storage.get(e.foto) : e.foto,
                        key: e.foto
                    }
                    return {
                        ...e
                    }
                }))

                setData(r)
                setLoading(false)

            })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error obteniendo las aventuras, vuelve a intentarlo")
            })
    }


    /////////////////////////////////////////////////////////////
    ////////////////Manejadores de aventura//////////////////////
    /////////////////////////////////////////////////////////////
    const handleEditAventura = (titulo, id, indexAventura, indexCategoria) => {
        setModalVisible(true)
        setModalData({
            tipo: "editAventura",
            titulo,
            indexAventura,
            indexCategoria,
            id
        })

    }

    const handleAddAventura = (indexCategoria) => {
        setModalVisible(true)
        setModalData({
            tipo: "addAventura",
            indexCategoria
        })

    }


    /////////////////////////////////////////////////////////////
    ////////////////Manejadores de categoria/////////////////////
    /////////////////////////////////////////////////////////////
    const handleEditCategoria = (index) => {
        setModalVisible(true)
        setModalData({
            tipo: "editCategoria",
            index
        })
    }

    const handleAddCategoria = () => {
        setModalVisible(true)
        setModalData({
            tipo: "addCategoria",
        })

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
                                onPress={() => handleEditCategoria(idxCategoria)}
                                style={styles.headerContainer}
                            >
                                <Image source={{ uri: categoria.foto.uri }} style={styles.image} />
                                <Text style={styles.title}>{categoria.titulo}</Text>
                                <Pressable
                                    onPress={() => handleAddAventura(idxCategoria)}
                                    style={{
                                        width: 60,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }} >
                                    <Entypo name="plus" size={40} color="black" />
                                </Pressable>

                            </Pressable>

                            {categoria.Aventuras?.items?.map((aventura, index) => {
                                return (
                                    <Pressable
                                        onPress={() => handleEditAventura(aventura.titulo, aventura.id, index, idxCategoria)}
                                        key={index}
                                        style={styles.elementContainer}
                                    >
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

                                )
                            })}


                        </View>)
                    })}
                    <View
                        style={styles.containerCategoria}>

                        <Pressable
                            onPress={handleAddCategoria}
                            style={styles.headerContainer}
                        >
                            <View style={{
                                ...styles.image,
                            }} >
                                <Entypo name="plus" size={40} color="black" />
                            </View>
                            <Text style={styles.title}>Agregar categoria</Text>

                        </Pressable>
                    </View>
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
                {modalData.tipo === "editAventura" ?
                    <EditAventura
                        setModalVisible={setModalVisible}
                        indexAventura={modalData.indexAventura}
                        indexCategoria={modalData.indexCategoria}
                        titulo={modalData.titulo}
                        id={modalData.id}
                        data={data}
                        setData={setData}
                    />
                    :
                    modalData.tipo === "editCategoria" ?
                        <EditCategoria
                            setModalVisible={setModalVisible}
                            indexCategoria={modalData.index}
                            data={data}
                            setData={setData}
                        /> :
                        modalData.tipo === "addAventura" ?
                            <AddAventura
                                setData={setData}
                                data={data}
                                indexCategoria={modalData.indexCategoria}
                                setModalVisible={setModalVisible}
                            /> :
                            <AddCategoria
                                data={data}
                                setData={setData}
                                setModalVisible={setModalVisible}
                            />
                }

            </Modal>

        </View>

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

        backgroundColor: '#f3f7f5',

        flexDirection: 'row',

        borderColor: 'black',
        borderBottomWidth: .5,


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
    }
})
