const mongoose = require('mongoose');
const songSchema = new mongoose.Schema({
    url :{
        type : String,
        required : true
    },
    Posterurl:{
        type : String,
        required : true
    },
    title :{
        type : String,
        required : true
    },
    mood : String
})

const songModel = new mongoose.model('songs',songSchema)

module.exports = songModel