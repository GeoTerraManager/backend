import { Router } from "express";
import routesUser from "./users";

const routes = Router();

// Registrando a rota de usuarios
routes.use("/usuario", routesUser);

export default routes;
