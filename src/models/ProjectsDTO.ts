import DTO from "./DTO";

export default class ProjectsDTO extends DTO {
    nomeProjeto: string;
    qtdRevisores: number;
    qtdAnalistas: number;
    qtdGrades: number;
    qtdGradeFeita: number;
    qtdGradePendente: number;
    qtdGradeRevisao: number;
    pctRecorrencia: number;

    constructor(
        nomeProjeto: string = "",
        qtdRevisores: number = 0,
        qtdAnalistas: number = 0,
        qtdGrades: number = 0,
        qtdGradeFeita: number = 0,
        qtdGradePendente: number = 0,
        qtdGradeRevisao: number = 0,
        pctRecorrencia: number = 0
    ) {
        super();
        this.nomeProjeto = nomeProjeto;
        this.qtdRevisores = qtdRevisores;
        this.qtdAnalistas = qtdAnalistas;
        this.qtdGrades = qtdGrades;
        this.qtdGradeFeita = qtdGradeFeita;
        this.qtdGradePendente = qtdGradePendente;
        this.qtdGradeRevisao = qtdGradeRevisao;
        this.pctRecorrencia = pctRecorrencia;
    }
}