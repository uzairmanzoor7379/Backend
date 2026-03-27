import dotenv from 'dotenv';
dotenv.config();
import nodemailer from "nodemailer"
const transport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        type : "OAuth2",
        user :process.env.GOOGLE_USER ,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET ,
        clientId :process.env.GOOGLE_CLIENT_ID ,
        refreshToken : process.env.GOOGLE_REFRESH_TOKEN
    }
})

transport.verify().then(()=>{console.log('Email transporter is ready')})
.catch((err)=>{console.log('email verification failed',err)})

 export const sendEmail = async ({to, subject, text, html}) => {

    const info = {
      from: process.env.GOOGLE_USER,
      to, 
      subject, 
      text, 
      html, 
    }
    
    const details = await transport.sendMail(info)
    console.log("email sent",details)
}

