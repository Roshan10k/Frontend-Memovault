import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/forgotPassword.css";
import { forgotPassword } from '../Api/Api'; // Ensure API function exists

export default class ForgotPasswordSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      newPassword: '',
      confirmPassword: '',
      message: '',
      error: ''
    };
  }

  // Update state on input change
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Handle form submission
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, newPassword, confirmPassword } = this.state;
  
    if (newPassword !== confirmPassword) {
      this.setState({ error: "New password and confirm password do not match", message: '' });
      return;
    }
  
    const requestData = { email, newPassword, confirmPassword };
    console.log("Sending request:", requestData); // Debugging line
  
    try {
      const response = await forgotPassword(requestData);
      this.setState({ message: response.data.message, error: '' });
    } catch (error) {
      console.error("Forgot password error:", error.response?.data || error.message);
      this.setState({
        error: error.response?.data?.message || "Error resetting password",
        message: ''
      });
    }
  };

  render() {
    const { email, newPassword, confirmPassword, message, error } = this.state;
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <h2 className="forgot-password-heading">Forgot Password</h2>
          <div className="forgot-password-form">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group-forget">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"  // FIXED: Added name attribute
                  placeholder="Enter your email" 
                  value={email}
                  onChange={this.handleChange}
                  required
                />
                
                <label htmlFor="newPassword">New Password</label>
                <input 
                  type="password" 
                  id="newPassword"
                  name="newPassword"  // FIXED: Added name attribute
                  placeholder="Enter your new password" 
                  value={newPassword}
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword"
                  name="confirmPassword"  // FIXED: Added name attribute
                  placeholder="Confirm your password" 
                  value={confirmPassword}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <button type="submit" className="reset-password-button">Reset Password</button>
            </form>
            { message && <p className="success-message">{message}</p> }
            { error && <p className="error-message">{error}</p> }
          </div>
          <div className="forgot-link">
            <span className="forgot-question">Remembered Password?</span> <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    );
  }
}
