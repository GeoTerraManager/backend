import ManagerLoginDTO from "../models/ManagerLoginDTO";
import MongoManagerRepository from "../repositories/MongoManagerRepository";
import Task from "./Task";

export default class CreateManagerTask implements Task {
  private repository = new MongoManagerRepository();

  async run(): Promise<void> {
    await this.repository.createManager(
      new ManagerLoginDTO(
        "manager1",
        "1234"
      )
    )
  }
}
