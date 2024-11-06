import DatabaseName from "../../contracts/DatabaseName";
import ISubcategoryMongoRepository from "./subcategory/contracts/ISubcategoryMongoRepository";
import ISubcategoryPGRepository from "./subcategory/contracts/ISubcategoryPGRepository";
import SubcategoryMongoRepository from "./subcategory/SubcategoryMongoRepository";
import SubcategoryPGRepository from "./subcategory/SubcategoryPGRepository";

export default class SubcategoryRepositoryFactory {
  private repositories: Map<DatabaseName, ISubcategoryMongoRepository | ISubcategoryPGRepository> = new Map<DatabaseName, ISubcategoryMongoRepository | ISubcategoryPGRepository>()

  constructor(){
    this.repositories.set(DatabaseName.MONGODB, new SubcategoryMongoRepository())
    this.repositories.set(DatabaseName.POSTGRES, new SubcategoryPGRepository())
  }

  public getRepository(databaseName: DatabaseName){
    return this.repositories.get(databaseName)!
  }
}