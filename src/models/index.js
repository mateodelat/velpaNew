// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const EstadoAventura = {
  "AUTORIZADO": "AUTORIZADO",
  "PENDIENTE": "PENDIENTE",
  "RECHAZADO": "RECHAZADO"
};

const Categorias = {
  "APLINISMO": "APLINISMO",
  "CICLISMO": "CICLISMO",
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
  "CALIFICAUSUARIO": "CALIFICAUSUARIO"
};

const TipoPublicidad = {
  "AVENTURA": "AVENTURA",
  "ANUNCIO": "ANUNCIO",
  "ACTUALIZACION": "ACTUALIZACION"
};

const AccountType = {
  "INDIVIDUAL": "INDIVIDUAL",
  "COMPANY": "COMPANY"
};

const { Aventura, SolicitudGuia, Usuario, Mensaje, ChatRoom, Reserva, Fecha, Notificacion, Comentario, Publicidad, AventuraSolicitudGuias, AventuraUsuarios, ChatRoomUsuarios, PaymentIntent, CreateAcountResponse } = initSchema(schema);

export {
  Aventura,
  SolicitudGuia,
  Usuario,
  Mensaje,
  ChatRoom,
  Reserva,
  Fecha,
  Notificacion,
  Comentario,
  Publicidad,
  AventuraSolicitudGuias,
  AventuraUsuarios,
  ChatRoomUsuarios,
  EstadoAventura,
  Categorias,
  StatusSolicitud,
  TipoUsuario,
  TipoPago,
  TipoNotificacion,
  TipoPublicidad,
  AccountType,
  PaymentIntent,
  CreateAcountResponse
};