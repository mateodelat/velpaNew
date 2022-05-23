/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAventura = /* GraphQL */ `
  subscription OnCreateAventura {
    onCreateAventura {
      id
      createdAt
      updatedAt
      titulo
      imagenFondoIdx
      imagenDetalle
      precioMin
      precioMax
      duracion
      descripcion
      dificultad
      ubicacionNombre
      ubicacionId
      ubicacionLink
      coordenadas
      estadoAventura
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
      materialDefault
      incluidoDefault
      usuarioID
      owner
      SolicitudGuias {
        items {
          id
          createdAt
          updatedAt
          aventuraID
          solicitudguiaID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      UsuariosAutorizados {
        items {
          id
          createdAt
          updatedAt
          aventuraID
          usuarioID
          owner
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Fechas {
        items {
          id
          createdAt
          updatedAt
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          experienciaPorPersona
          itinerario
          puntoReunionNombre
          puntoReunionId
          puntoReunionLink
          puntoReunionCoords
          allowTercera
          allowNinos
          material
          incluido
          titulo
          descripcion
          imagenRuta
          imagenFondo
          tituloAventura
          aventuraID
          usuarioID
          dificultad
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAventura = /* GraphQL */ `
  subscription OnUpdateAventura {
    onUpdateAventura {
      id
      createdAt
      updatedAt
      titulo
      imagenFondoIdx
      imagenDetalle
      precioMin
      precioMax
      duracion
      descripcion
      dificultad
      ubicacionNombre
      ubicacionId
      ubicacionLink
      coordenadas
      estadoAventura
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
      materialDefault
      incluidoDefault
      usuarioID
      owner
      SolicitudGuias {
        items {
          id
          createdAt
          updatedAt
          aventuraID
          solicitudguiaID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      UsuariosAutorizados {
        items {
          id
          createdAt
          updatedAt
          aventuraID
          usuarioID
          owner
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Fechas {
        items {
          id
          createdAt
          updatedAt
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          experienciaPorPersona
          itinerario
          puntoReunionNombre
          puntoReunionId
          puntoReunionLink
          puntoReunionCoords
          allowTercera
          allowNinos
          material
          incluido
          titulo
          descripcion
          imagenRuta
          imagenFondo
          tituloAventura
          aventuraID
          usuarioID
          dificultad
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAventura = /* GraphQL */ `
  subscription OnDeleteAventura {
    onDeleteAventura {
      id
      createdAt
      updatedAt
      titulo
      imagenFondoIdx
      imagenDetalle
      precioMin
      precioMax
      duracion
      descripcion
      dificultad
      ubicacionNombre
      ubicacionId
      ubicacionLink
      coordenadas
      estadoAventura
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
      materialDefault
      incluidoDefault
      usuarioID
      owner
      SolicitudGuias {
        items {
          id
          createdAt
          updatedAt
          aventuraID
          solicitudguiaID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      UsuariosAutorizados {
        items {
          id
          createdAt
          updatedAt
          aventuraID
          usuarioID
          owner
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Fechas {
        items {
          id
          createdAt
          updatedAt
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          experienciaPorPersona
          itinerario
          puntoReunionNombre
          puntoReunionId
          puntoReunionLink
          puntoReunionCoords
          allowTercera
          allowNinos
          material
          incluido
          titulo
          descripcion
          imagenRuta
          imagenFondo
          tituloAventura
          aventuraID
          usuarioID
          dificultad
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateReserva = /* GraphQL */ `
  subscription OnCreateReserva {
    onCreateReserva {
      id
      createdAt
      updatedAt
      total
      comision
      pagadoAlGuia
      tercera
      ninos
      adultos
      pagoID
      ingreso
      horaIngreso
      fechaID
      usuarioID
      guiaID
      tipoPago
      materialChecked
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateReserva = /* GraphQL */ `
  subscription OnUpdateReserva {
    onUpdateReserva {
      id
      createdAt
      updatedAt
      total
      comision
      pagadoAlGuia
      tercera
      ninos
      adultos
      pagoID
      ingreso
      horaIngreso
      fechaID
      usuarioID
      guiaID
      tipoPago
      materialChecked
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteReserva = /* GraphQL */ `
  subscription OnDeleteReserva {
    onDeleteReserva {
      id
      createdAt
      updatedAt
      total
      comision
      pagadoAlGuia
      tercera
      ninos
      adultos
      pagoID
      ingreso
      horaIngreso
      fechaID
      usuarioID
      guiaID
      tipoPago
      materialChecked
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateFecha = /* GraphQL */ `
  subscription OnCreateFecha {
    onCreateFecha {
      id
      createdAt
      updatedAt
      personasTotales
      fechaInicial
      fechaFinal
      precio
      comision
      experienciaPorPersona
      itinerario
      puntoReunionNombre
      puntoReunionId
      puntoReunionLink
      puntoReunionCoords
      allowTercera
      allowNinos
      material
      incluido
      titulo
      descripcion
      imagenRuta
      imagenFondo
      tituloAventura
      aventuraID
      usuarioID
      dificultad
      Reservas {
        items {
          id
          createdAt
          updatedAt
          total
          comision
          pagadoAlGuia
          tercera
          ninos
          adultos
          pagoID
          ingreso
          horaIngreso
          fechaID
          usuarioID
          guiaID
          tipoPago
          materialChecked
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRoom {
        items {
          id
          createdAt
          updatedAt
          name
          picture
          fechaID
          guiaID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateFecha = /* GraphQL */ `
  subscription OnUpdateFecha {
    onUpdateFecha {
      id
      createdAt
      updatedAt
      personasTotales
      fechaInicial
      fechaFinal
      precio
      comision
      experienciaPorPersona
      itinerario
      puntoReunionNombre
      puntoReunionId
      puntoReunionLink
      puntoReunionCoords
      allowTercera
      allowNinos
      material
      incluido
      titulo
      descripcion
      imagenRuta
      imagenFondo
      tituloAventura
      aventuraID
      usuarioID
      dificultad
      Reservas {
        items {
          id
          createdAt
          updatedAt
          total
          comision
          pagadoAlGuia
          tercera
          ninos
          adultos
          pagoID
          ingreso
          horaIngreso
          fechaID
          usuarioID
          guiaID
          tipoPago
          materialChecked
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRoom {
        items {
          id
          createdAt
          updatedAt
          name
          picture
          fechaID
          guiaID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteFecha = /* GraphQL */ `
  subscription OnDeleteFecha {
    onDeleteFecha {
      id
      createdAt
      updatedAt
      personasTotales
      fechaInicial
      fechaFinal
      precio
      comision
      experienciaPorPersona
      itinerario
      puntoReunionNombre
      puntoReunionId
      puntoReunionLink
      puntoReunionCoords
      allowTercera
      allowNinos
      material
      incluido
      titulo
      descripcion
      imagenRuta
      imagenFondo
      tituloAventura
      aventuraID
      usuarioID
      dificultad
      Reservas {
        items {
          id
          createdAt
          updatedAt
          total
          comision
          pagadoAlGuia
          tercera
          ninos
          adultos
          pagoID
          ingreso
          horaIngreso
          fechaID
          usuarioID
          guiaID
          tipoPago
          materialChecked
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRoom {
        items {
          id
          createdAt
          updatedAt
          name
          picture
          fechaID
          guiaID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
      id
      createdAt
      updatedAt
      name
      picture
      lastMessage {
        id
        createdAt
        updatedAt
        content
        usuarioID
        chatroomID
        _version
        _deleted
        _lastChangedAt
      }
      fechaID
      guiaID
      Mensajes {
        items {
          id
          createdAt
          updatedAt
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Participantes {
        items {
          id
          createdAt
          updatedAt
          chatroomID
          usuarioID
          newMessages
          owner
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
      id
      createdAt
      updatedAt
      name
      picture
      lastMessage {
        id
        createdAt
        updatedAt
        content
        usuarioID
        chatroomID
        _version
        _deleted
        _lastChangedAt
      }
      fechaID
      guiaID
      Mensajes {
        items {
          id
          createdAt
          updatedAt
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Participantes {
        items {
          id
          createdAt
          updatedAt
          chatroomID
          usuarioID
          newMessages
          owner
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
      id
      createdAt
      updatedAt
      name
      picture
      lastMessage {
        id
        createdAt
        updatedAt
        content
        usuarioID
        chatroomID
        _version
        _deleted
        _lastChangedAt
      }
      fechaID
      guiaID
      Mensajes {
        items {
          id
          createdAt
          updatedAt
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Participantes {
        items {
          id
          createdAt
          updatedAt
          chatroomID
          usuarioID
          newMessages
          owner
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateMensaje = /* GraphQL */ `
  subscription OnCreateMensaje {
    onCreateMensaje {
      id
      createdAt
      updatedAt
      content
      usuarioID
      chatroomID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateMensaje = /* GraphQL */ `
  subscription OnUpdateMensaje {
    onUpdateMensaje {
      id
      createdAt
      updatedAt
      content
      usuarioID
      chatroomID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteMensaje = /* GraphQL */ `
  subscription OnDeleteMensaje {
    onDeleteMensaje {
      id
      createdAt
      updatedAt
      content
      usuarioID
      chatroomID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateSolicitudGuia = /* GraphQL */ `
  subscription OnCreateSolicitudGuia($owner: String) {
    onCreateSolicitudGuia(owner: $owner) {
      id
      createdAt
      updatedAt
      owner
      status
      evaluadorID
      usuarioID
      mensaje
      Aventuras {
        items {
          id
          createdAt
          updatedAt
          aventuraID
          solicitudguiaID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateSolicitudGuia = /* GraphQL */ `
  subscription OnUpdateSolicitudGuia($owner: String) {
    onUpdateSolicitudGuia(owner: $owner) {
      id
      createdAt
      updatedAt
      owner
      status
      evaluadorID
      usuarioID
      mensaje
      Aventuras {
        items {
          id
          createdAt
          updatedAt
          aventuraID
          solicitudguiaID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteSolicitudGuia = /* GraphQL */ `
  subscription OnDeleteSolicitudGuia($owner: String) {
    onDeleteSolicitudGuia(owner: $owner) {
      id
      createdAt
      updatedAt
      owner
      status
      evaluadorID
      usuarioID
      mensaje
      Aventuras {
        items {
          id
          createdAt
          updatedAt
          aventuraID
          solicitudguiaID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateNotificacion = /* GraphQL */ `
  subscription OnCreateNotificacion($owner: String!) {
    onCreateNotificacion(owner: $owner) {
      id
      createdAt
      updatedAt
      tipo
      titulo
      descripcion
      usuarioID
      imagen
      owner
      leido
      showAt
      reservaID
      fechaID
      aventuraID
      guiaID
      solicitudGuiaID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateNotificacion = /* GraphQL */ `
  subscription OnUpdateNotificacion($owner: String!) {
    onUpdateNotificacion(owner: $owner) {
      id
      createdAt
      updatedAt
      tipo
      titulo
      descripcion
      usuarioID
      imagen
      owner
      leido
      showAt
      reservaID
      fechaID
      aventuraID
      guiaID
      solicitudGuiaID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteNotificacion = /* GraphQL */ `
  subscription OnDeleteNotificacion($owner: String!) {
    onDeleteNotificacion(owner: $owner) {
      id
      createdAt
      updatedAt
      tipo
      titulo
      descripcion
      usuarioID
      imagen
      owner
      leido
      showAt
      reservaID
      fechaID
      aventuraID
      guiaID
      solicitudGuiaID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateComentario = /* GraphQL */ `
  subscription OnCreateComentario {
    onCreateComentario {
      id
      createdAt
      updatedAt
      usuarioCalificadoID
      body
      calificacion
      creatorID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateComentario = /* GraphQL */ `
  subscription OnUpdateComentario {
    onUpdateComentario {
      id
      createdAt
      updatedAt
      usuarioCalificadoID
      body
      calificacion
      creatorID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteComentario = /* GraphQL */ `
  subscription OnDeleteComentario {
    onDeleteComentario {
      id
      createdAt
      updatedAt
      usuarioCalificadoID
      body
      calificacion
      creatorID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreatePublicidad = /* GraphQL */ `
  subscription OnCreatePublicidad {
    onCreatePublicidad {
      id
      createdAt
      updatedAt
      tipo
      titulo
      descripcion
      imagenFondo
      video
      linkAnuncio
      aventuraID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdatePublicidad = /* GraphQL */ `
  subscription OnUpdatePublicidad {
    onUpdatePublicidad {
      id
      createdAt
      updatedAt
      tipo
      titulo
      descripcion
      imagenFondo
      video
      linkAnuncio
      aventuraID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeletePublicidad = /* GraphQL */ `
  subscription OnDeletePublicidad {
    onDeletePublicidad {
      id
      createdAt
      updatedAt
      tipo
      titulo
      descripcion
      imagenFondo
      video
      linkAnuncio
      aventuraID
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateAventuraSolicitudGuia = /* GraphQL */ `
  subscription OnCreateAventuraSolicitudGuia {
    onCreateAventuraSolicitudGuia {
      id
      createdAt
      updatedAt
      aventuraID
      solicitudguiaID
      aventura {
        id
        createdAt
        updatedAt
        titulo
        imagenFondoIdx
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcion
        dificultad
        ubicacionNombre
        ubicacionId
        ubicacionLink
        coordenadas
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
        owner
        SolicitudGuias {
          nextToken
          startedAt
        }
        UsuariosAutorizados {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      solicitudguia {
        id
        createdAt
        updatedAt
        owner
        status
        evaluadorID
        usuarioID
        mensaje
        Aventuras {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAventuraSolicitudGuia = /* GraphQL */ `
  subscription OnUpdateAventuraSolicitudGuia {
    onUpdateAventuraSolicitudGuia {
      id
      createdAt
      updatedAt
      aventuraID
      solicitudguiaID
      aventura {
        id
        createdAt
        updatedAt
        titulo
        imagenFondoIdx
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcion
        dificultad
        ubicacionNombre
        ubicacionId
        ubicacionLink
        coordenadas
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
        owner
        SolicitudGuias {
          nextToken
          startedAt
        }
        UsuariosAutorizados {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      solicitudguia {
        id
        createdAt
        updatedAt
        owner
        status
        evaluadorID
        usuarioID
        mensaje
        Aventuras {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAventuraSolicitudGuia = /* GraphQL */ `
  subscription OnDeleteAventuraSolicitudGuia {
    onDeleteAventuraSolicitudGuia {
      id
      createdAt
      updatedAt
      aventuraID
      solicitudguiaID
      aventura {
        id
        createdAt
        updatedAt
        titulo
        imagenFondoIdx
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcion
        dificultad
        ubicacionNombre
        ubicacionId
        ubicacionLink
        coordenadas
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
        owner
        SolicitudGuias {
          nextToken
          startedAt
        }
        UsuariosAutorizados {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      solicitudguia {
        id
        createdAt
        updatedAt
        owner
        status
        evaluadorID
        usuarioID
        mensaje
        Aventuras {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateAventuraUsuario = /* GraphQL */ `
  subscription OnCreateAventuraUsuario {
    onCreateAventuraUsuario {
      id
      createdAt
      updatedAt
      aventuraID
      usuarioID
      owner
      aventura {
        id
        createdAt
        updatedAt
        titulo
        imagenFondoIdx
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcion
        dificultad
        ubicacionNombre
        ubicacionId
        ubicacionLink
        coordenadas
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
        owner
        SolicitudGuias {
          nextToken
          startedAt
        }
        UsuariosAutorizados {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
      usuario {
        id
        createdAt
        updatedAt
        tipo
        guia
        calificacion
        numResenas
        nombre
        apellido
        foto
        imagenFondo
        nickname
        experience
        stripeID
        admin
        selfie
        ID
        certificaciones
        telefono
        sitioWeb
        CuentaBancaria
        fechaNacimiento
        direccion
        rfcIndividual
        rfcCompania
        capacidadMaxima
        comentariosAdicionales
        notificationToken
        owner
        newMessages
        AventurasAutorizadas {
          nextToken
          startedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        Reservas {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        Notificaciones {
          nextToken
          startedAt
        }
        SolicitudesCreadas {
          nextToken
          startedAt
        }
        Comentarios {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
    }
  }
`;
export const onUpdateAventuraUsuario = /* GraphQL */ `
  subscription OnUpdateAventuraUsuario {
    onUpdateAventuraUsuario {
      id
      createdAt
      updatedAt
      aventuraID
      usuarioID
      owner
      aventura {
        id
        createdAt
        updatedAt
        titulo
        imagenFondoIdx
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcion
        dificultad
        ubicacionNombre
        ubicacionId
        ubicacionLink
        coordenadas
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
        owner
        SolicitudGuias {
          nextToken
          startedAt
        }
        UsuariosAutorizados {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
      usuario {
        id
        createdAt
        updatedAt
        tipo
        guia
        calificacion
        numResenas
        nombre
        apellido
        foto
        imagenFondo
        nickname
        experience
        stripeID
        admin
        selfie
        ID
        certificaciones
        telefono
        sitioWeb
        CuentaBancaria
        fechaNacimiento
        direccion
        rfcIndividual
        rfcCompania
        capacidadMaxima
        comentariosAdicionales
        notificationToken
        owner
        newMessages
        AventurasAutorizadas {
          nextToken
          startedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        Reservas {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        Notificaciones {
          nextToken
          startedAt
        }
        SolicitudesCreadas {
          nextToken
          startedAt
        }
        Comentarios {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
    }
  }
`;
export const onDeleteAventuraUsuario = /* GraphQL */ `
  subscription OnDeleteAventuraUsuario {
    onDeleteAventuraUsuario {
      id
      createdAt
      updatedAt
      aventuraID
      usuarioID
      owner
      aventura {
        id
        createdAt
        updatedAt
        titulo
        imagenFondoIdx
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcion
        dificultad
        ubicacionNombre
        ubicacionId
        ubicacionLink
        coordenadas
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
        owner
        SolicitudGuias {
          nextToken
          startedAt
        }
        UsuariosAutorizados {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
      usuario {
        id
        createdAt
        updatedAt
        tipo
        guia
        calificacion
        numResenas
        nombre
        apellido
        foto
        imagenFondo
        nickname
        experience
        stripeID
        admin
        selfie
        ID
        certificaciones
        telefono
        sitioWeb
        CuentaBancaria
        fechaNacimiento
        direccion
        rfcIndividual
        rfcCompania
        capacidadMaxima
        comentariosAdicionales
        notificationToken
        owner
        newMessages
        AventurasAutorizadas {
          nextToken
          startedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        Reservas {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        Notificaciones {
          nextToken
          startedAt
        }
        SolicitudesCreadas {
          nextToken
          startedAt
        }
        Comentarios {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
    }
  }
`;
export const onCreateChatRoomUsuario = /* GraphQL */ `
  subscription OnCreateChatRoomUsuario {
    onCreateChatRoomUsuario {
      id
      createdAt
      updatedAt
      chatroomID
      usuarioID
      newMessages
      owner
      chatroom {
        id
        createdAt
        updatedAt
        name
        picture
        lastMessage {
          id
          createdAt
          updatedAt
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
        }
        fechaID
        guiaID
        Mensajes {
          nextToken
          startedAt
        }
        Participantes {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
      usuario {
        id
        createdAt
        updatedAt
        tipo
        guia
        calificacion
        numResenas
        nombre
        apellido
        foto
        imagenFondo
        nickname
        experience
        stripeID
        admin
        selfie
        ID
        certificaciones
        telefono
        sitioWeb
        CuentaBancaria
        fechaNacimiento
        direccion
        rfcIndividual
        rfcCompania
        capacidadMaxima
        comentariosAdicionales
        notificationToken
        owner
        newMessages
        AventurasAutorizadas {
          nextToken
          startedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        Reservas {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        Notificaciones {
          nextToken
          startedAt
        }
        SolicitudesCreadas {
          nextToken
          startedAt
        }
        Comentarios {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
    }
  }
`;
export const onUpdateChatRoomUsuario = /* GraphQL */ `
  subscription OnUpdateChatRoomUsuario {
    onUpdateChatRoomUsuario {
      id
      createdAt
      updatedAt
      chatroomID
      usuarioID
      newMessages
      owner
      chatroom {
        id
        createdAt
        updatedAt
        name
        picture
        lastMessage {
          id
          createdAt
          updatedAt
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
        }
        fechaID
        guiaID
        Mensajes {
          nextToken
          startedAt
        }
        Participantes {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
      usuario {
        id
        createdAt
        updatedAt
        tipo
        guia
        calificacion
        numResenas
        nombre
        apellido
        foto
        imagenFondo
        nickname
        experience
        stripeID
        admin
        selfie
        ID
        certificaciones
        telefono
        sitioWeb
        CuentaBancaria
        fechaNacimiento
        direccion
        rfcIndividual
        rfcCompania
        capacidadMaxima
        comentariosAdicionales
        notificationToken
        owner
        newMessages
        AventurasAutorizadas {
          nextToken
          startedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        Reservas {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        Notificaciones {
          nextToken
          startedAt
        }
        SolicitudesCreadas {
          nextToken
          startedAt
        }
        Comentarios {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
    }
  }
`;
export const onDeleteChatRoomUsuario = /* GraphQL */ `
  subscription OnDeleteChatRoomUsuario {
    onDeleteChatRoomUsuario {
      id
      createdAt
      updatedAt
      chatroomID
      usuarioID
      newMessages
      owner
      chatroom {
        id
        createdAt
        updatedAt
        name
        picture
        lastMessage {
          id
          createdAt
          updatedAt
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
        }
        fechaID
        guiaID
        Mensajes {
          nextToken
          startedAt
        }
        Participantes {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
      usuario {
        id
        createdAt
        updatedAt
        tipo
        guia
        calificacion
        numResenas
        nombre
        apellido
        foto
        imagenFondo
        nickname
        experience
        stripeID
        admin
        selfie
        ID
        certificaciones
        telefono
        sitioWeb
        CuentaBancaria
        fechaNacimiento
        direccion
        rfcIndividual
        rfcCompania
        capacidadMaxima
        comentariosAdicionales
        notificationToken
        owner
        newMessages
        AventurasAutorizadas {
          nextToken
          startedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        Reservas {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        Notificaciones {
          nextToken
          startedAt
        }
        SolicitudesCreadas {
          nextToken
          startedAt
        }
        Comentarios {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
    }
  }
`;
export const onCreateUsuario = /* GraphQL */ `
  subscription OnCreateUsuario {
    onCreateUsuario {
      id
      createdAt
      updatedAt
      tipo
      guia
      calificacion
      numResenas
      nombre
      apellido
      foto
      imagenFondo
      nickname
      experience
      stripeID
      admin
      selfie
      ID
      certificaciones
      telefono
      sitioWeb
      CuentaBancaria
      fechaNacimiento
      direccion
      rfcIndividual
      rfcCompania
      capacidadMaxima
      comentariosAdicionales
      notificationToken
      owner
      newMessages
      AventurasAutorizadas {
        items {
          id
          createdAt
          updatedAt
          aventuraID
          usuarioID
          owner
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Mensajes {
        items {
          id
          createdAt
          updatedAt
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRooms {
        items {
          id
          createdAt
          updatedAt
          chatroomID
          usuarioID
          newMessages
          owner
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Reservas {
        items {
          id
          createdAt
          updatedAt
          total
          comision
          pagadoAlGuia
          tercera
          ninos
          adultos
          pagoID
          ingreso
          horaIngreso
          fechaID
          usuarioID
          guiaID
          tipoPago
          materialChecked
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Fechas {
        items {
          id
          createdAt
          updatedAt
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          experienciaPorPersona
          itinerario
          puntoReunionNombre
          puntoReunionId
          puntoReunionLink
          puntoReunionCoords
          allowTercera
          allowNinos
          material
          incluido
          titulo
          descripcion
          imagenRuta
          imagenFondo
          tituloAventura
          aventuraID
          usuarioID
          dificultad
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Notificaciones {
        items {
          id
          createdAt
          updatedAt
          tipo
          titulo
          descripcion
          usuarioID
          imagen
          owner
          leido
          showAt
          reservaID
          fechaID
          aventuraID
          guiaID
          solicitudGuiaID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      SolicitudesCreadas {
        items {
          id
          createdAt
          updatedAt
          owner
          status
          evaluadorID
          usuarioID
          mensaje
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comentarios {
        items {
          id
          createdAt
          updatedAt
          usuarioCalificadoID
          body
          calificacion
          creatorID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUsuario = /* GraphQL */ `
  subscription OnUpdateUsuario {
    onUpdateUsuario {
      id
      createdAt
      updatedAt
      tipo
      guia
      calificacion
      numResenas
      nombre
      apellido
      foto
      imagenFondo
      nickname
      experience
      stripeID
      admin
      selfie
      ID
      certificaciones
      telefono
      sitioWeb
      CuentaBancaria
      fechaNacimiento
      direccion
      rfcIndividual
      rfcCompania
      capacidadMaxima
      comentariosAdicionales
      notificationToken
      owner
      newMessages
      AventurasAutorizadas {
        items {
          id
          createdAt
          updatedAt
          aventuraID
          usuarioID
          owner
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Mensajes {
        items {
          id
          createdAt
          updatedAt
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRooms {
        items {
          id
          createdAt
          updatedAt
          chatroomID
          usuarioID
          newMessages
          owner
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Reservas {
        items {
          id
          createdAt
          updatedAt
          total
          comision
          pagadoAlGuia
          tercera
          ninos
          adultos
          pagoID
          ingreso
          horaIngreso
          fechaID
          usuarioID
          guiaID
          tipoPago
          materialChecked
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Fechas {
        items {
          id
          createdAt
          updatedAt
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          experienciaPorPersona
          itinerario
          puntoReunionNombre
          puntoReunionId
          puntoReunionLink
          puntoReunionCoords
          allowTercera
          allowNinos
          material
          incluido
          titulo
          descripcion
          imagenRuta
          imagenFondo
          tituloAventura
          aventuraID
          usuarioID
          dificultad
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Notificaciones {
        items {
          id
          createdAt
          updatedAt
          tipo
          titulo
          descripcion
          usuarioID
          imagen
          owner
          leido
          showAt
          reservaID
          fechaID
          aventuraID
          guiaID
          solicitudGuiaID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      SolicitudesCreadas {
        items {
          id
          createdAt
          updatedAt
          owner
          status
          evaluadorID
          usuarioID
          mensaje
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comentarios {
        items {
          id
          createdAt
          updatedAt
          usuarioCalificadoID
          body
          calificacion
          creatorID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUsuario = /* GraphQL */ `
  subscription OnDeleteUsuario {
    onDeleteUsuario {
      id
      createdAt
      updatedAt
      tipo
      guia
      calificacion
      numResenas
      nombre
      apellido
      foto
      imagenFondo
      nickname
      experience
      stripeID
      admin
      selfie
      ID
      certificaciones
      telefono
      sitioWeb
      CuentaBancaria
      fechaNacimiento
      direccion
      rfcIndividual
      rfcCompania
      capacidadMaxima
      comentariosAdicionales
      notificationToken
      owner
      newMessages
      AventurasAutorizadas {
        items {
          id
          createdAt
          updatedAt
          aventuraID
          usuarioID
          owner
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Mensajes {
        items {
          id
          createdAt
          updatedAt
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRooms {
        items {
          id
          createdAt
          updatedAt
          chatroomID
          usuarioID
          newMessages
          owner
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Reservas {
        items {
          id
          createdAt
          updatedAt
          total
          comision
          pagadoAlGuia
          tercera
          ninos
          adultos
          pagoID
          ingreso
          horaIngreso
          fechaID
          usuarioID
          guiaID
          tipoPago
          materialChecked
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Fechas {
        items {
          id
          createdAt
          updatedAt
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          experienciaPorPersona
          itinerario
          puntoReunionNombre
          puntoReunionId
          puntoReunionLink
          puntoReunionCoords
          allowTercera
          allowNinos
          material
          incluido
          titulo
          descripcion
          imagenRuta
          imagenFondo
          tituloAventura
          aventuraID
          usuarioID
          dificultad
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Notificaciones {
        items {
          id
          createdAt
          updatedAt
          tipo
          titulo
          descripcion
          usuarioID
          imagen
          owner
          leido
          showAt
          reservaID
          fechaID
          aventuraID
          guiaID
          solicitudGuiaID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      SolicitudesCreadas {
        items {
          id
          createdAt
          updatedAt
          owner
          status
          evaluadorID
          usuarioID
          mensaje
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comentarios {
        items {
          id
          createdAt
          updatedAt
          usuarioCalificadoID
          body
          calificacion
          creatorID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
