import { ObjectId } from "bson";
import ProjectDetailsDTO from "../models/ProjectDetailsDTO";
import ProjectsDTO from "../models/ProjectsDTO";
import MongoRepository from "./MongoRepository";
import ProjectsRepository from "./ProjectsRepository";

export default class MongoProjectsRepository extends ProjectsRepository<MongoRepository> {
    constructor() {
        super(new MongoRepository())
    }

    async allProjects(): Promise<ProjectsDTO[]> {
        const db = await this.repository.connect("api");
        const collectionProjects = db.collection("projects");

        const projects = await collectionProjects.aggregate([
            {
                $lookup: {
                    from: "grades",
                    localField: "grade",
                    foreignField: "_id",
                    as: "gradeInfo"
                }
            },
            {
                $lookup: {
                    from: "alteracoes",
                    localField: "alteracoes",
                    foreignField: "_id",
                    as: "alteracoesInfo"
                }
            },
            {
                $lookup: {
                    from: "apontamentos",
                    localField: "apontamentos",
                    foreignField: "_id",
                    as: "apontamentosInfo"
                }
            },
            {
                $unwind: "$gradeInfo"
            },
            {
                $unwind: { path: "$apontamentosInfo", preserveNullAndEmptyArrays: true } // Unwind apontamentosInfo array
            },
            {
                $unwind: { path: "$alteracoesInfo", preserveNullAndEmptyArrays: true } // Unwind alteracoesInfo array
            },
            {
                $addFields: {
                    qtdRevisores: { $size: "$revisores" },
                    qtdAnalistas: { $size: "$interpretes" },
                    qtdGrades: { $size: { $ifNull: ["$gradeInfo.features", []] } },
                    qtdGradeFeita: { $sum: { $cond: { if: { $eq: ["$gradeInfo.features.properties.status", "finalizado"] }, then: 1, else: 0 } } },
                    qtdGradeRevisao: { $cond: { if: { $eq: ["$gradeInfo.features.properties.status", "revisao"] }, then: 1, else: 0 } },
                    qtdGradePendente: { $cond: { if: { $eq: ["$gradeInfo.features.properties.status", ""] }, then: 1, else: 0 } },
                    pctRecorrencia: { $cond: { if: { $and: [{ $gt: [{ $size: "$alteracoesInfo.features" }, 0] }, { $gt: [{ $size: "$apontamentosInfo.features" }, 0] }] }, then: { $multiply: [{ $divide: [{ $size: "$apontamentosInfo.features" }, { $size: "$alteracoesInfo.features" }] }, 100] }, else: 0 } }
                }
            },
            {
                $group: {
                    _id: null,
                    projects: {
                        $push: {
                            name: "$name",
                            qtdRevisores: "$qtdRevisores",
                            qtdAnalistas: "$qtdAnalistas",
                            qtdGrades: "$qtdGrades",
                            qtdGradeFeita: "$qtdGradeFeita",
                            qtdGradeRevisao: "$qtdGradeRevisao",
                            qtdGradePendente: "$qtdGradePendente",
                            pctRecorrencia: "$pctRecorrencia"
                        }
                    }
                }
            },
            {
                $unwind: "$projects"
            },
            {
                $replaceRoot: { newRoot: "$projects" }
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    qtdRevisores: 1,
                    qtdAnalistas: 1,
                    qtdGrades: 1,
                    qtdGradeFeita: 1,
                    qtdGradeRevisao: 1,
                    qtdGradePendente: 1,
                    pctRecorrencia: 1
                }
            }
        ]).toArray();        
        
        const result: ProjectsDTO[] = []

        projects.map((project) => {
            result.push(
                new ProjectsDTO(
                    project.name,
                    project.qtdRevisores,
                    project.qtdAnalistas,
                    project.qtdGrades,
                    project.qtdGradeFeita,
                    project.qtdGradePendente,
                    project.qtdGradeRevisao,
                    project.pctRecorrencia
                ))
        })

        return result
    }

    async detailsProject(projectId: ObjectId): Promise<ProjectDetailsDTO> {
        throw new Error("Method not implemented.");
    }
}