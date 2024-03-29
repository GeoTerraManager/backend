import { IsMongoId, IsString } from "class-validator";
import DTO from "./DTO";
import { ObjectId } from "mongodb";

export default class UserNameOnlyDTO extends DTO {
  @IsMongoId()
  id: ObjectId
  
  @IsString()
  nome_completo: string

  @IsString()
  nome_de_usuario: string

  constructor(
    id: ObjectId,
    nome_completo: string,
    nome_de_usuario: string
  ) {
    super();
    this.id = id
    this.nome_completo = nome_completo
    this.nome_de_usuario = nome_de_usuario
  }
}