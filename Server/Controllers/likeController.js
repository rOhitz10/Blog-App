const Blog = require("../models/blog.js");
const Like = require("../models/Like.js");

const likeKaro = async (req, res) => {
   const { blogId } = req.params;
    const userId = req.user._id;

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
    return res.status(409).json({
      // 409 Conflict
      success: false,
      message: "You have already liked this blog",
    });
  }

  const newLike = await Like.create({ blogId, userId });
  await newLike.populate("user","userName name avatar")
      // Decrement like count on the blog
    await Blog.findByIdAndUpdate(
      blogId,
      { $inc: { likesCount: 1 } },
      { new: true }
    );

  return res.status(201).json({
      success: true,
      message: "Blog liked successfully",
      like: newLike
    });
};

const removeLike = async (req,res) => {
  const {blogId} = req.params;
  const userId = req.user._id;
  const blogExist = await Blog.findById(id);
  if (!blogExist) {
    return res.status(404).json({
      success: false,
      message: "Blog not found 404",
    });
  }

  const deletedLike = await Like.findOneAndDelete({
   blog: blogId,
   user: userId
  })
      if (!deletedLike) {
      return res.status(404).json({
        success: false,
        message: "Like not found"
      });
    }
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

module.exports = { likeKaro, getAllLikes ,removeLike};
