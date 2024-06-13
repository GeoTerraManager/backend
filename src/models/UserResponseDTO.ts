import DTO from "./DTO"

export class UserRevisorResponse {
  nome_projeto: string
  cargo: string
  total_quadriculas_revisao: number
  revisadas: number
  pendentes: number
}

export class UserInterpreteResponse {
  nome_projeto: string
  cargo: string
  total_quadriculas_atribuidas: number
  feitas: number
  andamento: number
  km_mapeados: number
}

export default class UserResponseDTO extends DTO {
  nome: string
  qtd_quadriculas_atribuidas: number
  qtd_quadriculas_finalizadas: number
  qtd_quadriculas_andamento: number
  qtd_total_apontamentos: number
  projetos: Array<UserRevisorResponse | UserInterpreteResponse>
  constructor(
    nome: string,
    qtd_quadriculas_atribuidas: number,
    qtd_quadriculas_finalizadas: number,
    qtd_quadriculas_andamento: number,
    qtd_total_apontamentos: number,
    projetos: Array<UserRevisorResponse | UserInterpreteResponse>
  ) {
    super()
    this.nome = nome
    this.qtd_quadriculas_atribuidas = qtd_quadriculas_atribuidas
    this.qtd_quadriculas_finalizadas = qtd_quadriculas_finalizadas
    this.qtd_quadriculas_andamento = qtd_quadriculas_andamento
    this.qtd_total_apontamentos = qtd_total_apontamentos
    this.projetos = projetos
  }
}