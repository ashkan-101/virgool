import IRepository from "../../../contracts/IRepository";
import IPostMongo from '../../model/contracts/IPostMongo';

export default interface IPostMongoRepository extends IRepository<IPostMongo>{
  findBySlug(slug: string): Promise<IPostMongo | null>
  findByStatus(userId: string, status: string): Promise<IPostMongo[]>
}