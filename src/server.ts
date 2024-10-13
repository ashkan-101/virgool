import App from "./App";
import { config } from "dotenv";
import mongodb from './Infrastructures/connections/mongoDB'
config()

mongodb()
const port: number = process.env.APP_PORT as unknown as number
const application = new App(port)

application.start()
