import { IsNumber, IsString } from "class-validator";
import DTO from "./DTO";

export default class SquareDTO extends DTO {
  @IsString()
  apelido: string;
  
  @IsNumber()
  min_lat: number;

  @IsNumber()
  max_lat: number;

  @IsNumber()
  min_lon: number;

  @IsNumber()
  max_lon: number;

  constructor(
    apelido: string = "",
    min_lat: number = 0,
    max_lat: number = 0,
    min_lon: number = 0,
    max_lon: number = 0
  ){
    super();
    this.apelido = apelido
    this.min_lat = min_lat
    this.max_lat = max_lat
    this.min_lon = min_lon
    this.max_lon = max_lon
  }
}