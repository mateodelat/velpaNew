import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default () => {
    return (
        <View style={styles.container}>

            {/* Solicitudes de guia */}
            <Pressable style={styles.buttonContainer}>
                <Ionicons style={styles.icon} name="ios-person-add-sharp" size={24} color="white" />
                <Text style={styles.textoBoton}>Solicitudes para ser guia</Text>
            </Pressable>

            {/* Modificar aventuras por categorias*/}
            <Pressable style={styles.buttonContainer}>
                <AntDesign style={styles.icon} name="form" size={24} color="white" />
                <Text style={styles.textoBoton}>Modificar aventuras/categorias</Text>
            </Pressable>

            {/* Modificar fechas por aventuras y reservaciones*/}
            <Pressable style={styles.buttonContainer}>
                <Fontisto style={styles.icon} name="date" size={24} color="white" />
                <Text style={styles.textoBoton}>Fechas y reservaciones</Text>
            </Pressable>

            {/* Ver usuarios */}
            <Pressable style={styles.buttonContainer}>
                <Feather style={styles.icon} name="users" size={24} color="white" />
                <Text style={styles.textoBoton}>Ver usuarios</Text>
            </Pressable>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
    },

    buttonContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#80A3FF',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,


        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 1,
    },

    textoBoton: {
        color: '#fff',
        fontSize: 16,
    },

    icon: {
        position: 'absolute',
        left: 20,
    }
})
