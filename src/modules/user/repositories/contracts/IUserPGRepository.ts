import { FindOptionsWhere } from "typeorm";
import IRepository from "../../../contracts/IRepository";
import IUserPG from "../../model/contracts/IUserPG";

export default interface IUserPGRepository extends Omit<IRepository<IUserPG>, 'findMany'> {
  findByMobile(mobile: string): Promise<IUserPG | null>
  findMany(params: FindOptionsWhere<IUserPG>): Promise<IUserPG[]>
}