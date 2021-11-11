/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        comentarios
        evaluadorID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
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
export const getSolicitudGuia = /* GraphQL */ `
  query GetSolicitudGuia($id: ID!) {
    getSolicitudGuia(id: $id) {
      id
      status
      comentarios
      evaluadorID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
      Aventuras {
        items {
          id
          solicitudguiaID
          aventuraID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
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
        id
        status
        comentarios
        evaluadorID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
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
      descripcion
      dificultad
      ubicacionNombre
      ubicacionLink
      comision
      estadoAventura
      coordenadas
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
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
          itinerario
          ubicacionNombre
          ubicacionLink
          allowTercera
          allowNinos
          material
          incluido
          aventuraID
          usuarioID
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
          solicitudguiaID
          aventuraID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
      UsuariosAutorizados {
        items {
          id
          usuarioID
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
        descripcion
        dificultad
        ubicacionNombre
        ubicacionLink
        comision
        estadoAventura
        coordenadas
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
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
        imagenFondo
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcion
        dificultad
        ubicacionNombre
        ubicacionLink
        comision
        estadoAventura
        coordenadas
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
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
      total
      comisionPorPersona
      tercera
      ninos
      adultos
      pagoID
      fechaID
      usuarioID
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
        total
        comisionPorPersona
        tercera
        ninos
        adultos
        pagoID
        fechaID
        usuarioID
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
        total
        comisionPorPersona
        tercera
        ninos
        adultos
        pagoID
        fechaID
        usuarioID
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
      fechaInicial
      fechaFinal
      precio
      comision
      itinerario
      ubicacionNombre
      ubicacionLink
      allowTercera
      allowNinos
      material
      incluido
      aventuraID
      usuarioID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Reservas {
        items {
          id
          total
          comisionPorPersona
          tercera
          ninos
          adultos
          pagoID
          fechaID
          usuarioID
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
        fechaInicial
        fechaFinal
        precio
        comision
        itinerario
        ubicacionNombre
        ubicacionLink
        allowTercera
        allowNinos
        material
        incluido
        aventuraID
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Reservas {
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
        fechaInicial
        fechaFinal
        precio
        comision
        itinerario
        ubicacionNombre
        ubicacionLink
        allowTercera
        allowNinos
        material
        incluido
        aventuraID
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Reservas {
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
      nombre
      apellido
      foto
      nickname
      calificacion
      tipo
      selfie
      INE
      licencia
      comentariosAdicionales
      telefono
      capacidadMaxima
      tarjetaCirculacion
      certificaciones
      sitioWeb
      usuarioRedSocial
      stripeID
      SolicitudesEvaluadas {
        items {
          id
          status
          comentarios
          evaluadorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Reservas {
        items {
          id
          total
          comisionPorPersona
          tercera
          ninos
          adultos
          pagoID
          fechaID
          usuarioID
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
          itinerario
          ubicacionNombre
          ubicacionLink
          allowTercera
          allowNinos
          material
          incluido
          aventuraID
          usuarioID
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
      AventurasAutorizadas {
        items {
          id
          usuarioID
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
      ChatRooms {
        items {
          id
          chatroomID
          usuarioID
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
        nombre
        apellido
        foto
        nickname
        calificacion
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        tarjetaCirculacion
        certificaciones
        sitioWeb
        usuarioRedSocial
        stripeID
        SolicitudesEvaluadas {
          nextToken
          startedAt
        }
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
        nombre
        apellido
        foto
        nickname
        calificacion
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        tarjetaCirculacion
        certificaciones
        sitioWeb
        usuarioRedSocial
        stripeID
        SolicitudesEvaluadas {
          nextToken
          startedAt
        }
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
      newMessages
      lastMessage
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Fecha {
        id
        personasTotales
        fechaInicial
        fechaFinal
        precio
        comision
        itinerario
        ubicacionNombre
        ubicacionLink
        allowTercera
        allowNinos
        material
        incluido
        aventuraID
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Reservas {
          nextToken
          startedAt
        }
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
        newMessages
        lastMessage
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Fecha {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          itinerario
          ubicacionNombre
          ubicacionLink
          allowTercera
          allowNinos
          material
          incluido
          aventuraID
          usuarioID
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
        newMessages
        lastMessage
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Fecha {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          itinerario
          ubicacionNombre
          ubicacionLink
          allowTercera
          allowNinos
          material
          incluido
          aventuraID
          usuarioID
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
        solicitudguiaID
        aventuraID
        solicitudguia {
          id
          status
          comentarios
          evaluadorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        aventura {
          id
          titulo
          imagenFondo
          imagenDetalle
          precioMin
          precioMax
          duracion
          descripcion
          dificultad
          ubicacionNombre
          ubicacionLink
          comision
          estadoAventura
          coordenadas
          altitud
          distanciaRecorrida
          altimetriaRecorrida
          categoria
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        owner
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
        usuarioID
        aventuraID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        aventura {
          id
          titulo
          imagenFondo
          imagenDetalle
          precioMin
          precioMax
          duracion
          descripcion
          dificultad
          ubicacionNombre
          ubicacionLink
          comision
          estadoAventura
          coordenadas
          altitud
          distanciaRecorrida
          altimetriaRecorrida
          categoria
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        usuario {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          tarjetaCirculacion
          certificaciones
          sitioWeb
          usuarioRedSocial
          stripeID
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        usuario {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          tarjetaCirculacion
          certificaciones
          sitioWeb
          usuarioRedSocial
          stripeID
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
          newMessages
          lastMessage
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
