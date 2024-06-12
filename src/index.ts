<<<<<<< HEAD
import express from 'express'
import cors from 'cors'
import routes from './routes'
import type TaskRegistryDTO from './models/TaskRegistryDTO'
// import DestroyDbTask from './tasks/DestroyDbTask'
import CreateManagerTask from './tasks/CreateManagerTask'
import AutoTasksController from './controllers/AutoTasksController'
// import CreateSquaresTask from './tasks/CreateSquaresTask'
// import CreateUsersTask from './tasks/CreateUsersTask'
// import CreateCollectionTempAoiTask from './tasks/CreateCollectionTempAoiTask'

async function main () {
  if (process.argv[2] === 'autotasks') {
    // Setup de Tasks Automatizadas (Popular o banco)
    const autoTasks: TaskRegistryDTO[] = [
      // {
      //   task_name: 'Destroy DB 💥',
      //   task: new DestroyDbTask()
      // },
      {
        task_name: 'Create Manager 👨🏻‍💼',
        task: new CreateManagerTask()
      },
      // {
      //   task_name: "Create Users 👽",
      //   task: new CreateUsersTask()
      // },
      // {
      //   task_name: 'Create Temp AOI',
      //   task: new CreateCollectionTempAoiTask()
      // }
      // {
      //   task_name: "Creating Squares 🌎",
      //   task: new CreateSquaresTask()
      // }
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
=======
import express from 'express'
import cors from 'cors'
import routes from './routes'
import TaskRegistryDTO from './models/TaskRegistryDTO'
import DestroyDbTask from './tasks/DestroyDbTask'
import CreateManagerTask from './tasks/CreateManagerTask'
import CreateSquaresTask from './tasks/CreateSquaresTask'
import CreateUsersTask from './tasks/CreateUsersTask'
import AutoTasksController from './controllers/AutoTasksController'

async function main() {
  if (process.argv[2] == "autotasks") {
    // Setup de Tasks Automatizadas (Popular o banco)
    const autoTasks: TaskRegistryDTO[] = [
      // {
      //   task_name: "Destroy DB 💥",
      //   task: new DestroyDbTask()
      // },
      // {
      //   task_name: "Create Manager 👨🏻‍💼",
      //   task: new CreateManagerTask()
      // },
      // {
      //   task_name: "Create Users 👽",
      //   task: new CreateUsersTask()
      // }
      // {
      //   task_name: "Creating Squares 🌎",
      //   task: new CreateSquaresTask()
      // }
    ]
    const autoTasksController = new AutoTasksController(autoTasks)
    await autoTasksController.run();
  }

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
>>>>>>> 68c55c6 (adding the search endpoint)
