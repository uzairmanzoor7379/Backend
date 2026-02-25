const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    postliked : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "posts",
        required : true
    },
    likedBy : {
        type : String,
        required : true
    }
},{timestamps : true})
likeSchema.index({postliked : 1, likedBy : 1}, {unique : true})
const likeModel = mongoose.model('like',likeSchema)

module.exports = likeModel;
