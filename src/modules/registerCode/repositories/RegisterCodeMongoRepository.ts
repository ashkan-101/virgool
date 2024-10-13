import IRegisterCodeRepository from "./IRegisterCodeRepository";
import RegisterCodeModel from '../model/RegisterCode'
import IRegisterCode from "../model/IRegisterCode";

export default class RegisterCodeMongoRepository implements IRegisterCodeRepository{
  public async findOne(id: string, relations?: string[]): Promise<IRegisterCode | null> {
    const codeQuery = await RegisterCodeModel.findOne({_id: id})
    return codeQuery
  }

  findMany(params: any, relations?: string[]): Promise<IRegisterCode[]> {
    throw new Error("Method not implemented.");
  }


  public async create(params: Partial<IRegisterCode>): Promise<IRegisterCode> {
    return await RegisterCodeModel.create({...params})
  }


  updateOne(id: string, params: Partial<IRegisterCode>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  updateMany(where: Partial<IRegisterCode>, params: Partial<IRegisterCode>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }


  public async deleteOne(id: string): Promise<boolean> {
    await RegisterCodeModel.deleteOne({_id: id})
    return true
  }

  
  deleteMany(params: Partial<IRegisterCode>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}