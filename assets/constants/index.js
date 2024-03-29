import { API, Auth, Storage } from "aws-amplify";
import { Alert, Linking, Platform } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Aventura, Notificacion, TipoNotificacion, Fecha } from "../../src/models";
import { DataStore, Predicates } from '@aws-amplify/datastore';
import React from "react";

import { Foundation, MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Usuario } from "../../src/models";
import { Categorias } from "../../src/models";
import { sendPushNotification } from "./constant.tsx";
import * as ImageManipulator from 'expo-image-manipulator';
import { STRIPE_PUBLISHABLE_KEY, STRIPE_GET_INFOPAYMENT, STRIPE_TRANSFERREVERSAL, STRIPE_PAYMENTINTENTS, STRIPE_APPFEEREVERSAL } from "@env";





export function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

// Funcion que toma dos fechas y devuelve un numero con la diferencia de dias
export const diffDays = (fechaInicial, fechaFinal) => {
  const fInicial = new Date(fechaInicial)
  const fFinal = new Date(fechaFinal)

  // Ponerlos los 2 en hora local 12 am
  fInicial.setHours(0, 0, 0, 0)
  fFinal.setHours(0, 0, 0, 0)


  return Math.abs((fInicial - fFinal) / msInDay)


}

// Funcion que toma un string y un numero para agregar dias
export const addDays = (dayStr, add) => {
  Date.prototype.agregarDias = function (days) {
    var date = new Date(this.valueOf());
    date.setTime(date.getTime() + days * msInDay);
    return date
  }
  if (add === 0) {
    return dayStr
  }


  var date = new Date(dayStr);


  date = date.agregarDias(add)

  // Se formatea como queremos
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();
  return (yyyy + '-' + mm + '-' + dd);

}

export const queryUsuario = /* GraphQL */ `
query GetUsuario($id: ID!) {
    getUsuario(id: $id) {
        id
        nombre
        apellido
        foto
        comentarios
        calificacion
        nickname
        capacidadMaxima
        telefono
        tipo

        # General
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
  
        # Guia
        redSocial
        sitioWeb
        stripeID
        
        # Usuario individual
        tarjetaCirculacion
        certificaciones

    }
}
`

const crearUsr = /* GraphQL */ `
  mutation CreateUsuario(
    $input: CreateUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    createUsuario(input: $input, condition: $condition) {
      id
    }
  }
`;

const crearNotificacion = /* GraphQL */ `
  mutation CreateNotificacion(
    $input: CreateNotificacionInput!
    $condition: ModelNotificacionConditionInput
  ) {
    createNotificacion(input: $input, condition: $condition) {
      id
    }
  }
`;

export const updateUsuario = /* GraphQL */ `
  mutation UpdateUsuario(
    $input: UpdateUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    updateUsuario(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createSolicitudGuia = /* GraphQL */ `
  mutation CreateSolicitudGuia(
    $input: CreateSolicitudGuiaInput!
  ) {
    createSolicitudGuia(input: $input) {
      id
    }
  }
`;


export const updateSolicitudGuia = /* GraphQL */ `
  mutation UpdateSolicitudGuia(
    $input: UpdateSolicitudGuiaInput!
  ) {
    updateSolicitudGuia(input: $input) {
      id
    }
  }
`;


export const createUsuarioAventura = /* GraphQL */ `
  mutation CreateUsuarioAventura(
    $input: CreateUsuarioAventuraInput!
  ) {
    createUsuarioAventura(input: $input) {
      id
    }
  }
`;


// Listar solicitudes con sus aventuras y datos de guia,
// Solo aquellas que no estan aprovadas
export const listSolicitudGuiasPendientes = /* GraphQL */ `
  query ListSolicitudGuias {
    listSolicitudGuias(filter: {status: {eq:PENDIENTE}}) {
        items {
          _deleted
          _version
          _lastChangedAt
          status
          id
          createdAt
          usuarioID
          Aventuras {
            items {
              aventura {
                titulo
                id
                createdAt
                updatedAt
            }
          }
        }
      }
    }
  }
`;

export const listSolicitudGuiasVerificadas = /* GraphQL */ `
  query ListSolicitudGuias {
    listSolicitudGuias(filter: {status: {ne:PENDIENTE}}) {
        items {
          status
          id
          createdAt
          usuarioID
          evaluadorID
          mensaje
          Aventuras {
            items {
              aventura {
                titulo
                id
              }
            }
        }
      }
    }
  }
`;

export const listGuiasAutorizadosPorAventura = /* GraphQL */ `
  query listGuiasAutorizadosPorAventura {
    listAventuras {
      items {
        usuariosAutorizados {
          items {
            id
            usuario {
              id
              nickname
              selfie
              stripeID
              telefono
              capacidadMaxima
            }
          }
        }
        id
        imagenFondo
        titulo
      }
    }
  }`;

export const deleteUsuarioAventura = /* GraphQL */ `
  mutation DeleteUsuarioAventura(
    $input: DeleteUsuarioAventuraInput!
  ) {
    deleteUsuarioAventura(input: $input) {
      id
    }
  }
`;


// Variable para los meses
export const meses = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
]

export const mayusFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}


export const createUsuario = async (attributes, unathenticated, username) => {
  // Si no esta autenticado se crea con api key y el ownerfield se asigna para poder modificar
  const inputUsuario = {
    nombre: attributes.name ? attributes.name : attributes.nickname,
    apellido: attributes.family_name ? attributes.family_name : null,
    id: attributes.sub,
    foto: attributes.picture ? attributes.picture : null,
    nickname: attributes.nickname,
    owner: username ? username : attributes.sub,
  }

  await API.graphql({
    query: crearUsr, variables: {
      input: inputUsuario
    }
    , authMode: 'API_KEY'
  }).then(r => {


    // Notificacion de bienvenida con apikey
    API.graphql({
      query: crearNotificacion, variables: {
        input: {
          tipo: TipoNotificacion.BIENVENIDA,

          titulo: "Velpa adventures",
          descripcion: (attributes.name ? attributes.name : attributes.nickname) + " gracias por registrarte en Velpa.\nAqui vas a encontrar experiencias increibles",

          usuarioID: attributes.sub,
          owner: username ? username : attributes.sub,
        }
      }
      , authMode: 'API_KEY'
    })
      .then(r => {
        // console.log("Resultado notificacion bienvenida:", r)
      })
      .catch(e => {
        console.log("Error creando notificacion bienvenida", e)
      })

    return r.data.createUsuario
  })
    .catch(e => {
    })


}


export async function handleGoogle() {
  Auth.federatedSignIn({ provider: "Google" })
    .catch(e => {
      Alert.alert("Error", "Error iniciando sesion con google")
      console.log(e)
    })
}

export function comisionStripe(total) {
  // Se calcula con el 3.6 % del precio original +3$ y un 16% de iva

  return (total * 3.6 / 100 + 3) * 1.16

}


export const formatDate = (ms) => {
  const date = new Date(ms)

  if (!ms) {
    return ("    -  -    ");

  }
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();
  return (yyyy + '-' + mm + '-' + dd);

}

export function paramExist(param) {
  return (param !== undefined || param !== null || param !== 0)
}

export const formatDateShort = (msInicial, msFinal) => {
  const dateInicial = new Date(msInicial)

  var ddInicial = String(dateInicial.getDate())
  var mmInicial = String(dateInicial.getMonth())

  if (msFinal) {
    const dateFinal = new Date(msFinal)

    var ddFinal = String(dateFinal.getDate())
    var mmFinal = String(dateFinal.getMonth())

    // Si es de un solo dia se regresa un numero
    if (ddFinal === ddInicial && mmInicial === mmFinal) {
      return (ddInicial + " " + meses[mmInicial]);

    }

    // Si los meses son iguales se pone sin 2 veces un mes
    if (mmInicial === mmInicial) {
      return (ddInicial + " - " + ddFinal + " " + meses[mmInicial]);

    } else {
      return (ddInicial + " " + meses[mmInicial] + " - " + ddFinal + " " + meses[mmFinal]);

    }

  } else {
    return (ddInicial + " " + meses[mmInicial]);
  }
}

export const formatDateWithHour = (msInicial, msFinal) => {
  const dateInicial = new Date(msInicial)

  const ddInicial = String(dateInicial.getDate())
  const mmInicial = String(dateInicial.getMonth())


  // Fecha final
  const dateFinal = new Date(msFinal)

  const ddFinal = String(dateFinal.getDate())
  const mmFinal = String(dateFinal.getMonth())



  // Si es de un solo dia se regresa un numero con su hora inicial y final
  if (ddFinal === ddInicial && mmInicial === mmFinal) {
    return {
      txt: (ddInicial + " " + meses + [mmInicial] + " de " + formatAMPM(msInicial) + " a " + formatAMPM(msFinal)),
      mismoDia: true
    }

  }

  else {
    return {
      txtInicial: ddInicial + " " + meses[mmInicial] + " a las " + formatAMPM(msInicial),
      txtFinal: ddFinal + " " + meses[mmFinal] + " a las " + formatAMPM(msFinal),
      mismoDia: false
    }
  }
}



export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        picture
        newMessages
        lastMessage
        fechaID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Mensajes {
          nextToken
          startedAt
        }
        Participantes {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;


export const getBlob = async (uri) => {
  return (await fetch(uri)).blob()
    .then(response => {
      console.log(JSON.parse(JSON.stringify(response))._data.size / 1000000, "mb")
      return response
    })
    .catch(e => {
      console.log(e)
      Alert.alert("Error", "Error obteniendo el blob")
      return e
    })
}


export function isUrl(str) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return regexp.test(str);
}

export function RFCValido(str) {
  var regexp = /^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)(\w{2})([A|a|0-9]{1}))$|^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$/
  return regexp.test(str);
}

export function emailValido(email) {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());



}


export const redondear = (numero, entero) => {
  if (!numero) return 0
  numero = Math.round(numero / entero) * entero

  return numero
}

export const redondearNDecimales = (numero, entero) => {
  if (!numero) return 0
  numero = Math.round(numero * 10 ** entero) / 10 ** entero

  return numero
}


export function formatTelefono(input) {
  if (!input) return

  // Strip all characters from the input except digits
  input = input.replace(/\D/g, '');

  // Trim the remaining input to ten characters, to preserve phone number format
  input = input.substring(0, 10);

  // Based upon the length of the string, we add formatting as necessary
  var size = input.length;
  if (size == 0) {
    input = input;
  } else if (size < 4) {
    input = input;
  } else if (size < 7) {
    input = input.substring(0, 3) + ' ' + input.substring(3, 6);
  } else {
    input = input.substring(0, 3) + ' ' + input.substring(3, 6) + ' ' + input.substring(6, 10);
  }
  return input;
}

export function formatCuentaCLABE(input) {
  if (!input) return
  // Strip all characters from the input except digits
  input = input.replace(/\D/g, '');

  // Trim the remaining input to eighteen characters
  input = input.substring(0, 18);

  // Based upon the length of the string, we add formatting as necessary
  var size = input.length;
  if (size == 0) {
    input = input;
  } else if (size < 4) {
    input = input;
  } else if (size < 7) {
    input = input.substring(0, 3) + ' ' + input.substring(3, 6);
  } else if (size < 18) {
    input = input.substring(0, 3) + ' ' + input.substring(3, 6) + ' ' + input.substring(6, 17);
  } else {
    input = input.substring(0, 3) + ' ' + input.substring(3, 6) + ' ' + input.substring(6, 17) + " " + input.substring(17, 18)
  }
  return input;
}


export const obtenerAventurasParaMapa = async () => {
  return await DataStore.query(Aventura,
    ave => ave.estadoAventura.eq('AUTORIZADO')
  )
    .then(async r => {

      // Sortear de izquierda a derecha en el mapa
      r = r.sort((a, b) => {
        const {
          latitude: latitudeA,
          longitude: longitudeA
        } = a.coordenadas
        const {
          latitude: latitudeB,
          longitude: longitudeB
        } = b.coordenadas
        const roundA = Math.floor(latitudeA)
        const roundB = Math.floor(latitudeB)

        if (roundA === roundB) {
          return (latitudeA < latitudeB)

        } else {
          return (longitudeA > longitudeB)

        }
      })

      r = await Promise.all(r.map(async ave => {
        // Obtener urls de Storage
        const imagenDetalle = await Promise.all(ave.imagenDetalle.map(async (e, i) => {

          // Solo obtener la imagen de fondo
          if (i === ave.imagenFondoIdx) {
            return await getImageUrl(e)

          }
          return e
        }
        ))
        return {
          ...ave,
          imagenDetalle
        }
      }))

      return (r)
    })
    .catch(e => {
      Alert.alert("Error obteniendo aventura")
      console.log(e)
    })

}

export const listSolicitudes = /* GraphQL */ `
  query listSolicitudGuias(
    $sub:ID
  ){
    listSolicitudGuias (filter: {usuarioID: {eq: $sub}}){
      items {
        id
        status
        mensaje
        evaluadorID
        _deleted
        Aventuras {
          items {
            aventura {
              id
              titulo
              imagenDetalle
              imagenFondoIdx
            }
          }
        }
        createdAt
      }
    }
  }
`;

export const listAventurasAutorizadas = async (maxItems, page) => {
  const ave = await DataStore.query(Aventura,
    // Pedir solo las aventuras ya verificadas
    c => c.estadoAventura.eq("AUTORIZADO"),
    {
      limit: maxItems,
      page,
    })
    .then(async r => {

      r = await Promise.all(r.map(async ave => {
        // Obtener urls de Storage
        const imagenDetalle = await Promise.all(ave.imagenDetalle.map(async e => ({
          uri: await getImageUrl(e),
          key: e
        }
        )))

        return {
          ...ave,
          imagenDetalle,
        }
      }))
      return r
    })
    .catch(e => {
      Alert.alert("Error", "Error obteniendo aventuras")
      console.log(e)
    })

  return ave

}

export const isVideo = (e) => {
  return e.endsWith(".mp4")

}
export const distancia2Puntos = function (lat1, lon1, lat2, lon2) {
  const rad = (x) => { return x * Math.PI / 180; }
  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad(lat2 - lat1);
  var dLong = rad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; //Retorna tres decimales
}


export const listAventurasSugeridas = async (id, maxItems, aventuraBase) => {
  const ave = await DataStore.query(Aventura,
    // Pedir solo las aventuras ya verificadas
    c => c.and(
      c => [
        c.estadoAventura.eq("AUTORIZADO"),
        c.id.ne(id),
      ]
    )
  )
    .then(async r => {
      const { coordenadas: { latitude: latBase, longitude: longBase } } = aventuraBase

      r = r
        // Agregar distancia a la aventura base
        .map(e => {
          const { coordenadas: { latitude: lat, longitude: long } } = e
          const distanceToOrigin = distancia2Puntos(lat, long, latBase, longBase)
          return {
            ...e,
            distanceToOrigin
          }

        })
        // Filtrar si es la aventura base
        .filter(e => e.id !== id)
        .sort((a, b) => a.distanceToOrigin - b.distanceToOrigin)
        // Primeros max items+1 por la aventura base
        .slice(0, maxItems)


      r = await Promise.all(r.map(async ave => {
        // Obtener urls de Storage
        const imagenDetalle = await Promise.all(ave.imagenDetalle.map(async e => ({
          uri: await getImageUrl(e),
          key: e
        }
        )))

        return {
          ...ave,
          imagenDetalle
        }
      }))
      return r
    })
    .catch(e => {
      Alert.alert("Error", "Error obteniendo aventuras")
      console.log(e)
    })

  return ave

}

export const getAventura = async (id) => {

  const ave = await DataStore.query(Aventura, id)
    .then(async ave => {
      if (!ave) return false
      // Obtener urls de Storage
      const imagenDetalle = await Promise.all(ave.imagenDetalle.map(async e => ({
        uri: await getImageUrl(e),
        key: e

      })))
      return {
        ...ave,
        imagenDetalle
      }

    })
    .catch(e => {
      Alert.alert("Error", "Error obteniendo aventura")
      console.log(e)
    })

  return ave

}

export const getMaterialAventura = /* GraphQL */ `
    query GetAventura($id: ID!) {
    getAventura(id: $id) {
        materialObligatorio
        materialOpcional
        materialAcampada
        materialIncluido
        alimentacion
        }
    }
`;

export const createChatRoomUsuario = /* GraphQL */ `
  mutation CreateChatRoomUsuario(
    $input: CreateChatRoomUsuarioInput!
  ) {
    createChatRoomUsuario(input: $input) {
      id
    }
  }
`;


export const listChatRoomUsuarios = /* GraphQL */ `
  query ListChatRoomUsuarios(
    $filter: ModelChatRoomUsuarioFilterInput
  ) {
    listChatRoomUsuarios(
      filter: $filter
    ) {
      items {
        id
      }
    }
  }
`;

export const getChatRoomHeader = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      name
      picture
      usuarios {
        items {
          usuario {
            id
            nickname
          }
        }
      }
    }
  }
`;


export const getPersonasEnFecha = /* GraphQL */ `
  query GetFecha($id: ID!) {
    getFecha(id: $id) {
      personasTotales
      Reservaciones {
        items {
          personas
        }
      }
    }
  }
`;


export const createReservaciones = /* GraphQL */ `
  mutation CreateReservaciones(
    $input: CreateReservacionesInput!
  ) {
    createReservaciones(input: $input, ) {
      # El retorno debe ser igual al de la subscripcion
      id
      ninos
      personas
      tercera
      total
      fechaID
      adultos
      usuarioID
    }
  }
`;

export const onUpdateChatRoomByID = /* GraphQL */ `
  subscription OnUpdateChatRoomByID($id: String!) {
    onUpdateChatRoomByID(id: $id) {
      id
      name
      picture
      newMessages
      LastMessage {
        id
        content
        createdAt
      }
      usuarios {
        items {
          usuario {
            id
            nickname
          }
        }
      }
    }
  }
`;



export const listReservacionesPorUsuario = /* GraphQL */ `
  query ListReservaciones(
    $usuarioID:ID!
  ) {
    listReservaciones(filter: {usuarioID: {eq:$usuarioID}}) {
      items {
        adultos
        comisionPorPersona
        id
        ninos
        personas
        tercera
        total
      }
    }
  }
`;


export const onCreateReservacionesByFecha = /* GraphQL */ `
  subscription OnCreateReservacionesByFecha($fechaID: String!) {
    onCreateReservacionesByFecha(fechaID: $fechaID) {
      id
      ninos
      personas
      tercera
      total
      fechaID
      adultos
      usuarioID
    }
  }
`;


export const getGuiasAutorizados = /* GraphQL */ `
  query GetAventura($id: ID!,$sub:ID!) {
    getAventura(id: $id) {
      usuariosAutorizados (usuarioID: {eq: $sub}) {
          items {
            usuario{
              capacidadMaxima
          }
        }
      }        
    }
  }
`;


export const onUpdateFechasByAventura = /* GraphQL */ `
  subscription OnUpdateFechasByAventura($aventuraID: String!) {
    onUpdateFechasByAventura(aventuraID: $aventuraID) {
        id
        personasTotales
        fechaInicial
        fechaFinal
        precio
        aventuraID
        guiaID
        comision
        denyNinos
        denyTercera
        chatroomID
    }
  }
`;

export const onDeleteFechasByAventura = /* GraphQL */ `
  subscription OnDeleteFechasByAventura($aventuraID: String!) {
    onDeleteFechasByAventura(aventuraID: $aventuraID) {
      id
    }
  }
`;

export const listFechasConReservacion = /* GraphQL */ `
  query ListFechas(
    $filter: ModelFechaFilterInput
  ) {
    listFechas(filter: $filter) {
      items {
        id
        personasTotales
        fechaInicial
        fechaFinal
        precio
        aventuraID
        guiaID
        comision
        denyNinos
        denyTercera
        chatroomID
        Reservaciones{
            items {
                personas
                total
            }
        }
      }
    }
  }
`;

export const listFechasConReservacionPorUsuario = /* GraphQL */ `
  query ListFechas(
    $fechaActual:String!
    $usuarioID:ID!
  ) {
    listFechas(filter: {fechaInicial:{ge:$fechaActual}}) {
      items {
        id
        fechaInicial
        fechaFinal
        comision
        Guia {
          items {
            nickname
          }
        }
        Reservaciones(filter:{usuarioID:{eq:$usuarioID}}){
            items {
                adultos
                ninos
                tercera
                total
            }
        }
      }
    }
  }
`;

export const getNicknameUsuario = /* GraphQL */ `
  query GetUsuario($id: ID!) {
    getUsuario(id: $id) {
      nickname
    }
  }
`;

export const getChatsUsuario = /* GraphQL */ `
  query GetUsuario($id: ID!) {
    getUsuario(id: $id) {
      chatRooms {
        items {
          chatroom {
            id
            newMessages
            picture
            name
            LastMessage {
              audio
              content
              createdAt
              id
              image
            }
            usuarios {
              items {
                usuario {
                  id
                  nickname
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getStripeIDUsuario = /* GraphQL */ `
  query GetUsuario($id: ID!) {
    getUsuario(id: $id) {
      stripeID
    }
  }
`;


export const getChatRoomMessages = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      Messages {
        items {
          id
          content
          usuarioID
          createdAt
        }
      }
    }
  }
`;

export const getStripeIDGuia = /* GraphQL */ `
  query GetFecha($id: ID!) {
    getFecha(id: $id) {
      Guia {
        items {
          stripeID
        }
      }
    }
  }
`;

export const createFecha = /* GraphQL */ `
  mutation CreateFecha(
    $input: CreateFechaInput!
    $condition: ModelFechaConditionInput
  ) {
    createFecha(input: $input, condition: $condition) {
      id
    }
  }
`;


export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
  ) {
    createChatRoom(input: $input) {
      id
    }
  }
`;


/* Funcion que toma una fecha y devuelve un objeto con
personas Reservadas o en caso de haber un total pagado por ellos*/
export function asignarReservaciones(fecha) {

  let reservaciones = fecha.Reservaciones.items
  let personasReservadas = 0
  let total = 0
  // Si no hay reservaciones, personas reservadas = 0
  if (reservaciones.length === 0) {
    return { ...fecha, personasReservadas }
  }

  /* Si hay reservaciones se iteran y se suman a
  las variables*/
  else {
    reservaciones.map(reserva => {
      personasReservadas += reserva.personas
      total += reserva.total
    })
    return {
      ...fecha,
      personasReservadas,
      total,
    }
  }
}

// Funcion que calcula el precio dependiendo de el numero de personas
export function calculatePrice(precioIndividual, total, personasReservadas) {
  const sumaPersonas = personasReservadas ? total + personasReservadas : total
  return precioIndividual

  if (personasReservadas === sumaPersonas) {
    return precioIndividual
  }

  switch (sumaPersonas) {
    case 0:
      return precioIndividual
    case 1:

      return precioIndividual * 2.52

    case 2:
      return precioIndividual * 1.6

    case 3:
      return precioIndividual * 1.2

    default:
      return precioIndividual
  }
}

export function formatAMPM(dateInMs, hideAMPM) {

  const date = new Date(dateInMs)
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;


  var strTime = hours + ':' + minutes;

  !hideAMPM ? strTime += " " + ampm : null


  return strTime;
}

let numberOfFetchs = 0

export async function getImageUrl(data) {
  if (data && !isUrl(data)) {
    numberOfFetchs += 1
    // console.log({
    //   "fetchN°": numberOfFetchs,
    //   data
    // })
  }

  return data ? isUrl(data) ? data : await Storage.get(data) : null

}

export function formatMoney(num, hideCents) {
  if (!num) {
    num = 0
  }

  return '$' + num?.toFixed(hideCents ? 0 : 2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')


}

export async function sendAdminNotification({
  titulo,
  descripcion,
  usuarioID
}) {
  const admins = await DataStore.query(Usuario, usr => usr.admin.eq(true))

  const sender = await DataStore.query(Usuario, usuarioID)

  descripcion = "@" + sender.nickname + ": " + descripcion

  admins.map(usr => {
    const { notificationToken, owner, id } = usr

    DataStore.save(new Notificacion({
      tipo: TipoNotificacion.ADMIN,

      titulo,
      descripcion,

      showAt: new Date().getTime(),

      usuarioID: id,
      owner

    }))

    sendPushNotification({
      title: titulo,
      descripcion,
      token: notificationToken
    })
  })
}

export const levels = {
  1: {
    lvl: 1,
    expBaseLevel: 0,
    expNextLevel: 150,

    comisionVelpa: 0.20,
  },

  2: {
    lvl: 2,
    expBaseLevel: 150,
    expNextLevel: 300,

    comisionVelpa: 0.15,
  },

  3: {
    lvl: 3,
    expBaseLevel: 300,
    expNextLevel: 999,

    comisionVelpa: 0.10,
  },

}



export function calculateLvl(experience) {
  if (!experience) {
    return levels[1]
  }

  if (experience < levels[2].expBaseLevel) {
    return levels[1]
  }

  else if (experience < levels[3].expBaseLevel) {
    return levels[2]
  }

  else {
    return levels[3]
  }

}

export function updateItinerario(itinerario, horaInicial, horaFinal) {
  itinerario = JSON.parse(itinerario)

  itinerario = itinerario.map((it, idx) => {
    if (idx === 0) {
      // Cambiar hora inicial del primer elemento
      return {
        ...it,
        hora: horaInicial
      }
    }
    if (idx === itinerario.length - 1) {
      // Cambiar hora inicial del primer elemento
      return {
        ...it,
        hora: horaFinal
      }
    }
    return {
      ...it,
      hora: (horaInicial + msInMinute * idx) < horaFinal ? (horaInicial + msInMinute * idx) : horaFinal
    }

  })
  itinerario[itinerario.length - 1].hora = horaFinal

  Alert.alert("Atencion", "El itinerario ha cambiado")
  itinerario = JSON.stringify(itinerario)

  return (itinerario)

}

export function calculateComision(experience) {
  return calculateLvl(experience).comisionVelpa

}

export function calculateExpPerPerson(precio) {
  let exp = 0

  if (!precio) {
    return exp
  }

  if (precio < 150 && precio >= 20) {
    exp = 1
  }

  if (precio < 400) {
    exp = 2
  }

  if (precio >= 400) {
    exp = 3
  }

  for (let index = 500 + 400; index <= precio; index += 500) {
    exp++
  }

  return exp


}

export async function getPlaceElevation(latitude, longitude) {
  const url = `https://maps.googleapis.com/maps/api/elevation/json?&locations=${latitude}%2C${longitude}&key=${mapPlacesKey}`
  return Math.round(await fetch(url)
    .then(r => {
      return r.json()
        .then(r => {
          if (r.status !== "OK") {
            console.log(r)
            return null
          } else {
            return r.results[0].elevation

          }
        })

    }))

}

export const msInDay = 86400000

export const comision = .20

export const abrirEnGoogleMaps = (link) => {
  if (!link) {
    Alert.alert("Error", "No se existe link de la ubicacion")

    return
  }

  Linking.canOpenURL(link).then(r => {
    if (r) {
      Alert.alert("Ir a google maps", "¿Deseas abrir el link?", [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => Linking.openURL(link)
        },
      ])
    } else {
      Alert.alert("Error", "No se puede abrir el link de la ubicacion, favor de reportarlo a los desarrolladores")

    }


  })
}
export const defaultLocation = {
  latitude: 21.76227198730249,
  longitude: -104.03593288734555,
  latitudeDelta: 32.71611359157346,
  longitudeDelta: 60.73143247514963,
}


// Buscar un lugar por su place id o por su geometria
export async function googleMapsSearchPlace(place_id) {
  let url = `https://maps.googleapis.com/maps/api/place/details/json?fields=geometry,url,name&placeid=${place_id}&key=${mapPlacesKey}`


  return await fetch(url)
    .then(r => {
      return r.json()
        .then(r => {
          r = r.result
          const { lat: latitude, lng: longitude } = r.geometry.location
          const latitudeDelta = Math.abs(r.geometry.viewport.northeast.lat - r.geometry.viewport.southwest.lat)
          const longitudeDelta = Math.abs(r.geometry.viewport.northeast.lng - r.geometry.viewport.southwest.lng)

          return ({
            ubicacionLink: r.url,
            ubicacionNombre: r.name,
            ubicacionId: place_id,

            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
          })
        })
    })


}

export const formatDia = (ms) => {
  const fecha = new Date(ms)

  let mes = fecha.getMonth()
  let dia = fecha.getDate()

  switch (mes) {
    case 0:
      mes = "ene"
      break;
    case 1:
      mes = "feb"
      break;
    case 2:
      mes = "mar"
      break;
    case 3:
      mes = "abr"
      break;
    case 4:
      mes = "may"
      break;
    case 5:
      mes = "jun"
      break;
    case 6:
      mes = "jul"
      break;
    case 7:
      mes = "ago"
      break;
    case 8:
      mes = "sep"
      break;
    case 9:
      mes = "oct"
      break;
    case 10:
      mes = "nov"
      break;
    case 11:
      mes = "dic"
      break;

    default:
      break;
  }

  return (dia + " " + mes)
}


export const formatDiaMesCompeto = (ms) => {
  const fecha = new Date(ms)

  let mes = fecha.getMonth()
  let dia = fecha.getDate()

  switch (mes) {
    case 0:
      mes = "ENERO"
      break;
    case 1:
      mes = "FEBRERO"
      break;
    case 2:
      mes = "MARZO"
      break;
    case 3:
      mes = "ABRIL"
      break;
    case 4:
      mes = "MAYO"
      break;
    case 5:
      mes = "JUNIO"
      break;
    case 6:
      mes = "JULIO"
      break;
    case 7:
      mes = "AGOSTO"
      break;
    case 8:
      mes = "SEPTIEMBRE"
      break;
    case 9:
      mes = "OCTUBRE"
      break;
    case 10:
      mes = "NOVIEMBRE"
      break;
    case 11:
      mes = "DICIEMBRE"
      break;

    default:
      break;
  }

  return (dia + " " + mes)
}



export async function obtenerUriImagenesGuia(data) {
  let fotos
  fotos = []


  // Obtener ID
  if (data.ID) {
    await Promise.all(
      data.ID.map(async (foto, i) => {
        fotos.push({
          url: await getImageUrl(foto),
          titulo: ("Identificacion" + (i ? " reverso" : " frente"))
        })
      })
    )
  }

  // Obtener selfie
  if (data.selfie) {
    fotos.push({
      url: await getImageUrl(data.selfie),
      titulo: ("Selfie")
    })
  }

  // Certificaciones
  if (data.certificaciones) {
    await Promise.all(data.certificaciones.map(async (e, i) => {

      fotos.push({
        url: await getImageUrl(e),
        titulo: ("Certificacion " + (i + 1))
      })

    }))

  }

  return fotos
}

export const categorias = [...Object.keys(Categorias)].map(e => {
  let icono
  let titulo

  switch (e) {
    case Categorias.ALPINISMO:
      titulo = "Alpinismo"
      break;

    case Categorias.CICLISMO:
      titulo = "Ciclismo"
      break;

    case Categorias.MOTO:
      titulo = "Moto"
      break;

    case Categorias.SKI:
      titulo = "Ski"
      break;

    case Categorias.SURF:
      titulo = "Surf"
      break;

    default:
      titulo = "Otros"
      break;
  }
  icono = (color, size) => renderCategoIcon(e, size, color)
  return {
    titulo,
    icono
  }

})



export function renderCategoIcon(categoria, size, color) {
  switch (categoria) {
    case Categorias.ALPINISMO:
      return < Foundation
        name="mountains"
        size={!size ? 25 : size}
        color={color}
      />

    case Categorias.CICLISMO:
      return <MaterialIcons
        name="directions-bike"
        size={!size ? 25 : size}
        color={color}

      />

    case Categorias.MOTO:
      return <MaterialIcons
        name="sports-motorsports"
        size={!size ? 25 : size}
        color={color}

      />

    case Categorias.SKI:
      return <MaterialCommunityIcons
        name="ski"
        size={!size ? 25 : size}
        color={color}

      />

    case Categorias.SURF:
      return <MaterialCommunityIcons
        name="surfing"
        size={!size ? 25 : size}
        color={color}

      />

    default:
      return <Entypo
        name="dots-three-horizontal"
        size={!size ? 25 : size}
        color={color}

      />
  }
}
/***
 * Funcion que devuelve si una categoria esta seleccionada y el elemento es de esa
 *  @param newCategoriasSelect Lista de booleanos ([true,false,true]) de categoria en el orden que se requiere
 *  @param categoria Categoria actual del elemento a comparar si mostrarlo
 */

export const catFilter = (newCategoriasSelect, categoria) => (
  // ALPINISMO
  (newCategoriasSelect[0] && categoria === Categorias.ALPINISMO) ||

  // CICLISMO
  (newCategoriasSelect[1] && categoria === Categorias.CICLISMO) ||

  // MOTO
  (newCategoriasSelect[2] && categoria === Categorias.MOTO) ||

  // SKI
  (newCategoriasSelect[3] && categoria === Categorias.SKI) ||

  // SURF
  (newCategoriasSelect[4] && categoria === Categorias.SURF) ||

  // OTROS
  (newCategoriasSelect[5] && categoria === Categorias.OTROS)
)


export function enumToArray(enumme) {
  return Object.keys(enumme).map(
    (name) => enumme[name]
  );
}


export const abrirStripeAccount = async (stripeID) => {
  const url = "https://dashboard.stripe.com/connect/accounts/" + stripeID
  return await WebBrowser.openBrowserAsync(url)
}

export const googleSearch = async (word) => {
  const url = "https://www.google.com.mx/search?q=" + word
  return await WebBrowser.openBrowserAsync(url)
}

export const openLink = async (link) => {
  return await WebBrowser.openBrowserAsync(link)
}

// Colores
export const colorFondo = "#E5E5E5"
export const moradoClaro = '#1ed095'
export const tinto = '#ba1b50'
export const moradoOscuro = '#1BBA85'
export const verdeTurquesa = '#1BBA85'
// export const salmon = '#FF8E72'

export const shadowMarcada = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 11,
  },
  shadowOpacity: 0.57,
  shadowRadius: 15.19,

  elevation: 23,

}


export const verificarUbicacion = async () => {

  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log("Permisos no obtenidos para la ubicacion")

    return false;
  } else {
    return true
  }

}

export const mapPlacesKey = "AIzaSyASRPj50_15Bf4VUPgrR33DZ5ywiKDYZqg"


export const shadowMedia = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.29,
  shadowRadius: 4.65,

  elevation: 7,
}

export const container = {
  flex: 1,
  backgroundColor: colorFondo,
  padding: 20,
}

export const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export const openCameraPickerAsync = async (aspect, quality) => {
  // Poner en los limites
  quality = quality < 0 || quality > 1 ? 1 : quality
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync()

  if (permissionResult.granted === false) {
    Alert.alert("Error", "Los permisos para acceder a la camara son requeridos para seleccionar imagen")
    await ImagePicker.requestCameraPermissionsAsync()
    return false
  }

  let camResult

  // Si se le paso un aspect ratio, respetarlo
  if (aspect) {
    camResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect,

    })

  } else {
    camResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
    })

  }

  if (camResult.cancelled === true) {
    return false;
  }
  else {
    // Comprimir la imagen
    camResult = await ImageManipulator.manipulateAsync(
      camResult.uri,
      [
        {
          resize: {
            width: 1000
          }
        }
      ],
      { compress: quality, }
    );

    return (camResult)
  }
}

export const openImagePickerAsync = async (denyVideos, aspect, quality) => {
  await ImagePicker.requestMediaLibraryPermissionsAsync()
  let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync()

  if (permissionResult.granted === false) {
    Alert.alert("Los permisos para acceder al carrete son requeridos para seleccionar imagen")
    await ImagePicker.requestMediaLibraryPermissionsAsync()
    return false
  }

  let pickerResult
  if (aspect) {
    pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: denyVideos ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect,
    })
  } else {
    pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: denyVideos ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    })
  }

  if (pickerResult.cancelled === true) {
    return false;
  }
  else {
    // Si se le paso un modificador a la calidad se comprime la imagen

    if (!!quality && quality > 0 && quality < 1) {
      pickerResult = await ImageManipulator.manipulateAsync(
        pickerResult.uri,
        [
          {
            resize: {
              width: 1000
            }
          }
        ],
        { compress: quality, }
      );

    }

    return (pickerResult)
  }
}

export const getUserSub = async () => {
  return await Auth.currentAuthenticatedUser()
    .then(user => {
      return user.attributes.sub
    })
    .catch(e => console.log(e))
}



export async function uploadImageToStripe(uri) {
  // Check selected image is not null
  if (!!uri) {

    const data = new FormData();
    data.append("purpose", "identity_document");
    data.append("file", {
      name: "image",
      type: "image/jpg",
      uri:
        Platform.OS === "android"
          ? uri
          : uri.replace("file://", "")
    });

    // Change file upload URL
    var url = "https://files.stripe.com/v1/files";

    let res = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "Authorization": "Bearer " + STRIPE_PUBLISHABLE_KEY,
      }
    })
    let responseJson = await res.json()

    if (!responseJson?.error) {
      return responseJson.id
    } else {
      console.log(responseJson)
      throw new Error(responseJson)
    }
  } else {
    // Validation Alert
    console.log("Selecciona una imagen");
  }
};

export async function fetchAsociatedStripeIds(idPago) {
  console.log(STRIPE_GET_INFOPAYMENT)
  return fetch(
    `https://api.stripe.com/v1/payment_intents/${idPago}`
    , {
      method: "get",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization":
          "Bearer " +
          STRIPE_GET_INFOPAYMENT,
        "Accept": "application/json",
      },
    }
  )
    .then((r) => r.json())
    .then((r) => {
      if (r.has_more) {
        Alert.alert("Atencion", "Faltan elementos para cancelar, avisa al desarrollador");
      }
      if (r.error) {
        console.log(r);
        Alert.alert("Error", "Ocurrio un error obteniendo el pago");
        return;
      }

      const otherFees = JSON.parse(r.metadata.otherFees)
      const transferID = r.charges.data[0].transfer
      const fee = {
        id: r.charges.data[0].application_fee,
        amount: r.charges.data[0].application_fee_amount,

      }


      return ({
        otherFees,
        transferID,
        fee,
      })

    });
}

export const formatCalificacion = (cal) => {
  return cal?.toFixed(1)

}

export async function cancelTransfer(idTransfer) {
  return fetch(
    `https://api.stripe.com/v1/transfers/${idTransfer}/reversals`
    , {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization":
          "Bearer " +
          STRIPE_TRANSFERREVERSAL,
        "Accept": "application/json",
      },
    }
  ).then((r) => r.json())

}



export async function refundPaymentIntent(paymentId, amount) {
  var details = {
    'amount': Math.round(amount * 100),
    'payment_intent': paymentId,
    "refund_application_fee": false,
  };


  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(
    `https://api.stripe.com/v1/refunds`
    , {
      method: "post",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":
          "Bearer " +
          STRIPE_PAYMENTINTENTS,
        "Accept": "application/json",
      },
    }
  ).then((r) => r.json())
}

export async function cancelAppFee(feeId, amount) {
  if (!amount) {
    // Si no hay comision que devolver se cancela la funcion
    return
  }
  var data = "amount=" + String(Math.floor(amount * 100));

  return await new Promise((resolve, reject) => {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("POST", "https://api.stripe.com/v1/application_fees/" + feeId + "/refunds");
    xhr.setRequestHeader("Authorization", "Bearer " + STRIPE_APPFEEREVERSAL);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => reject(xhr.response);
    xhr.send(data);


  })
}

export const AsyncAlert = async (title, body) => new Promise((resolve, reject) => {
  Alert.alert(title, body,
    [
      {
        text: "CANCELAR",
        onPress: () => {
          reject("Cancelada");
        },
      },
      {
        text: "OK",
        onPress: () => {
          resolve("Resuelta");
        },
      },

    ],
  );
});



export const userEsGuia = async () => {
  const sub = await getUserSub()

  const user = await DataStore.query(Usuario, sub)
  if (!!user?.guia) {
    return true
  } else {
    return false
  }

}

export const msInHour = 3600000
export const msInMinute = 60000