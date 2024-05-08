import { Router } from "express";
import ProjectControllerMongo from "../controllers/ProjectControllerMongo";

const controller = new ProjectControllerMongo()

const routes = Router()

// GET /project
routes.get("", controller.allProjects.bind(controller))

routes.get("/:id", controller.detailsProject.bind(controller))

export default routes;