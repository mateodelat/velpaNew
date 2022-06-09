import { DataStore } from '@aws-amplify/datastore'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { colorFondo, container, getUserSub, moradoOscuro, wait } from '../../../assets/constants'
import { Loading } from '../../components/Loading'
import { Notificacion } from '../../models'
import Element from './components/Element'
import { TipoNotificacion } from '../../models'


import { Entypo } from '@expo/vector-icons';

import moment from "moment";
import 'moment/locale/es'
import CalificaUsuarioModal from '../../components/CalificaUsuarioModal'
import { getAllScheduledNotificationsAsync } from 'expo-notifications'


moment.locale('es')


export default () => {


    const navigation = useNavigation()

    const [refreshing, setRefreshing] = useState(false);

    // Modal para calificar al guia
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    const [confirmDelete, setConfirmDelete] = useState(false);

    const [notificaciones, setNotificaciones] = useState(null);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchNotificaciones()
        wait(300).then(() => setRefreshing(false));
    }, []);


    const handleIrAReserva = (idReserva) => {
        navigation.navigate("MisReservas", idReserva)
    }

    const handleCalificaUser = (usuarioID, aventuraID, notificacionIdx) => {
        setModalVisible(true)
        setModalData({
            usuarioID,
            aventuraID,
            notificacionIdx
        })
    }

    const deleteAll = () => {

        if (confirmDelete) {
            notificaciones.forEach(n => {
                handleBorrarNotificacion(n)
            });
            setConfirmDelete(false)
            setNotificaciones([])
        } else {
            setConfirmDelete(true)

        }


    }

    const handleBorrarNotificacion = (notificationToErase) => {
        if (notificationToErase) {
            let newNotifications = [...notificaciones]
            newNotifications.splice(modalData.notificacionIdx, 1)
            setNotificaciones(newNotifications)

            DataStore.delete(Notificacion, notificationToErase.id)
        }

    }

    const handleIrAReservaEnFecha = (fechaID, reservaID) => {
        // Navegar a fechas y a la fecha especifica
        navigation.navigate("MisFechas")
        navigation.navigate("DetalleFecha", { fechaID, })
    }

    const handleVerTutorial = () => {
        // Alert.alert("Mostrar tutorial velpa")

    }

    const handleVerSolicitud = (aventura) => {
        navigation.navigate("MisSolicitudes", aventura ? true : undefined)

    }

    useEffect(() => {
        fetchNotificaciones()
    }, []);
    const fetchNotificaciones = async () => {
        const sub = await getUserSub()
        const notifications = await DataStore.query(Notificacion, (e) => e
            .usuarioID("eq", sub)

            // Mostrar notificaciones que no tienen showAt o que el show at es anterior a la fecha actual
            // .showAt("lt", new Date())

            , {
                sort: e => e
                    .showAt("DESCENDING")
            })
        setNotificaciones(notifications)
    }

    const handleVerNotificacion = async (idx) => {
        let nuevasNotificaciones = [...notificaciones]
        let notificacion = nuevasNotificaciones[idx]
        let originalModel = await DataStore.query(Notificacion, notificacion.id)
        DataStore.save(
            Notificacion.copyOf(originalModel, nuevo => {
                nuevo.leido = true
            }))

        // Cambiar la notificacion
        notificacion = {
            ...notificacion,
            leido: true
        }

        nuevasNotificaciones[idx] = notificacion
        setNotificaciones([...nuevasNotificaciones])
    }


    const handlePressItem = async (item, index) => {
        const not = await getAllScheduledNotificationsAsync()
            .then(r => {
                return r.map(no => {
                    const id = no.identifier
                    const {
                        body, title,
                        data: {
                            tipo
                        }
                    } = no.content

                    return {
                        body,
                        title,
                        tipo,
                        id
                    }
                })
            })

        console.log(not)

        return

        handleVerNotificacion(index)

        const { tipo } = item

        switch (tipo) {
            case TipoNotificacion.RESERVAENFECHA:
                handleIrAReservaEnFecha(item.fechaID, item.reservaID)
                break;

            case TipoNotificacion.FECHACREADA:
                handleIrAReservaEnFecha(item.fechaID, item.reservaID)
                break;

            case TipoNotificacion.RESERVACREADA:
                handleIrAReserva(item.reservaID)
                break;

            case TipoNotificacion.BIENVENIDA:
                handleVerTutorial()
                break;

            case TipoNotificacion.SOLICITUDGUIAAPROVADA:
                handleVerSolicitud()
                break;

            case TipoNotificacion.SOLICITUDGUIA:
                handleVerSolicitud()
                break;

            case TipoNotificacion.SOLICITUDAVENTURA:
                handleVerSolicitud(true)
                break;

            case TipoNotificacion.RECORDATORIOFECHA:
                handleIrAReserva(item.reservaID)
                break;

            case TipoNotificacion.CALIFICAUSUARIO:
                handleCalificaUser(item.guiaID, item.aventuraID, index)
                break;

            case TipoNotificacion.FECHAACTUALIZACION:
                handleIrAReserva(item.reservaID)
                break;

            case TipoNotificacion.ADMIN:
                navigation.navigate("Admin")
                break;

            default:
                console.log("otro tipo de notificacion")
                break;
        }
    }

    if (!notificaciones) {
        return <Loading indicator />
    }

    if (notificaciones.length === 0) {
        return <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            contentContainerStyle={styles.container}
        >
            <Text style={styles.noHayTxt}>No hay notificaciones</Text>
        </ScrollView>
    }

    return (<Pressable
        onPress={() => setConfirmDelete(false)}
        style={{ flex: 1, backgroundColor: colorFondo, }}>


        <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <View
                style={{
                    alignItems: 'center',
                    // paddingRight: 20,
                    padding: 10,
                }}
            >
                <Pressable
                    onPress={deleteAll}
                    style={{
                        backgroundColor: '#fff',
                        alignItems: 'center', justifyContent: 'center',
                        borderRadius: 20,
                        height: 35,
                        padding: 5,
                    }}>
                    {
                        confirmDelete ?
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                paddingHorizontal: 5,
                                color: moradoOscuro
                            }}>BORRAR</Text>
                            :
                            <Entypo
                                name="cross" size={25} color={moradoOscuro} />
                    }


                </Pressable>
            </View>}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}

            style={{ ...container, paddingTop: 0, }}


            data={notificaciones ? notificaciones : []}
            initialNumToRender={6}
            renderItem={({ item, index }) => {
                const { tipo } = item
                return <View style={{ flex: 1, marginBottom: index === notificaciones.length - 1 ? 40 : 0, }}>
                    <Element
                        tipo={tipo}
                        titulo={item.titulo}
                        descripcion={item.descripcion}
                        tiempo={item.showAt ? item.showAt : item.createdAt}
                        leido={!!item.leido}

                        onPress={() => handlePressItem(item, index)}
                    />

                </View>
            }}
        />

        {modalData.aventuraID && <CalificaUsuarioModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            usuarioID={modalData.usuarioID}
            aventuraID={modalData.aventuraID}

            borrarNotificacion={() => handleBorrarNotificacion(notificaciones[modalData.notificacionIdx])}
        />}
    </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorFondo,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: .25,
    },

    noHayTxt: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})
