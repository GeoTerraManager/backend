import { Request, Response } from "express"

export default interface SquareController {
  createSquare(req: Request, res: Response): Promise<void>
  deleteSquare(req: Request, res: Response): Promise<void>
  getSquareNickname(req: Request, res: Response): Promise<void>
}