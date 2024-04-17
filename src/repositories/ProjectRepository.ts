import ProjectDTO from "../models/UserProjectDTO"

export default abstract class ProjectRepository<T> {
  protected repository: T

  constructor (repository: T) {
    this.repository = repository
  }

  // AUTO-TASK
  abstract createProject(projeto: ProjectDTO): Promise<void>
}