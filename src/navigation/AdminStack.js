import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Admin'
import SolicitudesPendientes from '../screens/Admin/SolicitudesPendientes';

import FechasYReservas from '../screens/Admin/FechasYReservas';

import Header from '../components/header';
import VerSolicitudes from '../screens/Admin/VerSolicitudes';
import GuiasAutorizados from '../screens/Admin/GuiasAutorizados';
import ModificarAventuras from '../screens/Admin/ModificarAventuras';

import EditarAventura1 from '../screens/Admin/EditarAventura/EditarAventura1';
import { mayusFirstLetter } from '../../assets/constants';
import Publicidad from '../screens/Admin/Publicidad';




export default function AdminStack() {
    const Stack = createStackNavigator()


    return (
        <Stack.Navigator
            screenOptions={{
                header: (params) => {

                    const { options } = params;
                    const title =
                        options.headerTitle !== undefined
                            ? options.headerTitle
                            : options.title !== undefined
                                ? options.title
                                : "titulo";

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
                    headerTitle: "Administrar app"
                }}
            />

            <Stack.Screen
                name={"SolicitudesPendientes"}
                component={SolicitudesPendientes}
                options={{
                    headerShown: true,
                    headerTitle: "Solicitudes pendientes"
                }}
            />


            <Stack.Screen
                name={"FechasYReservas"}
                component={FechasYReservas}
                options={{
                    headerShown: true,
                    headerTitle: "Fechas y reservas"
                }}
            />

            <Stack.Screen
                name={"VerSolicitudes"}
                component={VerSolicitudes}
                options={{
                    headerShown: true,
                    headerTitle: "Ver solicitudes"
                }}
            />

            <Stack.Screen
                name={"GuiasAutorizados"}
                component={GuiasAutorizados}
                options={{
                    headerShown: true,
                    headerTitle: "Guias autorizados por aventura"
                }}
            />

            <Stack.Screen
                name={"ModificarAventuras"}
                component={ModificarAventuras}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name={"EditarAventura1"}
                component={EditarAventura1}
                options={({ route }) => ({
                    headerShown: false
                })}
            />

            <Stack.Screen
                name={"Publicidad"}
                component={Publicidad}
                options={{
                    headerShown: false
                }}
            />


        </Stack.Navigator>
    )
}
