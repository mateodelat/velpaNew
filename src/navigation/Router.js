import React, { useEffect, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import NavBar from './NavBar';

import { MaterialIcons } from '@expo/vector-icons';
import ChatRoomHeader from '../components/ChatRoomHeader';

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
import Agregar2 from '../screens/AgregarFecha/Agregar2';
import Agregar3 from '../screens/AgregarFecha/Agregar3';
import MisReservas from '../screens/MisReservas';
import MisFechas from '../screens/MisFechas';
import MisSolicitudes from '../screens/MisSolicitudes';
import AgregarAventura2 from '../screens/AgregarAventura/AgregarAventura2';
import AgregarAventura3 from '../screens/AgregarAventura/AgregarAventura3';
import Configuracion from '../screens/Configuracion';
import Saldo from '../screens/Saldo';
import DetalleReserva from '../screens/DetalleReserva';
import DetalleFecha from '../screens/DetalleFecha';
import { DataStore } from '@aws-amplify/datastore';
import { Usuario } from '../models';
import { getUserSub, moradoOscuro } from '../../assets/constants';

import * as Notifications from 'expo-notifications';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: 1,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    if (token) {
        // Subir a datastore el token
        const usuario = await DataStore.query(Usuario, await getUserSub())
        await DataStore.save(Usuario.copyOf(usuario, usr => {
            usr.notificationToken = token
        }))

    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: moradoOscuro,
        });
    }

    return token;
}


export default () => {
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    useEffect(() => {
        // Subir token de notificaciones para el usuario
        registerForPushNotificationsAsync()

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <View style={{ flex: 1, }}>
            <SafeAreaProvider>
                <NavigationContainer>

                    <Stack.Navigator
                        screenOptions={{
                            headerLeft: ({ onPress }) => <MaterialIcons name="keyboard-arrow-left" size={35} color="white" onPress={onPress} />,
                            headerTintColor: "white",
                            headerStyle: { backgroundColor: moradoOscuro, },
                            headerTitleAlign: "center"

                            // header: ({ scene, }) => {
                            //     const { options } = scene.descriptor;
                            //     const title =
                            //         options.headerTitle !== undefined
                            //             ? options.headerTitle
                            //             : options.title !== undefined
                            //                 ? options.title
                            //                 : scene.route.name;

                            //     return (
                            //         <Header title={title} />
                            //     );
                            // }
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
                                            id={route.params?.id}
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

                        <Stack.Screen
                            name="AgregarAventura"
                            component={AgregarAventura}
                            options={{
                                title: "Agregar experiencia",
                            }}
                        />

                        <Stack.Screen
                            name="AgregarAventura2"
                            component={AgregarAventura2}
                            options={{
                                title: "Ubicacion experiencia",
                            }}
                        />

                        <Stack.Screen
                            name="AgregarAventura3"
                            component={AgregarAventura3}
                            options={{
                                headerShown: false,
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
                            name="AgregarFecha3"
                            component={Agregar3}
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
                            name="Admin"
                            component={AdminStack}
                            options={{
                                headerShown: false
                            }}
                        />

                        <Stack.Screen
                            name="MisReservas"
                            component={MisReservas}
                            options={{
                                title: "Mis reservas"
                            }}
                        />


                        <Stack.Screen
                            name="DetalleReserva"
                            component={DetalleReserva}
                            options={{
                                headerShown: false
                            }}
                        />

                        <Stack.Screen
                            name="MisFechas"
                            component={MisFechas}
                            options={{
                                title: "Mis fechas"
                            }}
                        />

                        <Stack.Screen
                            name="DetalleFecha"
                            component={DetalleFecha}
                            options={{ headerShown: false }}
                        />


                        <Stack.Screen
                            name="MisSolicitudes"
                            component={MisSolicitudes}
                            options={{
                                title: "Mis solicitudes"
                            }}
                        />

                        <Stack.Screen
                            name="Configuracion"
                            component={Configuracion}
                            options={{
                                // headerShown: false
                            }}
                        />

                        <Stack.Screen
                            name="Saldo"
                            component={Saldo}
                            options={{
                                // headerShown: false
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
                </NavigationContainer >
            </SafeAreaProvider>

        </View>

    )
}