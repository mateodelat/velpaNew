/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAventura = /* GraphQL */ `
  subscription OnCreateAventura {
    onCreateAventura {
      id
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
      comision
      estadoAventura
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
      materialDefault
      incluidoDefault
      usuarioID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Fechas {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      SolicitudGuias {
        items {
          id
          aventuraID
          solicitudguiaID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      UsuariosAutorizados {
        items {
          id
          aventuraID
          usuarioID
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onUpdateAventura = /* GraphQL */ `
  subscription OnUpdateAventura {
    onUpdateAventura {
      id
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
      comision
      estadoAventura
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
      materialDefault
      incluidoDefault
      usuarioID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Fechas {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      SolicitudGuias {
        items {
          id
          aventuraID
          solicitudguiaID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      UsuariosAutorizados {
        items {
          id
          aventuraID
          usuarioID
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onDeleteAventura = /* GraphQL */ `
  subscription OnDeleteAventura {
    onDeleteAventura {
      id
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
      comision
      estadoAventura
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
      materialDefault
      incluidoDefault
      usuarioID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Fechas {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      SolicitudGuias {
        items {
          id
          aventuraID
          solicitudguiaID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      UsuariosAutorizados {
        items {
          id
          aventuraID
          usuarioID
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateReserva = /* GraphQL */ `
  subscription OnCreateReserva {
    onCreateReserva {
      id
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReserva = /* GraphQL */ `
  subscription OnUpdateReserva {
    onUpdateReserva {
      id
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReserva = /* GraphQL */ `
  subscription OnDeleteReserva {
    onDeleteReserva {
      id
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
      Reservas {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      ChatRoom {
        items {
          id
          name
          picture
          fechaID
          guiaID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
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
      createdAt
      updatedAt
      Reservas {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      ChatRoom {
        items {
          id
          name
          picture
          fechaID
          guiaID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
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
      createdAt
      updatedAt
      Reservas {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      ChatRoom {
        items {
          id
          name
          picture
          fechaID
          guiaID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateUsuario = /* GraphQL */ `
  subscription OnCreateUsuario {
    onCreateUsuario {
      id
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Reservas {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Fechas {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Mensajes {
        items {
          id
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      SolicitudesCreadas {
        items {
          owner
          id
          status
          evaluadorID
          usuarioID
          mensaje
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Notificaciones {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Comentarios {
        items {
          id
          usuarioCalificadoID
          body
          calificacion
          owner
          creatorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      AventurasAutorizadas {
        items {
          id
          aventuraID
          usuarioID
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      ChatRooms {
        items {
          id
          chatroomID
          usuarioID
          newMessages
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onUpdateUsuario = /* GraphQL */ `
  subscription OnUpdateUsuario {
    onUpdateUsuario {
      id
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Reservas {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Fechas {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Mensajes {
        items {
          id
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      SolicitudesCreadas {
        items {
          owner
          id
          status
          evaluadorID
          usuarioID
          mensaje
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Notificaciones {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Comentarios {
        items {
          id
          usuarioCalificadoID
          body
          calificacion
          owner
          creatorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      AventurasAutorizadas {
        items {
          id
          aventuraID
          usuarioID
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      ChatRooms {
        items {
          id
          chatroomID
          usuarioID
          newMessages
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onDeleteUsuario = /* GraphQL */ `
  subscription OnDeleteUsuario {
    onDeleteUsuario {
      id
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Reservas {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Fechas {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Mensajes {
        items {
          id
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      SolicitudesCreadas {
        items {
          owner
          id
          status
          evaluadorID
          usuarioID
          mensaje
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Notificaciones {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Comentarios {
        items {
          id
          usuarioCalificadoID
          body
          calificacion
          owner
          creatorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      AventurasAutorizadas {
        items {
          id
          aventuraID
          usuarioID
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      ChatRooms {
        items {
          id
          chatroomID
          usuarioID
          newMessages
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
      id
      name
      picture
      fechaID
      guiaID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      lastMessage {
        id
        content
        usuarioID
        chatroomID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      Mensajes {
        items {
          id
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Participantes {
        items {
          id
          chatroomID
          usuarioID
          newMessages
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
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
      fechaID
      guiaID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      lastMessage {
        id
        content
        usuarioID
        chatroomID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      Mensajes {
        items {
          id
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Participantes {
        items {
          id
          chatroomID
          usuarioID
          newMessages
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
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
      fechaID
      guiaID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      lastMessage {
        id
        content
        usuarioID
        chatroomID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      Mensajes {
        items {
          id
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Participantes {
        items {
          id
          chatroomID
          usuarioID
          newMessages
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateMensaje = /* GraphQL */ `
  subscription OnCreateMensaje {
    onCreateMensaje {
      id
      content
      usuarioID
      chatroomID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMensaje = /* GraphQL */ `
  subscription OnUpdateMensaje {
    onUpdateMensaje {
      id
      content
      usuarioID
      chatroomID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMensaje = /* GraphQL */ `
  subscription OnDeleteMensaje {
    onDeleteMensaje {
      id
      content
      usuarioID
      chatroomID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSolicitudGuia = /* GraphQL */ `
  subscription OnCreateSolicitudGuia {
    onCreateSolicitudGuia {
      owner
      id
      status
      evaluadorID
      usuarioID
      mensaje
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Aventuras {
        items {
          id
          aventuraID
          solicitudguiaID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onUpdateSolicitudGuia = /* GraphQL */ `
  subscription OnUpdateSolicitudGuia {
    onUpdateSolicitudGuia {
      owner
      id
      status
      evaluadorID
      usuarioID
      mensaje
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Aventuras {
        items {
          id
          aventuraID
          solicitudguiaID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onDeleteSolicitudGuia = /* GraphQL */ `
  subscription OnDeleteSolicitudGuia {
    onDeleteSolicitudGuia {
      owner
      id
      status
      evaluadorID
      usuarioID
      mensaje
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Aventuras {
        items {
          id
          aventuraID
          solicitudguiaID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateNotificacion = /* GraphQL */ `
  subscription OnCreateNotificacion($owner: String) {
    onCreateNotificacion(owner: $owner) {
      id
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNotificacion = /* GraphQL */ `
  subscription OnUpdateNotificacion($owner: String) {
    onUpdateNotificacion(owner: $owner) {
      id
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNotificacion = /* GraphQL */ `
  subscription OnDeleteNotificacion($owner: String) {
    onDeleteNotificacion(owner: $owner) {
      id
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComentario = /* GraphQL */ `
  subscription OnCreateComentario {
    onCreateComentario {
      id
      usuarioCalificadoID
      body
      calificacion
      owner
      creatorID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComentario = /* GraphQL */ `
  subscription OnUpdateComentario {
    onUpdateComentario {
      id
      usuarioCalificadoID
      body
      calificacion
      owner
      creatorID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComentario = /* GraphQL */ `
  subscription OnDeleteComentario {
    onDeleteComentario {
      id
      usuarioCalificadoID
      body
      calificacion
      owner
      creatorID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePublicidad = /* GraphQL */ `
  subscription OnCreatePublicidad {
    onCreatePublicidad {
      id
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePublicidad = /* GraphQL */ `
  subscription OnUpdatePublicidad {
    onUpdatePublicidad {
      id
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePublicidad = /* GraphQL */ `
  subscription OnDeletePublicidad {
    onDeletePublicidad {
      id
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAventuraSolicitudGuia = /* GraphQL */ `
  subscription OnCreateAventuraSolicitudGuia {
    onCreateAventuraSolicitudGuia {
      id
      aventuraID
      solicitudguiaID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      aventura {
        id
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
        comision
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Fechas {
          nextToken
          startedAt
        }
        SolicitudGuias {
          nextToken
          startedAt
        }
        UsuariosAutorizados {
          nextToken
          startedAt
        }
      }
      solicitudguia {
        owner
        id
        status
        evaluadorID
        usuarioID
        mensaje
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Aventuras {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onUpdateAventuraSolicitudGuia = /* GraphQL */ `
  subscription OnUpdateAventuraSolicitudGuia {
    onUpdateAventuraSolicitudGuia {
      id
      aventuraID
      solicitudguiaID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      aventura {
        id
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
        comision
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Fechas {
          nextToken
          startedAt
        }
        SolicitudGuias {
          nextToken
          startedAt
        }
        UsuariosAutorizados {
          nextToken
          startedAt
        }
      }
      solicitudguia {
        owner
        id
        status
        evaluadorID
        usuarioID
        mensaje
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Aventuras {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onDeleteAventuraSolicitudGuia = /* GraphQL */ `
  subscription OnDeleteAventuraSolicitudGuia {
    onDeleteAventuraSolicitudGuia {
      id
      aventuraID
      solicitudguiaID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      aventura {
        id
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
        comision
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Fechas {
          nextToken
          startedAt
        }
        SolicitudGuias {
          nextToken
          startedAt
        }
        UsuariosAutorizados {
          nextToken
          startedAt
        }
      }
      solicitudguia {
        owner
        id
        status
        evaluadorID
        usuarioID
        mensaje
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Aventuras {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onCreateAventuraUsuario = /* GraphQL */ `
  subscription OnCreateAventuraUsuario {
    onCreateAventuraUsuario {
      id
      aventuraID
      usuarioID
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      aventura {
        id
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
        comision
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Fechas {
          nextToken
          startedAt
        }
        SolicitudGuias {
          nextToken
          startedAt
        }
        UsuariosAutorizados {
          nextToken
          startedAt
        }
      }
      usuario {
        id
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Reservas {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        SolicitudesCreadas {
          nextToken
          startedAt
        }
        Notificaciones {
          nextToken
          startedAt
        }
        Comentarios {
          nextToken
          startedAt
        }
        AventurasAutorizadas {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onUpdateAventuraUsuario = /* GraphQL */ `
  subscription OnUpdateAventuraUsuario {
    onUpdateAventuraUsuario {
      id
      aventuraID
      usuarioID
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      aventura {
        id
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
        comision
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Fechas {
          nextToken
          startedAt
        }
        SolicitudGuias {
          nextToken
          startedAt
        }
        UsuariosAutorizados {
          nextToken
          startedAt
        }
      }
      usuario {
        id
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Reservas {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        SolicitudesCreadas {
          nextToken
          startedAt
        }
        Notificaciones {
          nextToken
          startedAt
        }
        Comentarios {
          nextToken
          startedAt
        }
        AventurasAutorizadas {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onDeleteAventuraUsuario = /* GraphQL */ `
  subscription OnDeleteAventuraUsuario {
    onDeleteAventuraUsuario {
      id
      aventuraID
      usuarioID
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      aventura {
        id
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
        comision
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Fechas {
          nextToken
          startedAt
        }
        SolicitudGuias {
          nextToken
          startedAt
        }
        UsuariosAutorizados {
          nextToken
          startedAt
        }
      }
      usuario {
        id
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Reservas {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        SolicitudesCreadas {
          nextToken
          startedAt
        }
        Notificaciones {
          nextToken
          startedAt
        }
        Comentarios {
          nextToken
          startedAt
        }
        AventurasAutorizadas {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onCreateChatRoomUsuario = /* GraphQL */ `
  subscription OnCreateChatRoomUsuario {
    onCreateChatRoomUsuario {
      id
      chatroomID
      usuarioID
      newMessages
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      usuario {
        id
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Reservas {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        SolicitudesCreadas {
          nextToken
          startedAt
        }
        Notificaciones {
          nextToken
          startedAt
        }
        Comentarios {
          nextToken
          startedAt
        }
        AventurasAutorizadas {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
      }
      chatroom {
        id
        name
        picture
        fechaID
        guiaID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        lastMessage {
          id
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        Participantes {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onUpdateChatRoomUsuario = /* GraphQL */ `
  subscription OnUpdateChatRoomUsuario {
    onUpdateChatRoomUsuario {
      id
      chatroomID
      usuarioID
      newMessages
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      usuario {
        id
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Reservas {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        SolicitudesCreadas {
          nextToken
          startedAt
        }
        Notificaciones {
          nextToken
          startedAt
        }
        Comentarios {
          nextToken
          startedAt
        }
        AventurasAutorizadas {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
      }
      chatroom {
        id
        name
        picture
        fechaID
        guiaID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        lastMessage {
          id
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        Participantes {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onDeleteChatRoomUsuario = /* GraphQL */ `
  subscription OnDeleteChatRoomUsuario {
    onDeleteChatRoomUsuario {
      id
      chatroomID
      usuarioID
      newMessages
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      usuario {
        id
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Reservas {
          nextToken
          startedAt
        }
        Fechas {
          nextToken
          startedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        SolicitudesCreadas {
          nextToken
          startedAt
        }
        Notificaciones {
          nextToken
          startedAt
        }
        Comentarios {
          nextToken
          startedAt
        }
        AventurasAutorizadas {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
      }
      chatroom {
        id
        name
        picture
        fechaID
        guiaID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        lastMessage {
          id
          content
          usuarioID
          chatroomID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Mensajes {
          nextToken
          startedAt
        }
        Participantes {
          nextToken
          startedAt
        }
      }
    }
  }
`;
