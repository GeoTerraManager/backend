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
        res.status(422).send(`${error}`) 
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
              res.status(500).send('Falha ao gerar o token');
            } else {
              res.status(200).send(token);
            }
          });
        } else {
          res.status(401).send('Nome de usuario ou senha invalidos');
        }
    } catch (error) {
      res.status(500).send(`${error}`)
    }
  }

  async validate(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization;

    if (!token) {
      res.status(401).send('Usuário não autorizado');
      return
    }

    jwt.verify(token, this.secretKey, (err: any, decoded: any) => {
      if (err) {
        res.status(403).send('Token de acesso invalido');
        return
      } else {
        (req as any).user = decoded;
        jwt.sign(decoded, this.secretKey)
        if (decoded.funcao != 'gerente') {
          res.status(401).send('Funcionalidade não autorizada')
          return
        }
        res.status(200).send()
      }    
    })
    } catch (error) {
      res.status(500).send(`${error}`)
    }
  }
}