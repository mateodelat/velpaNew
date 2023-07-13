import React, { useState } from 'react'
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { AsyncAlert, moradoOscuro, shadowMedia } from '../../../assets/constants';
import { DataStore } from 'aws-amplify';
import { ChatRoomUsuarios, Usuario } from '../../models';
import { tipoUrl, urlRequest } from '../../../assets/constants/constant';
import { Fecha } from '../../models';
import { Reserva } from '../../models';
import { ChatRoom } from '../../models';
import { Comision } from '../../models';
import { SolicitudGuia } from '../../models';
import { AventuraSolicitudGuias } from '../../models';
import { AventuraUsuarios } from '../../models';
import { Mensaje } from '../../models';
import { Notificacion } from '../../models';

import { STRIPE_DELETE_ACCOUNT } from '@env';

export default ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    async function handleDeleteUserInfo() {
        try {
            await AsyncAlert("Experimental", "Alerta boton sensible seguro que quieres borrar:\n\n_Desilgar cuentas de stripe de los guias\n_Reservas y fechas\n_Chatrooms\n_Comisiones\n_Permisos de experiencia usuarios\n_Notificaciones")

            setLoading(true)
            let promises = []

            // Desligar usuarios
            promises.push(DataStore.query(Usuario, u => u
                .stripeID.ne( null)
            )
                .then(u => {
                    u.map(u => {

                        // Borrar cuenta de stripe asociada


                        promises.push(urlRequest(
                            "https://api.stripe.com/v1/accounts/" + u.stripeID,
                            tipoUrl.delete,
                            STRIPE_DELETE_ACCOUNT)
                            .then(r => {
                                r = JSON.parse(r)
                                if (r.error) {
                                    Alert.alert("Error borrando la cuenta de stripe", r.error.message)
                                }
                            }))

                        // Actualizar estado del usuario
                        promises.push(DataStore.save(Usuario.copyOf(u, u => {
                            u.guia = false
                            u.stripeID = null
                        }))
                        )
                    })
                }
                )
            )

            // Eliminar fechas y reservas
            promises.push(DataStore.query(Fecha).then(r => {
                r.map(a => DataStore.delete(a))
            }))
            promises.push(DataStore.query(Reserva).then(r => {
                r.map(a => DataStore.delete(a))
            }))

            // Chatrooms
            promises.push(DataStore.query(ChatRoom).then(r => {
                r.map(a => DataStore.delete(a))
            }))
            promises.push(DataStore.query(ChatRoomUsuarios).then(r => {
                r.map(a => DataStore.delete(a))
            }))
            promises.push(DataStore.query(Mensaje).then(r => {
                r.map(a => DataStore.delete(a))
            }))

            // Comisiones
            promises.push(DataStore.query(Comision).then(r => {
                r.map(a => DataStore.delete(a))
            }))

            // Permisos de experiencia
            promises.push(DataStore.query(SolicitudGuia).then(r => {
                r.map(a => DataStore.delete(a))
            }))
            promises.push(DataStore.query(AventuraSolicitudGuias).then(r => {
                r.map(a => DataStore.delete(a))
            }))
            promises.push(DataStore.query(AventuraUsuarios).then(r => {
                r.map(a => DataStore.delete(a))
            }))

            // Notificaciones
            promises.push(DataStore.query(Notificacion).then(r => {
                r.map(a => DataStore.delete(a))
            }))


            await Promise.all(promises)

            setLoading(false)
        } catch (error) {
            if (error !== "Cancelada") {
                setLoading(false)
                Alert.alert("Error", "Error borrando los datos:\n" + error)
            }
        }
    }

    return (
        <View style={{
            flex: 1,
        }}>

            <View style={styles.container}>

                {/* Solicitudes de guia */}
                <Text style={{ ...styles.texto, marginTop: 0, }}>Solicitudes</Text>
                <Pressable
                    onPress={() => navigation.navigate("SolicitudesPendientes")}
                    style={styles.buttonContainer}>
                    <Ionicons style={styles.icon} name="ios-person-add-sharp" size={24} color={"#fff"} />
                    <Text style={styles.textoBoton}>Solicitudes para ser guia pendientes</Text>
                </Pressable>

                {/* Solicitudes revisadas */}
                <Pressable
                    onPress={() => navigation.navigate("VerSolicitudes")}
                    style={styles.buttonContainer}>
                    <Feather style={styles.icon} name="list" size={24} color={"#fff"} />
                    <Text style={styles.textoBoton}>Solicitudes revisadas</Text>
                </Pressable>

                {/* Guias autorizados por aventuras */}
                {/* <Text style={styles.texto}>Usuarios</Text>
            <Pressable
                onPress={() => navigation.navigate("GuiasAutorizados")}
                style={styles.buttonContainer}>
                <FontAwesome5 name="users" size={24} color={"#fff"} style={styles.icon} />
                <Text style={styles.textoBoton}>Guias autorizados por aventuras</Text>
            </Pressable> */}

                {/* Ver usuarios */}
                {/* <Pressable
                onPress={() => navigation.navigate("Usuarios")}
                style={styles.buttonContainer}>
                <Feather style={styles.icon} name="users" size={24} color={"#fff"} />
                <Text style={styles.textoBoton}>Ver usuarios</Text>
            </Pressable> */}

                <Text style={styles.texto}>Datos cliente</Text>
                {/* Modificar aventuras por categorias*/}
                <Pressable
                    onPress={() => navigation.navigate("ModificarAventuras")}
                    style={styles.buttonContainer}>
                    <AntDesign style={styles.icon} name="form" size={24} color={"#fff"} />
                    <Text style={styles.textoBoton}>Ver aventuras</Text>
                </Pressable>

                {/* Ver publicidades*/}
                <Pressable
                    onPress={() => navigation.navigate("Publicidad")}
                    style={styles.buttonContainer}>
                    <View style={styles.icon}>
                        {/* <AntDesign name="form" size={24} color={"#fff"} /> */}
                        <AntDesign name="laptop" size={24} color="#fff" />
                        <Entypo
                            style={{ position: 'absolute', bottom: 9, }}
                            name="megaphone" size={11} color="#fff" />
                    </View>
                    <Text style={styles.textoBoton}>Anuncios</Text>
                </Pressable>

                {/* Ver usuarios*/}
                <Pressable
                    onPress={() => navigation.navigate("Usuarios")}
                    style={styles.buttonContainer}>
                    <View style={styles.icon}>
                        <Ionicons name="person" size={24} color="#fff" />
                    </View>
                    <Text style={styles.textoBoton}>Usuarios</Text>
                </Pressable>


                {/* Modificar fechas por aventuras y reservaciones*/}
                <Pressable
                    onPress={handleDeleteUserInfo}
                    style={{
                        ...styles.buttonContainer,
                        backgroundColor: 'coral',

                    }}>
                    <Ionicons style={styles.icon} name="trash" size={24} color={"#fff"} />
                    <Text style={styles.textoBoton}>Borrar toda info de los usuarios</Text>
                </Pressable>


            </View>
            {loading && <View style={{
                position: 'absolute',
                alignItems: 'center', justifyContent: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: '#00000077',
            }}>
                <ActivityIndicator
                    size={"large"}
                />
            </View>}
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffff",
        flex: 1,
        padding: 20,
    },

    buttonContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: moradoOscuro,

        ...shadowMedia,

        alignItems: 'center',
        justifyContent: 'center',
    },

    textoBoton: {
        color: "#fff",
        fontSize: 16,
    },

    icon: {
        position: 'absolute',
        left: 20,
        alignItems: 'center', justifyContent: 'center',
    },

    texto: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
    }
})
