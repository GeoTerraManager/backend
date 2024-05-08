import MongoRepository from '../repositories/MongoRepository'
import type Task from './Task'

export default class DestroyDbTask implements Task {
  private readonly repository: MongoRepository = new MongoRepository()

  async run (): Promise<void> {
    await this.repository.destroyDb('api')
  }
}
