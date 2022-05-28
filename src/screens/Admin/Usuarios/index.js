import React, { Children, useEffect, useState } from 'react'
import { ActivityIndicator, Image, Keyboard, Pressable, RefreshControl, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'

import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { API, Auth, DataStore } from 'aws-amplify';
import { Usuario } from '../../../models';
import Search from './components/Search';
import { Loading } from '../../../components/Loading';
import { colorFondo, getImageUrl, moradoClaro, moradoOscuro } from '../../../../assets/constants';
import { useNavigation } from '@react-navigation/native';
import SelectorInput from '../../../components/SelectorInput';

export default () => {
    const navigation = useNavigation()

    const [refreshing, setRefreshing] = useState(false);
    const [usuarios, setUsuarios] = useState(null);

    const [capacidadMaxima, setCapacidadMaxima] = useState(null);
    const [editingCantidad, setEditingCantidad] = useState(false);

    const [loadingAdmin, setLoadingAdmin] = useState(false);


    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        fetchUsuarios()
    }, []);

    function fetchUsuarios() {
        DataStore.query(Usuario)
            .then(async r => {
                r = await Promise.all(r.map(async usr => {
                    return {
                        ...usr,
                        foto: {
                            uri: await getImageUrl(usr.foto),
                            key: usr.foto
                        }
                    }

                }))


                setUsuarios(r)

            })

    }

    async function addToGroup(username, groupname) {
        let apiName = 'AdminQueries';
        let path = '/addUserToGroup';
        let myInit = {
            body: {
                "username": username,
                "groupname": groupname
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        return await API.post(apiName, path, myInit);
    }

    async function removeFromGroup(username, groupname) {
        let apiName = 'AdminQueries';
        let path = '/removeUserFromGroup';
        let myInit = {
            body: {
                "username": username,
                "groupname": groupname
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        return await API.post(apiName, path, myInit);
    }


    async function setAdmin(idx) {
        setLoadingAdmin(true)
        let newUsuarios = [...usuarios]
        let user = newUsuarios[idx]

        try {
            // Si no es admin se hace en admin queries
            if (!user.admin) {
                await addToGroup(user.id, "Admin")

            } else {

                await removeFromGroup(user.id, "Admin")

            }

            const model = await DataStore.query(Usuario, user.id)
            await DataStore.save(Usuario.copyOf(model, u => {
                u.admin = !user.admin
            }))

            newUsuarios[idx] = {
                ...user,
                admin: !user.admin
            }

        } catch (e) {
            console.log(e)
        }
        console.log(newUsuarios[idx].admin)

        setLoadingAdmin(false)
        setUsuarios(newUsuarios)

    }

    function onRefresh() {
        setRefreshing(true)
        fetchUsuarios()
        setTimeout(() => {
            setRefreshing(false)

        }, 300);

    }

    async function handleSaveCapacidad() {
        setEditingCantidad("loading")
        const newUsr = await DataStore.query(Usuario, usuarios[selectedUser].id)

        await DataStore.save(Usuario.copyOf(newUsr, e => {
            e.capacidadMaxima = capacidadMaxima

        }))

        let listUsuarios = [...usuarios]
        listUsuarios[selectedUser].capacidadMaxima = capacidadMaxima


        setUsuarios(listUsuarios)
        setEditingCantidad(false)

    }

    function handleChangeCantidad(num) {
        // Funcion que detecta cuando se empieza a cambiar las personas maximas

        if (!editingCantidad) {
            setEditingCantidad(true)
            setCapacidadMaxima(num)

        } else {
            setCapacidadMaxima(num)

        }
    }

    return (
        <Pressable
            onPress={() => Keyboard.dismiss()}
            style={{
                flex: 1,
            }}>
            <Search />

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }

                style={styles.container}>

                {
                    usuarios === null ?
                        <ActivityIndicator
                            size={"large"}
                            color={"black"}
                        /> :
                        usuarios.map((e, idx) => {

                            return <Pressable
                                key={idx}
                                style={styles.userContainer}
                                onPress={() => {
                                    setSelectedUser(selectedUser === idx ? null : idx)
                                    setEditingCantidad(false)
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >

                                    <View >
                                        {e.foto?.uri ?
                                            <Image source={{ uri: e.foto?.uri }} style={styles.image} /> :
                                            <Feather name="user" size={24} color="black" />}
                                    </View>
                                    <View style={styles.headerText}>
                                        <Text numberOfLines={1} style={styles.title}
                                        >{!!e.nombre ? e.nombre : e.nickname}
                                            {!!e.apellido && <Text numberOfLines={1} style={styles.title}> {e.apellido}</Text>}

                                        </Text>
                                        <Text style={styles.nickname}>@{e.nickname}</Text>
                                    </View>
                                    {editingCantidad == true ?
                                        <Entypo
                                            onPress={handleSaveCapacidad}

                                            style={{
                                                padding: 10,
                                            }}
                                            name="check" size={30} color="black" />
                                        :
                                        editingCantidad == "loading" ?
                                            <ActivityIndicator
                                                style={{
                                                    padding: 10,
                                                }}
                                                size={"small"}
                                                color={"#000"}
                                            /> :
                                            <MaterialIcons
                                                style={{
                                                    padding: 5,
                                                }}
                                                name={"keyboard-arrow-" + (selectedUser === idx ? "down" : "up")}
                                                size={40}
                                                color={"black"}
                                            />}

                                </View>
                                {/* Detalles del usuario */}
                                {
                                    selectedUser === idx && <View
                                        style={{
                                            marginTop: 10,
                                            width: '100%',
                                        }}
                                    >
                                        <Pressable
                                            onPress={() => !loadingAdmin && setAdmin(idx)}
                                            style={{
                                                padding: 10,
                                                paddingLeft: 0,
                                                justifyContent: 'space-between',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                height: 56,
                                            }}>

                                            <Text style={{
                                                fontSize: 16,
                                                // fontWeight: 'bold',
                                            }}>Admin</Text>

                                            {loadingAdmin ?
                                                <ActivityIndicator
                                                    size={"large"}
                                                    color={"black"}
                                                />
                                                : <Switch
                                                    trackColor={{
                                                        true: moradoOscuro + "88",
                                                        false: colorFondo
                                                    }}
                                                    thumbColor={moradoClaro}
                                                    onValueChange={() => setAdmin(idx)}
                                                    value={e.admin}

                                                />
                                            }
                                        </Pressable>

                                        {e.guia && <SelectorInput
                                            cantidad={editingCantidad ? capacidadMaxima : e.capacidadMaxima}
                                            setCantidad={handleChangeCantidad}


                                            descripcion={"Sin contar el conductor"}
                                            titulo={"Personas maximas"}

                                        />}


                                        <Text
                                            onPress={() => navigation.navigate("PerfilScreen", {
                                                user: e,
                                            })}
                                            style={{
                                                fontSize: 16,
                                                width: '100%',
                                                textAlign: 'center',
                                                color: moradoOscuro,
                                                padding: 5,
                                            }}>Ir al perfil</Text>

                                    </View>
                                }

                                {e.guia && <Image
                                    style={{
                                        width: 15,
                                        height: 15,
                                        position: 'absolute',
                                        top: 15,

                                        tintColor: moradoOscuro,
                                    }}
                                    source={require("../../../../assets/icons/guia.png")}
                                />}

                            </Pressable>
                        })

                }

            </ScrollView>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 5,
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
    },

    userContainer: {
        flex: 1,
        padding: 15,
        paddingTop: 20,

        borderRadius: 10,

        backgroundColor: '#fff',

        alignItems: 'center',
        marginBottom: 10,
    },


    foto: {
        width: 60,
        height: 60,

        marginRight: 10,

        borderRadius: 60,
    },

    image: {
        width: 60,
        height: 60,
        borderRadius: 60,
        resizeMode: 'cover',
        marginRight: 10,
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

})
