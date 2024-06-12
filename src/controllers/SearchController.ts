import { Request, Response } from "express"

export default interface SearchController {
  searchAll(req: Request, res: Response): Promise<void>
  searchProjetos(req: Request, res: Response): Promise<void>
  searchUsuario(req: Request, res: Response): Promise<void>
}