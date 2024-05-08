import DTO from "./DTO";

export default class ProjectDetailsDTO extends DTO {
    nomeProjeto: string;
    qtdFeita: number;
    qtdPendente: number;
    qtdRev: number;

    constructor (
        nomeProjeto: string = "",
        qtdFeita: number = 0,
        qtdPendente: number = 0,
        qtdRev: number = 0
    ) {
        super();
        this.nomeProjeto = nomeProjeto;
        this.qtdFeita = qtdFeita;
        this.qtdPendente = qtdPendente;
        this.qtdRev = qtdRev;
    }
}