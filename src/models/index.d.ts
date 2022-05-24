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

export enum TipoPago {
  EFECTIVO = "EFECTIVO",
  TARJETA = "TARJETA"
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
  FECHACREADA = "FECHACREADA",
  CALIFICAUSUARIO = "CALIFICAUSUARIO"
}

export enum TipoPublicidad {
  AVENTURA = "AVENTURA",
  ANUNCIO = "ANUNCIO",
  ACTUALIZACION = "ACTUALIZACION"
}

export declare class PaymentIntent {
  readonly id?: string | null;
  readonly clientSecret?: string | null;
  constructor(init: ModelInit<PaymentIntent>);
}

export declare class CreateAcountResponse {
  readonly id?: string | null;
  readonly errors?: boolean | null;
  constructor(init: ModelInit<CreateAcountResponse>);
}

type AventuraMetaData = {
  readOnlyFields;
}

type SolicitudGuiaMetaData = {
  readOnlyFields;
}

type UsuarioMetaData = {
  readOnlyFields;
}

type MensajeMetaData = {
  readOnlyFields;
}

type ChatRoomMetaData = {
  readOnlyFields;
}

type ReservaMetaData = {
  readOnlyFields;
}

type FechaMetaData = {
  readOnlyFields;
}

type NotificacionMetaData = {
  readOnlyFields;
}

type ComentarioMetaData = {
  readOnlyFields;
}

type PublicidadMetaData = {
  readOnlyFields;
}

type AventuraSolicitudGuiasMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AventuraUsuariosMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomUsuariosMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Aventura {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly titulo: string;
  readonly imagenFondoIdx: number;
  readonly imagenDetalle: (string | null)[];
  readonly precioMin?: number | null;
  readonly precioMax?: number | null;
  readonly duracion?: string | null;
  readonly descripcion?: string | null;
  readonly dificultad?: number | null;
  readonly ubicacionNombre: string;
  readonly ubicacionId: string;
  readonly ubicacionLink?: string | null;
  readonly coordenadas: string;
  readonly estadoAventura: EstadoAventura | keyof typeof EstadoAventura;
  readonly altitud?: number | null;
  readonly distanciaRecorrida?: number | null;
  readonly altimetriaRecorrida?: number | null;
  readonly categoria?: Categorias | keyof typeof Categorias | null;
  readonly materialDefault?: string | null;
  readonly incluidoDefault?: (string | null)[] | null;
  readonly usuarioID?: string | null;
  readonly owner?: string | null;
  readonly SolicitudGuias?: (AventuraSolicitudGuias | null)[] | null;
  readonly UsuariosAutorizados?: (AventuraUsuarios | null)[] | null;
  readonly Fechas?: (Fecha | null)[] | null;
  constructor(init: ModelInit<Aventura>);
  static copyOf(source: Aventura, mutator: (draft: MutableModel<Aventura>) => MutableModel<Aventura> | void): Aventura;
}

export declare class SolicitudGuia {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner?: string | null;
  readonly status: StatusSolicitud | keyof typeof StatusSolicitud;
  readonly evaluadorID?: string | null;
  readonly usuarioID?: string | null;
  readonly mensaje?: string | null;
  readonly Aventuras?: (AventuraSolicitudGuias | null)[] | null;
  constructor(init: ModelInit<SolicitudGuia>);
  static copyOf(source: SolicitudGuia, mutator: (draft: MutableModel<SolicitudGuia>) => MutableModel<SolicitudGuia> | void): SolicitudGuia;
}

export declare class Usuario {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly tipo?: TipoUsuario | keyof typeof TipoUsuario | null;
  readonly guia?: boolean | null;
  readonly calificacion?: number | null;
  readonly numResenas?: number | null;
  readonly nombre?: string | null;
  readonly apellido?: string | null;
  readonly foto?: string | null;
  readonly imagenFondo?: string | null;
  readonly nickname?: string | null;
  readonly experience?: number | null;
  readonly stripeID?: string | null;
  readonly admin?: boolean | null;
  readonly selfie?: string | null;
  readonly ID?: (string | null)[] | null;
  readonly certificaciones?: (string | null)[] | null;
  readonly telefono?: string | null;
  readonly sitioWeb?: string | null;
  readonly CuentaBancaria?: string | null;
  readonly fechaNacimiento?: string | null;
  readonly direccion?: string | null;
  readonly rfcIndividual?: string | null;
  readonly rfcCompania?: string | null;
  readonly capacidadMaxima?: number | null;
  readonly comentariosAdicionales?: string | null;
  readonly notificationToken?: string | null;
  readonly owner?: string | null;
  readonly newMessages?: number | null;
  readonly AventurasAutorizadas?: (AventuraUsuarios | null)[] | null;
  readonly Mensajes?: (Mensaje | null)[] | null;
  readonly ChatRooms?: (ChatRoomUsuarios | null)[] | null;
  readonly Reservas?: (Reserva | null)[] | null;
  readonly Fechas?: (Fecha | null)[] | null;
  readonly Notificaciones?: (Notificacion | null)[] | null;
  readonly SolicitudesCreadas?: (SolicitudGuia | null)[] | null;
  readonly Comentarios?: (Comentario | null)[] | null;
  constructor(init: ModelInit<Usuario>);
  static copyOf(source: Usuario, mutator: (draft: MutableModel<Usuario>) => MutableModel<Usuario> | void): Usuario;
}

export declare class Mensaje {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly content: string;
  readonly usuarioID?: string | null;
  readonly chatroomID?: string | null;
  readonly chatRoomMensajesId?: string | null;
  constructor(init: ModelInit<Mensaje>);
  static copyOf(source: Mensaje, mutator: (draft: MutableModel<Mensaje>) => MutableModel<Mensaje> | void): Mensaje;
}

export declare class ChatRoom {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly name: string;
  readonly picture?: string | null;
  readonly lastMessage?: Mensaje | null;
  readonly fechaID?: string | null;
  readonly guiaID?: string | null;
  readonly Mensajes?: (Mensaje | null)[] | null;
  readonly Participantes?: (ChatRoomUsuarios | null)[] | null;
  readonly chatRoomLastMessageId?: string | null;
  constructor(init: ModelInit<ChatRoom>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom>) => MutableModel<ChatRoom> | void): ChatRoom;
}

export declare class Reserva {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly total: number;
  readonly comision: number;
  readonly pagadoAlGuia: number;
  readonly tercera: number;
  readonly ninos: number;
  readonly adultos: number;
  readonly pagoID?: string | null;
  readonly ingreso?: boolean | null;
  readonly horaIngreso?: string | null;
  readonly fechaID?: string | null;
  readonly usuarioID?: string | null;
  readonly guiaID?: string | null;
  readonly tipoPago?: TipoPago | keyof typeof TipoPago | null;
  readonly materialChecked?: string | null;
  constructor(init: ModelInit<Reserva>);
  static copyOf(source: Reserva, mutator: (draft: MutableModel<Reserva>) => MutableModel<Reserva> | void): Reserva;
}

export declare class Fecha {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly personasTotales: number;
  readonly fechaInicial: number;
  readonly fechaFinal: number;
  readonly precio: number;
  readonly comision: number;
  readonly experienciaPorPersona?: number | null;
  readonly itinerario: string;
  readonly puntoReunionNombre: string;
  readonly puntoReunionId?: string | null;
  readonly puntoReunionLink?: string | null;
  readonly puntoReunionCoords?: string | null;
  readonly allowTercera: boolean;
  readonly allowNinos: boolean;
  readonly material?: string | null;
  readonly incluido: string;
  readonly titulo?: string | null;
  readonly descripcion?: string | null;
  readonly imagenRuta?: string | null;
  readonly imagenFondo?: string | null;
  readonly tituloAventura?: string | null;
  readonly aventuraID: string;
  readonly usuarioID: string;
  readonly dificultad?: number | null;
  readonly Reservas?: (Reserva | null)[] | null;
  readonly ChatRoom?: (ChatRoom | null)[] | null;
  constructor(init: ModelInit<Fecha>);
  static copyOf(source: Fecha, mutator: (draft: MutableModel<Fecha>) => MutableModel<Fecha> | void): Fecha;
}

export declare class Notificacion {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly tipo: TipoNotificacion | keyof typeof TipoNotificacion;
  readonly titulo: string;
  readonly descripcion?: string | null;
  readonly usuarioID: string;
  readonly imagen?: string | null;
  readonly owner?: string | null;
  readonly leido?: boolean | null;
  readonly showAt?: number | null;
  readonly reservaID?: string | null;
  readonly fechaID?: string | null;
  readonly aventuraID?: string | null;
  readonly guiaID?: string | null;
  readonly solicitudGuiaID?: string | null;
  constructor(init: ModelInit<Notificacion>);
  static copyOf(source: Notificacion, mutator: (draft: MutableModel<Notificacion>) => MutableModel<Notificacion> | void): Notificacion;
}

export declare class Comentario {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly usuarioCalificadoID: string;
  readonly body?: string | null;
  readonly calificacion: number;
  readonly creatorID?: string | null;
  constructor(init: ModelInit<Comentario>);
  static copyOf(source: Comentario, mutator: (draft: MutableModel<Comentario>) => MutableModel<Comentario> | void): Comentario;
}

export declare class Publicidad {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly tipo: TipoPublicidad | keyof typeof TipoPublicidad;
  readonly titulo: string;
  readonly descripcion?: string | null;
  readonly imagenFondo: string;
  readonly video?: string | null;
  readonly linkAnuncio?: string | null;
  readonly aventuraID?: string | null;
  constructor(init: ModelInit<Publicidad>);
  static copyOf(source: Publicidad, mutator: (draft: MutableModel<Publicidad>) => MutableModel<Publicidad> | void): Publicidad;
}

export declare class AventuraSolicitudGuias {
  readonly id: string;
  readonly aventura: Aventura;
  readonly solicitudGuia: SolicitudGuia;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<AventuraSolicitudGuias, AventuraSolicitudGuiasMetaData>);
  static copyOf(source: AventuraSolicitudGuias, mutator: (draft: MutableModel<AventuraSolicitudGuias, AventuraSolicitudGuiasMetaData>) => MutableModel<AventuraSolicitudGuias, AventuraSolicitudGuiasMetaData> | void): AventuraSolicitudGuias;
}

export declare class AventuraUsuarios {
  readonly id: string;
  readonly aventura: Aventura;
  readonly usuario: Usuario;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<AventuraUsuarios, AventuraUsuariosMetaData>);
  static copyOf(source: AventuraUsuarios, mutator: (draft: MutableModel<AventuraUsuarios, AventuraUsuariosMetaData>) => MutableModel<AventuraUsuarios, AventuraUsuariosMetaData> | void): AventuraUsuarios;
}

export declare class ChatRoomUsuarios {
  readonly id: string;
  readonly usuario: Usuario;
  readonly chatRoom: ChatRoom;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ChatRoomUsuarios, ChatRoomUsuariosMetaData>);
  static copyOf(source: ChatRoomUsuarios, mutator: (draft: MutableModel<ChatRoomUsuarios, ChatRoomUsuariosMetaData>) => MutableModel<ChatRoomUsuarios, ChatRoomUsuariosMetaData> | void): ChatRoomUsuarios;
}