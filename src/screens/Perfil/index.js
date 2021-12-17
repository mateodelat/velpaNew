import React, { useEffect, useState } from 'react'
import {
    Alert,
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native'
import {
    colorFondo,
    moradoClaro,
    shadowMedia,
    moradoOscuro,
    getImageUrl,
    msInDay,
    calculateLvl
} from '../../../assets/constants'

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


import ExperienciasGuia from './components/ExperienciasGuia';
import { DataStore } from 'aws-amplify';
import { Usuario } from '../../models';

import { Rating, } from 'react-native-ratings';
import { Fecha } from '../../models';
import InfoNivelesModal from '../../components/InfoNivelesModal';
import { Aventura } from '../../models';
import { Comentario } from '../../models';
import { Loading } from '../../components/Loading';
import CommentItem from './components/CommentItem';
import ModalComentarios from './components/ModalComentarios';




const imageSize = 110
const { height } = Dimensions.get("screen")



export default ({ navigation, route }) => {

    const {
        isOwner,
        id
    } = route.params


    const [user, setUser] = useState(route.params.user);
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState();

    const [comentarios, setComentarios] = useState(null);

    const [showExperiencias, setShowExperiencias] = useState(false);
    const [experiencias, setExperiencias] = useState(null);

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setDataUsr()
            .then(() => {
                fetchComments()
            })
    }, []);

    function handleGoBack() {
        navigation.pop()
    }

    async function fetchComments() {
        DataStore.query(Comentario, c => c.usuarioCalificadoID("eq", id ? id : user.id), {
            sort: r => r.createdAt("DESCENDING")
        })

            .then(async c => {
                if (c.length === 0) {
                    setComentarios([])
                    return
                }
                let i = c.length - 1;

                const randomNumber = () => Math.floor(Math.random() * i)

                let rand1 = randomNumber()
                let rand2 = randomNumber()
                let rand3 = randomNumber()

                // Comprobar que los index random no sean ya tomados
                while (rand2 === rand1) {
                    rand2 = randomNumber()
                }

                while (rand3 === rand2 || rand3 === rand1) {
                    rand3 = randomNumber()
                }

                c = await Promise.all(c.map(async (e, idx) => {
                    return {
                        ...e,
                        show: idx === rand1 || idx === rand2 || idx === rand3 ? true : false,

                        // Obtener el usuario de cada comentario
                        owner: await DataStore.query(Usuario, e.creatorID).then(async r => ({
                            ...r,
                            foto: await getImageUrl(r.foto)
                        }))
                    }
                }))


                setComentarios(c)
            })

    }

    async function setDataUsr() {
        try {
            if (!user) {
                DataStore.query(Usuario, id)
                    .then(async r => {
                        const fechasUsuario = await DataStore.query(Fecha, f => f.usuarioID("eq", r.id))


                        setUser({
                            ...r,
                            foto: await getImageUrl(r.foto),
                            fechas: fechasUsuario

                        })

                        fetchAventurasGuia(fechasUsuario)

                    })

            } else {
                const fechasUsuario = await DataStore.query(Fecha,
                    f => f.usuarioID("eq", user.id)
                )

                setUser({
                    ...user,
                    foto: await getImageUrl(user.foto),
                    fechas: fechasUsuario
                })

                fetchAventurasGuia(fechasUsuario)
            }
        } catch (e) {
            Alert.alert("Error obteniendo el usuario")
            console.log(e)
        }
    }

    function getDateFromNow(date) {
        if (!date) return null
        const fecha = new Date(date)
        const msFromNow = new Date - fecha

        const monthsFromNow = Math.floor(msFromNow / (msInDay * 30))
        const daysFromNow = Math.floor(msFromNow / (msInDay))

        if (monthsFromNow > 0) {
            return monthsFromNow + " MES" + (monthsFromNow !== 1 ? "ES" : "")
        }
        else if (daysFromNow > 0) {
            return daysFromNow + " DIA" + (monthsFromNow !== 1 ? "S" : "")

        }
        else {
            return "1 DIA"
        }

    }

    function showInfoLevel() {
        setTipoModal("infoLevel")
        setModalVisible(true)
    }


    const antiguedad = getDateFromNow(user?.createdAt)

    async function fetchAventurasGuia(fechas) {
        let listaAventuras = []
        fechas.map(e => {
            // Si no esta en la lista aventuras se agrega el id
            if (!listaAventuras.find(a => a === e.aventuraID)) {
                listaAventuras.push(e.aventuraID)
            }
        })

        // Obtener las aventuras madre
        listaAventuras = await Promise.all(listaAventuras.map(async e => {
            return await DataStore.query(Aventura, e)
                .then(async r => {
                    return {
                        id: r.id,
                        titulo: r.titulo,
                        imagenFondo: {
                            uri: await getImageUrl(r.imagenDetalle[r.imagenFondoIdx]),
                            key: r.imagenDetalle[r.imagenFondoIdx]
                        },


                        // Ligar las fechas con su aventura
                        fechas: fechas
                            .filter(f => f.aventuraID === r.id)
                            .sort((a, b) => a.fechaInicial > b.fechaInicial)
                    }
                })
        }))

        setExperiencias(listaAventuras)
    }

    function handleOpenComments() {
        setTipoModal("comentarios")
        setModalVisible(true)

    }

    function handleSaveProfile() {
        setEditing(!editing)
        console.log("Save")

    }

    if (!user) {
        return <View />
    }

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Image
                source={user?.imagenFondo ? user?.imagenFondo : require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                style={styles.imagenFondo}
                blurRadius={10}
            />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.backIcon}>
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={40}
                        color={moradoClaro}
                        onPress={handleGoBack} />

                </View>

                {/* {
                    isOwner &&
                    <Pressable
                        onPress={() => editing ? handleSaveProfile() : setEditing(!editing)}
                        style={styles.backIcon}>
                        {editing ?
                            <Feather
                                name="check"
                                size={30}
                                color={"green"}
                            />

                            :
                            <Feather
                                name="edit-2"
                                size={25}
                                color={moradoClaro}
                            />
                        }

                    </Pressable>
                } */}
            </View>




            <View style={{
                height: (height * 0.24) - (imageSize / 2 + 10),

            }} />

            {/* Cuerpo */}
            <View style={styles.body}>


                <View style={styles.innerContainer}>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                    }}>
                        {/* Foto de perfil */}
                        {user?.foto ? <Image
                            source={{ uri: user.foto }}
                            style={styles.image} />
                            : <Feather
                                style={{
                                    backgroundColor: "#f4f4f4",

                                    ...styles.image,
                                }}
                                name="user"
                                size={imageSize}
                                color="black"
                            />}
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.nombre}>{user?.nombreAgencia ? user.nombreAgencia : (user?.nombre + " " + user?.apellido)}</Text>
                            <Text numberOfLines={1} style={styles.nickname}>{user?.nickname && ("@" + user.nickname)}</Text>

                            {/* Calificaciones */}
                            <View style={styles.calificacionesCont}>
                                <Rating
                                    readonly
                                    ratingCount={5}
                                    startingValue={user?.calificacion}
                                    fractions
                                    imageSize={22}
                                    type='custom'

                                    ratingColor="#F5BE18"
                                />


                                <Text style={{
                                    marginLeft: 5,
                                }}>({user?.numResenas ? user.numResenas : 0})</Text>


                            </View>

                        </View>

                    </View>

                    {/* Antiguedad, numero de aventuras, */}
                    <View style={styles.cuadrosContainer}>
                        <Pressable
                            style={styles.cuadro}>
                            <Text style={styles.titleCuadro}>{user?.fechas?.length}</Text>
                            <Text style={styles.descCuadro}>EXPERIENCIAS COMO GUIA</Text>
                        </Pressable>
                        <View style={styles.cuadro}>
                            <Text style={styles.titleCuadro}>{antiguedad}</Text>
                            <Text style={styles.descCuadro}>ANTIGUEDAD{"\n"}</Text>
                        </View>
                        <Pressable
                            onPress={isOwner ? showInfoLevel : null}
                            style={styles.cuadro}>
                            <Text style={styles.titleCuadro}>{calculateLvl(user?.experience)}</Text>
                            {isOwner && <View style={styles.question}>
                                <Text style={styles.questionTxt}>?</Text>
                            </View>}


                            <Text style={styles.descCuadro}>NIVEL{"\n"}</Text>
                        </Pressable>
                    </View>

                </View>


                {/* Comentarios del perfil */}
                {comentarios?.length !== 0 && <Pressable
                    onPress={handleOpenComments}

                    style={styles.innerContainer}>
                    < View
                        style={styles.item}>
                        <View style={{
                            flexDirection: 'row',

                            alignItems: 'center',
                            marginBottom: 15,
                        }}>
                            <Text style={{ ...styles.title, marginLeft: 0, }}>Reseñas {comentarios?.length ? ("(" + comentarios?.length + ")") : ""}</Text>

                            {comentarios?.length > 3 && <Text
                                style={{
                                    ...styles.title,
                                    textAlign: 'right',
                                    fontWeight: 'normal',
                                }}>Ver todo</Text>}
                        </View>


                        {/* Mostrar los 3 comentarios mas utiles */}
                        {
                            !comentarios ?
                                <Loading indicator />
                                :
                                comentarios?.map((e, index) => {
                                    // Si el index no coincide con uno de los 3 index random no se muestra
                                    if (e.show) return <CommentItem
                                        key={index}
                                        content={e}
                                    />

                                })
                        }

                    </View>
                </Pressable>}


                {/* Experiencias del guia */}
                {experiencias?.length !== 0 && <View style={styles.innerContainer}>
                    <Pressable
                        onPress={() => setShowExperiencias(!showExperiencias)}
                        style={styles.item}>
                        <View style={{
                            flexDirection: 'row',

                            alignItems: 'center',
                        }}>

                            <Image
                                source={require("../../../assets/icons/guia.png")}
                                style={{
                                    height: 30,
                                    width: 30,
                                    tintColor: moradoClaro
                                }}
                            />

                            <Text style={styles.title}>Experiencias</Text>

                            <MaterialIcons
                                name={"keyboard-arrow-" + (showExperiencias ? "up" : "down")}
                                size={30}
                                color={moradoClaro}
                            />
                        </View>

                        {showExperiencias && <View style={{ marginTop: 20, }}>

                            <ExperienciasGuia
                                experiencias={experiencias}
                            />
                        </View>}

                    </Pressable>
                </View>}


            </View>

            {
                tipoModal === "comentarios" ?
                    <ModalComentarios
                        user={user}
                        comments={comentarios}
                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}
                    />
                    :
                    <InfoNivelesModal
                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}
                    />
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorFondo,
        flex: 1,
    },

    header: {
        width: '100%',
        padding: 10,
        position: 'absolute',
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'space-between',
    },

    body: {
        paddingHorizontal: 15,
    },

    backIcon: {
        // padding: 5,
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imagenFondo: {
        position: 'absolute',
        width: '100%',
        height: height * 0.24,

    },


    innerContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        // ...shadowMedia,
        marginBottom: 15,
    },

    image: {
        width: imageSize,
        height: imageSize,

        borderRadius: 10,

    },

    headerTextContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
    },

    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    nickname: {
        color: '#999',
    },

    calificacionesCont: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',

    },

    title: {
        color: moradoClaro,
        fontWeight: 'bold',
        fontSize: 18,

        marginLeft: 10,
        flex: 1,
    },

    cuadrosContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,

        borderTopColor: moradoClaro,
        borderTopWidth: .5,
    },

    cuadro: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    titleCuadro: {
        color: moradoClaro,
        fontSize: 20,
        fontWeight: 'bold',
    },

    descCuadro: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
    },

    question: {
        position: 'absolute',
        right: 15,
        top: -5,

        backgroundColor: moradoClaro + "99",
        borderRadius: 100,

        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },

    questionTxt: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "white",

    },

    item: {
        padding: 10,
        paddingVertical: 5,
        justifyContent: 'center',
    },

})


