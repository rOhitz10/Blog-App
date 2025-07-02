const mongoose = require('mongoose');

const connectDB = async()=>{
 try {
  await mongoose.connect('mongodb://127.0.0.1:27017/Blog');
  console.log("DB connected!");
  
 } catch (error) {
  console.error('mongoDb connecton Fail',error);
 }
}

module.exports = connectDB;

