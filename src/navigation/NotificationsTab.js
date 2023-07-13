import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Notifications from '../screens/Notifications';
import Messages from '../screens/Messages';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colorFondo, getUserSub, moradoOscuro } from '../../assets/constants';
import { DataStore, OpType } from '@aws-amplify/datastore';
import { Notificacion } from '../models';
import { Usuario } from '../models';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const Texto = ({ showBadge, color, texto }) => {
    return <View>
        {showBadge && <View style={{
            position: 'absolute',
            alignItems: 'center',
            backgroundColor: "#ff0000",
            width: 6,
            height: 6,
            borderRadius: 10,
            right: -15,
            top: -10,
        }} />}
        <Text style={{
            ...styles.text,
            color
        }}>{texto}</Text>

    </View>
}
export default function () {
    const { width } = Dimensions.get("screen")

    const [newNotificaciones, setNewNotificaciones] = useState(false);
    const [newMessages, setNewMessages] = useState(false);

    useEffect(() => {
        let subscripcionNotificaciones
        let subscripcionMensajes
        (async () => {
            const sub = await getUserSub()

            verNuevasNotificaciones(sub)
            subscripcionNotificaciones = DataStore.observe(Notificacion, e => e
                .and(c=>[
                    c.usuarioID.eq( sub),
                    c.leido.ne( true),
                    c.showAt.gt( new Date()),
                ])
            )
                .subscribe(msg => {
                    if (msg.opType !== OpType.DELETE) {
                        setNewNotificaciones(true)

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

    const verNuevasNotificaciones = async (sub) => {
        // Obtener todas las notificaciones no vistas
        const unread = await DataStore.query(Notificacion, e => e
            .and(c=>[
                c.usuarioID.eq( sub),
                c.leido.ne( true),
                c.showAt.lt( new Date()),
    
            ])
        )

        if (unread.length !== 0) {
            setNewNotificaciones(true)
        }
    }

    const verNuevosMensajes = async (sub) => {
        // Obtener todas las notificaciones no vistas
        const usr = (await DataStore.query(Usuario, e => e.id("eq", sub)))[0]

        if (!!usr?.newMessages) {
            setNewMessages(true)
        }

    }
    const { top } = useSafeAreaInsets()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: moradoOscuro, }}>

            <Pressable
                onTouchStart={() => {
                    setNewNotificaciones(false)
                    setNewMessages(false)
                }}
                style={{ flex: 1, }}>

                <Tab.Navigator
                    screenOptions={{

                        tabBarPressOpacity: 0,
                        tabBarIndicatorStyle: {
                            backgroundColor: colorFondo,
                            marginBottom: 7,
                            width: 5,
                            height: 5,
                            left: width / 4 - 2.5,
                            borderRadius: 5,
                        },
                        style: { height: 60, },
                        tabBarPressColor: "transparent",
                        tabBarActiveTintColor: '#fff',
                        tabBarInactiveTintColor: "#ffffff88",
                        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', },
                        tabBarStyle: {
                            backgroundColor: moradoOscuro,
                            height: 60 + top,
                            justifyContent: 'flex-end',
                            paddingBottom: 5,
                        },
                    }}

                >
                    <Tab.Screen name="Notificaciones"
                        options={{
                            tabBarLabel: ({ color, focused }) => {
                                return <Texto color={color} showBadge={newNotificaciones} texto={"NOTIFICACIONES"} />

                            }
                        }}
                        component={Notifications} />
                    <Tab.Screen

                        options={{
                            tabBarLabel: ({ color, focused }) => {
                                return <Texto color={color} showBadge={newMessages} texto={"MENSAJES"} />
                            }
                        }}
                        name="Mensajes" component={Messages} />
                </Tab.Navigator>
            </Pressable>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "white"
    },

});