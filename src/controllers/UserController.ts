import { Request, Response } from "express"

export default interface UserController {
  createUser(req: Request, res: Response): Promise<void>
  updateUser(req: Request, res: Response): Promise<void>
  removeUser(req: Request, res: Response): Promise<void>
  findUserById(req: Request, res: Response): Promise<void>
  findUserByName(req: Request, res: Response): Promise<void>
}