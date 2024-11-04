import { Router } from "express";
import AuthController from "./authController";

const authRouter: Router = Router()
const controller: AuthController = new AuthController()

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - auth
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register using their mobile number. Upon successful registration, a new code is generated and sent back to the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: The mobile number of the user registering.
 *                 example: '09123456789'
 *     responses:
 *       201:
 *         description: User registered successfully, returns a new verification code.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newCode:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier for the new registration code.
 *                       example: '123456'
 *                     code:
 *                       type: string
 *                       description: The verification code sent to the user's mobile.
 *                       example: 'ABCDEF'
 *       400:
 *         description: Bad request, mobile number is missing or invalid.
 *       500:
 *         description: Server error, unable to register the user.
 */
authRouter.post('/register', controller.register.bind(controller))

/**
 * @swagger
 * /api/v1/auth/register-check/{id}:
 *   post:
 *     tags:
 *       - auth
 *     summary: Verify registration code and create new user
 *     description: This endpoint verifies the provided registration code and mobile number, then creates a new user if the code is valid.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the code sent to the user during registration.
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: The mobile number and the registration code provided by the user.
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *               description: The registration code sent to the user.
 *             mobile:
 *               type: string
 *               description: The mobile number of the user to be registered.
 *     responses:
 *       200:
 *         description: User registration successful. Returns the newly created user information.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             newUser:
 *               type: object
 *               description: The new user object.
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created user.
 *                 mobile:
 *                   type: string
 *                   description: The mobile number of the newly created user.
 *       400:
 *         description: Bad request. The provided code is incorrect or expired.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: The entered code is incorrect
 *       404:
 *         description: Not found. The provided code ID does not exist.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: The entered code is incorrect
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: An error occurred while processing the request.
 */
authRouter.post('/register-check/:id', controller.finalizeRegistration.bind(controller))

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Login and request verification code
 *     description: This endpoint allows a user to log in by providing their mobile number. A verification code will be sent to the user if the mobile number is registered.
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: The mobile number of the user requesting login.
 *         schema:
 *           type: object
 *           properties:
 *             mobile:
 *               type: string
 *               description: The mobile number of the user.
 *     responses:
 *       200:
 *         description: Login successful. Returns the verification code and its ID.
 *         schema:
 *           type: object
 *           properties:
 *             newCode:
 *               type: object
 *               description: The verification code and its ID.
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created verification code.
 *                 code:
 *                   type: string
 *                   description: The generated verification code sent to the user.
 *       404:
 *         description: Not found. No user exists with the provided mobile number.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: not found any user with this mobile number
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: An error occurred while processing the request.
 */
authRouter.post('/login', controller.login.bind(controller))

/**
 * @swagger
 * /api/v1/auth/login-check/{id}:
 *   post:
 *     tags:
 *       - auth
 *     summary: Validate login code and generate token
 *     description: "This endpoint validates the provided login code and mobile number, then generates a token for the user if the code is valid. The generated token should be included in the headers of subsequent requests under the Authorization key."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The ID of the login code sent to the user."
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: "The mobile number and the login code provided by the user."
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *               description: "The login code sent to the user."
 *             mobile:
 *               type: string
 *               description: "The mobile number of the user logging in."
 *     responses:
 *       200:
 *         description: "Login successful. Returns a token for the authenticated user."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             token:
 *               type: string
 *               description: "The JWT token for the authenticated user. Include this token in the headers of future requests under the Authorization key (e.g., Authorization: Bearer <token>)."
 *       400:
 *         description: "Bad request. The provided code is incorrect or expired."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "The entered code is incorrect"
 *       404:
 *         description: "Not found. No user exists with the provided mobile number or the code ID does not exist."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "not found user with this mobile number"
 *       500:
 *         description: "Internal server error."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An error occurred while processing the request."
 */
authRouter.post('/login-check/:id', controller.finalizeLogin.bind(controller))

export default authRouter