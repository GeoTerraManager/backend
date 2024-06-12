import SearchResponseDTO from "../models/SearchResponseDTO";
import Service from "./Service";

export default abstract class SearchService<SearchRepository> extends Service<SearchRepository> {
  abstract getAll(query: string): Promise<SearchResponseDTO[]>
  abstract getUsers(query: string): Promise<SearchResponseDTO[]>
  abstract getProjects(query: string): Promise<SearchResponseDTO[]>
}