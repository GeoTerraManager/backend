import SquareDTO from "../models/SquareDTO"

export default abstract class SquareRepository<T> {
  protected repository: T

  constructor (repository: T) {
    this.repository = repository
  }

  // POST /quadricula
  abstract createSquare (square: SquareDTO): void

  // DELETE /quadricula/:id
  abstract deleteSquare (id: string): void

  abstract getSquareNickname (nickname: string): void
}