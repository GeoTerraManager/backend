import MongoTempRepository from './MongoTempRepository'
import { AoiAtibaia, AoiCruzeiro, AoiTaubate } from '../static/Aoi'

export default class MongoTempAoiRepository extends MongoTempRepository {
  async destroyCollection (): Promise<void> {
    const db = await this.connect('api')
    await db.dropCollection('temp_aoi')
    await this.disconnect()
  }

  async createTempAoi (): Promise<void> {
    const db = await this.connect('api')
    const collection = db.collection('temp_aoi')
    await collection.insertMany([AoiAtibaia, AoiCruzeiro, AoiTaubate])
    await this.disconnect()
  }
}
