import { ObjectId } from "mongodb"
import ProjectDTO from "../models/ProjectDTO"
import ProjectDetailsDTO from "../models/ProjectDetailsDTO"

export default abstract class ProjectRepository<T> {
    protected repository: T

    constructor (repository: T) {
        this.repository = repository
    }

    abstract allProjects(): Promise<ProjectDTO[]>;
    abstract detailsProject(projectId: ObjectId): Promise<ProjectDetailsDTO| null>;
}