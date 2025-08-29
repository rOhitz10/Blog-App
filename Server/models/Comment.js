const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'blog', required: true },
  commentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  content: { type: String, required: true },
  isApproved: { type: Boolean, default: true }
}, { timestamps: true });


const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment;