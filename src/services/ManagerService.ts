import ManagerLoginDTO from "../models/ManagerLoginDTO";
import Service from "./Service";

export default abstract class ManagerService<ManagerRepository> extends Service<ManagerRepository> {
  abstract login(manager: ManagerLoginDTO): Promise<Boolean>
}