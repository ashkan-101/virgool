import IRepository from "../../contracts/IRepository";
import IUser from "../model/contracts/IBaseUser";

export default interface IUserRepository extends IRepository<IUser>{
  findByMobile(mobile: string): Promise<null | IUser>
}