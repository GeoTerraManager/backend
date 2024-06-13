import { ObjectId } from "bson";

export default class UsersByProjectDTO {
  nomeUsuario: string;
  idUsuario: ObjectId;
  cargo: string;

  constructor(nomeUsuario: string, idUsuario: ObjectId, cargo: string) {
    this.nomeUsuario = nomeUsuario
    this.idUsuario = idUsuario
    this.cargo = cargo
  }
}