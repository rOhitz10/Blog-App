
const createBlog = (req,res)=>{
 const data = req.body;
 console.log("data:",data?.title);

}
module.exports = {createBlog}