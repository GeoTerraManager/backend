import { Router } from "express";
import userRoutes from "./user" 

const routes = Router()

// Registrar novas rotas aqui
routes.use("/usuario", userRoutes)

export default routes