import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login/Login';
import Register from '../screens/Login/Register';
import Landing from '../screens/Login/Landing';
import Confirm from '../screens/Login/Confirm';
import NewPassword from '../screens/Login/NewPassword';
import { moradoOscuro } from '../../assets/constants';



export default function LoginStack() {
    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: moradoOscuro,
                    },
                    headerTintColor: '#fff',

                }}
            // initialRouteName="Confirm"
            >

                <Stack.Screen
                    name={"Landing"}
                    component={Landing}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name={"Register"}
                    component={Register}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name={"Login"}
                    component={Login}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name={"Confirm"}
                    component={Confirm}
                    options={{
                        title: "Confirmar codigo",
                        headerTitleAlign: "center"
                    }}
                />
                <Stack.Screen
                    name={"NewPassword"}
                    component={NewPassword}
                    options={{
                        title: "Cambiar contraseña",
                        headerTitleAlign: "center"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
