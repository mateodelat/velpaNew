import React from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { container, moradoClaro, moradoOscuro } from '../../../assets/constants';


export default ({ navigation }) => {
    return (
        <View style={container}>

            {/* Solicitudes de guia */}
            <Text style={{ ...styles.texto, marginTop: 0, }}>Solicitudes</Text>
            <Pressable
                onPress={() => navigation.navigate("SolicitudesPendientes")}
                style={styles.buttonContainer}>
                <Ionicons style={styles.icon} name="ios-person-add-sharp" size={24} color="white" />
                <Text style={styles.textoBoton}>Solicitudes para ser guia pendientes</Text>
            </Pressable>

            {/* Solicitudes revisadas */}
            <Pressable
                onPress={() => navigation.navigate("VerSolicitudes")}
                style={styles.buttonContainer}>
                <Feather style={styles.icon} name="list" size={24} color="white" />
                <Text style={styles.textoBoton}>Solicitudes revisadas</Text>
            </Pressable>

            {/* Guias autorizados por aventuras */}
            <Text style={styles.texto}>Usuarios</Text>
            <Pressable
                onPress={() => navigation.navigate("GuiasAutorizados")}
                style={styles.buttonContainer}>
                <FontAwesome5 name="users" size={24} color="white" style={styles.icon} />
                <Text style={styles.textoBoton}>Guias autorizados por aventuras</Text>
            </Pressable>

            {/* Ver usuarios
            <Pressable
                onPress={() => navigation.navigate("Usuarios")}
                style={styles.buttonContainer}>
                <Feather style={styles.icon} name="users" size={24} color="white" />
                <Text style={styles.textoBoton}>Ver usuarios</Text>
            </Pressable> */}

            <Text style={styles.texto}>Datos cliente</Text>
            {/* Modificar aventuras por categorias*/}
            <Pressable
                onPress={() => navigation.navigate("ModificarAventuras")}
                style={styles.buttonContainer}>
                <AntDesign style={styles.icon} name="form" size={24} color="white" />
                <Text style={styles.textoBoton}>Modificar aventuras/categorias</Text>
            </Pressable>

            {/* Modificar fechas por aventuras y reservaciones*/}
            <Pressable
                onPress={() => navigation.navigate("FechasYReservas")}
                style={styles.buttonContainer}>
                <Fontisto style={styles.icon} name="date" size={24} color="white" />
                <Text style={styles.textoBoton}>Fechas y reservaciones</Text>
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
        backgroundColor: moradoClaro,

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
    },

    texto: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
    }
})
