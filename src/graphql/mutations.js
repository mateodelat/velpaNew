/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAventura = /* GraphQL */ `
  mutation CreateAventura(
    $input: CreateAventuraInput!
    $condition: ModelAventuraConditionInput
  ) {
    createAventura(input: $input, condition: $condition) {
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
export const updateAventura = /* GraphQL */ `
  mutation UpdateAventura(
    $input: UpdateAventuraInput!
    $condition: ModelAventuraConditionInput
  ) {
    updateAventura(input: $input, condition: $condition) {
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
export const deleteAventura = /* GraphQL */ `
  mutation DeleteAventura(
    $input: DeleteAventuraInput!
    $condition: ModelAventuraConditionInput
  ) {
    deleteAventura(input: $input, condition: $condition) {
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
export const createReserva = /* GraphQL */ `
  mutation CreateReserva(
    $input: CreateReservaInput!
    $condition: ModelReservaConditionInput
  ) {
    createReserva(input: $input, condition: $condition) {
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
export const updateReserva = /* GraphQL */ `
  mutation UpdateReserva(
    $input: UpdateReservaInput!
    $condition: ModelReservaConditionInput
  ) {
    updateReserva(input: $input, condition: $condition) {
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
export const deleteReserva = /* GraphQL */ `
  mutation DeleteReserva(
    $input: DeleteReservaInput!
    $condition: ModelReservaConditionInput
  ) {
    deleteReserva(input: $input, condition: $condition) {
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
export const createFecha = /* GraphQL */ `
  mutation CreateFecha(
    $input: CreateFechaInput!
    $condition: ModelFechaConditionInput
  ) {
    createFecha(input: $input, condition: $condition) {
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
export const updateFecha = /* GraphQL */ `
  mutation UpdateFecha(
    $input: UpdateFechaInput!
    $condition: ModelFechaConditionInput
  ) {
    updateFecha(input: $input, condition: $condition) {
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
export const deleteFecha = /* GraphQL */ `
  mutation DeleteFecha(
    $input: DeleteFechaInput!
    $condition: ModelFechaConditionInput
  ) {
    deleteFecha(input: $input, condition: $condition) {
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
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
export const createMensaje = /* GraphQL */ `
  mutation CreateMensaje(
    $input: CreateMensajeInput!
    $condition: ModelMensajeConditionInput
  ) {
    createMensaje(input: $input, condition: $condition) {
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
export const updateMensaje = /* GraphQL */ `
  mutation UpdateMensaje(
    $input: UpdateMensajeInput!
    $condition: ModelMensajeConditionInput
  ) {
    updateMensaje(input: $input, condition: $condition) {
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
export const deleteMensaje = /* GraphQL */ `
  mutation DeleteMensaje(
    $input: DeleteMensajeInput!
    $condition: ModelMensajeConditionInput
  ) {
    deleteMensaje(input: $input, condition: $condition) {
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
export const createSolicitudGuia = /* GraphQL */ `
  mutation CreateSolicitudGuia(
    $input: CreateSolicitudGuiaInput!
    $condition: ModelSolicitudGuiaConditionInput
  ) {
    createSolicitudGuia(input: $input, condition: $condition) {
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
export const updateSolicitudGuia = /* GraphQL */ `
  mutation UpdateSolicitudGuia(
    $input: UpdateSolicitudGuiaInput!
    $condition: ModelSolicitudGuiaConditionInput
  ) {
    updateSolicitudGuia(input: $input, condition: $condition) {
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
export const deleteSolicitudGuia = /* GraphQL */ `
  mutation DeleteSolicitudGuia(
    $input: DeleteSolicitudGuiaInput!
    $condition: ModelSolicitudGuiaConditionInput
  ) {
    deleteSolicitudGuia(input: $input, condition: $condition) {
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
export const updateNotificacion = /* GraphQL */ `
  mutation UpdateNotificacion(
    $input: UpdateNotificacionInput!
    $condition: ModelNotificacionConditionInput
  ) {
    updateNotificacion(input: $input, condition: $condition) {
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
export const deleteNotificacion = /* GraphQL */ `
  mutation DeleteNotificacion(
    $input: DeleteNotificacionInput!
    $condition: ModelNotificacionConditionInput
  ) {
    deleteNotificacion(input: $input, condition: $condition) {
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
export const createComentario = /* GraphQL */ `
  mutation CreateComentario(
    $input: CreateComentarioInput!
    $condition: ModelComentarioConditionInput
  ) {
    createComentario(input: $input, condition: $condition) {
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
export const updateComentario = /* GraphQL */ `
  mutation UpdateComentario(
    $input: UpdateComentarioInput!
    $condition: ModelComentarioConditionInput
  ) {
    updateComentario(input: $input, condition: $condition) {
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
export const deleteComentario = /* GraphQL */ `
  mutation DeleteComentario(
    $input: DeleteComentarioInput!
    $condition: ModelComentarioConditionInput
  ) {
    deleteComentario(input: $input, condition: $condition) {
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
export const createPublicidad = /* GraphQL */ `
  mutation CreatePublicidad(
    $input: CreatePublicidadInput!
    $condition: ModelPublicidadConditionInput
  ) {
    createPublicidad(input: $input, condition: $condition) {
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
export const updatePublicidad = /* GraphQL */ `
  mutation UpdatePublicidad(
    $input: UpdatePublicidadInput!
    $condition: ModelPublicidadConditionInput
  ) {
    updatePublicidad(input: $input, condition: $condition) {
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
export const deletePublicidad = /* GraphQL */ `
  mutation DeletePublicidad(
    $input: DeletePublicidadInput!
    $condition: ModelPublicidadConditionInput
  ) {
    deletePublicidad(input: $input, condition: $condition) {
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
export const createAventuraSolicitudGuia = /* GraphQL */ `
  mutation CreateAventuraSolicitudGuia(
    $input: CreateAventuraSolicitudGuiaInput!
    $condition: ModelAventuraSolicitudGuiaConditionInput
  ) {
    createAventuraSolicitudGuia(input: $input, condition: $condition) {
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
export const updateAventuraSolicitudGuia = /* GraphQL */ `
  mutation UpdateAventuraSolicitudGuia(
    $input: UpdateAventuraSolicitudGuiaInput!
    $condition: ModelAventuraSolicitudGuiaConditionInput
  ) {
    updateAventuraSolicitudGuia(input: $input, condition: $condition) {
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
export const deleteAventuraSolicitudGuia = /* GraphQL */ `
  mutation DeleteAventuraSolicitudGuia(
    $input: DeleteAventuraSolicitudGuiaInput!
    $condition: ModelAventuraSolicitudGuiaConditionInput
  ) {
    deleteAventuraSolicitudGuia(input: $input, condition: $condition) {
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
export const createAventuraUsuario = /* GraphQL */ `
  mutation CreateAventuraUsuario(
    $input: CreateAventuraUsuarioInput!
    $condition: ModelAventuraUsuarioConditionInput
  ) {
    createAventuraUsuario(input: $input, condition: $condition) {
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
export const updateAventuraUsuario = /* GraphQL */ `
  mutation UpdateAventuraUsuario(
    $input: UpdateAventuraUsuarioInput!
    $condition: ModelAventuraUsuarioConditionInput
  ) {
    updateAventuraUsuario(input: $input, condition: $condition) {
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
export const deleteAventuraUsuario = /* GraphQL */ `
  mutation DeleteAventuraUsuario(
    $input: DeleteAventuraUsuarioInput!
    $condition: ModelAventuraUsuarioConditionInput
  ) {
    deleteAventuraUsuario(input: $input, condition: $condition) {
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
export const createChatRoomUsuario = /* GraphQL */ `
  mutation CreateChatRoomUsuario(
    $input: CreateChatRoomUsuarioInput!
    $condition: ModelChatRoomUsuarioConditionInput
  ) {
    createChatRoomUsuario(input: $input, condition: $condition) {
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
export const updateChatRoomUsuario = /* GraphQL */ `
  mutation UpdateChatRoomUsuario(
    $input: UpdateChatRoomUsuarioInput!
    $condition: ModelChatRoomUsuarioConditionInput
  ) {
    updateChatRoomUsuario(input: $input, condition: $condition) {
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
export const deleteChatRoomUsuario = /* GraphQL */ `
  mutation DeleteChatRoomUsuario(
    $input: DeleteChatRoomUsuarioInput!
    $condition: ModelChatRoomUsuarioConditionInput
  ) {
    deleteChatRoomUsuario(input: $input, condition: $condition) {
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
export const createUsuario = /* GraphQL */ `
  mutation CreateUsuario(
    $input: CreateUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    createUsuario(input: $input, condition: $condition) {
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
export const updateUsuario = /* GraphQL */ `
  mutation UpdateUsuario(
    $input: UpdateUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    updateUsuario(input: $input, condition: $condition) {
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
export const deleteUsuario = /* GraphQL */ `
  mutation DeleteUsuario(
    $input: DeleteUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    deleteUsuario(input: $input, condition: $condition) {
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
export const createNotificacion = /* GraphQL */ `
  mutation CreateNotificacion(
    $input: CreateNotificacionInput!
    $condition: ModelNotificacionConditionInput
  ) {
    createNotificacion(input: $input, condition: $condition) {
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
