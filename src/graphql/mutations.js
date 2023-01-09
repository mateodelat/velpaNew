/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPaymentIntent = /* GraphQL */ `
  mutation CreatePaymentIntent(
    $amount: Float!
    $destinationStripeID: String!
    $comision: Float!
    $otherFees: String
    $fechaID: String!
    $usuarioID: String!
    $reservaID: String!
    $description: String
    $email: String
  ) {
    createPaymentIntent(
      amount: $amount
      destinationStripeID: $destinationStripeID
      comision: $comision
      otherFees: $otherFees
      fechaID: $fechaID
      usuarioID: $usuarioID
      reservaID: $reservaID
      description: $description
      email: $email
    ) {
      id
      clientSecret
      error
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
export const createReserva = /* GraphQL */ `
  mutation CreateReserva(
    $input: CreateReservaInput!
    $condition: ModelReservaConditionInput
  ) {
    createReserva(input: $input, condition: $condition) {
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
export const updateReserva = /* GraphQL */ `
  mutation UpdateReserva(
    $input: UpdateReservaInput!
    $condition: ModelReservaConditionInput
  ) {
    updateReserva(input: $input, condition: $condition) {
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
export const deleteReserva = /* GraphQL */ `
  mutation DeleteReserva(
    $input: DeleteReservaInput!
    $condition: ModelReservaConditionInput
  ) {
    deleteReserva(input: $input, condition: $condition) {
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
export const createUsuario = /* GraphQL */ `
  mutation CreateUsuario(
    $input: CreateUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    createUsuario(input: $input, condition: $condition) {
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
export const updateUsuario = /* GraphQL */ `
  mutation UpdateUsuario(
    $input: UpdateUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    updateUsuario(input: $input, condition: $condition) {
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
export const deleteUsuario = /* GraphQL */ `
  mutation DeleteUsuario(
    $input: DeleteUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    deleteUsuario(input: $input, condition: $condition) {
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
export const createComision = /* GraphQL */ `
  mutation CreateComision(
    $input: CreateComisionInput!
    $condition: ModelComisionConditionInput
  ) {
    createComision(input: $input, condition: $condition) {
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
export const updateComision = /* GraphQL */ `
  mutation UpdateComision(
    $input: UpdateComisionInput!
    $condition: ModelComisionConditionInput
  ) {
    updateComision(input: $input, condition: $condition) {
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
export const deleteComision = /* GraphQL */ `
  mutation DeleteComision(
    $input: DeleteComisionInput!
    $condition: ModelComisionConditionInput
  ) {
    deleteComision(input: $input, condition: $condition) {
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
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
export const updateSolicitudGuia = /* GraphQL */ `
  mutation UpdateSolicitudGuia(
    $input: UpdateSolicitudGuiaInput!
    $condition: ModelSolicitudGuiaConditionInput
  ) {
    updateSolicitudGuia(input: $input, condition: $condition) {
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
export const deleteSolicitudGuia = /* GraphQL */ `
  mutation DeleteSolicitudGuia(
    $input: DeleteSolicitudGuiaInput!
    $condition: ModelSolicitudGuiaConditionInput
  ) {
    deleteSolicitudGuia(input: $input, condition: $condition) {
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
export const createNotificacion = /* GraphQL */ `
  mutation CreateNotificacion(
    $input: CreateNotificacionInput!
    $condition: ModelNotificacionConditionInput
  ) {
    createNotificacion(input: $input, condition: $condition) {
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
export const updateNotificacion = /* GraphQL */ `
  mutation UpdateNotificacion(
    $input: UpdateNotificacionInput!
    $condition: ModelNotificacionConditionInput
  ) {
    updateNotificacion(input: $input, condition: $condition) {
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
export const deleteNotificacion = /* GraphQL */ `
  mutation DeleteNotificacion(
    $input: DeleteNotificacionInput!
    $condition: ModelNotificacionConditionInput
  ) {
    deleteNotificacion(input: $input, condition: $condition) {
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
export const createComentario = /* GraphQL */ `
  mutation CreateComentario(
    $input: CreateComentarioInput!
    $condition: ModelComentarioConditionInput
  ) {
    createComentario(input: $input, condition: $condition) {
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
export const updateComentario = /* GraphQL */ `
  mutation UpdateComentario(
    $input: UpdateComentarioInput!
    $condition: ModelComentarioConditionInput
  ) {
    updateComentario(input: $input, condition: $condition) {
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
export const deleteComentario = /* GraphQL */ `
  mutation DeleteComentario(
    $input: DeleteComentarioInput!
    $condition: ModelComentarioConditionInput
  ) {
    deleteComentario(input: $input, condition: $condition) {
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
export const createPublicidad = /* GraphQL */ `
  mutation CreatePublicidad(
    $input: CreatePublicidadInput!
    $condition: ModelPublicidadConditionInput
  ) {
    createPublicidad(input: $input, condition: $condition) {
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
export const updatePublicidad = /* GraphQL */ `
  mutation UpdatePublicidad(
    $input: UpdatePublicidadInput!
    $condition: ModelPublicidadConditionInput
  ) {
    updatePublicidad(input: $input, condition: $condition) {
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
export const deletePublicidad = /* GraphQL */ `
  mutation DeletePublicidad(
    $input: DeletePublicidadInput!
    $condition: ModelPublicidadConditionInput
  ) {
    deletePublicidad(input: $input, condition: $condition) {
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
export const createChatRoomUsuarios = /* GraphQL */ `
  mutation CreateChatRoomUsuarios(
    $input: CreateChatRoomUsuariosInput!
    $condition: ModelChatRoomUsuariosConditionInput
  ) {
    createChatRoomUsuarios(input: $input, condition: $condition) {
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
export const updateChatRoomUsuarios = /* GraphQL */ `
  mutation UpdateChatRoomUsuarios(
    $input: UpdateChatRoomUsuariosInput!
    $condition: ModelChatRoomUsuariosConditionInput
  ) {
    updateChatRoomUsuarios(input: $input, condition: $condition) {
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
export const deleteChatRoomUsuarios = /* GraphQL */ `
  mutation DeleteChatRoomUsuarios(
    $input: DeleteChatRoomUsuariosInput!
    $condition: ModelChatRoomUsuariosConditionInput
  ) {
    deleteChatRoomUsuarios(input: $input, condition: $condition) {
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
export const createAventuraSolicitudGuias = /* GraphQL */ `
  mutation CreateAventuraSolicitudGuias(
    $input: CreateAventuraSolicitudGuiasInput!
    $condition: ModelAventuraSolicitudGuiasConditionInput
  ) {
    createAventuraSolicitudGuias(input: $input, condition: $condition) {
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
export const updateAventuraSolicitudGuias = /* GraphQL */ `
  mutation UpdateAventuraSolicitudGuias(
    $input: UpdateAventuraSolicitudGuiasInput!
    $condition: ModelAventuraSolicitudGuiasConditionInput
  ) {
    updateAventuraSolicitudGuias(input: $input, condition: $condition) {
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
export const deleteAventuraSolicitudGuias = /* GraphQL */ `
  mutation DeleteAventuraSolicitudGuias(
    $input: DeleteAventuraSolicitudGuiasInput!
    $condition: ModelAventuraSolicitudGuiasConditionInput
  ) {
    deleteAventuraSolicitudGuias(input: $input, condition: $condition) {
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
export const createAventuraUsuarios = /* GraphQL */ `
  mutation CreateAventuraUsuarios(
    $input: CreateAventuraUsuariosInput!
    $condition: ModelAventuraUsuariosConditionInput
  ) {
    createAventuraUsuarios(input: $input, condition: $condition) {
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
export const updateAventuraUsuarios = /* GraphQL */ `
  mutation UpdateAventuraUsuarios(
    $input: UpdateAventuraUsuariosInput!
    $condition: ModelAventuraUsuariosConditionInput
  ) {
    updateAventuraUsuarios(input: $input, condition: $condition) {
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
export const deleteAventuraUsuarios = /* GraphQL */ `
  mutation DeleteAventuraUsuarios(
    $input: DeleteAventuraUsuariosInput!
    $condition: ModelAventuraUsuariosConditionInput
  ) {
    deleteAventuraUsuarios(input: $input, condition: $condition) {
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
