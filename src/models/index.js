// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const AccountType = {
  "INDIVIDUAL": "INDIVIDUAL",
  "COMPANY": "COMPANY"
};

const EstadoAventura = {
  "AUTORIZADO": "AUTORIZADO",
  "PENDIENTE": "PENDIENTE",
  "RECHAZADO": "RECHAZADO"
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

const ReservaCancelReason = {
  "FECHACERRADA": "FECHACERRADA",
  "CANCELADOPORCLIENTE": "CANCELADOPORCLIENTE"
};

const TipoPago = {
  "EFECTIVO": "EFECTIVO",
  "TARJETA": "TARJETA"
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

const { Aventura, SolicitudGuia, Usuario, Mensaje, ChatRoomUsuarios, ChatRoom, Reserva, Comision, Fecha, Notificacion, Comentario, Publicidad, AventuraSolicitudGuias, AventuraUsuarios, PaymentIntent, CreateAcountResponse } = initSchema(schema);

export {
  Aventura,
  SolicitudGuia,
  Usuario,
  Mensaje,
  ChatRoomUsuarios,
  ChatRoom,
  Reserva,
  Comision,
  Fecha,
  Notificacion,
  Comentario,
  Publicidad,
  AventuraSolicitudGuias,
  AventuraUsuarios,
  AccountType,
  EstadoAventura,
  Categorias,
  StatusSolicitud,
  TipoUsuario,
  ReservaCancelReason,
  TipoPago,
  TipoNotificacion,
  TipoPublicidad,
  PaymentIntent,
  CreateAcountResponse
};