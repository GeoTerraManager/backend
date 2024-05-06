import express from 'express'
import cors from 'cors'
import routes from './routes'
import type TaskRegistryDTO from './models/TaskRegistryDTO'
import DestroyDbTask from './tasks/DestroyDbTask'
import CreateManagerTask from './tasks/CreateManagerTask'
import AutoTasksController from './controllers/AutoTasksController'
// import CreateSquaresTask from './tasks/CreateSquaresTask'
// import CreateUsersTask from './tasks/CreateUsersTask'
import CreateCollectionTempAoiTask from './tasks/CreateCollectionTempAoiTask'
import CreateCollectionAoiTask from './tasks/CreateCollectionAoiTask'
import DestroyTempAoiTask from './tasks/DestroyTempAoiTask'

async function main () {
  if (process.argv[2] === 'autotasks') {
    // Setup de Tasks Automatizadas (Popular o banco)
    const autoTasks: TaskRegistryDTO[] = [
      {
        task_name: 'Destroy DB 💥',
        task: new DestroyDbTask()
      },
      {
        task_name: 'Create Manager 👨🏻‍💼',
        task: new CreateManagerTask()
      },
      {
        task_name: 'Create Temp AOI',
        task: new CreateCollectionTempAoiTask()
      },
      {
        task_name: 'Create Collection Aoi Based on Temp AOI',
        task: new CreateCollectionAoiTask()
      },
      {
        task_name: 'Destroy Temp AOI',
        task: new DestroyTempAoiTask()
      },
    ]
    const autoTasksController = new AutoTasksController(autoTasks)
    await autoTasksController.run()
  }

  // Rodando a aplicacao
  const app = express()

  app.use(cors())

  app.use(express.json())
  app.use(routes)

  app.listen(3001, () => {
    console.log('🌳TerraGeo Manager🌳')
    console.log('Acesse em http://localhost:3001 🚀')
  })
}

main()
