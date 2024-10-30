import IRegisterCodeMongoRepository from "./contracts/IRegisterCodeMongoRepository";
import RegisterCodeModel from '../model/RegisterCode.mongo'
import IRegisterCodeMongo from "../model/contracts/IRegisterCodeMongo";
import { FilterQuery } from "mongoose";

export default class RegisterCodeMongoRepository implements IRegisterCodeMongoRepository{
  public async findOne(id: string, relations?: string[]): Promise<IRegisterCodeMongo | null> {
    const codeQuery = await RegisterCodeModel.findOne({_id: id})
    return codeQuery
  }
  public async findWithParams(params: FilterQuery<IRegisterCodeMongo>): Promise<null | IRegisterCodeMongo> {
    const resultQuery = await RegisterCodeModel.findOne(params)
    return resultQuery
  }
  public async create(params: Partial<IRegisterCodeMongo>): Promise<IRegisterCodeMongo> {
    return await RegisterCodeModel.create({...params})
  }
  public async deleteOne(id: string){
    const deleteResult = await RegisterCodeModel.deleteOne({_id: id})
    return deleteResult.deletedCount > 0
  }


  findMany(params: any, relations?: string[]): Promise<IRegisterCodeMongo[]> {
    throw new Error("Method not implemented.");
  }
  updateOne(id: string, params: Partial<IRegisterCodeMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  updateMany(where: Partial<IRegisterCodeMongo>, params: Partial<IRegisterCodeMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<IRegisterCodeMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}