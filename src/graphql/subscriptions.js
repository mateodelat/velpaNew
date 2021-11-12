/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAventura = /* GraphQL */ `
  subscription OnCreateAventura {
    onCreateAventura {
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
export const onUpdateAventura = /* GraphQL */ `
  subscription OnUpdateAventura {
    onUpdateAventura {
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
export const onDeleteAventura = /* GraphQL */ `
  subscription OnDeleteAventura {
    onDeleteAventura {
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
      owner
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
      owner
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
      owner
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
      owner
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
      owner
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
      owner
    }
  }
`;
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
export const onCreateAventuraSolicitudGuia = /* GraphQL */ `
  subscription OnCreateAventuraSolicitudGuia {
    onCreateAventuraSolicitudGuia {
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
export const onUpdateAventuraSolicitudGuia = /* GraphQL */ `
  subscription OnUpdateAventuraSolicitudGuia {
    onUpdateAventuraSolicitudGuia {
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
export const onDeleteAventuraSolicitudGuia = /* GraphQL */ `
  subscription OnDeleteAventuraSolicitudGuia {
    onDeleteAventuraSolicitudGuia {
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
export const onCreateAventuraUsuario = /* GraphQL */ `
  subscription OnCreateAventuraUsuario {
    onCreateAventuraUsuario {
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
export const onUpdateAventuraUsuario = /* GraphQL */ `
  subscription OnUpdateAventuraUsuario {
    onUpdateAventuraUsuario {
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
export const onDeleteAventuraUsuario = /* GraphQL */ `
  subscription OnDeleteAventuraUsuario {
    onDeleteAventuraUsuario {
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
