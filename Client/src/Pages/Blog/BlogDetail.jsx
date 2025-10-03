import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion";
import '../../Styles/pages/BlogDetail.css'
import { useAuth } from "../../contexts/Auth";
import { blogApi } from "../../Api/blogApi";
import{ CommentSection} from "../../Components/comments/CommentSection";
import { ArrowLeft, Edit, Heart, MessageCircle, Share, Trash2 } from "lucide-react";

export const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false)
  // const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      const response = await blogApi.getBlog(id);
      console.log(response);
      
      if (response.success) {
        setBlog(response.blog);
      } else {
        setError(response.message || 'Blog not found');
      }

    } catch (error) {
      setError(error.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }

  const handleLike = async () => {
    try {
      const response = await blogApi.like(id,user?._id);
      if (response.success) {
        setIsLiked(!isLiked);
        setBlog(prev => ({
          ...prev,
          likesCount: isLiked ? prev.likesCount - 1 : prev.likesCount + 1
        }))
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Share error:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await blogApi.delete(id);
        if (response.success) {
          navigate('/my-blogs');
        }
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  if (loading) {
    return <div className="flex flex-col justify-center items-center">
      <div className="spinner"></div>
      <p>Loading Blog...</p>
    </div>
  }

  if (error) {
    return <div className="flex flex-col justify-center items-center">
      <h3>Error Loading Blog</h3>
      <p>{error}</p>
      <button onClick={() => navigate(-1)} className="back-btn">
        <ArrowLeft size={16} />
        Go Back
      </button>
    </div>
  }
  
  if (!blog) {
    return (
      <div className="blog-detail-container">
        <div className="not-found">
          <h3>Blog Not Found</h3>
          <p>The blog you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Go Home
          </button>
        </div>
      </div>
    );
  }
  
    const isAuthor = user && user._id === blog.author._id;

  return (
    <div className="blog-detail-container">

        {/* Header Navigation */}
      <motion.div 
        className="blog-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="blog-actions">
          {isAuthor && (
            <>
              <Link to={`/edit-blog/${id}`} className="action-button">
                <Edit size={18} />
                Edit
              </Link>
              <button onClick={handleDelete} className="action-button delete">
                <Trash2 size={18} />
                Delete
              </button>
            </>
          )}
          <button onClick={handleShare} className="action-button">
            <Share size={18} />
            Share
          </button>
          
        </div>
      </motion.div>
      <div className="blog-detail-grid">
        {/* Left Column - Blog Content */}
        <motion.div 
          className="blog-content-column"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="blog-content">
            <div className="blog-header-content">
              <h1>{blog.title}</h1>
            </div>

            <div className="author-info">
              <img
                src={blog.author.avatar || "https://avatarfiles.alphacoders.com/844/84463.jpg"}
                alt={blog.author.name}
                className="author-avatar"
              />
              <div>
                <Link to={`/profile/${blog.author._id}`} className="author-name">
                  {blog.author.name}
                </Link>
                <p className="author-username">@{blog.author.userName}</p>
              </div>
            </div>

            <div className="blog-body">
              <div className="blog-description">
                <p>{blog.description}</p>
              </div>
              
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="blog-cover-image"
                />
              )}
              
              <div className="engagement-stats">
                <button 
                  onClick={handleLike} 
                  className={`like-button ${isLiked ? 'liked' : ''}`}
                >
                  <Heart size={20} fill={isLiked ? "red" : "none"} stroke="red" />
                  <span>{blog.likesCount || 0}</span>
                </button>
                
                <div className="comment-stat">
                  <MessageCircle size={20} />
                  <span>{blog.commentsCount || 0} comments</span>
                </div>

                <button onClick={handleShare} className="comment-stat">
                  <Share size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Comment Section (Desktop/Tablet) */}
        <motion.div 
          className="comments-column"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CommentSection blogId={id} />
        </motion.div>
      </div>

      {/* Comment Section for Mobile */}
      <motion.section
        className="comments-section-mobile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <CommentSection blogId={id} />
      </motion.section>

      {/* Floating Action Buttons for Mobile */}
      <div className="floating-actions">
        <button 
          onClick={handleLike} 
          className={`floating-button ${isLiked ? 'liked' : ''}`}
        >
          <Heart size={20} fill={isLiked ? "red" : "none"} stroke="red" />
        </button>
        <button onClick={handleShare} className="floating-button">
          <Share size={20} />
        </button>
      </div>
    </div>
  )
}