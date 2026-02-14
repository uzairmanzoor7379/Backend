const postModel = require('../models/post.models');
const Imagekit = require('@imagekit/nodejs');
const {toFile} = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const imagekit = new Imagekit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function postController(req,res){
console.log(req.body,req.file)
 const file = await imagekit.files.upload({
    file : await toFile(Buffer.from(req.file.buffer),"file" ),
    fileName : "test",
    folder : 'cohort-2/insta-clone'
})

    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message : 'unauthorized token'
        })
    }
    let decoder = null
     try {
       
     decoder =  jwt.verify(token,process.env.token)
     } catch (error) {
        return res.status(401).json({
            message : 'unexpected error | unautherized token'
        })
     }
     
    console.log(decoder)
    const post = await postModel.create({
        img_url : file.url,
        caption: req.body.caption,
        user : decoder.id
    })
    res.status(201).json({
        message : 'post created successfully',
        post,
        file
    })



}
module.exports = postController