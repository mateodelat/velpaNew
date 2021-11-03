/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateFechasByAventura = /* GraphQL */ `
  subscription OnUpdateFechasByAventura($aventuraID: String!) {
    onUpdateFechasByAventura(aventuraID: $aventuraID) {
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
export const onDeleteFechasByAventura = /* GraphQL */ `
  subscription OnDeleteFechasByAventura($aventuraID: String!) {
    onDeleteFechasByAventura(aventuraID: $aventuraID) {
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
export const onCreateReservacionesByFecha = /* GraphQL */ `
  subscription OnCreateReservacionesByFecha($fechaID: String!) {
    onCreateReservacionesByFecha(fechaID: $fechaID) {
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
export const onDeleteReservacionesByFecha = /* GraphQL */ `
  subscription OnDeleteReservacionesByFecha($fechaID: String!) {
    onDeleteReservacionesByFecha(fechaID: $fechaID) {
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
export const onCreateMensajeByChatroom = /* GraphQL */ `
  subscription OnCreateMensajeByChatroom($chatroomID: String!) {
    onCreateMensajeByChatroom(chatroomID: $chatroomID) {
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
export const onUpdateChatRoomByID = /* GraphQL */ `
  subscription OnUpdateChatRoomByID($id: String!) {
    onUpdateChatRoomByID(id: $id) {
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
export const onCreateComentario = /* GraphQL */ `
  subscription OnCreateComentario {
    onCreateComentario {
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
export const onUpdateComentario = /* GraphQL */ `
  subscription OnUpdateComentario {
    onUpdateComentario {
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
export const onDeleteComentario = /* GraphQL */ `
  subscription OnDeleteComentario {
    onDeleteComentario {
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
export const onCreateSolicitudGuia = /* GraphQL */ `
  subscription OnCreateSolicitudGuia {
    onCreateSolicitudGuia {
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
export const onUpdateSolicitudGuia = /* GraphQL */ `
  subscription OnUpdateSolicitudGuia {
    onUpdateSolicitudGuia {
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
export const onDeleteSolicitudGuia = /* GraphQL */ `
  subscription OnDeleteSolicitudGuia {
    onDeleteSolicitudGuia {
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
export const onCreateSolicitudAventura = /* GraphQL */ `
  subscription OnCreateSolicitudAventura {
    onCreateSolicitudAventura {
      id
      aventuraID
      solicitudID
      createdAt
      updatedAt
      solicitud {
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
      aventura {
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
    }
  }
`;
export const onUpdateSolicitudAventura = /* GraphQL */ `
  subscription OnUpdateSolicitudAventura {
    onUpdateSolicitudAventura {
      id
      aventuraID
      solicitudID
      createdAt
      updatedAt
      solicitud {
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
      aventura {
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
    }
  }
`;
export const onDeleteSolicitudAventura = /* GraphQL */ `
  subscription OnDeleteSolicitudAventura {
    onDeleteSolicitudAventura {
      id
      aventuraID
      solicitudID
      createdAt
      updatedAt
      solicitud {
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
      aventura {
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
    }
  }
`;
export const onCreateUsuario = /* GraphQL */ `
  subscription OnCreateUsuario {
    onCreateUsuario {
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
export const onUpdateUsuario = /* GraphQL */ `
  subscription OnUpdateUsuario {
    onUpdateUsuario {
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
export const onDeleteUsuario = /* GraphQL */ `
  subscription OnDeleteUsuario {
    onDeleteUsuario {
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
export const onCreateUsuarioAventura = /* GraphQL */ `
  subscription OnCreateUsuarioAventura {
    onCreateUsuarioAventura {
      id
      aventuraID
      usuarioID
      bloqueado
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
      aventura {
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
    }
  }
`;
export const onUpdateUsuarioAventura = /* GraphQL */ `
  subscription OnUpdateUsuarioAventura {
    onUpdateUsuarioAventura {
      id
      aventuraID
      usuarioID
      bloqueado
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
      aventura {
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
    }
  }
`;
export const onDeleteUsuarioAventura = /* GraphQL */ `
  subscription OnDeleteUsuarioAventura {
    onDeleteUsuarioAventura {
      id
      aventuraID
      usuarioID
      bloqueado
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
      aventura {
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
    }
  }
`;
export const onCreateAventura = /* GraphQL */ `
  subscription OnCreateAventura {
    onCreateAventura {
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
export const onUpdateAventura = /* GraphQL */ `
  subscription OnUpdateAventura {
    onUpdateAventura {
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
export const onDeleteAventura = /* GraphQL */ `
  subscription OnDeleteAventura {
    onDeleteAventura {
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
export const onCreateReservaciones = /* GraphQL */ `
  subscription OnCreateReservaciones {
    onCreateReservaciones {
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
export const onUpdateReservaciones = /* GraphQL */ `
  subscription OnUpdateReservaciones {
    onUpdateReservaciones {
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
export const onDeleteReservaciones = /* GraphQL */ `
  subscription OnDeleteReservaciones {
    onDeleteReservaciones {
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
export const onCreateFecha = /* GraphQL */ `
  subscription OnCreateFecha {
    onCreateFecha {
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
export const onUpdateFecha = /* GraphQL */ `
  subscription OnUpdateFecha {
    onUpdateFecha {
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
export const onDeleteFecha = /* GraphQL */ `
  subscription OnDeleteFecha {
    onDeleteFecha {
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
export const onCreateCategoria = /* GraphQL */ `
  subscription OnCreateCategoria {
    onCreateCategoria {
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
export const onUpdateCategoria = /* GraphQL */ `
  subscription OnUpdateCategoria {
    onUpdateCategoria {
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
export const onDeleteCategoria = /* GraphQL */ `
  subscription OnDeleteCategoria {
    onDeleteCategoria {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
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
export const onCreateChatRoomUsuario = /* GraphQL */ `
  subscription OnCreateChatRoomUsuario {
    onCreateChatRoomUsuario {
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
export const onUpdateChatRoomUsuario = /* GraphQL */ `
  subscription OnUpdateChatRoomUsuario {
    onUpdateChatRoomUsuario {
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
export const onDeleteChatRoomUsuario = /* GraphQL */ `
  subscription OnDeleteChatRoomUsuario {
    onDeleteChatRoomUsuario {
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
