import API from '@aws-amplify/api';
import { DataStore } from '@aws-amplify/datastore';
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { colorFondo, container, formatAMPM, formatDateShort, getImageUrl, getUserSub, listSolicitudes, mayusFirstLetter, meses, moradoOscuro } from '../../../assets/constants'
import Flecha from '../../components/Flecha';
import { Loading } from '../../components/Loading';
import { EstadoAventura, SolicitudGuia } from '../../models';
import { Aventura } from '../../models';
import { Usuario } from '../../models';
import { StatusSolicitud } from '../../models';

import { Feather } from '@expo/vector-icons';

const { height } = Dimensions.get("screen")

export default function ({ navigation, route }) {

    const [solicitudesGuia, setSolicitudesGuia] = useState(!route.params);
    const [requestGuia, setRequestGuia] = useState(null);
    const [aventuras, setAventuras] = useState(null);

    useEffect(() => {
        fetchSolicitudes()
    }, []);

    const formatDateWithHour = (msInicial,) => {
        const dateInicial = new Date(msInicial)

        const ddInicial = String(dateInicial.getUTCDate())
        const mmInicial = String(dateInicial.getUTCMonth())



        return ddInicial + " de " + meses[mmInicial] + " " + formatAMPM(msInicial, false, true)

    }

    const handleNavigateDocs = () => {
        navigation.navigate("SolicitudGuia", { screen: "CapturaDocumentos1" })
    }

    function handleNavigateAventura(id) {
        navigation.navigate("DetalleAventura", { id })

    }

    function handleBorrarSolicitud(idx) {
        let newSolicitudes = [...requestGuia]


        DataStore.delete(SolicitudGuia, requestGuia[idx].id)
            .then(r => {
                console.log(r)
                newSolicitudes.splice(idx, 1)
                setRequestGuia(newSolicitudes)

            })



    }


    const fetchSolicitudes = async () => {
        const sub = await getUserSub()

        // Obtener solicitudes de permiso a crear fechas
        API.graphql({ query: listSolicitudes, variables: { sub } })
            .then(async r => {
                r = await Promise.all(r.data.listSolicitudGuias.items
                    .filter(e => !e._deleted)
                    .sort((a, b) => a.createdAt < b.createdAt)
                    .map(async e => ({
                        ...e,

                        evaluador: await DataStore.query(Usuario, e.evaluadorID).then(async r => {
                            return ({
                                foto: await getImageUrl(r.foto),
                                nickname: r.nickname
                            })
                        }),

                        Aventuras: await Promise.all(e.Aventuras.items.map(async (ave, idx) => {
                            ave = ave.aventura
                            return {
                                id: ave.id,
                                titulo: ave.titulo,
                                imagenFondo: !idx ? await getImageUrl(ave.imagenDetalle[ave.imagenFondoIdx]) : null
                            }
                        })
                        )
                    })))
                setRequestGuia(r)
            })


        // Obtener aventuras creadas por el usuario usuario no autorizadas y pendientes
        DataStore.query(Aventura, a => a
            .usuarioID("eq", sub)
        )
            .then(async r => {

                // Obtener imagen de fondo
                r = await Promise.all(r.map(async ave => {
                    const imagenFondo = await getImageUrl(ave.imagenDetalle[ave.imagenFondoIdx])
                    return {
                        ...ave,
                        imagenFondo
                    }
                }))
                setAventuras(r)
            })
    }

    return (
        <View style={container}>

            <View style={styles.selectorContainer}>
                <Pressable
                    onPress={() => setSolicitudesGuia(true)}
                    style={{
                        ...styles.itemSelector,
                        backgroundColor: solicitudesGuia ? moradoOscuro : '#fff',

                    }}>
                    <Text style={{ color: solicitudesGuia ? "#fff" : "#444", }}>Solicitud a guia</Text>
                </Pressable>

                <Pressable
                    onPress={() => setSolicitudesGuia(false)}
                    style={{
                        ...styles.itemSelector,
                        backgroundColor: !solicitudesGuia ? moradoOscuro : '#fff',

                    }}>
                    <Text style={{ color: !solicitudesGuia ? "#fff" : "#444", }}>Experiencias</Text>
                </Pressable>


            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {
                    !requestGuia ?
                        <Loading indicator />
                        :
                        solicitudesGuia ?
                            requestGuia.length === 0 ?
                                <View style={{
                                    height: height / 1.5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={styles.noItems}>No tienes ninguna solicitud</Text>
                                </View>
                                :
                                requestGuia.map((e, i) => {
                                    const status = e.status
                                    return <View
                                        key={i}
                                        style={styles.solicitudContainer}>
                                        <Image
                                            style={styles.imagenAventura}
                                            source={{ uri: e.Aventuras[0]?.imagenFondo }} />

                                        <View style={styles.bodySolicitud}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                                                <View style={{ flex: 1, }}>
                                                    {e.Aventuras.map((ave, i) => {
                                                        return <Text
                                                            key={i}
                                                            style={styles.tituloAventuras} >{mayusFirstLetter(ave.titulo)}</Text>
                                                    })}
                                                </View>

                                                <Text>{formatDateWithHour(e.createdAt)}</Text>
                                            </View>

                                            {/* Mensaje de estado aventura */}
                                            <View style={styles.messageBox}>
                                                {
                                                    status === StatusSolicitud.PENDIENTE ?
                                                        <View style={[styles.statusContainer, { backgroundColor: 'orange', }]}>
                                                            <Text style={styles.txtStatus}>Pendiente</Text>
                                                        </View>
                                                        :
                                                        status === StatusSolicitud.APROVADA ?
                                                            <View style={[styles.statusContainer, { backgroundColor: 'green', }]}>
                                                                <Text style={styles.txtStatus}>Aprovada</Text>
                                                            </View>
                                                            :
                                                            <View style={[styles.statusContainer, { backgroundColor: 'red', }]}>
                                                                <Text style={styles.txtStatus}>Rechazada</Text>
                                                            </View>

                                                }
                                                {
                                                    e.message &&
                                                    <View style={styles.mensajeTxtContainer}>
                                                        <Image
                                                            source={{ uri: e.evaluador?.foto }}
                                                            style={styles.imagenEvaluador}
                                                        />
                                                        <View style={{ flex: 1, }}>
                                                            <Text style={styles.nicknameEvaluador}>{e.evaluador.nickname}</Text>
                                                            <Text>{e.message}</Text>
                                                        </View>

                                                        {status === StatusSolicitud.RECHAZADA && <Pressable
                                                            onPress={handleNavigateDocs}
                                                            style={styles.verDocsContainer}>
                                                            <Text style={styles.txtStatus}>Documentos</Text>
                                                        </Pressable>}

                                                    </View>
                                                }
                                            </View>
                                        </View>

                                        {/* Boton para borrar solicitud */}
                                        <Pressable
                                            onPress={() => handleBorrarSolicitud(i)}
                                            style={{
                                                backgroundColor: '#fff',
                                                padding: 4,
                                                borderRadius: 20,
                                                position: 'absolute',
                                                top: 10,
                                                left: 10,
                                            }}>
                                            <Feather name="trash" size={20} color="red" />
                                        </Pressable>
                                    </View>
                                })
                            :
                            !aventuras ?
                                <Loading indicator />
                                :
                                aventuras.length === 0 ?
                                    <View style={{
                                        height: height / 1.5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={styles.noItems}>No has creado ninguna aventura</Text>
                                    </View>
                                    :

                                    aventuras.map((e, i) => {
                                        const status = e.estadoAventura
                                        return <Pressable
                                            onPress={() => handleNavigateAventura(e.id)}
                                            key={i}
                                            style={styles.solicitudContainer}>
                                            <Image
                                                style={styles.imagenAventura}
                                                source={{ uri: e.imagenFondo }} />

                                            <View style={styles.bodySolicitud}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                                                    <View style={{ flex: 1, }}>
                                                        <Text
                                                            key={i}
                                                            style={{
                                                                color: '#000',
                                                            }} >{mayusFirstLetter(e.titulo)}</Text>
                                                    </View>

                                                    <Text>{formatDateShort(e.createdAt)}</Text>
                                                </View>

                                                {/* Mensaje de estado aventura */}
                                                <View style={styles.messageBox}>
                                                    {
                                                        status === EstadoAventura.PENDIENTE ?
                                                            <View style={[styles.statusContainer, { backgroundColor: 'orange', }]}>
                                                                <Text style={styles.txtStatus}>Pendiente</Text>
                                                            </View>
                                                            :
                                                            status === EstadoAventura.AUTORIZADO ?
                                                                <View style={[styles.statusContainer, { backgroundColor: 'green', }]}>
                                                                    <Text style={styles.txtStatus}>Aprovada</Text>
                                                                </View>
                                                                :
                                                                <View style={[styles.statusContainer, { backgroundColor: 'red', }]}>
                                                                    <Text style={styles.txtStatus}>Rechazada</Text>
                                                                </View>

                                                    }
                                                </View>
                                            </View>

                                            {/* Flecha navegar a aventura */}
                                            <Flecha
                                                style={{
                                                    position: 'absolute',
                                                    right: 10,
                                                    top: 10,
                                                }}
                                            />
                                        </Pressable>
                                    })
                }

            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    selectorContainer: {
        alignSelf: 'center',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 7,
        height: 50,
        marginBottom: 20,
        overflow: "hidden",
        flexDirection: 'row',
    },
    itemSelector: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },

    solicitudContainer: {
        backgroundColor: '#fff',
        overflow: "hidden",
        borderRadius: 7,
        width: '100%',
        marginBottom: 20,

    },

    bodySolicitud: {
        padding: 10,
    },

    imagenAventura: {
        width: '100%',
        height: 80,
        borderRadius: 7,
    },

    tituloAventuras: {
        color: '#777',
    },

    messageBox: {
        width: '100%',
        backgroundColor: "#F2F2F5",
        overflow: "hidden",
        marginTop: 20,

    },

    txtStatus: {
        color: '#fff',
        textAlign: 'center',
    },

    statusContainer: {
        width: '100%',
        padding: 10,
    },

    mensajeTxtContainer: {
        flexDirection: 'row', alignItems: 'center',
        padding: 10,
    },

    imagenEvaluador: {
        width: 25,
        height: 25,
        borderRadius: 25,
        marginRight: 10,
    },

    nicknameEvaluador: {
        fontWeight: 'bold',
        marginBottom: 4,
    },

    verDocsContainer: {
        padding: 10,
        borderRadius: 7,
        backgroundColor: moradoOscuro,
        marginLeft: 10,
    },

    noItems: {
        // fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    }
})
