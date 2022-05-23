/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      nextToken
      startedAt
    }
  }
`;
export const getAventura = /* GraphQL */ `
  query GetAventura($id: ID!) {
    getAventura(id: $id) {
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
export const listAventuras = /* GraphQL */ `
  query ListAventuras(
    $filter: ModelAventuraFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAventuras(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
  }
`;
export const getReserva = /* GraphQL */ `
  query GetReserva($id: ID!) {
    getReserva(id: $id) {
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
export const listReservas = /* GraphQL */ `
  query ListReservas(
    $filter: ModelReservaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservas(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          nextToken
          startedAt
        }
        ChatRoom {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
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
export const listFechas = /* GraphQL */ `
  query ListFechas(
    $filter: ModelFechaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFechas(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        Reservas {
          nextToken
          startedAt
        }
        ChatRoom {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
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
      nextToken
      startedAt
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
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
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
  }
`;
export const getMensaje = /* GraphQL */ `
  query GetMensaje($id: ID!) {
    getMensaje(id: $id) {
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
export const listMensajes = /* GraphQL */ `
  query ListMensajes(
    $filter: ModelMensajeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMensajes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
      startedAt
    }
  }
`;
export const getSolicitudGuia = /* GraphQL */ `
  query GetSolicitudGuia($id: ID!) {
    getSolicitudGuia(id: $id) {
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
export const listSolicitudGuias = /* GraphQL */ `
  query ListSolicitudGuias(
    $filter: ModelSolicitudGuiaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSolicitudGuias(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
  }
`;
export const getNotificacion = /* GraphQL */ `
  query GetNotificacion($id: ID!) {
    getNotificacion(id: $id) {
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
export const listNotificacions = /* GraphQL */ `
  query ListNotificacions(
    $filter: ModelNotificacionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificacions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getComentario = /* GraphQL */ `
  query GetComentario($id: ID!) {
    getComentario(id: $id) {
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
export const listComentarios = /* GraphQL */ `
  query ListComentarios(
    $filter: ModelComentarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComentarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
      startedAt
    }
  }
`;
export const getPublicidad = /* GraphQL */ `
  query GetPublicidad($id: ID!) {
    getPublicidad(id: $id) {
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
export const listPublicidads = /* GraphQL */ `
  query ListPublicidads(
    $filter: ModelPublicidadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPublicidads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          _version
          _deleted
          _lastChangedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAventuraSolicitudGuia = /* GraphQL */ `
  query GetAventuraSolicitudGuia($id: ID!) {
    getAventuraSolicitudGuia(id: $id) {
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
export const listAventuraSolicitudGuias = /* GraphQL */ `
  query ListAventuraSolicitudGuias(
    $filter: ModelAventuraSolicitudGuiaFilterInput
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
          _version
          _deleted
          _lastChangedAt
        }
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
          _version
          _deleted
          _lastChangedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getAventuraUsuario = /* GraphQL */ `
  query GetAventuraUsuario($id: ID!) {
    getAventuraUsuario(id: $id) {
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
export const listAventuraUsuarios = /* GraphQL */ `
  query ListAventuraUsuarios(
    $filter: ModelAventuraUsuarioFilterInput
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
          _version
          _deleted
          _lastChangedAt
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
          fechaID
          guiaID
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
          _version
          _deleted
          _lastChangedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getChatRoomUsuario = /* GraphQL */ `
  query GetChatRoomUsuario($id: ID!) {
    getChatRoomUsuario(id: $id) {
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
          fechaID
          guiaID
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
          _version
          _deleted
          _lastChangedAt
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
export const listUsuarios = /* GraphQL */ `
  query ListUsuarios(
    $filter: ModelUsuarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsuarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
