import DatabaseName from "../../contracts/DatabaseName";
import CategoryMongoRepository from "./category/CategoryMongoRepository";
import CategoryPGRepository from "./category/CategoryPGRepository";
import ICategoryMongoRepository from "./category/contracts/ICategoryMongoRepository";
import ICategoryPGRepository from "./category/contracts/ICategoryPGRepository";

export default class CategoryRepositoryFactory {
  private repositories: Map<DatabaseName, ICategoryMongoRepository | ICategoryPGRepository> = new Map<DatabaseName, ICategoryMongoRepository | ICategoryPGRepository>()

  constructor(){
    this.repositories.set(DatabaseName.MONGODB, new CategoryMongoRepository())
    this.repositories.set(DatabaseName.POSTGRES, new CategoryPGRepository())
  }

  public getRepository(databaseName: DatabaseName){
    return this.repositories.get(databaseName)!
  }
}