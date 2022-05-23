import React, { useEffect, useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import SeleccionaAventura from '../screens/SeleccionaAventura';
import CapturaDocumentos1 from '../screens/CapturaDocumentos/CapturaDocs1';
import CapturaDocumentos2 from '../screens/CapturaDocumentos/CapturaDocs2';
import CapturaDocumentos3 from '../screens/CapturaDocumentos/CapturaDocs3';
import Header from '../components/header';

import { API, Auth } from 'aws-amplify';
import { Loading } from '../components/Loading';
import { Alert } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Usuario } from '../models';




export default function SolicitudStack({ navigation }) {
    const Stack = createStackNavigator()

    const [loading, setLoading] = useState(true);
    const [requireDocumentos, setRequireDocumentos] = useState(true);

    // Pedir el usuario y ver si requiere input de datos
    useEffect(() => {
        Auth.currentUserInfo()
            .then(a => {
                const sub = a.attributes.sub
                return DataStore.query(Usuario, sub)
                    // Si ya tiene id de stripe, asumimos que esta correcto
                    .then(r => {
                        if (!!r.stripeID) {
                            setRequireDocumentos(false)
                            setLoading(false)
                        } else {
                            setRequireDocumentos(true)
                            setLoading(false)
                        }
                    })
            })
            .catch(e => {
                console.log(e)
                Alert.alert("No se ha podido obtener tu usuario")
                navigation.popToTop()
            })
    }, []);


    if (loading) {
        return <Loading />
    }


    return (
        <Stack.Navigator
            initialRouteName={requireDocumentos ? "CapturaDocumentos1" : "SeleccionaAventura"}
            screenOptions={{
                header: (params) => {
                    const { options } = params;
                    const title =
                        options.headerTitle !== undefined
                            ? options.headerTitle
                            : options.title !== undefined
                                ? options.title
                                : params?.route?.name;

                    return (
                        <Header title={title} />
                    );
                }
            }}
        >

            <Stack.Screen
                name={"CapturaDocumentos1"}
                component={CapturaDocumentos1}
                options={{
                    title: "Valida tus datos",
                    headerTitleAlign: "center"
                }}
            />

            <Stack.Screen
                name={"CapturaDocumentos2"}
                component={CapturaDocumentos2}
                options={({ route }) => {
                    const agencia = route.params.agencia
                    return {
                        title: agencia ? "Datos de la agencia" : "Datos personales",
                        headerTitleAlign: "center"
                    }
                }}
            />

            <Stack.Screen
                name={"CapturaDocumentos3"}
                component={CapturaDocumentos3}
                options={{
                    title: "Datos bancarios",
                    headerTitleAlign: "center"
                }}
            />

            <Stack.Screen
                name={"SeleccionaAventura"}
                children={() => <SeleccionaAventura route={{ params: { esSelector: true } }} />}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
