import SearchResponseDTO from "../models/SearchResponseDTO"

export default abstract class SearchRepository<T> {
  protected repository: T

  constructor (repository: T) {
    this.repository = repository
  }

  // GET /search
  abstract getAll(query: string): Promise<SearchResponseDTO[]>

  // GET /search/users
  abstract getUsers(query: string): Promise<SearchResponseDTO[]>

  // GET /search/projects
  abstract getProjects(query: string): Promise<SearchResponseDTO[]>
}