import { Router } from "express";
import categoryController from './Controller'

const categoryRouter = Router()
const controller = new categoryController()

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Get all active categories
 *     description: Retrieves a list of all active categories.
 *     tags:
 *       - category
 *     responses:
 *       200:
 *         description: A list of active categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier of the category
 *                   title:
 *                     type: string
 *                     description: Title of the category
 *                   status:
 *                     type: string
 *                     example: "active"
 *       500:
 *         description: Internal server error
 */
categoryRouter.get('/', controller.categories.bind(controller))

/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Get a specific category by ID
 *     description: Retrieves a category by its unique identifier.
 *     tags:
 *       - category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the category
 *     responses:
 *       200:
 *         description: Category details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the category
 *                 title:
 *                   type: string
 *                   description: Title of the category
 *                 status:
 *                   type: string
 *                   example: "active"
 *                 subcategories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier of the subcategory
 *                       title:
 *                         type: string
 *                         description: Title of the subcategory
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.get('/:id', controller.getCategory.bind(controller))

/**
 * @swagger
 * /api/v1/category/subcategory/{id}:
 *   get:
 *     summary: Get a specific subcategory by ID
 *     description: Retrieves a subcategory by its unique identifier, including its associated posts.
 *     tags:
 *       - category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the subcategory
 *     responses:
 *       200:
 *         description: Subcategory details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the subcategory
 *                 title:
 *                   type: string
 *                   description: Title of the subcategory
 *                 categoryId:
 *                   type: string
 *                   description: Identifier of the parent category
 *                 posts:
 *                   type: array
 *                   description: List of posts in the subcategory
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier of the post
 *                       title:
 *                         type: string
 *                         description: Title of the post
 *                       body:
 *                         type: string
 *                         description: Content of the post
 *                       author:
 *                         type: string
 *                         description: Identifier of the post author
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.get('/subcategory/:id', controller.getSubcategory.bind(controller))

export default categoryRouter