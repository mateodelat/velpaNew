import React from 'react';
import { Text, View, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { colorFondo } from '../../../assets/constants';
import Boton from './components/Boton';

export default function Landing({ navigation }) {

    const handleLogin = () => {
        navigation.navigate("Login", {})
    }

    const handleRegistrarse = () => {
        navigation.navigate("Register")
    }


    return (
        <View style={styles.cuadro}>
            <View style={styles.header}>
                <Image source={require('../../../assets/VELPA.png')} style={{ width: 100, height: 100, marginBottom: 20, }} />
                <Text style={styles.logoText}>VELPA</Text>
                <Text style={{
                    fontSize: 20,
                    textAlign: 'center',
                    paddingHorizontal: 10
                }}>Descubre aventuras increibles cerca de ti</Text>
            </View>

            <View style={styles.body}>
                <Boton
                    onPress={handleRegistrarse}
                    titulo={"Registrarse"}
                    backgroundColor={'#282EC0'}
                />

                <Boton
                    onPress={handleLogin}
                    titulo={"Iniciar Sesion"}
                    backgroundColor={'#6468C9'}
                />

                {/* <Pressable onPress={handleSaltar}>
                    <Text style={{ marginTop: 40, color: '#689ADA', fontSize: 18, }}>Omitir por ahora</Text>

                </Pressable> */}

            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    cuadro: {
        backgroundColor: colorFondo,
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },

    header: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    logoText: {
        fontSize: 30,
    },

    body: {
        alignItems: 'center',
        justifyContent: 'center',

    },

    boton: {
        marginVertical: 10,
        alignItems: 'center',
        height: 50,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 7,
        backgroundColor: '#282EC0',
    }
})
