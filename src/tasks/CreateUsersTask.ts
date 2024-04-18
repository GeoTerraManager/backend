import { UserDTO } from "../models/UserDTO";
import MongoUserRepository from "../repositories/MongoUserRepository";
import Task from "./Task";

export default class CreateUsersTask implements Task {
    private repository = new MongoUserRepository()
    
    async run(): Promise<void> {
        const users: UserDTO[] = [
            new UserDTO(
                "teste@teste.com", "password123", "teste01", "testeoliveira"
            ),
            new UserDTO(
                "teste@teste.com", "password123", "teste02", "testeoliveira"
            ),
            new UserDTO(
                "teste@teste.com", "password123", "teste03", "testeoliveira"
            ),
            new UserDTO(
                "teste@teste.com", "password123", "teste04", "testeoliveira"
            ),
            new UserDTO(
                "teste@teste.com", "password123", "teste05", "testeoliveira"
            ),
            new UserDTO(
                "teste@teste.com", "password123", "teste06", "testeoliveira"
            ),
            new UserDTO(
                "teste@teste.com", "password123", "teste07", "testeoliveira"
            )
        ]

        users.map(async (usuario) => {
           await this.repository.createUser(usuario)
        })
    }
}

