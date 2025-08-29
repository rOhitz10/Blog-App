const mongoose = require("mongoose");

const connectDB = async()=>{
 try {
  mongoose.connection.on('connected',()=>console.log("Database Conected!"));
  await mongoose.connect(process.env.MONGO_URI);
  
 } catch (error) {
  console.error('mongoDb connecton Fail',error);
 }
}

module.exports = connectDB;

