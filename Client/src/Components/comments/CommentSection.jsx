import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Heart, 
  Reply, 
  MoreHorizontal,
  Send,
  Edit,
  Trash2,
  X
} from 'lucide-react';
import { commentApi } from '../../Api/commentApi';
import { useAuth } from '../../contexts/Auth';
import '../../Styles/components/CommentSection.css';

export const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  },[]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentApi.getBlogComments(blogId);
      
      if (response.success) {
        setComments(response.comments || []);
      }
    } catch (err) {
      setError('Failed to load comments',err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      let response;
      
      if (editingComment) {
        response = await commentApi.update(editingComment._id, {
          content: newComment
        });
      // } else if (replyingTo) {
      //   response = await commentApi.create({
      //     content: newComment,
      //     blog: blogId,
      //     parentComment: replyingTo._id
      //   });
      } else {
        response = await commentApi.addComment({
          content: newComment,
          blog: blogId,
          commentBy: user?._id
        });
      }

      if (response.success) {
        setNewComment('');
        setReplyingTo(null);
        setEditingComment(null);
        fetchComments(); // Refresh comments
      }
    } catch (err) {
      setError('Failed to post comment');
    }
  };

  // const handleLike = async (commentId) => {
  //   try {
  //     const response = await commentApi.like(commentId);
  //     if (response.success) {
  //       setComments(prev => prev.map(comment => 
  //         comment._id === commentId 
  //           ? { 
  //               ...comment, 
  //               isLiked: !comment.isLiked,
  //               likesCount: comment.isLiked ? comment.likesCount - 1 : comment.likesCount + 1
  //             }
  //           : comment
  //       ));
  //     }
  //   } catch (error) {
  //     console.error('Like error:', error);
  //   }
  // };

  const handleDelete = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const response = await commentApi.deleteComment(commentId);
        if (response.success) {
          setComments(prev => prev.filter(comment => comment._id !== commentId));
        }
      } catch (error) {
        setError('Failed to delete comment');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const Comment = ({ comment, depth = 0 }) => {
    const [showReplies, setShowReplies] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const isAuthor = user && user._id === comment.commentBy._id;

    const nestedComments = comments.filter(c => c.parentComment === comment._id);

    return (
      <motion.div
        className={`comment ${depth > 0 ? 'nested' : ''}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="comment-header">
          <div className="comment-author">
            <img
              src={"https://cdn11.bigcommerce.com/s-89ffd/images/stencil/1280x1280/products/65170/215863/4970381503192_d7300e72db31c967c9f22a6b41ee7699__99434.1570861316.jpg?c=2?imbypass=on"}
              alt={comment.commentBy.name}
              className="comment-avatar"
            />
            <div className="author-info">
              <span className="author-name">{comment.commentBy.name}</span>
              <span className="comment-date">{formatDate(comment.createdAt)}</span>
            </div>
          </div>

          <div className="comment-actions">
            {(isAuthor || user?.role === 'admin') && (
              <div className="comment-menu">
                <button 
                  className="menu-button"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <MoreHorizontal size={16} />
                </button>
                
                {showMenu && (
                  <div className="menu-dropdown">
                    <button 
                      onClick={() => {
                        setEditingComment(comment);
                        setNewComment(comment.content);
                        setShowMenu(false);
                      }}
                      className="menu-item"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(comment._id)}
                      className="menu-item delete"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="comment-content">
          <p>{comment.content}</p>
        </div>

        <div className="comment-footer">
          <button
            // onClick={() => handleLike(comment._id)}
            className={`like-button ${comment.isLiked ? 'liked' : ''}`}
          >
            <Heart size={16} />
            <span>{comment.likesCount}</span>
          </button>

          <button
            onClick={() => {
              setReplyingTo(comment);
              setEditingComment(null);
            }}
            className="reply-button"
          >
            <Reply size={16} />
            Reply
          </button>

          {nestedComments.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="toggle-replies"
            >
              {showReplies ? 'Hide replies' : `Show replies (${nestedComments.length})`}
            </button>
          )}
        </div>

        {/* Reply Form */}
        {replyingTo?._id === comment._id && (
          <div className="reply-form">
            <form onSubmit={handleSubmitComment} className="comment-form">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={`Replying to ${comment.author.name}...`}
                className="comment-input"
              />
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="cancel-button"
                >
                  <X size={16} />
                </button>
                <button 
                  type="submit" 
                  disabled={!newComment.trim()}
                  className="submit-button"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Nested Comments */}
        {showReplies && nestedComments.length > 0 && (
          <div className="nested-comments">
            {nestedComments.map(reply => (
              <Comment 
                key={reply._id} 
                comment={reply} 
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="comment-section">
        <div className="loading-comments">
          <div className="spinner"></div>
          <p>Loading comments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="comment-section">
      <div className="comment-section-header">
        <h3>
          <MessageCircle size={20} />
          Comments ({comments.length})
        </h3>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Main Comment Form */}
      {user ? (
        <form onSubmit={handleSubmitComment} className="main-comment-form">
          <div className="form-header">
            <img
              src={user.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5-a-v0lvgKbW9x5hYvQP7CJZ_dm2jc_sRg&s'}
              alt={user.name}
              className="user-avatar"
            />
            <div className="input-container">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={
                  editingComment 
                    ? "Edit your comment..." 
                    : replyingTo 
                    ? `Replying to ${replyingTo.author.name}...`
                    : "Add a comment..."
                }
                className="comment-input"
              />
              {(editingComment || replyingTo) && (
                <div className="form-context">
                  <span>
                    {editingComment ? 'Editing' : 'Replying to'} 
                    {replyingTo && ` @${replyingTo.author.name}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingComment(null);
                      setReplyingTo(null);
                      setNewComment('');
                    }}
                    className="cancel-context"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="form-footer">
            <button 
              type="submit" 
              disabled={!newComment.trim()}
              className="submit-comment-button"
            >
              {editingComment ? 'Update' : 'Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="login-prompt">
          <p>Please log in to leave a comment.</p>
        </div>
      )}

      {/* Comments List */}
      <div className="comments-list">
        <AnimatePresence>
          {comments.filter(comment => !comment.parentComment).map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <div className="no-comments">
            <MessageCircle size={48} />
            <h4>No comments yet</h4>
            <p>Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};