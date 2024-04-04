import { Router } from "express";
import ManagerControllerMongo from "../controllers/ManagerControllerMongo";

const controller = new ManagerControllerMongo()

const routes = Router()

// POST /gerente/login -> login
routes.post("/login", controller.login.bind(controller))

// GET /gerente/valida -> valida
routes.get("/valida", controller.validate.bind(controller))

export default routes;