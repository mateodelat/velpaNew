/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAventura = /* GraphQL */ `
  mutation CreateAventura(
    $input: CreateAventuraInput!
    $condition: ModelAventuraConditionInput
  ) {
    createAventura(input: $input, condition: $condition) {
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
      ubicacionLink
      comision
      estadoAventura
      coordenadas
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
      puntoReunionNombre
      puntoReunionLink
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
          titulo
          descripcion
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
          owner
        }
        nextToken
        startedAt
      }
      UsuariosAutorizados {
        items {
          id
          aventuraID
          usuarioID
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
export const updateAventura = /* GraphQL */ `
  mutation UpdateAventura(
    $input: UpdateAventuraInput!
    $condition: ModelAventuraConditionInput
  ) {
    updateAventura(input: $input, condition: $condition) {
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
      ubicacionLink
      comision
      estadoAventura
      coordenadas
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
      puntoReunionNombre
      puntoReunionLink
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
          titulo
          descripcion
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
          owner
        }
        nextToken
        startedAt
      }
      UsuariosAutorizados {
        items {
          id
          aventuraID
          usuarioID
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
export const deleteAventura = /* GraphQL */ `
  mutation DeleteAventura(
    $input: DeleteAventuraInput!
    $condition: ModelAventuraConditionInput
  ) {
    deleteAventura(input: $input, condition: $condition) {
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
      ubicacionLink
      comision
      estadoAventura
      coordenadas
      altitud
      distanciaRecorrida
      altimetriaRecorrida
      categoria
      puntoReunionNombre
      puntoReunionLink
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
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
          titulo
          descripcion
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
          owner
        }
        nextToken
        startedAt
      }
      UsuariosAutorizados {
        items {
          id
          aventuraID
          usuarioID
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
export const createReserva = /* GraphQL */ `
  mutation CreateReserva(
    $input: CreateReservaInput!
    $condition: ModelReservaConditionInput
  ) {
    createReserva(input: $input, condition: $condition) {
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
      owner
    }
  }
`;
export const updateReserva = /* GraphQL */ `
  mutation UpdateReserva(
    $input: UpdateReservaInput!
    $condition: ModelReservaConditionInput
  ) {
    updateReserva(input: $input, condition: $condition) {
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
      owner
    }
  }
`;
export const deleteReserva = /* GraphQL */ `
  mutation DeleteReserva(
    $input: DeleteReservaInput!
    $condition: ModelReservaConditionInput
  ) {
    deleteReserva(input: $input, condition: $condition) {
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
      owner
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
      titulo
      descripcion
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
          owner
        }
        nextToken
        startedAt
      }
      owner
    }
  }
`;
export const updateFecha = /* GraphQL */ `
  mutation UpdateFecha(
    $input: UpdateFechaInput!
    $condition: ModelFechaConditionInput
  ) {
    updateFecha(input: $input, condition: $condition) {
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
      titulo
      descripcion
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
          owner
        }
        nextToken
        startedAt
      }
      owner
    }
  }
`;
export const deleteFecha = /* GraphQL */ `
  mutation DeleteFecha(
    $input: DeleteFechaInput!
    $condition: ModelFechaConditionInput
  ) {
    deleteFecha(input: $input, condition: $condition) {
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
      titulo
      descripcion
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
          owner
        }
        nextToken
        startedAt
      }
      owner
    }
  }
`;
export const createUsuario = /* GraphQL */ `
  mutation CreateUsuario(
    $input: CreateUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    createUsuario(input: $input, condition: $condition) {
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
      owner
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
          owner
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
          titulo
          descripcion
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
          owner
        }
        nextToken
        startedAt
      }
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
      AventurasAutorizadas {
        items {
          id
          aventuraID
          usuarioID
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
          owner
        }
        nextToken
        startedAt
      }
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
      owner
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
          owner
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
          titulo
          descripcion
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
          owner
        }
        nextToken
        startedAt
      }
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
      AventurasAutorizadas {
        items {
          id
          aventuraID
          usuarioID
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
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteUsuario = /* GraphQL */ `
  mutation DeleteUsuario(
    $input: DeleteUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    deleteUsuario(input: $input, condition: $condition) {
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
      owner
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
          owner
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
          titulo
          descripcion
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
          owner
        }
        nextToken
        startedAt
      }
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
      AventurasAutorizadas {
        items {
          id
          aventuraID
          usuarioID
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
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
        titulo
        descripcion
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Reservas {
          nextToken
          startedAt
        }
        owner
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
          owner
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
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
        titulo
        descripcion
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Reservas {
          nextToken
          startedAt
        }
        owner
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
          owner
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
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
        titulo
        descripcion
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Reservas {
          nextToken
          startedAt
        }
        owner
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
          owner
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
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const createMensaje = /* GraphQL */ `
  mutation CreateMensaje(
    $input: CreateMensajeInput!
    $condition: ModelMensajeConditionInput
  ) {
    createMensaje(input: $input, condition: $condition) {
      id
      content
      usuarioID
      chatroomID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateMensaje = /* GraphQL */ `
  mutation UpdateMensaje(
    $input: UpdateMensajeInput!
    $condition: ModelMensajeConditionInput
  ) {
    updateMensaje(input: $input, condition: $condition) {
      id
      content
      usuarioID
      chatroomID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteMensaje = /* GraphQL */ `
  mutation DeleteMensaje(
    $input: DeleteMensajeInput!
    $condition: ModelMensajeConditionInput
  ) {
    deleteMensaje(input: $input, condition: $condition) {
      id
      content
      usuarioID
      chatroomID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createSolicitudGuia = /* GraphQL */ `
  mutation CreateSolicitudGuia(
    $input: CreateSolicitudGuiaInput!
    $condition: ModelSolicitudGuiaConditionInput
  ) {
    createSolicitudGuia(input: $input, condition: $condition) {
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
          aventuraID
          solicitudguiaID
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
export const updateSolicitudGuia = /* GraphQL */ `
  mutation UpdateSolicitudGuia(
    $input: UpdateSolicitudGuiaInput!
    $condition: ModelSolicitudGuiaConditionInput
  ) {
    updateSolicitudGuia(input: $input, condition: $condition) {
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
          aventuraID
          solicitudguiaID
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
export const deleteSolicitudGuia = /* GraphQL */ `
  mutation DeleteSolicitudGuia(
    $input: DeleteSolicitudGuiaInput!
    $condition: ModelSolicitudGuiaConditionInput
  ) {
    deleteSolicitudGuia(input: $input, condition: $condition) {
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
          aventuraID
          solicitudguiaID
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
export const createAventuraSolicitudGuia = /* GraphQL */ `
  mutation CreateAventuraSolicitudGuia(
    $input: CreateAventuraSolicitudGuiaInput!
    $condition: ModelAventuraSolicitudGuiaConditionInput
  ) {
    createAventuraSolicitudGuia(input: $input, condition: $condition) {
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
        ubicacionLink
        comision
        estadoAventura
        coordenadas
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        puntoReunionNombre
        puntoReunionLink
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
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
      owner
    }
  }
`;
export const updateAventuraSolicitudGuia = /* GraphQL */ `
  mutation UpdateAventuraSolicitudGuia(
    $input: UpdateAventuraSolicitudGuiaInput!
    $condition: ModelAventuraSolicitudGuiaConditionInput
  ) {
    updateAventuraSolicitudGuia(input: $input, condition: $condition) {
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
        ubicacionLink
        comision
        estadoAventura
        coordenadas
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        puntoReunionNombre
        puntoReunionLink
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
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
      owner
    }
  }
`;
export const deleteAventuraSolicitudGuia = /* GraphQL */ `
  mutation DeleteAventuraSolicitudGuia(
    $input: DeleteAventuraSolicitudGuiaInput!
    $condition: ModelAventuraSolicitudGuiaConditionInput
  ) {
    deleteAventuraSolicitudGuia(input: $input, condition: $condition) {
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
        ubicacionLink
        comision
        estadoAventura
        coordenadas
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        puntoReunionNombre
        puntoReunionLink
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
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
      owner
    }
  }
`;
export const createAventuraUsuario = /* GraphQL */ `
  mutation CreateAventuraUsuario(
    $input: CreateAventuraUsuarioInput!
    $condition: ModelAventuraUsuarioConditionInput
  ) {
    createAventuraUsuario(input: $input, condition: $condition) {
      id
      aventuraID
      usuarioID
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
        ubicacionLink
        comision
        estadoAventura
        coordenadas
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        puntoReunionNombre
        puntoReunionLink
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
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
        owner
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
        SolicitudesEvaluadas {
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
      owner
    }
  }
`;
export const updateAventuraUsuario = /* GraphQL */ `
  mutation UpdateAventuraUsuario(
    $input: UpdateAventuraUsuarioInput!
    $condition: ModelAventuraUsuarioConditionInput
  ) {
    updateAventuraUsuario(input: $input, condition: $condition) {
      id
      aventuraID
      usuarioID
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
        ubicacionLink
        comision
        estadoAventura
        coordenadas
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        puntoReunionNombre
        puntoReunionLink
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
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
        owner
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
        SolicitudesEvaluadas {
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
      owner
    }
  }
`;
export const deleteAventuraUsuario = /* GraphQL */ `
  mutation DeleteAventuraUsuario(
    $input: DeleteAventuraUsuarioInput!
    $condition: ModelAventuraUsuarioConditionInput
  ) {
    deleteAventuraUsuario(input: $input, condition: $condition) {
      id
      aventuraID
      usuarioID
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
        ubicacionLink
        comision
        estadoAventura
        coordenadas
        altitud
        distanciaRecorrida
        altimetriaRecorrida
        categoria
        puntoReunionNombre
        puntoReunionLink
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
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
        owner
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
        SolicitudesEvaluadas {
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
      owner
    }
  }
`;
export const createChatRoomUsuario = /* GraphQL */ `
  mutation CreateChatRoomUsuario(
    $input: CreateChatRoomUsuarioInput!
    $condition: ModelChatRoomUsuarioConditionInput
  ) {
    createChatRoomUsuario(input: $input, condition: $condition) {
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
        owner
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
        SolicitudesEvaluadas {
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
          titulo
          descripcion
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
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
      owner
    }
  }
`;
export const updateChatRoomUsuario = /* GraphQL */ `
  mutation UpdateChatRoomUsuario(
    $input: UpdateChatRoomUsuarioInput!
    $condition: ModelChatRoomUsuarioConditionInput
  ) {
    updateChatRoomUsuario(input: $input, condition: $condition) {
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
        owner
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
        SolicitudesEvaluadas {
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
          titulo
          descripcion
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
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
      owner
    }
  }
`;
export const deleteChatRoomUsuario = /* GraphQL */ `
  mutation DeleteChatRoomUsuario(
    $input: DeleteChatRoomUsuarioInput!
    $condition: ModelChatRoomUsuarioConditionInput
  ) {
    deleteChatRoomUsuario(input: $input, condition: $condition) {
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
        owner
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
        SolicitudesEvaluadas {
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
          titulo
          descripcion
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
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
      owner
    }
  }
`;
