import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, Keyboard, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import { colorFondo, getUserSub, moradoOscuro, msInDay, msInHour, userEsGuia } from '../../../assets/constants';
import Inicio from '../../screens/Inicio';
import HeaderNav from './../components/HeaderNav';

import MiPerfil from '../../screens/MiPerfil';
import NotificationsTab from './../NotificationsTab';

import ModalAgregar from './../components/ModalAgregar';
import { useNavigation } from '@react-navigation/native';
import MapaAventuras from '../../screens/MapaAventuras';
import { DataStore, OpType } from '@aws-amplify/datastore';
import { Notificacion, Reserva } from '../../models';
import { Usuario } from '../../models';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Tutorial from './Tutorial';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { initStripe } from '@stripe/stripe-react-native';
import * as Notifications from 'expo-notifications';
import { Fecha } from '../../models';
import { TipoNotificacion } from '../../models';
import { AndroidNotificationPriority } from 'expo-notifications';

import { STRIPE_PUBLISHABLE_KEY } from '@env'


const tamañoLogo = 35



const CustomPlus = ({ setModalVisible }) => {
    const navigation = useNavigation()

    function handleSolicitarGuia() {
        navigation.navigate("SolicitudGuia")

    }
    async function handlePress() {
        if (await userEsGuia()) {
            setModalVisible(true)

        }
        else {
            Alert.alert("No eres guia",
                "Debes ser guia para agregar nuevas aventuras o fechas, ¿Quieres aplicar para ser guia de Velpa?", [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "OK",
                    style: "default",
                    onPress: handleSolicitarGuia
                },
            ])
        }
    }


    return <View style={{ justifyContent: 'center', alignItems: 'center', }}>

        <View style={{
            position: 'absolute',
            backgroundColor: '#F4F6F6',
            height: 90,
            width: 90,
            borderRadius: 100,
            bottom: 0,
            alignSelf: 'center',
        }} />
        <Pressable
            style={{
                top: -10,
                padding: 5,
                backgroundColor: '#fff',
                borderRadius: 70,

                ...styles.shadow
            }}
            onPress={
                handlePress}
        >

            <View
                style={{
                    width: 55,
                    height: 55,
                    borderRadius: 35,
                    backgroundColor: moradoOscuro,
                    alignItems: 'center', justifyContent: 'center',
                }}>
                <Entypo name="plus" size={50} color="white" />
            </View>
        </Pressable>
    </View>
}

const Plus = () => {
    return null
}


export default ({ route }) => {
    const Tab = createBottomTabNavigator()


    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState("tutorial");

    const [newNotificaciones, setNewNotificaciones] = useState(false);
    const [newMessages, setNewMessages] = useState(false);


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
    // movimiento de fecha y checar si es la primer reserva
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
            fe.
            and(e=>[
                e.fechaInicial.gt( new Date()),
                e.cancelado.ne( true)
            ])
        )

        // Pedir las reservas que no han sido canceladas
        const reservas = await DataStore.query(Reserva, res =>
            res.and(c=>
                [
                    c.cancelado.ne( true),
                    c.usuarioID.eq( sub),
                ]
                )
        )

        // // Si hay reservas revisar si fue la primera
        // if (reservas?.length > 0) {
        //     checarTutorialDeReserva()
        // }

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



    // Ver todas las notificaciones nuevas y mensajes
    useEffect(() => {
        // Iniciar interfaz de stripe 
        initStripe({
            publishableKey: STRIPE_PUBLISHABLE_KEY,
            merchantIdentifier: 'velpa.com',
        });

        cancelInvalidNotifications()

        let subscripcionNotificaciones
        let subscripcionMensajes
        (async () => {
            const sub = await getUserSub()

            verNuevasNotificaciones(sub)
            subscripcionNotificaciones = DataStore.observe(Notificacion, e => e
                .and(c=>[
                    c.usuarioID.eq( sub),
                    c.leido.ne( true),
                    c.showAt.lt( new Date()),

                ])
            )
                .subscribe(msg => {

                    if (msg.opType !== OpType.DELETE) {
                        setNewNotificaciones(true)
                        console.log("new notificacion de subscripcion")

                    }
                })

            verNuevosMensajes(sub)
            subscripcionMensajes = DataStore.observe(Usuario,
                e => e.id.eq( sub))
                .subscribe(msg => {
                    // Si hay nuevos mensajes en el usuario
                    if (!!msg.element.newMessages) {
                        setNewMessages(true)
                    }
                })
        })()
        return () => {
            subscripcionNotificaciones?.unsubscribe()
            subscripcionMensajes?.unsubscribe()
        }
    }, []);



    async function verNuevasNotificaciones() {
        const sub = await getUserSub()

        // Obtener todas las notificaciones no vistas
        const unread = await DataStore.query(Notificacion, e => e
            .and(c=>[
                c.usuarioID.eq( sub),
                c.leido.ne( true),
                c.showAt.lt( new Date()),
            ])
        )
        // console.log("Nuevas notificaciones:", unread.length)

        if (unread.length !== 0) {
            setNewNotificaciones(true)
            // console.log("Notificacion no leida")

        }
        return sub
    }

    const verNuevosMensajes = async (sub) => {
        // Obtener todas las notificaciones no vistas
        const usr = (await DataStore.query(Usuario, e => e.id.eq( sub)))[0]

        // console.log("Mensajes nuevos:", usr.newMessages)

        if (!!usr?.newMessages) {
            setNewMessages(true)
        }

    }



    // async function checarTutorialDeReserva() {
    //     const value = await AsyncStorage.getItem("@tutorialReservaShwon")

    //     if (!value) {
    //         setTipoModal("tutorial")
    //         setModalVisible(true)
    //     }
    // }

    // // Limpiar el elemento de tutorialShown
    // async function handleDoneTutorial() {
    //     setModalVisible(false)
    //     AsyncStorage.setItem("@tutorialReservaShwon", "t")

    // }

    const insets = useSafeAreaInsets()

    return (
        <View style={{
            // width,
            // height,
            flex: 1,
        }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,

                    tabBarActiveTintColor: moradoOscuro,
                    tabBarInactiveTintColor: "black",

                    tabBarStyle: {
                        paddingBottom: insets.bottom ? insets.bottom : 10,
                        elevation: 0,
                        backgroundColor: '#F4F6F6',
                        height: insets.bottom ? 70 + insets.bottom : 80,
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Inicio}
                    options={{
                        headerShown: true,
                        header: ({ navigation }) => {
                            return <HeaderNav title={"Velpa"} navigation={navigation} />
                        },
                        tabBarIcon: ({ color }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                <Foundation name="home" size={tamañoLogo} color={color} />
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                        color
                                    }}>Inicio</Text>
                            </View>
                        ),
                    }}
                />

                <Tab.Screen
                    name="Explorar"
                    component={MapaAventuras}

                    options={{
                        tabBarIcon: ({ color }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', }}>

                                <Ionicons name="compass" size={tamañoLogo} color={color} />
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                        color
                                    }}>Mapa</Text>
                            </View>)
                    }}
                />


                <Tab.Screen
                    name={"Plus"}
                    component={Plus}
                    options={{
                        tabBarButton: () => <CustomPlus
                            setModalVisible={async () => {
                                setModalVisible(true)
                                setTipoModal("add")
                            }}
                        />
                    }}
                />


                <Tab.Screen
                    name="NotificacionesTab"
                    component={NotificationsTab}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color, focused }) => {

                            // Si se selecciona se quita la bolita roja
                            const handlePress = () => {
                                navigation.navigate("NotificacionesTab")
                                setNewNotificaciones(false)
                                setNewMessages(false)
                            }


                            return (
                                <Pressable
                                    onPress={handlePress}
                                    style={{ alignItems: 'center', justifyContent: 'center', }}>

                                    <FontAwesome5 name="bell" size={tamañoLogo} color={color} />
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            color
                                        }}>Notificaciones</Text>

                                    {/* Indicador mensajes nuevos */}
                                    {(newNotificaciones || newMessages) && <View style={{
                                        height: 10,
                                        width: 10,
                                        borderRadius: 10,
                                        backgroundColor: 'red',
                                        position: 'absolute',
                                        top: 3,
                                        right: 24,
                                    }} />}

                                </Pressable>)
                        },
                    })}
                />

                <Tab.Screen
                    name="Perfil"
                    component={MiPerfil}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                <FontAwesome name="user" size={tamañoLogo} color={color} />
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                        color
                                    }}>Perfil</Text>
                            </View>

                        )
                    }}
                />


            </Tab.Navigator>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                {
                    tipoModal === "add" ?

                        <ModalAgregar
                            setModalVisible={setModalVisible}
                        />
                        :
                        <Tutorial
                        // doneViewing={handleDoneTutorial}
                        />

                }
            </Modal>

        </View >

    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    }
});