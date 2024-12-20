import { DataSource } from "typeorm";
import User from '../../modules/user/model/User.pg';
import Post from '../../modules/post/model/Post.pg';
import RegisterCode from '../../modules/registerCode/model/RegisterCode.pg';
import Comment from "../../modules/comment/model/Comment.pg";
import { config } from "dotenv";
import Category from "../../modules/category/model/PG/Category.PG";
import Subcategory from "../../modules/category/model/PG/Subcategory.PG";
config()

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT as unknown as number,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: process.env.PG_SYNCHRONIZE as unknown as boolean,
  entities: [RegisterCode,Comment , User, Post, Category, Subcategory]
})

const postgresConnection = async () => {
  try {
    await dataSource.initialize()
    console.log('success connect to PG ...');
  } catch (error: any) {
    console.log(`failed connect to PG!: ${error.message}`);
  }
}

export default postgresConnection