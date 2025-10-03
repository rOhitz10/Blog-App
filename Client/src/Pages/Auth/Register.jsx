import { useState, useRef } from 'react';
import { motion } from 'framer-motion';  
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/Auth';
import { authApi } from '../../Api/authApi';
import { ROUTES } from '../../Config/routesConfig';
import '../../Styles/pages/Auth.css'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const formRef = useRef();
  const [userData,setuserData] = useState({
    name:"",
    userName:"",
    email:"",
    password:"",
    date_of_birth:"",
  })
  const navigate = useNavigate();
  const { login } = useAuth();

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
  const handleChange = (e)=>{
    const {name,value} = e.target;
   setuserData((prev)=>({
    ...prev,
    [name]:value
  }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try { 
      
      if (!userData.userName || !userData.email || !userData.password || !userData.name || !userData.date_of_birth) {
        throw new Error('Please fill in all fields');
      }
      
      userData.date_of_birth = new Date(userData.date_of_birth).toISOString();
      
      const response = await authApi.register(userData);
      
      if (response.success) {
        const loginResponse = await authApi.login({
          userId: userData.email,
          password: userData.password
        });
                
        if (loginResponse.success) {
          login(loginResponse.user, loginResponse.token);
          navigate(ROUTES.DASHBOARD, { replace: true });
        }
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  return (
    <div className="register-container">
      {/* Left Side - Brand Section */}
      <motion.div 
        className="register-brand"
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
          <h1>Join Our Creative Community</h1>
          <p>Share your stories, connect with readers, and build your audience with our powerful blogging platform.</p>
          
          <div className="features-list">
            <div className="feature">
              <div className="feature-icon">✨</div>
              <span>Unlimited Blog Posts</span>
            </div>
            <div className="feature">
              <div className="feature-icon">🎨</div>
              <span>Beautiful Themes</span>
            </div>
            <div className="feature">
              <div className="feature-icon">📊</div>
              <span>Advanced Analytics</span>
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
        className="register-form-section"
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
            <h2>Create Your Account</h2>
            <p>Start your blogging journey in seconds</p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div className="progress-steps" variants={itemVariants}>
            <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span>Basic Info</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span>Security</span>
            </div>
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

          {/* Registration Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="register-form"
            variants={itemVariants}
          >
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                className="form-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <User size={18} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    id="name"
                    name="name"
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                    onChange={(e)=>handleChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userName" className="form-label">
                    <User size={18} />
                    Username
                  </label>
                  <input
                    type="text"
                    value={userData.userName}
                    id="userName"
                    name="userName"
                    required
                    className="form-input"
                    placeholder="Choose a username"
                    onChange={(e)=>handleChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date_of_birth" className="form-label">
                    <Calendar size={18} />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={userData.date_of_birth}
                    id="date_of_birth"
                    name="date_of_birth"
                    required
                    className="form-input"
                    onChange={(e)=>handleChange(e)}
                  />
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="next-button"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {/* Step 2: Security Information */}
            {currentStep === 2 && (
              <motion.div
                className="form-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <Mail size={18} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    id="email"
                    name="email"
                    required
                    className="form-input"
                    placeholder="Enter your email"
                    onChange={(e)=>handleChange(e)}
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
                      value={userData.password}
                      id="password"
                      name="password"
                      required
                      className="form-input"
                      placeholder="Create a strong password"
                      minLength={6}
                      onChange={(e)=>handleChange(e)}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="back-button"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loading-spinner" />
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.form>

          {/* Footer */}
          <motion.div className="form-footer" variants={itemVariants}>
            <p>
              Already have an account?{' '}
              <Link to={ROUTES.LOGIN} className="auth-link">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
