import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum AccountType {
  INDIVIDUAL = "INDIVIDUAL",
  COMPANY = "COMPANY"
}

export enum EstadoAventura {
  AUTORIZADO = "AUTORIZADO",
  PENDIENTE = "PENDIENTE",
  RECHAZADO = "RECHAZADO"
}

export enum Categorias {
  APLINISMO = "APLINISMO",
  CICLISMO = "CICLISMO",
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

export enum TipoNotificacion {
  RESERVAENFECHA = "RESERVAENFECHA",
  RESERVACREADA = "RESERVACREADA",
  RECORDATORIOFECHA = "RECORDATORIOFECHA",
  SOLICITUDGUIAAPROVADA = "SOLICITUDGUIAAPROVADA",
  SOLICITUDGUIARECHAZADA = "SOLICITUDGUIARECHAZADA",
  SOLICITUDGUIA = "SOLICITUDGUIA",
  SOLICITUDAVENTURAAPROVADA = "SOLICITUDAVENTURAAPROVADA",
  SOLICITUDAVENTURARECHAZADA = "SOLICITUDAVENTURARECHAZADA",
  SOLICITUDAVENTURA = "SOLICITUDAVENTURA",
  ADMIN = "ADMIN",
  BIENVENIDA = "BIENVENIDA",
  FECHACREADA = "FECHACREADA"
}

export enum TipoPublicidad {
  AVENTURA = "AVENTURA",
  ANUNCIO = "ANUNCIO",
  ACTUALIZACION = "ACTUALIZACION"
}

export declare class PaymentIntent {
  readonly id?: string;
  readonly clientSecret?: string;
  constructor(init: ModelInit<PaymentIntent>);
}

export declare class CreateAcountResponse {
  readonly id?: string;
  readonly errors?: boolean;
  constructor(init: ModelInit<CreateAcountResponse>);
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

type ReservaMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FechaMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NotificacionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PublicidadMetaData = {
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
  readonly ubicacionNombre: string;
  readonly ubicacionId: string;
  readonly ubicacionLink?: string;
  readonly coordenadas: string;
  readonly comision: number;
  readonly estadoAventura: EstadoAventura | keyof typeof EstadoAventura;
  readonly altitud?: number;
  readonly distanciaRecorrida?: number;
  readonly altimetriaRecorrida?: number;
  readonly categoria?: Categorias | keyof typeof Categorias;
  readonly materialDefault?: string;
  readonly incluidoDefault?: (string | null)[];
  readonly usuarioID?: string;
  readonly SolicitudGuias?: (AventuraSolicitudGuia | null)[];
  readonly UsuariosAutorizados?: (AventuraUsuario | null)[];
  readonly Fechas?: (Fecha | null)[];
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
  readonly evaluadorID?: string;
  readonly usuarioID?: string;
  readonly mensaje?: string;
  readonly Aventuras?: (AventuraSolicitudGuia | null)[];
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
  readonly tipo?: TipoUsuario | keyof typeof TipoUsuario;
  readonly guia?: boolean;
  readonly nombre?: string;
  readonly apellido?: string;
  readonly nombreAgencia?: string;
  readonly foto?: string;
  readonly nickname?: string;
  readonly calificacion?: number;
  readonly stripeID?: string;
  readonly selfie?: string;
  readonly ID?: (string | null)[];
  readonly certificaciones?: (string | null)[];
  readonly telefono?: string;
  readonly sitioWeb?: string;
  readonly CuentaBancaria?: string;
  readonly fechaNacimiento?: string;
  readonly direccion?: string;
  readonly rfcIndividual?: string;
  readonly rfcCompania?: string;
  readonly capacidadMaxima?: number;
  readonly comentariosAdicionales?: string;
  readonly owner?: string;
  readonly AventurasAutorizadas?: (AventuraUsuario | null)[];
  readonly Mensajes?: (Mensaje | null)[];
  readonly ChatRooms?: (ChatRoomUsuario | null)[];
  readonly Reservas?: (Reserva | null)[];
  readonly Fechas?: (Fecha | null)[];
  readonly Notificaciones?: (Notificacion | null)[];
  readonly SolicitudesCreadas?: (SolicitudGuia | null)[];
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
  readonly lastMessage?: Mensaje;
  readonly fechaID?: string;
  readonly Mensajes?: (Mensaje | null)[];
  readonly Participantes?: (ChatRoomUsuario | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

export declare class Reserva {
  readonly id: string;
  readonly total: number;
  readonly comision: number;
  readonly pagadoAlGuia: number;
  readonly tercera: number;
  readonly ninos: number;
  readonly adultos: number;
  readonly pagoID: string;
  readonly fechaID?: string;
  readonly usuarioID?: string;
  readonly guiaID?: string;
  readonly materialChecked?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Reserva, ReservaMetaData>);
  static copyOf(source: Reserva, mutator: (draft: MutableModel<Reserva, ReservaMetaData>) => MutableModel<Reserva, ReservaMetaData> | void): Reserva;
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
  readonly puntoReunionId?: string;
  readonly puntoReunionLink?: string;
  readonly puntoReunionCoords?: string;
  readonly allowTercera: boolean;
  readonly allowNinos: boolean;
  readonly material?: string;
  readonly incluido: string;
  readonly titulo?: string;
  readonly descripcion?: string;
  readonly imagenRuta?: string;
  readonly imagenFondo?: string;
  readonly tituloAventura?: string;
  readonly aventuraID: string;
  readonly usuarioID: string;
  readonly Reservas?: (Reserva | null)[];
  readonly ChatRoom?: (ChatRoom | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Fecha, FechaMetaData>);
  static copyOf(source: Fecha, mutator: (draft: MutableModel<Fecha, FechaMetaData>) => MutableModel<Fecha, FechaMetaData> | void): Fecha;
}

export declare class Notificacion {
  readonly id: string;
  readonly tipo: TipoNotificacion | keyof typeof TipoNotificacion;
  readonly titulo: string;
  readonly descripcion?: string;
  readonly usuarioID: string;
  readonly imagen?: string;
  readonly owner?: string;
  readonly leido?: boolean;
  readonly reservaID?: string;
  readonly fechaID?: string;
  readonly aventuraID?: string;
  readonly solicitudGuiaID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Notificacion, NotificacionMetaData>);
  static copyOf(source: Notificacion, mutator: (draft: MutableModel<Notificacion, NotificacionMetaData>) => MutableModel<Notificacion, NotificacionMetaData> | void): Notificacion;
}

export declare class Publicidad {
  readonly id: string;
  readonly tipo: TipoPublicidad | keyof typeof TipoPublicidad;
  readonly titulo: string;
  readonly descripcion?: string;
  readonly imagenFondo: string;
  readonly video?: string;
  readonly linkAnuncio?: string;
  readonly aventuraID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Publicidad, PublicidadMetaData>);
  static copyOf(source: Publicidad, mutator: (draft: MutableModel<Publicidad, PublicidadMetaData>) => MutableModel<Publicidad, PublicidadMetaData> | void): Publicidad;
}