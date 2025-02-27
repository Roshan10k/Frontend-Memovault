import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaHome, FaBrain, FaList, FaTrophy, FaEnvelopeOpen } from 'react-icons/fa';
import { GiEmptyMetalBucketHandle } from 'react-icons/gi';
import LogoImage from '../assets/logo.png';
import LogoutImage from '../assets/logout.png';
import '../styles/sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
   sessionStorage.removeItem("authToken"); 

  // Redirect to the login page
  window.location.href = "/login"
    setShowModal(false);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <NavLink to="/dashboard">
          <img src={LogoImage} alt="Logo" width={70} height={70} />
        </NavLink>
        <div className="titlename">
          Memo<span className="title2">Vault</span>
        </div>
      </div>
      <ul className="sidebar-menu">
        <li>
          <FaHome />
          <NavLink 
            to="/dashboard" 
            end
            className={({ isActive }) => isActive ? 'active sidebar-link' : 'sidebar-link'}
          >
            Home
          </NavLink>
        </li>
        <li>
          <FaBrain />
          <NavLink 
            to="/dashboard/memories" 
            className={({ isActive }) => isActive ? 'active sidebar-link' : 'sidebar-link'}
          >
            Memories
          </NavLink>
        </li>
        <li>
          <GiEmptyMetalBucketHandle />
          <NavLink 
            to="/dashboard/bucketlist" 
            className={({ isActive }) => isActive ? 'active sidebar-link' : 'sidebar-link'}
          >
            Bucket List
          </NavLink>
        </li>
        <li>
          <FaEnvelopeOpen />
          <NavLink 
            to="/dashboard/lettertoself" 
            className={({ isActive }) => isActive ? 'active sidebar-link' : 'sidebar-link'}
          >
            Letter To Self
          </NavLink>
        </li>
        <li>
          <FaList />
          <NavLink 
            to="/dashboard/yearlygoals" 
            className={({ isActive }) => isActive ? 'active sidebar-link' : 'sidebar-link'}
          >
            Yearly Goals
          </NavLink>
        </li>
        <li>
          <FaTrophy />
          <NavLink 
            to="/dashboard/achievements" 
            className={({ isActive }) => isActive ? 'active sidebar-link' : 'sidebar-link'}
          >
            Achievements
          </NavLink>
        </li>
      </ul>
      <div className="profile-container">
        <li onClick={handleShowModal} className="profile-link">
          <img src={LogoutImage} alt="Logout" className="logout-icon" width={20} height={20} />
          <span className="logout-text">Logout</span>
        </li>
      </div>

      {/* Modal for Logout Confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            <NavLink to="/logout" className="modal-logout-link">
              Logout
            </NavLink>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sidebar;
