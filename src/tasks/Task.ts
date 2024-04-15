export default interface Task {
  run(): Promise<void>
}