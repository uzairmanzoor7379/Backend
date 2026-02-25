const express = require('express');
const { createpostController, getpostController, detailspostController, likeController } = require('../controllers/post.controller');
const postRouter = express.Router()
const multer = require('multer');
const identifyUser = require('../middlewares/identify.middleware');
const { post } = require('./follow.route');

const upload = multer({storage: multer.memoryStorage()})



// /api/posts/
postRouter.post('/',upload.single("image"),identifyUser,createpostController)

// /api/posts/getpost
postRouter.get('/getpost',identifyUser,getpostController)

// /api/posts/details/:id
postRouter.get('/details/:id',identifyUser,detailspostController)

// /api/posts/like/:id

postRouter.post('/like/:id',identifyUser,likeController)
module.exports = postRouter