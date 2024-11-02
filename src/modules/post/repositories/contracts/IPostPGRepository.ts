import { FindOptionsWhere } from "typeorm";
import IRepository from "../../../contracts/IRepository";
import PostStatus from "../../contracts/PostStatus";
import IPostPG from "../../model/contracts/IPostPG";
import Post from "../../model/Post.pg";

export default interface IPostPGRepository extends Omit<IRepository<IPostPG>, 'findMany'>{
    findBySlug(slug: string): Promise<IPostPG | null>
    findByStatus(userId: string, status: string): Promise<IPostPG[]>
    findMany(params: FindOptionsWhere<IPostPG>): Promise<IPostPG[]>
}