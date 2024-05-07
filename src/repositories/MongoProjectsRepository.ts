import { ObjectId } from "bson";
import ProjectDetailsDTO from "../models/ProjectDetailsDTO";
import ProjectsDTO from "../models/ProjectsDTO";
import MongoRepository from "./MongoRepository";
import ProjectsRepository from "./ProjectsRepository";

export default class MongoProjectsRepository extends ProjectsRepository<MongoRepository> {
    constructor () {
        super(new MongoRepository())
    }

    async allProjects(): Promise<ProjectsDTO[]> {
        const db = await this.repository.connect("api");
        const collectionProjects = db.collection("projects");
        const projects = await collectionProjects.find({}, {projection: {_id: 0, name: 1, qtdRevisores: { $size: "$revisores" }, qtdAnalistas: {$size: "$interpretes"}}}).toArray()
    }

    async detailsProject(projectId: ObjectId): Promise<ProjectDetailsDTO> {
        throw new Error("Method not implemented.");
    } 
}