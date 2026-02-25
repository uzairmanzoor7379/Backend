const express = require('express');
const { registerController, loginController, getmeController } = require('../controllers/user.controller');
const identifyUser = require('../middlewares/identify.middleware');
const authRouter = express.Router()



// /api/auth/register
authRouter.post('/register',registerController)

// api/auth/login
authRouter.post("/login",loginController)


// /api/auth/getme
authRouter.get("/getme",identifyUser,getmeController)
module.exports = authRouter