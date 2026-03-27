import express from "express"
import { loginController, registerController, verifyEmailController, getMeController } from "../controller/auth.controller.js"
import { validateRegister, validateLogin } from "../middleware/authValidation.js"
import identifyUser from "../middleware/identifyuser.js"
const authRouter = express.Router()


// /auth/register
authRouter.post('/register', validateRegister, registerController)
authRouter.post('/login', validateLogin, loginController)
authRouter.get('/verify-email', verifyEmailController)
authRouter.get('/get-me', identifyUser, getMeController)

export default authRouter