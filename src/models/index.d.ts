import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

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

export enum AccountType {
  INDIVIDUAL = "INDIVIDUAL",
  COMPANY = "COMPANY"
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

export declare class Aventura {
  readonly id: string;
  readonly titulo: string;
  readonly imagenFondoIdx: number;
  readonly imagenDetalle: (string | null)[];
  readonly precioMin?: number;
  readonly precioMax?: number;
  readonly duracion?: string;
  readonly descripcion?: string;
  readonly dificultad?: number;
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
  constructor(init: ModelInit<Aventura>);
  static copyOf(source: Aventura, mutator: (draft: MutableModel<Aventura>) => MutableModel<Aventura> | void): Aventura;
}

export declare class AventuraSolicitudGuia {
  readonly id: string;
  readonly owner?: string;
  readonly aventura: Aventura;
  readonly solicitudguia: SolicitudGuia;
  constructor(init: ModelInit<AventuraSolicitudGuia>);
  static copyOf(source: AventuraSolicitudGuia, mutator: (draft: MutableModel<AventuraSolicitudGuia>) => MutableModel<AventuraSolicitudGuia> | void): AventuraSolicitudGuia;
}

export declare class SolicitudGuia {
  readonly id: string;
  readonly owner?: string;
  readonly status: StatusSolicitud | keyof typeof StatusSolicitud;
  readonly evaluadorID?: string;
  readonly usuarioID?: string;
  readonly mensaje?: string;
  readonly Aventuras?: (AventuraSolicitudGuia | null)[];
  constructor(init: ModelInit<SolicitudGuia>);
  static copyOf(source: SolicitudGuia, mutator: (draft: MutableModel<SolicitudGuia>) => MutableModel<SolicitudGuia> | void): SolicitudGuia;
}

export declare class AventuraUsuario {
  readonly id: string;
  readonly owner?: string;
  readonly aventura: Aventura;
  readonly usuario: Usuario;
  constructor(init: ModelInit<AventuraUsuario>);
  static copyOf(source: AventuraUsuario, mutator: (draft: MutableModel<AventuraUsuario>) => MutableModel<AventuraUsuario> | void): AventuraUsuario;
}

export declare class Usuario {
  readonly id: string;
  readonly tipo?: TipoUsuario | keyof typeof TipoUsuario;
  readonly guia?: boolean;
  readonly calificacion?: number;
  readonly numResenas?: number;
  readonly nombre?: string;
  readonly apellido?: string;
  readonly foto?: string;
  readonly imagenFondo?: string;
  readonly nickname?: string;
  readonly experience?: number;
  readonly stripeID?: string;
  readonly admin?: boolean;
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
  readonly notificationToken?: string;
  readonly owner?: string;
  readonly newMessages?: number;
  readonly AventurasAutorizadas?: (AventuraUsuario | null)[];
  readonly Mensajes?: (Mensaje | null)[];
  readonly ChatRooms?: (ChatRoomUsuario | null)[];
  readonly Reservas?: (Reserva | null)[];
  readonly Fechas?: (Fecha | null)[];
  readonly Notificaciones?: (Notificacion | null)[];
  readonly SolicitudesCreadas?: (SolicitudGuia | null)[];
  readonly Comentarios?: (Comentario | null)[];
  constructor(init: ModelInit<Usuario>);
  static copyOf(source: Usuario, mutator: (draft: MutableModel<Usuario>) => MutableModel<Usuario> | void): Usuario;
}

export declare class Mensaje {
  readonly id: string;
  readonly content: string;
  readonly usuarioID?: string;
  readonly chatroomID?: string;
  constructor(init: ModelInit<Mensaje>);
  static copyOf(source: Mensaje, mutator: (draft: MutableModel<Mensaje>) => MutableModel<Mensaje> | void): Mensaje;
}

export declare class ChatRoomUsuario {
  readonly id: string;
  readonly newMessages?: number;
  readonly owner?: string;
  readonly chatroom: ChatRoom;
  readonly usuario: Usuario;
  constructor(init: ModelInit<ChatRoomUsuario>);
  static copyOf(source: ChatRoomUsuario, mutator: (draft: MutableModel<ChatRoomUsuario>) => MutableModel<ChatRoomUsuario> | void): ChatRoomUsuario;
}

export declare class ChatRoom {
  readonly id: string;
  readonly name: string;
  readonly picture?: string;
  readonly lastMessage?: Mensaje;
  readonly fechaID?: string;
  readonly guiaID?: string;
  readonly Mensajes?: (Mensaje | null)[];
  readonly Participantes?: (ChatRoomUsuario | null)[];
  constructor(init: ModelInit<ChatRoom>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom>) => MutableModel<ChatRoom> | void): ChatRoom;
}

export declare class Reserva {
  readonly id: string;
  readonly owner?: string;
  readonly total: number;
  readonly comision: number;
  readonly pagadoAlGuia: number;
  readonly tercera: number;
  readonly ninos: number;
  readonly adultos: number;
  readonly pagoID?: string;
  readonly ingreso?: boolean;
  readonly horaIngreso?: string;
  readonly fechaID?: string;
  readonly usuarioID?: string;
  readonly guiaID?: string;
  readonly tipoPago?: TipoPago | keyof typeof TipoPago;
  readonly materialChecked?: string;
  constructor(init: ModelInit<Reserva>);
  static copyOf(source: Reserva, mutator: (draft: MutableModel<Reserva>) => MutableModel<Reserva> | void): Reserva;
}

export declare class Fecha {
  readonly id: string;
  readonly personasTotales: number;
  readonly owner?: string;
  readonly fechaInicial: number;
  readonly fechaFinal: number;
  readonly precio: number;
  readonly comision: number;
  readonly experienciaPorPersona?: number;
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
  readonly dificultad?: number;
  readonly Reservas?: (Reserva | null)[];
  readonly ChatRoom?: (ChatRoom | null)[];
  constructor(init: ModelInit<Fecha>);
  static copyOf(source: Fecha, mutator: (draft: MutableModel<Fecha>) => MutableModel<Fecha> | void): Fecha;
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
  readonly showAt?: number;
  readonly reservaID?: string;
  readonly fechaID?: string;
  readonly aventuraID?: string;
  readonly guiaID?: string;
  readonly solicitudGuiaID?: string;
  constructor(init: ModelInit<Notificacion>);
  static copyOf(source: Notificacion, mutator: (draft: MutableModel<Notificacion>) => MutableModel<Notificacion> | void): Notificacion;
}

export declare class Comentario {
  readonly id: string;
  readonly usuarioCalificadoID: string;
  readonly body?: string;
  readonly calificacion: number;
  readonly creatorID?: string;
  constructor(init: ModelInit<Comentario>);
  static copyOf(source: Comentario, mutator: (draft: MutableModel<Comentario>) => MutableModel<Comentario> | void): Comentario;
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
  constructor(init: ModelInit<Publicidad>);
  static copyOf(source: Publicidad, mutator: (draft: MutableModel<Publicidad>) => MutableModel<Publicidad> | void): Publicidad;
}