const mongoose = require('mongoose');
const postSchema =new mongoose.Schema({
    img_url :{
        type:String,
        required:true
    },
    caption : {
        type: String,
        default : ""
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    }
})
const postModel = mongoose.model('posts',postSchema)
module.exports = postModel