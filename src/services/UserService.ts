import { PrismaClient } from "@prisma/client";
import { CreateUserDTO } from "../models/CreateUserDTO";

export default class UserService {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  public async createUser(user: CreateUserDTO) {
    try {
      await this.client.user.create({
        data: {
          email: user.email,
          password: user.senha,
          nome_usuario: user.nome_de_usuario,
          nome_completo: user.nome_completo
        }
      });
    } catch (error) {
      throw new Error("Error creating user: " + error);
    }
  }
}
