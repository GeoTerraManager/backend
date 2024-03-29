import UserNameOnlyDTO from '../models/UserNameOnlyDTO'
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
    await this.repository.removeUser(id)
  }

  async findUserById (id: string): Promise<UserNameOnlyDTO | null> {
    const user_document = await this.repository.findUserById(id);

    let dto: UserNameOnlyDTO | null = null;

    if (user_document) {
      dto = new UserNameOnlyDTO(
        user_document._id,
        user_document.nome_completo,
        user_document.nome_de_usuario
      );
    }

    return dto; 
  }

  async findUserByName(name: string): Promise<Array<UserNameOnlyDTO> | null> {
    const user_documents = await this.repository.findUserByName(name);

    const array_dtos: Array<UserNameOnlyDTO> | null = []  
    
    if (user_documents) {
      user_documents.map((document) => {
        array_dtos.push(new UserNameOnlyDTO(
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
