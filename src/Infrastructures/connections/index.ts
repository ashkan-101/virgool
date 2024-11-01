import DatabaseName from "../../modules/contracts/DatabaseName"
import mongoDBConnection from "./mongoDB"
import postgresConnection from "./postgresQL"

export default class Database {
  private database: Map<DatabaseName,() => Promise<void>> = new Map<DatabaseName,() => Promise<void>>()

  constructor(){
    this.database.set(DatabaseName.MONGODB, mongoDBConnection)
    this.database.set(DatabaseName.POSTGRES, postgresConnection)
  }

  private getDatabase(databaseName: DatabaseName){
    return this.database.get(databaseName)
  }

  public async connectToDatabase(databaseName: DatabaseName){
    const connection = this.getDatabase(databaseName)
    if(connection){
      await connection()
    }else{
      console.log(`no connection for ${databaseName}`);
    }
  }
}