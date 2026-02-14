const userModel = require('../models/user.models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerController(req,res){
    const {username , email ,password , bio,profilePicture } = req.body
    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExist){
        return res.status(409).json({message:(username===isUserAlreadyExist.username?'username already exist try another':'email alerady exist try another email')})
    }
       const hash =await bcrypt.hash(password,10)
    const user = await userModel.create({username,email,password:hash,bio,profilePicture})
    const token = jwt.sign({id:user._id},process.env.token,{expiresIn:'1d'})
    res.cookie('token',token)
    res.status(201).json({message : "user account created Successfully",user:{
        username : user.username,
        email : user.email,
            bio : user.bio, 
            profilePicture : user.profilePicture
    },token})

}
async function loginController(req,res){
     const {username,email,password} = req.body
     const user = await userModel.findOne({
        $or:[
            {email:email},
            {username:username}
        ]
     })
     if(!user){
        return res.status(404).json({
            message:"user not found"
        })
     }
     const isPassCorrect =await bcrypt.compare(password,user.password)
     if(!isPassCorrect){
         return res.status(404).json({
            message:"invalid password "
        })
     }
     const token = jwt.sign({id : user._id}, process.env.token,{expiresIn:'1d'})
     res.cookie('token',token)
     res.status(200).json({
        message : "user logged in successfully",
        user:{
            username : user.username,
            email : user.email,
            bio : user.bio, 
            profilePicture : user.profilePicture
        }
     })

}

module.exports={
    registerController,
    loginController

}