const express = require("express")
const app = express()
app.use(express.json())
const data = []
app.post('/details',(req,res)=>{
    res.send("data added")
    console.log(req.body)
    data.push(req.body)

})
app.get('/details',(req,res)=>{
    res.send(data)
    
})
app.listen(3000)