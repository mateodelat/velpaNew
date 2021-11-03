import React, { useEffect, useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import SeleccionaAventura from '../screens/SeleccionaAventura';
import CapturaDocumentos from '../screens/SolicitudGuia/CapturaDocumentos';
import Header from '../components/header';

import { API, Auth } from 'aws-amplify';
import { Loading } from '../components/Loading';
import { Alert } from 'react-native';


const Stack = createStackNavigator()


export default function SolicitudStack({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [requireDocumentos, setRequireDocumentos] = useState(true);

    // Si no hay tipo es porque no se ha mandado foto de documentos
    const getUsuario = /* GraphQL */ `
        query GetUsuario($id: ID!) {
            getUsuario(id: $id) {
            tipo
            }
        }
    `;

    // Pedir el usuario y ver si requiere input de datos
    // useEffect(() => {
    //     Auth.currentUserInfo()
    //         .then(a => {
    //             const id = a.attributes.sub
    //             API.graphql({ query: getUsuario, variables: { id } })
    //                 .then(r => {
    //                     const tipo = r.data.getUsuario.tipo
    //                     if (!tipo) {
    //                         setRequireDocumentos(true)
    //                         setLoading(false)
    //                     } else {
    //                         setRequireDocumentos(false)
    //                         setLoading(false)
    //                     }
    //                 })
    //         })
    //         .catch(e => {
    //             console.log(e)
    //             Alert.alert("No se ha podido obtener tu usuario")
    //             navigation.popToTop()
    //         })
    // }, []);


    // if (loading) {
    //     return <Loading />
    // }


    return (
        <Stack.Navigator
            screenOptions={{
                header: ({ scene, previous, navigation }) => {
                    const { options } = scene.descriptor;
                    const title =
                        options.headerTitle !== undefined
                            ? options.headerTitle
                            : options.title !== undefined
                                ? options.title
                                : scene.route.name;

                    return (
                        <Header title={title} />
                    );
                }
            }}
        >

            <Stack.Screen
                name={"CapturaDocumentos"}
                component={CapturaDocumentos}
                options={{
                    title: "Valida tus datos",
                    headerTitleAlign: "center"
                }}
            />

            <Stack.Screen
                name={"SeleccionaAventura"}
                component={SeleccionaAventura}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
