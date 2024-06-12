import { ObjectId } from "mongodb";
import DTO from "./DTO";

export enum StatusQuadricula {
  PENDENTE,
  REVISAO,
  FEITO,
}

export enum PapelUsuario {
  REVISOR,
  INTERPRETE
}

export interface Quadricula {
  idQuadricula: ObjectId;
  status: StatusQuadricula;
}

export interface Usuario {
  idUsuario: ObjectId;
  papel: PapelUsuario;
}

export default class CreateProjectDTO extends DTO {
  nomeProjeto: string;
  quadriculas: Quadricula[];
  usuarios: Usuario[]

  constructor(
    nomeProjeto: string,
    quadriculas: Quadricula[],
    usuarios: Usuario[]
  ) {
    super();
    this.nomeProjeto = nomeProjeto;
    this.quadriculas = quadriculas;
    this.usuarios = usuarios;
  }
}