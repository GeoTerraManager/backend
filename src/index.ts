import express from 'express'
import cors from 'cors'
import routes from './routes'
import TaskRegistryDTO from './models/TaskRegistryDTO'
import DestroyDbTask from './tasks/DestroyDbTask'
import CreateManagerTask from './tasks/CreateManagerTask'
import AutoTasksController from './controllers/AutoTasksController'


async function main() {
  // Setup de Tasks Automatizadas (Popular o banco)
  const autoTasks: TaskRegistryDTO[] = [
    {
      task_name: "Destroy DB 💥",
      task: new DestroyDbTask()
    },
    {
      task_name: "Create Manager 👨🏻‍💼",
      task: new CreateManagerTask()
    }
  ]

  const autoTasksController = new AutoTasksController(autoTasks)
  await autoTasksController.run();

  // Rodando a aplicacao
  const app = express()

  app.use(cors());

  app.use(express.json())
  app.use(routes)

  app.listen(3001, () => {
    console.log('🌳TerraGeo Manager🌳')
    console.log('Acesse em http://localhost:3001 🚀')
  })
}

main();