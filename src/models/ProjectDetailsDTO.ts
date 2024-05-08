import DTO from "./DTO";

export default class ProjectDetailsDTO extends DTO {
    nomeProjeto: string;
    qtdRevisores: number;
    qtdAnalistas: number;
    qtdGrades: number;
    qtdGradeFeita: number;
    qtdGradeAndamento: number;
    qtdGradePendente: number;
    pctRecorrencia: string;

    constructor(
        nomeProjeto: string = "",
        qtdRevisores: number = 0,
        qtdAnalistas: number = 0,
        qtdGrades: number = 0,
        qtdGradeFeita: number = 0,
        qtdGradeAndamento: number = 0,
        qtdGradePendente: number = 0,
        pctRecorrencia: string = ""
    ) {
        super();
        this.nomeProjeto = nomeProjeto;
        this.qtdRevisores = qtdRevisores;
        this.qtdAnalistas = qtdAnalistas;
        this.qtdGrades = qtdGrades;
        this.qtdGradeFeita = qtdGradeFeita;
        this.qtdGradeAndamento = qtdGradeAndamento;
        this.qtdGradePendente = qtdGradePendente;
        this.pctRecorrencia = pctRecorrencia;
    }
}