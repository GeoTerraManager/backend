import MongoRepository from './MongoRepository'

export default abstract class MongoTempRepository extends MongoRepository {
  public abstract destroyCollection (): Promise<void>
}
