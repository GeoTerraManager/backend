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
        return
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
  async removeUser(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      await this.service.removeUser(id)

      res.status(204).send();
    } catch (error) {
      res.status(400).json({"error": `${error}`})
    }
  }

  // GET /usuario/:id
  async findUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const response = await this.service.findUserById(id);

      if (response) {
        res.status(200).json(response);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      res.status(500).json({"error": `${e}`})
    }
  }

  // GET /usuario?nome_de_usuario=<:nome>
  async findUserByName(req: Request, res: Response): Promise<void> {
    try {
      const { nome_de_usuario } = req.query;

      if (!nome_de_usuario || typeof nome_de_usuario !== 'string') {
        res.status(400).json({ "error": "Parâmetro nome de usuário não encontrado ou inválido." });
      } else {
        const nome_de_usuario_str = nome_de_usuario as string;
        const response = await this.service.findUserByName(nome_de_usuario_str);
        res.status(200).json(response)
      }
    } catch (e) {
      res.status(500).json({"error": `${e}`})
    }
  }
}
