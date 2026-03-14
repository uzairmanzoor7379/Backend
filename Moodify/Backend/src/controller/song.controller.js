const id3 = require('node-id3');
const storage = require('../services/storage.song');
const songModel = require('../models/song.model');
async function  PostsongController(req,res) {
    const {mood} = req.body
    console.log(mood)
  const tags =   id3.read(req.file.buffer)

  const [songfile, posterfile] = await Promise.all([
    storage({
      buffer: req.file.buffer,
      filename: tags.title + ".mp3",
      folder: "/cohort-2/moodify/songs"
    }),
    storage({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "/cohort-2/moodify/posters"
    })
  ])

   const song = await songModel.create({
    url : songfile.url,
    Posterurl : posterfile.url,
    title :tags.title ,
    mood 
   })
   res.status(201).json({
    message : "song created successfully",
    song
   })

    
}
async function GetsongController(req,res) {
    const { mood } = req.query

   const song =  await songModel.findOne({
      mood : mood
    })
    res.status(200).json({
      message : "song fetch successfully",
      song
    })
}

module.exports = {PostsongController,GetsongController}