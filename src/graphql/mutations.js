/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPaymentIntent = /* GraphQL */ `
  mutation CreatePaymentIntent(
    $amount: Int!
    $comision: Float!
    $destinationStripeID: String!
  ) {
    createPaymentIntent(
      amount: $amount
      comision: $comision
      destinationStripeID: $destinationStripeID
    ) {
      clientSecret
      id
    }
  }
`;
export const createStripeAcount = /* GraphQL */ `
  mutation CreateStripeAcount($email: String, $sub: ID!, $url: String!) {
    CreateStripeAcount(email: $email, sub: $sub, url: $url) {
      url
    }
  }
`;
export const loginLinkStripe = /* GraphQL */ `
  mutation LoginLinkStripe($stripeID: String!) {
    loginLinkStripe(stripeID: $stripeID) {
      url
    }
  }
`;
export const retrieveBalanceStripe = /* GraphQL */ `
  mutation RetrieveBalanceStripe($stripeID: String!) {
    RetrieveBalanceStripe(stripeID: $stripeID) {
      result
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
      calificacion
      resena
      creadorID
      evaluadoID
      createdAt
      updatedAt
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
      calificacion
      resena
      creadorID
      evaluadoID
      createdAt
      updatedAt
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
      calificacion
      resena
      creadorID
      evaluadoID
      createdAt
      updatedAt
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
      creadorID
      evaluadorID
      status
      comentarios
      createdAt
      updatedAt
      AventurasAVerificar {
        items {
          id
          aventuraID
          solicitudID
          createdAt
          updatedAt
        }
        nextToken
      }
      evaluador {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
      Usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
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
      creadorID
      evaluadorID
      status
      comentarios
      createdAt
      updatedAt
      AventurasAVerificar {
        items {
          id
          aventuraID
          solicitudID
          createdAt
          updatedAt
        }
        nextToken
      }
      evaluador {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
      Usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
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
      creadorID
      evaluadorID
      status
      comentarios
      createdAt
      updatedAt
      AventurasAVerificar {
        items {
          id
          aventuraID
          solicitudID
          createdAt
          updatedAt
        }
        nextToken
      }
      evaluador {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
      Usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
    }
  }
`;
export const createSolicitudAventura = /* GraphQL */ `
  mutation CreateSolicitudAventura(
    $input: CreateSolicitudAventuraInput!
    $condition: ModelSolicitudAventuraConditionInput
  ) {
    createSolicitudAventura(input: $input, condition: $condition) {
      id
      aventuraID
      solicitudID
      createdAt
      updatedAt
      solicitud {
        id
        creadorID
        evaluadorID
        status
        comentarios
        createdAt
        updatedAt
        AventurasAVerificar {
          nextToken
        }
        evaluador {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
        Usuario {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
      }
      aventura {
        id
        titulo
        imagenFondo
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcionCorta
        descripcionLarga
        materialObligatorio
        materialOpcional
        materialAcampada
        alimentacion
        materialIncluido
        dificultad
        precioVIP
        descripcionVIP
        fechaInicialDisponible
        fechaFinalDisponible
        categoriaID
        ubicacionNombre
        ubicacionLink
        comision
        createdAt
        updatedAt
        usuariosAutorizados {
          nextToken
        }
        Fechas {
          nextToken
        }
      }
    }
  }
`;
export const updateSolicitudAventura = /* GraphQL */ `
  mutation UpdateSolicitudAventura(
    $input: UpdateSolicitudAventuraInput!
    $condition: ModelSolicitudAventuraConditionInput
  ) {
    updateSolicitudAventura(input: $input, condition: $condition) {
      id
      aventuraID
      solicitudID
      createdAt
      updatedAt
      solicitud {
        id
        creadorID
        evaluadorID
        status
        comentarios
        createdAt
        updatedAt
        AventurasAVerificar {
          nextToken
        }
        evaluador {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
        Usuario {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
      }
      aventura {
        id
        titulo
        imagenFondo
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcionCorta
        descripcionLarga
        materialObligatorio
        materialOpcional
        materialAcampada
        alimentacion
        materialIncluido
        dificultad
        precioVIP
        descripcionVIP
        fechaInicialDisponible
        fechaFinalDisponible
        categoriaID
        ubicacionNombre
        ubicacionLink
        comision
        createdAt
        updatedAt
        usuariosAutorizados {
          nextToken
        }
        Fechas {
          nextToken
        }
      }
    }
  }
`;
export const deleteSolicitudAventura = /* GraphQL */ `
  mutation DeleteSolicitudAventura(
    $input: DeleteSolicitudAventuraInput!
    $condition: ModelSolicitudAventuraConditionInput
  ) {
    deleteSolicitudAventura(input: $input, condition: $condition) {
      id
      aventuraID
      solicitudID
      createdAt
      updatedAt
      solicitud {
        id
        creadorID
        evaluadorID
        status
        comentarios
        createdAt
        updatedAt
        AventurasAVerificar {
          nextToken
        }
        evaluador {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
        Usuario {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
      }
      aventura {
        id
        titulo
        imagenFondo
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcionCorta
        descripcionLarga
        materialObligatorio
        materialOpcional
        materialAcampada
        alimentacion
        materialIncluido
        dificultad
        precioVIP
        descripcionVIP
        fechaInicialDisponible
        fechaFinalDisponible
        categoriaID
        ubicacionNombre
        ubicacionLink
        comision
        createdAt
        updatedAt
        usuariosAutorizados {
          nextToken
        }
        Fechas {
          nextToken
        }
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
      nombre
      apellido
      foto
      nickname
      calificacion
      descripcion
      comentarios
      tipo
      selfie
      INE
      licencia
      comentariosAdicionales
      telefono
      capacidadMaxima
      placaVehiculos
      tarjetaCirculacion
      certificaciones
      sitioWeb
      redSocial
      stripeID
      createdAt
      updatedAt
      evaluaciones {
        items {
          id
          calificacion
          resena
          creadorID
          evaluadoID
          createdAt
          updatedAt
        }
        nextToken
      }
      solicitudes {
        items {
          id
          creadorID
          evaluadorID
          status
          comentarios
          createdAt
          updatedAt
        }
        nextToken
      }
      aventurasAutorizadas {
        items {
          id
          aventuraID
          usuarioID
          bloqueado
          createdAt
          updatedAt
        }
        nextToken
      }
      reservaciones {
        items {
          id
          total
          comisionPorPersona
          personas
          tercera
          adultos
          ninos
          fechaID
          usuarioID
          idPago
          createdAt
          updatedAt
        }
        nextToken
      }
      fechas {
        items {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        nextToken
      }
      chatRooms {
        items {
          id
          usuarioID
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
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
      descripcion
      comentarios
      tipo
      selfie
      INE
      licencia
      comentariosAdicionales
      telefono
      capacidadMaxima
      placaVehiculos
      tarjetaCirculacion
      certificaciones
      sitioWeb
      redSocial
      stripeID
      createdAt
      updatedAt
      evaluaciones {
        items {
          id
          calificacion
          resena
          creadorID
          evaluadoID
          createdAt
          updatedAt
        }
        nextToken
      }
      solicitudes {
        items {
          id
          creadorID
          evaluadorID
          status
          comentarios
          createdAt
          updatedAt
        }
        nextToken
      }
      aventurasAutorizadas {
        items {
          id
          aventuraID
          usuarioID
          bloqueado
          createdAt
          updatedAt
        }
        nextToken
      }
      reservaciones {
        items {
          id
          total
          comisionPorPersona
          personas
          tercera
          adultos
          ninos
          fechaID
          usuarioID
          idPago
          createdAt
          updatedAt
        }
        nextToken
      }
      fechas {
        items {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        nextToken
      }
      chatRooms {
        items {
          id
          usuarioID
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
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
      descripcion
      comentarios
      tipo
      selfie
      INE
      licencia
      comentariosAdicionales
      telefono
      capacidadMaxima
      placaVehiculos
      tarjetaCirculacion
      certificaciones
      sitioWeb
      redSocial
      stripeID
      createdAt
      updatedAt
      evaluaciones {
        items {
          id
          calificacion
          resena
          creadorID
          evaluadoID
          createdAt
          updatedAt
        }
        nextToken
      }
      solicitudes {
        items {
          id
          creadorID
          evaluadorID
          status
          comentarios
          createdAt
          updatedAt
        }
        nextToken
      }
      aventurasAutorizadas {
        items {
          id
          aventuraID
          usuarioID
          bloqueado
          createdAt
          updatedAt
        }
        nextToken
      }
      reservaciones {
        items {
          id
          total
          comisionPorPersona
          personas
          tercera
          adultos
          ninos
          fechaID
          usuarioID
          idPago
          createdAt
          updatedAt
        }
        nextToken
      }
      fechas {
        items {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        nextToken
      }
      chatRooms {
        items {
          id
          usuarioID
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createUsuarioAventura = /* GraphQL */ `
  mutation CreateUsuarioAventura(
    $input: CreateUsuarioAventuraInput!
    $condition: ModelUsuarioAventuraConditionInput
  ) {
    createUsuarioAventura(input: $input, condition: $condition) {
      id
      aventuraID
      usuarioID
      bloqueado
      createdAt
      updatedAt
      usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
      aventura {
        id
        titulo
        imagenFondo
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcionCorta
        descripcionLarga
        materialObligatorio
        materialOpcional
        materialAcampada
        alimentacion
        materialIncluido
        dificultad
        precioVIP
        descripcionVIP
        fechaInicialDisponible
        fechaFinalDisponible
        categoriaID
        ubicacionNombre
        ubicacionLink
        comision
        createdAt
        updatedAt
        usuariosAutorizados {
          nextToken
        }
        Fechas {
          nextToken
        }
      }
    }
  }
`;
export const updateUsuarioAventura = /* GraphQL */ `
  mutation UpdateUsuarioAventura(
    $input: UpdateUsuarioAventuraInput!
    $condition: ModelUsuarioAventuraConditionInput
  ) {
    updateUsuarioAventura(input: $input, condition: $condition) {
      id
      aventuraID
      usuarioID
      bloqueado
      createdAt
      updatedAt
      usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
      aventura {
        id
        titulo
        imagenFondo
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcionCorta
        descripcionLarga
        materialObligatorio
        materialOpcional
        materialAcampada
        alimentacion
        materialIncluido
        dificultad
        precioVIP
        descripcionVIP
        fechaInicialDisponible
        fechaFinalDisponible
        categoriaID
        ubicacionNombre
        ubicacionLink
        comision
        createdAt
        updatedAt
        usuariosAutorizados {
          nextToken
        }
        Fechas {
          nextToken
        }
      }
    }
  }
`;
export const deleteUsuarioAventura = /* GraphQL */ `
  mutation DeleteUsuarioAventura(
    $input: DeleteUsuarioAventuraInput!
    $condition: ModelUsuarioAventuraConditionInput
  ) {
    deleteUsuarioAventura(input: $input, condition: $condition) {
      id
      aventuraID
      usuarioID
      bloqueado
      createdAt
      updatedAt
      usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
      aventura {
        id
        titulo
        imagenFondo
        imagenDetalle
        precioMin
        precioMax
        duracion
        descripcionCorta
        descripcionLarga
        materialObligatorio
        materialOpcional
        materialAcampada
        alimentacion
        materialIncluido
        dificultad
        precioVIP
        descripcionVIP
        fechaInicialDisponible
        fechaFinalDisponible
        categoriaID
        ubicacionNombre
        ubicacionLink
        comision
        createdAt
        updatedAt
        usuariosAutorizados {
          nextToken
        }
        Fechas {
          nextToken
        }
      }
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
      imagenFondo
      imagenDetalle
      precioMin
      precioMax
      duracion
      descripcionCorta
      descripcionLarga
      materialObligatorio
      materialOpcional
      materialAcampada
      alimentacion
      materialIncluido
      dificultad
      precioVIP
      descripcionVIP
      fechaInicialDisponible
      fechaFinalDisponible
      categoriaID
      ubicacionNombre
      ubicacionLink
      comision
      createdAt
      updatedAt
      usuariosAutorizados {
        items {
          id
          aventuraID
          usuarioID
          bloqueado
          createdAt
          updatedAt
        }
        nextToken
      }
      Fechas {
        items {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
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
      imagenFondo
      imagenDetalle
      precioMin
      precioMax
      duracion
      descripcionCorta
      descripcionLarga
      materialObligatorio
      materialOpcional
      materialAcampada
      alimentacion
      materialIncluido
      dificultad
      precioVIP
      descripcionVIP
      fechaInicialDisponible
      fechaFinalDisponible
      categoriaID
      ubicacionNombre
      ubicacionLink
      comision
      createdAt
      updatedAt
      usuariosAutorizados {
        items {
          id
          aventuraID
          usuarioID
          bloqueado
          createdAt
          updatedAt
        }
        nextToken
      }
      Fechas {
        items {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
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
      imagenFondo
      imagenDetalle
      precioMin
      precioMax
      duracion
      descripcionCorta
      descripcionLarga
      materialObligatorio
      materialOpcional
      materialAcampada
      alimentacion
      materialIncluido
      dificultad
      precioVIP
      descripcionVIP
      fechaInicialDisponible
      fechaFinalDisponible
      categoriaID
      ubicacionNombre
      ubicacionLink
      comision
      createdAt
      updatedAt
      usuariosAutorizados {
        items {
          id
          aventuraID
          usuarioID
          bloqueado
          createdAt
          updatedAt
        }
        nextToken
      }
      Fechas {
        items {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createReservaciones = /* GraphQL */ `
  mutation CreateReservaciones(
    $input: CreateReservacionesInput!
    $condition: ModelReservacionesConditionInput
  ) {
    createReservaciones(input: $input, condition: $condition) {
      id
      total
      comisionPorPersona
      personas
      tercera
      adultos
      ninos
      fechaID
      usuarioID
      idPago
      createdAt
      updatedAt
      usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
    }
  }
`;
export const updateReservaciones = /* GraphQL */ `
  mutation UpdateReservaciones(
    $input: UpdateReservacionesInput!
    $condition: ModelReservacionesConditionInput
  ) {
    updateReservaciones(input: $input, condition: $condition) {
      id
      total
      comisionPorPersona
      personas
      tercera
      adultos
      ninos
      fechaID
      usuarioID
      idPago
      createdAt
      updatedAt
      usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
    }
  }
`;
export const deleteReservaciones = /* GraphQL */ `
  mutation DeleteReservaciones(
    $input: DeleteReservacionesInput!
    $condition: ModelReservacionesConditionInput
  ) {
    deleteReservaciones(input: $input, condition: $condition) {
      id
      total
      comisionPorPersona
      personas
      tercera
      adultos
      ninos
      fechaID
      usuarioID
      idPago
      createdAt
      updatedAt
      usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
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
      aventuraID
      guiaID
      itinerario
      ubicacionNombre
      ubicacionLink
      denyTercera
      denyNinos
      materialObligatorio
      materialOpcional
      materialAcampada
      alimentacion
      materialIncluido
      chatroomID
      createdAt
      updatedAt
      Guia {
        items {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
        nextToken
      }
      Reservaciones {
        items {
          id
          total
          comisionPorPersona
          personas
          tercera
          adultos
          ninos
          fechaID
          usuarioID
          idPago
          createdAt
          updatedAt
        }
        nextToken
      }
      chatroom {
        id
        name
        picture
        newMessages
        lastMessage
        fechaID
        createdAt
        updatedAt
        fecha {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        LastMessage {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        Messages {
          nextToken
        }
        usuarios {
          nextToken
        }
      }
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
      aventuraID
      guiaID
      itinerario
      ubicacionNombre
      ubicacionLink
      denyTercera
      denyNinos
      materialObligatorio
      materialOpcional
      materialAcampada
      alimentacion
      materialIncluido
      chatroomID
      createdAt
      updatedAt
      Guia {
        items {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
        nextToken
      }
      Reservaciones {
        items {
          id
          total
          comisionPorPersona
          personas
          tercera
          adultos
          ninos
          fechaID
          usuarioID
          idPago
          createdAt
          updatedAt
        }
        nextToken
      }
      chatroom {
        id
        name
        picture
        newMessages
        lastMessage
        fechaID
        createdAt
        updatedAt
        fecha {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        LastMessage {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        Messages {
          nextToken
        }
        usuarios {
          nextToken
        }
      }
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
      aventuraID
      guiaID
      itinerario
      ubicacionNombre
      ubicacionLink
      denyTercera
      denyNinos
      materialObligatorio
      materialOpcional
      materialAcampada
      alimentacion
      materialIncluido
      chatroomID
      createdAt
      updatedAt
      Guia {
        items {
          id
          nombre
          apellido
          foto
          nickname
          calificacion
          descripcion
          comentarios
          tipo
          selfie
          INE
          licencia
          comentariosAdicionales
          telefono
          capacidadMaxima
          placaVehiculos
          tarjetaCirculacion
          certificaciones
          sitioWeb
          redSocial
          stripeID
          createdAt
          updatedAt
        }
        nextToken
      }
      Reservaciones {
        items {
          id
          total
          comisionPorPersona
          personas
          tercera
          adultos
          ninos
          fechaID
          usuarioID
          idPago
          createdAt
          updatedAt
        }
        nextToken
      }
      chatroom {
        id
        name
        picture
        newMessages
        lastMessage
        fechaID
        createdAt
        updatedAt
        fecha {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        LastMessage {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        Messages {
          nextToken
        }
        usuarios {
          nextToken
        }
      }
    }
  }
`;
export const createCategoria = /* GraphQL */ `
  mutation CreateCategoria(
    $input: CreateCategoriaInput!
    $condition: ModelCategoriaConditionInput
  ) {
    createCategoria(input: $input, condition: $condition) {
      id
      titulo
      foto
      createdAt
      updatedAt
      Aventuras {
        items {
          id
          titulo
          imagenFondo
          imagenDetalle
          precioMin
          precioMax
          duracion
          descripcionCorta
          descripcionLarga
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          dificultad
          precioVIP
          descripcionVIP
          fechaInicialDisponible
          fechaFinalDisponible
          categoriaID
          ubicacionNombre
          ubicacionLink
          comision
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateCategoria = /* GraphQL */ `
  mutation UpdateCategoria(
    $input: UpdateCategoriaInput!
    $condition: ModelCategoriaConditionInput
  ) {
    updateCategoria(input: $input, condition: $condition) {
      id
      titulo
      foto
      createdAt
      updatedAt
      Aventuras {
        items {
          id
          titulo
          imagenFondo
          imagenDetalle
          precioMin
          precioMax
          duracion
          descripcionCorta
          descripcionLarga
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          dificultad
          precioVIP
          descripcionVIP
          fechaInicialDisponible
          fechaFinalDisponible
          categoriaID
          ubicacionNombre
          ubicacionLink
          comision
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteCategoria = /* GraphQL */ `
  mutation DeleteCategoria(
    $input: DeleteCategoriaInput!
    $condition: ModelCategoriaConditionInput
  ) {
    deleteCategoria(input: $input, condition: $condition) {
      id
      titulo
      foto
      createdAt
      updatedAt
      Aventuras {
        items {
          id
          titulo
          imagenFondo
          imagenDetalle
          precioMin
          precioMax
          duracion
          descripcionCorta
          descripcionLarga
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          dificultad
          precioVIP
          descripcionVIP
          fechaInicialDisponible
          fechaFinalDisponible
          categoriaID
          ubicacionNombre
          ubicacionLink
          comision
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      content
      usuarioID
      chatroomID
      image
      audio
      createdAt
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      content
      usuarioID
      chatroomID
      image
      audio
      createdAt
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      content
      usuarioID
      chatroomID
      image
      audio
      createdAt
      updatedAt
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
      fechaID
      createdAt
      updatedAt
      fecha {
        id
        personasTotales
        fechaInicial
        fechaFinal
        precio
        comision
        aventuraID
        guiaID
        itinerario
        ubicacionNombre
        ubicacionLink
        denyTercera
        denyNinos
        materialObligatorio
        materialOpcional
        materialAcampada
        alimentacion
        materialIncluido
        chatroomID
        createdAt
        updatedAt
        Guia {
          nextToken
        }
        Reservaciones {
          nextToken
        }
        chatroom {
          id
          name
          picture
          newMessages
          lastMessage
          fechaID
          createdAt
          updatedAt
        }
      }
      LastMessage {
        id
        content
        usuarioID
        chatroomID
        image
        audio
        createdAt
        updatedAt
      }
      Messages {
        items {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        nextToken
      }
      usuarios {
        items {
          id
          usuarioID
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
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
      fechaID
      createdAt
      updatedAt
      fecha {
        id
        personasTotales
        fechaInicial
        fechaFinal
        precio
        comision
        aventuraID
        guiaID
        itinerario
        ubicacionNombre
        ubicacionLink
        denyTercera
        denyNinos
        materialObligatorio
        materialOpcional
        materialAcampada
        alimentacion
        materialIncluido
        chatroomID
        createdAt
        updatedAt
        Guia {
          nextToken
        }
        Reservaciones {
          nextToken
        }
        chatroom {
          id
          name
          picture
          newMessages
          lastMessage
          fechaID
          createdAt
          updatedAt
        }
      }
      LastMessage {
        id
        content
        usuarioID
        chatroomID
        image
        audio
        createdAt
        updatedAt
      }
      Messages {
        items {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        nextToken
      }
      usuarios {
        items {
          id
          usuarioID
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
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
      fechaID
      createdAt
      updatedAt
      fecha {
        id
        personasTotales
        fechaInicial
        fechaFinal
        precio
        comision
        aventuraID
        guiaID
        itinerario
        ubicacionNombre
        ubicacionLink
        denyTercera
        denyNinos
        materialObligatorio
        materialOpcional
        materialAcampada
        alimentacion
        materialIncluido
        chatroomID
        createdAt
        updatedAt
        Guia {
          nextToken
        }
        Reservaciones {
          nextToken
        }
        chatroom {
          id
          name
          picture
          newMessages
          lastMessage
          fechaID
          createdAt
          updatedAt
        }
      }
      LastMessage {
        id
        content
        usuarioID
        chatroomID
        image
        audio
        createdAt
        updatedAt
      }
      Messages {
        items {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        nextToken
      }
      usuarios {
        items {
          id
          usuarioID
          chatroomID
          createdAt
          updatedAt
        }
        nextToken
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
      usuarioID
      chatroomID
      createdAt
      updatedAt
      usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
      chatroom {
        id
        name
        picture
        newMessages
        lastMessage
        fechaID
        createdAt
        updatedAt
        fecha {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        LastMessage {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        Messages {
          nextToken
        }
        usuarios {
          nextToken
        }
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
      usuarioID
      chatroomID
      createdAt
      updatedAt
      usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
      chatroom {
        id
        name
        picture
        newMessages
        lastMessage
        fechaID
        createdAt
        updatedAt
        fecha {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        LastMessage {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        Messages {
          nextToken
        }
        usuarios {
          nextToken
        }
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
      usuarioID
      chatroomID
      createdAt
      updatedAt
      usuario {
        id
        nombre
        apellido
        foto
        nickname
        calificacion
        descripcion
        comentarios
        tipo
        selfie
        INE
        licencia
        comentariosAdicionales
        telefono
        capacidadMaxima
        placaVehiculos
        tarjetaCirculacion
        certificaciones
        sitioWeb
        redSocial
        stripeID
        createdAt
        updatedAt
        evaluaciones {
          nextToken
        }
        solicitudes {
          nextToken
        }
        aventurasAutorizadas {
          nextToken
        }
        reservaciones {
          nextToken
        }
        fechas {
          nextToken
        }
        messages {
          nextToken
        }
        chatRooms {
          nextToken
        }
      }
      chatroom {
        id
        name
        picture
        newMessages
        lastMessage
        fechaID
        createdAt
        updatedAt
        fecha {
          id
          personasTotales
          fechaInicial
          fechaFinal
          precio
          comision
          aventuraID
          guiaID
          itinerario
          ubicacionNombre
          ubicacionLink
          denyTercera
          denyNinos
          materialObligatorio
          materialOpcional
          materialAcampada
          alimentacion
          materialIncluido
          chatroomID
          createdAt
          updatedAt
        }
        LastMessage {
          id
          content
          usuarioID
          chatroomID
          image
          audio
          createdAt
          updatedAt
        }
        Messages {
          nextToken
        }
        usuarios {
          nextToken
        }
      }
    }
  }
`;
