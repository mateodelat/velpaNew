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
    Modal,
    TextInput,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import {
    colorFondo,
    moradoClaro,
    moradoOscuro,
    getImageUrl,
    msInDay,
    calculateLvl,
    getBlob,
    getUserSub
} from '../../../assets/constants'



import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


import ExperienciasGuia from './components/ExperienciasGuia';
import { DataStore, Storage, StorageClass } from 'aws-amplify';
import { Usuario } from '../../models';

import { Rating, } from 'react-native-ratings';
import { Fecha } from '../../models';
import InfoNivelesModal from '../../components/InfoNivelesModal';
import { Aventura } from '../../models';
import { Comentario } from '../../models';
import { Loading } from '../../components/Loading';
import CommentItem from './components/CommentItem';
import ModalComentarios from './components/ModalComentarios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ModalTipoImagen from '../../components/ModalTipoImagen';
import ImageFullScreen from '../../components/ImageFullScreen';




const imageSize = 110
const { height } = Dimensions.get("screen")



export default ({ route }) => {



    const {
        isOwner,
        id
    } = route.params

    const navigation = useNavigation()


    const [user, setUser] = useState(route.params.user);
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState();

    // Variable para cambiar la imagen de fondo si es el caso
    const [imageBackground, setImageBackground] = useState(false);

    // Imagenes a visualizar
    const [imagenVisor, setImagenVisor] = useState([{ url: "" }]);

    const [comentarios, setComentarios] = useState(null);

    const [showExperiencias, setShowExperiencias] = useState(false);
    const [experiencias, setExperiencias] = useState(null);


    // Variables de cuando se esta editando
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [nickname, setNickname] = useState("");

    const [editing, setEditing] = useState(false);

    // Para cuando se esta subiendo los datos (imagenes, texto, etc...)
    const [loading, setLoading] = useState(false);


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

                // Si hay menos de 3 comentarios se ponen todos

                const randomNumber = () => Math.floor(Math.random() * i)
                let rand1 = randomNumber()
                let rand2 = randomNumber()
                let rand3 = randomNumber()

                // Comprobar que los index random no sean ya tomados solo si hay mas de 3 comentarios
                while (rand2 === rand1 && i > 2) {
                    rand2 = randomNumber()
                }

                while ((rand3 === rand2 || rand3 === rand1) && i > 2) {
                    rand3 = randomNumber()
                }

                c = await Promise.all(c.map(async (e, idx) => {
                    return {
                        ...e,

                        // Si tenemos menos de 3 comentarios se muestran
                        show: e.body !== null ? (i <= 2 ? true : (idx === rand1 || idx === rand2 || idx === rand3) ? true : false) : false,

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
            if (!route.params?.user) {
                DataStore.query(Usuario, id)
                    .then(async r => {
                        const fechasUsuario = await DataStore.query(Fecha, f => f.usuarioID("eq", r.id))


                        setUser({
                            ...r,
                            foto: {
                                uri: await getImageUrl(r.foto),
                                key: r.foto,
                            },

                            imagenFondo: {
                                uri: await getImageUrl(r.imagenFondo),
                                key: r.imagenFondo
                            },

                            fechas: fechasUsuario

                        })

                        // Settear variables de editar usuario
                        setNombre(r.nombre)
                        setNickname(r.nickname)
                        setApellido(r.apellido)

                        fetchAventurasGuia(fechasUsuario)

                    })

            } else {
                const usr = route.params.user

                const fechasUsuario = await DataStore.query(Fecha,
                    f => f.usuarioID("eq", usr.id)
                )

                setNombre(usr.nombre)
                setNickname(usr.nickname)
                setApellido(usr.apellido)


                setUser({
                    ...usr,
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

    async function handleSaveProfile() {

        try {

            setLoading(true)
            const {
                imagenFondo,
                foto,
            } = user

            // Bandera para ver si se cambio algo
            let changed = false

            let imagenFondoKey = user.imagenFondo.key
            let fotoKey = user.foto.key

            if (nickname !== user.nickname || nombre !== user.nombre || apellido !== user.apellido) {
                changed = true
                console.log("cambiar texto en datastore")
            }

            // Checar si cambio la imagen de fondo
            if (imagenFondo.modified) {
                changed = true

                // Subir imagen de fondo a S3 solo si no fue link
                if (!user.imagenFondo.link) {
                    const blob = await getBlob(user.imagenFondo?.uri)
                    imagenFondoKey = "usr-" + user.id + "imagenFondo.jpg"

                    await Storage.put(imagenFondoKey, blob)
                    console.log(imagenFondoKey)

                } else {
                    // Solo actualizar el link de la foto
                    imagenFondoKey = user.imagenFondo.uri
                }

            }
            // Checar si cambio la foto de perfil
            if (foto.modified) {
                changed = true

                // Subir foto a S3 solo si no fue link
                if (!user.foto.link) {
                    const blob = await getBlob(user.foto?.uri)
                    fotoKey = "usr-" + user.id + "foto.jpg"

                    console.log(fotoKey)
                    await Storage.put(fotoKey, blob)


                } else {
                    // Solo actualizar el link de la foto
                    fotoKey = user.foto.uri
                }

            }


            if (changed) {
                // Settear nombre apellido y nickname
                setUser({
                    ...user,
                    nombre,
                    apellido,
                    nickname,
                    foto: {
                        ...user.foto,
                        modified: false,
                        key: fotoKey,

                    },
                    imagenFondo: {
                        ...user.imagenFondo,

                        // Actualizar la key si se hizo algo
                        modified: false,
                        key: imagenFondoKey,

                    }


                })

                const u = await DataStore.query(Usuario, user.id)
                await DataStore.save(Usuario.copyOf(u, e => {
                    e.foto = fotoKey
                    e.imagenFondo = imagenFondoKey
                    e.nombre = nombre
                    e.apellido = apellido
                    e.nickname = nickname
                }))
                    .then(console.log)

                setLoading(false)

            }

            setLoading(false)
            setEditing(!editing)
            console.log({
                foto: user.foto,
                imagenFondo: user.imagenFondo
            })

        } catch (error) {
            Alert.alert("Error", "Error guardando el perfil en la nube")
            setLoading(false)
            console.log(error)
        }

    }

    function handleChangePic(profileImage) {
        setImageBackground(!profileImage)
        setModalVisible(true)
        setTipoModal("imagePicker")
    }

    function handleImageSelected(img) {
        // Si es imagen de fondo se cambia la imagen de fondo del usuario
        if (imageBackground) {
            setUser({
                ...user,
                imagenFondo: {
                    uri: img.uri,
                    key: user.imagenFondo.key,

                    // Ver si fue un link
                    link: !!img.link,
                    modified: true,
                },
            })

        } else {
            setUser({
                ...user,
                foto: {
                    uri: img.uri,
                    key: user.foto.key,

                    // Ver si fue un link
                    link: !!img.link,
                    modified: true,
                },
            })

        }

        setModalVisible(false)

    }

    function openImage(img, require) {
        setModalVisible(true)
        setTipoModal("imageViewer")

        // Si es una imagen local
        if (!!require) {
            setImagenVisor([{
                url: "",
                props: {
                    source: require
                }

            }])

        } else {
            setImagenVisor([{
                url: img
            }])

        }

    }

    if (!user) {
        return <View />
    }

    const insets = useSafeAreaInsets()

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Image
                onError={() => { }}
                source={user?.imagenFondo?.uri ? { uri: user?.imagenFondo?.uri } : require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                style={{
                    ...styles.imagenFondo,
                    height: height * 0.24 + insets.top,

                }}
                blurRadius={7}
            />



            {/* Abrir imagen de fondo o cambiarla */}
            <Pressable
                onPress={editing ? () => handleChangePic(false) : () => openImage(user.imagenFondo.uri, user.imagenFondo.uri ? false : require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg"))}

                style={{
                    height: (height * 0.24) - (imageSize / 2 + 10) + insets.top,
                    alignItems: 'center', justifyContent: 'center',
                }} >
                {editing && <Pressable
                    onPress={() => handleChangePic(false)}

                    style={{
                        backgroundColor: moradoClaro,

                        padding: 15,
                        borderRadius: 100,

                    }}>

                    <Feather
                        name="camera"
                        size={25}
                        color={"#fff"}
                    />


                </Pressable>}

            </Pressable>

            {/* Cuerpo */}
            <View style={styles.body}>


                <View style={styles.innerContainer}>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        justifyContent: editing ? 'center' : "flex-start",
                    }}>
                        {/* Foto de perfil */}
                        <Pressable
                            onPress={editing ? handleChangePic : () => openImage(user.foto?.uri)}
                            style={{ marginBottom: 10, }}>
                            {user?.foto?.uri ? <Image
                                source={{ uri: user.foto.uri }}
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

                            {/* Editar imagen */}
                            {editing && <Pressable
                                onPress={handleChangePic}

                                style={styles.editCameraContainer}>

                                <Feather
                                    name="camera"
                                    size={17}
                                    color={"#fff"}
                                />


                            </Pressable>}

                        </Pressable>



                        {!editing && <View style={styles.headerTextContainer}>
                            <Text style={styles.nombre}>{user?.nombre + " " + (!!user.apellido ? user.apellido : "")}</Text>
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

                        </View>}

                    </View>
                    {/* Campos si se esta editando */}
                    {
                        editing && <View style={styles.inputContainer}>
                            {/* <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',

                            }}>Informacion</Text> */}

                            {/* Nombre */}
                            <Text style={styles.captionTxt}>Nombre</Text>
                            <TextInput
                                maxLength={30}
                                style={styles.textInput}
                                value={nombre}
                                onChangeText={setNombre}
                            />

                            {/* Apellido */}
                            <Text style={styles.captionTxt}>Apellido</Text>
                            <TextInput
                                maxLength={30}
                                style={styles.textInput}
                                value={apellido}
                                onChangeText={setApellido}
                            />


                            {/* Nickname */}
                            <Text style={styles.captionTxt}>Nickname</Text>
                            <TextInput
                                maxLength={30}
                                style={styles.textInput}
                                value={nickname}
                                onChangeText={setNickname}
                            />

                        </View>
                    }


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
                            <Text style={styles.titleCuadro}>{calculateLvl(user?.experience).lvl}</Text>
                            {isOwner && <View style={styles.question}>
                                <Text style={styles.questionTxt}>?</Text>
                            </View>}


                            <Text style={styles.descCuadro}>NIVEL{"\n"}</Text>
                        </Pressable>
                    </View>

                </View>


                {/* Comentarios del perfil */}
                {!editing && <View
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
                                onPress={handleOpenComments}

                                style={{
                                    ...styles.title,
                                    textAlign: 'right',
                                }}>Ver todo</Text>}
                        </View>


                        {/* Mostrar los 3 comentarios mas utiles */}
                        {
                            !comentarios ?
                                <Loading indicator />
                                :
                                comentarios.length !== 0 ?
                                    <Pressable onPress={handleOpenComments}>

                                        {comentarios.map((e, index) => {
                                            // Si el index no coincide con uno de los 3 index random no se muestra
                                            if (e.show) return <CommentItem
                                                key={index}
                                                content={e}
                                            />

                                        })
                                        }
                                    </Pressable>

                                    :
                                    <Text style={styles.NoHay}>No hay reseñas</Text>
                        }

                    </View>
                </View>}


                {/* Experiencias del guia */}
                {!editing && <Pressable
                    onPress={() => setShowExperiencias(!showExperiencias)}
                    style={styles.innerContainer}>
                    <View
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

                        {showExperiencias &&
                            (
                                experiencias.length !== 0 ?
                                    <View style={{ marginTop: 20, }}>

                                        <ExperienciasGuia
                                            experiencias={experiencias}
                                        />
                                    </View> :
                                    <Text style={[styles.NoHay, { marginTop: 20, }]}>No hay experiencias</Text>
                            )
                        }

                    </View>
                </Pressable>}


            </View>

            {


                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    {
                        tipoModal === "comentarios" ?
                            <ModalComentarios
                                user={user}
                                comments={comentarios}
                                setModalVisible={setModalVisible}
                            />
                            :
                            tipoModal === "imageViewer" ?
                                <ImageFullScreen
                                    images={imagenVisor}
                                    setModalVisible={setModalVisible}
                                />
                                :
                                tipoModal === "imagePicker" ?

                                    <ModalTipoImagen
                                        setImage={handleImageSelected}
                                        setModalVisible={setModalVisible}

                                        cameraEnabled
                                        aspectRatio={!imageBackground ? [1, 1] : false}
                                        quality={imageBackground ? 0.2 : 0.4}
                                    />
                                    :
                                    <InfoNivelesModal
                                        userExp={user?.experience}

                                        setModalVisible={setModalVisible}
                                        modalVisible={modalVisible}
                                    />
                    }

                </Modal>

            }
            {/* Header */}
            <View style={{
                ...styles.header,
                paddingTop: insets.top ? insets.top : 10

            }}>
                <Pressable
                    onPress={handleGoBack}
                    style={styles.backIcon}>
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={40}
                        color={moradoClaro}
                    />

                </Pressable>

                {
                    isOwner &&
                    <Pressable
                        onPress={loading ? null : () => editing ? handleSaveProfile() : setEditing(!editing)}
                        style={styles.backIcon}>
                        {
                            loading ?
                                <ActivityIndicator
                                    color={moradoClaro}
                                    size={'small'}
                                />
                                :
                                editing ?
                                    <Feather
                                        name="check"
                                        size={30}
                                        color={moradoClaro}
                                    />

                                    :
                                    <Feather
                                        name="edit-2"
                                        size={25}
                                        color={moradoClaro}
                                    />
                        }

                    </Pressable>
                }
            </View>


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
        elevation: 1
    },

    imagenFondo: {
        position: 'absolute',
        width: '100%',

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

    captionTxt: {
        fontSize: 15,
        marginBottom: 5,
        marginLeft: 5,
        marginTop: 10,
        color: '#999',

    },
    textInput: {
        // flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 5,
        paddingHorizontal: 10,
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
    NoHay: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 5,
        color: moradoOscuro,
    },

    editCameraContainer: {
        position: 'absolute',
        backgroundColor: moradoClaro,

        padding: 8,
        borderRadius: 100,
        right: -8,
        bottom: -8,
    },

    inputContainer: {
        paddingHorizontal: 10,

        marginVertical: 20,
    }


})


