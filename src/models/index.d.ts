import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UsuarioMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FechaUsuarioMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FechaMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ReservacionesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AventuraMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CategoriaMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Usuario {
  readonly id: string;
  readonly nombre?: string;
  readonly apellido?: string;
  readonly sub?: string;
  readonly foto?: string;
  readonly comentarios: (string | null)[];
  readonly calificacion?: number;
  readonly Nickname: string;
  readonly fechas?: (FechaUsuario | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Usuario, UsuarioMetaData>);
  static copyOf(source: Usuario, mutator: (draft: MutableModel<Usuario, UsuarioMetaData>) => MutableModel<Usuario, UsuarioMetaData> | void): Usuario;
}

export declare class FechaUsuario {
  readonly id: string;
  readonly fecha: Fecha;
  readonly usuario: Usuario;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<FechaUsuario, FechaUsuarioMetaData>);
  static copyOf(source: FechaUsuario, mutator: (draft: MutableModel<FechaUsuario, FechaUsuarioMetaData>) => MutableModel<FechaUsuario, FechaUsuarioMetaData> | void): FechaUsuario;
}

export declare class Fecha {
  readonly id: string;
  readonly personasTotales: number;
  readonly fechaInicial: string;
  readonly fechaFinal: string;
  readonly precio: number;
  readonly aventuraID?: string;
  readonly Reservaciones?: (Reservaciones | null)[];
  readonly Guias?: (FechaUsuario | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Fecha, FechaMetaData>);
  static copyOf(source: Fecha, mutator: (draft: MutableModel<Fecha, FechaMetaData>) => MutableModel<Fecha, FechaMetaData> | void): Fecha;
}

export declare class Reservaciones {
  readonly id: string;
  readonly idPago: string;
  readonly total: string;
  readonly personas: number;
  readonly fechaID?: string;
  readonly Usuarios?: Usuario;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Reservaciones, ReservacionesMetaData>);
  static copyOf(source: Reservaciones, mutator: (draft: MutableModel<Reservaciones, ReservacionesMetaData>) => MutableModel<Reservaciones, ReservacionesMetaData> | void): Reservaciones;
}

export declare class Aventura {
  readonly id: string;
  readonly titulo: string;
  readonly guiasAutorizados?: (string | null)[];
  readonly imagenFondo: string;
  readonly imagenDetalle: string[];
  readonly precioMin: number;
  readonly precioMax: number;
  readonly duracion: string;
  readonly descripcionCorta: string;
  readonly descripcionLarga: string;
  readonly materialObligatorio: string[];
  readonly materialOpcional: string[];
  readonly materialAcampada?: (string | null)[];
  readonly alimentacion: string[];
  readonly dificultad: number;
  readonly precioVIP?: number;
  readonly descripcionVIP?: string;
  readonly fechaInicialDisponible?: string;
  readonly fechaFinalDisponible?: string;
  readonly categoriaID?: string;
  readonly Fechas?: (Fecha | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Aventura, AventuraMetaData>);
  static copyOf(source: Aventura, mutator: (draft: MutableModel<Aventura, AventuraMetaData>) => MutableModel<Aventura, AventuraMetaData> | void): Aventura;
}

export declare class Categoria {
  readonly id: string;
  readonly titulo: string;
  readonly foto: string;
  readonly Aventuras?: (Aventura | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Categoria, CategoriaMetaData>);
  static copyOf(source: Categoria, mutator: (draft: MutableModel<Categoria, CategoriaMetaData>) => MutableModel<Categoria, CategoriaMetaData> | void): Categoria;
}