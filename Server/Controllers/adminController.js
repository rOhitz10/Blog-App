const jwt = require("jsonwebtoken");

const  adminLogin = async(req,res)=>{
 try {
  const {email,password} = req.body;

  if (!email && !password) {
   res.send("ALL MUST REQUIRED");
  }
  
  if (email !== process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PASSWORD) {
   res.status(400).json({
   msg:"invalid credential!",
   success:false
   })
  }
  
  const token = jwt.sign({email},process.env.JWT_SECERT)
  res.status(200).json({msg:"LOGIN SUCCESSFULLY",success:true,token})
 } catch (error) {
  res.json({msg:error.message, success:false});
  console.error("ERROR OCCUR:",error);
  
 }
}

module.exports = {adminLogin};