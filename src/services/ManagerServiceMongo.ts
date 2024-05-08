import ManagerLoginDTO from "../models/ManagerLoginDTO";
import MongoManagerRepository from "../repositories/MongoManagerRepository";
import ManagerService from "./ManagerService";

export default class ManagerServiceMongo extends ManagerService<MongoManagerRepository> {
  constructor() {
    super(new MongoManagerRepository())
  }
  
  async login(manager: ManagerLoginDTO): Promise<Boolean> {
    const result = await this.repository.login(manager)
    return result
  }
  
}