import ProjectDTO from "../models/UserProjectDTO";
import MongoRepository from "./MongoRepository";
import ProjectRepository from "./ProjectRepository";

export default class MongoProjectRepository extends ProjectRepository<MongoRepository> {
    constructor () {
        super(new MongoRepository())
    }
    
    async createProject(projeto: ProjectDTO): Promise<void> {
        const db = await this.repository.connect('api')
        const projects = db.collection('projects')
        await projects.insertOne(projeto)

        await this.repository.disconnect()
    }
    
}