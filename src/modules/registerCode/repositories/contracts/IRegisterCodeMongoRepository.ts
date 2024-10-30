import IRepository from "../../../contracts/IRepository";
import IRegisterCodeMongo from "../../model/contracts/IRegisterCodeMongo";

export default interface IRegisterCodeMongoRepository extends IRepository<IRegisterCodeMongo>{
  findWithParams(params: Partial<IRegisterCodeMongo>): Promise<null | IRegisterCodeMongo>
}