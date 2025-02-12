import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/login.css";
import withRouter from '../utility/withRouter';
import logo from '../assets/logo.png';
import { login } from '../Api/Api'; // Import the login API function

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', // Changed from username to email
      password: '',
      error: '' // For error messages
    };
  }

  // Handle input changes
  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      error: '' // Clear error when user types
    });
  };

  // Handle form submission
  handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { navigate } = this.props;

    try {
      // Call the login API
      const response = await login({ email, password });
      
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';
      if (error.response) {
        // Handle specific error statuses
        if (error.response.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (error.response.status === 404) {
          errorMessage = 'User not found';
        }
      }
      this.setState({ error: errorMessage });
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-left">
          <img src={logo} alt="MemoVault Logo" className="login-logo" />
          <h1 className="login-title">Memo<span className='title2'>Vault</span></h1>
          <p className="login-tagline">Keeping Your Memories Safe</p>
        </div>
        <div className="login-right">
          <div className="login-box">
            <h2>Login</h2>
            {this.state.error && (
              <div className="error-message">{this.state.error}</div>
            )}
            <form onSubmit={this.handleLogin}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                required
                value={this.state.email}
                onChange={this.handleInputChange}
              />

              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                required
                value={this.state.password}
                onChange={this.handleInputChange}
              />

              <div className="forgot-password">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <button type="submit" className="login-button">Login</button>

              <div className="signup-link">
                <span className="signup-question">Don't have an account?</span> 
                <Link to="/signup">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginComponent);