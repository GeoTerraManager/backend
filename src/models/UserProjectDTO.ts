import { IsObject } from "class-validator";
import DTO from "./DTO";
import { UserDTO } from "./UserDTO";
import { ObjectId } from "bson";

export enum Papel {
    REVISOR,
    INTERPRETE
}

interface Usuario {
    id: ObjectId;
    papel: Papel
}

export default class ProjectDTO extends DTO {
    nome_projeto: string;
    usuarios: Usuario[];
    quadriculas: ObjectId[];
    apontamento: ObjectId[];
    revisao: ObjectId[];
}