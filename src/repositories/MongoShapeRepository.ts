import { Feature, MultiPolygon } from "geojson";
import MongoRepository from "./MongoRepository";
import ShapeRepository from "./ShapeRepository";
import shapeBrasil from "../shapes/BrasilShape";

export default class MongoShapeRepository extends ShapeRepository<MongoRepository> {
  constructor () {
    super(new MongoRepository())
  }
  
  async createBrasilShape(): Promise<void> {
    const db = await this.repository.connect("api");
    const shapes = db.collection("shapes");
    const shape: Feature<MultiPolygon> = shapeBrasil;
    await shapes.insertOne(shape);
    await this.repository.disconnect();
  }
  
}