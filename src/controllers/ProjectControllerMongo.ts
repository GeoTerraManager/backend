import { Request, Response } from "express";
import ProjectServiceMongo from "../services/ProjectServiceMongo";
import Controller from "./Controller";
import ProjectController from "./ProjectController";
import { ObjectId } from "mongodb";

export default class ProjectControllerMongo extends Controller<ProjectServiceMongo> implements ProjectController {
  constructor() {
    super(new ProjectServiceMongo())
  }
  
  async allProjects(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.service.allProjects();
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(`Erro ao buscar projetos: ${error}`)
    }
  }

  async detailsProject(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id
      const result = await this.service.detailsProject(new ObjectId(id));
      if (result) {
        res.status(200).send(result)
      } else {
        res.status(204).send("Projeto não econtrado")
      }
    } catch (error) {
      res.status(500).send(`Erro ao buscar projeto: ${error}`)
    }
  }
  
}