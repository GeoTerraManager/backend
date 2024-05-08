import { ObjectId } from "mongodb";
import Service from "./Service";
import ProjectsDTO from "../models/ProjectsDTO";


export default abstract class ProjectService<ProjectRepository> extends Service<ProjectRepository> {
    abstract allProjects(): Promise<ProjectsDTO[]>
    abstract detailsProject(projectID: ObjectId): Promise<void>
}