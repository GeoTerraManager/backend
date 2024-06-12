import { type UserDTO } from '../models/UserDTO'
import { WithId, Document, ObjectId } from 'mongodb';
import MongoRepository from './MongoRepository'
import UserRepository from './UserRepository'

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

  async findUserById(id: string): Promise<WithId<Document> | null> {
    const db = await this.repository.connect('api');
    const users = db.collection('users');
    const grades = db.collection('grades');

    const user_document = await users.findOne({
      _id: new ObjectId(id)
    });

    const resultCursor = await grades.aggregate([
      {
        $unwind: "$features"
      },
      {
        $match: {
          "features.properties.atribuicao": "analista 1",
          $or: [
            { "features.properties.status": "finalizado" },
            { "features.properties.status": "andamento" },
            { "features.properties.status": null }
          ]
        }
      },
      {
        $group: {
          "_id": {
            "atribuicao": "$features.properties.atribuicao",
            "status": "$features.properties.status"
          },
          "count": { "$sum": 1 }
        }
      },
      {
        $project: {
          "_id": 0,
          "atribuicao": "$_id.atribuicao",
          "status": "$_id.status",
          "count": "$count"
        }
      }
    ]).toArray();

    resultCursor.forEach((doc) => {
      console.log(`Atribuicao: ${doc.atribuicao}, Status: ${doc.status}, Count: ${doc.count}`);
    });

    await this.repository.disconnect();

    return user_document;
  }


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
