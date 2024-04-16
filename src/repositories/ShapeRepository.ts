import { Feature, MultiPolygon } from "geojson"

export default abstract class ShapeRepository<T> {
  protected repository: T

  constructor (repository: T) {
    this.repository = repository
  }

  // AUTO-TASK
  abstract createBrasilShape(): Promise<void>;
}