import { API, Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import {
    Alert,
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Linking,
    Modal,
    Pressable
} from 'react-native'


import { Entypo } from '@expo/vector-icons';

import { Loading } from '../../../components/Loading';
import { deleteUsuarioAventura, listGuiasAutorizadosPorAventura } from '../../../../assets/constants';
import ImageFullScreen from '../../../components/ImageFullScreen';
import ModalAventura from './ModalAventura';


export default ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [aventuras, setAventuras] = useState([]);

    const [loadingButton, setLoadingButton] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);


    const [modalData, setModalData] = useState({
        images: [],
        usuario: "Usuario"
    });

    const formatDate = (fecha) => {
        return (fecha.toLocaleString().slice(0, 24))
    }

    const handleDelete = (idxAve, idxUsr) => {
        const aventura = aventuras[idxAve]
        const usuario = aventura.usuariosAutorizados[idxUsr]

        function continuar() {
            setLoadingButton({
                idxAve,
                idxUsr
            })

            let newArray
            newArray = [...aventuras]

            newArray[idxAve].usuariosAutorizados.splice(idxUsr, 1)

            API.graphql({
                query: deleteUsuarioAventura, variables: {
                    input: { id: usuario.usuarioAventuraID }
                }
            })
                .then(async r => {
                    setLoadingButton({
                        idxAve: null,
                        idxUsr: null
                    })
                    setAventuras(newArray)
                    Alert.alert("Exito", "Usuario quitado de la aventura con exito", [
                        {
                            text: "OK",
                        },
                    ])
                })
                .catch(e => {
                    console.log(e)
                    Alert.alert("Error", "Error eliminando la solicitud, revisa tu conexion")
                })
        }
        Alert.alert("Bloquear acceso a aventura", "Seguro que quieres quitar a " + usuario.nickname + " de " + aventura.titulo.toLowerCase(), [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "OK",
                onPress: continuar
            },
        ])

    }


    useEffect(() => {

        API.graphql({ query: listGuiasAutorizadosPorAventura })
            .then(async r => {
                r = r.data.listAventuras.items

                const newArray = (await Promise.all(r.map(async ave => {


                    const imagenFondo = ave.imagenFondo.startsWith("ave-") ? await Storage.get(ave.imagenFondo) : ave.imagenFondo

                    const usuariosAutorizados = await Promise.all(ave.usuariosAutorizados.items.map(async usr => {
                        const usuarioAventuraID = usr.id
                        usr = usr.usuario
                        const selfie = usr.selfie.startsWith("usr-") ? await Storage.get(usr.selfie) : usr.selfie

                        return {
                            ...usr,
                            usuarioAventuraID,
                            selfie
                        }
                    }))

                    return {
                        ...ave,
                        usuariosAutorizados,
                        imagenFondo
                    }
                }))).sort((a, b) => a.titulo > b.titulo)


                setAventuras(newArray)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "No se han podido obtener los datos", [{
                    text: "Ok",
                    onPress: () => navigation.popToTop()
                }])
            })
    }, []);


    if (loading) {
        return <Loading />
    }


    return (
        <ScrollView style={styles.container}>
            {
                aventuras.length === 0 ?
                    <Text style={styles.texto}>No hay aventuras</Text> :
                    aventuras.map((ave, idxAve) => (
                        <View
                            key={"Solcii", idxAve}
                            style={styles.aventuraContainer}>
                            <View style={styles.bodyContainer}>
                                <Pressable
                                    style={styles.headerContainer}
                                    onPress={() => {
                                        setModalData({
                                            aventuraID: ave.id,
                                            titulo: ave.titulo
                                        })
                                        setModalVisible(true)
                                    }}
                                >


                                    <Pressable
                                        onPress={() => {
                                            setModalData({
                                                images: [{
                                                    url: ave.imagenFondo
                                                }],
                                                usuario: ave.titulo,
                                                tipo: "image",

                                            })
                                            setModalVisible(true)
                                        }}
                                    >

                                        <Image
                                            source={{ uri: ave.imagenFondo }} style={{
                                                resizeMode: "cover",
                                                width: 90,
                                                aspectRatio: 3 / 2,
                                                marginRight: 20,
                                                borderRadius: 8,

                                            }} />
                                    </Pressable>

                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                    }}>{ave.titulo}</Text>
                                </Pressable>

                                <View style={styles.line} />

                                {ave.usuariosAutorizados.map((usr, idxUsr) => {

                                    return (
                                        <View
                                            key={"usr-", idxUsr}
                                            style={{
                                                marginVertical: 10,
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                            {loadingButton.idxAve === idxAve && loadingButton.idxUsr === idxUsr ?
                                                <ActivityIndicator
                                                    style={{
                                                        width: 50,
                                                        marginRight: 10,

                                                    }}
                                                    color={"black"}
                                                    size={'small'}
                                                /> :
                                                <Entypo
                                                    onPress={() => handleDelete(idxAve, idxUsr)}
                                                    style={{
                                                        padding: 10,
                                                        marginRight: 10,
                                                    }}
                                                    name="cross"
                                                    size={30}
                                                    color="red" />
                                            }

                                            <View style={{ flex: 1, }}>
                                                <Text
                                                    onPress={() => Alert.alert("*Mostrar el perfil del guia con sus documentos*")}
                                                    style={{
                                                        color: 'blue',
                                                    }}>{usr.nickname}</Text>
                                                <Text style={{
                                                    fontSize: 16,
                                                }}>Capacidad: {usr.capacidadMaxima} personas</Text>
                                                <Text style={{
                                                    fontSize: 16,
                                                }}>Telefono: <Text
                                                    onPress={() => Linking.openURL("tel:52" + usr.telefono)}
                                                    style={{
                                                        textDecorationLine: "underline",
                                                    }}
                                                >{usr.telefono}</Text></Text>
                                            </View>
                                            <Pressable
                                                onPress={() => {
                                                    setModalData({
                                                        images: [{
                                                            url: usr.selfie
                                                        }],
                                                        tipo: "image",
                                                        usuario: usr.nickname
                                                    })
                                                    setModalVisible(true)
                                                }}
                                            >

                                                <Image
                                                    source={{ uri: usr.selfie }} style={{
                                                        resizeMode: "cover",
                                                        height: 50,
                                                        width: 50,
                                                        marginRight: 20,
                                                        borderRadius: 25,

                                                    }} />
                                            </Pressable>


                                        </View>
                                    )

                                })}

                            </View>

                        </View>
                    ))
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                {
                    modalData.tipo === "image" ?
                        <ImageFullScreen
                            setModalVisible={setModalVisible}
                            images={modalData.images}
                            titulo={modalData.usuario}
                        /> :
                        // modalData.tipo === "aventura"?
                        <ModalAventura
                            setModalVisible={setModalVisible}
                            id={modalData.aventuraID}
                            titulo={modalData.titulo}
                        />

                }

            </Modal>


            <View style={{ marginBottom: 40, }} />
        </ScrollView >
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },

    aventuraContainer: {

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,


        marginVertical: 10,
        padding: 20,


        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#fff',
        borderColor: "gray",
        borderWidth: .5,
        borderRadius: 20,

        flexDirection: 'row',


    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    bodyContainer: {
        flex: 1,
    },

    icon: {
        position: 'absolute',
        right: 15,
        padding: 10,
        borderRadius: 10,
    },

    line: {
        backgroundColor: '#595959',
        height: 1,
        alignSelf: 'center',
        width: '100%',
        marginVertical: 20,
    },

})