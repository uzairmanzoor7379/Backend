const express = require('express');
const upload = require('../middleware/song.middleware');
const { PostsongController, GetsongController } = require('../controller/song.controller');

const songRouter = express.Router()


songRouter.post("/", upload.single('song'),PostsongController )
songRouter.get('/',GetsongController)

module.exports=songRouter