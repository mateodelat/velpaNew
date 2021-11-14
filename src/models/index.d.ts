import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum EstadoAventura {
  AUTORIZADO = "AUTORIZADO",
  PENDIENTE = "PENDIENTE",
  RECHAZADO = "RECHAZADO"
}

export enum Categorias {
  APLINISMO = "APLINISMO",
  MTB = "MTB",
  OTROS = "OTROS"
}

export enum StatusSolicitud {
  APROVADA = "APROVADA",
  PENDIENTE = "PENDIENTE",
  RECHAZADA = "RECHAZADA"
}

export enum TipoUsuario {
  AGENCIA = "AGENCIA",
  GUIAINDIVIDUAL = "GUIAINDIVIDUAL"
}



type AventuraMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AventuraSolicitudGuiaMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SolicitudGuiaMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AventuraUsuarioMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UsuarioMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MensajeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomUsuarioMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FechaMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ReservaMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Aventura {
  readonly id: string;
  readonly titulo: string;
  readonly imagenFondoIdx: number;
  readonly imagenDetalle: (string | null)[];
  readonly precioMin: number;
  readonly precioMax: number;
  readonly duracion?: string;
  readonly descripcion?: string;
  readonly dificultad: number;
  readonly ubicacionNombre?: string;
  readonly ubicacionLink?: string;
  readonly comision: number;
  readonly estadoAventura: EstadoAventura | keyof typeof EstadoAventura;
  readonly coordenadas: string;
  readonly altitud?: number;
  readonly distanciaRecorrida?: number;
  readonly altimetriaRecorrida?: number;
  readonly categoria?: Categorias | keyof typeof Categorias;
  readonly SolicitudGuias?: (AventuraSolicitudGuia | null)[];
  readonly UsuariosAutorizados?: (AventuraUsuario | null)[];
  readonly Fechas?: (Fecha | null)[];
  readonly puntoReunionNombre?: string;
  readonly puntoReunionLink?: string;
  readonly materialDefault?: string;
  readonly incluidoDefault?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Aventura, AventuraMetaData>);
  static copyOf(source: Aventura, mutator: (draft: MutableModel<Aventura, AventuraMetaData>) => MutableModel<Aventura, AventuraMetaData> | void): Aventura;
}

export declare class AventuraSolicitudGuia {
  readonly id: string;
  readonly aventura: Aventura;
  readonly solicitudguia: SolicitudGuia;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<AventuraSolicitudGuia, AventuraSolicitudGuiaMetaData>);
  static copyOf(source: AventuraSolicitudGuia, mutator: (draft: MutableModel<AventuraSolicitudGuia, AventuraSolicitudGuiaMetaData>) => MutableModel<AventuraSolicitudGuia, AventuraSolicitudGuiaMetaData> | void): AventuraSolicitudGuia;
}

export declare class SolicitudGuia {
  readonly id: string;
  readonly status: StatusSolicitud | keyof typeof StatusSolicitud;
  readonly comentarios?: string;
  readonly Aventuras?: (AventuraSolicitudGuia | null)[];
  readonly evaluadorID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<SolicitudGuia, SolicitudGuiaMetaData>);
  static copyOf(source: SolicitudGuia, mutator: (draft: MutableModel<SolicitudGuia, SolicitudGuiaMetaData>) => MutableModel<SolicitudGuia, SolicitudGuiaMetaData> | void): SolicitudGuia;
}

export declare class AventuraUsuario {
  readonly id: string;
  readonly aventura: Aventura;
  readonly usuario: Usuario;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<AventuraUsuario, AventuraUsuarioMetaData>);
  static copyOf(source: AventuraUsuario, mutator: (draft: MutableModel<AventuraUsuario, AventuraUsuarioMetaData>) => MutableModel<AventuraUsuario, AventuraUsuarioMetaData> | void): AventuraUsuario;
}

export declare class Usuario {
  readonly id: string;
  readonly nombre?: string;
  readonly apellido?: string;
  readonly foto?: string;
  readonly nickname?: string;
  readonly calificacion?: number;
  readonly tipo?: TipoUsuario | keyof typeof TipoUsuario;
  readonly selfie?: string;
  readonly INE?: (string | null)[];
  readonly licencia?: (string | null)[];
  readonly comentariosAdicionales?: string;
  readonly telefono?: string;
  readonly capacidadMaxima?: number;
  readonly tarjetaCirculacion?: string;
  readonly certificaciones?: (string | null)[];
  readonly sitioWeb?: string;
  readonly usuarioRedSocial?: string;
  readonly stripeID?: string;
  readonly owner?: string;
  readonly AventurasAutorizadas?: (AventuraUsuario | null)[];
  readonly Mensajes?: (Mensaje | null)[];
  readonly ChatRooms?: (ChatRoomUsuario | null)[];
  readonly Reservas?: (Reserva | null)[];
  readonly Fechas?: (Fecha | null)[];
  readonly SolicitudesEvaluadas?: (SolicitudGuia | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Usuario, UsuarioMetaData>);
  static copyOf(source: Usuario, mutator: (draft: MutableModel<Usuario, UsuarioMetaData>) => MutableModel<Usuario, UsuarioMetaData> | void): Usuario;
}

export declare class Mensaje {
  readonly id: string;
  readonly content: string;
  readonly usuarioID?: string;
  readonly chatroomID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Mensaje, MensajeMetaData>);
  static copyOf(source: Mensaje, mutator: (draft: MutableModel<Mensaje, MensajeMetaData>) => MutableModel<Mensaje, MensajeMetaData> | void): Mensaje;
}

export declare class ChatRoomUsuario {
  readonly id: string;
  readonly chatroom: ChatRoom;
  readonly usuario: Usuario;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoomUsuario, ChatRoomUsuarioMetaData>);
  static copyOf(source: ChatRoomUsuario, mutator: (draft: MutableModel<ChatRoomUsuario, ChatRoomUsuarioMetaData>) => MutableModel<ChatRoomUsuario, ChatRoomUsuarioMetaData> | void): ChatRoomUsuario;
}

export declare class ChatRoom {
  readonly id: string;
  readonly name: string;
  readonly picture?: string;
  readonly newMessages: number;
  readonly lastMessage?: string;
  readonly Mensajes?: (Mensaje | null)[];
  readonly Participantes?: (ChatRoomUsuario | null)[];
  readonly Fecha?: Fecha;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

export declare class Fecha {
  readonly id: string;
  readonly personasTotales: number;
  readonly fechaInicial: number;
  readonly fechaFinal: number;
  readonly precio: number;
  readonly comision: number;
  readonly itinerario: string;
  readonly puntoReunionNombre: string;
  readonly puntoReunionLink: string;
  readonly allowTercera: boolean;
  readonly allowNinos: boolean;
  readonly material?: string;
  readonly incluido: string;
  readonly aventuraID?: string;
  readonly Reservas?: (Reserva | null)[];
  readonly usuarioID?: string;
  readonly titulo?: string;
  readonly descripcion?: string;
  readonly imagenRuta?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Fecha, FechaMetaData>);
  static copyOf(source: Fecha, mutator: (draft: MutableModel<Fecha, FechaMetaData>) => MutableModel<Fecha, FechaMetaData> | void): Fecha;
}

export declare class Reserva {
  readonly id: string;
  readonly total: number;
  readonly comisionPorPersona: number;
  readonly tercera: number;
  readonly ninos: number;
  readonly adultos: number;
  readonly pagoID: string;
  readonly fechaID?: string;
  readonly usuarioID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Reserva, ReservaMetaData>);
  static copyOf(source: Reserva, mutator: (draft: MutableModel<Reserva, ReservaMetaData>) => MutableModel<Reserva, ReservaMetaData> | void): Reserva;
}