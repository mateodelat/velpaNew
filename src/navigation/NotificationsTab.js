import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Notifications from '../screens/Notifications';
import Messages from '../screens/Messages';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { colorFondo, moradoOscuro } from '../../assets/constants';

const Tab = createMaterialTopTabNavigator();

export default function () {
    const { width } = Dimensions.get("screen")
    return (
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
            <Tab.Screen name="Notificaciones" component={Notifications} />
            <Tab.Screen name="Mensajes" component={Messages} />
        </Tab.Navigator>
    );
}