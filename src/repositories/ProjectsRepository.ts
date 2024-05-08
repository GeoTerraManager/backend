import { ObjectId } from "mongodb"
import ProjectsDTO from "../models/ProjectsDTO"
import ProjectDetailsDTO from "../models/ProjectDetailsDTO"

export default abstract class ProjectRepository<T> {
    protected repository: T

    constructor (repository: T) {
        this.repository = repository
    }

    abstract allProjects(): Promise<ProjectsDTO[]>;
    abstract detailsProject(projectId: ObjectId): Promise<ProjectDetailsDTO>;
}