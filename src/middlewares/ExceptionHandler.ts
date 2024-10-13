import { Application, Request, Response, NextFunction } from "express";
import Exception from "../exceptions/Exception";

export default function ExceptionHandler(app: Application){
  app.use((error: Exception, req: Request, res: Response, next: NextFunction) => {
    let status
    if(error.status === undefined){
      status = 500
    }else{
      status = error.status
    }
    
    res.status(status).send({
      status: status,
      code: error.name,
      message: error.message
    })
  })
}