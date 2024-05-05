import MongoTempAoiRepository from '../repositories/MongoTempAoiRepository'
import type Task from './Task'

export default class CreateCollectionTempAoiTask implements Task {
  private readonly repository = new MongoTempAoiRepository()

  async run (): Promise<void> {
    await this.repository.createTempAoi()
  }
}
