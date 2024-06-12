import { Router } from "express";
import UserControllerMongo from "../controllers/UserControllerMongo";
import authManager from "../middleware/authManager";

const controller = new UserControllerMongo()

const routes = Router()

// Middlewares
// routes.use(authManager);

// POST /usuario -> createUser
routes.post("/", controller.createUser.bind(controller));

// GET /usuario?nome_de_usuario=<nome>
routes.get("/", controller.findUserByName.bind(controller));

// GET /usuario/:id
routes.get("/:id", controller.findUserById.bind(controller));

// DELETE /usuario/:id
routes.delete("/:id", controller.removeUser.bind(controller));

// PUT /usuario/:id
routes.put("/:id", controller.updateUser.bind(controller))

export default routes;