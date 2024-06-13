import { type UserDTO } from '../models/UserDTO'
import { WithId, Document, ObjectId } from 'mongodb';
import MongoRepository from './MongoRepository'
import UserRepository from './UserRepository'
import UserResponseDTO, { UserInterpreteResponse, UserRevisorResponse } from '../models/UserResponseDTO';

export default class MongoUserRepository extends UserRepository<MongoRepository> {
  constructor() {
    super(new MongoRepository())
  }

  async createUser(user: UserDTO): Promise<void> {
    const db = await this.repository.connect('api')
    const users = db.collection('users')
    await users.insertOne({
      email: user.email,
      name: user.nome_de_usuario
    })

    await this.repository.disconnect()
  }

  async updateUser(id: string, user: UserDTO): Promise<void> {
    const db = await this.repository.connect('api');
    const users = db.collection('users');

    await users.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          email: user.email,
          name: user.nome_de_usuario,
        }
      }
    );

    await this.repository.disconnect()
  }

  async removeUser(id: string): Promise<void> {
    const db = await this.repository.connect('api');
    const users = db.collection('users');

    await users.deleteOne({
      _id: new ObjectId(id)
    })

    await this.repository.disconnect();
  }

  async findUserById(id: string): Promise<UserResponseDTO | null> {
    const db = await this.repository.connect('api');
    const collectionProjetos = db.collection('projects');

    const userId = new ObjectId(id)

    const nomeUser = await this.nomeUser(userId);
    const { qtd_quadriculas_atribuidas=0, qtd_quadriculas_finalizadas=0, qtd_quadriculas_andamento=0 } = await this.qtdTotalQuadriculas(nomeUser);
    const qtd_total_apontamentos = await this.countApontamentos(userId);
    const projetos: Array<UserRevisorResponse | UserInterpreteResponse> = [];

    const projects = await collectionProjetos.find({
      $or: [
        { "revisores": userId },
        { "interpretes": userId }
      ]
    }).toArray();

    let projetoCargo = []

    for (const project of projects) {
      const userIdString = userId.toString();

      let isInterprete = false;

      for (const interprete of project.interpretes) {
        let interpreteString = interprete.toString();

        if (userIdString === interpreteString) {
          isInterprete = true;
          break;
        }
      }

      if (isInterprete) {
        projetoCargo.push({
          cargo: "INTERPRETE",
          id_projeto: project._id,
          id_grades: project.grade,
          id_alteracoes: project.alteracoes,
          nome_projeto: project.name
        });
      } else {
        projetoCargo.push({
          cargo: "REVISOR",
          id_projeto: project._id,
          id_grades: project.grade,
          nome_projeto: project.name
        });
      }
    }

    for (const projeto of projetoCargo) {
      if (projeto.cargo == "REVISOR") {
        const { total_quadriculas_revisao=0, revisadas=0, pendentes=0 } = await this.statsRevisor(projeto.id_grades)
        projetos.push({
          nome_projeto: projeto.nome_projeto,
          cargo: projeto.cargo,
          total_quadriculas_revisao: total_quadriculas_revisao,
          revisadas: revisadas,
          pendentes: pendentes
        })
      } else {
        let nome = await this.nomeUser(userId);
        const { total_quadriculas_atribuidas=0, feitas=0, andamento=0, km_mapeados=0 } = await this.statsInterprete(nome, projeto.id_grades)
        projetos.push({
          nome_projeto: projeto.nome_projeto,
          cargo: projeto.cargo,
          total_quadriculas_atribuidas: total_quadriculas_atribuidas,
          feitas: feitas,
          andamento: andamento,
          km_mapeados: km_mapeados
        })
      }
    }

    const result = new UserResponseDTO(
      nomeUser,
      qtd_quadriculas_atribuidas,
      qtd_quadriculas_finalizadas,
      qtd_quadriculas_andamento,
      qtd_total_apontamentos,
      projetos
    )

    return result
  }


  private async qtdTotalQuadriculas(nameUser: string) {
    const db = await this.repository.connect('api');
    const grades = db.collection('grades');

    let qtd_quadriculas_atribuidas = 0;
    let qtd_quadriculas_finalizadas = 0;
    let qtd_quadriculas_andamento = 0;

    const resultCursor = await grades.aggregate([
      {
        $unwind: "$features"
      },
      {
        $match: {
          "features.properties.atribuicao": nameUser,
          "features.properties.status": { $in: ["finalizado", "andamento", null] }
        }
      },
      {
        $group: {
          _id: "$features.properties.atribuicao",
          count: {
            $sum: 1
          },
          finalizado: {
            $sum: {
              $cond: [{ $eq: ["$features.properties.status", "finalizado"] }, 1, 0]
            }
          },
          andamento: {
            $sum: {
              $cond: [{ $eq: ["$features.properties.status", "andamento"] }, 1, 0]
            }
          },
          nullStatus: {
            $sum: {
              $cond: [{ $eq: ["$features.properties.status", null] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          count: 1,
          atribuicao: "$_id",
          finalizado: 1,
          andamento: 1,
          null: "$nullStatus"
        }
      }
    ]).toArray();

    if (resultCursor.length != 0) {
      qtd_quadriculas_atribuidas = resultCursor[0].count
      qtd_quadriculas_finalizadas = resultCursor[0].finalizado
      qtd_quadriculas_andamento = resultCursor[0].andamento
    }

    return { qtd_quadriculas_atribuidas, qtd_quadriculas_finalizadas, qtd_quadriculas_andamento }
  }

  private async countApontamentos(idUser: ObjectId) {
    const db = await this.repository.connect('api');
    const collectionProjetos = db.collection('projects');
    const collectionApontamentos = db.collection('apontamentos');

    const projects = await collectionProjetos.find({ revisores: idUser }).toArray();

    const idsApontamentos = projects.map((project) => project.apontamentos);

    let qtdApontamentos = 0;

    if (idsApontamentos.length > 0) {
      for (const id of idsApontamentos) {
        const pipelineApontamentos = [
          { $match: { _id: id } },
          { $unwind: "$features" },
          {
            $group: {
              _id: "$_id",
              count: { $sum: 1 }
            }
          }
        ];

        const result = await collectionApontamentos.aggregate(pipelineApontamentos).toArray();

        if (result.length > 0) {
          qtdApontamentos += result[0].count;
        }
      }
    }

    return qtdApontamentos;
  }

  private async nomeUser(idUser: ObjectId) {
    const db = await this.repository.connect('api');
    const collectionUsers = db.collection('users');

    const user = await collectionUsers.findOne({ _id: idUser });

    if (user) {
      return user.name;
    }

    this.repository.disconnect();
  
    return "";
  }

  private async statsRevisor(gradesId: ObjectId) {
    const db = await this.repository.connect('api');
    const collectionGrades = db.collection('grades');

    const pipeline = [
      { $match: { _id: gradesId } },
      { $unwind: "$features" },
      {
        $group: {
          _id: null,
          total_quadriculas_revisao: { $sum: 1 },
          revisadas: {
            $sum: {
              $cond: [{ $eq: ["$features.properties.status", "finalizado"] }, 1, 0]
            }
          },
          pendentes: {
            $sum: {
              $cond: [{ $eq: ["$features.properties.status", "andamento"] }, 1, 0]
            }
          }
        }
      }
    ];

    const result = await collectionGrades.aggregate(pipeline).toArray();

    const { total_quadriculas_revisao, revisadas, pendentes } = result[0];

    await this.repository.disconnect();

    return { total_quadriculas_revisao, revisadas, pendentes };
  };

  private async statsInterprete(userName: string, gradesId: ObjectId) {
    const db = await this.repository.connect('api');
    const collectionGrades = db.collection('grades');

    const pipeline = [
      { $unwind: "$features" },
      { $match: { _id: gradesId, "features.properties.atribuicao": userName } },
      {
        $group: {
          _id: null,
          total_quadriculas_atribuidas: { $sum: 1 },
          feitas: {
            $sum: {
              $cond: [{ $eq: ["$features.properties.status", "finalizado"] }, 1, 0]
            }
          },
          andamento: {
            $sum: {
              $cond: [{ $eq: ["$features.properties.status", "andamento"] }, 1, 0]
            }
          },
          km_mapeados: {
            $sum: {
              $cond: [{ $eq: ["$features.properties.status", "finalizado"] }, "$features.properties.area_km2", 0]
            }
          }
        }
      }
    ];

    const result = await collectionGrades.aggregate(pipeline).toArray();

    if (result.length === 0) {
      // No matching documents found, return default values or handle the case accordingly
      return {
        total_quadriculas_revisao: 0,
        revisadas: 0,
        pendentes: 0
      };
    }

    // Destructure the result array only if it's not empty
    const { total_quadriculas_atribuidas, feitas, andamento, km_mapeados } = result[0];

    await this.repository.disconnect();

    return { total_quadriculas_atribuidas, feitas, andamento, km_mapeados };
  };

  async findUserByName(name: string): Promise<Array<WithId<Document>> | null> {
    const db = await this.repository.connect('api');
    const users = db.collection('users');

    const users_documents = await users.find({
      name: { $regex: new RegExp(name, "i") }
    }).toArray();

    await this.repository.disconnect();

    return users_documents;
  }

}
