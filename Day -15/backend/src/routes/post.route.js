const express = require('express');
const { createpostController, getpostController, detailspostController, likeController, AllpostsController, unlikeController } = require('../controllers/post.controller');
const postRouter = express.Router()
const multer = require('multer');
const identifyUser = require('../middlewares/identify.middleware');


const upload = multer({storage: multer.memoryStorage()})



// /api/posts/
postRouter.post('/',upload.single("image"),identifyUser,createpostController)

// /api/posts/getpost
postRouter.get('/getpost',identifyUser,getpostController)

// /api/posts/details/:id
postRouter.get('/details/:id',identifyUser,detailspostController)

// /api/posts/like/:id
postRouter.post('/like/:id',identifyUser,likeController)

// /api/posts/unlike/:id
postRouter.post('/unlike/:id',identifyUser,unlikeController)

// /api/posts/allposts
postRouter.get('/allposts',identifyUser,AllpostsController)
module.exports = postRouter