import { ObjectId } from "bson";
import ProjectDetailsDTO from "../models/ProjectDetailsDTO";
import ProjectDTO from "../models/ProjectDTO";
import MongoRepository from "./MongoRepository";
import ProjectsRepository from "./ProjectsRepository";

export default class MongoProjectsRepository extends ProjectsRepository<MongoRepository> {
  constructor() {
    super(new MongoRepository());
  }

  async allProjects(): Promise<ProjectDTO[]> {
    const db = await this.repository.connect("api");
    const collectionProjects = db.collection("projects");
    const collectionGrade = db.collection("grades");
    const collectionApontamentos = db.collection("apontamentos");
    const collectionAlteracoes = db.collection("alteracoes");

    const projects = await collectionProjects
      .aggregate([
        {
          $project: {
            _id: 1,
            name: 1,
            grade: 1,
            apontamentos: 1,
            alteracoes: 1,
          },
        },
      ])
      .toArray();

    const result = await Promise.all(
      projects.map(async (project) => {
        const qtdPoligonos = await collectionGrade
          .aggregate([
            {
              $match: {
                _id: project.grade,
              },
            },
            {
              $addFields: {
                qtdGradeFeita: {
                  $reduce: {
                    input: "$features",
                    initialValue: 0,
                    in: {
                      $cond: {
                        if: { $eq: ["$$this.properties.status", "finalizado"] },
                        then: { $add: ["$$value", 1] },
                        else: "$$value",
                      },
                    },
                  },
                },
                qtdGradeAndamento: {
                  $reduce: {
                    input: "$features",
                    initialValue: 0,
                    in: {
                      $cond: {
                        if: { $eq: ["$$this.properties.status", "andamento"] },
                        then: { $add: ["$$value", 1] },
                        else: "$$value",
                      },
                    },
                  },
                },
                qtdGradePendente: {
                  $reduce: {
                    input: "$features",
                    initialValue: 0,
                    in: {
                      $cond: {
                        if: { $eq: ["$$this.properties.status", null] },
                        then: { $add: ["$$value", 1] },
                        else: "$$value",
                      },
                    },
                  },
                },
              },
            },
          ])
          .toArray();

        project.qtdGradeFeita = qtdPoligonos[0].qtdGradeFeita;
        project.qtdGradeAndamento = qtdPoligonos[0].qtdGradeAndamento;
        project.qtdGradePendente = qtdPoligonos[0].qtdGradePendente;

        let qtdApontamentos = await collectionApontamentos
          .aggregate([
            {
              $match: {
                _id: project.apontamentos,
              },
            },
            {
              $addFields: {
                qtdApontamentos: { $size: "$features" },
              },
            },
          ])
          .toArray();

        let qtdAlteracao = await collectionAlteracoes
          .aggregate([
            {
              $match: {
                _id: project.alteracoes,
              },
            },
            {
              $addFields: {
                qtdAlteracao: { $size: "$features" },
              },
            },
          ])
          .toArray();

        project.qtdApontamentos = qtdApontamentos[0].qtdApontamentos;
        project.qtdAlteracao = qtdAlteracao[0].qtdAlteracao;

        return new ProjectDTO(
          project._id,
          project.name,
          project.qtdAlteracao,
          project.qtdApontamentos,
          project.qtdGradeFeita,
          project.qtdGradeAndamento,
          project.qtdGradePendente
        );
      })
    );

    return result;
  }

  async detailsProject(projectId: ObjectId): Promise<ProjectDetailsDTO | null> {
    const db = await this.repository.connect("api");
    const collectionProjects = db.collection("projects");
    const collectionGrade = db.collection("grades");
    const collectionApontamentos = db.collection("apontamentos");
    const collectionAlteracoes = db.collection("alteracoes");

    let project = await collectionProjects
      .aggregate([
        {
          $match: {
            _id: projectId,
          },
        },
        {
          $addFields: {
            qtdRevisores: { $size: "$revisores" },
            qtdAnalistas: { $size: "$interpretes" },
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
            qtdRevisores: 1,
            qtdAnalistas: 1,
            grade: 1,
            apontamentos: 1,
            alteracoes: 1,
            revisores: 1,
            interpretes: 1,
          },
        },
      ])
      .toArray();

    if (!project || project.length === 0) {
      return null;
    }

    const qtdPoligonos = await collectionGrade
      .aggregate([
        {
          $match: {
            _id: project[0].grade,
          },
        },
        {
          $addFields: {
            qtdGrades: { $size: "$features" },
            qtdGradeFeita: {
              $reduce: {
                input: "$features",
                initialValue: 0,
                in: {
                  $cond: {
                    if: { $eq: ["$$this.properties.status", "finalizado"] },
                    then: { $add: ["$$value", 1] },
                    else: "$$value",
                  },
                },
              },
            },
            qtdGradeAndamento: {
              $reduce: {
                input: "$features",
                initialValue: 0,
                in: {
                  $cond: {
                    if: { $eq: ["$$this.properties.status", "andamento"] },
                    then: { $add: ["$$value", 1] },
                    else: "$$value",
                  },
                },
              },
            },
            qtdGradePendente: {
              $reduce: {
                input: "$features",
                initialValue: 0,
                in: {
                  $cond: {
                    if: { $eq: ["$$this.properties.status", null] },
                    then: { $add: ["$$value", 1] },
                    else: "$$value",
                  },
                },
              },
            },
          },
        },
      ])
      .toArray();

    project[0].qtdGrades = qtdPoligonos[0].qtdGrades;
    project[0].qtdGradeFeita = qtdPoligonos[0].qtdGradeFeita;
    project[0].qtdGradeAndamento = qtdPoligonos[0].qtdGradeAndamento;
    project[0].qtdGradePendente = qtdPoligonos[0].qtdGradePendente;

    const qtdAlteracoes = await collectionAlteracoes
      .aggregate([
        {
          $match: {
            _id: project[0].alteracoes,
          },
        },
        {
          $addFields: {
            qtdAlteracoes: { $size: "$features" },
          },
        },
      ])
      .toArray();

    const qtdApontamentos = await collectionApontamentos
      .aggregate([
        {
          $match: {
            _id: project[0].apontamentos,
          },
        },
        {
          $addFields: {
            qtdApontamentos: { $size: "$features" },
          },
        },
      ])
      .toArray();

    project[0].pctRecorrencia = (
      (qtdApontamentos[0].qtdApontamentos * 100) /
      qtdAlteracoes[0].qtdAlteracoes
    ).toFixed(2);

    const result: ProjectDetailsDTO = new ProjectDetailsDTO(
      project[0].name,
      project[0].qtdRevisores,
      project[0].revisores, // Passa os IDs dos revisores
      project[0].qtdAnalistas,
      project[0].interpretes, // Passa os IDs dos intérpretes
      project[0].qtdGrades,
      project[0].qtdGradeFeita,
      project[0].qtdGradeAndamento,
      project[0].qtdGradePendente,
      project[0].pctRecorrencia
    );

    return result;
  }
}
