import { Application, Router } from "express";
//Admin
import categoryAdminRouter from "../modules/category/admin/Router";
//Client
import RouterEngine from "./Router";
import authRouter from "../modules/auth/authRouter";
import postRouter from "../modules/post/client/Router";
import userRouter from "../modules/user/client/Router";
import commentRourter from "../modules/comment/client/Router";
import categoryRouter from "../modules/category/client/Router";

export default class RouterService{
  private readonly app: Application
  private readonly router: RouterEngine

  constructor(app: Application){
    this.app = app
    this.router = new RouterEngine()

    this.bindRouter()
  }

  public bindRouter(){
    //Admin
    this.router.addRouter('/api/admin/category', categoryAdminRouter)
    //Client
    this.router.addRouter('/api/v1/auth', authRouter)
    this.router.addRouter('/api/v1/post', postRouter)
    this.router.addRouter('/api/v1/user', userRouter)
    this.router.addRouter('/api/v1/comment', commentRourter)
    this.router.addRouter('/api/v1/category', categoryRouter)
  }

  public run(){
    this.router.getRouter().forEach((router, route) => {
      this.app.use(route, router)
    })
  }
}