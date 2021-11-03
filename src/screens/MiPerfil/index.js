import { API, Auth } from 'aws-amplify'
import { openBrowserAsync } from 'expo-web-browser'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, Alert, ActivityIndicator, ScrollView } from 'react-native'
import { colorFondo, getStripeIDUsuario, queryUsuario } from '../../../assets/constants'
import { Loading } from '../../components/Loading'

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { loginLinkStripe, retrieveBalanceStripe } from '../../graphql/mutations'
import Elemento from './components/Elemento'



export default ({ route, navigation }) => {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({});
    const [admin, setAdmin] = useState(true);

    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        // setCurrentUserData()
        setLoaded(true)
    }, []);

    function handleSolicitudes() {
        navigation.navigate("Solicitudes")
    }

    function handleViajes() {
        navigation.navigate("Reservaciones")
    }


    function handlePerfil() {
        navigation.navigate("PerfilScreen", {
            id: "MIID"
        })
    }



    async function verTransferencias() {
        setButtonLoading("transferencias")
        // Obtener el sub
        const sub = await Auth.currentUserInfo().then((r) => {
            return r.attributes.sub
        })

        API.graphql({
            query: getStripeIDUsuario,
            variables: { id: sub }
        }).then(async r => {
            const stripeID = r.data.getUsuario.stripeID

            const res = await API.graphql({
                query: retrieveBalanceStripe,
                variables: {
                    stripeID
                }
            }).then(r => {
                r = r.data.RetrieveBalanceStripe.result

                console.log(JSON.parse(r))
                setButtonLoading(false)
                return r
            })
        }).catch(e => {
            console.log(e)
            Alert.alert("Error", "Error obteniendo las transferencias")
            setButtonLoading(false)
        })


    }

    async function miSaldo() {
        setButtonLoading("saldo")
        // Obtener el sub

        try {

            const sub = await Auth.currentUserInfo().then((r) => {
                return r?.attributes?.sub
            })
                .catch(e => {
                    console.log(r)
                    return e
                })

            API.graphql({
                query: getStripeIDUsuario,
                variables: { id: sub }
            }).then(async r => {
                const stripeID = r.data.getUsuario.stripeID

                const link = await API.graphql({
                    query: loginLinkStripe,
                    variables: {
                        stripeID
                    }
                }).then(r => r.data.loginLinkStripe.url)

                await openBrowserAsync(link).then(r => {
                    setButtonLoading(false)

                })
            })
                .catch(e => {
                    console.log(r)
                    return e
                })

        } catch (error) {
            console.log(error)
            setButtonLoading(false)
            Alert.alert("Error", "Hubo un error abriendo el saldo")
        }


    }

    async function setCurrentUserData() {
        const user = await Auth.currentAuthenticatedUser().catch(e => console.log(e))
        if (!!user.signInUserSession.accessToken.payload['cognito:groups']?.find(e => e === "Admin")) {
            setAdmin(true)
        }

        fetchUsuario(user)
            .then(() => {
                setLoaded(true)
            })
            .catch(e => console.log("Error fetcheando el usuario", e))
    }


    //ENTRADAS: Usuario actual
    //PROCESO: Si el usuario actual no esta en la base de datos lo creamos
    //SALIDAS: Set data al usuario actual obtenido de la base de datos

    async function fetchUsuario(user) {
        // Pedir el usuario
        const sub = user.attributes.sub
        await API.graphql({ query: queryUsuario, variables: { id: sub } })
            .then(r => {
                r = r.data.getUsuario
                if (!r) {
                    // Si no hay usuario mensaje error
                    Alert.alert("Error", "No hay usuario favor de notificar al desarrollador")
                }

                else {
                    setData({
                        user,
                        ...r
                    })
                }
            })
            .catch(e => console.log(e))
    }

    function handleAdmin() {
        navigation.navigate("Admin")
    }


    function cerrarSesion() {
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

    return (
        <View style={{ flex: 1, }}>

            <ScrollView
                key={route.params ? route.params.key : 12}
                style={styles.container}
                showsVerticalScrollIndicator={false}

            >


                {/* Perfil */}
                <Pressable
                    onPress={handlePerfil}
                    style={styles.header}>
                    <View >
                        {data.foto ?
                            <Image source={{ uri: data.foto }} style={styles.image} /> :
                            <Image source={require("../../../assets/user.png")} style={styles.image} />
                        }
                    </View>
                    <View style={styles.headerText}>
                        <Text numberOfLines={1} style={styles.title}
                        >{data.nombre ? data.nombre : data.nickname}
                            {!data.apellido && <Text numberOfLines={1} style={styles.title}> {data.apellido}</Text>}

                        </Text>
                        <Text style={styles.nickname}>{data.nickname}</Text>
                    </View>

                    <MaterialIcons
                        style={{
                            padding: 5,
                        }}
                        name={"keyboard-arrow-right"}
                        size={40}
                        color={"black"}
                    />
                </Pressable>



                {/* Controles de la app */}
                <View style={styles.body}>
                    <Elemento
                        texto={"Aventuras proximas"}
                        onPress={handleViajes}
                        icono={
                            <AntDesign name="calendar" size={30} color="black" />}
                    />

                    <Elemento
                        texto={"Solicitudes a aventuras"}
                        onPress={handleSolicitudes}
                        icono={<Feather name="user-check" size={30} color="black" />
                        }
                    />

                    <Elemento
                        texto={"Ser guia"}
                        onPress={handleGuia}
                        icono={<Image source={require("../../../assets/icons/guia.png")} style={{ width: 30, height: 30, }} />
                        }
                    />



                    <Elemento
                        loading={buttonLoading === "saldo"}
                        texto={"Saldo"}
                        onPress={miSaldo}
                        icono={<MaterialIcons name="account-balance-wallet" size={30} color="black" />
                        }
                    />

                    {admin &&
                        <Elemento
                            texto={"Admin UI"}
                            onPress={handleAdmin}
                            icono={<MaterialCommunityIcons name="shield-edit" size={30} color="black" />
                            }
                        />
                    }

                    <Elemento
                        texto={"Cerrar sesion"}
                        onPress={cerrarSesion}
                        icono={<Feather name="log-out" size={30} color="black" />
                        }
                    />

                </View>

                {/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
                {/* Solicitudes se muestran solo si el perfil ha mandado solicitud de guia0 */}
                {/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}


                {/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
                {/* En lista de solicitudes se puede pedir otra solicitud*/}
                {/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}


                {/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
                {/* Estado de solicitudes se muestra en notificaciones */}
                {/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 30,
        backgroundColor: colorFondo,
        flex: 1,
        width: '100%',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
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
