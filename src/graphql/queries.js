/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAventura = /* GraphQL */ `
  query GetAventura($id: ID!) {
    getAventura(id: $id) {
      id
      titulo
      owner
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
          owner
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
        owner
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
        owner
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
      nextToken
      startedAt
    }
  }
`;
export const getReserva = /* GraphQL */ `
  query GetReserva($id: ID!) {
    getReserva(id: $id) {
      id
      owner
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
export const listReservas = /* GraphQL */ `
  query ListReservas(
    $filter: ModelReservaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
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
        owner
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
  }
`;
export const getFecha = /* GraphQL */ `
  query GetFecha($id: ID!) {
    getFecha(id: $id) {
      id
      personasTotales
      owner
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
          owner
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
        owner
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
          nextToken
          startedAt
        }
        ChatRoom {
          nextToken
          startedAt
        }
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
        owner
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
          nextToken
          startedAt
        }
        ChatRoom {
          nextToken
          startedAt
        }
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
          owner
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
          owner
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
`;
export const getSolicitudGuia = /* GraphQL */ `
  query GetSolicitudGuia($id: ID!) {
    getSolicitudGuia(id: $id) {
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
export const listSolicitudGuias = /* GraphQL */ `
  query ListSolicitudGuias(
    $filter: ModelSolicitudGuiaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSolicitudGuias(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        Aventuras {
          nextToken
          startedAt
        }
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
      _version
      _deleted
      _lastChangedAt
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
        usuarioCalificadoID
        body
        calificacion
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
`;
export const syncAventuraSolicitudGuias = /* GraphQL */ `
  query SyncAventuraSolicitudGuias(
    $filter: ModelAventuraSolicitudGuiaFilterInput
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
        aventuraID
        solicitudguiaID
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        aventura {
          id
          titulo
          owner
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
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAventuraUsuarios = /* GraphQL */ `
  query SyncAventuraUsuarios(
    $filter: ModelAventuraUsuarioFilterInput
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
          owner
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
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncChatRoomUsuarios = /* GraphQL */ `
  query SyncChatRoomUsuarios(
    $filter: ModelChatRoomUsuarioFilterInput
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
        }
      }
      nextToken
      startedAt
    }
  }
`;
