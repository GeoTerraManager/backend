import ManagerLoginDTO from "../models/ManagerLoginDTO"

export default abstract class ManagerRepository<T> {
  protected repository: T

  constructor (repository: T) {
    this.repository = repository
  }
  
  // POST /login
  abstract login (manager: ManagerLoginDTO): Promise<Boolean>

  // AUTO-TASK
  abstract createManager(manager: ManagerLoginDTO): Promise<void>
}