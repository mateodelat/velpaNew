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

const TipoUsuario = {
  "AGENCIA": "AGENCIA",
  "GUIAINDIVIDUAL": "GUIAINDIVIDUAL"
};

const { Aventura, AventuraSolicitudGuia, SolicitudGuia, AventuraUsuario, Usuario, Mensaje, ChatRoomUsuario, ChatRoom, Reserva, Fecha, PaymentIntent } = initSchema(schema);

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
  EstadoAventura,
  Categorias,
  StatusSolicitud,
  TipoUsuario,
  PaymentIntent
};