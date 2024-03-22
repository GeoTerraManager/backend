import { IsEmail, IsString } from "class-validator";

export class CreateUserDTO {
  @IsEmail()
  email: string;
  @IsString()
  senha: string;
  @IsString()
  nome_de_usuario: string;
  @IsString()
  nome_completo: string;
}