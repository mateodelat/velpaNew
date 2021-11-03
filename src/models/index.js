// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Usuario, FechaUsuario, Fecha, Reservaciones, Aventura, Categoria } = initSchema(schema);

export {
  Usuario,
  FechaUsuario,
  Fecha,
  Reservaciones,
  Aventura,
  Categoria
};