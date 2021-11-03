import React, { useState } from 'react'
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { colorFondo, container, wait } from '../../../assets/constants'
import Element from './components/Element'



export default () => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);


    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }

            style={{ ...container, borderRightWidth: .25, }}>


            <Element
                image={require("../../../assets/IMG/Montana.jpg")}
                titulo={"Nueva reserva"}
                descripcion={"Tienes una nueva reservacion en el Nevado de Colima el 30 de ago"}
                tiempo={"Hace 1 seg"}

                onPress={() => Alert.alert("Ir a mis aventuras de guia en esa reservacion")}
            />

            <Element
                image={require("../../../assets/IMG/ImageExample.png")}
                titulo={"Reservacion exitosa"}
                descripcion={"Se ha creado una reservacion exitosamente en el nevado de colima"}
                tiempo={"hace 30 min"}

                onPress={() => Alert.alert("Ir a reservacion")}
            />

            <Element
                image={require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                titulo={"Falta muy poco!!"}
                descripcion={"Tu reserva para el nevado de colima es en 1 dia, ve donde es el punto de reunion"}
                tiempo={"hace 1 hora"}

                onPress={() => Alert.alert("Abrir detalles reservacion con punto de reunion")}
            />
            <Element
                image={require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                titulo={"¿Listo para la aventura?"}
                descripcion={"Tu reserva de el nevado de colima es en 1 semana, has click aqui para ver que llevar"}
                tiempo={"hace 6 dias"}

                onPress={() => Alert.alert("Ver detalles")}
            />


            <Element
                image={require("../../../assets/VELPA.png")}
                titulo={"Velpa Adventures"}
                descripcion={"Gracias por registrarte en velpa, ve un breve tutorial de como usar la app"}
                tiempo={"hace 1 mes"}

                onPress={() => Alert.alert("Ver tutorial")}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorFondo,
        padding: 20,
    }
})
