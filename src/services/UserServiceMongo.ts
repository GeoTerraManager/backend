import { type UserDTO } from '../models/UserDTO'
import UserRepositoryMongo from '../repositories/MongoUserRepository'
import UserService from './UserService'

export default class UserServiceMongo extends UserService<UserRepositoryMongo> {
  constructor () {
    super(new UserRepositoryMongo())
  }

  async createUser (user: UserDTO): Promise<void> {
    await this.repository.createUser(user)
  }

  async updateUser (id: string, user: UserDTO): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async removeUser (id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findUserById (id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findUserByName(name: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
