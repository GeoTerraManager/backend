import { ObjectId } from "mongodb";
import Service from "./Service";


export default abstract class ProjectService<ProjectRepository> extends Service<ProjectRepository> {
    abstract allProjects(): Promise<void>
    abstract detailsProject(projectID: ObjectId): Promise<void>
}