import { Router } from "express";
import CategoryController from "./Controller";

const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.post('/new-category', controller.createCategory.bind(controller))
categoryRouter.post('/new-subcategory', controller.createSubcategory.bind(controller))
categoryRouter.get('/categories', controller.categories.bind(controller))
categoryRouter.get('/:id', controller.getCategory.bind(controller))
categoryRouter.get('/subcategory/:id', controller.getSubcategory.bind(controller))
categoryRouter.patch('/:id/edit', controller.editCategory.bind(controller))
categoryRouter.delete('/:id/delete', controller.deleteCategory.bind(controller))
categoryRouter.patch('/subcategory/:id', controller.editSubcategory.bind(controller))
categoryRouter.delete('/subcategory/:id', controller.deleteSubcategory.bind(controller))

export default categoryRouter