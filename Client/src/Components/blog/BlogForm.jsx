import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, Eye, EyeOff, FileText, Image, Loader, Save, Type, Upload, X, Sparkles } from "lucide-react"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Config/routesConfig";
import { blogApi } from "../../Api/blogApi";
import "../../Styles/components/BlogForm.css"

export const BlogForm = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: user?._id,
    imageFile: ''
  });

  const handleImageUpload = (e) => {
    setFormData(prev => ({ ...prev, imageFile: e.target.files[0] }));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev, [name]: value
    }));
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, imageFile: '' }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.title || !formData.description) {
        throw new Error('Please fill in all required fields');
      }
      if (!formData.imageFile) {
        throw new Error('Please upload a blog image');
      }

      const data = new FormData();
      data.append("blog", JSON.stringify({
        title: formData.title,
        description: formData.description,
        author: formData.author
      }));
      data.append("image", formData.imageFile);

      const response = await blogApi.create(data);
      console.log("done", response);

      if (response.success) {
        setSuccess('Blog created successfully!');
        setTimeout(() => {
          navigate(ROUTES.MY_BLOGS);
        }, 1500);
      }else{
        setError("Failed to create Blog:",response.message)
      }

    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="blog-form-container">
      {/* Header */}
      <motion.div 
        className="blog-form-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-left">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            Back
          </button>
        </div>

        <div className="header-center">
          <div className="header-icon">
            <Sparkles size={28} />
          </div>
          <h1>Create New Blog</h1>
          <p>Share your story with the world</p>
        </div>

        <div className="header-right">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`preview-toggle-btn ${showPreview ? 'active' : ''}`}
          >
            {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
        </div>
      </motion.div>

      {/* Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <X size={18} />
            <span>{error}</span>
          </motion.div>
        )}

        {success && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Save size={18} />
            <span>{success}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="blog-form-content">
        <motion.form
          className="blog-form-main"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Form Fields */}
          <div className="form-fields-container">
            {/* Title Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="title" className="form-label">
                <Type size={20} />
                Blog Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a captivating title..."
                className="form-input"
                required
              />
            </motion.div>

            {/* Description Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="description" className="form-label">
                <FileText size={20} />
                Blog Description *
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write a compelling description that makes readers want to click..."
                className="form-textarea"
                rows="4"
                required
              />
            </motion.div>

            {/* Image Upload */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="form-label">
                <Image size={20} />
                Featured Image *
              </label>
              
              {formData?.imageFile ? (
                <div className="image-preview-container">
                  <img
                    src={URL.createObjectURL(formData.imageFile)}
                    alt="Preview"
                    className="image-preview"
                  />
                  <div className="image-overlay">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="image-remove-btn"
                    >
                      <X size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="image-upload-area"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                  <div className="upload-content">
                    <Upload size={40} className="upload-icon" />
                    <div className="upload-text">
                      <p>Click to upload or drag and drop</p>
                      <span>PNG, JPG, GIF up to 5MB</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="form-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="actions-container">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              
              <div className="primary-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? (
                    <Loader size={18} className="spinner" />
                  ) : (
                    <Save size={18} />
                  )}
                  Publish Blog
                </button>
              </div>
            </div>
          </motion.div>
        </motion.form>

        {/* Preview Panel */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              className="preview-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="preview-header">
                <h3>Blog Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="close-preview"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="blog-preview-content">
                {formData.imageFile && (
                  <div className="preview-image-container">
                    <img
                      src={URL.createObjectURL(formData.imageFile)}
                      alt="Blog preview"
                      className="preview-image"
                    />
                  </div>
                )}

                <div className="preview-details">
                  <h2 className="preview-title">
                    {formData.title || 'Your Blog Title Here'}
                  </h2>
                  
                  <p className="preview-description">
                    {formData.description || 'Your blog description will appear here...'}
                  </p>

                  <div className="preview-meta">
                    <span className="meta-item">By {user?.name || 'You'}</span>
                    <span className="meta-item">•</span>
                    <span className="meta-item">Just now</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};