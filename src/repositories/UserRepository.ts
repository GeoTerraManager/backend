import { type UserDTO } from '../models/UserDTO'

export default abstract class UserRepository<T> {
  protected repository: T

  constructor (repository: T) {
    this.repository = repository
  }
  // POST /usuario
  abstract createUser (user: UserDTO): void

  // PUT /usuario/:id
  abstract updateUser (id: string, user: UserDTO): void

  // DELETE /usuario/:id
  abstract removeUser (id: string): void

  // GET /usuario/:id
  abstract findUserById (id: string): void

  // GET /usuario?nome_usuario=:name
  abstract findUserByName (name: string): void
}