import React, { Component } from 'react';
import "../styles/footer.css";
import facebookIcon from '../assets/facebook.png'; // Import the SVG icons
import twitterIcon from '../assets/twitter.png';
import googleIcon from '../assets/google.png';
import instagramIcon from '../assets/instagram.png';
import linkedinIcon from '../assets/linkedin.png';
import githubIcon from '../assets/github.png';

export default class FooterComponent extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>MemoVault</h3>
            <p>
              Memovault is a platform where you can store your memories, write
              letters to your future self, create a bucket list, and set yearly
              goals and track your achievements.
            </p>
          </div>
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li>Memories</li>
              <li>Letter To Futureself</li>
              <li>Bucket List</li>
              <li>Achievements</li>
              <li>Yearly Goals</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li>
                <span role="img" aria-label="home">
                  🏠
                </span>{" "}
                Lalitpur, Bagmati, Nepal
              </li>
              <li>
                <span role="img" aria-label="email">
                  ✉️
                </span>{" "}
                infomemovault@gmail.com
              </li>
              <li>
                <span role="img" aria-label="phone">
                  📞
                </span>{" "}
                +01 234 567 88
              </li>
              <li>
                <span role="img" aria-label="fax">
                  📠
                </span>{" "}
                +01 234 567 89
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com/" className="social-icon facebook">
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a href="https://x.com/" className="social-icon twitter">
                <img src={twitterIcon} alt="Twitter" />
              </a>
              <a href="https://www.google.com/" className="social-icon google">
                <img src={googleIcon} alt="Google" />
              </a>
              <a href="https://www.instagram.com/" className="social-icon instagram">
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a href="https://www.linkedin.com/" className="social-icon linkedin">
                <img src={linkedinIcon} alt="LinkedIn" />
              </a>
              <a href="https://www.github.com/" className="social-icon github">
                <img src={githubIcon} alt="GitHub" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Copyright: MemoVault</p>
        </div>
      </footer>
    );
  }
}


