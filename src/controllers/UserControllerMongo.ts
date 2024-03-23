import { Request, Response } from "express";
import UserController from "./UserController";
import Controller from "./Controller";
import UserServiceMongo from "../services/UserServiceMongo";
import { UserDTO } from "../models/UserDTO";

export default class UserControllerMongo extends Controller<UserServiceMongo> implements UserController {
  constructor(){
    super(new UserServiceMongo())
  }

  // POST /usuario
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body
      
      // validando o corpo da requisicao
      let user_dto = new UserDTO()
      try {
        user_dto = new UserDTO(
          body.email,
          body.senha,
          body.nome_de_usuario,
          body.nome_completo
        )
        await user_dto.validate()
      } catch(e) {
        // caso seja invalido retorna codigo 422 e o erro de validacao
        res.status(422).json({"error": `Erro ao validar o objeto enviado "${e}".`})
      }
      // ----------------------

      // cria o usuario no banco
      await this.service.createUser(user_dto)
      // retorna o status de criado
      res.status(201).send()
      // ----------------------
    } catch (e) {
      // caso algo de errado retorna internal server error
      res.status(500).json({"error": `Erro interno "${e}"`})
    }
  }

  // PUT /usuario/:id
  updateUser(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  // DELETE /usuario/:id
  removeUser(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  // GET /usuario/:id
  findUserById(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  // GET /usuario?nome_de_usuario=<:nome>
  findUserByName(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
}