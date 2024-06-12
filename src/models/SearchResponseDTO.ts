import { ObjectId } from "bson";
import DTO from "./DTO";

export enum SearchResponseType {
  USER,
  PROJECT
}

export default class SearchResponseDTO extends DTO {
  name: string;
  type: SearchResponseType;
  id: ObjectId

  constructor(
    name: string = "",
    type: SearchResponseType = SearchResponseType.USER,
    id: ObjectId = new ObjectId()
  ) {
    super();
    this.name = name;
    this.type = type;
    this.id = id;
  }
}
