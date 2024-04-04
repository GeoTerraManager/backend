import { IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";
import DTO from "./DTO";

export default class ManagerLoginDTO extends DTO {
  @IsString()
  nome_usuario: string;

  @IsString()
  // @MinLength(4)
  // @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Senha inválida, não cumpre os requisitos'})
  senha: string;

  constructor(
    nome_usuario: string,
    senha: string
  ) {
    super()
    this.nome_usuario = nome_usuario
    this.senha = senha
  }
}