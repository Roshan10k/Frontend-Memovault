import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar"; // Ensure Sidebar is correctly imported
import "../styles/dashboard.css"; // Make sure your styles are correctly set

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <main>
          <Outlet /> {/* This will dynamically render the active dashboard page */}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
