import { Router } from "express";
import SquareControllerMongo from "../controllers/SquareControllerMongo";
import authManager from "../middleware/authManager";

const controller = new SquareControllerMongo()

const routes = Router()

// Middlewares
routes.use(authManager);

// POST /quadricula -> createSquare
routes.post("/", controller.createSquare.bind(controller));

// Delete /quadricula/:id -> deleteSquare
routes.delete("/:id", controller.deleteSquare.bind(controller));

export default routes;