/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSolicitudGuia = /* GraphQL */ `
  subscription OnCreateSolicitudGuia($owner: String) {
    onCreateSolicitudGuia(owner: $owner) {
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
export const onUpdateSolicitudGuia = /* GraphQL */ `
  subscription OnUpdateSolicitudGuia($owner: String) {
    onUpdateSolicitudGuia(owner: $owner) {
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
export const onDeleteSolicitudGuia = /* GraphQL */ `
  subscription OnDeleteSolicitudGuia($owner: String) {
    onDeleteSolicitudGuia(owner: $owner) {
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
export const onCreateAventura = /* GraphQL */ `
  subscription OnCreateAventura {
    onCreateAventura {
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
export const onUpdateAventura = /* GraphQL */ `
  subscription OnUpdateAventura {
    onUpdateAventura {
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
export const onDeleteAventura = /* GraphQL */ `
  subscription OnDeleteAventura {
    onDeleteAventura {
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
export const onCreateReserva = /* GraphQL */ `
  subscription OnCreateReserva {
    onCreateReserva {
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
export const onUpdateReserva = /* GraphQL */ `
  subscription OnUpdateReserva {
    onUpdateReserva {
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
export const onDeleteReserva = /* GraphQL */ `
  subscription OnDeleteReserva {
    onDeleteReserva {
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
export const onCreateFecha = /* GraphQL */ `
  subscription OnCreateFecha {
    onCreateFecha {
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
export const onUpdateFecha = /* GraphQL */ `
  subscription OnUpdateFecha {
    onUpdateFecha {
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
export const onDeleteFecha = /* GraphQL */ `
  subscription OnDeleteFecha {
    onDeleteFecha {
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
export const onCreateUsuario = /* GraphQL */ `
  subscription OnCreateUsuario {
    onCreateUsuario {
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
export const onUpdateUsuario = /* GraphQL */ `
  subscription OnUpdateUsuario {
    onUpdateUsuario {
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
export const onDeleteUsuario = /* GraphQL */ `
  subscription OnDeleteUsuario {
    onDeleteUsuario {
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
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
export const onCreateMensaje = /* GraphQL */ `
  subscription OnCreateMensaje {
    onCreateMensaje {
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
export const onUpdateMensaje = /* GraphQL */ `
  subscription OnUpdateMensaje {
    onUpdateMensaje {
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
export const onDeleteMensaje = /* GraphQL */ `
  subscription OnDeleteMensaje {
    onDeleteMensaje {
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
export const onCreateAventuraSolicitudGuia = /* GraphQL */ `
  subscription OnCreateAventuraSolicitudGuia($owner: String) {
    onCreateAventuraSolicitudGuia(owner: $owner) {
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
        Aventuras {
          nextToken
          startedAt
        }
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
      owner
    }
  }
`;
export const onUpdateAventuraSolicitudGuia = /* GraphQL */ `
  subscription OnUpdateAventuraSolicitudGuia($owner: String) {
    onUpdateAventuraSolicitudGuia(owner: $owner) {
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
        Aventuras {
          nextToken
          startedAt
        }
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
      owner
    }
  }
`;
export const onDeleteAventuraSolicitudGuia = /* GraphQL */ `
  subscription OnDeleteAventuraSolicitudGuia($owner: String) {
    onDeleteAventuraSolicitudGuia(owner: $owner) {
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
        Aventuras {
          nextToken
          startedAt
        }
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
      owner
    }
  }
`;
export const onCreateAventuraUsuario = /* GraphQL */ `
  subscription OnCreateAventuraUsuario {
    onCreateAventuraUsuario {
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
    }
  }
`;
export const onUpdateAventuraUsuario = /* GraphQL */ `
  subscription OnUpdateAventuraUsuario {
    onUpdateAventuraUsuario {
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
    }
  }
`;
export const onDeleteAventuraUsuario = /* GraphQL */ `
  subscription OnDeleteAventuraUsuario {
    onDeleteAventuraUsuario {
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
    }
  }
`;
export const onCreateChatRoomUsuario = /* GraphQL */ `
  subscription OnCreateChatRoomUsuario {
    onCreateChatRoomUsuario {
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
    }
  }
`;
export const onUpdateChatRoomUsuario = /* GraphQL */ `
  subscription OnUpdateChatRoomUsuario {
    onUpdateChatRoomUsuario {
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
    }
  }
`;
export const onDeleteChatRoomUsuario = /* GraphQL */ `
  subscription OnDeleteChatRoomUsuario {
    onDeleteChatRoomUsuario {
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
    }
  }
`;
