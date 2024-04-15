import { ObjectId } from "bson";
import SquareDTO from "../models/SquareDTO";
import MongoRepository from "./MongoRepository";
import SquareRepository from "./SquareRepository";

export default class MongoSquareRepository extends SquareRepository<MongoRepository> {
  constructor() {
    super(new MongoRepository())
  }

  async createSquare(square: SquareDTO): Promise<void> {
    const db = await this.repository.connect('api')
    const squares = db.collection('squares')
    await squares.insertOne({
      apelido: square.apelido,
      min_lat: square.min_lat,
      max_lat: square.max_lat,
      min_lon: square.min_lon,
      max_lon: square.max_lon
    })

    await this.repository.disconnect()
  }

  async deleteSquare(id: string): Promise<void> {
    const db = await this.repository.connect('api');
    const squares = db.collection('squares')
    await squares.deleteOne({
      _id: new ObjectId(id)
    })
    await this.repository.disconnect()
  }

  async getSquareNickname(nickname: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}