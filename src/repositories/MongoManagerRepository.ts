import ManagerLoginDTO from "../models/ManagerLoginDTO";
import ManagerRepository from "./ManagerRepository";
import MongoRepository from "./MongoRepository";

export default class MongoManagerRepository extends ManagerRepository<MongoRepository> {
  constructor () {
    super(new MongoRepository())
  }
  
  async login(manager: ManagerLoginDTO): Promise<Boolean> {
    const db = await this.repository.connect('api')
    const managers = db.collection('managers') 
    const result = await managers.findOne({
      nome_usuario: manager.nome_usuario,
      senha: manager.senha
    })

    await this.repository.disconnect()

    if (result) {
      return true
    }

    return false
  }

}