import { Link } from "react-router-dom";
import { Calendar, Clock, Eye, Heart, MessageCircle, User } from "lucide-react";
import "../../Styles/components/BlogList.css";

export const BlogCard = ({ blog }) => {
  return (
    <>
      {/* Image */}
      <div className="blog-image">
        <img
          src={blog.image}
          alt={blog.title}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x250/1a202c/667eea?text=Blog+Image";
          }}
        />
        {/* <div className="blog-category">{blog.category}</div> */}
      </div>

      {/* Content */}
      <div className="blog-content">
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-description">{blog.description}</p>

        {/* Meta Information */}
        <div className="blog-meta">
          <div className="author-info">
            <User size={14} />
            <span>{blog.author?.name || "Unknown Author"}</span>
          </div>
          <div className="date-info">
            <Calendar size={14} />
            {/* <span>{formatDate(blog.createdAt)}</span> */}
          </div>
        </div>

        {/* Stats */}
        <div className="blog-stats">
          <div className="stat">
            <Clock size={14} />
            {/* <span>{readingTime(blog.content)} min read</span> */}
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

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="blog-tags">
            {blog.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
