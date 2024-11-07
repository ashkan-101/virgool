import { Router } from "express";
import UserController from "./Controller";
import { auth } from "../../../middlewares/Auth";

const userRouter = Router()
const userController = new UserController()

userRouter.use(auth)
/**
 * @swagger
 * /api/v1/user/settings:
 *   get:
 *     tags:
 *       - user
 *     summary: Retrieve user settings
 *     description: "This endpoint retrieves the settings for the authenticated user. The user must be logged in to access this endpoint. The response includes the user's first name, last name, bio, avatar, gender, and birthday."
 *     responses:
 *       200:
 *         description: "Successfully retrieved user settings."
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               description: "The user's first name."
 *               example: "John"
 *             lastName:
 *               type: string
 *               description: "The user's last name."
 *               example: "Doe"
 *             bio:
 *               type: string
 *               description: "A short biography of the user."
 *               example: "Software developer with a passion for open source."
 *             avatar:
 *               type: string
 *               description: "The name of the user's avatar image file (e.g., avatar-1729344715005-908924490)."
 *               example: "avatar-1729344715005-908924490"
 *             gender:
 *               type: string
 *               enum:
 *                 - "man"
 *                 - "woman"
 *                 - "another"
 *               description: "The user's gender, which can only be one of the following values: 'man', 'woman', or 'another'."
 *               example: "man"
 *             birthday:
 *               type: string
 *               format: date
 *               description: "The user's birthday in ISO format."
 *               example: "1990-01-01"
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
userRouter.get('/settings', userController.getSetting.bind(userController))

/**
 * @swagger
 * /api/v1/user/settings:
 *   patch:
 *     tags:
 *       - user
 *     summary: Update user settings
 *     description: Allows users to update their profile settings, including first name, last name, bio, birthday, gender, and avatar. All fields are optional.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *               bio:
 *                 type: string
 *                 description: A short biography of the user.
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: The user's date of birth in YYYY-MM-DD format.
 *               gender:
 *                 type: string
 *                 enum: [man, woman, another]
 *                 description: The user's gender, can be one of 'man', 'woman', or 'another'.
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: The user's avatar image file. Only one file is allowed.
 *     responses:
 *       200:
 *         description: User settings updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the update was successful.
 *       400:
 *         description: Bad request, invalid input.
 *       500:
 *         description: Internal server error, failed to update settings.
 */
userRouter.patch('/settings', userController.newSettings.bind(userController))

/**
 * @swagger
 * /api/v1/user/settings/account:
 *   get:
 *     tags:
 *       - user
 *     summary: Retrieve user account information
 *     description: "This endpoint retrieves the account information for the authenticated user. The user must be logged in to access this endpoint. The response includes the user's username, email, and mobile number."
 *     responses:
 *       200:
 *         description: "Successfully retrieved user account information."
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *               description: "The user's username."
 *               example: "johndoe"
 *             email:
 *               type: string
 *               description: "The user's email address."
 *               example: "johndoe@example.com"
 *             mobile:
 *               type: string
 *               description: "The user's mobile phone number."
 *               example: "+1234567890"
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
userRouter.get('/settings/account', userController.getAccount.bind(userController))

/**
 * @swagger
 * /api/v1/user/settings/account:
 *   patch:
 *     tags:
 *       - user
 *     summary: Edit user account information
 *     description: "This endpoint allows the authenticated user to edit their account information. The user must be logged in to access this endpoint. The following fields can be updated: username, email, and mobile number. All fields are optional."
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "The account information to be updated. All fields are optional."
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *               description: "The new username for the user."
 *               example: "johndoe"
 *             email:
 *               type: string
 *               description: "The new email address for the user."
 *               example: "johndoe@example.com"
 *             mobile:
 *               type: string
 *               description: "The new mobile phone number for the user."
 *               example: "+1234567890"
 *     responses:
 *       200:
 *         description: "Successfully updated user account information."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *       400:
 *         description: "Bad request. The provided input is invalid."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "this userName already used!"
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
userRouter.patch('/settings/account', userController.editAccount.bind(userController))

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     tags:
 *       - user
 *     summary: Retrieve user profile
 *     description: Returns the current user's profile information including first name, last name, username, avatar, and bio.
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   description: First name of the user
 *                 lastName:
 *                   type: string
 *                   description: Last name of the user
 *                 userName:
 *                   type: string
 *                   description: Username of the user
 *                 avatar:
 *                   type: string
 *                   description: URL of the user's avatar image
 *                 bio:
 *                   type: string
 *                   description: Bio or personal description of the user
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the user
 *       401:
 *         description: Unauthorized access - user is not authenticated
 *       500:
 *         description: Internal server error
 */
userRouter.get('/', userController.getUser.bind(userController))

/**
 * @swagger
 * /api/v1/user/{username}:
 *   get:
 *     tags:
 *       - user
 *     summary: Retrieve user by username
 *     description: Returns user profile information based on the provided username.
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   description: First name of the user
 *                 lastName:
 *                   type: string
 *                   description: Last name of the user
 *                 userName:
 *                   type: string
 *                   description: Username of the user
 *                 avatar:
 *                   type: string
 *                   description: URL of the user's avatar image
 *                 bio:
 *                   type: string
 *                   description: Bio or personal description of the user
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the user
 *       404:
 *         description: User not found with the specified username
 *       500:
 *         description: Internal server error
 */
userRouter.get('/:username', userController.getUserByUserName.bind(userController))

export default userRouter