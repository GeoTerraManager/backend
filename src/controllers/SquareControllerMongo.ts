import { Request, Response } from "express";
import SquareServiceMongo from "../services/SquareServiceMongo";
import Controller from "./Controller";
import SquareController from "./SquareController";

export default class SquareControllerMongo extends Controller<SquareServiceMongo> implements SquareController {
  constructor(){
    super(new SquareServiceMongo())
  }

  async createSquare(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async deleteSquare(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getSquareNickname(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
}