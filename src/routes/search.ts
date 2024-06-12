import { Router } from "express";
import SearchControllerMongo from "../controllers/SearchControllerMongo";

const controller = new SearchControllerMongo()

const routes = Router()

routes.get("/", controller.searchAll.bind(controller));
routes.get("/projetos", controller.searchProjetos.bind(controller));
routes.get("/usuarios", controller.searchUsuario.bind(controller));

export default routes;