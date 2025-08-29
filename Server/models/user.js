const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
 userName:{type:String,required:true},
 name:{type:String,required:true},
 email:{type:String,required:true},
 password:{type:String,required:true},
 date_of_birth:{type:Date,required:true},
 createAt:{type:Date,default:Date.now}
},{timestamps:true})

const user = mongoose.model("user",userSchema)

module.exports = user;


