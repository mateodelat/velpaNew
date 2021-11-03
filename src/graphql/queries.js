/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComentario = /* GraphQL */ `
  query GetComentario($id: ID!) {
    getComentario(id: $id) {
      id
      calificacion
      resena
      creadorID
      evaluadoID
      createdAt
      updatedAt
    }
  }
`;
export const listComentarios = /* GraphQL */ `
  query ListComentarios(
    $filter: ModelComentarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComentarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        calificacion
        resena
        creadorID
        evaluadoID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSolicitudGuia = /* GraphQL */ `
  query GetSolicitudGuia($id: ID!) {
    getSolicitudGuia(id: $id) {
      id
      creadorID
      evaluadorID
      status
      comentarios
      createdAt
      updatedAt
      AventurasAVerificar {
        items {
          id
          aventuraID
          solicitudID
          createdAt
          updatedAt
        }
        nextToken
      }
      evaluador {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
      Usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
    }
  }
`;
export const listSolicitudGuias = /* GraphQL */ `
  query ListSolicitudGuias(
    $filter: ModelSolicitudGuiaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSolicitudGuias(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        creadorID
        evaluadorID
        status
        comentarios
        createdAt
        updatedAt
        AventurasAVerificar {
          nextToken
        }
        evaluador {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
        Usuario {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getUsuario = /* GraphQL */ `
  query GetUsuario($id: ID!) {
    getUsuario(id: $id) {
      id
      nombre
      apellido
      foto
      nickname
      calificacion
      descripcion
      comentarios
      tipo
      selfie
      INE
      licencia
      comentariosAdicionales
      telefono
      capacidadMaxima
      placaVehiculos
      tarjetaCirculacion
      certificaciones
      sitioWeb
      redSocial
      stripeID
      createdAt
      updatedAt
      evaluaciones {
        items {
          id
          calificacion
          resena
          creadorID
          evaluadoID
          createdAt
          updatedAt
        }
        nextToken
      }
      solicitudes {
        items {
          id
          creadorID
          evaluadorID
          status
          comentarios
          createdAt
          updatedAt
        }
        nextToken
      }
      aventurasAutorizadas {
        items {
          id
          aventuraID
          usuarioID
          bloqueado
          createdAt
          updatedAt
        }
        nextToken
      }
      reservaciones {
        items {
          id
          total
          comisionPorPersona
          personas
          tercera
          adultos
          ninos
          fechaID
          usuarioID
          idPago
          createdAt
          updatedAt
        }
        nextToken
      }
      fechas {
        items {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        nextToken
      }
      chatRooms {
        items {
          id
          usuarioID
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listUsuarios = /* GraphQL */ `
  query ListUsuarios(
    $filter: ModelUsuarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsuarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
      nextToken
    }
  }
`;
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
      alimentacion
      materialIncluido
      dificultad
      precioVIP
      descripcionVIP
      fechaInicialDisponible
      fechaFinalDisponible
      categoriaID
      ubicacionNombre
      ubicacionLink
      comision
      createdAt
      updatedAt
      usuariosAutorizados {
        items {
          id
          aventuraID
          usuarioID
          bloqueado
          createdAt
          updatedAt
        }
        nextToken
      }
      Fechas {
        items {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listAventuras = /* GraphQL */ `
  query ListAventuras(
    $filter: ModelAventuraFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAventuras(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        alimentacion
        materialIncluido
        dificultad
        precioVIP
        descripcionVIP
        fechaInicialDisponible
        fechaFinalDisponible
        categoriaID
        ubicacionNombre
        ubicacionLink
        comision
        createdAt
        updatedAt
        usuariosAutorizados {
          nextToken
        }
        Fechas {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getReservaciones = /* GraphQL */ `
  query GetReservaciones($id: ID!) {
    getReservaciones(id: $id) {
      id
      total
      comisionPorPersona
      personas
      tercera
      adultos
      ninos
      fechaID
      usuarioID
      idPago
      createdAt
      updatedAt
      usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
    }
  }
`;
export const listReservaciones = /* GraphQL */ `
  query ListReservaciones(
    $filter: ModelReservacionesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservaciones(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        total
        comisionPorPersona
        personas
        tercera
        adultos
        ninos
        fechaID
        usuarioID
        idPago
        createdAt
        updatedAt
        usuario {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getFecha = /* GraphQL */ `
  query GetFecha($id: ID!) {
    getFecha(id: $id) {
      id
      personasTotales
      fechaInicial
      fechaFinal
      precio
      comision
      aventuraID
      guiaID
      itinerario
      ubicacionNombre
      ubicacionLink
      denyTercera
      denyNinos
      materialObligatorio
      materialOpcional
      materialAcampada
      alimentacion
      materialIncluido
      chatroomID
      createdAt
      updatedAt
      Guia {
        items {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
        nextToken
      }
      Reservaciones {
        items {
          id
          total
          comisionPorPersona
          personas
          tercera
          adultos
          ninos
          fechaID
          usuarioID
          idPago
          createdAt
          updatedAt
        }
        nextToken
      }
      chatroom {
        id
        name
        picture
        newMessages
        lastMessage
        fechaID
        createdAt
        updatedAt
        fecha {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        LastMessage {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        Messages {
          nextToken
        }
        usuarios {
          nextToken
        }
      }
    }
  }
`;
export const listFechas = /* GraphQL */ `
  query ListFechas(
    $filter: ModelFechaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFechas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        personasTotales
        fechaInicial
        fechaFinal
        precio
        comision
        aventuraID
        guiaID
        itinerario
        ubicacionNombre
        ubicacionLink
        denyTercera
        denyNinos
        materialObligatorio
        materialOpcional
        materialAcampada
        alimentacion
        materialIncluido
        chatroomID
        createdAt
        updatedAt
        Guia {
          nextToken
        }
        Reservaciones {
          nextToken
        }
        chatroom {
          id
          name
          picture
          newMessages
          lastMessage
          fechaID
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getCategoria = /* GraphQL */ `
  query GetCategoria($id: ID!) {
    getCategoria(id: $id) {
      id
      titulo
      foto
      createdAt
      updatedAt
      Aventuras {
        items {
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
          alimentacion
          materialIncluido
          dificultad
          precioVIP
          descripcionVIP
          fechaInicialDisponible
          fechaFinalDisponible
          categoriaID
          ubicacionNombre
          ubicacionLink
          comision
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listCategorias = /* GraphQL */ `
  query ListCategorias(
    $filter: ModelCategoriaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorias(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        titulo
        foto
        createdAt
        updatedAt
        Aventuras {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      content
      usuarioID
      chatroomID
      image
      audio
      createdAt
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        usuarioID
        chatroomID
        image
        audio
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      name
      picture
      newMessages
      lastMessage
      fechaID
      createdAt
      updatedAt
      fecha {
        id
        personasTotales
        fechaInicial
        fechaFinal
        precio
        comision
        aventuraID
        guiaID
        itinerario
        ubicacionNombre
        ubicacionLink
        denyTercera
        denyNinos
        materialObligatorio
        materialOpcional
        materialAcampada
        alimentacion
        materialIncluido
        chatroomID
        createdAt
        updatedAt
        Guia {
          nextToken
        }
        Reservaciones {
          nextToken
        }
        chatroom {
          id
          name
          picture
          newMessages
          lastMessage
          fechaID
          createdAt
          updatedAt
        }
      }
      LastMessage {
        id
        content
        usuarioID
        chatroomID
        image
        audio
        createdAt
        updatedAt
      }
      Messages {
        items {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        nextToken
      }
      usuarios {
        items {
          id
          usuarioID
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
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
        createdAt
        updatedAt
        fecha {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        LastMessage {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        Messages {
          nextToken
        }
        usuarios {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getChatRoomUsuario = /* GraphQL */ `
  query GetChatRoomUsuario($id: ID!) {
    getChatRoomUsuario(id: $id) {
      id
      usuarioID
      chatroomID
      createdAt
      updatedAt
      usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
      chatroom {
        id
        name
        picture
        newMessages
        lastMessage
        fechaID
        createdAt
        updatedAt
        fecha {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        LastMessage {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        Messages {
          nextToken
        }
        usuarios {
          nextToken
        }
      }
    }
  }
`;
export const listChatRoomUsuarios = /* GraphQL */ `
  query ListChatRoomUsuarios(
    $filter: ModelChatRoomUsuarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRoomUsuarios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        usuarioID
        chatroomID
        createdAt
        updatedAt
        usuario {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
        chatroom {
          id
          name
          picture
          newMessages
          lastMessage
          fechaID
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
