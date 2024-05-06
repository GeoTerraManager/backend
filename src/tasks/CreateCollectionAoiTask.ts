import MongoAoiRepository from "../repositories/MongoAoiRepository";
import Task from "./Task";

export default class CreateCollectionAoiTask implements Task {
  private readonly repository = new MongoAoiRepository();

  async run(): Promise<void> {
    await this.repository.createAoisCollectionBasedOnTempAoi()
  }
}