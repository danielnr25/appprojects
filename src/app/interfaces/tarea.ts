export interface Tarea {
  idtarea:number,
  nombre:string,
  comentario:string,
  idestado:number,
  idproyecto:number,
  idarea:number,
  idetapa:number,
  idmiembro:number,
  area:string, // referencia al nombre del area
  etapa:string, // referencia al nombre de la etapa
  miembro:string, // referencia al nombre del miembro
  estado:string // referencia al nombre del estado
}
