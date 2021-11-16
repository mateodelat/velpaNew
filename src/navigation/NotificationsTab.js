import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Notifications from '../screens/Notifications';
import Messages from '../screens/Messages';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { colorFondo, moradoOscuro } from '../../assets/constants';

const Tab = createMaterialTopTabNavigator();

const Texto = ({ focused, color, texto }) => {
    return <View>
        <View style={{
            position: 'absolute',
            alignItems: 'center',
            backgroundColor: "#ff0000",
            width: 6,
            height: 6,
            borderRadius: 10,
            right: -15,
            top: -10,
        }} />
        <Text style={{
            ...styles.text,
            color
        }}>{texto}</Text>

    </View>
}
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
            <Tab.Screen name="Notificaciones"
                options={{
                    tabBarLabel: ({ color, focused }) => {
                        return <Texto color={color} focused={focused} texto={"NOTIFICACIONES"} />

                    }
                }}
                component={Notifications} />
            <Tab.Screen
                options={{
                    tabBarLabel: ({ color, focused }) => {
                        return <Texto color={color} focused={focused} texto={"MENSAJES"} />
                    }
                }}
                name="Mensajes" component={Messages} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "white"
    },

});