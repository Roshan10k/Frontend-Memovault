import React from "react";
import "../styles/contact.css";

const ContactSection = () => {
  return (
    <div id="contact" className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <div className="contact-content">
        {/* Left Section */}
        <div className="contact-info">
          <h3>Why you should contact us?</h3>
          <p>
            At MemoVault, we believe that memories are treasures meant to be cherished forever. Whether you need assistance, have a question, or simply want to share your experience, we're here to help!
          </p>
          <ul>
            <li>📞 Phone: +01 234 567 88</li>
            <li>📧 Mail: <a href="https://mail.google.com/">infomemovault@gmail.com</a></li>
            <li>📍 Address: Lalitpur, Bagmati, Nepal</li>
          </ul>
        </div>

        {/* Right Section - Contact Form */}
        <div className="contact-form">
          <form className="contact-form-elements">
            <div className="input-group">
              <div>
                <label>First Name *</label>
                <input type="text" placeholder="First Name" />
              </div>
              <div>
                <label>Last Name *</label>
                <input type="text" placeholder="Last Name" />
              </div>
            </div>
            <label>Email *</label>
            <input type="email" placeholder="Email" />
            <label>Message *</label>
            <textarea placeholder="Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
