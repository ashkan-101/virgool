import { Router } from "express";
import Controller from "./Controller";
import { auth } from "../../../middlewares/Auth";

const postRouter: Router = Router()
const postController = new Controller()

postRouter.use(auth)

/**
 * @swagger
 * /api/v1/post/create:
 *   post:
 *     tags:
 *       - post
 *     summary: Create a new post draft
 *     description: "This endpoint allows an authenticated user to create a new post draft. The user can provide a title, body content, and optionally, a gallery of images. The generated post will have a unique slug based on the title and a random identifier."
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "The post data to be saved. Title, body, and gallery are all optional parameters."
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: "The title of the post."
 *               example: "My First Post"
 *             body:
 *               type: string
 *               description: "The content of the post."
 *               example: "This is the body of my first post."
 *             gallery:
 *               type: array
 *               maxItems: 5
 *               items:
 *                 type: string
 *               description: "An array of filenames for the images uploaded to the post gallery. Maximum of 5 files."
 *               example: ["image1.jpg", "image2.jpg"]
 *     responses:
 *       201:
 *         description: "Successfully created a new post draft."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             newPost:
 *               type: object
 *               description: "The details of the created post draft."
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: "The unique identifier for the created post."
 *                   example: "64fddc61d4e9a5f7d3c11aec"
 *                 author:
 *                   type: string
 *                   description: "The ID of the user who created the post."
 *                   example: "64fddc61d4e9a5f7d3c11aeb"
 *                 title:
 *                   type: string
 *                   description: "The title of the post."
 *                   example: "My First Post"
 *                 body:
 *                   type: string
 *                   description: "The content of the post."
 *                   example: "This is the body of my first post."
 *                 gallery:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: "The array of image filenames in the gallery."
 *                   example: ["image1.jpg", "image2.jpg"]
 *                 slug:
 *                   type: string
 *                   description: "The unique slug generated for the post."
 *                   example: "my-first-post-9a1b2c"
 *       400:
 *         description: "Bad request. The input provided is invalid."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Invalid input data."
 *       401:
 *         description: "Unauthorized. The user must be logged in to access this endpoint."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Unauthorized access."
 *       500:
 *         description: "Internal server error."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while processing the request."
 */
postRouter.post('/create', postController.newDraft.bind(postController))

/**
 * @swagger
 * /api/v1/post/edit-draft/{id}:
 *   patch:
 *     tags:
 *       - post
 *     summary: Edit an existing post draft
 *     description: "This endpoint allows an authenticated user to edit a post draft. The user can modify the title, body, and gallery images of the post. Deleted images can be specified in the request body, and new images can be uploaded as files."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The ID of the post to be edited."
 *         schema:
 *           type: string
 *           example: "64fddc61d4e9a5f7d3c11aec"
 *       - in: body
 *         name: body
 *         description: "The new data for the post. All parameters are optional."
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: "The new title for the post."
 *               example: "Updated Post Title"
 *             body:
 *               type: string
 *               description: "The new body content of the post."
 *               example: "This is the updated content of the post."
 *             imageNames:
 *               type: array
 *               items:
 *                 type: string
 *               description: "Array of image filenames to be removed from the post's gallery."
 *               example: ["old-image1.jpg", "old-image2.jpg"]
 *             gallery:
 *               type: array
 *               maxItems: 5
 *               items:
 *                 type: string
 *               description: "New images uploaded to the post gallery. Maximum of 5 files."
 *               example: ["new-image1.jpg", "new-image2.jpg"]
 *     responses:
 *       200:
 *         description: "Successfully updated the post draft."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *       400:
 *         description: "Bad request. The input provided is invalid."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Invalid input data."
 *       401:
 *         description: "Unauthorized. The user must be logged in to access this endpoint."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Unauthorized access."
 *       404:
 *         description: "Post not found."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Not found any post with this information."
 *       500:
 *         description: "Internal server error."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while processing the request."
 */
postRouter.patch('/edit-draft/:id', postController.editDraft.bind(postController))

/**
 * @swagger
 * /api/v1/post/delete/{id}:
 *   delete:
 *     tags:
 *       - post
 *     summary: Delete a post
 *     description: "This endpoint allows an authenticated user to delete a specific post by its ID. The user must be the owner of the post to delete it."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The ID of the post to be deleted."
 *         schema:
 *           type: string
 *           example: "64fddc61d4e9a5f7d3c11aec"
 *     responses:
 *       200:
 *         description: "Successfully deleted the post."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *       400:
 *         description: "Bad request. The input provided is invalid."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Invalid input data."
 *       401:
 *         description: "Unauthorized. The user must be logged in to access this endpoint."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Unauthorized access."
 *       404:
 *         description: "Post not found."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Not found any post with this information."
 *       500:
 *         description: "Internal server error."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while processing the request."
 */
postRouter.delete('/delete/:id', postController.deletePost.bind(postController))

/**
 * @swagger
 * /api/v1/post/get-all:
 *   get:
 *     tags:
 *       - post
 *     summary: Retrieve all posts for the authenticated user
 *     description: "This endpoint retrieves all posts created by the authenticated user. The user must provide the post status as a query parameter."
 *     parameters:
 *       - in: query
 *         name: poststatus
 *         required: true
 *         description: "Filter posts by their status. Allowed values are 'draft' and 'published'."
 *         schema:
 *           type: string
 *           enum:
 *             - draft
 *             - published
 *           example: "draft"
 *     responses:
 *       200:
 *         description: "Successfully retrieved posts."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             allPosts:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: "Unique identifier of the post."
 *                     example: "64fddc61d4e9a5f7d3c11aec"
 *                   author:
 *                     type: string
 *                     description: "The user ID of the post author."
 *                     example: "64d2f67bb4b0b1234d5e7890"
 *                   title:
 *                     type: string
 *                     description: "Title of the post."
 *                     example: "My First Post"
 *                   body:
 *                     type: string
 *                     description: "Content of the post."
 *                     example: "This is the body of my first post."
 *                   gallery:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: "Filename of an image in the post gallery."
 *                       example: "image-123456.jpg"
 *                   slug:
 *                     type: string
 *                     description: "Slug generated from the post title."
 *                     example: "my-first-post-123abc"
 *                   status:
 *                     type: string
 *                     description: "The status of the post, either 'draft' or 'published'."
 *                     example: "draft"
 *       400:
 *         description: "Bad request. The input provided is invalid."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Invalid input data."
 *       401:
 *         description: "Unauthorized. The user must be logged in to access this endpoint."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Unauthorized access."
 *       500:
 *         description: "Internal server error."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while processing the request."
 */
postRouter.get('/get-all', postController.getMyPosts.bind(postController))

/**
 * @swagger
 * /api/v1/post/get-post/{id}:
 *   get:
 *     tags:
 *       - post
 *     summary: Retrieve a specific post by ID
 *     description: "This endpoint retrieves a single post based on the provided post ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The unique identifier of the post to retrieve."
 *         schema:
 *           type: string
 *           example: "64fddc61d4e9a5f7d3c11aec"
 *     responses:
 *       200:
 *         description: "Successfully retrieved the post."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             post:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: "Unique identifier of the post."
 *                   example: "64fddc61d4e9a5f7d3c11aec"
 *                 author:
 *                   type: string
 *                   description: "The user ID of the post author."
 *                   example: "64d2f67bb4b0b1234d5e7890"
 *                 title:
 *                   type: string
 *                   description: "Title of the post."
 *                   example: "My First Post"
 *                 body:
 *                   type: string
 *                   description: "Content of the post."
 *                   example: "This is the body of my first post."
 *                 gallery:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: "Filename of an image in the post gallery."
 *                     example: "image-123456.jpg"
 *                 slug:
 *                   type: string
 *                   description: "Slug generated from the post title."
 *                   example: "my-first-post-123abc"
 *                 status:
 *                   type: string
 *                   description: "The status of the post, either 'draft' or 'published'."
 *                   example: "published"
 *       400:
 *         description: "Bad request. The input provided is invalid."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Invalid input data."
 *       404:
 *         description: "Post not found."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "post not found!"
 *       401:
 *         description: "Unauthorized. The user must be logged in to access this endpoint."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Unauthorized access."
 *       500:
 *         description: "Internal server error."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while processing the request."
 */
postRouter.get('/get-post/:id', postController.getPostWithId.bind(postController))

/**
 * @swagger
 * /api/v1/post/get/{slug}:
 *   get:
 *     tags:
 *       - post
 *     summary: Retrieve a specific post by slug
 *     description: "This endpoint retrieves a single post based on the provided slug."
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: "The unique slug identifier of the post to retrieve."
 *         schema:
 *           type: string
 *           example: "my-first-post-123abc"
 *     responses:
 *       200:
 *         description: "Successfully retrieved the post."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             post:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: "Unique identifier of the post."
 *                   example: "64fddc61d4e9a5f7d3c11aec"
 *                 author:
 *                   type: string
 *                   description: "The user ID of the post author."
 *                   example: "64d2f67bb4b0b1234d5e7890"
 *                 title:
 *                   type: string
 *                   description: "Title of the post."
 *                   example: "My First Post"
 *                 body:
 *                   type: string
 *                   description: "Content of the post."
 *                   example: "This is the body of my first post."
 *                 gallery:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: "Filename of an image in the post gallery."
 *                     example: "image-123456.jpg"
 *                 slug:
 *                   type: string
 *                   description: "Slug generated from the post title."
 *                   example: "my-first-post-123abc"
 *                 status:
 *                   type: string
 *                   description: "The status of the post, either 'draft' or 'published'."
 *                   example: "published"
 *       400:
 *         description: "Bad request. The input provided is invalid."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Invalid input data."
 *       404:
 *         description: "Post not found."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "post not found!"
 *       401:
 *         description: "Unauthorized. The user must be logged in to access this endpoint."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Unauthorized access."
 *       500:
 *         description: "Internal server error."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while processing the request."
 */
postRouter.get('/get/:slug', postController.getPostWithSlug.bind(postController))

/**
 * @swagger
 * /api/v1/post/published/{id}:
 *   patch:
 *     tags:
 *       - post
 *     summary: Publish a specific post
 *     description: "This endpoint publishes a post by updating its status to 'published' and can include tags."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The unique identifier of the post to publish."
 *         schema:
 *           type: string
 *           example: "64fddc61d4e9a5f7d3c11aec"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of tags to associate with the post."
 *                 example: ["news", "update"]
 *     responses:
 *       200:
 *         description: "Successfully published the post."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *       400:
 *         description: "Bad request. The input provided is invalid."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Invalid input data."
 *       404:
 *         description: "Post not found."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "not found any post with this information"
 *       401:
 *         description: "Unauthorized. The user must be logged in to access this endpoint."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Unauthorized access."
 *       500:
 *         description: "Internal server error."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while processing the request."
 */
postRouter.patch('/published/:id', postController.published.bind(postController))

postRouter.patch('/:id/like', postController.likePost.bind(postController))

postRouter.get('/all', postController.getSortingPosts.bind(postController))

export default postRouter