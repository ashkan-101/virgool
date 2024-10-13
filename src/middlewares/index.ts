import { Application } from "express";
import NotFoundHandler from "./NotFoundHandler";
import ExceptionHandler from "./ExceptionHandler";

export default function (app: Application){
  ExceptionHandler(app)
  NotFoundHandler(app)
}