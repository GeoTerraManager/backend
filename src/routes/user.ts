import { Router } from "express";
import UserControllerMongo from "../controllers/UserControllerMongo";

const controller = new UserControllerMongo()

const routes = Router()

// POST /usuario -> createUser
routes.post("/", controller.createUser.bind(controller));

// GET /usuario?nome_de_usuario=<nome>
routes.get("/", controller.findUserByName.bind(controller));

// GET /usuario/:id
routes.get("/:id", controller.findUserById.bind(controller));

export default routes;