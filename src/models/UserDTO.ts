import { IsEmail, IsString } from "class-validator"
import DTO from "./DTO"

export class UserDTO extends DTO {
  @IsEmail()
  email: string

  @IsString()
  senha: string

  @IsString()
  nome_de_usuario: string

  @IsString()
  nome_completo: string

  constructor(
    email: string = "",
    senha: string = "",
    nome_de_usuario: string = "",
    nome_completo: string = ""
  ) {
    super()
    this.email = email
    this.senha = senha
    this.nome_de_usuario = nome_de_usuario
    this.nome_completo = nome_completo
  }
}
