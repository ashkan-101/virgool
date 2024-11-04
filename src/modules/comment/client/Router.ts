import { Router } from "express";
import CommentController from "./Controller";
import { auth } from "../../../middlewares/Auth";

const commentRourter = Router()
const controller = new CommentController()

/**
 * @swagger
 * /api/v1/comment/create/{id}:
 *   post:
 *     tags:
 *       - comment
 *     summary: Create a new comment for a specific post
 *     description: "This endpoint allows a user to create a new comment on a specified post. All fields are required."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The unique identifier of the post to comment on."
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
 *               title:
 *                 type: string
 *                 description: "The title of the comment."
 *                 example: "Great Post!"
 *               body:
 *                 type: string
 *                 description: "The content of the comment."
 *                 example: "I really enjoyed reading this post. Thank you for sharing!"
 *     responses:
 *       201:
 *         description: "Successfully created a new comment."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             newComment:
 *               type: object
 *               description: "The newly created comment object."
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Great Post!"
 *                 body:
 *                   type: string
 *                   example: "I really enjoyed reading this post. Thank you for sharing!"
 *                 post:
 *                   type: string
 *                   example: "64fddc61d4e9a5f7d3c11aec"
 *                 user:
 *                   type: string
 *                   example: "64fddc61d4e9a5f7d3c11aee"
 *       400:
 *         description: "Bad request. All fields are required."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "All fields are required."
 *       404:
 *         description: "Post not found."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Post not found."
 *       401:
 *         description: "Unauthorized. The user must be logged in to create a comment."
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
commentRourter.post('/create/:id', auth ,controller.newComment.bind(controller))

/**
 * @swagger
 * /api/v1/comment/get-all/{id}:
 *   get:
 *     tags:
 *       - comment
 *     summary: Get all comments for a specific post
 *     description: "This endpoint retrieves all comments associated with a specified post. The response includes the current user's ID to facilitate access control for editing and deleting comments."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The unique identifier of the post for which to retrieve comments."
 *         schema:
 *           type: string
 *           example: "64fddc61d4e9a5f7d3c11aec"
 *     responses:
 *       200:
 *         description: "Successfully retrieved comments."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             comments:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "Great Post!"
 *                   body:
 *                     type: string
 *                     example: "I really enjoyed this article."
 *                   post:
 *                     type: string
 *                     example: "64fddc61d4e9a5f7d3c11aec"
 *                   user:
 *                     type: string
 *                     example: "64fddc61d4e9a5f7d3c11aee"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-04T12:34:56Z"
 *             userId:
 *               type: string
 *               example: "64fddc61d4e9a5f7d3c11aee"
 *       404:
 *         description: "Post not found."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Post not found."
 *       500:
 *         description: "Internal server error."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while processing the request."
 */
commentRourter.get('/get-all/:id', controller.getComments.bind(controller))

/**
 * @swagger
 * /api/v1/comment/edit/{id}:
 *   patch:
 *     tags:
 *       - comment
 *     summary: Edit a specific comment
 *     description: "This endpoint allows the current user to edit a comment identified by its ID. Only the user who created the comment can edit it."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The unique identifier of the comment to be edited."
 *         schema:
 *           type: string
 *           example: "64fddc61d4e9a5f7d3c11b1e"
 *       - in: body
 *         name: body
 *         required: true
 *         description: "The updated content of the comment."
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "Updated Comment Title"
 *             body:
 *               type: string
 *               example: "This is the updated content of the comment."
 *     responses:
 *       200:
 *         description: "Successfully edited the comment."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *       404:
 *         description: "Comment not found."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Comment not found."
 *       400:
 *         description: "User is not valid to edit this comment."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "The current user is not valid."
 *       500:
 *         description: "Internal server error."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while processing the request."
 */
commentRourter.patch('/edit/:id', auth ,controller.edit.bind(controller))

/**
 * @swagger
 * /api/v1/comment/delete/{id}:
 *   delete:
 *     tags:
 *       - comment
 *     summary: Delete a specific comment
 *     description: "This endpoint allows the current user to delete a comment identified by its ID. Only the user who created the comment can delete it."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The unique identifier of the comment to be deleted."
 *         schema:
 *           type: string
 *           example: "64fddc61d4e9a5f7d3c11b1e"
 *     responses:
 *       200:
 *         description: "Successfully deleted the comment."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *       404:
 *         description: "Comment not found."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Comment not found."
 *       400:
 *         description: "User is not valid to delete this comment."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "The current user is not valid."
 *       500:
 *         description: "Internal server error."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while processing the request."
 */
commentRourter.delete('/delete/:id', auth ,controller.delete.bind(controller))
export default commentRourter