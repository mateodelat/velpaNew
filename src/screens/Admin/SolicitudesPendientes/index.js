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

import { formatAMPM, listSolicitudGuiasPendientes, meses, updateSolicitudGuia, createUsuarioAventura, updateUsuario, abrirStripeAccount, moradoClaro, colorFondo, moradoOscuro, verdeTurquesa, openLink, googleSearch, getUserSub } from '../../../../assets/constants';

import { Loading } from '../../../components/Loading';
import Boton from '../../../components/Boton';

// import ModalAventura from '../../Perfil/components/ModalAventura';
import ModalDocs from './ModalDocs';

import RadioButton from '../../../components/RadioButton';
// import SelectorPersonas from '../../Explorar/4Logistica/SelectorPersonas';
import { DataStore } from '@aws-amplify/datastore';
import { StatusSolicitud, Usuario } from '../../../models';
import Selector from '../../../components/Selector';
import Line from '../../../components/Line';
import { SolicitudGuia } from '../../../models';
import { AventuraUsuario } from '../../../models';
import { TipoNotificacion } from '../../../models';
import { Notificacion } from '../../../models';


export default ({ navigation }) => {

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
        const solicitud = newSolicitudes[idx]
        try {
            // Obtener modelo de la solicitud
            const modelSolicitud = await DataStore.query(SolicitudGuia, solicitud.id)

            const sub = await getUserSub()
            const usuario = solicitudes[idx].Usuario

            // Actualizamos al usurio con su capacidad maxima
            await DataStore.save(Usuario.copyOf(usuario, (up) => {
                up.capacidadMaxima = capacidadMaxima
            }
            ))

            // Actualizamos la solicitud a aprovada con el usuario evaluador
            await DataStore.save(SolicitudGuia.copyOf(modelSolicitud, (updated) => {
                updated.status = StatusSolicitud.APROVADA
                updated.evaluadorID = sub
            }
            ))

            // Agregar al guia a aventuras verificadas
            await Promise.all(solicitud.Aventuras.map(async ave => {
                DataStore.save(new AventuraUsuario({
                    aventura: ave,
                    usuario
                }))
            }))

            // Mandar notificacion de solicitud aprovada
            await DataStore.save(new Notificacion({
                tipo: TipoNotificacion.SOLICITUDGUIAAPROVADA,

                titulo: "Solicitud aprovada",
                descripcion: "Ya puedes agregar fechas a las aventuras:" + (solicitud.Aventuras.map(e => (" " + e.titulo)))
                    + (comentarios ? ("\ncomentarios: " + comentarios) : ""),

                usuarioID: solicitud.usuarioID,
                owner: solicitud.owner,

                solicitudGuiaID: solicitud.id
            }))

            Alert.alert("Exito", "Solicitud aceptada con exito")


        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Error aprovando solicitud")
        }
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
        navigation.navigate("DetalleAventura", { id, titulo })
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

    const handleOpenRed = (red) => {
        googleSearch(red)
    }

    const handleOpenWeb = (sitio) => {
        openLink(sitio)

    }

    const fetch = async () => {
        API.graphql({ query: listSolicitudGuiasPendientes })
            .then(async r => {
                r = r.data.listSolicitudGuias.items
                r = (await Promise.all(r.map(async solicitud => {
                    return {
                        ...solicitud,
                        Aventuras: solicitud.Aventuras.items.map(e => {
                            return e.aventura
                        }),
                        Usuario: (await DataStore.query(Usuario, r.usuarioID))[0]
                    }
                })))
                    .sort((a, b) => a.createdAt > b.createdAt)
                setLoading(false)
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
                        const tipo = item.Usuario.tipo.toLowerCase()
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
                                                style={{
                                                    ...styles.texto,
                                                    color: moradoClaro
                                                }}>@{item.Usuario.nickname}</Text>
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
                                            borderColor: "#000",
                                        }}>Datos bancarios</Text>

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
                                            <Line />

                                            <Text style={{
                                                borderBottomColor: '#000',
                                                alignSelf: 'flex-start',
                                                fontSize: 16,
                                                color: '#000',
                                                fontWeight: 'bold',
                                                marginTop: 10,
                                            }}>Aventuras solicitadas:</Text>
                                            {item.Aventuras?.map((a, i) => (
                                                <View
                                                    key={i}
                                                >
                                                    <Text
                                                        onPress={() => handleAbrirAventura(a.titulo, a.id)}

                                                        style={{
                                                            alignSelf: 'flex-start',
                                                            fontSize: 16,
                                                            color: moradoClaro,
                                                            padding: 4,
                                                        }}>
                                                        {a.titulo}
                                                    </Text>
                                                </View>
                                            ))}

                                            <Line />

                                            <View>
                                                <Text style={{
                                                    ...styles.texto,
                                                    fontWeight: 'bold',
                                                }}>Datos de contacto:</Text>
                                                {item.Usuario.redSocial ? <Text onPress={() => handleOpenRed(item.Usuario.redSocial)} style={styles.texto}>Red social: {item.Usuario.redSocial}</Text> : null}
                                                {item.Usuario.sitioWeb ? <Text onPress={() => handleOpenWeb(item.Usuario.sitioWeb)} style={styles.texto}>https:\\{item.Usuario.sitioWeb}</Text> : null}
                                                {item.Usuario.telefono ? <Text style={styles.texto}>Telefono: {item.Usuario.telefono}</Text> : null}

                                            </View>

                                            {item.Usuario.comentariosAdicionales ? <View style={{ marginTop: 20 }}>
                                                <Text style={{
                                                    ...styles.texto,
                                                    fontWeight: 'bold',
                                                }}>Comentarios:</Text>
                                                <Text style={styles.texto}>{item.Usuario.comentariosAdicionales}</Text>
                                            </View> : null}

                                            <Line />

                                            {/* Pedir otra vez los datos */}
                                            <Pressable
                                                onPress={() => setPedirDatos(!pedirDatos)}
                                                style={{
                                                    paddingTop: 20,
                                                    paddingBottom: 20,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text style={{
                                                    color: '#000',
                                                    fontSize: 18,
                                                }}>Pedir otra vez los datos</Text>
                                                <RadioButton
                                                    color={"black"}
                                                    checked={pedirDatos}
                                                    setChecked={setPedirDatos}
                                                />
                                            </Pressable>


                                            <Selector
                                                cantidad={capacidadMaxima}
                                                setCantidad={setCapacidadMaxima}

                                                // maxReached
                                                // maxValue
                                                // minValue

                                                descripcion={"Sin contar el conductor"}
                                                titulo={"Personas maximas"}

                                            />

                                            <Line />


                                            {/* Comentarios a poner en la solicitud */}
                                            <TextInput
                                                multiline={true}
                                                style={styles.textInput}

                                                value={comentarios}
                                                placeholder="Comentarios adicionales"
                                                onChangeText={setComentarios}
                                            />



                                            <View style={{
                                                flexDirection: 'row',
                                                width: '100%',
                                                marginTop: 20,
                                            }}>
                                                <Boton
                                                    loading={botonLoading === "Rechazar"}
                                                    style={{ flex: 1, marginRight: 10, backgroundColor: '#d90936', }}
                                                    onPress={() => handleRechazar(index)}
                                                    titulo={"Rechazar"}
                                                />
                                                <Boton
                                                    loading={botonLoading === "Aprovar"}
                                                    style={{ flex: 1, marginLeft: 10, backgroundColor: verdeTurquesa, }}
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
                <ModalDocs
                    data={modalData}
                    setModalVisible={setModalVisible}
                />


            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colorFondo,
        flex: 1,
        padding: 20,
    },

    elemento: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: "#fff",

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
        color: '#000',
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

        padding: 10,
        backgroundColor: moradoOscuro,
    },

    textInput: {
        fontSize: 16,
        color: '#000',
        textAlign: 'left',
        backgroundColor: "#f4f6f6",
        borderRadius: 7,
        minHeight: 100,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',

    }
})
