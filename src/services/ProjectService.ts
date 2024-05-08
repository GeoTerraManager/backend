import { ObjectId } from "mongodb";
import Service from "./Service";
import ProjectDetailsDTO from "../models/ProjectDetailsDTO";
import ProjectDTO from "../models/ProjectDTO";


export default abstract class ProjectService<ProjectRepository> extends Service<ProjectRepository> {
    abstract allProjects(): Promise<ProjectDTO[]>
    abstract detailsProject(projectID: ObjectId): Promise<ProjectDetailsDTO | null>
}