import { useState, useRef } from 'react';
import { motion } from 'framer-motion';  
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Sparkles, LogIn } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
import { authApi } from '../../api/authApi';
import { ROUTES } from '../../Config/routesConfig';
import '../../styles/Auth.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  // const { login } = useAuth();

  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData(formRef.current);
      const credentials = Object.fromEntries(formData.entries());
      
      // Basic validation
      if (!credentials.userId || !credentials.password) {
        throw new Error('Please fill in all fields');
      }
      
      const response = await authApi.login(credentials);
      
      if (response.success) {
        login(response.user, response.token);
        
        // Success animation before navigation
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Brand Section */}
      <motion.div 
        className="login-brand"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="brand-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="logo">
            <Sparkles size={40} />
            <span>BlogSphere</span>
          </div>
          <h1>Welcome Back!</h1>
          <p>Continue your blogging journey and connect with your audience.</p>
          
          <div className="features-list">
            <div className="feature">
              <div className="feature-icon">📝</div>
              <span>Manage Your Content</span>
            </div>
            <div className="feature">
              <div className="feature-icon">📊</div>
              <span>Track Your Analytics</span>
            </div>
            <div className="feature">
              <div className="feature-icon">💬</div>
              <span>Engage With Readers</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="floating-shapes"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          {[1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              className="floating-shape"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Right Side - Form Section */}
      <motion.div 
        className="login-form-section"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <motion.div
          className="form-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="form-header" variants={itemVariants}>
            <h2>Sign In to Your Account</h2>
            <p>Welcome back! Please enter your details</p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              variants={itemVariants}
            >
              <span>{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="login-form"
            variants={itemVariants}
          >
            <div className="form-group">
              <label htmlFor="userId" className="form-label">
                <Mail size={18} />
                User ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                required
                className="form-input"
                placeholder="Enter your email or username"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <Lock size={18} />
                Password
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  className="form-input"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" name="remember" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              className="login-button"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <div className="loading-spinner" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div className="login-divider" variants={itemVariants}>
            <span>or continue with</span>
          </motion.div>

          {/* Social Login */}
          <motion.div className="social-login" variants={itemVariants}>
            <button
              type="button"
              className="social-button google"
              disabled={isLoading}
            >
              <img src="/google-icon.svg" alt="Google" />
              Google
            </button>
            <button
              type="button"
              className="social-button github"
              disabled={isLoading}
            >
              <img src="/github-icon.svg" alt="GitHub" />
              GitHub
            </button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div className="form-footer" variants={itemVariants}>
            <p>
              Don't have an account?{' '}
              <Link to={ROUTES.REGISTER} className="auth-link">
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;