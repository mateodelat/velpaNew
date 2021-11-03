import { API, Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View, ScrollView, Image, Linking, Modal, Pressable } from 'react-native'


import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Loading } from '../../../components/Loading';
import { getSolicitudesUsuario, listSolicitudGuias, listSolicitudGuiasVerificadas } from '../../../../assets/constants';
import ImageFullScreen from '../../../components/ImageFullScreen';

const deleteSolicitudGuia = /* GraphQL */ `
  mutation DeleteSolicitudGuia(
    $input: DeleteSolicitudGuiaInput!
  ) {
    deleteSolicitudGuia(input: $input) {
      id
      AventurasAVerificar {
            items {
                id
            }
        }
    }
  }
`;

export const deleteSolicitudAventura = /* GraphQL */ `
  mutation DeleteSolicitudAventura(
    $input: DeleteSolicitudAventuraInput!
  ) {
    deleteSolicitudAventura(input: $input) {
      id
    }
  }
`;



const index = ({ navigation }) => {
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

                const newArray = (await Promise.all(r.map(async e => {
                    const aventuras = e.AventurasAVerificar.items.map(i => i.aventura.titulo).sort()

                    const selfie = e.Usuario.selfie.startsWith("usr-") ? await Storage.get(e.Usuario.selfie) : e.Usuario.selfie

                    return {
                        comentarios: e.comentarios,
                        aproved: e.status,
                        id: e.id,
                        fechaCreacion: new Date(e.createdAt),
                        aventuras,
                        usuario: {
                            ...e.Usuario,
                            selfie,
                        },
                        evaluador: e.evaluador
                    }
                }))).sort((a, b) => a.fechaCreacion > b.fechaCreacion)


                setSolicitudes(newArray)
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
                solicitudes.length === 0 ?
                    <Text style={styles.texto}>No hay solicitudes para ser guia</Text> :
                    solicitudes.map((e, i) => (
                        <View
                            key={"Solcii", i}
                            style={styles.solicitudContainer}>
                            <View style={styles.bodyContainer}>

                                <View style={{ justifyContent: 'center', }}>
                                    {e.aproved === "pending" ? <Text style={{
                                        color: 'orange',
                                    }}>Pendiente...</Text> :
                                        e.aproved === "aproved" ? <Text style={{
                                            color: 'green',
                                        }}>Aprovada por {e.evaluador.nickname}</Text> :
                                            <Text style={{
                                                color: 'red',
                                            }}>Rechazada por {e.evaluador.nickname}</Text>}
                                    {
                                        e.aproved === "pending" ?
                                            <Feather
                                                style={styles.icon}
                                                name="clock"
                                                size={24}
                                                color="orange"
                                            />
                                            :
                                            e.aproved === "rejected" ? <Entypo
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
                                            onPress={() => Linking.openURL("tel:52" + e.usuario.telefono)}
                                            style={{
                                                textDecorationLine: "underline",
                                            }}
                                        >+52 1 {e.usuario.telefono}</Text></Text>

                                    </View>

                                </View>
                                <View style={styles.line} />

                                {e.aventuras?.map((e, i) => {
                                    return <View
                                        key={"Aventura", i}
                                        style={styles.aventuraContainer}>
                                        <Text>{i + 1}-  {e}</Text>
                                    </View>
                                })}
                                {e.comentarios &&
                                    <View style={{}}>
                                        <View style={styles.line} />
                                        <Text>{e.comentarios}</Text>
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

export default index

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },

    texto: {
        fontSize: 16,

    },

    solicitudContainer: {

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