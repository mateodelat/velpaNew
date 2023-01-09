/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAventura = /* GraphQL */ `
  subscription OnCreateAventura($filter: ModelSubscriptionAventuraFilterInput) {
    onCreateAventura(filter: $filter) {
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
      estadoAventura
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
      materialDefault
      incluidoDefault
      usuarioID
      SolicitudGuias {
        items {
          id
          aventuraId
          solicitudGuiaId
          createdAt
          updatedAt
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
          aventuraId
          usuarioId
          createdAt
          updatedAt
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
          efectivo
          material
          incluido
          titulo
          descripcion
          imagenRuta
          imagenFondo
          tituloAventura
          cancelado
          canceledAt
          dateModified
          aventuraID
          aventuraFechasId
          usuarioID
          dificultad
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAventura = /* GraphQL */ `
  subscription OnUpdateAventura($filter: ModelSubscriptionAventuraFilterInput) {
    onUpdateAventura(filter: $filter) {
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
      estadoAventura
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
      materialDefault
      incluidoDefault
      usuarioID
      SolicitudGuias {
        items {
          id
          aventuraId
          solicitudGuiaId
          createdAt
          updatedAt
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
          aventuraId
          usuarioId
          createdAt
          updatedAt
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
          efectivo
          material
          incluido
          titulo
          descripcion
          imagenRuta
          imagenFondo
          tituloAventura
          cancelado
          canceledAt
          dateModified
          aventuraID
          aventuraFechasId
          usuarioID
          dificultad
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAventura = /* GraphQL */ `
  subscription OnDeleteAventura($filter: ModelSubscriptionAventuraFilterInput) {
    onDeleteAventura(filter: $filter) {
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
      estadoAventura
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
      materialDefault
      incluidoDefault
      usuarioID
      SolicitudGuias {
        items {
          id
          aventuraId
          solicitudGuiaId
          createdAt
          updatedAt
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
          aventuraId
          usuarioId
          createdAt
          updatedAt
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
          efectivo
          material
          incluido
          titulo
          descripcion
          imagenRuta
          imagenFondo
          tituloAventura
          cancelado
          canceledAt
          dateModified
          aventuraID
          aventuraFechasId
          usuarioID
          dificultad
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateReserva = /* GraphQL */ `
  subscription OnCreateReserva($filter: ModelSubscriptionReservaFilterInput) {
    onCreateReserva(filter: $filter) {
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
      cancelado
      canceledAt
      cancelReason
      fechaID
      usuarioID
      guiaID
      tipoPago
      materialChecked
      comisionID
      comisionAsociada {
        id
        amount
        editing
        startEditingAt
        payed
        pagadoEnReservaID
        reservaID
        fechaID
        usuarioID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      reservaComisionAsociadaId
    }
  }
`;
export const onUpdateReserva = /* GraphQL */ `
  subscription OnUpdateReserva($filter: ModelSubscriptionReservaFilterInput) {
    onUpdateReserva(filter: $filter) {
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
      cancelado
      canceledAt
      cancelReason
      fechaID
      usuarioID
      guiaID
      tipoPago
      materialChecked
      comisionID
      comisionAsociada {
        id
        amount
        editing
        startEditingAt
        payed
        pagadoEnReservaID
        reservaID
        fechaID
        usuarioID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      reservaComisionAsociadaId
    }
  }
`;
export const onDeleteReserva = /* GraphQL */ `
  subscription OnDeleteReserva($filter: ModelSubscriptionReservaFilterInput) {
    onDeleteReserva(filter: $filter) {
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
      cancelado
      canceledAt
      cancelReason
      fechaID
      usuarioID
      guiaID
      tipoPago
      materialChecked
      comisionID
      comisionAsociada {
        id
        amount
        editing
        startEditingAt
        payed
        pagadoEnReservaID
        reservaID
        fechaID
        usuarioID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      reservaComisionAsociadaId
    }
  }
`;
export const onCreateFecha = /* GraphQL */ `
  subscription OnCreateFecha($filter: ModelSubscriptionFechaFilterInput) {
    onCreateFecha(filter: $filter) {
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
      efectivo
      material
      incluido
      titulo
      descripcion
      imagenRuta
      imagenFondo
      tituloAventura
      cancelado
      canceledAt
      dateModified
      aventuraID
      aventuraFechasId
      usuarioID
      dificultad
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
          cancelado
          canceledAt
          cancelReason
          fechaID
          usuarioID
          guiaID
          tipoPago
          materialChecked
          comisionID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          reservaComisionAsociadaId
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          chatRoomLastMessageId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateFecha = /* GraphQL */ `
  subscription OnUpdateFecha($filter: ModelSubscriptionFechaFilterInput) {
    onUpdateFecha(filter: $filter) {
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
      efectivo
      material
      incluido
      titulo
      descripcion
      imagenRuta
      imagenFondo
      tituloAventura
      cancelado
      canceledAt
      dateModified
      aventuraID
      aventuraFechasId
      usuarioID
      dificultad
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
          cancelado
          canceledAt
          cancelReason
          fechaID
          usuarioID
          guiaID
          tipoPago
          materialChecked
          comisionID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          reservaComisionAsociadaId
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          chatRoomLastMessageId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteFecha = /* GraphQL */ `
  subscription OnDeleteFecha($filter: ModelSubscriptionFechaFilterInput) {
    onDeleteFecha(filter: $filter) {
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
      efectivo
      material
      incluido
      titulo
      descripcion
      imagenRuta
      imagenFondo
      tituloAventura
      cancelado
      canceledAt
      dateModified
      aventuraID
      aventuraFechasId
      usuarioID
      dificultad
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
          cancelado
          canceledAt
          cancelReason
          fechaID
          usuarioID
          guiaID
          tipoPago
          materialChecked
          comisionID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          reservaComisionAsociadaId
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          chatRoomLastMessageId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUsuario = /* GraphQL */ `
  subscription OnCreateUsuario($filter: ModelSubscriptionUsuarioFilterInput) {
    onCreateUsuario(filter: $filter) {
      id
      tipo
      guia
      email
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
      newMessages
      AventurasAutorizadas {
        items {
          id
          aventuraId
          usuarioId
          createdAt
          updatedAt
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
          content
          usuarioID
          chatroomID
          createdAt
          updatedAt
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
          chatRoomParticipantesId
          usuarioChatRoomsId
          newMessages
          createdAt
          updatedAt
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
          total
          comision
          pagadoAlGuia
          tercera
          ninos
          adultos
          pagoID
          ingreso
          horaIngreso
          cancelado
          canceledAt
          cancelReason
          fechaID
          usuarioID
          guiaID
          tipoPago
          materialChecked
          comisionID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          reservaComisionAsociadaId
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
          efectivo
          material
          incluido
          titulo
          descripcion
          imagenRuta
          imagenFondo
          tituloAventura
          cancelado
          canceledAt
          dateModified
          aventuraID
          aventuraFechasId
          usuarioID
          dificultad
          createdAt
          updatedAt
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
          tipo
          titulo
          descripcion
          usuarioID
          imagen
          leido
          showAt
          reservaID
          fechaID
          aventuraID
          guiaID
          solicitudGuiaID
          createdAt
          updatedAt
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
          status
          evaluadorID
          usuarioID
          mensaje
          createdAt
          updatedAt
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
          usuarioCalificadoID
          body
          calificacion
          creatorID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comisiones {
        items {
          id
          amount
          editing
          startEditingAt
          payed
          pagadoEnReservaID
          reservaID
          fechaID
          usuarioID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUsuario = /* GraphQL */ `
  subscription OnUpdateUsuario($filter: ModelSubscriptionUsuarioFilterInput) {
    onUpdateUsuario(filter: $filter) {
      id
      tipo
      guia
      email
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
      newMessages
      AventurasAutorizadas {
        items {
          id
          aventuraId
          usuarioId
          createdAt
          updatedAt
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
          content
          usuarioID
          chatroomID
          createdAt
          updatedAt
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
          chatRoomParticipantesId
          usuarioChatRoomsId
          newMessages
          createdAt
          updatedAt
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
          total
          comision
          pagadoAlGuia
          tercera
          ninos
          adultos
          pagoID
          ingreso
          horaIngreso
          cancelado
          canceledAt
          cancelReason
          fechaID
          usuarioID
          guiaID
          tipoPago
          materialChecked
          comisionID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          reservaComisionAsociadaId
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
          efectivo
          material
          incluido
          titulo
          descripcion
          imagenRuta
          imagenFondo
          tituloAventura
          cancelado
          canceledAt
          dateModified
          aventuraID
          aventuraFechasId
          usuarioID
          dificultad
          createdAt
          updatedAt
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
          tipo
          titulo
          descripcion
          usuarioID
          imagen
          leido
          showAt
          reservaID
          fechaID
          aventuraID
          guiaID
          solicitudGuiaID
          createdAt
          updatedAt
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
          status
          evaluadorID
          usuarioID
          mensaje
          createdAt
          updatedAt
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
          usuarioCalificadoID
          body
          calificacion
          creatorID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comisiones {
        items {
          id
          amount
          editing
          startEditingAt
          payed
          pagadoEnReservaID
          reservaID
          fechaID
          usuarioID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUsuario = /* GraphQL */ `
  subscription OnDeleteUsuario($filter: ModelSubscriptionUsuarioFilterInput) {
    onDeleteUsuario(filter: $filter) {
      id
      tipo
      guia
      email
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
      newMessages
      AventurasAutorizadas {
        items {
          id
          aventuraId
          usuarioId
          createdAt
          updatedAt
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
          content
          usuarioID
          chatroomID
          createdAt
          updatedAt
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
          chatRoomParticipantesId
          usuarioChatRoomsId
          newMessages
          createdAt
          updatedAt
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
          total
          comision
          pagadoAlGuia
          tercera
          ninos
          adultos
          pagoID
          ingreso
          horaIngreso
          cancelado
          canceledAt
          cancelReason
          fechaID
          usuarioID
          guiaID
          tipoPago
          materialChecked
          comisionID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          reservaComisionAsociadaId
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
          efectivo
          material
          incluido
          titulo
          descripcion
          imagenRuta
          imagenFondo
          tituloAventura
          cancelado
          canceledAt
          dateModified
          aventuraID
          aventuraFechasId
          usuarioID
          dificultad
          createdAt
          updatedAt
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
          tipo
          titulo
          descripcion
          usuarioID
          imagen
          leido
          showAt
          reservaID
          fechaID
          aventuraID
          guiaID
          solicitudGuiaID
          createdAt
          updatedAt
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
          status
          evaluadorID
          usuarioID
          mensaje
          createdAt
          updatedAt
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
          usuarioCalificadoID
          body
          calificacion
          creatorID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comisiones {
        items {
          id
          amount
          editing
          startEditingAt
          payed
          pagadoEnReservaID
          reservaID
          fechaID
          usuarioID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateComision = /* GraphQL */ `
  subscription OnCreateComision($filter: ModelSubscriptionComisionFilterInput) {
    onCreateComision(filter: $filter) {
      id
      amount
      editing
      startEditingAt
      payed
      pagadoEnReservaID
      reservaID
      fechaID
      usuarioID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateComision = /* GraphQL */ `
  subscription OnUpdateComision($filter: ModelSubscriptionComisionFilterInput) {
    onUpdateComision(filter: $filter) {
      id
      amount
      editing
      startEditingAt
      payed
      pagadoEnReservaID
      reservaID
      fechaID
      usuarioID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteComision = /* GraphQL */ `
  subscription OnDeleteComision($filter: ModelSubscriptionComisionFilterInput) {
    onDeleteComision(filter: $filter) {
      id
      amount
      editing
      startEditingAt
      payed
      pagadoEnReservaID
      reservaID
      fechaID
      usuarioID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
      id
      name
      picture
      lastMessage {
        id
        content
        usuarioID
        chatroomID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      fechaID
      guiaID
      Mensajes {
        items {
          id
          content
          usuarioID
          chatroomID
          createdAt
          updatedAt
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
          chatRoomParticipantesId
          usuarioChatRoomsId
          newMessages
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
      id
      name
      picture
      lastMessage {
        id
        content
        usuarioID
        chatroomID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      fechaID
      guiaID
      Mensajes {
        items {
          id
          content
          usuarioID
          chatroomID
          createdAt
          updatedAt
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
          chatRoomParticipantesId
          usuarioChatRoomsId
          newMessages
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
      id
      name
      picture
      lastMessage {
        id
        content
        usuarioID
        chatroomID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      fechaID
      guiaID
      Mensajes {
        items {
          id
          content
          usuarioID
          chatroomID
          createdAt
          updatedAt
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
          chatRoomParticipantesId
          usuarioChatRoomsId
          newMessages
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;
export const onCreateMensaje = /* GraphQL */ `
  subscription OnCreateMensaje($filter: ModelSubscriptionMensajeFilterInput) {
    onCreateMensaje(filter: $filter) {
      id
      content
      usuarioID
      chatroomID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateMensaje = /* GraphQL */ `
  subscription OnUpdateMensaje($filter: ModelSubscriptionMensajeFilterInput) {
    onUpdateMensaje(filter: $filter) {
      id
      content
      usuarioID
      chatroomID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteMensaje = /* GraphQL */ `
  subscription OnDeleteMensaje($filter: ModelSubscriptionMensajeFilterInput) {
    onDeleteMensaje(filter: $filter) {
      id
      content
      usuarioID
      chatroomID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateSolicitudGuia = /* GraphQL */ `
  subscription OnCreateSolicitudGuia(
    $filter: ModelSubscriptionSolicitudGuiaFilterInput
  ) {
    onCreateSolicitudGuia(filter: $filter) {
      id
      status
      evaluadorID
      usuarioID
      mensaje
      Aventuras {
        items {
          id
          aventuraId
          solicitudGuiaId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateSolicitudGuia = /* GraphQL */ `
  subscription OnUpdateSolicitudGuia(
    $filter: ModelSubscriptionSolicitudGuiaFilterInput
  ) {
    onUpdateSolicitudGuia(filter: $filter) {
      id
      status
      evaluadorID
      usuarioID
      mensaje
      Aventuras {
        items {
          id
          aventuraId
          solicitudGuiaId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteSolicitudGuia = /* GraphQL */ `
  subscription OnDeleteSolicitudGuia(
    $filter: ModelSubscriptionSolicitudGuiaFilterInput
  ) {
    onDeleteSolicitudGuia(filter: $filter) {
      id
      status
      evaluadorID
      usuarioID
      mensaje
      Aventuras {
        items {
          id
          aventuraId
          solicitudGuiaId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateNotificacion = /* GraphQL */ `
  subscription OnCreateNotificacion(
    $filter: ModelSubscriptionNotificacionFilterInput
  ) {
    onCreateNotificacion(filter: $filter) {
      id
      tipo
      titulo
      descripcion
      usuarioID
      imagen
      leido
      showAt
      reservaID
      fechaID
      aventuraID
      guiaID
      solicitudGuiaID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateNotificacion = /* GraphQL */ `
  subscription OnUpdateNotificacion(
    $filter: ModelSubscriptionNotificacionFilterInput
  ) {
    onUpdateNotificacion(filter: $filter) {
      id
      tipo
      titulo
      descripcion
      usuarioID
      imagen
      leido
      showAt
      reservaID
      fechaID
      aventuraID
      guiaID
      solicitudGuiaID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteNotificacion = /* GraphQL */ `
  subscription OnDeleteNotificacion(
    $filter: ModelSubscriptionNotificacionFilterInput
  ) {
    onDeleteNotificacion(filter: $filter) {
      id
      tipo
      titulo
      descripcion
      usuarioID
      imagen
      leido
      showAt
      reservaID
      fechaID
      aventuraID
      guiaID
      solicitudGuiaID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateComentario = /* GraphQL */ `
  subscription OnCreateComentario(
    $filter: ModelSubscriptionComentarioFilterInput
  ) {
    onCreateComentario(filter: $filter) {
      id
      usuarioCalificadoID
      body
      calificacion
      creatorID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateComentario = /* GraphQL */ `
  subscription OnUpdateComentario(
    $filter: ModelSubscriptionComentarioFilterInput
  ) {
    onUpdateComentario(filter: $filter) {
      id
      usuarioCalificadoID
      body
      calificacion
      creatorID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteComentario = /* GraphQL */ `
  subscription OnDeleteComentario(
    $filter: ModelSubscriptionComentarioFilterInput
  ) {
    onDeleteComentario(filter: $filter) {
      id
      usuarioCalificadoID
      body
      calificacion
      creatorID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreatePublicidad = /* GraphQL */ `
  subscription OnCreatePublicidad(
    $filter: ModelSubscriptionPublicidadFilterInput
  ) {
    onCreatePublicidad(filter: $filter) {
      id
      tipo
      titulo
      descripcion
      imagenFondo
      video
      linkAnuncio
      aventuraID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdatePublicidad = /* GraphQL */ `
  subscription OnUpdatePublicidad(
    $filter: ModelSubscriptionPublicidadFilterInput
  ) {
    onUpdatePublicidad(filter: $filter) {
      id
      tipo
      titulo
      descripcion
      imagenFondo
      video
      linkAnuncio
      aventuraID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeletePublicidad = /* GraphQL */ `
  subscription OnDeletePublicidad(
    $filter: ModelSubscriptionPublicidadFilterInput
  ) {
    onDeletePublicidad(filter: $filter) {
      id
      tipo
      titulo
      descripcion
      imagenFondo
      video
      linkAnuncio
      aventuraID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateChatRoomUsuarios = /* GraphQL */ `
  subscription OnCreateChatRoomUsuarios(
    $filter: ModelSubscriptionChatRoomUsuariosFilterInput
  ) {
    onCreateChatRoomUsuarios(filter: $filter) {
      id
      chatRoomParticipantesId
      usuarioChatRoomsId
      newMessages
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateChatRoomUsuarios = /* GraphQL */ `
  subscription OnUpdateChatRoomUsuarios(
    $filter: ModelSubscriptionChatRoomUsuariosFilterInput
  ) {
    onUpdateChatRoomUsuarios(filter: $filter) {
      id
      chatRoomParticipantesId
      usuarioChatRoomsId
      newMessages
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteChatRoomUsuarios = /* GraphQL */ `
  subscription OnDeleteChatRoomUsuarios(
    $filter: ModelSubscriptionChatRoomUsuariosFilterInput
  ) {
    onDeleteChatRoomUsuarios(filter: $filter) {
      id
      chatRoomParticipantesId
      usuarioChatRoomsId
      newMessages
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateAventuraSolicitudGuias = /* GraphQL */ `
  subscription OnCreateAventuraSolicitudGuias(
    $filter: ModelSubscriptionAventuraSolicitudGuiasFilterInput
  ) {
    onCreateAventuraSolicitudGuias(filter: $filter) {
      id
      aventuraId
      solicitudGuiaId
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
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      solicitudGuia {
        id
        status
        evaluadorID
        usuarioID
        mensaje
        Aventuras {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAventuraSolicitudGuias = /* GraphQL */ `
  subscription OnUpdateAventuraSolicitudGuias(
    $filter: ModelSubscriptionAventuraSolicitudGuiasFilterInput
  ) {
    onUpdateAventuraSolicitudGuias(filter: $filter) {
      id
      aventuraId
      solicitudGuiaId
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
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      solicitudGuia {
        id
        status
        evaluadorID
        usuarioID
        mensaje
        Aventuras {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAventuraSolicitudGuias = /* GraphQL */ `
  subscription OnDeleteAventuraSolicitudGuias(
    $filter: ModelSubscriptionAventuraSolicitudGuiasFilterInput
  ) {
    onDeleteAventuraSolicitudGuias(filter: $filter) {
      id
      aventuraId
      solicitudGuiaId
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
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      solicitudGuia {
        id
        status
        evaluadorID
        usuarioID
        mensaje
        Aventuras {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateAventuraUsuarios = /* GraphQL */ `
  subscription OnCreateAventuraUsuarios(
    $filter: ModelSubscriptionAventuraUsuariosFilterInput
  ) {
    onCreateAventuraUsuarios(filter: $filter) {
      id
      aventuraId
      usuarioId
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
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      usuario {
        id
        tipo
        guia
        email
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
        Comisiones {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAventuraUsuarios = /* GraphQL */ `
  subscription OnUpdateAventuraUsuarios(
    $filter: ModelSubscriptionAventuraUsuariosFilterInput
  ) {
    onUpdateAventuraUsuarios(filter: $filter) {
      id
      aventuraId
      usuarioId
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
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      usuario {
        id
        tipo
        guia
        email
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
        Comisiones {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAventuraUsuarios = /* GraphQL */ `
  subscription OnDeleteAventuraUsuarios(
    $filter: ModelSubscriptionAventuraUsuariosFilterInput
  ) {
    onDeleteAventuraUsuarios(filter: $filter) {
      id
      aventuraId
      usuarioId
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
        estadoAventura
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        materialDefault
        incluidoDefault
        usuarioID
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      usuario {
        id
        tipo
        guia
        email
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
        Comisiones {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
