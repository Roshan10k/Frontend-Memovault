import React, { useState, useEffect } from "react";
import Sidebar from "../component/sidebar"; // Ensure correct path
import "../styles/dashboard.css";
import HomeSection from '../component/DashboardHomeSection'


const Dashboard = () => {
   

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <HomeSection/>
            


            
        </div>
    );
};

export default Dashboard;
