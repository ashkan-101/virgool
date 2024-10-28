import mongoDBConnection from "./mongoDB"
import postgresConnection from "./postgresQL"

export default class Database {
  private database: Map<string,() => Promise<void>> = new Map<string,() => Promise<void>>()

  constructor(){
    this.database.set('mongodb', mongoDBConnection)
    this.database.set('postgres', postgresConnection)
  }

  private getDatabase(databaseName: string){
    return this.database.get(databaseName)
  }

  public async connectToDatabase(databaseName: string){
    const connection = this.getDatabase(databaseName)
    if(connection){
      await connection()
    }else{
      console.log(`no connection for ${databaseName}`);
    }
  }
}