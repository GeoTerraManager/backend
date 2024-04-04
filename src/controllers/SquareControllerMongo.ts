import { Request, Response } from "express";
import SquareServiceMongo from "../services/SquareServiceMongo";
import Controller from "./Controller";
import SquareController from "./SquareController";
import SquareDTO from "../models/SquareDTO";

export default class SquareControllerMongo extends Controller<SquareServiceMongo> implements SquareController {
  constructor(){
    super(new SquareServiceMongo())
  }

  async createSquare(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body
      
      // validando o corpo da requisicao
      let square_dto = new SquareDTO()
      try {
        square_dto.apelido = body.apelido
        square_dto.min_lat = body.min_lat
        square_dto.max_lat = body.max_lat
        square_dto.min_lon = body.min_lon
        square_dto.max_lon = body.max_lon

        await square_dto.validate()
        
      } catch (error) {
        res.status(422).json({"error": `Erro ao validar o objeto enviado"${error}".`})
        return
      }

      await this.service.createSquare(square_dto)
      res.status(201).send()

    } catch (error) {
      res.status(500).json({"error": `Erro interno "${error}"`})
    }
  }

  async deleteSquare(req: Request, res: Response): Promise<void> {
   try {
     const id = req.params.id
     
     await this.service.deleteSquare(id)
     res.status(204).send()
   } catch (error) {
    
   }
  }

  async getSquareNickname(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
}