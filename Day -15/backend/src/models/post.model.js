const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    image : {
        type: String,
        required: true,
    },
    caption : String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true

    }
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel;