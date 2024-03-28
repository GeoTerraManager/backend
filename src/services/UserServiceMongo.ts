import UserByNameDTO from '../models/UserByNameDTO'
import { UserDTO } from '../models/UserDTO'
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

  async findUserByName(name: string): Promise<Array<UserByNameDTO> | null> {
    const user_documents = await this.repository.findUserByName(name);

    const array_dtos: Array<UserByNameDTO> | null = []  
    
    if (user_documents) {
      user_documents.map((document) => {
        array_dtos.push(new UserByNameDTO(
          document._id,
          document.nome_completo,
          document.nome_de_usuario
        ))
      })
    } else {
      return null
    }

    return array_dtos
  }
}
