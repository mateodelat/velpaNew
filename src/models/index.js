// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const EstadoAventura = {
  "AUTORIZADO": "AUTORIZADO",
  "PENDIENTE": "PENDIENTE",
  "RECHAZADO": "RECHAZADO"
};

const TipoNotificacion = {
  "RESERVAENFECHA": "RESERVAENFECHA",
  "RESERVACREADA": "RESERVACREADA",
  "RECORDATORIOFECHA": "RECORDATORIOFECHA",
  "SOLICITUDGUIAAPROVADA": "SOLICITUDGUIAAPROVADA",
  "SOLICITUDGUIARECHAZADA": "SOLICITUDGUIARECHAZADA",
  "SOLICITUDGUIA": "SOLICITUDGUIA",
  "SOLICITUDAVENTURAAPROVADA": "SOLICITUDAVENTURAAPROVADA",
  "SOLICITUDAVENTURARECHAZADA": "SOLICITUDAVENTURARECHAZADA",
  "SOLICITUDAVENTURA": "SOLICITUDAVENTURA",
  "ADMIN": "ADMIN",
  "BIENVENIDA": "BIENVENIDA",
  "FECHACREADA": "FECHACREADA",
  "FECHAACTUALIZACION": "FECHAACTUALIZACION",
  "FECHACANCELADA": "FECHACANCELADA",
  "RESERVACANCELADA": "RESERVACANCELADA",
  "CALIFICAUSUARIO": "CALIFICAUSUARIO"
};

const TipoPublicidad = {
  "AVENTURA": "AVENTURA",
  "ANUNCIO": "ANUNCIO",
  "ACTUALIZACION": "ACTUALIZACION"
};

const Categorias = {
  "ALPINISMO": "ALPINISMO",
  "CICLISMO": "CICLISMO",
  "MOTO": "MOTO",
  "SKI": "SKI",
  "SURF": "SURF",
  "OTROS": "OTROS"
};

const StatusSolicitud = {
  "APROVADA": "APROVADA",
  "PENDIENTE": "PENDIENTE",
  "RECHAZADA": "RECHAZADA"
};

const TipoUsuario = {
  "AGENCIA": "AGENCIA",
  "GUIAINDIVIDUAL": "GUIAINDIVIDUAL"
};

const AccountType = {
  "INDIVIDUAL": "INDIVIDUAL",
  "COMPANY": "COMPANY"
};

const TipoPago = {
  "EFECTIVO": "EFECTIVO",
  "TARJETA": "TARJETA"
};

const ReservaCancelReason = {
  "FECHACERRADA": "FECHACERRADA",
  "CANCELADOPORCLIENTE": "CANCELADOPORCLIENTE"
};

const { Aventura, Reserva, Fecha, Usuario, Comision, ChatRoom, Mensaje, SolicitudGuia, Notificacion, Comentario, Publicidad, ChatRoomUsuarios, AventuraSolicitudGuias, AventuraUsuarios, PaymentIntent, CreateAcountResponse } = initSchema(schema);

export {
  Aventura,
  Reserva,
  Fecha,
  Usuario,
  Comision,
  ChatRoom,
  Mensaje,
  SolicitudGuia,
  Notificacion,
  Comentario,
  Publicidad,
  ChatRoomUsuarios,
  AventuraSolicitudGuias,
  AventuraUsuarios,
  EstadoAventura,
  TipoNotificacion,
  TipoPublicidad,
  Categorias,
  StatusSolicitud,
  TipoUsuario,
  AccountType,
  TipoPago,
  ReservaCancelReason,
  PaymentIntent,
  CreateAcountResponse
};