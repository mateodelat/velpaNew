import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import NavBar from './NavBar';

import Header from '../components/header';
import ChatRoomHeader from '../components/ChatRoomHeader';

// import Solicitudes from '../screens/Solicitudes';
import SolicitudStack from './SolicitudStack';
import AdminStack from './AdminStack';

import BuscarAventura from '../screens/BuscarAventura';
import DetalleAventura from '../screens/DetalleAventura';
import FechasAventura from '../screens/FechasAventura';

import Logistica from '../screens/Logistica';
import Pagar from '../screens/Pagar';
import Exito from '../screens/ExitoScreen';
import ChatRoom from '../screens/ChatRoom';
import DetalleChatRoom from '../screens/DetalleChatRoom';
import Perfil from '../screens/Perfil';
import AgregarAventura from '../screens/AgregarAventura';
import AgregarFecha from '../screens/AgregarFecha';
import SeleccionaAventura from '../screens/SeleccionaAventura';
import SolicitudAventura from '../screens/SolicitudAventura';
import Agregar2 from '../screens/AgregarFecha/Agregar2';

const Stack = createStackNavigator();



export default () => (
    <NavigationContainer>

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
                name='inicio'
                component={NavBar}
                options={{
                    headerShown: false
                }}
            />


            <Stack.Screen
                name="Pagar"
                component={Pagar}
            />

            <Stack.Screen
                name="Logistica"
                component={Logistica}
            />

            <Stack.Screen
                name="ExitoScreen"
                component={Exito}
                options={{
                    headerShown: false
                }}

            />



            <Stack.Screen
                name="ChatRoom"
                component={ChatRoom}
                options={({ route }) => {

                    return {
                        header: () => (
                            <ChatRoomHeader
                                titulo={route.params?.titulo}
                                image={route.params?.image}
                            />
                        )
                    }
                }}
            />



            <Stack.Screen
                name="DetalleChatRoom"
                component={DetalleChatRoom}
                options={{
                    headerShown: false
                }}
            />



            <Stack.Screen
                name="SolicitudGuia"
                component={SolicitudStack}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="DetalleAventura"
                component={DetalleAventura}
                options={{
                    headerShown: false,
                }}
            />


            <Stack.Screen
                name="FechasAventura"
                component={FechasAventura}
                options={{
                    headerShown: false
                }}
            />

            {/* Perfil */}
            <Stack.Screen
                name="PerfilScreen"
                component={Perfil}
                options={{
                    headerShown: false
                }}
            />



            {/* <Stack.Screen
                name="Solicitudes"
                component={Solicitudes}
                options={{
                    title: "Mis solicitudes",
                }}
            /> */}


            <Stack.Screen
                name="AgregarAventura"
                component={AgregarAventura}
                options={{
                    title: "Solicitar aventura",
                }}
            />

            <Stack.Screen
                name="AgregarFecha"
                component={AgregarFecha}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="AgregarFecha2"
                component={Agregar2}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="SeleccionaAventura"
                component={SeleccionaAventura}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="SolicitudAventuraScreen"
                component={SolicitudAventura}
                options={{
                    title: "Solicitar aventura",

                }}
            />

            <Stack.Screen
                name="Admin"
                component={AdminStack}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name={"Busqueda"}
                component={BuscarAventura}

            />

        </Stack.Navigator>
    </NavigationContainer>
)