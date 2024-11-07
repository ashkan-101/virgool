import { Router } from "express";
import categoryController from './Controller'

const categoryRouter = Router()
const controller = new categoryController()

categoryRouter.get('/', controller.categories.bind(controller))
categoryRouter.get('/:id', controller.getCategory.bind(controller))
categoryRouter.get('/subcategory/:id', controller.getSubcategory.bind(controller))

export default categoryRouter