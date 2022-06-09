import React, { useEffect, useRef, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Modal,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native'


import { AsyncAlert, calculateComision, calculateExpPerPerson, colorFondo, formatAMPM, formatDateShort, formatMoney, getImageUrl, mayusFirstLetter, moradoClaro, moradoOscuro, msInDay, } from '../../../assets/constants';
import HeaderDetalleAventura from '../../navigation/components/HeaderDetalleAventura';

import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Line from '../../components/Line';

import { DataStore, OpType } from '@aws-amplify/datastore';
import { ChatRoom, TipoNotificacion, Usuario } from '../../models';

import { Reserva } from '../../models';
import ModalItinerario from '../AgregarFecha/components/ModalItinerario';
import { Loading } from '../../components/Loading';
import MapView, { Marker } from 'react-native-maps';

import { Fecha } from '../../models';
import DetalleReserva from './DetalleReserva';

import QRScan from '../QRScan';
import Calendario, { calculateMarkedDays } from './components/Calendario';
import HourEditor from './components/HourEditor';

import InfoNivelesModal from '../../components/InfoNivelesModal';
import CurrencyInput from 'react-native-currency-input';
import { ModalMap as ModalMapEdit } from '../Admin/EditarAventura/components/ModalMap';
import ModalMap from '../../components/ModalMap';
import { Notificacion } from '../../models';

import { cancelScheduledNotificationAsync, getAllScheduledNotificationsAsync } from 'expo-notifications';
import { notificacionesRecordatorio, sendNotification } from '../../../assets/constants/constant';
import QueLlevar from '../AgregarFecha/components/QueLlevar';
import Incluido from '../AgregarFecha/components/Incluido';



let { width, height } = Dimensions.get("screen")
const editColor = "#f9f9f9"



export default ({ navigation, route }) => {
    //HACER DISTANCIA Y ALTITUD DEPENDIENTE DE SI EXISTE EN LA DB PARA TENER
    //DISTINTAS CATEGORIAS


    const { fecha: fechaGotten, fechaID } =
        route.params


    // Fecha original para comparaciones de cambio al final
    const [originalDate, setOriginalDate] = useState(null);

    // Fecha que se modifica
    const [fecha, setFecha] = useState(null);

    // Tipo modal
    const [tipoModal, setTipoModal] = useState("reserva");
    const [modalVisible, setModalVisible] = useState(false);

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    // Variables para animaciones (Carrousel fotos y header transparencia)
    const scrollY = useRef(new Animated.Value(0)).current


    // Reserva seleccionada
    const [actualReservation, setActualReservation] = useState({});

    // Dias seleccionados
    const [markedDays, setMarkedDays] = useState({});
    const [guiaFecha, setGuiaFecha] = useState(null);


    // Datos del que llevar y material incluido
    const [modificarIncluido, setModificarIncluido] = useState(false);
    const [modificarQueLlevar, setModificarQueLlevar] = useState(false);



    const mapRef = useRef()




    // Detectar si se manda directamente la fecha de la ruta, si no obtenerla
    useEffect(() => {
        let subscription


        if (fechaGotten) {
            getGuia(fechaGotten.usuarioID)
            setFecha(fechaGotten)
            setOriginalDate(fechaGotten)

        } else {
            getFecha()
        }

        // Suscribirse a reservas en la fecha
        subscription = DataStore.observe(Reserva, res => {
            res.fechaID("eq", fechaID ? fechaID : fechaGotten.id)
        })
            .subscribe((msg) => {

                // Si se inserta una nueva reserva
                if (msg.opType === OpType.INSERT) {
                    Alert.alert("Nueva reserva en la fecha")

                }
            })

        return () => subscription?.unsubscribe()
    }, []);




    async function getGuia(sub) {
        // Funcion para obtener el guia dueño de la fecha y poder

        setGuiaFecha(await DataStore.query(Usuario, sub))


    }

    async function getFecha() {
        if (!fechaID) return


        const fecha = await DataStore.query(Fecha, fechaID)
        getGuia(fecha.usuarioID)


        const now = new Date()
        const reservas = await DataStore.query(Reserva, res => res
            .fechaID("eq", fechaID)
            .cancelado("ne", true)
        )
        let personasReservadas = []

        await Promise.all(reservas.map(async res => {
            const totalPersonas = res.adultos + res.ninos + res.tercera
            const usuario = await DataStore.query(Usuario, res.usuarioID)
            personasReservadas.push({
                ...res,
                foto: await getImageUrl(usuario.foto),
                nickname: usuario.nickname,
                personasReservadas: totalPersonas,
                precioPagado: res.pagadoAlGuia,
            })
        }))

        let personasReservadasNum = 0
        let precioAcomulado = 0
        let precioAcomuladoSinComision = 0
        reservas.map(e => {
            precioAcomulado += e.total
            precioAcomuladoSinComision += e.pagadoAlGuia
            personasReservadasNum += (e.adultos + e.ninos + e.tercera)
        })



        const f = {
            // Obtener reservas y personas reservadas en la fecha
            ...fecha,
            reservas,
            personasReservadas,

            personasReservadasNum,
            precioAcomulado,
            precioAcomuladoSinComision,

            // imagenFondo: await getImageUrl(fecha.imagenFondo),
            material: JSON.parse(fecha.material),
            incluido: {
                incluido: JSON.parse(fecha.incluido)?.incluido,
                agregado: (JSON.parse(fecha.incluido))?.agregado
            },
            pasada: fecha.fechaInicial < now

        }
        setOriginalDate(f)
        setFecha(f)

    }


    if (!fecha) {
        return <Loading />
    }


    // Estado del material a llevar ya empacado
    const itinerario = JSON.parse(fecha.itinerario)

    const inicioItinerario = itinerario[0]
    const medioItinerario = itinerario.length === 3 ? itinerario[1] : false
    const finItinerario = itinerario[itinerario.length - 1]


    const selectedPlace = {
        titulo: fecha.puntoReunionNombre,
        ubicacionNombre: fecha.puntoReunionNombre,
        ...JSON.parse(fecha.puntoReunionCoords)

    }

    const region = {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        latitudeDelta: 2,
        longitudeDelta: 2,
    }


    async function navigateChat() {
        const chat = (await DataStore.query(ChatRoom, e => e.fechaID("eq", fecha.id)))[0]
        navigation.navigate("ChatRoom", { id: chat.id, titulo: chat.name, image: chat.picture })

    }

    function clearData() {
        let {
            fechaInicial,
            fechaFinal,
            puntoReunionCoords
        } = originalDate

        puntoReunionCoords = JSON.parse(puntoReunionCoords)
        const region = {
            latitude: puntoReunionCoords.latitude,
            longitude: puntoReunionCoords.longitude,
            latitudeDelta: 2,
            longitudeDelta: 2,
        }


        mapRef?.current.animateToRegion(region)

        setModificarIncluido(false)
        setModificarQueLlevar(false)

        setMarkedDays(calculateMarkedDays(fechaInicial, fechaFinal, true))
        setFecha(originalDate)

    }

    function handleOpenItinerario() {
        setModalVisible(true)
        setTipoModal("itinerario")

    }

    function handleQR() {
        if (fecha.personasReservadas.length !== 0) {
            setModalVisible(true)
            setTipoModal("escaner")

        } else {
            Alert.alert("Erorr", "No tienes personas reservadas en la fecha")
        }
    }

    function handleOpenReservacion(r) {
        setModalVisible(true)
        setTipoModal("reserva")
        setActualReservation(r)
    }

    async function cancelarFecha() {
        Alert.alert("Cancelar fecha", "Cancelar una fecha tiene un costo de 20 pesos mas 10 por persona ya reservada ademas de una calificacion por parte de los usuarios reservados")

    }




    async function codigoEscaneado(scanedID) {

        // Encontrar los ids de reserva y fecha
        const personas = [
            ...fecha.personasReservadas
        ]

        // Mapear todas las personas y ver si existe el id escaneado en las mismas
        const idx = personas.findIndex(e => e.id === scanedID)

        // Si la reserva existe en la fecha checar si ya paso el cliente 
        if (idx !== -1) {
            if (personas[idx].ingreso) {
                return new Promise((resolve) => {
                    Alert.alert(
                        'Error',
                        'La persona ya ingreso a la fecha',
                        [
                            { text: 'OK', onPress: () => resolve() },
                        ],
                        { cancelable: false }
                    )
                })

            }

            // Asignarle a newPersonas el ingresado y la hora
            let newPersonas = [...personas]
            newPersonas[idx].ingreso = true
            newPersonas[idx].horaIngreso = new Date()

            const newFecha = {
                ...fecha,
                personasReservadas: newPersonas
            }
            console.log(scanedID)
            const reser = await DataStore.query(Reserva, scanedID)
                // Verificar que no hagan fraude cancelando la reserva de ultima hora
                .then(r => {
                    if (r.cancelado === true) {
                        Alert.alert("Error", "La reserva ha sido cancelada por el cliente")
                        return null
                    }
                    return r
                })
            if (reser) {
                DataStore.save(Reserva.copyOf(reser, res => {
                    res.horaIngreso = new Date().toISOString()
                    res.ingreso = true
                }))
                    .catch(e => console.log(e))
                    .then(r => {
                        console.log(r)
                    })
                setFecha(newFecha)

                Alert.alert("Info", "Persona ingresada con exito")
                handleOpenReservacion(newPersonas[idx])
            }


        } else {
            return new Promise((resolve, reject) => {
                Alert.alert(
                    'Error',
                    'La reserva no esta en la fecha',
                    [
                        { text: 'OK', onPress: () => resolve() },
                    ],
                    { cancelable: false }
                )
            })
        }


    }

    async function handleSave() {

        setModificarIncluido(false)
        setModificarQueLlevar(false)

        try {
            const {
                fechaInicial,
                fechaFinal,
                precio,

                titulo,
                descripcion,

                id,

                itinerario,

                puntoReunionCoords,
                puntoReunionId,
                puntoReunionNombre,
                puntoReunionLink,

                efectivo,
                allowNinos,
                allowTercera,

                incluido,
                material


            } = fecha


            let error = false

            // Si no hay fecha final devolver error
            if (!fechaFinal) {
                Alert.alert("Error", "Agrega la hora final")
                return
            }
            // Verificacion itinerario correcto
            if (itinerario !== itinerarioOrig) {
                JSON.parse(itinerario).map((e) => {
                    // Verificar que las horas esten en el rango
                    if (fechaInicial > e.hora || fechaFinal < e.hora) {
                        error = "Itinerario no valido, revisa que todas las actividades se encuentren en el rango de tu fecha"
                    }
                    // Verificar que tengan titulo
                    if (!e.titulo || e.titulo === "") {
                        error = "Agrega un titulo a la actividad"
                    }
                })

            }

            if (error) {
                Alert.alert("Error", error)

                return
            }


            const {
                fechaInicial: fechaInicialOrig,
                fechaFinal: fechaFinalOrig,
                precio: precioOrig,

                titulo: tituloOrig,
                descripcion: descripcionOrig,

                itinerario: itinerarioOrig,

                puntoReunionCoords: puntoReunionCoordsOrig,

                efectivo: efectivoOrig,
                allowNinos: allowNinosOrig,
                allowTercera: allowTerceraOrig,

                incluido: incluidoOrig,
                material: materialOrig,
            } = originalDate

            function saveDate(dateModified) {
                // Nueva fecha por default
                setOriginalDate(fecha)

                let {
                    idx,
                    setFechas,
                    fechas
                } = route.params

                // Detectar si existe cambiarlo
                if (fechas && setFechas) {
                    // Si se actualiza original date, cambiar el estado de la pantalla de mis fechas
                    fechas[idx] = {
                        ...fechas[idx],
                        ...{
                            fechaInicial,
                            fechaFinal,
                            precio,

                            titulo,
                            descripcion,

                            id,

                            itinerario,

                            puntoReunionCoords,
                            puntoReunionId,
                            puntoReunionNombre,
                            puntoReunionLink,

                            efectivo,
                            allowNinos,
                            allowTercera,

                            incluido,
                            material

                        }
                    }
                    setFechas([
                        ...fechas
                    ])
                }

                // Si se cambia fecha inicial, cambiar el nombre del chatroom
                if (fechaInicial !== fechaInicialOrig) {
                    DataStore.query(ChatRoom, c => c.fechaID("eq", id))
                        .then(r => {
                            r = r[0]
                            DataStore.save(ChatRoom.copyOf(r, n => {
                                n.name = (fecha.tituloAventura + " " + formatDateShort(fechaInicial, fechaFinal))
                            }))
                        })
                }


                DataStore.query(Fecha, id)
                    .then(r => {
                        DataStore.save(Fecha.copyOf(r, r => {
                            // Indicador si se cambio la fecha
                            r.dateModified = dateModified
                            r.fechaInicial = fechaInicial
                            r.fechaFinal = fechaFinal

                            // Variables que no se avisan al cliente
                            r.descripcion = descripcion
                            r.titulo = titulo
                            r.precio = precio

                            // Actualizar la experiencia ganada por reserva
                            r.experienciaPorPersona = calculateExpPerPerson(precio)

                            // Ubicacion
                            r.puntoReunionCoords = puntoReunionCoords
                            r.puntoReunionId = puntoReunionId
                            r.puntoReunionNombre = puntoReunionNombre
                            r.puntoReunionLink = puntoReunionLink

                            // Itinerario
                            r.itinerario = itinerario

                            // Switches de personas
                            r.efectivo = efectivo
                            r.allowNinos = allowNinos
                            r.allowTercera = allowTercera

                            // Material incluido y a llevar
                            r.incluido = JSON.stringify(incluido)
                            r.material = JSON.stringify(material)
                        }))
                    })
                Alert.alert("Exito", "Fecha actualizada con exito")
                setLoading(false)
                setEditing(false)
            }

            async function updateGuideNotifications() {

                let notificationsToDelete = await getAllScheduledNotificationsAsync()
                notificationsToDelete.filter(n => {
                    const data = n?.content?.data
                    const id = n.identifier

                    // Encontrar las notificaciones asociadas a la fecha
                    const {
                        fechaID,
                        tipo
                    } = data

                    // Cancelar notificaciones tipo recordatorio guia y con fecha id igual al de la fecha
                    if (fechaID === fecha.id && tipo === TipoNotificacion.RECORDATORIOFECHA) {
                        cancelScheduledNotificationAsync(id)
                    }
                })

                // Nuevas notificaciones al guia
                notificacionesRecordatorio({
                    sub: guiaFecha.id,
                    fechaInicial,
                    tituloAventura: fecha.tituloAventura,
                    fechaID: fecha.id,
                })


            }

            // Variables a revisar que si cambian hay que avisar a los usuarios
            if (fechaInicial === fechaInicialOrig
                && fechaFinalOrig === fechaFinal
                && puntoReunionCoords === puntoReunionCoordsOrig
                && itinerarioOrig === itinerario
                && material === materialOrig
                && incluido === incluidoOrig
            ) {
                // Variables que no se necesitan avisar cambios a usuarios
                // Si no se cambio nada se cancela
                if (precioOrig === precio
                    && tituloOrig === titulo
                    && descripcionOrig === descripcion
                    && efectivoOrig === efectivo
                    && allowNinosOrig === allowNinos
                    && allowTerceraOrig === allowTercera
                ) {
                    setEditing(false)

                } else {
                    setLoading(true)
                    saveDate()
                    Alert.alert("Exito", "Fecha actualizada con exito")
                    setEditing(false)
                    setLoading(false)
                }

            }
            else {
                setLoading(true)
                // Primero ver si hay usuarios reservados en la fecha que no hayan cancelado
                const reservas = await DataStore.query(Reserva, r => r
                    .fechaID("eq", id)
                    .cancelado("ne", true)
                )
                const tituloAventura = fecha.tituloAventura

                // Mandar los respectivos mensajes si ya hay personas reservadas
                if (reservas.length !== 0) {
                    // Revisar si se cambio la fecha inicial o final si no simplemente se guardan los nuevos datos
                    if ((fechaInicial !== fechaInicialOrig || fechaFinal !== fechaFinalOrig)) {
                        await AsyncAlert("Atencion", "Al cambiar la fecha inicial o final y tener usuarios reservados, se les permite cancelar sin costo y ademas una calificacion a tu perfil\n¿Quieres continuar?")

                        // Si la fecha inicial y fecha final cambiaron
                        if (fechaInicial !== fechaInicialOrig && fechaFinal !== fechaFinalOrig) {
                            console.log("Cambio fecha inicial y final")

                            // Actualizar notificaciones de recordatorio de clientes
                            await Promise.all(reservas.map(async u => {
                                // Borrar notificaciones viejas en base de datos
                                DataStore.query(Notificacion, r => r
                                    .fechaID("eq", id)

                                    // Selccionar las que sean de tipo calfica usuario
                                    .or(t => {
                                        t
                                            .tipo("eq", TipoNotificacion.RECORDATORIOFECHA)
                                            .tipo("eq", TipoNotificacion.CALIFICAUSUARIO)
                                    })

                                    // Seleccionar si es igual al usuario del cliente o el guia
                                    .or(t => {
                                        t
                                            .usuarioID("eq", guiaFecha.id)
                                            .usuarioID("eq", u.usuarioID)
                                    })

                                )
                                    .then(not => {
                                        // Borrar todas las viejas y crear nuevas
                                        not.map(not => {
                                            DataStore.delete(Notificacion, not.id)
                                        })

                                    })

                                // Mandar notificacion al usuario
                                await DataStore.query(Usuario, u.usuarioID)
                                    .then(usr => {
                                        sendNotification({
                                            tipo: TipoNotificacion.FECHAACTUALIZACION,
                                            descripcion: (usr.nombre ? mayusFirstLetter(usr.nombre) : usr.nickname) + " el guia ha cambiado la fecha de partida y la fecha final quedando para el " + formatDateShort(fechaInicial, fechaFinal),
                                            fechaID: id,
                                            reservaID: u.id,
                                            showAt: new Date().getTime(),
                                            titulo: fecha.tituloAventura + " se ha actualizado",
                                            usuarioID: u.usuarioID,
                                            token: usr.notificationToken
                                        })

                                        // Nuevas notificaciones
                                        notificacionesRecordatorio({
                                            // Datos del cliente para la notificacion de calificar
                                            cliente: {
                                                calificaClienteImage: fecha.imagenFondo,
                                                tipoPago: u.tipoPago,
                                                precioTotal: u.total,
                                                nickname: usr.nombre ? mayusFirstLetter(usr.nombre) : usr.nickname
                                            },

                                            // Datos del guia para la notificacion de calificar
                                            guia: {
                                                guiaID: guiaFecha.id,
                                                nickname: guiaFecha.nickname,
                                            },

                                            // Datos otras notificaciones
                                            fechaInicial: fecha.fechaInicial,
                                            fechaFinal: fecha.fechaFinal,
                                            sub: u.usuarioID,
                                            tituloAventura,

                                            aventuraID: fecha.aventuraID,
                                            reservaID: u.id,
                                            fechaID: fecha.id,
                                        })
                                    })
                            }))
                            updateGuideNotifications()
                            saveDate(true)
                        }

                        // Si solo cambio fecha inicial
                        else if (fechaInicial !== fechaInicialOrig) {
                            console.log("Cambio fecha inicial")


                            // Ver usuarios reservados
                            await Promise.all(reservas.map(async u => {
                                // Borrar notificaciones viejas en base de datos
                                DataStore.query(Notificacion, r => r
                                    .fechaID("eq", id)

                                    // Solo los recordatorios en la fecha
                                    .tipo("eq", TipoNotificacion.RECORDATORIOFECHA)

                                    // Seleccionar si es igual al usuario del cliente o el guia
                                    .or(t => {
                                        t
                                            .usuarioID("eq", guiaFecha.id)
                                            .usuarioID("eq", u.usuarioID)
                                    })

                                )
                                    .then(not => {

                                        // Borrar todas las viejas y crear nuevas
                                        not.map(not => {
                                            DataStore.delete(Notificacion, not.id)
                                        })
                                    })


                                // Mandar notificacion al usuario reservado actual
                                await DataStore.query(Usuario, u.usuarioID)
                                    .then(usr => {
                                        sendNotification({
                                            tipo: TipoNotificacion.FECHAACTUALIZACION,
                                            descripcion: (usr.nombre ? mayusFirstLetter(usr.nombre) : usr.nickname) + " el guia ha cambiado la fecha de partida quedando para el " + formatDateShort(fechaInicial, fechaFinal),
                                            fechaID: id,
                                            reservaID: u.id,
                                            showAt: new Date().getTime(),
                                            titulo: fecha.tituloAventura + " se ha actualizado",
                                            usuarioID: u.usuarioID,
                                            token: usr.notificationToken
                                        })
                                    })

                                // Programar nuevas notificaciones del usuario
                                notificacionesRecordatorio({
                                    // Datos otras notificaciones
                                    fechaInicial: fecha.fechaInicial,
                                    fechaFinal: fecha.fechaFinal,
                                    sub: u.usuarioID,
                                    tituloAventura,

                                    aventuraID: fecha.aventuraID,
                                    reservaID: u.id,
                                    fechaID,
                                })
                            }))
                            // Actualizar notificaciones del guia
                            updateGuideNotifications()
                            saveDate(true)
                        }

                        // Si solo cambio fecha final
                        else {
                            console.log("Cambio fecha final")

                            // Poner fecha final al dia siguiente de que acabe a las 8
                            let finalDate = new Date(fechaFinal);
                            if (finalDate.getUTCHours() >= 8) {
                                finalDate = new Date(finalDate.getTime() + msInDay);
                            }
                            finalDate.setUTCHours(8);

                            const horaCalificaUsuario = finalDate.getTime()

                            await Promise.all(reservas.map(async u => {

                                // Borrar notificaciones viejas en base de datos
                                DataStore.query(Notificacion, r => r
                                    .fechaID("eq", id)

                                    // Solo los recordatorios en la fecha
                                    .tipo("eq", TipoNotificacion.CALIFICAUSUARIO)

                                    // Selccionar las que sean del  usuario
                                    .usuarioID("eq", u.usuarioID)


                                )
                                    .then(not => {
                                        // Borrar todas las viejas y crear nuevas
                                        not.map(not => {
                                            DataStore.delete(Notificacion, not.id)
                                        })
                                    })
                                // Pedir el usuario para cada reserva
                                await DataStore.query(Usuario, u.usuarioID)
                                    .then(usr => {
                                        sendNotification({
                                            tipo: TipoNotificacion.FECHAACTUALIZACION,
                                            descripcion: (usr.nombre ? mayusFirstLetter(usr.nombre) : usr.nickname) + " el guia ha cambiado la fecha final quedando para el " + formatDateShort(fechaInicial, fechaFinal),
                                            fechaID: id,
                                            reservaID: u.id,
                                            showAt: new Date().getTime(),
                                            titulo: fecha.tituloAventura + " se ha actualizado",
                                            usuarioID: u.usuarioID,
                                            token: usr.notificationToken
                                        })


                                        // Programar notificacion de califica al usuario terminando la fecha
                                        DataStore.save(
                                            new Notificacion({
                                                tipo: TipoNotificacion.CALIFICAUSUARIO,

                                                titulo: usr.nombre ? mayusFirstLetter(usr.nombre) : usr.nickname + ", califica tu experiencia",
                                                descripcion:
                                                    "Ayudanos a hacer de Velpa un lugar mejor, calfica a " +
                                                    guiaFecha.nickname +
                                                    " en " +
                                                    fecha.tituloAventura,

                                                showAt: horaCalificaUsuario,

                                                usuarioID: u.usuarioID,
                                                aventuraID: fecha.aventuraID,

                                                // Datos para buscar por si se cancela/mueve fecha o reserva
                                                reservaID: u.id,
                                                fechaID: fecha.id,

                                                imagen: fecha.imagenFondo,

                                                guiaID: guiaFecha.id,
                                            })
                                        )
                                    })
                            }))
                            saveDate(true)
                        }


                    }

                    // Si solo se cambio el itinerario y no la fecha, mandar notificacion a cada usuario de cambio de itinerario
                    else if (itinerario !== itinerarioOrig) {
                        // Mandar notificacion de actualizacion a usuarios
                        await Promise.all(reservas.map(async u => {
                            await DataStore.query(Usuario, u.usuarioID)
                                .then(r => {
                                    sendNotification({
                                        tipo: TipoNotificacion.FECHAACTUALIZACION,
                                        descripcion: "El guia ha cambiado el itinerario de la fecha para el " + formatDateShort(fechaInicial, fechaFinal),
                                        fechaID: id,
                                        reservaID: u.id,
                                        showAt: new Date().getTime(),
                                        titulo: fecha.tituloAventura + " se ha actualizado",
                                        usuarioID: u.usuarioID,
                                        token: r.notificationToken

                                    })
                                })

                        }))
                        // Guardar en datastore
                        saveDate()
                    }

                    else if (incluido !== incluidoOrig || materialOrig !== material) {
                        console.log("Solo cambio el material de la fecha")

                        // Mandar notificacion de actualizacion a usuarios
                        await Promise.all(reservas.map(async u => {
                            await DataStore.query(Usuario, u.usuarioID)
                                .then(r => {
                                    sendNotification({
                                        tipo: TipoNotificacion.FECHAACTUALIZACION,
                                        descripcion: "El guia ha modificado el material a llevar y lo que incluye para el " + formatDateShort(fechaInicial, fechaFinal),
                                        fechaID: id,
                                        reservaID: u.id,
                                        showAt: new Date().getTime(),
                                        titulo: fecha.tituloAventura + " se ha actualizado",
                                        usuarioID: u.usuarioID,
                                        token: r.notificationToken

                                    })
                                })

                        }))

                        // Guardar en datastore
                        saveDate()
                    }

                    else {
                        Alert.alert("Error", "Error no se detecto el cambio en la fecha")
                    }
                }

                // Si no hay personas reservadas, solo guardar la fecha y actualizar notificaciones al guia
                else {
                    // Borrar notificaciones viejas del guia en base de datos
                    DataStore.query(Notificacion, r => r
                        .fechaID("eq", id)

                        // Selccionar las que sean del  usuario
                        .usuarioID("eq", guiaFecha.id)


                    )
                        .then(not => {
                            // Borrar todas las viejas y crear nuevas
                            not.map(not => {
                                DataStore.delete(Notificacion, not.id)
                            })
                        })

                    updateGuideNotifications()


                    saveDate()

                }
            }

        } catch (error) {
            // Si se cancelo por la alerta
            if (error == "Cancelada") {
                clearData()

            } else {
                console.log(error)
                Alert.alert("Error", "Error modificando la fecha")

            }

            setLoading(false)
            setEditing(false)
        }

    }




    const openMap = () => {
        setTipoModal("map")
        setModalVisible(true)
    }

    function savePuntoReunion(r) {
        const {
            latitude,
            longitude,
            ubicacionId: puntoReunionId,
            ubicacionNombre: puntoReunionNombre,
            ubicacionLink: puntoReunionLink
        } = r

        r = {
            puntoReunionId,
            puntoReunionLink,
            puntoReunionNombre,
            puntoReunionCoords: JSON.stringify({
                latitude, longitude
            })
        }

        // Actualizar el itinerario
        let itinerario = JSON.parse(fecha.itinerario)
        itinerario[0].titulo = "Punto de reunion en " + puntoReunionNombre
        itinerario[itinerario.length - 1].titulo = "Punto de reunion en " + puntoReunionNombre
        itinerario[0].ubicacionNombre = puntoReunionNombre
        itinerario[itinerario.length - 1].ubicacionNombre = puntoReunionNombre
        itinerario = JSON.stringify(itinerario)

        // Mover el mapa a ese lugar nuevo
        mapRef?.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 2,
            longitudeDelta: 2

        })

        // Guardar el nuevo lugar
        setFecha({
            ...fecha,
            itinerario,
            ...r,
        })
        setModalVisible(false)

    }

    function handleChangeEfectivo() {
        if (!editing) return

        const change = () => setFecha({ ...fecha, efectivo: !fecha.efectivo })

        if (!fecha.efectivo) {
            Alert.alert("Atencion", "Al permitir pagos en efectivo te arriesgas a que los clientes reserven y no se presenten y en ese caso las comisiones no se pueden devolver\n¿Deseas continuar?", [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: change
                },
            ])
        }

        else {
            change()
        }

    }

    // Se desactiva la opcion de editar si es cliente o la fecha ya paso
    const editDisabled = false//fecha?.fechaInicial < new Date().getTime() ? true : false


    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                enabled={Platform.OS === "ios" ? true : false}>

                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}

                    style={styles.container}>
                    <Image
                        source={{ uri: fecha.imagenFondo }}
                        style={styles.imagenFondo}
                    />

                    <View style={styles.bodyContainer}>

                        <View style={styles.row}>

                            {editing ?
                                <TextInput
                                    autoCapitalize='sentences'
                                    maxLength={20}
                                    style={{
                                        ...styles.textInput,
                                        flex: 1,
                                        marginRight: 40,
                                    }}
                                    value={fecha.titulo}
                                    onChangeText={titulo => setFecha({
                                        ...fecha,
                                        titulo
                                    })}
                                />
                                :

                                <Text
                                    numberOfLines={1}
                                    style={styles.title}>{fecha.titulo ? fecha.titulo : fecha.tituloAventura}
                                </Text>
                            }
                            {
                                editing ?
                                    <CurrencyInput
                                        value={fecha.precio}
                                        onChangeValue={precio => setFecha({ ...fecha, precio })}
                                        prefix="$"
                                        delimiter=","
                                        separator="."
                                        precision={0}
                                        style={{
                                            ...styles.textInput,
                                            fontWeight: 'bold',
                                        }}

                                    />

                                    :
                                    <Text style={{ ...styles.title, color: "#000", }}>{formatMoney(fecha.precio, true)}<Text style={{ fontWeight: "normal", }}> /persona</Text></Text>
                            }


                        </View>


                        {/* Poder agregar una descripcion si no existe */}
                        {
                            editing ?
                                <View style={{ marginTop: 5, }}>
                                    <Text style={styles.captionTxt}>Descripcion (opcional)</Text>
                                    <TextInput
                                        autoCapitalize='sentences'
                                        style={styles.textInput}
                                        multiline={true}

                                        value={fecha.descripcion}
                                        onChangeText={descripcion => setFecha({
                                            ...fecha,
                                            descripcion
                                        })}
                                    />
                                </View>
                                :

                                fecha.descripcion && <View style={{ ...styles.row, marginVertical: 10 }}>
                                    <Text style={styles.descripcion}>
                                        {fecha.descripcion}
                                    </Text>
                                </View>
                        }

                        {/* Informacion de las comisiones cobradas */}
                        <Pressable
                            onPress={() => {
                                setTipoModal("infoNiveles")
                                setModalVisible(true)
                            }}
                            style={{
                                marginTop: editing ? 40 : 20,
                                alignItems: 'center',
                                marginBottom: 10,
                            }}>

                            <View style={styles.infoPriceContainer}>
                                <Text style={styles.infoPriceTitle}>Comision cobrada por reserva:</Text>
                                <Text style={styles.infoPriceNumber}>{formatMoney(calculateComision(guiaFecha?.experience) * fecha?.precio, true)}</Text>
                            </View>

                            <View style={styles.infoPriceContainer}>
                                <Text style={styles.infoPriceTitle}>Ganancias:</Text>
                                <Text style={styles.infoPriceNumber}>{formatMoney((1 - calculateComision(guiaFecha?.experience)) * fecha?.precio, true)}</Text>
                            </View>

                            <Entypo name="info-with-circle" size={24} color={moradoOscuro + "55"} />
                        </Pressable>


                        <Line />



                        <Calendario
                            editDisabled={!editing}
                            fechaID={fecha.id}

                            fecha={fecha}
                            setFecha={setFecha}

                            setMarkedDays={setMarkedDays}
                            markedDays={markedDays}
                        />

                        <View style={{
                            marginTop: 20,
                        }}>
                            <HourEditor
                                fecha={fecha}
                                setFecha={setFecha}

                                enabled={!editing}
                            />

                        </View>


                        <Line />
                        {/* Permitir personas y pagos en efectivo */}
                        <View style={{}}>
                            <Pressable
                                onPress={handleChangeEfectivo}
                                style={styles.allowInnerContainer}>
                                <Text style={styles.textAllow}>Permitir pagos en efectivo</Text>
                                <Switch
                                    trackColor={{
                                        true: moradoOscuro + "88",
                                        false: colorFondo
                                    }}
                                    thumbColor={moradoClaro}
                                    onValueChange={handleChangeEfectivo}
                                    value={fecha.efectivo}

                                />
                            </Pressable>

                            {/* Permitir tercera edad */}
                            <Pressable
                                onPress={() => {
                                    editing && setFecha({
                                        ...fecha,
                                        allowTercera: !fecha.allowTercera
                                    })
                                }}
                                style={styles.allowInnerContainer}>
                                <Text style={styles.textAllow}>Permitir tercera edad</Text>
                                <Switch
                                    trackColor={{
                                        true: moradoOscuro + "88",
                                        false: colorFondo
                                    }}
                                    thumbColor={moradoClaro}
                                    onValueChange={() => editing && setFecha({
                                        ...fecha,
                                        allowTercera: !fecha.allowTercera
                                    })}
                                    value={fecha.allowTercera}

                                />
                            </Pressable>

                            {/* Permitir niños */}
                            <Pressable
                                onPress={() => {
                                    editing && setFecha({
                                        ...fecha,
                                        allowNinos: !fecha.allowNinos
                                    })
                                }}
                                style={styles.allowInnerContainer}>
                                <Text style={styles.textAllow}>Permitir niños</Text>
                                <Switch
                                    trackColor={{
                                        true: moradoOscuro + "88",
                                        false: colorFondo
                                    }}
                                    thumbColor={moradoClaro}
                                    onValueChange={() => editing && setFecha({
                                        ...fecha,
                                        allowNinos: !fecha.allowNinos
                                    })}
                                    value={fecha.allowNinos}

                                />
                            </Pressable>

                        </View>

                        {/* Personas reservadas en la fecha */}
                        {
                            editing ? false :
                                fecha.personasReservadas.length !== 0 ? <View >
                                    <Line />

                                    {/* Titulo */}
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: 20,
                                    }}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            flex: 1,
                                            fontSize: 16,
                                            color: '#000',
                                        }}>{fecha.personasReservadasNum}/{fecha.personasTotales} personas reservadas</Text>

                                        {!editing && <Ionicons
                                            onPress={navigateChat}
                                            style={{ ...styles.botonItinerario, marginRight: 0, marginBottom: 0, }} name="chatbox" size={20} color="white" />}

                                    </View>

                                    {!!fecha.precioAcomulado && <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Text style={{ ...styles.title, flex: 1, }}>Suma:</Text>
                                        <Text style={{ ...styles.title, color: moradoOscuro, }}>{formatMoney(fecha.precioAcomulado, true)}</Text>

                                    </View>}

                                    {!!fecha.precioAcomulado && <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Text style={{ ...styles.title, flex: 1, }}>Comision:</Text>
                                        <Text style={{ ...styles.title, color: moradoOscuro, }}>- {formatMoney(fecha.precioAcomulado - fecha.precioAcomuladoSinComision, true)}</Text>

                                    </View>}
                                    <View style={{
                                        flexDirection: 'row', marginTop: 10,
                                        marginBottom: 20,
                                    }}>
                                        <Text style={{ ...styles.title, flex: 1, }}>Total:</Text>
                                        <Text style={{ ...styles.title, color: moradoOscuro, }}>{formatMoney(fecha.precioAcomuladoSinComision, true)}</Text>

                                    </View>


                                    {/* Imagenes personas y chat */}
                                    <View style={{ marginBottom: 20, marginTop: 10, }}>
                                        {fecha.personasReservadas.map((persona, i) => {
                                            return <Pressable
                                                onPress={() =>
                                                    handleOpenReservacion(persona)
                                                }
                                                key={i.toString()}
                                                style={{
                                                    marginBottom: 20,
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                }}>

                                                <View style={{
                                                    width: 30,
                                                    height: 30,
                                                    justifyContent: 'center',
                                                }}>
                                                    {
                                                        persona.ingreso && <Entypo name="check" size={24} color={moradoOscuro} />
                                                    }
                                                </View>

                                                <Image
                                                    source={persona.foto ? { uri: persona.foto } : require("../../../assets/user.png")}
                                                    style={{
                                                        borderRadius: 30,
                                                        width: 30,
                                                        height: 30,

                                                        marginRight: 10,

                                                    }}
                                                />

                                                <View style={{ flex: 1, justifyContent: 'center', }}>
                                                    <Text style={{
                                                        color: "gray",
                                                    }}>@{persona.nickname}</Text>
                                                </View>

                                                <View style={{ alignItems: 'flex-end', }}>
                                                    <View style={{ flexDirection: 'row', marginBottom: 5, }}>
                                                        <Text style={{
                                                            color: "gray",
                                                        }}>{persona.personasReservadas} </Text>
                                                        <Ionicons name="ios-person" size={20} color={"lightgray"} />
                                                    </View>
                                                    <Text style={{
                                                        color: "#000",
                                                    }}>{formatMoney(persona.total, true)}</Text>
                                                </View>


                                            </Pressable>

                                        })}

                                    </View>

                                </View>
                                    : <View style={{

                                    }}>

                                        <Line />
                                        <Text style={{
                                            marginBottom: 40,
                                            height: 30,
                                            alignItems: 'center', justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 16,
                                        }}>No hay personas reservadas</Text>

                                    </View>

                        }

                        <Line />



                        <Text style={styles.captionTxt}>Punto de reunion: </Text>
                        <View style={{ height: 300, width: '100%', marginBottom: 40, alignItems: 'center', justifyContent: 'center', }}>
                            <MapView
                                ref={mapRef}

                                onPress={openMap}

                                onMarkerPress={openMap}


                                provider={"google"}
                                mapType={"standard"}

                                showsUserLocation={true}
                                loadingEnabled={true}

                                pitchEnabled={false}
                                rotateEnabled={false}
                                zoomEnabled={false}
                                scrollEnabled={false}


                                loadingBackgroundColor={"#fff"}
                                initialRegion={region}

                                style={{ ...StyleSheet.absoluteFill, }}
                            >
                                {/* Marcador de la ubicacion */}
                                {selectedPlace && <Marker
                                    coordinate={region}
                                />}

                            </MapView>
                            {editing && <Pressable
                                onPress={openMap}
                                style={{
                                    width: 90,
                                    backgroundColor: '#fff',
                                    height: 90,
                                    borderRadius: 90,
                                    alignItems: 'center', justifyContent: 'center',
                                    opacity: 0.9
                                }}>
                                <Feather name="edit" size={40} color={moradoOscuro} />

                            </Pressable>}

                        </View>


                        {/* ITINERARIO */}
                        <Text style={styles.captionTxt}>Itinerario: </Text>
                        <Pressable
                            onPress={handleOpenItinerario}
                            style={styles.itinerarioContainer}>


                            <MaterialCommunityIcons
                                style={styles.botonItinerario}
                                name={editing ? "calendar-edit" : "calendar-text"} size={20} color="#fff" />

                            <View style={styles.lineItinerarioContainer}>
                                {/* Linea de itinerario */}
                                <View style={{
                                    backgroundColor: '#E5E5E5',
                                    height: 10,
                                    borderRadius: 10,
                                    width: '100%',
                                }} />

                                {/* 3 Bolitas de itinerario */}
                                <View style={{ ...styles.bolita, left: 0, }} />
                                <View style={styles.bolita} />
                                <View style={{ ...styles.bolita, right: 0, }} />
                            </View>


                            {/* Itinerario textos */}
                            <View style={{ flexDirection: 'row', }}>

                                <View style={styles.itinerarioItem}>
                                    <Text style={styles.dayItinerario}>{formatDateShort(inicioItinerario.hora)}</Text>
                                    <Text style={styles.titleItinerario}>{inicioItinerario.titulo}</Text>
                                    <Text style={styles.horaItinerario}>{formatAMPM(inicioItinerario.hora)}</Text>
                                </View>

                                {medioItinerario ? <View style={styles.itinerarioItem}>
                                    <Text style={styles.dayItinerario}>{formatDateShort(medioItinerario.hora)}</Text>
                                    <Text style={styles.titleItinerario}>{medioItinerario.titulo}</Text>
                                    <Text style={styles.horaItinerario}>{formatAMPM(medioItinerario.hora)}</Text>
                                </View> :
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, }}>
                                        <Entypo name="dots-three-horizontal" size={24} color="#999" />
                                    </View>}

                                <View style={styles.itinerarioItem}>
                                    <Text style={styles.dayItinerario}>{formatDateShort(finItinerario.hora)}</Text>
                                    <Text style={styles.titleItinerario}>{finItinerario.titulo}</Text>
                                    <Text style={styles.horaItinerario}>{formatAMPM(finItinerario.hora)}</Text>
                                </View>

                            </View>

                        </Pressable>

                        <Line style={{ marginTop: 40, }} />


                        <View style={{ marginTop: 40, }} />


                        {/* ----------------- */}
                        {/* Material incluido */}
                        {/* ----------------- */}
                        <View style={styles.material}>
                            <Pressable
                                style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={styles.tituloMaterial}>Incluido</Text>
                                {
                                    editing ? modificarIncluido ?
                                        <Feather
                                            onPress={() => setModificarIncluido(!modificarIncluido)}
                                            style={styles.modificar}
                                            name="check"
                                            size={30}
                                            color={moradoOscuro}
                                        />
                                        :
                                        <Feather
                                            onPress={() => setModificarIncluido(!modificarIncluido)}
                                            style={styles.modificar}
                                            name="edit"
                                            size={24}
                                            color="black"
                                        /> : <View />
                                }
                            </Pressable>


                            <Incluido
                                datos={fecha.incluido}
                                modify={modificarIncluido}
                                setDatos={r => {
                                    setFecha({
                                        ...fecha,
                                        incluido: r
                                    })
                                }}
                            />

                        </View>
                        <View style={{
                            marginBottom: 20,
                        }} />

                        <View style={styles.material}>
                            <Pressable
                                style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={styles.tituloMaterial}>Material a llevar</Text>
                                {
                                    editing ? modificarQueLlevar ?
                                        <Feather
                                            onPress={() => setModificarQueLlevar(!modificarQueLlevar)}
                                            style={styles.modificar}
                                            name="check"
                                            size={30}
                                            color={moradoOscuro}
                                        />
                                        :
                                        <Feather
                                            onPress={() => setModificarQueLlevar(!modificarQueLlevar)}
                                            style={styles.modificar}
                                            name="edit"
                                            size={24}
                                            color="black"
                                        />
                                        : <View />
                                }
                            </Pressable>

                            <QueLlevar
                                datos={fecha.material}
                                modify={editing && modificarQueLlevar}
                                setDatos={r => {
                                    setFecha({
                                        ...fecha,
                                        material: r
                                    })
                                }}
                            />

                        </View>
                    </View>



                </Animated.ScrollView >

                {/* Escanear codigo */}
                <Pressable
                    onPress={editing ? cancelarFecha : handleQR}
                    style={{
                        width: '100%',
                        backgroundColor: colorFondo,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        padding: 20,
                        // bottom: 0,
                        // position: 'absolute',
                    }}>

                    <Text style={{
                        ...styles.textCancel,
                        color: editing ? "red" : moradoOscuro
                    }}>{editing ? "Cancelar fecha" : "Registrar entrada"}</Text>
                </Pressable>



            </KeyboardAvoidingView>
            <HeaderDetalleAventura
                scrollY={scrollY}
                height={height * 0.5}
                titulo={fecha.tituloAventura}

                IconLeft={({ style }) => <Pressable style={style}
                    onPress={async () => {
                        if (loading) Alert.alert("Espera", "Espera a que se guarde la fecha")

                        else if (editing) {
                            await AsyncAlert("Atencion", "Se perderan todos los cambios\n¿Quieres continuar?")
                                .then(r => {
                                    clearData()
                                    setEditing(false)

                                })
                                .catch(() => null)

                        }
                        else navigation.pop()

                    }}>
                    {editing ?
                        <Feather
                            name={"x"}
                            size={30}
                            color={moradoOscuro}
                        />

                        : <MaterialIcons
                            name={"keyboard-arrow-left"}
                            size={35}
                            color={moradoOscuro}
                        />

                    }
                </Pressable>}

                IconRight={
                    editDisabled ? null : () => <Pressable
                        onPress={() => {
                            if (loading) {
                                return
                            }
                            // Si se estaba editando se guarda
                            if (editing) {
                                handleSave()
                            } else {
                                setEditing(!editing)

                            }
                        }}
                        style={{
                            height: 43,
                            width: 43,
                            alignItems: 'center', justifyContent: 'center',

                            borderRadius: 25,

                            backgroundColor: '#fff',
                        }}>
                        {loading ?
                            <ActivityIndicator size={"small"}
                                color={moradoOscuro}
                            />
                            : editing ?
                                <Feather name="check" size={25} color={moradoOscuro} />
                                : <Feather name="edit-2" size={20} color={moradoOscuro} />
                        }
                    </Pressable>
                }
            />

            {
                tipoModal === "infoNiveles" ?
                    <InfoNivelesModal
                        userExp={guiaFecha?.experience}
                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}
                    />

                    :
                    tipoModal === "map" && !editing ?
                        <ModalMap
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}

                            selectedPlace={selectedPlace}

                        />

                        :


                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(false);
                            }}
                        >{
                                tipoModal === "escaner" ?

                                    <QRScan
                                        cerrar={() => setModalVisible(false)}
                                        handleScanned={codigoEscaneado} />
                                    :
                                    tipoModal === "itinerario" ?


                                        < ModalItinerario
                                            setModalVisible={setModalVisible}


                                            itinerario={itinerario}
                                            setItinerario={r => {
                                                setFecha({
                                                    ...fecha,
                                                    itinerario: JSON.stringify(r)

                                                })
                                            }}

                                            editAllowed={editing}

                                            fechaInicial={fecha.fechaInicial}
                                            fechaFinal={fecha.fechaFinal}

                                        /> :

                                        tipoModal === "map" ?
                                            <ModalMapEdit
                                                titulo={"Punto de reunion"}

                                                setModalVisible={setModalVisible}

                                                handleGuardar={savePuntoReunion}

                                                place={selectedPlace}

                                            /> :
                                            <DetalleReserva
                                                handleBack={() => setModalVisible(false)}
                                                reserva={actualReservation}
                                            />
                            }

                        </Modal>

            }

        </View >
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    imagenFondo: {
        width: '100%',
        height: height / 3,
    },

    bodyContainer: {
        backgroundColor: '#fff',
        width: '100%',
        top: -30,
        borderRadius: 30,
        padding: 20,
        paddingTop: 25,
    },

    title: {
        fontSize: 16,
        fontWeight: "bold",
    },


    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },

    descripcion: {
        lineHeight: 19,
        color: 'gray',
    },

    fechaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: 10,
    },


    fechaTxt: {
        marginLeft: 10,
        fontSize: 16,
        color: "#000",
        textAlign: 'center',
    },
    fechaTitle: {
        color: moradoOscuro,
    },


    captionTxt: {
        fontSize: 15,
        marginBottom: 15,
        marginLeft: 5,

    },

    textInput: {
        // flex: 1,
        backgroundColor: editColor,
        padding: 5,
        paddingHorizontal: 10,

    },

    reunionContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },

    locationTxt: {
        textAlign: 'center',
        flex: 1,
        color: moradoOscuro,
    },

    itinerarioContainer: {
        marginTop: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        left: -20,
        width,
    },

    lineItinerarioContainer: {
        flexDirection: 'row',
        marginHorizontal: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },

    bolita: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: moradoOscuro,
        position: 'absolute',
    },

    botonItinerario: {
        padding: 7,
        backgroundColor: moradoOscuro,
        borderRadius: 20,
        marginBottom: 20,
        marginRight: 20,
    },

    itinerarioItem: {
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },

    tituloMaterial: {
        fontSize: 18,
        marginBottom: 15,
        fontWeight: 'bold',
        color: moradoClaro,

    },

    dayItinerario: {
        position: 'absolute',
        top: -40,
        fontWeight: 'bold',
        color: '#000',
    },

    titleItinerario: {
        marginTop: 5,
        color: '#000',
        textAlign: 'center',
    },

    horaItinerario: {
        marginTop: 10,
        textAlign: 'center',
        color: '#999',
        fontWeight: 'bold',
    },

    material: {
        padding: 20,
        paddingHorizontal: 0,
        marginBottom: 25,


    },

    captionTxt: {
        fontWeight: 'bold',
        marginVertical: 10,
    },

    personaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        flex: 1,
        marginHorizontal: 10,

    },

    textCancel: {
        color: moradoOscuro,
        textAlign: 'center',
        fontWeight: 'bold',

        fontSize: 18,
    },


    infoPriceTitle: {
        flex: 1,
        fontSize: 15,
        color: '#000',
    },

    infoPriceNumber: {
        fontSize: 15,
        color: "#000",
        fontWeight: 'bold',
        minWidth: 36,
        textAlign: 'center',
    },
    infoPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    allowInnerContainer: {
        flexDirection: 'row',
        padding: 5,
        paddingLeft: 10,
        marginBottom: 5,

        backgroundColor: editColor,

        alignItems: 'center'
    },

    textAllow: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
    }

})
