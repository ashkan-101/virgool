import IRepository from "../../../contracts/IRepository";
import IUserMongo from "../../model/contracts/IUserMongo";

export default interface IUserMongoRepository extends IRepository<IUserMongo>{
  findByMobile(mobile: string): Promise<IUserMongo | null>
  findByUserName(userName: string): Promise<IUserMongo | null>
}