import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import ManagerServiceMongo from "../services/ManagerServiceMongo";
import Controller from "./Controller";
import ManagerController from "./ManagerController";
import ManagerLoginDTO from "../models/ManagerLoginDTO";

export default class ManagerControllerMongo extends Controller<ManagerServiceMongo> implements ManagerController {
  private secretKey: string = process.env.JWT_KEY || "dev";  

  constructor() {
    super(new ManagerServiceMongo())
  }
  
  async login(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body

      // validando o corpo da requisicao
      let manager_login_dto: ManagerLoginDTO;
      try {
        manager_login_dto = new ManagerLoginDTO(
          body.nome_usuario,
          body.senha
        )

        await manager_login_dto.validate()
      } catch (error) {
        res.status(422).json({"error": `Erro ao validar o objeto enviado "${error}".`}) 
        return
      }

       if (await this.service.login(manager_login_dto)) {
        // se o manager existe crie um jwt e envie
        jwt.sign(
          { 
            nome_usuario: manager_login_dto.nome_usuario,
            funcao: "gerente" 
          },
          this.secretKey, { expiresIn: '15min' }, (err, token) => {
            if (err) {
              res.status(500).json({ error: 'Falha ao gerar o token' });
            } else {
              res.json({ token });
            }
          });
        } else {
          res.status(401).json({ error: 'Nome de usuario ou senha invalidos' });
        }
    } catch (error) {
      res.status(500).json({"error": `Erro interno "${error}"`})
    }
  }
}