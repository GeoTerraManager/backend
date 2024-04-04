import { Request, Response } from "express"

export default interface ManagerController {
  login(req: Request, res: Response): Promise<void>
}