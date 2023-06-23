const mongoose = require('mongoose');
const postSchema =mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const Post = new mongoose.model("post",postSchema)
module.exports = Post