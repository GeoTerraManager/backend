import DTO from "./DTO";
import { ObjectId } from "bson"; // Certifique-se de importar ObjectId corretamente

export default class ProjectDetailsDTO extends DTO {
    nomeProjeto: string;
    qtdRevisores: number;
    revisores: ObjectId[]; // Novo campo para IDs dos revisores
    qtdAnalistas: number;
    interpretes: ObjectId[]; // Novo campo para IDs dos intérpretes
    qtdGrades: number;
    qtdGradeFeita: number;
    qtdGradeAndamento: number;
    qtdGradePendente: number;
    pctRecorrencia: string;

    constructor(
        nomeProjeto: string = "",
        qtdRevisores: number = 0,
        revisores: ObjectId[] = [], // Inicializa novo campo
        qtdAnalistas: number = 0,
        interpretes: ObjectId[] = [], // Inicializa novo campo
        qtdGrades: number = 0,
        qtdGradeFeita: number = 0,
        qtdGradeAndamento: number = 0,
        qtdGradePendente: number = 0,
        pctRecorrencia: string = ""
    ) {
        super();
        this.nomeProjeto = nomeProjeto;
        this.qtdRevisores = qtdRevisores;
        this.revisores = revisores; // Inicializa novo campo
        this.qtdAnalistas = qtdAnalistas;
        this.interpretes = interpretes; // Inicializa novo campo
        this.qtdGrades = qtdGrades;
        this.qtdGradeFeita = qtdGradeFeita;
        this.qtdGradeAndamento = qtdGradeAndamento;
        this.qtdGradePendente = qtdGradePendente;
        this.pctRecorrencia = pctRecorrencia;
    }
}
