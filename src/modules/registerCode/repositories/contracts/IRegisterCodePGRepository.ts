import IRepository from "../../../contracts/IRepository";
import IRegisterCodePG from "../../model/contracts/IRegisterCodePG";


export default interface IRegisterCodePGRepository extends IRepository<IRegisterCodePG>{
  findWithParams(params: Partial<IRegisterCodePG>): Promise<null | IRegisterCodePG>
}