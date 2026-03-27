import userModel from "../models/user.model.js"
import { sendEmail } from "../services/mail.services.js"

import jwt, { decode } from 'jsonwebtoken'

export async function registerController(req,res) {
        const {username , email , password} = req.body

        const isuserAlreadyExist = await userModel.findOne({
            $or : [
                {email},{username}
            ]
        })

        if(isuserAlreadyExist){
            return res.status(400).json({
                message : (isuserAlreadyExist.email === email?"email already exist" : "username already exist"),
                success: "fail",
                err : "User already exist"
            })
        }

        

        const user = await userModel.create({
            username , email , password
        })
        const verificationToken = jwt.sign({id : user._id,username : user.username},process.env.JWT_SECRET)

        const verificationUrl = `http://localhost:3000/auth/verify-email?token=${verificationToken}`

        await sendEmail({
            to :email,
            subject : "Verify your email for Perplexity",
            html : `<p>Hi ${username},</p>
            <p> Thank you for registering at <strong> Perplexity </strong>. Please verify your email to complete registration.</p>
            <p><a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
            <p> Best regards,<br>The Perplexity Team </P>`
        })

        res.status(201).json({
            message : "user register seccessfully, please check your email to verify",
            success : true,
            user :{
                id : user._id,
                username : user.username,
                email : user.email
            }
        })
}
export async function verifyEmailController(req, res) {
    const { token } = req.query

    if (!token) {
        return res.status(400).json({
            message: "Verification token is required",
            success: false,
            err: 'token is required'
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(400).json({
            message: "Invalid or expired verification token",
            success: false,
            err: err.message
        });
    }

    const user = await userModel.findOne({ username: decoded.username });

    if (!user) {
        return res.status(400).json({
            message: "Invalid or expired verification token",
            success: false,
            err : 'No user found for this token'
        })
    }

    user.verified = true
    await user.save()
     
    const html = `
     <h1>Email Verified Successfully </h1>
     <p>Your email is verified. Now you can login to your account</p>
    <a href= ${'http://localhost:3000/auth/login'}>Login</a>
    `
    res.send(html)
}
export async function loginController(req,res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
            err : "User not found"

        })
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
            err : "Incorrect Password"
        })
    }


    if (!user.verified) {
        return res.status(400).json({
            message: "Please verify your email before logging in",
            success: false,
            err: 'Email not verified'
        })
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
      res.cookie('token',token)

    res.status(200).json({
        message: "Login successful",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

export async function getMeController(req, res) {
    if (!req.user) {
        return res.status(401).json({
            message: 'User not authenticated',
            success: false,
        });
    }


    const userId = req.user.id
    
    const user = await userModel.findById(userId)
   

    res.status(200).json({
        message: 'User details fetch successfully',
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            verified: user.verified,
        },
    });
}

