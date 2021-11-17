import { DataStore, Predicates } from '@aws-amplify/datastore'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { colorFondo, container, wait } from '../../../assets/constants'
import { Loading } from '../../components/Loading'
import { Notificacion } from '../../models'
import Element from './components/Element'
import moment from "moment";



export default () => {

    const navigation = useNavigation()

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchNotificaciones()
        wait(300).then(() => setRefreshing(false));
    }, []);


    const handleIrAReserva = (idReserva) => {
        console.log({
            idReserva
        })

        Alert.alert("Ir a la reservacion")
        // navigation.navigate("MisReservas")
    }

    const handleIrAReservaEnFecha = (idFecha, idReserva) => {
        console.log({
            idFecha,
            idReserva
        })
        Alert.alert("Ir a la fecha con reservacion seleccionada",)
        // navigation.navigate("MisReservas")
    }

    const handleVerTutorial = () => {
        Alert.alert("Mostrar tutorial velpa",)

    }
    const [notificaciones, setNotificaciones] = useState(null);

    useEffect(() => {
        fetchNotificaciones()
    }, []);

    const fetchNotificaciones = async () => {
        const notificaciones = await DataStore.query(Notificacion, Predicates.ALL, {
            sort: e => e.createdAt("DESCENDING")
        })
        setNotificaciones(notificaciones)
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

    return (
        <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}

            style={container}
            data={notificaciones}
            renderItem={({ item, index }) => {
                const { tipo } = item
                return <Element
                    image={item.imagen}
                    titulo={item.titulo}
                    descripcion={item.descripcion}
                    tiempo={moment(item.createdAt).from(moment())}

                    onPress={tipo === "RESERVAENFECHA" ?
                        () => handleIrAReservaEnFecha(item.fechaID, item.reservaID) :
                        tipo === "RESERVACREADA" ?
                            () => handleIrAReserva(item.reservaID) :
                            () => handleIrAReserva(item.reservaID)

                    }
                />

            }}
        />
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
