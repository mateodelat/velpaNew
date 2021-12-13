import React, { useEffect, useRef, useState } from 'react'
import { Alert, Dimensions, Image, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { colorFondo, container, getBlob, getImageUrl, isUrl, moradoOscuro, openImagePickerAsync } from '../../../../../assets/constants'

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { DataStore } from '@aws-amplify/datastore';
import Storage from '@aws-amplify/storage';

import { TipoPublicidad } from '../../../../models';
import { Aventura } from '../../../../models';
import { Publicidad } from '../../../../models';

import BuscarAventura from '../../../BuscarAventura';
import ModalTipoImagen from '../../../../components/ModalTipoImagen';
import HeaderModal from '../../../AgregarFecha/components/HeaderModal'



import uuid from 'react-native-uuid';
import { Video } from 'expo-av';


const { height } = Dimensions.get("window")

const colorInput = "#F4F6F6"

export default function ({
    item,
    handleCerrar,
    handleSave
}) {
    const [elemento, setElemento] = useState(item);

    const [showTipoAnuncio, setShowTipoAnuncio] = useState(false);

    const video = useRef(null)

    async function handleGuardar(e) {

        // Validaciones
        if (!e.titulo) {
            Alert.alert("Error", "Agrega el titulo")
            return
        }

        if (!e.descripcion) {
            Alert.alert("Error", "Agrega la descripcion")
            return
        }

        if (e.tipo === TipoPublicidad.AVENTURA && !e.aventuraID) {
            Alert.alert("Error", "Selecciona una aventura relacionada")
            return
        }

        if (e.tipo === TipoPublicidad.ANUNCIO && !e.linkAnuncio) {
            Alert.alert("Error", "Agrega el link del anuncio")
            return
        }

        if (e.tipo === TipoPublicidad.ANUNCIO && !isUrl(e.linkAnuncio)) {
            Alert.alert("Error", "Link del anuncio no valido")
            return
        }

        // Si hay id es que existe la publicidad y si no se genera uno aleatorio
        const id = e.id ? e.id : uuid.v4()

        // Si la imagen de fondo se selecciono del celular se sube a S3
        if (!e.imagenFondo.key) {
            setButtonLoading(true)
            const blob = await getBlob(e.imagenFondo.uri)
            const key = "pub-" + id + ".jpg"
            await Storage.put(key, blob)
            e.imagenFondo.key = key
        }

        // Subir datos o crear dependiendo de si existe el id
        if (e.id) {
            const modelPublicidad = await DataStore.query(Publicidad, e.id)
            await DataStore.save(Publicidad.copyOf(modelPublicidad, pub => {
                pub.aventuraID = e.aventuraID
                pub.descripcion = e.descripcion
                pub.imagenFondo = e.imagenFondo.key
                pub.linkAnuncio = e.linkAnuncio
                pub.tipo = e.tipo
                pub.titulo = e.titulo

            }))
        } else {
            await DataStore.save(new Publicidad({
                aventuraID: e.aventuraID,
                descripcion: e.descripcion,
                imagenFondo: e.imagenFondo.key,
                linkAnuncio: e.linkAnuncio,
                tipo: e.tipo,
                titulo: e.titulo,
            }))

        }

        setButtonLoading(false)
        handleSave(e)
    }

    // Obtener imagen relacionada si es tipo aventura
    useEffect(() => {
        if (item.tipo === TipoPublicidad.AVENTURA && item.aventuraID && !item.aventura) {
            DataStore.query(Aventura, item.aventuraID)
                .then(async aventura => {
                    // Obtener uri de storage solo para la imagen de fondo
                    const imagenDetalle = await Promise.all(aventura.imagenDetalle.map(async (e, idx) => {
                        if (idx = aventura.imagenFondoIdx) {
                            return {
                                uri: await getImageUrl(e),
                                key: e
                            }
                        } else {
                            return {
                                uri: e,
                                key: e
                            }
                        }
                    }))

                    setElemento({
                        ...item,
                        aventura: {
                            ...aventura,
                            imagenDetalle
                        }
                    })
                })
        }
    }, []);


    // Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState("aventura");

    const [buttonLoading, setButtonLoading] = useState(false);

    async function handleAddImage() {
        setModalVisible(true)
        setTipoModal("tipoImagen")
    }

    function handleAddVideo() {
        setModalVisible(true)
        setTipoModal("tipoVideo")

    }

    function handleRemoveVideo() {
        Alert.alert("Quitar video")

    }

    function handleSelectTipo(idx) {
        setElemento({
            ...elemento,
            tipo: tiposPublicidad[idx]
        })
        setShowTipoAnuncio(false)
    }

    function handlePickAventura() {
        setModalVisible(true)
        setTipoModal("aventura")

    }

    function handleSelectAventura(aventura) {
        let nuevoElemento = {
            ...elemento,
            aventura,
            aventuraID: aventura.id
        }
        setElemento(nuevoElemento)
        setModalVisible(false)

    }


    const tiposPublicidad = Object.values(TipoPublicidad)
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <HeaderModal
                style={{ backgroundColor: moradoOscuro, }}
                color={"#fff"}
                handleCerrar={handleCerrar}
                handleSave={() => handleGuardar(elemento)}

                titulo={"Publicidad"}
                modify={true}

                buttonLoading={buttonLoading}
            />

            {/* Cuerpo */}
            <View style={styles.container}>

                <Text style={[styles.placeHolder, { marginTop: 0, }]}>Imagen de fondo*</Text>
                {/* Imagen de fondo */}
                {!!elemento.imagenFondo ?

                    <Pressable
                        onPress={handleAddImage}
                        style={{ justifyContent: 'center', }}
                    >

                        <Image
                            style={styles.imagenFondo}
                            source={{ uri: elemento.imagenFondo.uri }}
                        />

                        <Pressable
                            onPress={video.current !== null ? async () => {
                                const { isPlaying } = await video.current.getStatusAsync()

                                if (isPlaying) {
                                    video.current.pauseAsync()
                                } else {
                                    video.current.playAsync()

                                }
                            }
                                : handleAddVideo}
                            style={styles.videoContainer}>
                            {elemento.video.uri ?
                                <View
                                    style={{
                                        alignItems: 'center',
                                        backgroundColor: '#000',
                                        justifyContent: 'center',
                                        borderRadius: 7,
                                    }}>
                                    <Video
                                        ref={video}
                                        style={styles.imagenVideo}
                                        source={{ uri: elemento.video.uri }}
                                    />
                                    <Entypo
                                        onPress={handleRemoveVideo}
                                        style={{
                                            position: 'absolute',
                                            backgroundColor: '#fff',
                                            borderRadius: 20,
                                            left: 5,
                                            top: 5,
                                            opacity: 0.9
                                        }}
                                        name="minus"
                                        size={20}
                                        color={"red"}
                                    />

                                    <Entypo
                                        style={{
                                            position: 'absolute',
                                            opacity: 0.9
                                        }}
                                        name="controller-play"
                                        size={30}
                                        color={"white"}
                                    />



                                </View> :
                                <View style={styles.cuadradoVideo}>
                                    <View>
                                        <Entypo name="video" size={40} color={moradoOscuro} />
                                        <Entypo
                                            style={styles.plusIcon}
                                            name="plus"
                                            size={30}
                                            color={moradoOscuro}
                                        />

                                    </View>

                                </View>}
                        </Pressable>
                    </Pressable>
                    :
                    <Pressable
                        onPress={handleAddImage}
                        style={styles.imagenFondo}>
                        <View>
                            <Entypo name="image" size={40} color={moradoOscuro} />
                            <Entypo
                                style={styles.plusIcon}
                                name="plus"
                                size={30}
                                color={moradoOscuro}
                            />

                        </View>
                    </Pressable>
                }
                <View style={{ marginBottom: 20, }} />

                {/* Tipo */}
                <Text style={styles.placeHolder}>Tipo</Text>
                <View style={{ flex: 1, }}>

                    <Pressable
                        onPress={() => setShowTipoAnuncio(!showTipoAnuncio)}
                        style={styles.tipoContainer}
                    >
                        <Text style={styles.tipoTxt}>{elemento.tipo}</Text>
                        <MaterialIcons
                            name={showTipoAnuncio ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                            size={30}
                            color={moradoOscuro}
                        />

                    </Pressable>
                    {showTipoAnuncio && <View style={styles.dropDownContainer}>
                        {
                            tiposPublicidad.map((e, idx) => (
                                <Pressable
                                    key={idx.toString()}
                                    style={{
                                        paddingHorizontal: 15,
                                        paddingVertical: 10,
                                        backgroundColor: elemento.tipo === e ? moradoOscuro : "transparent",
                                    }}
                                    onPress={() => handleSelectTipo(idx)}

                                >

                                    <Text
                                        style={{
                                            ...styles.tipoTxt,
                                            flex: 0,
                                            color: elemento.tipo !== e ? moradoOscuro : "#fff",
                                        }}
                                    >{e}</Text>
                                </Pressable>
                            ))
                        }
                    </View>
                    }
                </View>

                {/* Titulo */}
                <Text style={styles.placeHolder}>Titulo*</Text>
                <View style={styles.textInput}>
                    <TextInput
                        style={{ flex: 1, fontSize: 16, }}
                        value={elemento.titulo}
                        placeholder=""
                        onChangeText={r => {
                            setElemento({
                                ...elemento,
                                titulo: r
                            })
                        }}
                    />
                    {!!elemento.titulo && <Feather
                        onPress={() => setElemento({ ...elemento, titulo: "" })}
                        name="x"
                        size={25}
                        color="#7E7F84"
                        style={{ marginRight: 5, position: 'absolute', bottom: 10, right: 10, }}
                    />}
                </View>

                {/* Descripcion */}
                <Text style={styles.placeHolder}>Descripcion*</Text>
                <View style={styles.textInput}>
                    <TextInput
                        style={{ flex: 1, fontSize: 16, }}
                        value={elemento.descripcion}
                        placeholder=""
                        onChangeText={r => {
                            setElemento({
                                ...elemento,
                                descripcion: r
                            })
                        }}
                    />
                    {!!elemento.descripcion && <Feather
                        onPress={() => setElemento({ ...elemento, descripcion: "" })}
                        name="x"
                        size={25}
                        color="#7E7F84"
                        style={{ marginRight: 5, position: 'absolute', bottom: 10, right: 10, }}
                    />}
                </View>


                {/* Link Anuncio */}
                {elemento.tipo === TipoPublicidad.ANUNCIO && <>
                    <Text style={styles.placeHolder}>Link del anuncio*</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ flex: 1, fontSize: 16, }}
                            value={elemento.linkAnuncio}
                            placeholder=""
                            onChangeText={r => {
                                setElemento({
                                    ...elemento,
                                    linkAnuncio: r
                                })
                            }}
                        />
                        {!!elemento.linkAnuncio && <Feather
                            onPress={() => setElemento({ ...elemento, linkAnuncio: "" })}
                            name="x"
                            size={25}
                            color="#7E7F84"
                            style={{ marginRight: 5, position: 'absolute', bottom: 10, right: 10, }}
                        />}
                    </View>
                </>}


                {/* Aventura relacionada */}
                {elemento.tipo === TipoPublicidad.AVENTURA && <>
                    <Text style={styles.placeHolder}>Aventura relacionada*</Text>
                    <Pressable
                        onPress={handlePickAventura}
                        style={styles.tipoContainer}
                    >
                        <Text style={styles.tipoTxt}>{!elemento.aventura ? "Escoger" : elemento.aventura.titulo}</Text>
                        <MaterialIcons
                            name={"keyboard-arrow-right"}
                            size={30}
                            color={moradoOscuro}
                        />

                    </Pressable>
                </>}


            </View>

            <Modal
                animationType={tipoModal === "aventura" ? "slide" : "none"}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >{tipoModal === "aventura" ?
                <BuscarAventura
                    handleBack={() => setModalVisible(false)}
                    onPress={handleSelectAventura}
                />
                :
                tipoModal === "tipoImagen" ?
                    <ModalTipoImagen
                        setImage={data => {
                            setElemento({
                                ...elemento,
                                imagenFondo: data
                            })
                        }}
                        aventura={elemento.tipo === TipoPublicidad.AVENTURA ? elemento.aventura : null}
                        setModalVisible={setModalVisible}
                    />
                    :
                    <ModalTipoImagen
                        setImage={data => {
                            setElemento({
                                ...elemento,
                                video: data
                            })
                        }}
                        //    aventura={elemento.tipo === TipoPublicidad.AVENTURA ? elemento.aventura : null}
                        setModalVisible={setModalVisible}
                        video
                    />
                }
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },

    imagenFondo: {
        width: '100%',
        height: height * 0.25,
        borderRadius: 2,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: colorFondo,
    },

    placeHolder: {
        fontSize: 16,
        marginVertical: 10,
        marginTop: 15,
    },

    textInput: {
        backgroundColor: colorInput,
        padding: 10,
        fontSize: 16,
    },

    tipoContainer: {
        flexDirection: 'row',
        backgroundColor: colorInput,
        paddingHorizontal: 10,
        height: 45,
        alignItems: 'center',

    },

    tipoTxt: {
        fontSize: 16,
        color: moradoOscuro,
        flex: 1,
    },

    dropDownContainer: {
        width: '100%',
        backgroundColor: colorInput,
        zIndex: 1,
        position: 'absolute',
        top: 45,
        marginTop: 2,

    },

    videoContainer: {
        position: 'absolute',
        right: 10,
    },

    plusIcon: {
        position: 'absolute',
        right: -20,
        top: -20,
    },

    cuadradoVideo: {
        width: 90,
        height: 90,
        borderRadius: 7,
        backgroundColor: colorInput,
        opacity: 0.8,
        alignItems: 'center', justifyContent: 'center',

    },

    imagenVideo: {
        width: 90,
        height: 90,
        borderRadius: 7,
    }
})
