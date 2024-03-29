import { type UserDTO } from '../models/UserDTO'
import { WithId, Document, ObjectId } from 'mongodb';
import MongoRepository from './MongoRepository'
import UserRepository from './UserRepository'
import { timeStamp } from 'console';

export default class MongoUserRepository extends UserRepository<MongoRepository> {
  constructor () {
    super(new MongoRepository())
  }

  async createUser (user: UserDTO): Promise<void> {
    const db = await this.repository.connect('api')
    const users = db.collection('users')
    await users.insertOne({
      email: user.email,
      senha: user.senha,
      nome_de_usuario: user.nome_de_usuario,
      nome_completo: user.nome_completo
    })

    await this.repository.disconnect()
  }

  updateUser (id: string, user: UserDTO): void {
    throw new Error('Method not implemented.')
  }

  async removeUser (id: string): Promise<void> {
    try {
      const db = await this.repository.connect('api');
      const users = db.collection('users');
      
      await users.deleteOne({
        _id: new ObjectId(id)
      })

      await this.repository.disconnect();
    } catch (error) {
      console.log(error);
      throw new Error(`Erro na deleção de usuário: ${error}`);
    }
  }

  async findUserById (id: string): Promise<WithId<Document> | null> {
    try {
      const db = await this.repository.connect('api');
      const users = db.collection('users');

      const user_document = await users.findOne({
        _id: new ObjectId(id)
      })

      await this.repository.disconnect();

      return user_document;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findUserByName(name: string): Promise<Array<WithId<Document>> | null> {
    try {
      const db = await this.repository.connect('api');
      const users = db.collection('users');
      
      const users_documents = await users.find({
        nome_de_usuario: { $regex: new RegExp(name, "i") } 
      }).toArray();
      
      await this.repository.disconnect();
  
      return users_documents;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
}
