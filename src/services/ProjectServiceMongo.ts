import { ObjectId } from "bson";
import MongoProjectsRepository from "../repositories/MongoProjectsRepository";
import ProjectService from "./ProjectService";
import ProjectsDTO from "../models/ProjectsDTO";

export default class ProjectServiceMongo extends ProjectService<MongoProjectsRepository> {
  constructor() {
    super(new MongoProjectsRepository())
  }

  async allProjects(): Promise<ProjectsDTO[]> {
    const projects = await this.repository.allProjects();
    return projects
  }

  detailsProject(projectID: ObjectId): Promise<void> {
    throw new Error("Method not implemented.");
  }
}