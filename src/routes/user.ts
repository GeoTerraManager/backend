import { Router } from "express";
import UserControllerMongo from "../controllers/UserControllerMongo";

const controller = new UserControllerMongo()

const routes = Router()

// POST /usuario -> createUser
routes.post("/", controller.createUser.bind(controller));

export default routes;