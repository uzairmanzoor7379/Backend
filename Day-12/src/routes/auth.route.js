const express = require('express')
const usermodel = require('../models/user.model');
const jwt = require('jsonwebtoken')
const authroute = express.Router()


authroute.post('/register',async(req,res)=>{
    const {name, email ,password} = req.body
    const isUserAlreadyExist = await usermodel.findOne({email})
    if(isUserAlreadyExist){
        return res.status(409).json({
            message:'Email already exist try another'
        })
    }
    const user = await usermodel.create({
        name , password , email
    })
     const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
     res.cookie('Jwt_token',token)
    res.status(201).json({
        message :'register successfully',
        user,
        token
    })

})

module.exports = authroute