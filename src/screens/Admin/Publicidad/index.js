import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, FlatList, Image, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'


import { colorFondo, container, getImageUrl, moradoOscuro } from '../../../../assets/constants';
import { TipoPublicidad } from '../../../models';
import ComponentePublicidad from '../../Inicio/components/ComponentePublicidad';
import { Loading } from '../../../components/Loading';
import { DataStore } from '@aws-amplify/datastore';
import { Publicidad } from '../../../models';

import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import EditarPublicidad from './components/EditarPublicidad';
import { vibrar } from '../../../../assets/constants/constant';




export default ({ navigation }) => {
    const [publicidades, setPublicidades] = useState(null);
    const [selecting, setSelecting] = useState(false);

    // Modal de editar publicidad
    const [indexSelected, setIndexSelected] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchPublicidad()
    }, []);

    async function fetchPublicidad() {
        DataStore.query(Publicidad).then(async (r) => {
            r = await Promise.all(r.map(async publi => ({
                ...publi,
                imagenFondo: {
                    uri: await getImageUrl(publi.imagenFondo),
                    key: publi.imagenFondo
                },
                video: {
                    uri: await getImageUrl(publi.video),
                    key: publi.video
                },
                selected: false
            })))

            setPublicidades(r)

        })

    }

    function abrirLink(link) {

        Alert.alert("Link externo", "Abrir link: " + link, [
            {
                text: "cancelar",
                style: "cancel"
            },
            {
                text: "OK",
                onPress: () => Linking.openURL(link)
            },
        ])


    }

    function handleSelectItem(idx) {
        publicidades[idx].selected = !publicidades[idx].selected

        if (!publicidades.filter(e => e.selected).length) {
            setSelecting(false)
        }

        setPublicidades([...publicidades])

    }

    function handlePressItem(idx) {
        setModalVisible(true)
        setIndexSelected(idx)
    }

    function handleRemoveItems() {
        let nPublicidades = [...publicidades]

        let itemsDeleted = 0
        // Mapear todas las publicidades
        publicidades
            .map(async (e, idx) => {
                if (e.selected) {
                    // Borrar las selecionadas
                    nPublicidades.splice(idx - itemsDeleted, 1)
                    itemsDeleted += 1
                    DataStore.delete(Publicidad, e.id)
                }
            })
        setSelecting(false)
        setPublicidades(nPublicidades)

    }

    function handleAddPublicidad() {
        setIndexSelected(null)
        setModalVisible(true)

    }

    function handleSelecting(idx) {
        setSelecting(true)
        publicidades[idx].selected = true
        setPublicidades([...publicidades])
    }

    function handleSavePublicidad(item) {
        setModalVisible(false)

        // Si no hay ningun index selected significa que es nuevo anuncio
        if (!indexSelected) {
            publicidades.push(item)
        } else {
            publicidades[indexSelected] = item

        }
        setPublicidades([...publicidades])
    }

    return (
        <View style={{ flex: 1, }}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Avisos pagina inicio</Text>
                {
                    selecting ?
                        <Entypo
                            style={{ position: 'absolute', left: 16, }}
                            onPress={() => setSelecting(false)}
                            name={"cross"}
                            size={35}
                            color={"#fff"}
                        /> :
                        <MaterialIcons
                            style={{ position: 'absolute', left: 16, }}
                            onPress={() => navigation.pop()}
                            name={"keyboard-arrow-left"}
                            size={35}
                            color={"#fff"}
                        />
                }

                {selecting &&
                    <Feather
                        style={{ position: 'absolute', right: 16, }}
                        onPress={handleRemoveItems}
                        name="trash-2"
                        size={30}
                        color={"#fff"} />
                }
            </View>

            {
                !publicidades ?
                    <Loading indicator />
                    :
                    <ScrollView
                        style={container}
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            publicidades.length === 0 ?
                                <Text style={{ fontSize: 18, textAlign: 'center', }}>No hay publicidad</Text>
                                :
                                publicidades.map((item, i) => {
                                    const selected = item.selected
                                    return <Pressable
                                        key={i.toString()}
                                        onLongPress={() => {
                                            handleSelecting(i)
                                            vibrar('select')
                                        }}
                                        onPress={() => selecting ? handleSelectItem(i) : handlePressItem(i)}
                                        style={{ marginBottom: 20, }}>
                                        <ComponentePublicidad
                                            onPress={selecting ? () => handleSelectItem(i) :
                                                item.tipo === TipoPublicidad.AVENTURA ?
                                                    () => navigation.navigate("DetalleAventura", { id: item.aventuraID }) :

                                                    item.tipo === TipoPublicidad.ANUNCIO ?
                                                        () => abrirLink(item.linkAnuncio) :

                                                        // Actualizacion
                                                        () => Alert.alert("Actualizacion", "No configurado")
                                            }
                                            item={{
                                                imagenFondo: item.imagenFondo,
                                                video: item.video,
                                                titulo: item.titulo,
                                                descripcion: item.descripcion,
                                                tipo: item.tipo
                                            }}
                                        />

                                        {/* Puntito de selecion de publicidad */}
                                        {selecting && <View style={styles.puntitoSelected}>
                                            <View style={{
                                                ...styles.puntitoInterior,
                                                backgroundColor: selected ? moradoOscuro : "transparent",
                                            }} />

                                        </View>}

                                    </Pressable>

                                })
                        }

                        <Pressable
                            onPress={handleAddPublicidad}
                            style={styles.plusContainer}>
                            <Entypo
                                name="plus"
                                size={30}
                                color={moradoOscuro} />

                        </Pressable>

                    </ScrollView>
            }
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <EditarPublicidad
                    handleCerrar={() => setModalVisible(false)}
                    handleSave={handleSavePublicidad}
                    item={publicidades && indexSelected !== null ? publicidades[indexSelected] : {}}
                />

            </Modal>
        </View>

    )
}


const styles = StyleSheet.create({

    puntitoSelected: {
        backgroundColor: colorFondo,
        borderRadius: 10,
        opacity: 1,
        position: 'absolute',
        left: 10,
        top: 10,
        padding: 5,
    },

    puntitoInterior: {
        width: 10,
        height: 10,
        borderRadius: 10,

    },


    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: moradoOscuro,
        paddingHorizontal: 16
    },

    headerTitle: {
        flex: 1,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: "#fff",
    },

    plusContainer: {
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 40,
        marginTop: 10,
        marginBottom: 50,
    }
})
