const userModel = require("../models/auth.model")
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis = require("../config/cache");
async function RegisterController(req,res) {
    const {username , email , password} = req.body

    const UserAlreadyExist = await userModel.findOne({
        $or : [
            {email},
            {username}
        ]
    })
    if(UserAlreadyExist){
        return res.status(400).json({
            message : (UserAlreadyExist.email === email ? 'Email already exist' : "Username already exist")
        })
    }
    const hash = await bcrypt.hash(password ,10)
    const user = await userModel.create({
        username , email , password : hash
    })
    const token = jwt.sign({
        id : user._id,
        username : user.username
    },process.env.JWT_SECRET,
     {expiresIn : '2d'})                
      res.cookie('token' , token)

    res.status(201).json({
        message : 'User register Successfully',
        user:{
            username : user.username,
        email : user.email
        }
    })
}
async function LoginController(req,res) {
    const {username , email , password} = req.body
    const user = await userModel.findOne({
        $or : [
            {email},
            {username}
        ]
    }).select("+password")
    if(!user){
        return res.status(400).json({
            message : "Invalid credential"
        })
    }
    const correctPassword = await bcrypt.compare(password, user.password)
    if(!correctPassword){
        return res.status(401).json({
            message : "Invalid credentials"
        })
    }
    const token = jwt.sign({
        id : user._id,
        username : user.username
    },process.env.JWT_SECRET,
     {expiresIn : '2d'})
      res.cookie('token' , token)

    res.status(201).json({
        message : 'User login Successfully',
       user:{
         username : user.username,
        email : user.email
       }
    })
}
async function GetmeController(req,res) {
    const userId = req.user.id
    const user = await userModel.findOne({_id : userId})
    res.status(200).json({
        message : "User details fetch successfully",
        user
    })
    
}
async function LogoutController(req,res) {
   const token = req.cookies.token
   res.clearCookie("token")
   await redis.set(token ,Date.now().toString())
   res.status(200).json({
    message : "User Logout Seccessfully"
   })
}
module.exports = {
    RegisterController,
    LoginController,
    GetmeController,
    LogoutController
}