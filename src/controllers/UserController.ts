import { Request, Response } from "express";
import UserService from "../services/UserService";
import { CreateUserDTO } from "../models/CreateUserDTO";

export default class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  public async createUser(req: Request, res: Response) {
    const body = req.body;
    console.log(body)
    const user_dto = new CreateUserDTO();

    // Validating body
    try {
      user_dto.email = body.email;
      user_dto.nome_completo = body.nome_completo;
      user_dto.nome_de_usuario = body.nome_de_usuario;
      user_dto.senha = body.senha;
    } catch (e) {
      return res.status(400).json({error: e});
    }
    
    // try {
    console.log(this.service);
    await this.service.createUser(user_dto);
    return res.status(201).json({ message: 'User created successfully' });
    // } catch (e) {
    //   return res.status(500).json({error: `${e}`});
    // }
  }
}