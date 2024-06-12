import SearchResponseDTO from "../models/SearchResponseDTO";
import MongoSearchRepository from "../repositories/MongoSearchRepository";
import SearchService from "./SearchService";

export default class SearchServiceMongo extends SearchService<MongoSearchRepository> {
  constructor() {
    super(new MongoSearchRepository())
  }

  async getAll(query: string): Promise<SearchResponseDTO[]> {
    return await this.repository.getAll(query);
  }
  
  async getUsers(query: string): Promise<SearchResponseDTO[]> {
    return await this.repository.getUsers(query);
  }

  async getProjects(query: string): Promise<SearchResponseDTO[]> {
    return await this.repository.getProjects(query);
  }
}