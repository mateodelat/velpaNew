import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Notifications from '../screens/Notifications';
import Messages from '../screens/Messages';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { colorFondo, getUserSub, moradoOscuro } from '../../assets/constants';
import { DataStore } from '@aws-amplify/datastore';
import { Notificacion } from '../models';

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

    useEffect(() => {
        let subscripcion
        verNuevasNotificaciones()
            .then(r => {
                const sub = r
                subscripcion = DataStore.observe(Notificacion, e => e.usuarioID("eq", sub).leido("ne", true))
                    .subscribe(msg => {
                        setNewNotificaciones(true)
                    })
            })

        return () => subscripcion?.unsubscribe()
    }, []);

    const verNuevasNotificaciones = async () => {
        const sub = await getUserSub()

        // Obtener todas las notificaciones no vistas
        const unread = await DataStore.query(Notificacion, e => e.usuarioID("eq", sub).leido("ne", true))

        if (unread.length !== 0) {
            setNewNotificaciones(true)
        }


    }

    return (
        <Pressable
            onTouchStart={() => setNewNotificaciones(false)}
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
                        height: 60,
                        justifyContent: 'center',
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
                            return <Texto color={color} showBadge={false} texto={"MENSAJES"} />
                        }
                    }}
                    name="Mensajes" component={Messages} />
            </Tab.Navigator>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "white"
    },

});