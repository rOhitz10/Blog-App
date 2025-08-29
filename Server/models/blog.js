const mongoose = require('mongoose')

const blogSchema =new mongoose.Schema({
 title:{type:String,required:true},
 author:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
 description:{type:String,required:true},
 image:{type:String,required:true},
 createdAt:{type:Date,default:Date.now},
 likesCount: {type: Number,default: 0,min: 0},
 commentsCount: {type: Number,default: 0,min: 0},
})

const Blog =  mongoose.model('blog',blogSchema);

module.exports = Blog;