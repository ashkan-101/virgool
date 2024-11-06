import IRepository from "../../../../contracts/IRepository";
import StatusCategory from "../../../model/contracts/StatusCategory";
import ICategoryPG from "../../../model/PG/contracts/ICategoryPG";

export default interface ICategoryPGRepository extends IRepository<ICategoryPG>{
  findByStatus(status: StatusCategory): Promise<ICategoryPG[]>
}