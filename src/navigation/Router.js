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
import { TipoNotificacion } from '../models';
import { AndroidNotificationPriority } from 'expo-notifications';
import { Comision } from '../models';





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
        // Calcular la diferencia de horas
        const remainingFor1Week = Math.round((initialDate - msInDay * 7 - createdAt) / 1000)
        const remainingFor1Day = Math.round((initialDate - msInDay - createdAt) / 1000)
        const remainingFor1Hour = Math.round((initialDate - msInHour - createdAt) / 1000)

        const tiempo = timeShown === "1S" ? remainingFor1Week : timeShown === "1D" ? remainingFor1Day : timeShown === "1H" ? remainingFor1Hour : false


        return trigger !== tiempo
    }

    function haCambiadoFinal(finalDate, trigger, createdAt) {
        finalDate = new Date(finalDate)
        if (finalDate.getHours() >= 8) {
            finalDate = new Date(finalDate.getTime() + msInDay)
        }
        finalDate.setHours(8)


        const remainingForNextDay = Math.round((finalDate - createdAt) / 1000)

        return trigger !== remainingForNextDay
    }

    // Cancelar notificaciones invalidas por cancelacion de fecha o
    // movimiento de fecha
    async function cancelInvalidNotifications() {

        function scheduleNewNotification({
            data,
            body,
            title,
            seconds
        }) {


            Notifications.scheduleNotificationAsync({
                content: {
                    priority: AndroidNotificationPriority.MAX,
                    vibrate: [100],
                    title,
                    body,
                    data,
                },
                trigger: {
                    seconds
                }
            }).then(() => console.log("Notificacion reprogramada con exito"))

        }

        const i = new Date()
        const notifications = await Notifications.getAllScheduledNotificationsAsync()
        const sub = await getUserSub()

        // Pedir todas las fechas futuras que no han sido canceladas
        const fechas = await DataStore.query(Fecha, fe =>
            fe.fechaInicial("gt", new Date())
                .cancelado("ne", true)
        )

        // Pedir las reservas que no han sido canceladas
        const reservas = await DataStore.query(Reserva, res =>
            res
                .cancelado("ne", true)
                .usuarioID("eq", sub)
        )

        // Fechas con errores
        let fechasConError = {}


        notifications.map(n => {
            const data = n?.content?.data
            const id = n.identifier
            const body = n.content.body
            const title = n.content.title

            const {
                tipo,
                fechaID,
                reservaID,


                createdAt,
                timeShown
            } = data

            if (!data || !tipo || !fechaID) {
                // Notifications.cancelScheduledNotificationAsync(id)
                console.log("Error raro, la notificacion no tiene tipo o fecha ID")
                return
            }

            // Si tiene reserva id y no hay ninguna reserva asociada es porque se cancelo
            if (reservaID) {
                const res = reservas.find((r) => r.id === reservaID)

                if (!res) {
                    Notifications.cancelScheduledNotificationAsync(id)
                    console.log("Error, no existe reserva asociada a la notificacion con reserva id cancelando...")

                }
            }


            // Metodo para detectar si hubo cambios en la fecha o si fue elmininada
            const fe = fechas.find((f) => f.id === fechaID)
            if (fe) {

                // Poner fecha final al dia siguiente de que acabe a las 8
                let fechaFinal = new Date(fe.fechaFinal);
                if (fechaFinal.getHours() >= 8) {
                    fechaFinal = new Date(fechaFinal.getTime() + msInDay);
                }
                fechaFinal.setHours(8);
                const remainingForNextDay = Math.round(
                    (fechaFinal?.getTime() - new Date().getTime()) / 1000
                );


                // Fecha final actualizada
                if (tipo === TipoNotificacion.CALIFICAUSUARIO) {
                    const cambio = haCambiadoFinal(fe.fechaFinal, n.trigger.seconds, createdAt * 1000)
                    if (cambio) {
                        console.log("Notificacion de calificar ususario con error, corrigiendo...")

                        // Cancelar la notificacion vieja
                        Notifications.cancelScheduledNotificationAsync(id)

                        // Crear nueva notificacion
                        delete data.timeShown
                        data.createdAt = Math.round(new Date().getTime() / 1000),
                            scheduleNewNotification({
                                data,
                                body,
                                title,
                                seconds: remainingForNextDay
                            })
                    } else {
                    }
                }

                // Fecha inicial actualizada
                else if (tipo === TipoNotificacion.RECORDATORIOFECHA) {
                    if (fe) {

                        // Detectar si el tiempo programado para mostrarlo es el correcto
                        let cambio = haCambiado(timeShown, fe.fechaInicial, n.trigger.seconds, createdAt * 1000)
                        if (cambio) {
                            // Agregar fecha a fechas invalidas para recalcular notificaciones
                            console.log("Notificacion aviso de dia invalida, corrigiendo...")

                            // Cancelar notificacion invalida
                            Notifications.cancelScheduledNotificationAsync(id)

                            fechasConError[fe.id] = reservaID

                        } else {
                        }
                    }
                }
            } else {
                // Si no esta la fecha asociada, eliminar notificacion
                console.log("No existe la fecha o fue cancelada asociada a a notificacion")
                Notifications.cancelScheduledNotificationAsync(id)
            }
        })

        // Mapear los index con error para recalcular las notificaciones de cada fecha
        Object.keys(fechasConError)
            .map(fe => {
                const reservaID = fechasConError[fe]

                fe = fechas.find(old => old.id === fe)

                // Obtener parametros a usar en la creacion de las nuevas notificaciones
                const {
                    fechaInicial,
                    id: fechaID,
                    tituloAventura,

                } = fe

                const remainingFor1Week = Math.round(
                    (fechaInicial - msInDay * 7 - new Date().getTime()) / 1000
                );
                const remainingFor1Day = Math.round(
                    (fechaInicial - msInDay - new Date().getTime()) / 1000
                );
                const remainingFor1Hour = Math.round(
                    (fechaInicial - msInHour - new Date().getTime()) / 1000
                );

                const data = {
                    fechaID,
                    reservaID,

                    // Hora creada en segundos
                    createdAt: Math.round(new Date().getTime() / 1000),
                    tipo: TipoNotificacion.RECORDATORIOFECHA,
                }

                //   Una semana
                remainingFor1Week > 0 && Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Todo listo??",
                        body:
                            "Tu experiencia en " +
                            tituloAventura +
                            " es en 1 semana, revisa que tengas todo listo",
                        priority: AndroidNotificationPriority.HIGH,
                        vibrate: [100],
                        data: {
                            ...data,
                            timeShown: "1S",
                        },
                    },
                    trigger: {
                        seconds: remainingFor1Week,
                    },
                });

                //   Un dia
                remainingFor1Day > 0 && Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Solo falta 1 dia!!",
                        body:
                            "Tu experiencia en " +
                            tituloAventura +
                            " es mañana, revisa todo tu material y el punto de reunion",
                        priority: AndroidNotificationPriority.MAX,
                        vibrate: [100],
                        data: {
                            ...data,
                            timeShown: "1D",
                        },
                    },
                    trigger: {
                        seconds: remainingFor1Day,
                    },
                });

                //   Una hora
                Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Estas a nada de irte",
                        body: "Tu experiencia en " +
                            tituloAventura +
                            " es en menos de 1 hora, no hagas esperar al guia!!" +
                            "Ten a la mano el QR de tu reserva y recuerda llevar tu pago si es en efectivo",
                        priority: AndroidNotificationPriority.MAX,
                        vibrate: [100],

                        data: {
                            ...data,
                            timeShown: "1H",
                        },
                    },
                    trigger: {
                        seconds: remainingFor1Hour > 0 ? remainingFor1Hour : 1,
                    },
                });
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
                        // initialRouteName={"MisReservas"}

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