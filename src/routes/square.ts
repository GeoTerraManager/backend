import { Router } from "express";
import SquareControllerMongo from "../controllers/SquareControllerMongo";

const controller = new SquareControllerMongo()

const routes = Router()

// POST /quadricula -> createSquare
routes.post("/", controller.createSquare.bind(controller));

export default routes;