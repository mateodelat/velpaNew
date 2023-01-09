/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAventura = /* GraphQL */ `
  query GetAventura($id: ID!) {
    getAventura(id: $id) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncAventuras = /* GraphQL */ `
  query SyncAventuras(
    $filter: ModelAventuraFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAventuras(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getReserva = /* GraphQL */ `
  query GetReserva($id: ID!) {
    getReserva(id: $id) {
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
export const listReservas = /* GraphQL */ `
  query ListReservas(
    $filter: ModelReservaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservas(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncReservas = /* GraphQL */ `
  query SyncReservas(
    $filter: ModelReservaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReservas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const reservasByFechaID = /* GraphQL */ `
  query ReservasByFechaID(
    $fechaID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReservaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reservasByFechaID(
      fechaID: $fechaID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const reservasByUsuarioID = /* GraphQL */ `
  query ReservasByUsuarioID(
    $usuarioID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReservaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reservasByUsuarioID(
      usuarioID: $usuarioID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      startedAt
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
          nextToken
          startedAt
        }
        ChatRoom {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncFechas = /* GraphQL */ `
  query SyncFechas(
    $filter: ModelFechaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFechas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        Reservas {
          nextToken
          startedAt
        }
        ChatRoom {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const fechasByAventuraID = /* GraphQL */ `
  query FechasByAventuraID(
    $aventuraID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFechaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    fechasByAventuraID(
      aventuraID: $aventuraID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        Reservas {
          nextToken
          startedAt
        }
        ChatRoom {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const fechasByUsuarioID = /* GraphQL */ `
  query FechasByUsuarioID(
    $usuarioID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFechaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    fechasByUsuarioID(
      usuarioID: $usuarioID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        Reservas {
          nextToken
          startedAt
        }
        ChatRoom {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUsuario = /* GraphQL */ `
  query GetUsuario($id: ID!) {
    getUsuario(id: $id) {
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
export const listUsuarios = /* GraphQL */ `
  query ListUsuarios(
    $filter: ModelUsuarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsuarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUsuarios = /* GraphQL */ `
  query SyncUsuarios(
    $filter: ModelUsuarioFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsuarios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getComision = /* GraphQL */ `
  query GetComision($id: ID!) {
    getComision(id: $id) {
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
export const listComisions = /* GraphQL */ `
  query ListComisions(
    $filter: ModelComisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncComisions = /* GraphQL */ `
  query SyncComisions(
    $filter: ModelComisionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComisions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const comisionsByUsuarioID = /* GraphQL */ `
  query ComisionsByUsuarioID(
    $usuarioID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelComisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    comisionsByUsuarioID(
      usuarioID: $usuarioID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
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
          nextToken
          startedAt
        }
        Participantes {
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
      nextToken
      startedAt
    }
  }
`;
export const syncChatRooms = /* GraphQL */ `
  query SyncChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncChatRooms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          nextToken
          startedAt
        }
        Participantes {
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
      nextToken
      startedAt
    }
  }
`;
export const chatRoomsByFechaID = /* GraphQL */ `
  query ChatRoomsByFechaID(
    $fechaID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatRoomsByFechaID(
      fechaID: $fechaID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          nextToken
          startedAt
        }
        Participantes {
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
      nextToken
      startedAt
    }
  }
`;
export const getMensaje = /* GraphQL */ `
  query GetMensaje($id: ID!) {
    getMensaje(id: $id) {
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
export const listMensajes = /* GraphQL */ `
  query ListMensajes(
    $filter: ModelMensajeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMensajes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncMensajes = /* GraphQL */ `
  query SyncMensajes(
    $filter: ModelMensajeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMensajes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const mensajesByUsuarioID = /* GraphQL */ `
  query MensajesByUsuarioID(
    $usuarioID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMensajeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mensajesByUsuarioID(
      usuarioID: $usuarioID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const mensajesByChatroomID = /* GraphQL */ `
  query MensajesByChatroomID(
    $chatroomID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMensajeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mensajesByChatroomID(
      chatroomID: $chatroomID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getSolicitudGuia = /* GraphQL */ `
  query GetSolicitudGuia($id: ID!) {
    getSolicitudGuia(id: $id) {
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
export const listSolicitudGuias = /* GraphQL */ `
  query ListSolicitudGuias(
    $filter: ModelSolicitudGuiaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSolicitudGuias(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSolicitudGuias = /* GraphQL */ `
  query SyncSolicitudGuias(
    $filter: ModelSolicitudGuiaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSolicitudGuias(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const solicitudGuiasByUsuarioID = /* GraphQL */ `
  query SolicitudGuiasByUsuarioID(
    $usuarioID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSolicitudGuiaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    solicitudGuiasByUsuarioID(
      usuarioID: $usuarioID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getNotificacion = /* GraphQL */ `
  query GetNotificacion($id: ID!) {
    getNotificacion(id: $id) {
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
export const listNotificacions = /* GraphQL */ `
  query ListNotificacions(
    $filter: ModelNotificacionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificacions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncNotificacions = /* GraphQL */ `
  query SyncNotificacions(
    $filter: ModelNotificacionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotificacions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const notificacionsByUsuarioID = /* GraphQL */ `
  query NotificacionsByUsuarioID(
    $usuarioID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNotificacionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificacionsByUsuarioID(
      usuarioID: $usuarioID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getComentario = /* GraphQL */ `
  query GetComentario($id: ID!) {
    getComentario(id: $id) {
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
export const listComentarios = /* GraphQL */ `
  query ListComentarios(
    $filter: ModelComentarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComentarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncComentarios = /* GraphQL */ `
  query SyncComentarios(
    $filter: ModelComentarioFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComentarios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const comentariosByUsuarioCalificadoID = /* GraphQL */ `
  query ComentariosByUsuarioCalificadoID(
    $usuarioCalificadoID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelComentarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    comentariosByUsuarioCalificadoID(
      usuarioCalificadoID: $usuarioCalificadoID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getPublicidad = /* GraphQL */ `
  query GetPublicidad($id: ID!) {
    getPublicidad(id: $id) {
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
export const listPublicidads = /* GraphQL */ `
  query ListPublicidads(
    $filter: ModelPublicidadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPublicidads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncPublicidads = /* GraphQL */ `
  query SyncPublicidads(
    $filter: ModelPublicidadFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPublicidads(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getChatRoomUsuarios = /* GraphQL */ `
  query GetChatRoomUsuarios($id: ID!) {
    getChatRoomUsuarios(id: $id) {
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
export const listChatRoomUsuarios = /* GraphQL */ `
  query ListChatRoomUsuarios(
    $filter: ModelChatRoomUsuariosFilterInput
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
  }
`;
export const syncChatRoomUsuarios = /* GraphQL */ `
  query SyncChatRoomUsuarios(
    $filter: ModelChatRoomUsuariosFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncChatRoomUsuarios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const chatRoomUsuariosByChatRoomParticipantesId = /* GraphQL */ `
  query ChatRoomUsuariosByChatRoomParticipantesId(
    $chatRoomParticipantesId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelChatRoomUsuariosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatRoomUsuariosByChatRoomParticipantesId(
      chatRoomParticipantesId: $chatRoomParticipantesId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const chatRoomUsuariosByUsuarioChatRoomsId = /* GraphQL */ `
  query ChatRoomUsuariosByUsuarioChatRoomsId(
    $usuarioChatRoomsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelChatRoomUsuariosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatRoomUsuariosByUsuarioChatRoomsId(
      usuarioChatRoomsId: $usuarioChatRoomsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getAventuraSolicitudGuias = /* GraphQL */ `
  query GetAventuraSolicitudGuias($id: ID!) {
    getAventuraSolicitudGuias(id: $id) {
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
export const listAventuraSolicitudGuias = /* GraphQL */ `
  query ListAventuraSolicitudGuias(
    $filter: ModelAventuraSolicitudGuiasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAventuraSolicitudGuias(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncAventuraSolicitudGuias = /* GraphQL */ `
  query SyncAventuraSolicitudGuias(
    $filter: ModelAventuraSolicitudGuiasFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAventuraSolicitudGuias(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const aventuraSolicitudGuiasByAventuraId = /* GraphQL */ `
  query AventuraSolicitudGuiasByAventuraId(
    $aventuraId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAventuraSolicitudGuiasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    aventuraSolicitudGuiasByAventuraId(
      aventuraId: $aventuraId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const aventuraSolicitudGuiasBySolicitudGuiaId = /* GraphQL */ `
  query AventuraSolicitudGuiasBySolicitudGuiaId(
    $solicitudGuiaId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAventuraSolicitudGuiasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    aventuraSolicitudGuiasBySolicitudGuiaId(
      solicitudGuiaId: $solicitudGuiaId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getAventuraUsuarios = /* GraphQL */ `
  query GetAventuraUsuarios($id: ID!) {
    getAventuraUsuarios(id: $id) {
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
export const listAventuraUsuarios = /* GraphQL */ `
  query ListAventuraUsuarios(
    $filter: ModelAventuraUsuariosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAventuraUsuarios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncAventuraUsuarios = /* GraphQL */ `
  query SyncAventuraUsuarios(
    $filter: ModelAventuraUsuariosFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAventuraUsuarios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const aventuraUsuariosByAventuraId = /* GraphQL */ `
  query AventuraUsuariosByAventuraId(
    $aventuraId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAventuraUsuariosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    aventuraUsuariosByAventuraId(
      aventuraId: $aventuraId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const aventuraUsuariosByUsuarioId = /* GraphQL */ `
  query AventuraUsuariosByUsuarioId(
    $usuarioId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAventuraUsuariosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    aventuraUsuariosByUsuarioId(
      usuarioId: $usuarioId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
