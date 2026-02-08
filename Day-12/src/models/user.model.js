const mongoose =require('mongoose');
const newSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String
})

const userModel = mongoose.model('Users',newSchema)
module.exports = userModel