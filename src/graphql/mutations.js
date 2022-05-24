/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPaymentIntent = /* GraphQL */ `
  mutation CreatePaymentIntent(
    $amount: Float!
    $destinationStripeID: String!
    $comision: Float!
    $fechaID: String!
    $usuarioID: String!
  ) {
    createPaymentIntent(
      amount: $amount
      destinationStripeID: $destinationStripeID
      comision: $comision
      fechaID: $fechaID
      usuarioID: $usuarioID
    ) {
      id
      clientSecret
    }
  }
`;
export const createStripeAccount = /* GraphQL */ `
  mutation CreateStripeAccount(
    $email: AWSEmail!
    $phone: AWSPhone!
    $first_name: String!
    $last_name: String!
    $accountNumber: String!
    $userSub: ID!
    $documentIdBack: String!
    $documentIdFront: String!
    $day: Int!
    $month: Int!
    $year: Int!
    $city: String!
    $country: String!
    $line1: String!
    $postal_code: Int!
    $state: String!
    $ip: AWSIPAddress!
    $date: AWSTimestamp!
    $companyName: String
    $url: AWSURL
    $accountType: AccountType!
    $rfcIndividual: String
    $rfcCompania: String
  ) {
    createStripeAccount(
      email: $email
      phone: $phone
      first_name: $first_name
      last_name: $last_name
      accountNumber: $accountNumber
      userSub: $userSub
      documentIdBack: $documentIdBack
      documentIdFront: $documentIdFront
      day: $day
      month: $month
      year: $year
      city: $city
      country: $country
      line1: $line1
      postal_code: $postal_code
      state: $state
      ip: $ip
      date: $date
      companyName: $companyName
      url: $url
      accountType: $accountType
      rfcIndividual: $rfcIndividual
      rfcCompania: $rfcCompania
    ) {
      id
      errors
    }
  }
`;
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
          aventuraID
          solicitudGuiaID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
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
          owner
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
          aventuraID
          solicitudGuiaID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
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
          owner
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
          aventuraID
          solicitudGuiaID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
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
          owner
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
          owner
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
          chatRoomLastMessageId
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
          owner
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
          chatRoomLastMessageId
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
          owner
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
          chatRoomLastMessageId
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
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
          aventuraID
          usuarioID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
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
          chatRoomMensajesId
          owner
        }
        nextToken
        startedAt
      }
      ChatRooms {
        items {
          id
          usuarioID
          chatRoomID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
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
          owner
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
          owner
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
          owner
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
          aventuraID
          usuarioID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
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
          chatRoomMensajesId
          owner
        }
        nextToken
        startedAt
      }
      ChatRooms {
        items {
          id
          usuarioID
          chatRoomID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
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
          owner
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
          owner
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
          owner
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
          aventuraID
          usuarioID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
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
          chatRoomMensajesId
          owner
        }
        nextToken
        startedAt
      }
      ChatRooms {
        items {
          id
          usuarioID
          chatRoomID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
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
          owner
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
          owner
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
          owner
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
        chatRoomMensajesId
        owner
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
          chatRoomMensajesId
          owner
        }
        nextToken
        startedAt
      }
      Participantes {
        items {
          id
          usuarioID
          chatRoomID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
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
        chatRoomMensajesId
        owner
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
          chatRoomMensajesId
          owner
        }
        nextToken
        startedAt
      }
      Participantes {
        items {
          id
          usuarioID
          chatRoomID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
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
        chatRoomMensajesId
        owner
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
          chatRoomMensajesId
          owner
        }
        nextToken
        startedAt
      }
      Participantes {
        items {
          id
          usuarioID
          chatRoomID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
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
      chatRoomMensajesId
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
      createdAt
      updatedAt
      content
      usuarioID
      chatroomID
      _version
      _deleted
      _lastChangedAt
      chatRoomMensajesId
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
      createdAt
      updatedAt
      content
      usuarioID
      chatroomID
      _version
      _deleted
      _lastChangedAt
      chatRoomMensajesId
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
          aventuraID
          solicitudGuiaID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
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
          aventuraID
          solicitudGuiaID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
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
          aventuraID
          solicitudGuiaID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
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
      owner
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
      owner
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
      owner
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
export const createAventuraSolicitudGuias = /* GraphQL */ `
  mutation CreateAventuraSolicitudGuias(
    $input: CreateAventuraSolicitudGuiasInput!
    $condition: ModelAventuraSolicitudGuiasConditionInput
  ) {
    createAventuraSolicitudGuias(input: $input, condition: $condition) {
      id
      aventuraID
      solicitudGuiaID
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
      solicitudGuia {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateAventuraSolicitudGuias = /* GraphQL */ `
  mutation UpdateAventuraSolicitudGuias(
    $input: UpdateAventuraSolicitudGuiasInput!
    $condition: ModelAventuraSolicitudGuiasConditionInput
  ) {
    updateAventuraSolicitudGuias(input: $input, condition: $condition) {
      id
      aventuraID
      solicitudGuiaID
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
      solicitudGuia {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteAventuraSolicitudGuias = /* GraphQL */ `
  mutation DeleteAventuraSolicitudGuias(
    $input: DeleteAventuraSolicitudGuiasInput!
    $condition: ModelAventuraSolicitudGuiasConditionInput
  ) {
    deleteAventuraSolicitudGuias(input: $input, condition: $condition) {
      id
      aventuraID
      solicitudGuiaID
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
      solicitudGuia {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createAventuraUsuarios = /* GraphQL */ `
  mutation CreateAventuraUsuarios(
    $input: CreateAventuraUsuariosInput!
    $condition: ModelAventuraUsuariosConditionInput
  ) {
    createAventuraUsuarios(input: $input, condition: $condition) {
      id
      aventuraID
      usuarioID
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateAventuraUsuarios = /* GraphQL */ `
  mutation UpdateAventuraUsuarios(
    $input: UpdateAventuraUsuariosInput!
    $condition: ModelAventuraUsuariosConditionInput
  ) {
    updateAventuraUsuarios(input: $input, condition: $condition) {
      id
      aventuraID
      usuarioID
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteAventuraUsuarios = /* GraphQL */ `
  mutation DeleteAventuraUsuarios(
    $input: DeleteAventuraUsuariosInput!
    $condition: ModelAventuraUsuariosConditionInput
  ) {
    deleteAventuraUsuarios(input: $input, condition: $condition) {
      id
      aventuraID
      usuarioID
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createChatRoomUsuarios = /* GraphQL */ `
  mutation CreateChatRoomUsuarios(
    $input: CreateChatRoomUsuariosInput!
    $condition: ModelChatRoomUsuariosConditionInput
  ) {
    createChatRoomUsuarios(input: $input, condition: $condition) {
      id
      usuarioID
      chatRoomID
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
      chatRoom {
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
          chatRoomMensajesId
          owner
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
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateChatRoomUsuarios = /* GraphQL */ `
  mutation UpdateChatRoomUsuarios(
    $input: UpdateChatRoomUsuariosInput!
    $condition: ModelChatRoomUsuariosConditionInput
  ) {
    updateChatRoomUsuarios(input: $input, condition: $condition) {
      id
      usuarioID
      chatRoomID
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
      chatRoom {
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
          chatRoomMensajesId
          owner
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
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteChatRoomUsuarios = /* GraphQL */ `
  mutation DeleteChatRoomUsuarios(
    $input: DeleteChatRoomUsuariosInput!
    $condition: ModelChatRoomUsuariosConditionInput
  ) {
    deleteChatRoomUsuarios(input: $input, condition: $condition) {
      id
      usuarioID
      chatRoomID
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
      chatRoom {
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
          chatRoomMensajesId
          owner
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
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
