/*
server create krna
server config krna
*/

const express = require("express")
const app = express()
app.use(express.json())
 const notes = []
app.post('/notes',(req,res)=>{
    notes.push(req.body)
res.send('note created')
})

app.get('/notes',(req,res)=>{
  res.send(notes)
})
app.delete('/notes/:index',(req,res)=>{
   delete notes[req.params.index]
   res.send("notes deteted")
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].user = req.body.user
    res.send(notes[req.params.index])
    res.send('notes modified')
    
})

app.get("/notes/:index",(req,res)=>{
    res.send(`this is note ${req.params.index}`)
  res.send(notes[req.params.index])  
  
})



module.exports = app