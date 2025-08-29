const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
blog:{type:mongoose.Schema.Types.ObjectId, ref:'blog', required:true},
likeBy:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
},{timestamps:true})

const Like = mongoose.model('Like',likeSchema)

module.exports = Like;