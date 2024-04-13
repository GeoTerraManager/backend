import MongoRepository from "../repositories/MongoRepository";
import Task from "./Task";

export default class DestroyDbTask implements Task {
  private repository: MongoRepository = new MongoRepository();

  async run(): Promise<void> {
    await this.repository.destroy_db("api")
  }
}