import { Request, Response } from "express";
import SearchServiceMongo from "../services/SearchServiceMongo";
import Controller from "./Controller";
import SearchController from "./SearchController";

export default class SearchControllerMongo extends Controller<SearchServiceMongo> implements SearchController {
  constructor() {
    super(new SearchServiceMongo())
  }

  async searchAll(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.query as string;
  
      if (query && query.length > 0) {
        const response = await this.service.getAll(query);
        res.status(200).json(response);
      } else {
        res.status(400).json({ message: "Query parameter is missing or empty" });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error });
    }
  }

  async searchProjetos(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.query as string;
  
      if (query && query.length > 0) {
        const response = await this.service.getProjects(query);
        res.status(200).json(response);
      } else {
        res.status(400).json({ message: "Query parameter is missing or empty" });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error });
    }
  }

  async searchUsuario(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.query as string;
  
      if (query && query.length > 0) {
        const response = await this.service.getUsers(query);
        res.status(200).json(response);
      } else {
        res.status(400).json({ message: "Query parameter is missing or empty" });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error });
    }
  }
}
