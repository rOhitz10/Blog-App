const fs = require('fs')
const Blog = require('../models/blog.js');
const imagekit = require('../config/imagekit.js');
const Coment = require('../models/Comment.js');
 
const createBlog = async(req,res)=>{
 try {
  const {title,description,author} = JSON.parse(req.body.blog);
  const imageFile = req.file;

  
  if(!title || !description ||!author) res.send("Field Missing");

  const fileBuffer = fs.readFileSync(imageFile.path)
  
  //uploading image to imagekit
  const response = await imagekit.upload({
    file:fileBuffer,
    fileName:imageFile.originalname,
    folder:"/blogs"
  })

  
  //optimize through imagekit url tansformation
  const optimizedImageUrl = imagekit.url({
   path:response.filePath,
   transformation:[
    {quality:'auto'}, //auto compression
    {format:'webp'}, //convert to modren format
    {width:'1280'} //resize width
   ]
  })
  const image = optimizedImageUrl;

  await Blog.create({title,author,description,image})

  res.status(201).json({msg:"created succesfully",success:true,})
  
 } catch (error) {
   res.json({msg:error.message,success:false})
 }
}

const getAllBlogs = async(req,res)=>{
  try {
    const Blogs = await Blog.find({});
    console.log(Blogs);
     res.status(200).json({
      Blogs,
      msg : "GET ALL BLOGS ",
      success:true
     })
    
  } catch (error) {
    res.json({msg:"fail to access Blogs",
      success:false
    })
  }
} 

const getSingleBlog = async (req,res) => {
  try {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    
    if (!blog) {
      res.json({
        msg:"blog not found"
      })
    }
    
    res.status(200).json({
      blog,
      msg : "GET ALL BLOGS ",
      success:true
     })
  } catch (error) {
    res.json({msg:error.message,
      success:false
    })
  }
}

const deleteBlog = async (req,res) => {
  try {
    const {id} = req.params;
    const blog = await Blog.findByIdAndDelete(blog)
     res.status(200).json({
      blog,
      msg : "blog deleted!",
      success:true
     })
  } catch (error) {
    res.json({msg:error.message,
      success:false
    })
  }
}

module.exports = {createBlog,getAllBlogs,getSingleBlog,deleteBlog}