import SquareDTO from "../models/SquareDTO";
import Service from "./Service";

export default abstract class SquareService<SquareRepository> extends Service<SquareRepository> {
  abstract createSquare (square: SquareDTO): Promise<void>

  abstract deleteSquare (id: string): Promise<void>

  abstract getSquareNickname (id: string): Promise<void>
}