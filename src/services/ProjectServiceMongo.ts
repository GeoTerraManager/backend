import { ObjectId } from "bson";
import MongoProjectsRepository from "../repositories/MongoProjectsRepository";
import ProjectService from "./ProjectService";
import ProjectDTO from "../models/ProjectDTO";
import ProjectDetailsDTO from "../models/ProjectDetailsDTO";

export default class ProjectServiceMongo extends ProjectService<MongoProjectsRepository> {
  constructor() {
    super(new MongoProjectsRepository())
  }

  async allProjects(): Promise<ProjectDTO[]> {
    const projects = await this.repository.allProjects();
    return projects
  }

  async detailsProject(projectID: ObjectId): Promise<ProjectDetailsDTO | null> {
    const project = await this.repository.detailsProject(projectID);
    return project
  }
}