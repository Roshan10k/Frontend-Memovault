import React, { Component } from 'react';
import "../styles/home.css";
import HomeBackground from '../assets/home.png';
import ServicesSection from './ServicesSection';
import ContactSection from './contactSection';

export default class Home extends Component {
  render() {
    return (
      <>
        
        <div className="home-container-landing">
          <h1 className="home-title">
            A Vault for Your Cherished Memories
          </h1>
          <p className="home-description">
            MemoVault helps you preserve your precious moments by storing images, messages, and letters to your future self. Create bucket lists, track achievements, and set goals for the year ahead, all in one place.
          </p>
          <div className="home-illustration">
            <img
              src={HomeBackground}
              alt="Team working illustration"
              className="illustration-image"
            />
          </div>
        </div>

        <ServicesSection/>
      <ContactSection/>

        
       
      </>
    );
  }
}
