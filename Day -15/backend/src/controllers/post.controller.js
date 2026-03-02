const Imagekit = require('@imagekit/nodejs');
const {toFile} = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');
const postModel = require('../models/post.model');
const likeModel = require('../models/like.model');
const imagekit = new Imagekit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostController(req,res) {

   console.log(req.body,req.file)
    
  const file = await imagekit.files.upload({
    file : await toFile(Buffer.from(req.file.buffer),"file" ),
    fileName : "test",
    folder: "Day-15"
})
    if(!file){
      return res.status(404).json({
        message : "File upload failed"
      })
    }
   const post  = await postModel.create({
    image : file.url,
    caption : req.body.caption,
    user : req.user.id
   })
  res.status(201).json({
    message : "Post created successfully",
    post,
    file
  })
}

async function getpostController(req,res) {

   const posts = await postModel.find({user : req.user.id})

   if(posts.length === 0 ){
    return res.status(404).json({
        message : "No post found"
    })
   }
   res.status(200).json({
    message : "post fetched successfully",
    posts
   })
}
async function detailspostController(req,res) {
    const postId = req.params.id;
    const userId = req.user.id

     const postExist = await postModel.findOne({_id : postId})
    if(!postExist){
      return res.status(404).json({
        message : "Post not found"
      })
    }
    const isUserValid = await postModel.findById(postId)
    if(isUserValid.user.toString() !== userId){
       return res.status(401).json({
    message : "You are not authorized for this post",
    
  })
    }
   
  const postDetail = await postModel.findOne({
    _id: postId,
    user : userId
  })
  

  res.status(201).json({
    message : "Post details fetch Successfully",
    postDetail
  })
}
async function likeController(req,res) {
    const postId = req.params.id
    const username = req.user.username
    const postExist = await postModel.findById(postId)
    if(!postExist){
        return res.status(404).json({
            message : "Post not found"
        })
    }
    const isliked = await likeModel.findOne({
        postliked : postId,
        likedBy : username
    })
    if(isliked){
        return res.status(400).json({
            message : "You have already liked this post"
        })
    }

    console.log(isliked)
    const liked = await likeModel.create({
        postliked : postId,
        likedBy : username
    })
    res.status(201).json({
        success : true,
        message : "Post liked successfully",
        data : liked
    })
   
}

async function unlikeController(req,res) {
        const postId = req.params.id
       const username = req.user.username
       const isliked = await likeModel.findOne({
          postliked: postId,
          likedBy : username
       })

       if(!isliked){
        return res.status(400).json({
          message : "post didn't liked"
        })
       }

       await likeModel.findOneAndDelete({
         postliked: postId,
          likedBy : username
       })
      
       res.status(200).json({
        message :"unliked successfully"
       })
}

async function AllpostsController(req,res) {
  const username = req.user.username
  const posts = await Promise.all((await postModel.find().populate('user').lean())
  .map(async(post)=>{
        const isLiked = await likeModel.findOne({
         postliked : post._id,
         likedBy: username
       })
       post.isLiked = !!isLiked

       return post
  }))



  res.status(200).json({
    message: "posts fetch successfully",
    posts
  })
}
module.exports = {
    createpostController,
    getpostController,
    detailspostController,
    likeController,
    AllpostsController,
    unlikeController
}