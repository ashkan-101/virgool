import IRepository from "../../contracts/IRepository";
import IRegisterCode from "../model/IRegisterCode";

export default interface IUserRepository extends IRepository<IRegisterCode>{}