export default abstract class Controller<T> {
  protected service: T

  constructor (service: T) {
    this.service = service
  }
}
