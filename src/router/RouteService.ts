import { Application, Router } from "express";
import RouterEngine from "./Router";

import authRouter from "../modules/auth/authRouter";

import postRouter from "../modules/post/client/Router";



export default class RouterService{
  private readonly app: Application
  private readonly router: RouterEngine

  constructor(app: Application){
    this.app = app
    this.router = new RouterEngine()

    this.bindRouter()
  }

  public bindRouter(){
    this.router.addRouter('/api/v1/auth', authRouter)

    this.router.addRouter('/api/v1/post', postRouter)
  }

  public run(){
    this.router.getRouter().forEach((router, route) => {
      this.app.use(route, router)
    })
  }
}