import { Request, Response, Router } from "express";
import userRoutes from "./user"; 
import squareRoutes from "./square";
import managerRoutes from "./manager";
import projectRoutes from "./project";
import searchRoutes from "./search";


const routes = Router()

// Registrar novas rotas aqui
routes.use("/usuario", userRoutes)
routes.use("/quadricula", squareRoutes)
routes.use("/gerente", managerRoutes)
routes.use("/project", projectRoutes)
routes.use("/pesquisa", searchRoutes)


// HelloWorld Route
routes.get("/", (req: Request, res: Response) => {
  res.send("🌳TerraGeo Manager🌳 is running")
})

export default routes