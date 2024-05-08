import SquareDTO from "../models/SquareDTO";
import MongoSquareRepository from "../repositories/MongoSquareRepository";
import SquareService from "./SquareService";

export default class SquareServiceMongo extends SquareService<MongoSquareRepository> {
  constructor() {
    super(new MongoSquareRepository())
  }

  async createSquare(square: SquareDTO): Promise<void> {
    await this.repository.createSquare(square)
  }

  async deleteSquare(id: string): Promise<void> {
    await this.repository.deleteSquare(id)
  }

  async getSquareNickname(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}