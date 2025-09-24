import React, { useEffect, useState } from 'react'
import { authApi } from '../../Api/authApi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Eye, Heart, MessageCircle, Plus, User, Search, Filter, Grid, List, BookOpen } from 'lucide-react';
import { ROUTES } from '../../Config/routesConfig';
import "../../Styles/components/BlogList.css"
import { BlogCard } from './blogCard';

export const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Filter blogs based on search term
    const filtered = blogs.filter(blog =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await authApi.allBlogs();
      console.log(response);
      
      if (response.success) {
        setBlogs(response.Blogs || []);
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const readingTime = (content) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="blog-list-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-list-container">
      {/* Header */}
      <motion.div 
        className="blog-list-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <h1>Explore Blogs</h1>
          <p>Discover amazing stories and insights from our community</p>
        </div>
        
        <Link to={ROUTES.CREATE_BLOG} className="create-blog-btn">
          <Plus size={20} />
          Write Blog
        </Link>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        className="blog-list-controls"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {/* Results Count */}
      {!loading && (
        <motion.div 
          className="results-count"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''} found
          {searchTerm && ` for "${searchTerm}"`}
        </motion.div>
      )}

      {/* Blog Grid/List */}
      <motion.div 
        className={`blog-content `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="popLayout">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="blog-item"
              >
                <Link to={`/blogs/${blog._id}`} className="blog-link">
                  <div className="blog-image-container">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="blog-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x250/1a202c/667eea?text=Blog+Image';
                      }}
                    />
                    {blog.category && (
                      <span className="blog-category">{blog.category}</span>
                    )}
                  </div>

                  <div className="blog-content">
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-description">{blog.description}</p>

                    <div className="blog-meta">
                      <div className="author-info">
                        <User size={14} />
                        <span>{blog.author?.name || 'Unknown Author'}</span>
                      </div>
                      <div className="date-info">
                        <Calendar size={14} />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    </div>

                    <div className="blog-stats">
                      <div className="stat">
                        <Clock size={14} />
                        <span>{readingTime(blog.content)} min read</span>
                      </div>
                      <div className="stat">
                        <Eye size={14} />
                        <span>{blog.viewsCount || 0}</span>
                      </div>
                      <div className="stat">
                        <Heart size={14} />
                        <span>{blog.likesCount || 0}</span>
                      </div>
                      <div className="stat">
                        <MessageCircle size={14} />
                        <span>{blog.commentsCount || 0}</span>
                      </div>
                    </div>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="blog-tags">
                        {blog.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            // Empty State
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <BookOpen size={64} className="empty-icon" />
              <h3>No blogs found</h3>
              <p>{searchTerm ? 'Try adjusting your search terms' : 'Be the first to write a blog!'}</p>
              {!searchTerm && (
                <Link to={ROUTES.CREATE_BLOG} className="create-first-btn">
                  <Plus size={18} />
                  Create Your First Blog
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Loading More (for future pagination) */}
      {loading && blogs.length > 0 && (
        <div className="loading-more">
          <div className="spinner small"></div>
          <span>Loading more blogs...</span>
        </div>
      )}
    </div>
  );
}