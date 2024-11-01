import Boot from "./boot";
import express from 'express'
import { Application } from "express";
import RouterService from "./router/RouteService";
import startMiddlewares from './middlewares/index';
import Database from "./Infrastructures/connections";
import DatabaseName from "./modules/contracts/DatabaseName";
import { config } from "dotenv";
config()

export default class App{
  private readonly boot: Boot
  private readonly port: number
  private router: RouterService
  private readonly app: Application
  private readonly database: Database
  
  constructor(port: number){
    this.port = port
    this.app = express()
    this.boot = new Boot(this.app)
    this.database = new Database()
    this.router = new RouterService(this.app)
  }

  public start(){
    this.boot.init()
    this.router.run()
    startMiddlewares(this.app)
    this.app.listen(this.port, () => {
      console.log('application is running ...');
      this.database.connectToDatabase(process.env.APP_DATABASE as DatabaseName)
    })
  }
}