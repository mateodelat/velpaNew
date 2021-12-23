import { DataStore } from '@aws-amplify/datastore'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { colorFondo, container, getUserSub, wait } from '../../../assets/constants'
import { Loading } from '../../components/Loading'
import { Notificacion } from '../../models'
import Element from './components/Element'
import { TipoNotificacion } from '../../models'

import moment from "moment";
import 'moment/locale/es'
import CalificaUsuarioModal from '../../components/CalificaUsuarioModal'


moment.locale('es')


export default () => {


    const navigation = useNavigation()

    const [refreshing, setRefreshing] = useState(false);

    // Modal para calificar al guia
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

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

    const handleBorrarNotificacion = () => {
        const notificationToErase = notificaciones[modalData.notificacionIdx]
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
            .showAt("lt", new Date())

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

    const handlePressItem = (item, index) => {
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
        return <View
            style={styles.container}
        >
            <Text style={styles.noHayTxt}>No hay notificaciones</Text>
        </View>
    }

    return (<View style={{ flex: 1, }}>

        <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}

            style={container}


            data={notificaciones}
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

            borrarNotificacion={handleBorrarNotificacion}
        />}
    </View>
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
