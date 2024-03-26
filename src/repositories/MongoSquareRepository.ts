import SquareDTO from "../models/SquareDTO";
import MongoRepository from "./MongoRepository";
import SquareRepository from "./SquareRepository";

export default class MongoSquareRepository extends SquareRepository<MongoRepository> {
  constructor() {
    super(new MongoRepository())
  }

  async createSquare(square: SquareDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async deleteSquare(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getSquareNickname(nickname: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}