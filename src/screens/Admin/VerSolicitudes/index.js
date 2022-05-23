import { API, Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View, ScrollView, Image, Linking, Modal, Pressable } from 'react-native'


import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Loading } from '../../../components/Loading';
import { colorFondo, getImageUrl, getSolicitudesUsuario, listSolicitudGuias, listSolicitudGuiasVerificadas } from '../../../../assets/constants';
import ImageFullScreen from '../../../components/ImageFullScreen';
import { StatusSolicitud, Usuario } from '../../../models';
import { DataStore, DataStoreClass } from '@aws-amplify/datastore';




export default ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [solicitudes, setSolicitudes] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    const [modalData, setModalData] = useState({
        images: [],
        usuario: "Usuario"
    });

    const formatDate = (fecha) => {
        return (fecha.toLocaleString().slice(0, 24))
    }


    useEffect(() => {

        API.graphql({ query: listSolicitudGuiasVerificadas })
            .then(async r => {
                r = r.data.listSolicitudGuias.items
                r = await Promise.all(r.map(async e => {
                    const Aventuras = e.Aventuras.items.map(e => e.aventura)

                    const usuario = await DataStore.query(Usuario, e.usuarioID)

                    const selfie = await getImageUrl(usuario.selfie)

                    const evaluador = await DataStore.query(Usuario, e.evaluadorID)

                    return {
                        ...e,
                        Aventuras,
                        fechaCreacion: new Date(e.createdAt),
                        usuario: {
                            ...usuario,
                            selfie
                        },
                        evaluador
                    }
                }))

                setSolicitudes(r)
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
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            {
                solicitudes.length === 0 ?
                    <Text style={styles.texto}>No hay solicitudes para ser guia</Text> :
                    solicitudes.map((e, i) => (
                        <View
                            key={"Solcii" + i}
                            style={styles.solicitudContainer}>
                            <View style={styles.bodyContainer}>

                                <View style={{ justifyContent: 'center', }}>
                                    {e.status === StatusSolicitud.PENDIENTE ? <Text style={{
                                        color: 'orange',
                                    }}>Pendiente...</Text> :
                                        e.status === StatusSolicitud.APROVADA ? <Text style={{
                                            color: 'green',
                                        }}>Aprovada por {e.evaluador.nickname}</Text> :
                                            <Text style={{
                                                color: 'red',
                                            }}>Rechazada por {e.evaluador.nickname}</Text>}
                                    {
                                        e.status === StatusSolicitud.PENDIENTE ?
                                            <Feather
                                                style={styles.icon}
                                                name="clock"
                                                size={24}
                                                color="orange"
                                            />
                                            :
                                            e.status === StatusSolicitud.RECHAZADA ? <Entypo
                                                style={styles.icon}
                                                name="cross"
                                                size={24}
                                                color="red"
                                            /> :
                                                <Entypo
                                                    style={styles.icon}
                                                    name="check"
                                                    size={24}
                                                    color="green"
                                                />
                                    }
                                    <Text>{formatDate(e.fechaCreacion)}</Text>
                                </View>

                                <View style={{
                                    marginVertical: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Pressable
                                        onPress={() => {
                                            setModalData({
                                                images: [{
                                                    url: e.usuario.selfie
                                                }],
                                                usuario: e.usuario.nickname
                                            })
                                            setModalVisible(true)
                                        }}
                                    >
                                        <Image
                                            source={{ uri: e.usuario.selfie }} style={{
                                                resizeMode: "cover",
                                                height: 50,
                                                width: 50,
                                                marginRight: 20,
                                                borderRadius: 25,

                                            }} />

                                    </Pressable>
                                    <View style={{}}>
                                        <Text
                                            onPress={() => Alert.alert("*Mostrar el perfil del guia con sus documentos*")}
                                            style={{
                                                color: 'blue',
                                            }}>{e.usuario.nickname}</Text>
                                        <Text>Capacidad: {e.usuario.capacidadMaxima} personas</Text>
                                        <Text>Telefono: <Text
                                            onPress={() => Linking.openURL("tel:" + e.usuario.telefono)}
                                            style={{
                                                textDecorationLine: "underline",
                                            }}
                                        >{e.usuario.telefono}</Text></Text>

                                    </View>

                                </View>
                                <View style={styles.line} />

                                {e.Aventuras?.map((e, i) => {

                                    return <View
                                        key={"Aventura" + i}
                                        style={styles.aventuraContainer}>
                                        <Text>{i + 1}-  {e.titulo}</Text>
                                    </View>
                                })}
                                {e.mensaje &&
                                    <View style={{}}>
                                        <View style={styles.line} />
                                        <Text>{e.mensaje}</Text>
                                    </View>}
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
                <ImageFullScreen
                    setModalVisible={setModalVisible}
                    images={modalData.images}
                    titulo={modalData.usuario}
                />

            </Modal>


            <View style={{ marginBottom: 40, }} />
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: colorFondo,
    },

    texto: {
        fontSize: 16,

    },

    solicitudContainer: {



        marginVertical: 10,
        padding: 20,


        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#fff',
        borderRadius: 7,

        flexDirection: 'row',


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