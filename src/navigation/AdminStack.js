import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Admin'
import SolicitudesPendientes from '../screens/Admin/SolicitudesPendientes';
import ModificarAventuras from '../screens/Admin/ModificarAventuras';
import FechasYReservas from '../screens/Admin/FechasYReservas';
import Usuarios from '../screens/Admin/Usuarios';
import Header from '../components/header';
import VerSolicitudes from '../screens/Admin/VerSolicitudes';
import GuiasAutorizados from '../screens/Admin/GuiasAutorizados';

const Stack = createStackNavigator()


export default function AdminStack() {

    return (
        <Stack.Navigator
            // initialRouteName={"ModificarAventuras"}
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
                name={"Home"}
                component={Home}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTitle: "Administrar app"
                }}
            />

            <Stack.Screen
                name={"SolicitudesPendientes"}
                component={SolicitudesPendientes}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTitle: "Solicitudes pendientes"
                }}
            />

            <Stack.Screen
                name={"ModificarAventuras"}
                component={ModificarAventuras}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTitle: "Modificar aventuras"
                }}
            />

            <Stack.Screen
                name={"FechasYReservas"}
                component={FechasYReservas}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTitle: "Fechas y reservas"
                }}
            />

            <Stack.Screen
                name={"VerSolicitudes"}
                component={VerSolicitudes}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTitle: "Ver solicitudes"
                }}
            />

            <Stack.Screen
                name={"GuiasAutorizados"}
                component={GuiasAutorizados}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTitle: "Guias autorizados por aventura"
                }}
            />

        </Stack.Navigator>
    )
}
