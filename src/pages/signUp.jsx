import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import "../styles/signup.css";
import SignUpImage from "../assets/SignUpImage.png";
import logo from "../assets/logo.png";
import { register } from "../Api/Api";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", 
  });

  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // Track successful registration
  
  const navigate = useNavigate(); // Hook for navigation

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }
  
    try {
      const response = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
  
      if (response && response.data) {
        console.log(response);
        alert(response.data.message || "Registration successful");
  
        // Save the username in localStorage
        localStorage.setItem("username", formData.username); // Store the username 
        console.log("Stored Username: ", localStorage.getItem("username"));  // Check if it's being stored
        localStorage.setItem("email", formData.email); // Optionally store email
  
        // Reset the form fields
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
  
        // Set registration success   
        setIsRegistered(true); // Set the registration flag to true
        navigate("/login"); // Navigate to login page after successful registration
      } else {
        alert("Registration failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed. Try again.");
    }
  };
  
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <img src={SignUpImage} width={400} height={400} alt="signup-picture" className="signup-picture" />
          <img src={logo} alt="MemoVault Logo" className="signup-logo" width={70} height={70} />
          <h1 className="signup-title">Memo<span className="title2">Vault</span></h1>
          <p className="signup-tagline">Start creating your Vault</p>
        </div>
        <div className="signup-right">
          <div className="signup-box">
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
  
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
  
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
  
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
  
              <button type="submit" className="signup-button">Sign Up</button>
              <div className="login-link">
                <span className="login-question">Already have an account?</span> <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
