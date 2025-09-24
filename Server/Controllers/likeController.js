const Blog = require("../models/blog.js");
const Like = require("../models/Like.js");

const toggleLike = async (req, res) => {
   const { blogId } = req.params;
    const {userId} = req.body;

    console.log("blogblog",blogId,userId);
    

  const blogExist = await Blog.findById(blogId);
  if (!blogExist) {
    return res.status(404).json({
      success: false,
      message: "Blog not found 404",
    });
  }

  // Check if user already liked this blog
  const existingLike = await Like.findOne({
    blog: blogId,
    likeBy: userId,
  });

  if (existingLike) {
    const deletedLike = await Like.findOneAndDelete({
   blog: blogId,
   user: userId
  })

    // Decrement like count on the blog
    await Blog.findByIdAndUpdate(
      blogId,
      { $inc: { likesCount: -1 } },
      { new: true }
    );

    return res.status(200).json({
      success:true,
      message:"Like removed successfully!"
    })
  }

  const newLike = await Like.create({ blog:blogId, likeBy:userId });
  await newLike.populate("likeBy","userName name avatar")
      // Decrement like count on the blog
    await Blog.findByIdAndUpdate(
      blogId,
      { $inc: { likesCount: 1 } },
      { new: true }
    );

  return res.status(201).json({
      success: true,
      message: "Like added successfully",
      like: newLike
    });
};

const getAllLikes = async (req, res) => {
  const { blogId } = req.params;

  const blogExist = await Blog.findById(blogId);
  if (!blogExist) {
    return res.status(404).json({
      success: false,
      message: "Blog not found 404",
    });
  }

  const AllLikes = await Like.find({ blog: blogId })
    .populate("likeBy", "userName name") // Added more user fields
    .sort({ createdAt: -1 }); // Added sorting by newest first
    

  return res.status(200).json({
    success: true,
    message: "get all likes",
    AllLikes
  });
};

module.exports = { toggleLike, getAllLikes };
