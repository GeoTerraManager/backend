import { type UserDTO } from '../models/UserDTO'
import MongoRepository from './MongoRepository'
import UserRepository from './UserRepository'

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

  removeUser (id: string): void {
    throw new Error('Method not implemented.')
  }

  findUserById (id: string): void {
    throw new Error('Method not implemented.')
  }

  findUserByName (name: string): void {
    throw new Error('Method not implemented.')
  }
}
