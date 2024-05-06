import { GradeAtuacaoTaubate, GradeAtuacaoAtibaia, GradeAtuacaoCruzeiro } from "../static/Grade";
import MongoTempRepository from "./MongoTempRepository";


export default class MongoTempGradeRepository extends MongoTempRepository {
  async destroyCollection(): Promise<void> {
    const db = await this.connect("api");
    await db.dropCollection("temp_grade");
    await this.disconnect();
  }

  async createTempGrade(): Promise<void> {
    const db = await this.connect('api')
    const collection = db.collection('temp_grade')
    await collection.insertMany([GradeAtuacaoAtibaia, GradeAtuacaoCruzeiro, GradeAtuacaoTaubate])
    await this.disconnect();
  }
  
}