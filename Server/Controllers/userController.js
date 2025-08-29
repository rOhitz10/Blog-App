const User = require("../models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req,res) => {
 try {
  const {user_id,password} = req.body;

  const user = await User.findOne({
    $or:[{userName:user_id},{email:user_id}]
  })
  console.log(user);
  
  if(!user){
   return res.status(404).json({ 
  success: false, 
  message: "User not found." 
})
}

const isMatch = await bcrypt.compare(password,user.password);
 if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials."
      });
    }

const token = jwt.sign({id:user.email,password:user.password},process.env.JWT_SECERT, {expiresIn:"1h"})

res.status(200).json({
 success:true,
 msg:"logged in successfully!",
 token
})
  
 } catch (error) {
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: error.message
  })
 }
}

const signUp = async (req,res) => {
 try {
  const {userName,name,email,password,date_of_birth} = req.body;

   // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ userName }, { email }]
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already taken."
      });
    }
    
    const hashPassword = await bcrypt.hash(password,10);

  const newUser = User.create({
   userName,
   name,
   email,
   password:hashPassword,
   date_of_birth})

  const token = jwt.sign({name,email,password},process.env.JWT_SECERT,{expiresIn:"1h"})

  

  return res.status(201).json({
 success:true,
 msg:"logged in successfully!",
 token
})

 } catch (error) {
    return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: error.message
  })
 }
}

module.exports = {signUp,login}