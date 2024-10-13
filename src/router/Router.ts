import { Router } from "express";

export default class RouterEngine {
  private routers: Map<string, Router> = new Map<string, Router>()

  public addRouter(route: string, router: Router){
    this.routers.set(route, router)
  }

  public getRouter(){
    return this.routers
  }
}

