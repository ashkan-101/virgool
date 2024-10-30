import IRegisterCodePG from '../model/contracts/IRegisterCodePG';
import RegisterCode from '../model/RegisterCode.pg';
import IRegisterCodePGRepository from "./contracts/IRegisterCodePGRepository";


export default class RegisterCodePGRepository implements IRegisterCodePGRepository {
  public async findWithParams(params: Partial<IRegisterCodePG>): Promise<null | IRegisterCodePG> {
    return await RegisterCode.findOneBy(params)
  }
  public async findOne(id: string, relations?: string[]): Promise<IRegisterCodePG | null> {
    return await RegisterCode.findOneBy({_id: id})
  }
  public async create(params: Partial<IRegisterCodePG>): Promise<IRegisterCodePG> {
    const result = RegisterCode.create({...params})
    await result.save()
    return result
  }
  public async deleteOne(id: string): Promise<boolean> {
    const deleteResult = await RegisterCode.delete({_id: id})
    return deleteResult && deleteResult.affected! > 0
  }


  findMany(params: Partial<IRegisterCodePG>, relations?: string[]): Promise<IRegisterCodePG[]> {
    throw new Error("Method not implemented.");
  }
  updateOne(id: string, params: Partial<IRegisterCodePG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  updateMany(where: Partial<IRegisterCodePG>, params: Partial<IRegisterCodePG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<IRegisterCodePG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}