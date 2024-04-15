import { Router } from "express";
import userRoutes from "./user"; 
import squareRoutes from "./square";
import managerRoutes from "./manager";

const routes = Router()

// Registrar novas rotas aqui
routes.use("/usuario", userRoutes)
routes.use("/quadricula", squareRoutes)
routes.use("/gerente", managerRoutes)

export default routes
