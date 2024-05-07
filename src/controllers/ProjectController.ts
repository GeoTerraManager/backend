import { Request, Response } from "express"

export default interface ProjectController {
    allProjects(req: Request, res: Response): Promise<void>
    detailsProject(req: Request, res: Response): Promise<void>
}