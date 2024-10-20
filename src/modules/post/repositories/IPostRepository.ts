import IRepository from "../../contracts/IRepository";
import IPost from "../model/IPost";

export default interface IPostRepository extends IRepository<IPost>{
  findBySlug(slug: string): Promise<IPost | null>
}