import MongoTempAoiRepository from "../repositories/MongoTempAoiRepository";
import Task from "./Task";

export default class DestroyTempAoiTask implements Task {
  private readonly repository = new MongoTempAoiRepository()
  
  async run(): Promise<void> {
    await this.repository.destroyCollection()
  }
}