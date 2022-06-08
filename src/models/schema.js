export const schema = {
    "models": {
        "Aventura": {
            "name": "Aventura",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "titulo": {
                    "name": "titulo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "imagenFondoIdx": {
                    "name": "imagenFondoIdx",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "imagenDetalle": {
                    "name": "imagenDetalle",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "precioMin": {
                    "name": "precioMin",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "precioMax": {
                    "name": "precioMax",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "duracion": {
                    "name": "duracion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "descripcion": {
                    "name": "descripcion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "dificultad": {
                    "name": "dificultad",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "ubicacionNombre": {
                    "name": "ubicacionNombre",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ubicacionId": {
                    "name": "ubicacionId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ubicacionLink": {
                    "name": "ubicacionLink",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "coordenadas": {
                    "name": "coordenadas",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": true,
                    "attributes": []
                },
                "estadoAventura": {
                    "name": "estadoAventura",
                    "isArray": false,
                    "type": {
                        "enum": "EstadoAventura"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "altitud": {
                    "name": "altitud",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "distanciaRecorrida": {
                    "name": "distanciaRecorrida",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "altimetriaRecorrida": {
                    "name": "altimetriaRecorrida",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "categoria": {
                    "name": "categoria",
                    "isArray": false,
                    "type": {
                        "enum": "Categorias"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "materialDefault": {
                    "name": "materialDefault",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "incluidoDefault": {
                    "name": "incluidoDefault",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "usuarioID": {
                    "name": "usuarioID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "SolicitudGuias": {
                    "name": "SolicitudGuias",
                    "isArray": true,
                    "type": {
                        "model": "AventuraSolicitudGuias"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "aventura"
                    }
                },
                "UsuariosAutorizados": {
                    "name": "UsuariosAutorizados",
                    "isArray": true,
                    "type": {
                        "model": "AventuraUsuarios"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "aventura"
                    }
                },
                "Fechas": {
                    "name": "Fechas",
                    "isArray": true,
                    "type": {
                        "model": "Fecha"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "aventuraID"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Aventuras",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "SolicitudGuia": {
            "name": "SolicitudGuia",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "StatusSolicitud"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "evaluadorID": {
                    "name": "evaluadorID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "usuarioID": {
                    "name": "usuarioID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "mensaje": {
                    "name": "mensaje",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Aventuras": {
                    "name": "Aventuras",
                    "isArray": true,
                    "type": {
                        "model": "AventuraSolicitudGuias"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "solicitudGuia"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "SolicitudGuias",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUsuario",
                        "fields": [
                            "usuarioID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Usuario": {
            "name": "Usuario",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "tipo": {
                    "name": "tipo",
                    "isArray": false,
                    "type": {
                        "enum": "TipoUsuario"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "guia": {
                    "name": "guia",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "calificacion": {
                    "name": "calificacion",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "numResenas": {
                    "name": "numResenas",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "nombre": {
                    "name": "nombre",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "apellido": {
                    "name": "apellido",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "foto": {
                    "name": "foto",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "imagenFondo": {
                    "name": "imagenFondo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nickname": {
                    "name": "nickname",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "experience": {
                    "name": "experience",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "stripeID": {
                    "name": "stripeID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "admin": {
                    "name": "admin",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "selfie": {
                    "name": "selfie",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ID": {
                    "name": "ID",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "certificaciones": {
                    "name": "certificaciones",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "telefono": {
                    "name": "telefono",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "sitioWeb": {
                    "name": "sitioWeb",
                    "isArray": false,
                    "type": "AWSURL",
                    "isRequired": false,
                    "attributes": []
                },
                "CuentaBancaria": {
                    "name": "CuentaBancaria",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "fechaNacimiento": {
                    "name": "fechaNacimiento",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "direccion": {
                    "name": "direccion",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "rfcIndividual": {
                    "name": "rfcIndividual",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "rfcCompania": {
                    "name": "rfcCompania",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "capacidadMaxima": {
                    "name": "capacidadMaxima",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "comentariosAdicionales": {
                    "name": "comentariosAdicionales",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "notificationToken": {
                    "name": "notificationToken",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "newMessages": {
                    "name": "newMessages",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "AventurasAutorizadas": {
                    "name": "AventurasAutorizadas",
                    "isArray": true,
                    "type": {
                        "model": "AventuraUsuarios"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "usuario"
                    }
                },
                "Mensajes": {
                    "name": "Mensajes",
                    "isArray": true,
                    "type": {
                        "model": "Mensaje"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "usuarioID"
                    }
                },
                "ChatRooms": {
                    "name": "ChatRooms",
                    "isArray": true,
                    "type": {
                        "model": "ChatRoomUsuarios"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "usuarioChatRoomsId"
                    }
                },
                "Reservas": {
                    "name": "Reservas",
                    "isArray": true,
                    "type": {
                        "model": "Reserva"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "usuarioID"
                    }
                },
                "Fechas": {
                    "name": "Fechas",
                    "isArray": true,
                    "type": {
                        "model": "Fecha"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "usuarioID"
                    }
                },
                "Notificaciones": {
                    "name": "Notificaciones",
                    "isArray": true,
                    "type": {
                        "model": "Notificacion"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "usuarioID"
                    }
                },
                "SolicitudesCreadas": {
                    "name": "SolicitudesCreadas",
                    "isArray": true,
                    "type": {
                        "model": "SolicitudGuia"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "usuarioID"
                    }
                },
                "Comentarios": {
                    "name": "Comentarios",
                    "isArray": true,
                    "type": {
                        "model": "Comentario"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "usuarioCalificadoID"
                    }
                },
                "Comisiones": {
                    "name": "Comisiones",
                    "isArray": true,
                    "type": {
                        "model": "Comision"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "usuarioID"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Usuarios",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Mensaje": {
            "name": "Mensaje",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "content": {
                    "name": "content",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "usuarioID": {
                    "name": "usuarioID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "chatroomID": {
                    "name": "chatroomID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Mensajes",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUsuario",
                        "fields": [
                            "usuarioID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byChatRoom",
                        "fields": [
                            "chatroomID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ChatRoomUsuarios": {
            "name": "ChatRoomUsuarios",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "newMessages": {
                    "name": "newMessages",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "chatroom": {
                    "name": "chatroom",
                    "isArray": false,
                    "type": {
                        "model": "ChatRoom"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "chatRoomParticipantesId"
                    }
                },
                "usuario": {
                    "name": "usuario",
                    "isArray": false,
                    "type": {
                        "model": "Usuario"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "usuarioChatRoomsId"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "ChatRoomUsuarios",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byChatRoom",
                        "fields": [
                            "chatRoomParticipantesId"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUsuario",
                        "fields": [
                            "usuarioChatRoomsId"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ChatRoom": {
            "name": "ChatRoom",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "picture": {
                    "name": "picture",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "lastMessage": {
                    "name": "lastMessage",
                    "isArray": false,
                    "type": {
                        "model": "Mensaje"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "chatRoomLastMessageId"
                    }
                },
                "fechaID": {
                    "name": "fechaID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "guiaID": {
                    "name": "guiaID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "Mensajes": {
                    "name": "Mensajes",
                    "isArray": true,
                    "type": {
                        "model": "Mensaje"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "chatroomID"
                    }
                },
                "Participantes": {
                    "name": "Participantes",
                    "isArray": true,
                    "type": {
                        "model": "ChatRoomUsuarios"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "chatRoomParticipantesId"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "chatRoomLastMessageId": {
                    "name": "chatRoomLastMessageId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ChatRooms",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byFecha",
                        "fields": [
                            "fechaID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Reserva": {
            "name": "Reserva",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "total": {
                    "name": "total",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "comision": {
                    "name": "comision",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "pagadoAlGuia": {
                    "name": "pagadoAlGuia",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "tercera": {
                    "name": "tercera",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "ninos": {
                    "name": "ninos",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "adultos": {
                    "name": "adultos",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "pagoID": {
                    "name": "pagoID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ingreso": {
                    "name": "ingreso",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "horaIngreso": {
                    "name": "horaIngreso",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "cancelado": {
                    "name": "cancelado",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "canceledAt": {
                    "name": "canceledAt",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "fechaID": {
                    "name": "fechaID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "usuarioID": {
                    "name": "usuarioID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "fecha": {
                    "name": "fecha",
                    "isArray": false,
                    "type": {
                        "model": "Fecha"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "fechaReservasId"
                    }
                },
                "usuario": {
                    "name": "usuario",
                    "isArray": false,
                    "type": {
                        "model": "Usuario"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "usuarioReservasId"
                    }
                },
                "guiaID": {
                    "name": "guiaID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "tipoPago": {
                    "name": "tipoPago",
                    "isArray": false,
                    "type": {
                        "enum": "TipoPago"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "materialChecked": {
                    "name": "materialChecked",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "comisionID": {
                    "name": "comisionID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "comisionAsociada": {
                    "name": "comisionAsociada",
                    "isArray": false,
                    "type": {
                        "model": "Comision"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "reserva",
                        "targetName": "reservaComisionAsociadaId"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "reservaComisionAsociadaId": {
                    "name": "reservaComisionAsociadaId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Reservas",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byFecha",
                        "fields": [
                            "fechaID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUsuario",
                        "fields": [
                            "usuarioID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Fecha": {
            "name": "Fecha",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "personasTotales": {
                    "name": "personasTotales",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "fechaInicial": {
                    "name": "fechaInicial",
                    "isArray": false,
                    "type": "AWSTimestamp",
                    "isRequired": true,
                    "attributes": []
                },
                "fechaFinal": {
                    "name": "fechaFinal",
                    "isArray": false,
                    "type": "AWSTimestamp",
                    "isRequired": true,
                    "attributes": []
                },
                "precio": {
                    "name": "precio",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "comision": {
                    "name": "comision",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "experienciaPorPersona": {
                    "name": "experienciaPorPersona",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "itinerario": {
                    "name": "itinerario",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "puntoReunionNombre": {
                    "name": "puntoReunionNombre",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "puntoReunionId": {
                    "name": "puntoReunionId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "puntoReunionLink": {
                    "name": "puntoReunionLink",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "puntoReunionCoords": {
                    "name": "puntoReunionCoords",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "allowTercera": {
                    "name": "allowTercera",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "allowNinos": {
                    "name": "allowNinos",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "efectivo": {
                    "name": "efectivo",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "material": {
                    "name": "material",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "incluido": {
                    "name": "incluido",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "titulo": {
                    "name": "titulo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "descripcion": {
                    "name": "descripcion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "imagenRuta": {
                    "name": "imagenRuta",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "imagenFondo": {
                    "name": "imagenFondo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "tituloAventura": {
                    "name": "tituloAventura",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "cancelado": {
                    "name": "cancelado",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "canceledAt": {
                    "name": "canceledAt",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "dateModified": {
                    "name": "dateModified",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "aventuraID": {
                    "name": "aventuraID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "usuarioID": {
                    "name": "usuarioID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "aventura": {
                    "name": "aventura",
                    "isArray": false,
                    "type": {
                        "model": "Aventura"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "aventuraFechasId"
                    }
                },
                "usuario": {
                    "name": "usuario",
                    "isArray": false,
                    "type": {
                        "model": "Usuario"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "usuarioFechasId"
                    }
                },
                "dificultad": {
                    "name": "dificultad",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "Reservas": {
                    "name": "Reservas",
                    "isArray": true,
                    "type": {
                        "model": "Reserva"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "fechaID"
                    }
                },
                "ChatRoom": {
                    "name": "ChatRoom",
                    "isArray": true,
                    "type": {
                        "model": "ChatRoom"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "fechaID"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Fechas",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byAventura",
                        "fields": [
                            "aventuraID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUsuario",
                        "fields": [
                            "usuarioID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Comision": {
            "name": "Comision",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "amount": {
                    "name": "amount",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "editing": {
                    "name": "editing",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "payed": {
                    "name": "payed",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "pagadoEnReservaID": {
                    "name": "pagadoEnReservaID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "reservaID": {
                    "name": "reservaID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "reserva": {
                    "name": "reserva",
                    "isArray": false,
                    "type": {
                        "model": "Reserva"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "comisionReservaId"
                    }
                },
                "usuarioID": {
                    "name": "usuarioID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "usuario": {
                    "name": "usuario",
                    "isArray": false,
                    "type": {
                        "model": "Usuario"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "usuarioComisionesId"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Comisions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUsuario",
                        "fields": [
                            "usuarioID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Notificacion": {
            "name": "Notificacion",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "tipo": {
                    "name": "tipo",
                    "isArray": false,
                    "type": {
                        "enum": "TipoNotificacion"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "titulo": {
                    "name": "titulo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "descripcion": {
                    "name": "descripcion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "usuarioID": {
                    "name": "usuarioID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "imagen": {
                    "name": "imagen",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "leido": {
                    "name": "leido",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "showAt": {
                    "name": "showAt",
                    "isArray": false,
                    "type": "AWSTimestamp",
                    "isRequired": false,
                    "attributes": []
                },
                "reservaID": {
                    "name": "reservaID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "fechaID": {
                    "name": "fechaID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "aventuraID": {
                    "name": "aventuraID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "guiaID": {
                    "name": "guiaID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "solicitudGuiaID": {
                    "name": "solicitudGuiaID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Notificacions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUsuario",
                        "fields": [
                            "usuarioID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Comentario": {
            "name": "Comentario",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "usuarioCalificadoID": {
                    "name": "usuarioCalificadoID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "body": {
                    "name": "body",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "calificacion": {
                    "name": "calificacion",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "creatorID": {
                    "name": "creatorID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Comentarios",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUsuario",
                        "fields": [
                            "usuarioCalificadoID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Publicidad": {
            "name": "Publicidad",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "tipo": {
                    "name": "tipo",
                    "isArray": false,
                    "type": {
                        "enum": "TipoPublicidad"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "titulo": {
                    "name": "titulo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "descripcion": {
                    "name": "descripcion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "imagenFondo": {
                    "name": "imagenFondo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "video": {
                    "name": "video",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "linkAnuncio": {
                    "name": "linkAnuncio",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "aventuraID": {
                    "name": "aventuraID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Publicidads",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "AventuraSolicitudGuias": {
            "name": "AventuraSolicitudGuias",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "aventura": {
                    "name": "aventura",
                    "isArray": false,
                    "type": {
                        "model": "Aventura"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "aventuraID"
                    }
                },
                "solicitudGuia": {
                    "name": "solicitudGuia",
                    "isArray": false,
                    "type": {
                        "model": "SolicitudGuia"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "solicitudGuiaID"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "AventuraSolicitudGuias",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byAventura",
                        "fields": [
                            "aventuraID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bySolicitudGuia",
                        "fields": [
                            "solicitudGuiaID"
                        ]
                    }
                }
            ]
        },
        "AventuraUsuarios": {
            "name": "AventuraUsuarios",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "aventura": {
                    "name": "aventura",
                    "isArray": false,
                    "type": {
                        "model": "Aventura"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "aventuraID"
                    }
                },
                "usuario": {
                    "name": "usuario",
                    "isArray": false,
                    "type": {
                        "model": "Usuario"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "usuarioID"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "AventuraUsuarios",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byAventura",
                        "fields": [
                            "aventuraID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUsuario",
                        "fields": [
                            "usuarioID"
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "AccountType": {
            "name": "AccountType",
            "values": [
                "INDIVIDUAL",
                "COMPANY"
            ]
        },
        "EstadoAventura": {
            "name": "EstadoAventura",
            "values": [
                "AUTORIZADO",
                "PENDIENTE",
                "RECHAZADO"
            ]
        },
        "Categorias": {
            "name": "Categorias",
            "values": [
                "APLINISMO",
                "CICLISMO",
                "OTROS"
            ]
        },
        "StatusSolicitud": {
            "name": "StatusSolicitud",
            "values": [
                "APROVADA",
                "PENDIENTE",
                "RECHAZADA"
            ]
        },
        "TipoUsuario": {
            "name": "TipoUsuario",
            "values": [
                "AGENCIA",
                "GUIAINDIVIDUAL"
            ]
        },
        "TipoPago": {
            "name": "TipoPago",
            "values": [
                "EFECTIVO",
                "TARJETA"
            ]
        },
        "TipoNotificacion": {
            "name": "TipoNotificacion",
            "values": [
                "RESERVAENFECHA",
                "RESERVACREADA",
                "RECORDATORIOFECHA",
                "SOLICITUDGUIAAPROVADA",
                "SOLICITUDGUIARECHAZADA",
                "SOLICITUDGUIA",
                "SOLICITUDAVENTURAAPROVADA",
                "SOLICITUDAVENTURARECHAZADA",
                "SOLICITUDAVENTURA",
                "ADMIN",
                "BIENVENIDA",
                "FECHACREADA",
                "FECHAACTUALIZACION",
                "FECHACANCELADA",
                "RESERVACANCELADA",
                "CALIFICAUSUARIO"
            ]
        },
        "TipoPublicidad": {
            "name": "TipoPublicidad",
            "values": [
                "AVENTURA",
                "ANUNCIO",
                "ACTUALIZACION"
            ]
        }
    },
    "nonModels": {
        "PaymentIntent": {
            "name": "PaymentIntent",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "clientSecret": {
                    "name": "clientSecret",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "error": {
                    "name": "error",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "CreateAcountResponse": {
            "name": "CreateAcountResponse",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "errors": {
                    "name": "errors",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                }
            }
        }
    },
    "version": "b7ea4817bb9fe547a96da6fcdb243bb4"
};