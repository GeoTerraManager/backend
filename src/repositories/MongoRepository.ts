import { MongoClient, type Db } from 'mongodb'
import Repository from './Repository'

export default class MongoRepository extends Repository<MongoClient, Db> {
  protected client: MongoClient

  constructor () {
    const DATABASE_URL = process.env.DATABASE_URL ?? 'mongodb://localhost:27017/api'
    super()
    this.client = new MongoClient(DATABASE_URL)
  }

  async connect (dbName: string): Promise<Db> {
    await this.client.connect()
    return this.client.db(dbName)
  }

  async disconnect (): Promise<void> {
    await this.client.close()
  }

  async destroyDb (dbName: string): Promise<void> {
    const db = await this.connect(dbName)
    await db.dropDatabase()
    await this.disconnect()
  }
}
