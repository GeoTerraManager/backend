import MongoSquareRepository from "../repositories/MongoSquareRepository";
import Task from "./Task";

export default class CreateGeoIndexTask implements Task {
  private repository = new MongoSquareRepository()

  async run(): Promise<void> {
    await this.repository.createSquareGeoIndex();
  }
}