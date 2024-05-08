import TaskRegistryDTO from "../models/TaskRegistryDTO"

export default class AutoTasksController {
  private tasks: TaskRegistryDTO[];

  constructor(tasks: TaskRegistryDTO[]){
    this.tasks = tasks; 
  }

  // run all tasks
  public async run(): Promise<void> {
    console.log("#### 🛠️ Inicializando execução das tarefas automáticas 🛠️ ####")
    for (const task of this.tasks) {
      console.log(`${task.task_name}`);
      try {
        await task.task.run();
        console.log("> OK");
      } catch (error) {
        console.error(`> Error executing task '${task.task_name}':`, error);
      }
    }
    console.log("############ 🛠️ Tarefas automaticas concluidas 🛠️ ############")
  }
}
