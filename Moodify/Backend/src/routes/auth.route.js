const express = require('express');
const { RegisterController, LoginController, GetmeController, LogoutController } = require('../controller/auth.controller');
const identifyUser = require('../middleware/auth.middleware');
const AuthRouter = express.Router()


// /api/auth/register
AuthRouter.post('/register',RegisterController)

// /api/auth/login
AuthRouter.post('/login',LoginController)

// /api/auth/get-me
AuthRouter.get("/get-me",identifyUser , GetmeController)

// /api/auth/logout
AuthRouter.post('/logout',identifyUser , LogoutController)


module.exports = AuthRouter