import { Router } from "express";
import userRoutes from "./user"; 
import squareRoutes from "./square";

const routes = Router()

// Registrar novas rotas aqui
routes.use("/usuario", userRoutes)
routes.use("/quadricula", squareRoutes)

export default routes
