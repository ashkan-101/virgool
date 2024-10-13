import { Router } from "express";
import AuthController from "./authController";

const authRouter: Router = Router()
const controller: AuthController = new AuthController()

authRouter.post('/register', controller.register.bind(controller))
authRouter.post('/check-register/:id', controller.finalizeRegistration.bind(controller))

authRouter.post('/login', controller.login.bind(controller))
authRouter.post('/check-login/:id', controller.finalizeLogin.bind(controller))

export default authRouter