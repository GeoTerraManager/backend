import MongoRepository from './MongoRepository'

export default class MongoTempRepository extends MongoRepository {
  async destroyCollection (dbName: string, collectionToDestroy: string): Promise<void> {
    const db = await this.connect(dbName)
    await db.dropCollection(collectionToDestroy)
    await this.disconnect()
  }
}
