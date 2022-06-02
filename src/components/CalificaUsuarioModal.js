import { DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { getImageUrl, getUserSub, mayusFirstLetter, redondear, redondearNDecimales } from '../../assets/constants';
import { Aventura, Notificacion, TipoNotificacion } from '../models';
import { Usuario } from '../models';

import { Entypo } from '@expo/vector-icons';
import { Loading } from './Loading';
import Boton from './Boton';
import { Comentario } from '../models';
import Calificacion from './Calificacion';
import { sendPushNotification } from '../../assets/constants/constant';

const { height, width } = Dimensions.get("window")

export default function ({
    setModalVisible,
    modalVisible,

    aventuraID,
    usuarioID,

    borrarNotificacion

}) {

    const [guia, setGuia] = useState(null);
    const [originalGuia, setOriginalGuia] = useState(null);
    const [aventura, setAventura] = useState(null);

    const [rating, setRating] = useState(null);
    const [comments, setComments] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        DataStore.query(Usuario, usuarioID).then(async r => {
            setOriginalGuia(r)
            setGuia({
                ...r,
                foto: r.foto ? await getImageUrl(r.foto) : null
            })
        })
        DataStore.query(Aventura, aventuraID).then(async r => {
            const imagenFondo = await getImageUrl(r.imagenDetalle[r.imagenFondoIdx])

            setAventura({
                ...r,
                imagenFondo
            })
        })

    }, []);

    function salirSinGuardar(descripcion) {
        Alert.alert("Salir", descripcion ? descripcion : "Seguro que quieres salir sin guardar?", [
            {
                text: "CANCELAR",
            },
            {
                text: "OK",
                onPress: () => {
                    setModalVisible(false)
                    setRating(null)
                    setComments(null)
                }
            },
        ])


    }

    function handleClose() {
        // Si se puso una calificacion mostrar alerta
        if (rating || comments) {
            salirSinGuardar()
        } else {
            setModalVisible(false)
        }

    }



    async function handleSend() {
        if (!rating) {
            salirSinGuardar("Seguro que quieres salir, no se calificado al guia")
            return
        }


        const actualCalificacion = guia.calificacion

        const { notificationToken,
            numResenas,
            experience
        } = guia

        const mediaCalif = redondearNDecimales(((actualCalificacion * numResenas) + rating) / (numResenas + 1), 2)

        const expGain = rating > 3 ? 3 : rating < 3 ? -3 : 1
        try {

            // Guardar la nueva calificacion del usuario
            await DataStore.save(Usuario.copyOf(originalGuia, n => {
                n.calificacion = mediaCalif
                n.numResenas = numResenas + 1
            }))

            // Guardar el comentario al guia
            await DataStore.save(new Comentario({
                calificacion: rating,
                body: comments,
                usuarioCalificadoID: guia.id,
                creatorID: await getUserSub()
            }))

            const sub = await getUserSub()
            const usuarioCalificador = await DataStore.query(Usuario, sub)
            const titulo = "Nueva reseña"
            const descripcion = mayusFirstLetter(usuarioCalificador.nickname) + " te ha calificado en " + aventura.titulo + " con " + rating + " estrellas.\n" + ((expGain > 0 ? "+" : "") + expGain + " exp")


            // Notificacion al guia que fue calificado
            DataStore.save(new Notificacion({
                tipo: 'BIENVENIDA',

                titulo,
                descripcion,
                usuarioID: guia.id,

                showAt: new Date().getTime(),
            }))

            sendPushNotification({
                title: titulo,
                descripcion,
                token: notificationToken
            })


            Alert.alert("Exito", "Experiencia calificada con exito!!")
            borrarNotificacion()

        } catch (error) {
            Alert.alert("Error", "Error creando reseña")
            console.log(error)
        }

        setModalVisible(false)
        setButtonLoading(false)
        setRating(null)
        setComments(null)


    }

    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleClose}
        >

            <Pressable
                onPress={handleClose}
                style={styles.container}>
                <Pressable
                    onPress={Keyboard.dismiss}
                    style={styles.innerContainer}>
                    {aventura ?
                        <View style={styles.imageBackground}>
                            <Image
                                source={{ uri: aventura.imagenFondo }}
                                style={{ flex: 1, }}
                            />
                            <Entypo
                                style={styles.closeIcon}
                                onPress={handleClose}
                                name="cross"
                                size={24}
                                color="black"
                            />
                        </View>
                        :
                        <View style={styles.imageBackground}>
                            <Loading indicator />
                        </View>}
                    <View style={{ padding: 10, }}>
                        <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: 'bold', alignSelf: 'center', }}>{aventura?.titulo}</Text>

                        <View style={styles.infoGuia}>

                            <Image
                                source={guia?.foto ? { uri: guia.foto } : require("../../assets/user.png")}
                                style={styles.imageGuia}
                            />

                            <View style={{ flex: 1, }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', }}>@{guia?.nickname}</Text>
                                {guia && <Text style={{ fontSize: 16, }}>{guia?.nombreAgencia ? guia?.nombreAgencia : (guia?.nombre + " " + guia?.apellido)}</Text>}
                            </View>

                            <Calificacion
                                usuario={guia}
                            />
                        </View>


                        <View style={styles.starsRow}>
                            {
                                [...Array(5).keys()].map((e, idx) => (
                                    <Entypo
                                        onPress={() => setRating(idx + 1)}
                                        key={idx}
                                        name={rating <= idx ? "star-outlined" : "star"}
                                        size={35}
                                        color="#F5BE18"
                                    />
                                ))
                            }

                        </View>

                        <TextInput
                            multiline
                            numberOfLines={5}
                            value={comments}
                            onChangeText={setComments}
                            style={styles.comments}
                        />

                        <Boton
                            loading={buttonLoading}
                            titulo={"Enviar"}
                            onPress={handleSend}
                        />
                    </View>

                </Pressable>
            </Pressable>
        </Modal >

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00000099',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    innerContainer: {
        backgroundColor: '#fff',
        width: '100%',

    },

    imageBackground: {
        height: height * 0.2,
        backgroundColor: '#F4F6F6',
    },

    imageGuia: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginRight: 10,

    },

    infoGuia: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    starsRow: {
        flexDirection: 'row',
        marginVertical: 10,
        alignSelf: 'center',

    },

    comments: {
        backgroundColor: '#F4F6F6',
        padding: 10,
        textAlignVertical: 'top',
        borderRadius: 7,
        marginBottom: 20,
    },

    closeIcon: {
        left: 10,
        top: 10,
        borderRadius: 30,
        backgroundColor: '#fff',
        padding: 3,
        position: 'absolute',
    }

})
