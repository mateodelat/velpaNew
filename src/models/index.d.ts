import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

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

export enum ReservaCancelReason {
  FECHACERRADA = "FECHACERRADA",
  CANCELADOPORCLIENTE = "CANCELADOPORCLIENTE"
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
  FECHAACTUALIZACION = "FECHAACTUALIZACION",
  FECHACANCELADA = "FECHACANCELADA",
  RESERVACANCELADA = "RESERVACANCELADA",
  CALIFICAUSUARIO = "CALIFICAUSUARIO"
}

export enum TipoPublicidad {
  AVENTURA = "AVENTURA",
  ANUNCIO = "ANUNCIO",
  ACTUALIZACION = "ACTUALIZACION"
}

type EagerPaymentIntent = {
  readonly id?: string | null;
  readonly clientSecret?: string | null;
  readonly error?: string | null;
}

type LazyPaymentIntent = {
  readonly id?: string | null;
  readonly clientSecret?: string | null;
  readonly error?: string | null;
}

export declare type PaymentIntent = LazyLoading extends LazyLoadingDisabled ? EagerPaymentIntent : LazyPaymentIntent

export declare const PaymentIntent: (new (init: ModelInit<PaymentIntent>) => PaymentIntent)

type EagerCreateAcountResponse = {
  readonly id?: string | null;
  readonly errors?: boolean | null;
}

type LazyCreateAcountResponse = {
  readonly id?: string | null;
  readonly errors?: boolean | null;
}

export declare type CreateAcountResponse = LazyLoading extends LazyLoadingDisabled ? EagerCreateAcountResponse : LazyCreateAcountResponse

export declare const CreateAcountResponse: (new (init: ModelInit<CreateAcountResponse>) => CreateAcountResponse)

type EagerAventura = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Aventura, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
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
  readonly SolicitudGuias?: (AventuraSolicitudGuias | null)[] | null;
  readonly UsuariosAutorizados?: (AventuraUsuarios | null)[] | null;
  readonly Fechas?: (Fecha | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAventura = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Aventura, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
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
  readonly SolicitudGuias: AsyncCollection<AventuraSolicitudGuias>;
  readonly UsuariosAutorizados: AsyncCollection<AventuraUsuarios>;
  readonly Fechas: AsyncCollection<Fecha>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Aventura = LazyLoading extends LazyLoadingDisabled ? EagerAventura : LazyAventura

export declare const Aventura: (new (init: ModelInit<Aventura>) => Aventura) & {
  copyOf(source: Aventura, mutator: (draft: MutableModel<Aventura>) => MutableModel<Aventura> | void): Aventura;
}

type EagerSolicitudGuia = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SolicitudGuia, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status: StatusSolicitud | keyof typeof StatusSolicitud;
  readonly evaluadorID?: string | null;
  readonly usuarioID?: string | null;
  readonly mensaje?: string | null;
  readonly Aventuras?: (AventuraSolicitudGuias | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySolicitudGuia = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SolicitudGuia, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status: StatusSolicitud | keyof typeof StatusSolicitud;
  readonly evaluadorID?: string | null;
  readonly usuarioID?: string | null;
  readonly mensaje?: string | null;
  readonly Aventuras: AsyncCollection<AventuraSolicitudGuias>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SolicitudGuia = LazyLoading extends LazyLoadingDisabled ? EagerSolicitudGuia : LazySolicitudGuia

export declare const SolicitudGuia: (new (init: ModelInit<SolicitudGuia>) => SolicitudGuia) & {
  copyOf(source: SolicitudGuia, mutator: (draft: MutableModel<SolicitudGuia>) => MutableModel<SolicitudGuia> | void): SolicitudGuia;
}

type EagerUsuario = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Usuario, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tipo?: TipoUsuario | keyof typeof TipoUsuario | null;
  readonly guia?: boolean | null;
  readonly email?: string | null;
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
  readonly newMessages?: number | null;
  readonly AventurasAutorizadas?: (AventuraUsuarios | null)[] | null;
  readonly Mensajes?: (Mensaje | null)[] | null;
  readonly ChatRooms?: (ChatRoomUsuarios | null)[] | null;
  readonly Reservas?: (Reserva | null)[] | null;
  readonly Fechas?: (Fecha | null)[] | null;
  readonly Notificaciones?: (Notificacion | null)[] | null;
  readonly SolicitudesCreadas?: (SolicitudGuia | null)[] | null;
  readonly Comentarios?: (Comentario | null)[] | null;
  readonly Comisiones?: (Comision | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUsuario = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Usuario, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tipo?: TipoUsuario | keyof typeof TipoUsuario | null;
  readonly guia?: boolean | null;
  readonly email?: string | null;
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
  readonly newMessages?: number | null;
  readonly AventurasAutorizadas: AsyncCollection<AventuraUsuarios>;
  readonly Mensajes: AsyncCollection<Mensaje>;
  readonly ChatRooms: AsyncCollection<ChatRoomUsuarios>;
  readonly Reservas: AsyncCollection<Reserva>;
  readonly Fechas: AsyncCollection<Fecha>;
  readonly Notificaciones: AsyncCollection<Notificacion>;
  readonly SolicitudesCreadas: AsyncCollection<SolicitudGuia>;
  readonly Comentarios: AsyncCollection<Comentario>;
  readonly Comisiones: AsyncCollection<Comision>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Usuario = LazyLoading extends LazyLoadingDisabled ? EagerUsuario : LazyUsuario

export declare const Usuario: (new (init: ModelInit<Usuario>) => Usuario) & {
  copyOf(source: Usuario, mutator: (draft: MutableModel<Usuario>) => MutableModel<Usuario> | void): Usuario;
}

type EagerMensaje = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Mensaje, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content: string;
  readonly usuarioID?: string | null;
  readonly chatroomID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMensaje = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Mensaje, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content: string;
  readonly usuarioID?: string | null;
  readonly chatroomID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Mensaje = LazyLoading extends LazyLoadingDisabled ? EagerMensaje : LazyMensaje

export declare const Mensaje: (new (init: ModelInit<Mensaje>) => Mensaje) & {
  copyOf(source: Mensaje, mutator: (draft: MutableModel<Mensaje>) => MutableModel<Mensaje> | void): Mensaje;
}

type EagerChatRoomUsuarios = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoomUsuarios, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomParticipantesId: string;
  readonly usuarioChatRoomsId: string;
  readonly newMessages?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChatRoomUsuarios = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoomUsuarios, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomParticipantesId: string;
  readonly usuarioChatRoomsId: string;
  readonly newMessages?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ChatRoomUsuarios = LazyLoading extends LazyLoadingDisabled ? EagerChatRoomUsuarios : LazyChatRoomUsuarios

export declare const ChatRoomUsuarios: (new (init: ModelInit<ChatRoomUsuarios>) => ChatRoomUsuarios) & {
  copyOf(source: ChatRoomUsuarios, mutator: (draft: MutableModel<ChatRoomUsuarios>) => MutableModel<ChatRoomUsuarios> | void): ChatRoomUsuarios;
}

type EagerReserva = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reserva, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly total: number;
  readonly comision: number;
  readonly pagadoAlGuia: number;
  readonly tercera: number;
  readonly ninos: number;
  readonly adultos: number;
  readonly pagoID?: string | null;
  readonly ingreso?: boolean | null;
  readonly horaIngreso?: string | null;
  readonly cancelado?: boolean | null;
  readonly canceledAt?: string | null;
  readonly cancelReason?: ReservaCancelReason | keyof typeof ReservaCancelReason | null;
  readonly fechaID?: string | null;
  readonly usuarioID?: string | null;
  readonly guiaID?: string | null;
  readonly tipoPago?: TipoPago | keyof typeof TipoPago | null;
  readonly materialChecked?: string | null;
  readonly comisionID?: string | null;
  readonly comisionAsociada?: Comision | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly reservaComisionAsociadaId?: string | null;
}

type LazyReserva = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reserva, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly total: number;
  readonly comision: number;
  readonly pagadoAlGuia: number;
  readonly tercera: number;
  readonly ninos: number;
  readonly adultos: number;
  readonly pagoID?: string | null;
  readonly ingreso?: boolean | null;
  readonly horaIngreso?: string | null;
  readonly cancelado?: boolean | null;
  readonly canceledAt?: string | null;
  readonly cancelReason?: ReservaCancelReason | keyof typeof ReservaCancelReason | null;
  readonly fechaID?: string | null;
  readonly usuarioID?: string | null;
  readonly guiaID?: string | null;
  readonly tipoPago?: TipoPago | keyof typeof TipoPago | null;
  readonly materialChecked?: string | null;
  readonly comisionID?: string | null;
  readonly comisionAsociada: AsyncItem<Comision | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly reservaComisionAsociadaId?: string | null;
}

export declare type Reserva = LazyLoading extends LazyLoadingDisabled ? EagerReserva : LazyReserva

export declare const Reserva: (new (init: ModelInit<Reserva>) => Reserva) & {
  copyOf(source: Reserva, mutator: (draft: MutableModel<Reserva>) => MutableModel<Reserva> | void): Reserva;
}

type EagerComision = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comision, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: number;
  readonly editing?: boolean | null;
  readonly startEditingAt?: number | null;
  readonly payed?: boolean | null;
  readonly pagadoEnReservaID?: string | null;
  readonly reservaID?: string | null;
  readonly fechaID?: string | null;
  readonly usuarioID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComision = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comision, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: number;
  readonly editing?: boolean | null;
  readonly startEditingAt?: number | null;
  readonly payed?: boolean | null;
  readonly pagadoEnReservaID?: string | null;
  readonly reservaID?: string | null;
  readonly fechaID?: string | null;
  readonly usuarioID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comision = LazyLoading extends LazyLoadingDisabled ? EagerComision : LazyComision

export declare const Comision: (new (init: ModelInit<Comision>) => Comision) & {
  copyOf(source: Comision, mutator: (draft: MutableModel<Comision>) => MutableModel<Comision> | void): Comision;
}

type EagerFecha = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Fecha, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
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
  readonly efectivo: boolean;
  readonly material?: string | null;
  readonly incluido: string;
  readonly titulo?: string | null;
  readonly descripcion?: string | null;
  readonly imagenRuta?: string | null;
  readonly imagenFondo?: string | null;
  readonly tituloAventura?: string | null;
  readonly cancelado?: boolean | null;
  readonly canceledAt?: string | null;
  readonly dateModified?: boolean | null;
  readonly aventuraID: string;
  readonly aventuraFechasId?: string | null;
  readonly usuarioID: string;
  readonly dificultad?: number | null;
  readonly Reservas?: (Reserva | null)[] | null;
  readonly ChatRoom?: (ChatRoom | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFecha = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Fecha, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
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
  readonly efectivo: boolean;
  readonly material?: string | null;
  readonly incluido: string;
  readonly titulo?: string | null;
  readonly descripcion?: string | null;
  readonly imagenRuta?: string | null;
  readonly imagenFondo?: string | null;
  readonly tituloAventura?: string | null;
  readonly cancelado?: boolean | null;
  readonly canceledAt?: string | null;
  readonly dateModified?: boolean | null;
  readonly aventuraID: string;
  readonly aventuraFechasId?: string | null;
  readonly usuarioID: string;
  readonly dificultad?: number | null;
  readonly Reservas: AsyncCollection<Reserva>;
  readonly ChatRoom: AsyncCollection<ChatRoom>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Fecha = LazyLoading extends LazyLoadingDisabled ? EagerFecha : LazyFecha

export declare const Fecha: (new (init: ModelInit<Fecha>) => Fecha) & {
  copyOf(source: Fecha, mutator: (draft: MutableModel<Fecha>) => MutableModel<Fecha> | void): Fecha;
}

type EagerChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly picture?: string | null;
  readonly lastMessage?: Mensaje | null;
  readonly fechaID?: string | null;
  readonly guiaID?: string | null;
  readonly Mensajes?: (Mensaje | null)[] | null;
  readonly Participantes?: (ChatRoomUsuarios | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMessageId?: string | null;
}

type LazyChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly picture?: string | null;
  readonly lastMessage: AsyncItem<Mensaje | undefined>;
  readonly fechaID?: string | null;
  readonly guiaID?: string | null;
  readonly Mensajes: AsyncCollection<Mensaje>;
  readonly Participantes: AsyncCollection<ChatRoomUsuarios>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMessageId?: string | null;
}

export declare type ChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerChatRoom : LazyChatRoom

export declare const ChatRoom: (new (init: ModelInit<ChatRoom>) => ChatRoom) & {
  copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom>) => MutableModel<ChatRoom> | void): ChatRoom;
}

type EagerNotificacion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notificacion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tipo: TipoNotificacion | keyof typeof TipoNotificacion;
  readonly titulo: string;
  readonly descripcion?: string | null;
  readonly usuarioID: string;
  readonly imagen?: string | null;
  readonly leido?: boolean | null;
  readonly showAt?: number | null;
  readonly reservaID?: string | null;
  readonly fechaID?: string | null;
  readonly aventuraID?: string | null;
  readonly guiaID?: string | null;
  readonly solicitudGuiaID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNotificacion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notificacion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tipo: TipoNotificacion | keyof typeof TipoNotificacion;
  readonly titulo: string;
  readonly descripcion?: string | null;
  readonly usuarioID: string;
  readonly imagen?: string | null;
  readonly leido?: boolean | null;
  readonly showAt?: number | null;
  readonly reservaID?: string | null;
  readonly fechaID?: string | null;
  readonly aventuraID?: string | null;
  readonly guiaID?: string | null;
  readonly solicitudGuiaID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Notificacion = LazyLoading extends LazyLoadingDisabled ? EagerNotificacion : LazyNotificacion

export declare const Notificacion: (new (init: ModelInit<Notificacion>) => Notificacion) & {
  copyOf(source: Notificacion, mutator: (draft: MutableModel<Notificacion>) => MutableModel<Notificacion> | void): Notificacion;
}

type EagerComentario = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comentario, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly usuarioCalificadoID: string;
  readonly body?: string | null;
  readonly calificacion: number;
  readonly creatorID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComentario = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comentario, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly usuarioCalificadoID: string;
  readonly body?: string | null;
  readonly calificacion: number;
  readonly creatorID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comentario = LazyLoading extends LazyLoadingDisabled ? EagerComentario : LazyComentario

export declare const Comentario: (new (init: ModelInit<Comentario>) => Comentario) & {
  copyOf(source: Comentario, mutator: (draft: MutableModel<Comentario>) => MutableModel<Comentario> | void): Comentario;
}

type EagerPublicidad = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Publicidad, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tipo: TipoPublicidad | keyof typeof TipoPublicidad;
  readonly titulo: string;
  readonly descripcion?: string | null;
  readonly imagenFondo: string;
  readonly video?: string | null;
  readonly linkAnuncio?: string | null;
  readonly aventuraID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPublicidad = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Publicidad, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tipo: TipoPublicidad | keyof typeof TipoPublicidad;
  readonly titulo: string;
  readonly descripcion?: string | null;
  readonly imagenFondo: string;
  readonly video?: string | null;
  readonly linkAnuncio?: string | null;
  readonly aventuraID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Publicidad = LazyLoading extends LazyLoadingDisabled ? EagerPublicidad : LazyPublicidad

export declare const Publicidad: (new (init: ModelInit<Publicidad>) => Publicidad) & {
  copyOf(source: Publicidad, mutator: (draft: MutableModel<Publicidad>) => MutableModel<Publicidad> | void): Publicidad;
}

type EagerAventuraSolicitudGuias = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AventuraSolicitudGuias, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly aventuraId?: string | null;
  readonly solicitudGuiaId?: string | null;
  readonly aventura: Aventura;
  readonly solicitudGuia: SolicitudGuia;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAventuraSolicitudGuias = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AventuraSolicitudGuias, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly aventuraId?: string | null;
  readonly solicitudGuiaId?: string | null;
  readonly aventura: AsyncItem<Aventura>;
  readonly solicitudGuia: AsyncItem<SolicitudGuia>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AventuraSolicitudGuias = LazyLoading extends LazyLoadingDisabled ? EagerAventuraSolicitudGuias : LazyAventuraSolicitudGuias

export declare const AventuraSolicitudGuias: (new (init: ModelInit<AventuraSolicitudGuias>) => AventuraSolicitudGuias) & {
  copyOf(source: AventuraSolicitudGuias, mutator: (draft: MutableModel<AventuraSolicitudGuias>) => MutableModel<AventuraSolicitudGuias> | void): AventuraSolicitudGuias;
}

type EagerAventuraUsuarios = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AventuraUsuarios, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly aventuraId?: string | null;
  readonly usuarioId?: string | null;
  readonly aventura: Aventura;
  readonly usuario: Usuario;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAventuraUsuarios = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AventuraUsuarios, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly aventuraId?: string | null;
  readonly usuarioId?: string | null;
  readonly aventura: AsyncItem<Aventura>;
  readonly usuario: AsyncItem<Usuario>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AventuraUsuarios = LazyLoading extends LazyLoadingDisabled ? EagerAventuraUsuarios : LazyAventuraUsuarios

export declare const AventuraUsuarios: (new (init: ModelInit<AventuraUsuarios>) => AventuraUsuarios) & {
  copyOf(source: AventuraUsuarios, mutator: (draft: MutableModel<AventuraUsuarios>) => MutableModel<AventuraUsuarios> | void): AventuraUsuarios;
}