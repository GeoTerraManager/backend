export default abstract class Service<T> {
  protected repository: T

  constructor (repository: T) {
    this.repository = repository
  }
}
