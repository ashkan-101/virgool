import Boot from "./boot";
import express from 'express'
import { Application } from "express";
import RouterService from "./router/RouteService";
import startMiddlewares from './middlewares/index'

export default class App{
  private readonly app: Application
  private readonly port: number
  private router: RouterService
  private readonly boot: Boot
  
  constructor(port: number){
    this.port = port
    this.app = express()
    this.router = new RouterService(this.app)
    this.boot = new Boot(this.app)
  }

  public start(){
    this.boot.init()
    this.router.run()
    startMiddlewares(this.app)
    this.app.listen(this.port, () => {
      console.log('application is running ...');
    })
  }
}