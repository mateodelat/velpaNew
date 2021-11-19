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

const TipoNotificacion = {
  "RESERVAENFECHA": "RESERVAENFECHA",
  "RESERVACREADA": "RESERVACREADA",
  "RECORDATORIOFECHA": "RECORDATORIOFECHA",
  "SOLICITUDGUIA": "SOLICITUDGUIA",
  "SOLICITUDAVENTURA": "SOLICITUDAVENTURA",
  "ADMIN": "ADMIN",
  "BIENVENIDA": "BIENVENIDA",
  "FECHACREADA": "FECHACREADA"
};

const TipoPublicidad = {
  "AVENTURA": "AVENTURA",
  "ANUNCIO": "ANUNCIO",
  "ACTUALIZACION": "ACTUALIZACION"
};

const { Aventura, AventuraSolicitudGuia, SolicitudGuia, AventuraUsuario, Usuario, Mensaje, ChatRoomUsuario, ChatRoom, Reserva, Fecha, Notificacion, Publicidad, PaymentIntent, CreateAcount } = initSchema(schema);

export {
  Aventura,
  AventuraSolicitudGuia,
  SolicitudGuia,
  AventuraUsuario,
  Usuario,
  Mensaje,
  ChatRoomUsuario,
  ChatRoom,
  Reserva,
  Fecha,
  Notificacion,
  Publicidad,
  EstadoAventura,
  Categorias,
  StatusSolicitud,
  TipoUsuario,
  TipoNotificacion,
  TipoPublicidad,
  PaymentIntent,
  CreateAcount
};