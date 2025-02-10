import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../styles/navbar.css";
import logo from '../assets/logo.png'; 
import profileImage from '../assets/profile.png'; 
import AboutUsSection from './AboutUsSection';

export default class NavbarComponent extends Component {
  
  render() {
    return (
      <Navbar expand="lg" className="navbar-custom" >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              alt="MemoVault Logo"
              width="70"
              height="70"
              className="d-inline-block align-top"
            />{' '}
            
          </Navbar.Brand>
          <div className="titlename">
              Memo<span className="title2">Vault</span>
            </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              

             
              <NavDropdown title="Services" id="basic-nav-dropdown">
                <NavDropdown.Item href="/#services">Memories Capsule</NavDropdown.Item>
                <NavDropdown.Item href="/#services">Letter to Futureself</NavDropdown.Item>
                <NavDropdown.Item href="/#services">Bucket-List</NavDropdown.Item>
                <NavDropdown.Item href="/#services">Achievements</NavDropdown.Item>
                <NavDropdown.Item href="/#services">Yearly-Goals</NavDropdown.Item>
              </NavDropdown>
              <Nav className='contact'>
                <a href="/#contact">Contact</a></Nav>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to='/login'>
                <button className="getstarted-button">Get Started</button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}