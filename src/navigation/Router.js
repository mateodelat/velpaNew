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
import { getUserSub, moradoOscuro, msInDay, msInHour } from '../../assets/constants';

import * as Notifications from 'expo-notifications';
import { Alert, Button, Pressable, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import QRCode from '../screens/QRScan/QRCode';
import { Fecha } from '../models';
import { Reserva } from '../models';





export default () => {

    const Stack = createStackNavigator()


    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


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

    function haCambiado(timeShown, initialDate, trigger, createdAt) {
        const remainingFor1Week = Math.round((initialDate - msInDay * 7 - createdAt) / 1000)
        const remainingFor1Day = Math.round((initialDate - msInDay - createdAt) / 1000)
        const remainingFor1Hour = Math.round((initialDate - msInHour - createdAt) / 1000)

        const tiempo = timeShown === "1S" ? remainingFor1Week : timeShown === "1D" ? remainingFor1Day : timeShown === "1H" ? remainingFor1Hour : false

        return trigger !== tiempo
    }

    function haCambiadoFinal(finalDate, trigger, createdAt) {
        finalDate = new Date(finalDate)
        if (finalDate.getUTCHours() >= 8) {
            finalDate = new Date(finalDate.getTime() + msInDay)
        }
        finalDate.setUTCHours(8)


        const remainingForNextDay = Math.round((finalDate - createdAt) / 1000)

        return trigger !== remainingForNextDay
    }

    // Cancelar notificaciones invalidas por cancelacion de fecha o
    // movimiento de fecha
    async function cancelInvalidNotifications() {

        const i = new Date()
        const notifications = await Notifications.getAllScheduledNotificationsAsync()

        // Pedir todas las fechas futuras que no han sido canceladas
        const fechas = await DataStore.query(Fecha, fe => {
            fe.fechaInicial("gt", new Date())
            // fe.canceled("eq", true)
        })

        // Pedir las reservas que no han sido canceladas
        const reservas = await DataStore.query(Reserva, res => {
            // res.canceled("ne", true)
        })


        notifications.map(n => {
            const data = n?.content?.data
            const id = n.identifier

            const {
                tipo,
                fechaID,
                reservaID,


                createdAt,
                timeShown
            } = data

            if (!data || !tipo || !fechaID) {
                console.log("Error raro, la notificacion no tiene tipo")
                return
            }



            // Metodo para detectar si hubo cambios en la fecha o si fue elmininada
            const fe = fechas.find(f => f.id === fechaID)
            if (fe) {

                if (tipo === "CALIFICAUSUARIO") {
                    const cambio = haCambiadoFinal(fe.fechaFinal, n.trigger.seconds, createdAt * 1000)
                    if (cambio) {
                        console.log("Ha cambiado la fecha final asociada con la notificacion en cel, arreglar")
                    } else {
                    }
                }
                else if (tipo === "RECORDATORIOGUIA" || tipo === "RECORDATORIOCLIENTE") {
                    if (fe) {
                        // Detectar si el tiempo programado para mostrarlo es el correcto
                        let cambio = haCambiado(timeShown, fe.fechaInicial, n.trigger.seconds, createdAt * 1000)
                        if (cambio) {
                            console.log("Ha cambiado la fecha inicial asociada con la notificacion en cel, arreglar")
                        } else {
                        }
                    }
                } else {
                    // Si no esta la fecha asociada, eliminar notificacion
                    console.log("Cancelar notificacion", n, "\nno existe la fecha o fue cancelada")
                    // Notifications.cancelScheduledNotificationAsync(id)
                }
            }
        })

    }


    useEffect(() => {
        // Subir token de notificaciones para el usuario
        registerForPushNotificationsAsync()

        cancelInvalidNotifications()

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
                        initialRouteName={"MisFechas"}

                        screenOptions={{
                            headerLeft: ({ onPress }) => {
                                return <Pressable
                                    onPress={onPress}
                                    style={{
                                        paddingHorizontal: 16,
                                    }}>
                                    <MaterialIcons name="keyboard-arrow-left" size={35} color="white" />

                                </Pressable>
                            },
                            headerTintColor: "white",
                            headerStyle: { backgroundColor: moradoOscuro, },
                            headerTitleAlign: "center"


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
                            name="QRCode"
                            component={QRCode}


                            options={{
                                title: "Codigo de acceso"
                            }}

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
                        />

                        <Stack.Screen
                            name="Saldo"
                            component={Saldo}
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
                </NavigationContainer >
            </SafeAreaProvider>

        </View>

    )
}