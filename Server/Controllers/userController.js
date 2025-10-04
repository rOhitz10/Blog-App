const User = require("../models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Blog = require("../models/blog");

const login = async (req,res) => {
 try {
  const {userId,password} = req.body;
  console.log(req.body);
  
  
  const user = await User.findOne({
    $or:[{userName:userId},{email:userId}]
  })
  
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
      message: "Wrong Password"
    });
  }
  
  const token = jwt.sign({id:user.email,password:user.password},process.env.JWT_SECERT, {expiresIn:"1h"})
  

res.status(200).json({
 success:true,
 msg:"logged in successfully!",
 token,
 user
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



//  GET user data 
const getUserProfile = async (req,res) => {
  try {
    const {userId} = req.params;
    console.log("user id",userId);
    

    const user = await User.findOne({userName:userId}).select('-password')

    if(!user){
      return res.status(404).json({success:false, message:"User not found"})
    }

    const blogs = await Blog.find({author:user._id})
    .sort({createAt: -1})

    res.status(200).json({
      success:true,
      user,
      blogs,
      message: "Profile retrieved successfully"

    })
  } catch (error) {
      console.error('Error fetching current user profile:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}


 const getUserByUsername = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ userName: userId })
      .select('-password')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }    const blogs = await Blog.find({author:user?._id})
    .sort({createAt: -1})

    res.status(200).json({
      success:true,
      user,
      blogs,
      message: "Another user Profile  retrieved successfully"

    })
  }catch(error){
     console.error('Error fetching current user profile:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

module.exports = {signUp,login,getUserProfile,getUserByUsername}