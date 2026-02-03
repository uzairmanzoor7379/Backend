const mongoose = require('mongoose');
const newSchema = new mongoose.Schema({
    user:String,
    email:String
})
const newModel = mongoose.model('Usersdata',newSchema)
module.exports = newModel;