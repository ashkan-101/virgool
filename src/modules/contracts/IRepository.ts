import IPost from "../post/model/IPost"

export default interface IRepository<T>{
  findOne(id: string, relations?: string[]): Promise<T | null>
  findMany(params: Partial<IPost>, relations?: string[]): Promise<T[]>
  create(params: Partial<T>): Promise<T>
  updateOne(id: string, params: Partial<T>): Promise<boolean>
  updateMany(where: Partial<T>, params: Partial<T>): Promise<boolean>
  deleteOne(id: string): Promise<boolean>
  deleteMany(params: Partial<T>): Promise<boolean>
}