import IRepository from "../../../../contracts/IRepository";
import StatusCategory from "../../../model/contracts/StatusCategory";
import ICategoryMongo from "../../../model/mongo/contracts/ICategoryMongo";


export default interface ICategoryMongoRepository extends IRepository<ICategoryMongo>{
  findByStatus(status: StatusCategory): Promise<ICategoryMongo[]>
}