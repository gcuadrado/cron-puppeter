export interface ListTipoAtencion {
  idTipoAtencion: number;
  tipoAtencion: string;
}

export interface ListaOficina {
  idOficina: number;
  codigoOficina: string;
  oficina: string;
  idGrupoMaestro: number;
  validacionEmail: boolean;
  validacionTelefono: boolean;
  direccion: string;
  telefono: string;
  horarioAtencion: string;
  latitud: number;
  longitud: number;
  idServicio: number;
  servicio: string;
  idServicioDependiente: number;
  nombreServicioDependiente: string;
  primerHuecoDisponible: string;
  primerHuecoDisponibleDependiente: string;
  distanciaCP: number;
  oficinaVirtual: boolean;
  infoTramiteRelacionado: string;
}

export interface ResponseSepe {
  listTipoAtencion: ListTipoAtencion[];
  listaTramites: any[];
  listaOficina: ListaOficina[];
}
