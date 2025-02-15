import React, { useEffect, useState } from 'react';
import { FaBell } from "react-icons/fa";
import '../styles/DashboardHome.css';

const Home = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    console.log("Retrieved Username: ", storedUsername);

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="container-fluid memo-home-section">
      <div className="row">
        <div className="col-md-9">
          {/* Welcome Section */}
          <div className="card p-4 mb-3 memo-welcome-card">
            <h2> Hi, {username || 'Guest'}! 👋</h2>
            <p>Welcome back! Capture your memories and set new goals.</p>
            <button className="btn memo-btn-dark">View Details</button>
          </div>

          {/* Trending Section */}
          <div>
            <h5 className="mb-3 memo-trending-title">🔥 Trending Memories</h5>
            <div className="memo-trending-cards">
              <div className="card memo-trending-item">📷 Travel Moments</div>
              <div className="card memo-trending-item">🎉 Achievements</div>
              <div className="card memo-trending-item">✍️ Letter to Future</div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="card p-4 mt-3 memo-analytics-card">
            <h5>📊 Progress Analytics</h5>
            <p>Your journey so far! (Add a chart here later)</p>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="col-md-3">
          <div className="card p-3 mb-3 memo-sidebar-widget">
            <h6>📌 Your Stats</h6>
            <p>Memories Shared: <strong>80</strong></p>
            <p>Goals Completed: <strong>15</strong></p>
          </div>
          <div className="card p-3 memo-sidebar-widget">
            <h6>👥 Followers</h6>
            <p>New This Week: <strong>972</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
