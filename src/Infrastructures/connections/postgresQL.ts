import { DataSource } from "typeorm";
import { config } from "dotenv";
config()

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT as unknown as number,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: process.env.PG_SYNCHRONIZE as unknown as boolean,
  entities: []
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