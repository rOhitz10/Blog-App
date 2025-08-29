const Blog = require("../models/blog");
const Comment = require("../models/Comment");
const mongoose = require('mongoose')


const addComments = async(req,res)=>{
  try {
    const {blog,commentBy,content} = req.body;
    const existBlog = await Blog.findById(blog);
     if(!existBlog){
      res.status(404).json({
        success:false,
        message:"Blog not found"
      })
    }
    await Comment.create({blog,commentBy,content})
     res.status(200).json({
      success:true,
      message:"Comment added successfully",
      content
     })
    
  } catch (error) {
    res.json({msg:error.message,
      success:false
    })
  }
}

const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    // Validate blogId format
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID format"
      });
    }

    // Verify blog exists
    const blog = await Blog.findById(blogId).select('_id title');
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    // Get pagination from query params with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Get comments with pagination and population
    const comments = await Comment.find({ blog: blogId })
      .populate('commentBy', 'userName name avatar') // Added more user fields
      .sort({ createdAt: -1 }) // Added sorting by newest first
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination metadata
    const totalComments = await Comment.countDocuments({ blog: blogId });
    const totalPages = Math.ceil(totalComments / limit);

    return res.status(200).json({
      success: true,
      message: "Comments retrieved successfully",
      blog: {
        _id: blog._id,
        title: blog.title
      },
      pagination: {
        currentPage: page,
        totalPages,
        totalComments,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      count: comments.length,
      comments
    });

  } catch (error) {
    console.error("Get Blog Comments Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching comments"
    });
  }
};

module.exports = {addComments,getBlogComments}