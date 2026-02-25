const userModel  = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
async function registerController(req,res) {
    const {username , email , password , img ,isPrivate, bio} = req.body
     const isUserexist = await userModel.findOne({
        $or :[
            {username},
            {email}
        ]
     })
     if(isUserexist){
        return res.status(409).json({
            message : (isUserexist.username === username) ? "Username already exist" : "Email already exist"
        })
     }
     const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username , email , password : hash, img ,isPrivate, bio
    })
    const token = jwt.sign({id : user._id,username : username},process.env.JWT_SECRET,{expiresIn : "2d"})
    res.cookie("token",token)
    res.status(201).json({
        message : "User register successfully",
        user :{
            username : user.username,
            email : user.email,
            bio : user.bio, 
            profilePicture : user.profilePicture,
            isPrivate : user.isPrivate
        },
        token
    })
}
async function loginController(req,res) {
    const {username , email ,password} = req.body
    const user = await userModel.findOne({
        $or :[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(404).json({
        message : "user not found"
        })
    }
    const ispasswordcorrect = await bcrypt.compare(password,user.password)
    if(!ispasswordcorrect){
        return res.status(401).json({
            message : "Invalid password"
        })
    }
    const token = jwt.sign({id : user._id,username : user.username},process.env.JWT_SECRET,{expiresIn : "2d"})
    res.cookie("token",token)
    res.status(200).json({
        message : "User login successfully",
        user:{
            username : user.username,
            email : user.email,
            bio : user.bio, 
            profilePicture : user.profilePicture,
            isPrivate : user.isPrivate
        },
        token
    })
}
async function getmeController(req,res) {
       const userId = req.user.id
       const user = await userModel.findById(userId)
       res.status(200).json({
          user:{
            username : user.username,
            email : user.email,
            bio : user.bio, 
            profilePicture : user.profilePicture,
            isPrivate : user.isPrivate
        }
       })
}
module.exports = {
    registerController,
    loginController,
    getmeController
}