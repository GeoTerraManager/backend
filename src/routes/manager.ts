import { Router } from "express";
import ManagerControllerMongo from "../controllers/ManagerControllerMongo";

const controller = new ManagerControllerMongo()

const routes = Router()

// POST /gerente/login -> login
routes.post("/login", controller.login.bind(controller))

export default routes;