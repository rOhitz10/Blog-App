const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
const token = req.headers.authorization;

try {
 jwt.verify(token,process.env.JWT_SECERT)
 next()
} catch (error) {
return res.status(401).json({success:false, msg:"unauthorized!"})
}
}

module.exports = auth