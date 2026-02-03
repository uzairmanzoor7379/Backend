const express = require('express')
const cors = require('cors')
const app = express()
const newModel = require('./model/usersdata.models');
app.use(express.json())
app.use(cors())
app.use(express.static('./public'))
app.post('/api/userdata',async (req,res)=>{
 const {user , email} = req.body
 
  const userdata =   await newModel.create({
        user , email 
    })
    res.status(201).json({
        message : 'data created successfully',
        userdata

    })
})
app.get('/api/userdata',async(req,res)=>{
const alldata = await newModel.find()
 res.status(200).json({
    message : 'data fetched successfully',
    alldata
 })
})
app.delete('/api/userdata/:id',async(req,res)=>{
   const {id}= req.params
   const deleteddata = await newModel.findByIdAndDelete(id)
   res.status(200).json({
    messgae:'deleted successfully',
    deleteddata
   })
})
app.patch('/api/userdata/:id',async(req,res)=>{
    const{id}=req.params
    const {email}=req.body
 const updatedata = await newModel.findByIdAndUpdate(id,{
    email
 })
 res.status(200).json({
    message:'Updates successfully',
    updatedata
 })
})

module.exports = app