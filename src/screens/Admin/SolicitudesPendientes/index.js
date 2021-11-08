import React, { useEffect, useState } from 'react'
import {
    Alert,
    Linking,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput
} from 'react-native'

import { API, Auth } from 'aws-amplify';

import { formatAMPM, listSolicitudGuiasPendientes, meses, updateSolicitudGuia, createUsuarioAventura, updateUsuario, abrirStripeAccount, moradoClaro } from '../../../../assets/constants';

import { Loading } from '../../../components/Loading';
import Boton from '../../../components/Boton';

// import ModalAventura from '../../Perfil/components/ModalAventura';
import ModalDocs from './ModalDocs';

import RadioButton from '../../../components/RadioButton';
// import SelectorPersonas from '../../Explorar/4Logistica/SelectorPersonas';


export default () => {

    const [loading, setLoading] = useState(true);
    const [solicitudes, setSolicitudes] = useState([]);
    const [itemSelected, setItemSelected] = useState(null);

    const [botonLoading, setBotonLoading] = useState(false);

    const [tipoModal, setTipoModal] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    const [comentarios, setComentarios] = useState("");
    const [pedirDatos, setPedirDatos] = useState(false);

    const [capacidadMaxima, setCapacidadMaxima] = useState(1);


    useEffect(() => {
        fetch()
    }, []);

    const handleAprovar = async (idx) => {
        setBotonLoading("Aprovar")

        let newSolicitudes = [...solicitudes]
        const solicitud = solicitudes[idx]
        const sub = await Auth.currentUserInfo().then(a => a.attributes.sub).catch(e => console.log(e))
        const idSolicitante = solicitudes[idx].Usuario.id

        let promises = []
        // Actualizamos al usurio con su capacidad maxima
        promises.push(API.graphql({
            query: updateUsuario, variables: {
                input: {
                    id: idSolicitante,
                    capacidadMaxima
                }
            }
        }))


        // Primero actualizamos la solicitud con el usuario evaluador
        promises.push(API.graphql({
            query: updateSolicitudGuia, variables: {
                input: {
                    id: solicitud.id,
                    status: "aproved",
                    evaluadorID: sub,
                }
            }
        }))


        // Despues agregamos el guia a cada una de las aventuras verificadas
        promises.push(Promise.all(solicitudes[idx].AventurasAVerificar.map(av => (
            API.graphql({
                query: createUsuarioAventura, variables: {
                    input: {
                        aventuraID: av.id,
                        usuarioID: idSolicitante
                    }
                }
            }))
        )))

        // Finalmente esperamos que las promesas sean exitosas
        Promise.all(promises)
            .then(r => {
                newSolicitudes.splice(idx, 1)
                setSolicitudes(newSolicitudes)
                Alert.alert("Exito", "Solicitud aceptada con exito")
            })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error aprovando solicitud")
            })
        setBotonLoading(false)
    }

    const handleRechazar = async (idx) => {
        if (!comentarios) {
            Alert.alert("Error", "Escribe las razones por el rechazo")
            return
        }
        setBotonLoading("Rechazar")

        let promises = []
        let newSolicitudes = [...solicitudes]
        const solicitud = solicitudes[idx]
        const idSolicitante = solicitudes[idx].Usuario.id


        const sub = await Auth.currentUserInfo().then(a => a.attributes.sub).catch(e => console.log(e))

        if (pedirDatos) {
            promises.push(
                API.graphql({
                    query: updateUsuario, variables: {
                        input: {
                            id: idSolicitante,
                            tipo: null,
                        }
                    }
                })
            )
        }


        // Rechazar la solicitud con el usuario evaluador y el comentario
        promises.push(API.graphql({
            query: updateSolicitudGuia, variables: {
                input: {
                    id: solicitud.id,
                    status: "rejected",
                    evaluadorID: sub,
                    comentarios,
                }
            }
        }))

        Promise.all(promises)
            .then(r => {
                newSolicitudes.splice(idx, 1)
                setSolicitudes(newSolicitudes)
                Alert.alert("Exito", "Solicitud rechazada con exito")
            })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error rechazando solicitud")
            })

        setBotonLoading(false)
    }

    const handleAbrirAventura = (titulo, id) => {
        setTipoModal("Aventura")
        setModalVisible(true)
        setModalData({
            titulo, id
        })
    }

    const handleAbrirPerfil = (idGuia) => {
        setTipoModal("Perfil")
        setModalVisible(true)
        setModalData({
            idGuia
        })
    }

    const handleVerDocs = (idx) => {
        setTipoModal("VerDocs")
        setModalVisible(true)
        setModalData(solicitudes[idx].Usuario)

    }

    const handleLlamar = (idx) => {
        const tel = solicitudes[idx].Usuario.telefono
        if (!tel) {
            Alert.alert("Error", "No hay numero telefonico para este usuario")
        } else {
            Alert.alert("Llamar", ("Llamar a " + solicitudes[idx].Usuario.nickname + " al " + tel), [
                {
                    text: "Cancelar",
                    style: "cancel",

                },
                {
                    text: "Llamar",
                    onPress: () => {
                        const telefono = "tel:+521" + tel
                        Linking.openURL(telefono)
                    }
                },
            ])


        }

    }

    const formatDate = (date) => {
        const fecha = new Date(date)

        const año = fecha.getFullYear()
        const mes = meses[fecha.getMonth()]
        const dia = fecha.getDate()

        const hora = formatAMPM(fecha)

        return (dia + "/" + mes + "/" + año + " " + hora)
    }

    const fetch = async () => {
        API.graphql({ query: listSolicitudGuiasPendientes })
            .then(r => {
                setLoading(false)
                r = r.data.listSolicitudGuias.items

                r = r.map(solicitud => {
                    return {
                        ...solicitud,
                        AventurasAVerificar: solicitud.AventurasAVerificar.items.map(e => ({
                            titulo: e.aventura.titulo,
                            id: e.aventura.id
                        }))
                    }
                }).sort((a, b) => a.createdAt > b.createdAt)

                setSolicitudes(r)
            })
            .catch(e => {
                setLoading(false)
                console.log(e)
                Alert.alert("Error", "Error obteniendo datos")
            })
    }

    if (loading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            {solicitudes.length === 0 ?
                <Text>No hay solicitudes pendientes</Text>
                :
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={solicitudes}
                    renderItem={({ item, index }) => {
                        const fechaCreacion = formatDate(item.createdAt)
                        const selected = index === itemSelected
                        const tipo = item.Usuario.tipo
                        return (
                            <Pressable
                                onPress={() => {
                                    setItemSelected(selected ? null : index)

                                }}
                                style={{ ...styles.elemento, padding: 20, }}>

                                <View style={styles.header}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View>
                                            <Text
                                                onPress={() => {
                                                    handleAbrirPerfil(item.Usuario.id)
                                                }}
                                                style={styles.texto}>{item.Usuario.nickname}</Text>

                                        </View>
                                        <View style={{
                                            flex: 1,
                                            alignItems: 'flex-end',
                                        }}>
                                            <Text
                                                style={styles.texto}>{fechaCreacion}</Text>

                                        </View>
                                    </View>


                                    <Text style={{
                                        ...styles.texto,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}>{tipo[0].toUpperCase() + tipo.slice(1)}</Text>


                                    <Text
                                        onPress={() => abrirStripeAccount(item.Usuario.stripeID)}
                                        style={{
                                            ...styles.texto,
                                            alignSelf: 'center',
                                            borderBottomWidth: 1,
                                            borderColor: "#fff",
                                        }}>stripeID: {item.Usuario.stripeID}</Text>

                                </View>
                                {
                                    selected ?
                                        <View style={styles.body}>

                                            <Text
                                                onPress={() => handleVerDocs(index)}
                                                style={styles.cuadroTexto}>Ver documentos</Text>

                                            <Text
                                                onPress={() => handleLlamar(index)}
                                                style={{ ...styles.cuadroTexto, marginBottom: 20, }}>Llamar</Text>

                                            <Text style={{
                                                borderBottomColor: '#fff',
                                                alignSelf: 'flex-start',
                                                fontSize: 16,
                                                color: '#fff',
                                                fontWeight: 'bold',
                                            }}>Aventuras solicitadas:</Text>
                                            {item.AventurasAVerificar?.map((a, i) => (
                                                <View
                                                    key={i}
                                                    style={{
                                                        paddingVertical: 3
                                                    }}
                                                >
                                                    <Text
                                                        onPress={() => handleAbrirAventura(a.titulo, a.id)}

                                                        style={{
                                                            borderBottomWidth: .5,
                                                            borderBottomColor: '#fff',
                                                            alignSelf: 'flex-start',
                                                            fontSize: 16,
                                                            color: '#fff',
                                                        }}>
                                                        {a.titulo}
                                                    </Text>
                                                </View>
                                            ))}

                                            <View style={{ marginTop: 20 }}>
                                                <Text style={{
                                                    ...styles.texto,
                                                    fontWeight: 'bold',
                                                }}>Datos de contacto:</Text>
                                                {item.Usuario.redSocial ? <Text style={styles.texto}>Red social: {item.Usuario.redSocial}</Text> : null}
                                                {item.Usuario.sitioWeb ? <Text style={styles.texto}>https:\\{item.Usuario.sitioWeb}</Text> : null}
                                                {item.Usuario.telefono ? <Text style={styles.texto}>Telefono: {item.Usuario.telefono}</Text> : null}

                                            </View>

                                            {item.Usuario.comentariosAdicionales ? <View style={{ marginTop: 20 }}>
                                                <Text style={{
                                                    ...styles.texto,
                                                    fontWeight: 'bold',
                                                }}>Comentarios:</Text>
                                                <Text style={styles.texto}>{item.Usuario.comentariosAdicionales}</Text>
                                            </View> : null}


                                            {/* Comentarios a poner en la solicitud */}
                                            <TextInput
                                                multiline={true}
                                                style={styles.textInput}
                                                placeholderTextColor={"#c5c5c5"}
                                                value={comentarios}
                                                placeholder="Comentarios adicionales"
                                                onChangeText={setComentarios}
                                            />

                                            {/* Pedir otra vez los datos */}
                                            <Pressable
                                                onPress={() => setPedirDatos(!pedirDatos)}
                                                style={{
                                                    marginTop: 20,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text style={{
                                                    color: '#fff',
                                                }}>Pedir otra vez los datos</Text>
                                                <RadioButton
                                                    color={"white"}
                                                    checked={pedirDatos}
                                                    setChecked={setPedirDatos}
                                                />
                                            </Pressable>


                                            {/* Personas maximas */}
                                            <SelectorPersonas
                                                textColor={"white"}
                                                colorDesactivated={"#b3c8ff"}
                                                full={false}
                                                personas={capacidadMaxima}
                                                setPersonas={setCapacidadMaxima}
                                                titulo={"Personas maximas"}
                                                descripcion={"Sin contar el conductor"}
                                                minValue={1}
                                            />

                                            <View style={{ flexDirection: 'row', marginTop: 20, }}>
                                                <Boton
                                                    loading={botonLoading === "Rechazar"}
                                                    containerStyle={{ flex: 1, marginRight: 10, }}
                                                    onPress={() => handleRechazar(index)}
                                                    titulo={"Rechazar"}
                                                />
                                                <Boton
                                                    loading={botonLoading === "Aprovar"}
                                                    containerStyle={{ flex: 1, marginLeft: 10, backgroundColor: '#A3F154', }}
                                                    onPress={() => handleAprovar(index)}
                                                    titulo={"Aprovar"}
                                                />

                                            </View>
                                        </View> : null
                                }
                            </Pressable>
                        )
                    }}
                />}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                {tipoModal === "Aventura" ? <ModalAventura
                    setModalVisible={setModalVisible}
                    title={modalData.titulo}
                    aventuraKey={modalData.id}
                /> : tipoModal === "Perfil" ?
                    <ModalGuia
                        setModalVisible={setModalVisible}
                        idGuia={modalData.idGuia}
                    />
                    :
                    <ModalDocs
                        data={modalData}
                        setModalVisible={setModalVisible}
                    />
                }

            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
    },

    elemento: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: moradoClaro,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,


        justifyContent: 'center',

        borderRadius: 10,
    },

    texto: {
        color: '#fff',
        fontSize: 16,
        padding: 4,
        paddingLeft: 0,
    },

    icon: {
        position: 'absolute',
        left: 20,
    },

    body: {
        margin: 10,
    },

    cuadroTexto: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        marginTop: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        padding: 10,
    },

    textInput: {
        fontSize: 16,
        color: '#fff',
        paddingBottom: 20,
        borderBottomWidth: 1,
    }
})
