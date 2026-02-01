const noteModel = require('./models/notes.model.js')
const express = require('express');
const app = express()
app.use(express.json())

app.post('/notes',async(req,res)=>{
    const {title,description}=req.body
    note = await noteModel.create({
       title, description
    })
    res.status(201).json({
     message: 'post created successfully',
     note
    })
})
app.get('/notes',async(req,res)=>{
      note =  await noteModel.find()
   res.status(200).json({
    message:"fetch successfully",
    note
   })
})
module.exports = app