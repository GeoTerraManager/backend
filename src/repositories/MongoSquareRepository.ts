import { ObjectId } from "bson";
import SquareDTO from "../models/SquareDTO";
import MongoRepository from "./MongoRepository";
import SquareRepository from "./SquareRepository";
import { Feature, Polygon } from "geojson";

export default class MongoSquareRepository extends SquareRepository<MongoRepository> {
  constructor() {
    super(new MongoRepository())
  }

  async createSquare(square: SquareDTO): Promise<void> {
    const db = await this.repository.connect('api')
    const squares = db.collection('squares')

    // Criando o poligono GeoJSON
    const squarePolygon: Feature<Polygon> = {
      type: 'Feature',
      properties: {
        apelido: square.apelido
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
            [square.min_lon, square.min_lat],
            [square.max_lon, square.min_lat],
            [square.max_lon, square.max_lat],
            [square.min_lon, square.max_lat],
            [square.min_lon, square.min_lat]
        ]]
      }
    };

    // Inserindo
    await squares.insertOne(squarePolygon);
    await this.repository.disconnect();
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
