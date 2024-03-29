import { type UserDTO } from '../models/UserDTO'
import Service from './Service'
import UserNameOnlyDTO from '../models/UserNameOnlyDTO'

export default abstract class UserService<UserRepository> extends Service<UserRepository> {
  abstract createUser (user: UserDTO): Promise<void>

  abstract updateUser (id: string, user: UserDTO): Promise<void>

  abstract removeUser (id: string): Promise<void>

  abstract findUserById (id: string): Promise<UserNameOnlyDTO | null>

  abstract findUserByName (name: string): Promise<Array<UserNameOnlyDTO> | null>
}
