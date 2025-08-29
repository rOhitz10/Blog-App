import React from "react";
import "../../Styles/Login.css";
import { Button } from "../../Components/common/button";

const Login = () => {
 const handleForm = (e)=>{
  e.preventDefault();
  const formData = new FormData(e.target);
  const obj = Object.fromEntries(formData.entries());
  console.log("form data:", obj);
  
 }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Login to your account</p>

        {/* Social login buttons */}
        <div className="login-buttons">
          <Button variant="secondary" children="Continue with Google" />
          <Button variant="secondary" children="Continue with Apple" />
        </div>

        {/* Divider */}
        <div className="or-divider">or</div>

        {/* Login form */}
        <form className="login-form" onSubmit={handleForm}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <Button variant="primary" children="Login"/>
        </form>

        {/* Extra links */}
        <div className="login-footer">
          <a href="/forgot-password">Forgot password?</a>
          <p>
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
