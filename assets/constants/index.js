import { API, Auth, Storage } from "aws-amplify";
import { Alert, Linking, Platform } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as ImagePicker from 'expo-image-picker';

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
  return Math.abs((fechaInicial - fechaFinal) / msInDay)

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
  var dd = String(date.getUTCDate()).padStart(2, '0');
  var mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  var yyyy = date.getUTCFullYear();
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
    listSolicitudGuias(filter: {status: {eq:pending}}) {
        items {
          status
          id
          createdAt
          AventurasAVerificar {
            items {
              aventura {
                titulo
                id
              }
            }
        }
        Usuario {
          id
          INE
          licencia
          placaVehiculos
          redSocial
          nickname
          selfie
          sitioWeb
          tarjetaCirculacion
          telefono
          tipo
          capacidadMaxima
          certificaciones
          comentariosAdicionales
          stripeID
        }
      }
    }
  }
`;

export const listSolicitudGuiasVerificadas = /* GraphQL */ `
  query ListSolicitudGuias {
    listSolicitudGuias(filter: {status: {ne:pending}}) {
        items {
          status
          id
          createdAt
          AventurasAVerificar {
            items {
              aventura {
                titulo
                id
              }
            }
        }
        Usuario {
          id
          nickname
          selfie
          telefono
          tipo
          capacidadMaxima
        }
        evaluador {
          id
          nickname
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
  return string.charAt(0).toUpperCase() + string.slice(1)
}


export const createUsuario = (attributes) => {
  var u
  API.graphql({
    query: crearUsr, variables: {
      input: {
        nombre: attributes.name ? attributes.name : attributes.nickname,
        apellido: attributes.family_name ? attributes.family_name : null,
        id: attributes.sub,
        foto: attributes.picture ? attributes.picture : null,
        nickname: "@" + attributes.nickname,
        comentarios: []
      }
    }
  }).then(r => {
    console.log(r)
    u = r.data.createUsuario
    return u
  })
    .catch(e => e)

}

export async function handleGoogle() {
  Auth.federatedSignIn({ provider: "Google" })
    .then(e => {
    })
    .catch(e => {
      Alert.alert("Error", "Error iniciando sesion con google")
      console.log(e)
    })
}
export const listAventurasPorUsuario = /* GraphQL */ `
  query listAventurasPorUsuario ($idGuia:ID!, $now:String){
    listAventuras{
        items {
            id
            titulo
            imagenFondo
            precioMin
            precioMax
            Fechas(filter: {guiaID: {eq: $idGuia}, fechaInicial: {gt: $now}}) {
                items {
                    fechaFinal
                    fechaInicial
                    id
                    personasTotales
                    precio
                    Reservaciones {
                        items {
                            total
                            id
                            personas
                            usuarioID
                        }
                    }
                }
            }
        }
    }}`

export const getSolicitudesUsuario = /* GraphQL */ `
  query GetUsuario($id: ID!) {
    getUsuario(id: $id) {
      solicitudes{
        items{
          status
          createdAt
          id
          comentarios
          AventurasAVerificar{
            items{
              aventura{
                titulo
              }
            }
          }
        }
      }
    }
  }
`;


export const formatDate = (ms) => {
  const date = new Date(ms)

  if (!ms) {
    return ("    -  -    ");

  }
  var dd = String(date.getUTCDate()).padStart(2, '0');
  var mm = String(date.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getUTCFullYear();
  return (yyyy + '-' + mm + '-' + dd);

}

export const formatDateShort = (msInicial, msFinal) => {
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

export const getBlob = async (uri) => {
  return (await fetch(uri)).blob()
    .then(response => {
      console.log("Tamaño: ", JSON.parse(JSON.stringify(response))._data.size / 1000000, "mb")
      return response
    })
    .catch(e => {
      console.log(e)
      Alert.alert("Error", "Error obteniendo el blob")
      return e
    })
}

export const getAventura = /* GraphQL */ `
    query GetAventura($id: ID!) {
    getAventura(id: $id) {
      id
      titulo
      imagenFondo
      imagenDetalle
      precioMin
      precioMax
      duracion
      descripcionCorta
      descripcionLarga
      
      materialObligatorio
      materialOpcional
      materialAcampada
      materialIncluido

      alimentacion
      dificultad
      precioVIP
      descripcionVIP
      
      fechaInicialDisponible
      fechaFinalDisponible

      categoriaID
      ubicacionNombre
      ubicacionLink
      comision
    }
  }
`;

export const createAventura = /* GraphQL */ `
  mutation CreateAventura(
    $input: CreateAventuraInput!
  ) {
    createAventura(input: $input) {
      id
    }
  }
`;


export const updateCategoria = /* GraphQL */ `
  mutation UpdateCategoria(
    $input: UpdateCategoriaInput!
  ) {
    updateCategoria(input: $input) {
      id
    }
  }
`;

export const createCategoria = /* GraphQL */ `
  mutation CreateCategoria(
    $input: CreateCategoriaInput!
    $condition: ModelCategoriaConditionInput
  ) {
    createCategoria(input: $input, condition: $condition) {
      id
    }
  }
`;

export const deleteCategoria = /* GraphQL */ `
  mutation DeleteCategoria(
    $input: DeleteCategoriaInput!
    $condition: ModelCategoriaConditionInput
  ) {
    deleteCategoria(input: $input, condition: $condition) {
      id
    }
  }
`;




export const updateAventura = /* GraphQL */ `
  mutation UpdateAventura(
    $input: UpdateAventuraInput!
    $condition: ModelAventuraConditionInput
  ) {
    updateAventura(input: $input, condition: $condition) {
      id
    }
  }
`;

export const deleteAventura = /* GraphQL */ `
  mutation DeleteAventura(
    $input: DeleteAventuraInput!
    $condition: ModelAventuraConditionInput
  ) {
    deleteAventura(input: $input, condition: $condition) {
      id
    }
  }
`;


export function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

export function isUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}


export const fetchAventura = (aventuraID) => {
  return API.graphql({ query: getAventura, variables: { id: aventuraID } })
    .then(async d => {
      d = d.data.getAventura
      // Obtenemos las uris firmadas de imagenes
      d.imagenDetalle = await Promise.all(d.imagenDetalle.map(async e => {
        const esUrl = !e.startsWith("ave-")
        return {
          uri: esUrl ? e : await Storage.get(e),
          key: e,
          video: e.endsWith(".mp4")
        }
      }))

      d.imagenFondo = {
        uri: !d.imagenFondo.startsWith("ave-") ? d.imagenFondo : await Storage.get(d.imagenFondo),
        key: d.imagenFondo
      }
      return d
    })
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


export const getDetalleFecha = /* GraphQL */ `
  query GetFecha($id: ID!) {
    getFecha(id: $id) {
      fechaInicial
      fechaFinal
      itinerario
      ubicacionNombre
      ubicacionLink
      materialObligatorio
      materialOpcional
      materialAcampada
      alimentacion
      materialIncluido
    }
  }
`;



export const listCategorias = /* GraphQL */ `
  query ListCategorias(
    $filter: ModelCategoriaFilterInput
  ) {
    listCategorias(filter: $filter) {
      items {
        titulo
        id
        foto
        Aventuras {
          items{
            id
            titulo
          }
        }
      }
    }
  }
`;

export const listFechasYReservasCat = /* GraphQL */ `
  query ListCategorias(
    $filter: ModelCategoriaFilterInput
  ) {
    listCategorias(filter: $filter) {
      items {
        titulo
        id
        foto
        Aventuras {
          items {
            id
            titulo
            Fechas {
              items {
                id
                messagingID
                fechaInicial
                fechaFinal
                personasTotales
                precio
                comision
                Reservaciones {
                  items {
                    id
                    personas
                    total
                    comisionPorPersona
                  }
                }
                Guia {
                  items {
                    id
                    nickname
                    telefono
                    capacidadMaxima
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const listCategoriasConGuias = /* GraphQL */ `
  query ListCategorias(
    $filter: ModelCategoriaFilterInput
    $usuarioID: ID!
  ) {
    listCategorias(filter: $filter) {
      items {
        titulo
        foto
        Aventuras {
          items{
            id
            titulo
            usuariosAutorizados(usuarioID: {eq: $usuarioID}){
              items{
                usuarioID
              }
            }
          }
        }
      }
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
export function calculatePrice(precioIndividual, total, comision, personasReservadas) {
  const sumaPersonas = personasReservadas ? total + personasReservadas : total

  !comision ? comision = 1 : comision += 1

  if (personasReservadas === sumaPersonas) {
    return precioIndividual * comision
  }

  switch (sumaPersonas) {
    case 0:
      return precioIndividual * comision
    case 1:

      return precioIndividual * 2.52 * comision

    case 2:
      return precioIndividual * 1.6 * comision

    case 3:
      return precioIndividual * 1.2 * comision

    default:
      return precioIndividual * comision
  }
}

export function formatAMPM(dateInMs, hideAMPM) {
  const date = new Date(dateInMs)

  var hours = date.getUTCHours();
  var minutes = date.getUTCMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;


  var strTime = hours + ':' + minutes;

  !hideAMPM ? strTime += " " + ampm : null


  return strTime;
}

export const msInDay = 86400000

export const comision = .20

export const abrirEnGoogleMaps = (linkUbicacion) => {



  Linking.canOpenURL(linkUbicacion).then(r => {
    if (r) {
      Alert.alert("Ir a google maps", "¿Deseas abrir el link?", [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => Linking.openURL(linkUbicacion)
        },
      ])
    } else {
      Alert.alert("Error", "No se puede abrir el link de la ubicacion, favor de reportarlo a los desarrolladores")

    }


  })
}


export const formatDia = (ms) => {
  const fecha = new Date(ms)

  let mes = fecha.getUTCMonth()
  let dia = fecha.getUTCDate()

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



export async function obtenerUriImagenesGuia(data) {
  let fotos
  fotos = []

  let promises = []
  // Obtener INE
  if (data.INE) {
    const promisesINE = data.INE?.map(e => {
      return (
        Storage.get(e)
      )
    })
    promises.push(
      Promise.all(promisesINE)
        .then(r => {
          r.map((e, i) => {
            fotos.push({
              url: e,
              titulo: ("INE" + (i ? " reverso" : " frente"))
            })
          })
        }))
  }

  // Obtener selfie
  if (data.selfie) {
    promises.push(Storage.get(data.selfie)
      .then(r => fotos.push({
        url: r,
        titulo: "Selfie"
      }))
      .catch(e => console.log(e)))
  }

  // Tarjeta de circulacion
  if (data.tarjetaCirculacion) {
    promises.push(Storage.get(data.tarjetaCirculacion)
      .then(r => fotos.push({
        url: r,
        titulo: "Tarjeta circulacion"
      }))
      .catch(e => console.log(e)))
  }

  // Licencia
  if (data.licencia) {
    const promisesLicencia = data.licencia?.map(e => {
      return (
        Storage.get(e)
      )
    })

    promises.push(Promise.all(promisesLicencia).then(r => {
      r.map((e, i) => {
        fotos.push({
          url: e,
          titulo: ("Licencia" + (i ? " reverso" : " frente"))
        })
      })
    }))

  }

  // Certificaciones
  if (data.certificaciones) {
    const promisesCerts = data.certificaciones?.map(e => {
      return (
        Storage.get(e)
      )
    })

    promises.push(Promise.all(promisesCerts).then(r => {
      r.map((e, i) => {
        fotos.push({
          url: e,
          titulo: ("Certificacion " + (i + 1))
        })
      })
    }))

    return Promise.all(promises)
      .then(r => {
        return fotos
      })
  }
}



export const abrirStripeAccount = async (stripeID) => {
  const url = "https://dashboard.stripe.com/connect/accounts/" + stripeID
  return await WebBrowser.openBrowserAsync(url)
}


// Colores
export const colorFondo = "#E5E5E5"
export const moradoClaro = '#6468C9'
export const moradoOscuro = '#282EC0'
export const verdeTurquesa = '#1BBA85'


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


export const openImagePickerAsync = async (denyVideos) => {
  await ImagePicker.requestMediaLibraryPermissionsAsync()
  let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync()

  if (permissionResult.granted === false) {
    Alert.alert("Los permisos para acceder al carrete son requeridos para seleccionar imagen")
    await ImagePicker.requestMediaLibraryPermissionsAsync()
    return false
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: denyVideos ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.All,
    allowsEditing: true
  })
  if (pickerResult.cancelled === true) {
    return false;
  }
  else {
    return (pickerResult)
  }

}


export const msInHour = 3600000
export const msInMinute = 60000