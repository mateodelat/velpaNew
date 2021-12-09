import { DataStore, Predicates } from '@aws-amplify/datastore'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { colorFondo, container, getUserSub, isUrl, wait } from '../../../assets/constants'
import { Loading } from '../../components/Loading'
import { Notificacion } from '../../models'
import Element from './components/Element'
import { TipoNotificacion } from '../../models'

import moment from "moment";
import Storage from '@aws-amplify/storage'
import 'moment/locale/es'


moment.locale('es')


export default () => {


    const navigation = useNavigation()

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchNotificaciones()
        wait(300).then(() => setRefreshing(false));
    }, []);


    const handleIrAReserva = (idReserva) => {
        navigation.navigate("MisReservas")
    }

    const handleIrAReservaEnFecha = (fechaID, reservaID) => {
        // Navegar a fechas y a la fecha especifica
        navigation.navigate("MisFechas")
        navigation.navigate("DetalleFecha", { fechaID, reservaID })
    }

    const handleVerTutorial = () => {
        // Alert.alert("Mostrar tutorial velpa")

    }

    const handleVerSolicitud = (aventura) => {
        navigation.navigate("MisSolicitudes", aventura ? true : undefined)

    }
    const [notificaciones, setNotificaciones] = useState(null);
    const [notificacionesOriginal, setNotificacionesOriginal] = useState([]);

    useEffect(() => {
        fetchNotificaciones()
    }, []);

    const fetchNotificaciones = async () => {
        const sub = await getUserSub()
        const notificaciones = await DataStore.query(Notificacion, (e) => e.usuarioID("eq", sub), {
            sort: e => e.createdAt("DESCENDING")
        }).then(async r => {
            setNotificacionesOriginal(r)
            return Promise.all(r.map(async e => {
                const imagen = {
                    url: isUrl(e.imagen) ? e.imagen : await Storage.get(e.imagen),
                    key: e.imagen
                }
                return {
                    ...e,
                    imagen
                }
            }))
        })
        setNotificaciones(notificaciones)
    }

    const handleVerNotificacion = (idx) => {
        let nuevasNotificaciones = [...notificaciones]
        let notificacion = nuevasNotificaciones[idx]
        let originalModel = notificacionesOriginal[idx]
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
                        tiempo={item.createdAt}
                        leido={!!item.leido}

                        onPress={() => handlePressItem(item, index)}
                    />

                </View>
            }}
        />
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
