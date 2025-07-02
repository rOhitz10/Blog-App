const mongoose = require('mongoose')

const Schema = mongoose.Schema({
title:String,
author:String,
discription:String,
hashtag:String,
Comment:[{data:String,date:Date}],
date:{type:Date, default:Date.now},
like:Number
})

mongoose.model(blogSchema,Schema);

module.exports = blogSchema;