import { Router } from "express";
import CategoryController from "./Controller";

const categoryRouter = Router()
const controller = new CategoryController()

/**
 * @swagger
 * /api/admin/category/new-category:
 *   post:
 *     summary: Create a new category
 *     description: Adds a new category to the system with the provided title.
 *     tags:
 *       - admin-category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the category
 *                 example: "Technology"
 *     responses:
 *       201:
 *         description: Successfully created a new category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier of the category
 *                 title:
 *                   type: string
 *                   description: Title of the category
 *       400:
 *         description: Bad request, invalid input data
 *       500:
 *         description: Internal server error
 */
categoryRouter.post('/new-category', controller.createCategory.bind(controller))

/**
 * @swagger
 * /api/admin/category/new-subcategory:
 *   post:
 *     summary: Create a new subcategory
 *     description: Adds a new subcategory to a specified category.
 *     tags:
 *       - admin-category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 description: ID of the category to which the subcategory will be added
 *                 example: "64f7c1b5b0d6b8c33e8f2d2a"
 *               title:
 *                 type: string
 *                 description: Title of the subcategory
 *                 example: "Artificial Intelligence"
 *     responses:
 *       201:
 *         description: Successfully created a new subcategory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier of the subcategory
 *                 title:
 *                   type: string
 *                   description: Title of the subcategory
 *                 categoryId:
 *                   type: string
 *                   description: ID of the category this subcategory belongs to
 *       400:
 *         description: Bad request, invalid input data
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.post('/new-subcategory', controller.createSubcategory.bind(controller))

/**
 * @swagger
 * /api/admin/category/categories:
 *   get:
 *     summary: Retrieve categories
 *     description: Returns a list of categories, required send status by query.
 *     tags:
 *       - admin-category
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         required: true
 *         description: Filter categories by status. Can be 'active' or 'inactive'.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier of the category
 *                   title:
 *                     type: string
 *                     description: Title of the category
 *                   status:
 *                     type: string
 *                     description: Status of the category (e.g., active or inactive)
 *       400:
 *         description: Bad request, invalid status query parameter
 *       500:
 *         description: Internal server error
 */
categoryRouter.get('/categories', controller.categories.bind(controller))

/**
 * @swagger
 * /api/admin/category/{id}:
 *   get:
 *     summary: Retrieve a specific category
 *     description: Returns details of a category by its unique ID.
 *     tags:
 *       - admin-category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the category
 *     responses:
 *       200:
 *         description: Successfully retrieved category details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier of the category
 *                 title:
 *                   type: string
 *                   description: Title of the category
 *                 status:
 *                   type: string
 *                   description: Status of the category (e.g., active or inactive)
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.get('/:id', controller.getCategory.bind(controller))

/**
 * @swagger
 * /api/admin/category/subcategory/{id}:
 *   get:
 *     summary: Retrieve a specific subcategory
 *     description: Returns details of a subcategory by its unique ID.
 *     tags:
 *       - admin-category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the subcategory
 *     responses:
 *       200:
 *         description: Successfully retrieved subcategory details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier of the subcategory
 *                 title:
 *                   type: string
 *                   description: Title of the subcategory
 *                 categoryId:
 *                   type: string
 *                   description: ID of the category this subcategory belongs to
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.get('/subcategory/:id', controller.getSubcategory.bind(controller))

/**
 * @swagger
 * /api/admin/category/{id}/edit:
 *   patch:
 *     summary: Edit a category
 *     description: Updates the title and status of a specific category by its unique ID.
 *     tags:
 *       - admin-category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the category to be edited
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title for the category
 *               statusCategory:
 *                 type: string
 *                 enum: [active, inactive]
 *                 description: New status of the category (e.g., active or inactive)
 *     responses:
 *       200:
 *         description: Successfully updated category details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request, invalid input data
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.patch('/:id/edit', controller.editCategory.bind(controller))

/**
 * @swagger
 * /api/admin/category/{id}/delete:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a specific category by its unique ID.
 *     tags:
 *       - admin-category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the category to be deleted
 *     responses:
 *       200:
 *         description: Successfully deleted the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.delete('/:id/delete', controller.deleteCategory.bind(controller))

/**
 * @swagger
 * /api/admin/category/subcategory/{id}/edit:
 *   patch:
 *     summary: Edit a subcategory
 *     description: Updates the title of a specific subcategory by its unique ID.
 *     tags:
 *       - admin-category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the subcategory to be edited
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title for the subcategory
 *     responses:
 *       200:
 *         description: Successfully updated subcategory details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request, invalid input data
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.patch('/subcategory/:id/edit', controller.editSubcategory.bind(controller))

/**
 * @swagger
 * /api/admin/category/subcategory/{id}:
 *   delete:
 *     summary: Delete a subcategory
 *     description: Deletes a specific subcategory by its unique ID.
 *     tags:
 *       - admin-category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the subcategory to be deleted
 *     responses:
 *       200:
 *         description: Successfully deleted the subcategory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.delete('/subcategory/:id', controller.deleteSubcategory.bind(controller))

export default categoryRouter