import MongoTempGradeRepository from "../repositories/MongoTempGradeRepository";
import type Task from './Task'

export default class CreateCollectionTempGradeTask implements Task {
  private readonly repository = new MongoTempGradeRepository()
  
  async run(): Promise<void> {
    await this.repository.createTempGrade()
  }
}