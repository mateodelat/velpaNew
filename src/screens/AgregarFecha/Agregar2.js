import React, { useState } from 'react'
import { Alert, Animated, Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { colorFondo, formatDateShort, getBlob, getUserSub, meses, moradoClaro, moradoOscuro, msInHour, msInMinute, } from '../../../assets/constants'


import { Entypo, Feather, AntDesign, FontAwesome5 } from '@expo/vector-icons';

import HeaderConImagen from '../../components/HeaderConImagen';
import Boton from '../../components/Boton';
import ModalItinerario from './components/ModalItinerario';
import ModalRuta from '../FechasAventura/components/ModalRuta';
import QueLlevar from './components/QueLlevar';
import Incluido from './components/Incluido';
import { DataStore } from '@aws-amplify/datastore';
import { ChatRoomUsuario, Fecha, Notificacion, TipoNotificacion } from '../../models';

import { ChatRoom } from '../../models';
import { Usuario } from '../../models';

import uuid from 'react-native-uuid';
import Storage from '@aws-amplify/storage';

const { height } = Dimensions.get("screen")

export default function ({ navigation, route }) {
    const {
        fechaInicial,
        fechaFinal,

        puntoReunionNombre: ubicacionNombre,
        puntoReunionLink: ubicacionLink,

        tituloAventura,

        incluidoDefault,
        materialDefault
    } = route.params

    const scrollY = React.useRef(new Animated.Value(0)).current

    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState("");

    const [incluido, setIncluido] = useState({
        default: incluidoDefault,
        agregado: []
    })

    const formatDateShortLogistica = (msInicial, msFinal) => {
        const dateInicial = new Date(msInicial)

        var ddInicial = String(dateInicial.getUTCDate())
        var mmInicial = String(dateInicial.getUTCMonth())

        if (msFinal) {
            const dateFinal = new Date(msFinal)

            var ddFinal = String(dateFinal.getUTCDate())
            var mmFinal = String(dateFinal.getUTCMonth())

            // Si es de un solo dia se regresa un numero
            if (ddFinal === ddInicial && mmInicial === mmFinal) {
                return ("Logistica " + ddInicial + " " + meses[mmInicial]);

            }

            // Si los meses son iguales se pone sin 2 veces un mes
            if (mmInicial === mmInicial) {
                return ("Logistica " + ddInicial + " - " + ddFinal + " " + meses[mmInicial]);

            } else {
                return (ddInicial + " " + meses[mmInicial] + " - " + ddFinal + " " + meses[mmFinal]);

            }

        } else {
            return (ddInicial + " " + meses[mmInicial]);
        }


    }



    const [queLlevar, setQueLlevar] = useState(JSON.parse(materialDefault));


    const [buttonLoading, setButtonLoading] = useState(false);
    const [modificarQueLlevar, setModificarQueLlevar] = useState(false);
    const [modificarIncluido, setModificarIncluido] = useState(false);


    const [imagenRuta, setImagenRuta] = useState("");

    // Itinerario
    const [itinerario, setItinerario] = useState([
        {
            titulo: "Punto de reunion en " + ubicacionNombre,
            hora: (fechaInicial),
            ubicacionLink,
            ubicacionNombre,

            modifiable: false,
            tipo: "inicio"
        },
        {
            titulo: "Aventura en " + tituloAventura,
            hora: (fechaInicial + msInMinute),
        },
        {
            titulo: "Punto de reunion en " + ubicacionNombre,
            hora: fechaFinal,

            ubicacionLink,
            ubicacionNombre,


            modifiable: false,
            tipo: "fin"
        },
    ]);

    const handleVerItinerario = () => {
        if (!fechaInicial) {
            Alert.alert("Error", "No hay fecha")
            return
        }

        setTipoModal("itinerario")
        setModalVisible(true)
    }

    const handleAgregarRuta = () => {
        setTipoModal("ruta")
        setModalVisible(true)
    }

    const handleContinuar = async () => {
        const {
            personasTotales,
            fechaInicial,
            fechaFinal,
            precio,

            puntoReunionNombre,
            puntoReunionId,
            puntoReunionLink,
            puntoReunionCoords,

            allowTercera,
            allowNinos,

            titulo,
            descripcion,

            aventuraID,
            comision,
            imagenFondo
        } = route.params



        setButtonLoading(true)
        const sub = await getUserSub()
        let imagenRutaKey

        if (imagenRuta) {
            // Subir la imagen de la ruta a S3
            const key = "fecha-imagenRuta " + uuid.v4() + ".jpg"
            const blobImagenRuta = await getBlob(imagenRuta)


            await Storage.put(key, blobImagenRuta).then(r => {
                imagenRutaKey = r.key
            })

        }

        const fecha = {
            personasTotales,

            fechaInicial,
            fechaFinal,

            precio,
            comision,

            itinerario: JSON.stringify(itinerario),

            puntoReunionNombre,
            puntoReunionId,
            puntoReunionLink,
            puntoReunionCoords,

            allowTercera,
            allowNinos,
            material: JSON.stringify(queLlevar),
            incluido: JSON.stringify(incluido),
            aventuraID,

            usuarioID: sub,

            titulo,
            descripcion,
            imagenRuta: imagenRutaKey ? imagenRutaKey : null,
        }


        // Subir todos los datos a la database 
        DataStore.save(
            new Fecha(fecha)
        )
            .then(async fecha => {
                // Crear chatRoom
                const chatroom = await DataStore.save(new ChatRoom({
                    name: (tituloAventura + " " + formatDateShort(fechaInicial, fechaFinal)),
                    newMessages: 0,
                    picture: imagenFondo,
                    fechaID: fecha.id,
                }))

                // Obtener usuario del guia
                const usuario = await DataStore.query(Usuario, sub)

                // Agregar guia al chat
                await DataStore.save(new ChatRoomUsuario({
                    chatroom,
                    usuario
                }))

                // Crear notificacion
                DataStore.save(new Notificacion({
                    tipo: TipoNotificacion.FECHACREADA,

                    titulo: "Fecha creada",
                    descripcion: "Creaste una fecha en " + tituloAventura + " para el " + formatDateShort(fechaInicial, fechaFinal),

                    usuarioID: sub,
                    imagen: imagenFondo,

                    fechaID: fecha.id,
                }))
                // Navegar a exitoso
                setButtonLoading(false)
                navigation.navigate("ExitoScreen", {
                    txtExito: "Fecha agregada con exito!!"
                })
            })
            .catch(e => {
                Alert.alert("Error", "Error agregando la fecha")
                console.log(e)
            })
    }

    return (
        <View style={styles.container}>


            {/* Fechas */}
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}

                showsVerticalScrollIndicator={false}
                style={{
                    padding: 20,
                    flex: 1,

                }}>

                <View style={{ height: height * 0.24 }} />

                {/* Material incluido */}
                <View style={[styles.item, styles.queLlevar]}>
                    <Pressable
                        style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={styles.captionTxt}>Incluido</Text>
                        {
                            modificarIncluido ?
                                <Feather
                                    onPress={() => setModificarIncluido(!modificarIncluido)}
                                    style={styles.modificar}
                                    name="check"
                                    size={24}
                                    color="green"
                                />
                                :
                                <Feather
                                    onPress={() => setModificarIncluido(!modificarIncluido)}
                                    style={styles.modificar}
                                    name="edit"
                                    size={24}
                                    color="black"
                                />
                        }
                    </Pressable>

                    <View style={styles.linea} />

                    <Incluido
                        datos={incluido}
                        modify={modificarIncluido}
                        setDatos={setIncluido}
                    />

                </View>

                <View style={[styles.item, styles.queLlevar]}>

                    <Pressable
                        style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={styles.captionTxt}>Material a llevar</Text>
                        {
                            modificarQueLlevar ?
                                <Feather
                                    onPress={() => setModificarQueLlevar(!modificarQueLlevar)}
                                    style={styles.modificar}
                                    onPress={() => setModificarQueLlevar(!modificarQueLlevar)}
                                    name="check"
                                    size={24}
                                    color="green"
                                />
                                :
                                <Feather
                                    onPress={() => setModificarQueLlevar(!modificarQueLlevar)}
                                    style={styles.modificar}
                                    name="edit"
                                    size={24}
                                    color="black"
                                />
                        }
                    </Pressable>

                    <View style={styles.linea} />

                    <QueLlevar
                        datos={queLlevar}
                        modify={modificarQueLlevar}
                        setDatos={setQueLlevar}
                    />

                </View>


                {/* Agregar itinerario */}
                <Pressable
                    onPress={handleVerItinerario}
                    style={styles.row}>
                    <View style={styles.agregar}>
                        <FontAwesome5 style={styles.icono} name="tasks" size={16} color="white" />

                        <Text style={styles.tituloAgregar}>Ver itinerario</Text>
                        <Entypo name="plus" size={30} color={"transparent"} />
                    </View>

                </Pressable>


                {/* Agregar imagen ruta */}
                <Pressable
                    onPress={handleAgregarRuta}
                    style={styles.agregar}>
                    <View style={styles.icono}>
                        <Image
                            source={require("../../../assets/icons/distance.png")}
                            style={{
                                width: 16,
                                height: 16,
                                tintColor: "white"
                            }} />

                    </View>

                    <Text style={styles.tituloAgregar}>{imagenRuta ? "Ver imagen ruta" : "Agregar imagen ruta"}</Text>
                    <Entypo name={"plus"} size={30} color={imagenRuta ? "transparent" : moradoOscuro} />
                </Pressable>

                <Boton
                    style={{
                        marginBottom: 40,
                    }}
                    titulo={"Continuar"}
                    onPress={handleContinuar}
                    loading={false}
                />

            </Animated.ScrollView >

            <HeaderConImagen
                titulo={`${formatDateShortLogistica(fechaInicial, fechaFinal)}`}
                imagen={require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                scrollY={scrollY}
                maxHeight={height * 0.24}
            />

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                {tipoModal === "itinerario" ?
                    <ModalItinerario
                        editAllowed={true}
                        setModalVisible={setModalVisible}

                        fechaInicial={new Date(fechaInicial)}
                        fechaFinal={fechaFinal ? new Date(fechaFinal) : new Date(fechaInicial)}

                        itinerario={itinerario}
                        setItinerario={setItinerario}

                    /> :
                    <ModalRuta
                        modify={true}
                        setModalVisible={setModalVisible}
                        img={imagenRuta}
                        setImg={setImagenRuta}
                    />}
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorFondo,
    },

    fecha: {
        height: 3000,
    },

    captionTxt: {
        fontSize: 18,
        marginBottom: 15,
        fontWeight: 'bold',
        color: moradoClaro,

    },

    queLlevar: {
        // flex: 1,
        backgroundColor: '#fff',
        padding: 20,

    },

    item: {
        marginBottom: 25,
    },

    question: {
        marginHorizontal: 10,

        backgroundColor: moradoClaro + "99",
        borderRadius: 100,

        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    questionTxt: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "white",

    },

    infoPrice: {
        fontSize: 12,
        color: '#444',
    },

    agregar: {
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    contenedorSelector: {
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'flex-end',
        flex: 1,
    },

    tituloAgregar: {
        fontSize: 15,
        flex: 1,
        textAlign: 'center',
        color: moradoOscuro,
    },

    icono: {
        // ...shadowMedia,
        backgroundColor: moradoOscuro,
        padding: 10,
        borderRadius: 100,
        alignItems: 'center', justifyContent: 'center',
    },

    linea: {
        borderBottomWidth: 0.5,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center',
    },

    puntoDeReunion: {
        padding: 10,
        backgroundColor: '#fff',
    },

    txtLocation: {
        color: moradoOscuro,
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
        marginLeft: 10,
    },

    modificar: {

        marginBottom: 10,
    }
})
