import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import ProjectServiceMongo from "../services/ProjectServiceMongo";
import Controller from "./Controller";
import ProjectController from "./ProjectController";

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

  detailsProject(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}