import { Router } from "express";
import CategoryController from "./Controller";

const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.post('/create', controller.createCategory.bind(controller))

export default categoryRouter