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
  "MTB": "MTB",
  "OTROS": "OTROS"
};

const StatusSolicitud = {
  "APROVADA": "APROVADA",
  "PENDIENTE": "PENDIENTE",
  "RECHAZADA": "RECHAZADA"
};

const TipoNotificacion = {
  "RESERVAENFECHA": "RESERVAENFECHA",
  "RESERVACREADA": "RESERVACREADA",
  "RECORDATORIOFECHA": "RECORDATORIOFECHA",
  "SOLICITUDGUIA": "SOLICITUDGUIA",
  "SOLICITUDAVENTURA": "SOLICITUDAVENTURA",
  "ADMIN": "ADMIN"
};

const TipoUsuario = {
  "AGENCIA": "AGENCIA",
  "GUIAINDIVIDUAL": "GUIAINDIVIDUAL"
};

const TipoPublicidad = {
  "AVENTURA": "AVENTURA",
  "ANUNCIO": "ANUNCIO",
  "ACTUALIZACION": "ACTUALIZACION"
};

const { Aventura, AventuraSolicitudGuia, SolicitudGuia, Notificacion, AventuraUsuario, Usuario, Mensaje, ChatRoomUsuario, ChatRoom, Reserva, Fecha, Publicidad, PaymentIntent, CreateAcount } = initSchema(schema);

export {
  Aventura,
  AventuraSolicitudGuia,
  SolicitudGuia,
  Notificacion,
  AventuraUsuario,
  Usuario,
  Mensaje,
  ChatRoomUsuario,
  ChatRoom,
  Reserva,
  Fecha,
  Publicidad,
  EstadoAventura,
  Categorias,
  StatusSolicitud,
  TipoNotificacion,
  TipoUsuario,
  TipoPublicidad,
  PaymentIntent,
  CreateAcount
};