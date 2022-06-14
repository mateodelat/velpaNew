import { API, Auth } from 'aws-amplify'
import { openBrowserAsync } from 'expo-web-browser'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, Alert, ActivityIndicator, ScrollView, RefreshControl, Linking } from 'react-native'
import { AsyncAlert, colorFondo, getImageUrl, userEsGuia } from '../../../assets/constants'
import { Loading } from '../../components/Loading'

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Elemento from './components/Elemento'
import { DataStore } from '@aws-amplify/datastore';


import UserLevel from '../../components/UserLevel'

import InfoNivelesModal from '../../components/InfoNivelesModal'
import { Usuario } from '../../models'
import { SafeAreaView } from 'react-native-safe-area-context'



export default ({ route, navigation }) => {

    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({});

    const [guia, setGuia] = useState(false);
    const [admin, setAdmin] = useState(false);

    const [refreshing, setRefreshing] = useState(false);


    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setCurrentUserData()
    }, []);

    function handleSolicitudes() {
        navigation.navigate("MisSolicitudes")
    }

    function handleReservas() {
        navigation.navigate("MisReservas")
    }

    function handleFechas() {
        navigation.navigate("MisFechas")
    }

    async function handleAyuda() {
        Alert.alert("Abrir link?", "Se te dirigira a un link externo en whatsapp con el desarrollador de la app", [
            {
                text: "CANCELAR",
            },
            {
                text: "OK",
                onPress: () => Linking.openURL('whatsapp://send?text=Hola, tengo un problema con Velpa: &phone=5213324963705')
                    .catch(e => {
                        Alert.alert("Error", "Asegurate que tienes whatsapp instalado en tu dispositivo")
                    })
            },
        ])


    }


    function handlePerfil() {
        navigation.navigate("PerfilScreen", {
            user: data,
            isOwner: true
        })
    }




    async function miSaldo() {
        navigation.navigate("Saldo")
    }

    async function setCurrentUserData() {

        // Verificar si el usuario es admin para mostrar adminUI
        const user = await Auth.currentAuthenticatedUser().catch(e => console.log(e))
        if (!!user.signInUserSession.accessToken.payload['cognito:groups']?.find(e => e === "Admin")) {
            setAdmin(true)
            console.log("Usuario es admin")
        }

        // Evaluar si el usuario es guia
        setGuia(await userEsGuia())


        fetchUsuario(user)
            .then(async (r) => {
                if (r) {
                    setData({
                        ...r,
                        foto: {
                            uri: await getImageUrl(r.foto),
                            key: r.foto
                        },
                        imagenFondo: {
                            uri: await getImageUrl(r.imagenFondo),
                            key: r.imagenFondo
                        },
                    })

                }
                setLoaded(true)
            })
            .catch(e => {
                console.log("Error fetcheando el usuario", e)
                Alert.alert("Error", "Error obteniendo el usuario")

            })
    }


    //ENTRADAS: Usuario actual
    //PROCESO: Si el usuario actual no esta en la base de datos lo creamos
    //SALIDAS: Set data al usuario actual obtenido de la base de datos

    async function fetchUsuario(user) {
        // Pedir el usuario
        const sub = user.attributes.sub
        return await DataStore.query(Usuario, sub)
    }

    function handleAdmin() {
        navigation.navigate("Admin")
    }

    function handleConfig() {
        navigation.navigate("Configuracion")
        // Alert.alert("Ir a configuracion", "Cambiar contraseña, modificar tema de la app, metodos de pago, privacidad etc..")
    }


    async function cerrarSesion() {
        DataStore.clear()
        Auth.signOut()
    }

    function handleGuia() {
        navigation.navigate("SolicitudGuia")
    }


    if (!loaded) {
        return (
            <Loading valor={1} />
        )
    }

    function showInfoLevel() {
        setModalVisible(true)
    }

    function onRefresh() {

        setRefreshing(true)
        setCurrentUserData()
        setTimeout(() => {
            setRefreshing(false)
        }, 300);

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colorFondo,
        }}>

            <ScrollView
                key={route.params ? route.params.key : 12}
                style={styles.container}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}

            >


                {/* Perfil */}
                <Pressable
                    onPress={handlePerfil}
                    style={styles.header}>

                    {/* Elementos */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                        <View >
                            {data?.foto?.uri ?
                                <Image source={{ uri: data?.foto?.uri }} style={styles.image} /> :
                                <Image source={require("../../../assets/user.png")} style={styles.image} />
                            }
                        </View>
                        <View style={styles.headerText}>
                            <Text numberOfLines={1} style={styles.title} fds
                            >{!!data.nombre ? data?.nombre : data?.nickname}
                                {!!data?.apellido && <Text numberOfLines={1} style={styles.title}> {data.apellido}</Text>}

                            </Text>
                            <Text style={styles.nickname}>@{data?.nickname}</Text>
                        </View>

                        <MaterialIcons
                            style={{
                                padding: 5,
                            }}
                            name={"keyboard-arrow-right"}
                            size={40}
                            color={"black"}
                        />
                    </View>

                    {guia && <Pressable
                        onPress={showInfoLevel}
                    >

                        <UserLevel
                            userExp={data?.experience}

                            style={{ marginTop: 10, }}
                        />
                    </Pressable>
                    }
                </Pressable>



                {/* Controles de la app */}
                <View style={styles.body}>
                    <Elemento
                        texto={"Reservaciones"}
                        onPress={handleReservas}
                        icono={
                            <AntDesign
                                name="calendar"
                                size={30}
                                color="black"
                            />}
                    />

                    {guia && <Elemento
                        texto={"Fechas como guia"}
                        onPress={handleFechas}
                        icono={
                            <Image
                                source={require("../../../assets/icons/guia.png")}
                                style={{
                                    height: 30,
                                    width: 30,
                                }}
                            />
                        }
                    />}

                    {guia && <Elemento
                        texto={"Solicitudes a experiencias"}
                        onPress={handleSolicitudes}
                        icono={<Feather
                            name="user-check"
                            size={30}
                            color="black"
                        />
                        }
                    />}

                    {!guia && <Elemento
                        texto={"Ser guia"}
                        onPress={handleGuia}
                        icono={<Image
                            source={require("../../../assets/icons/guia.png")}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                        }
                    />}



                    {guia && <Elemento
                        texto={"Saldo"}
                        onPress={miSaldo}
                        icono={<MaterialIcons
                            style={{ left: -2, }}
                            name="account-balance-wallet"
                            size={30}
                            color="black"
                        />
                        }
                    />}

                    {admin &&
                        <Elemento
                            texto={"Admin UI"}
                            onPress={handleAdmin}
                            icono={<MaterialCommunityIcons
                                name="shield-edit"
                                size={30}
                                color="black"
                            />
                            }
                        />
                    }

                    <Elemento
                        texto={"Ayuda"}
                        onPress={handleAyuda}
                        icono={<Entypo name="help-with-circle" size={30} color="black" />
                        }
                    />


                    {/* <Elemento
                        texto={"Configuracion"}
                        onPress={handleConfig}
                        icono={<FontAwesome
                            name="gear"
                            size={30}
                            color="black"
                        />
                        }
                    /> */}

                    <Elemento
                        texto={"Cerrar sesion"}
                        onPress={cerrarSesion}
                        icono={<Feather
                            name="log-out"
                            size={30}
                            color="black"
                        />
                        }
                    />

                </View>

            </ScrollView>

            <InfoNivelesModal
                userExp={data?.experience}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />


        </SafeAreaView >

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colorFondo,
        flex: 1,
        width: '100%',
    },

    header: {
        marginBottom: 30,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        paddingRight: 15,
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 60,
        resizeMode: 'cover',
    },

    headerText: {
        paddingLeft: 5,
        flex: 1,

    },

    title: {
        fontSize: 15,
        fontWeight: 'bold',

    },

    nickname: {
        color: "#5b5b5b",
        fontSize: 15,
    },

    body: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        marginBottom: 60,
    },

    buttonContainer: {
        borderRadius: 5,
        borderColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7,
        marginBottom: 20,
    },

    editTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
