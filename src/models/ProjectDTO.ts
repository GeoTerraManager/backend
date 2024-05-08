import { ObjectId } from "bson";
import DTO from "./DTO";

export default class ProjectDTO extends DTO {
    id: ObjectId;
    nomeProjeto: string;
    qtdAlteracao: number
    qtdApontamentos: number;
    qtdGradeFeita: number;
    qtdGradeAndamento: number;
    qtdGradePendente: number;

    constructor (
        id: ObjectId = new ObjectId(),
        nomeProjeto: string = "",
        qtdAlteracao: number = 0,
        qtdApontamentos: number = 0,
        qtdGradeFeita: number = 0,
        qtdGradeAndamento: number = 0,
        qtdGradePendente: number = 0
    ) {
        super();
        this.id = id;
        this.nomeProjeto = nomeProjeto;
        this.qtdAlteracao = qtdAlteracao;
        this.qtdApontamentos = qtdApontamentos;
        this.qtdGradeFeita = qtdGradeFeita;
        this.qtdGradeAndamento = qtdGradeAndamento;
        this.qtdGradePendente = qtdGradePendente;
    }
}