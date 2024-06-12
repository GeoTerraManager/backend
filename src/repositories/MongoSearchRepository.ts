import SearchResponseDTO, { SearchResponseType } from "../models/SearchResponseDTO";
import MongoRepository from "./MongoRepository";
import SearchRepository from "./SearchRepository";

export default class MongoSearchRepository extends SearchRepository<MongoRepository> {
  constructor() {
    super(new MongoRepository())
  }

  async getAll(query: string): Promise<SearchResponseDTO[]> {
    const db = await this.repository.connect("api");
    const users = db.collection("users");
    const projects = db.collection("projects");

    const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const [foundUsers, foundProjects] = await Promise.all([
      users.find({
        $or: [
          { name: { $regex: new RegExp(sanitizedQuery, "i") } },
          { email: { $regex: new RegExp(sanitizedQuery, "i") } }
        ]
      }).limit(6).toArray(),
      projects.find({
        name: { $regex: new RegExp(sanitizedQuery, "i") }
      }).limit(6).toArray()
    ]);

    const response: SearchResponseDTO[] = [
      ...foundUsers.map(user => new SearchResponseDTO(
        user.name,
        SearchResponseType.USER,
        user._id
      )),
      ...foundProjects.map(project => new SearchResponseDTO(
        project.name,
        SearchResponseType.PROJECT,
        project._id
      ))
    ];

    await this.repository.disconnect();

    return response;
  }

  async getUsers(query: string): Promise<SearchResponseDTO[]> {
    const db = await this.repository.connect("api");
    const users = db.collection("users");

    const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const foundUsers = await users.find({
      $or: [
        { name: { $regex: new RegExp(sanitizedQuery, "i") } },
        { email: { $regex: new RegExp(sanitizedQuery, "i") } }
      ]
    }).limit(12).toArray();

    const response: SearchResponseDTO[] = [
      ...foundUsers.map(user => new SearchResponseDTO(
        user.name,
        SearchResponseType.USER,
        user._id
      ))
    ];

    await this.repository.disconnect();

    return response;
  }

  async getProjects(query: string): Promise<SearchResponseDTO[]> {
    const db = await this.repository.connect("api");
    const projects = db.collection("projects");

    const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const foundProjects = await projects.find({
      name: { $regex: new RegExp(sanitizedQuery, "i") }
    }).limit(12).toArray();

    const response: SearchResponseDTO[] = [
      ...foundProjects.map(project => new SearchResponseDTO(
        project.name,
        SearchResponseType.PROJECT,
        project._id
      ))
    ];

    await this.repository.disconnect();

    return response;
  }
}