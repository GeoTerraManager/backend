import { Router } from "express";
import UserController from "../controllers/UserController";
import UserService from "../services/UserService";
import { client } from "..";

const service = new UserService(client);

console.log(service);

const controller = new UserController(service);

const routes = Router()

// Post /usuario
routes.post("", controller.createUser);

export default routes