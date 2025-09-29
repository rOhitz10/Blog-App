import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authApi } from "../../Api/authApi"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MessageCircle, Settings, Edit, FileText, Eye, Heart, MessageCircle as CommentIcon } from "lucide-react";
import "../../Styles/pages/Profile.css"

export const Profile = () => {
  const { id } = useParams(); // Destructure the id from useParams
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isOwnProfile = currentUser && currentUser._id === id;

  useEffect(() => {
    handleFetch();
  }, [id]); // Add id to dependency array

  const handleFetch = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Create user data object with the id from URL params
      const userRequestData = { userId: id };
      
      const response = isOwnProfile
        ? await authApi.myProfile(userRequestData)
        : await authApi.userProfile(userRequestData);
        
      if (response.success) {
        setUserData(response.user || response.data?.user);
        setBlogs(response.blogs || response.data?.blogs || []);
      } else {
        setError(response.message || 'Failed to fetch profile');
      }
    } catch (err) {
      setError(err.message || "Error loading profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    navigate('/settings/profile');
  };

  const handleSendMessage = () => {
    // Implement message functionality
    console.log("Send message to:", userData?.userName);
  };

  if (loading) {
    return (
      <div className="profile-container  flex flex-col items-center ">
          <div className="spinner"></div>
          <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-state">
          <h3>Error Loading Profile</h3>
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-container">
        <div className="not-found">
          <h3>Profile Not Found</h3>
          <p>The user you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Header Navigation */}
      <div className="profile-header-nav">
        <button 
          onClick={() => navigate(-1)} 
          className="back-button"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      {/* Profile Content */}
      <motion.div 
        className="profile-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img 
              src={userData.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE8ft-eMfPWjcLLRJwUbOp2EsCxKnGUK1JRw&s'} 
              alt={userData.name}
              className="avatar-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150/1a202c/667eea?text=Avatar';
              }}
            />
          </div>

          <div className="profile-info">
            {/* Username and Actions */}
            <div className="profile-actions">
              <h1 className="username">@{userData.userName}</h1>
              <div className="action-buttons">
                {isOwnProfile ? (
                  <button onClick={handleEditProfile} className="edit-button">
                    <Edit size={18} />
                    Edit Profile
                  </button>
                ) : (
                  <button onClick={handleSendMessage} className="message-button">
                    <MessageCircle size={18} />
                    Message
                  </button>
                )}
                <button className="settings-button">
                  <Settings size={18} />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{blogs.length}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userData.followersCount || 0}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userData.followingCount || 0}</span>
                <span className="stat-label">Following</span>
              </div>
            </div>

            {/* Bio and Details */}
            <div className="profile-details">
              <h2 className="full-name">{userData.name}</h2>
              {userData.bio && (
                <p className="user-bio">{userData.bio}</p>
              )}
              
              <div className="detail-item">
                <Calendar size={16} />
                <span>Joined {new Date(userData.createdAt || userData.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blogs Section */}
        <div className="profile-blogs-section">
          <h3 className="blogs-title">
            <FileText size={20} />
            Recent Blogs
          </h3>
          
          {blogs.length > 0 ? (
            <div className="blogs-grid">
              {blogs.map((blog) => (
                <motion.div 
                  key={blog._id} 
                  className="blog-card"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {blog.image && (
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="blog-image"
                    />
                  )}
                  <div className="blog-content">
                    <h4 className="blog-title">{blog.title}</h4>
                    <p className="blog-description">{blog.description}</p>
                    <div className="blog-stats">
                      <span className="stat">
                        <Eye size={14} />
                        {blog.viewsCount || 0}
                      </span>
                      <span className="stat">
                        <Heart size={14} />
                        {blog.likesCount || 0}
                      </span>
                      <span className="stat">
                        <CommentIcon size={14} />
                        {blog.commentsCount || 0}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-blogs">
              <FileText size={48} className="no-blogs-icon" />
              <p>No blogs published yet.</p>
              {isOwnProfile && (
                <button 
                  onClick={() => navigate('/create-blog')} 
                  className="create-blog-btn"
                >
                  Create Your First Blog
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};