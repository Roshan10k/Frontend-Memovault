import React from "react";
import { Routes, Route } from "react-router-dom";
import { DndProvider } from 'react-dnd';  
import { HTML5Backend } from 'react-dnd-html5-backend';
import Layout from "../component/Layout"; 
import DashboardLayout from "../component/DashboardLayout"; 
import Login from "./LoginPage";
import ForgotPassword from "./forgotPasswordPage";
import SignUp from "./signUp";
import MemoriesPage from "./MemoriesPage";
import Home from "../component/home"; 
import DashBoardPage from "./DashboardPage"; 
import BucketListPage from "./BucketListPage";
import LetterToSelfPage from "./LetterToSelfPage"; 
import GoalSectionPage from "./GoalSectionPage"; 
import AchievementsPage from "./AchievementsPage";

 

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="logout" element={<Home />} />
          
        </Route>

        {/* Dashboard Routes (With Sidebar) */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashBoardPage />} /> {/* Main Dashboard */}
          <Route path="memories" element={<MemoriesPage />} /> {/* Separate Page */}
          <Route path="bucketlist" element={<BucketListPage />} /> {/* Separate Page */}
          <Route path="lettertoself" element={<LetterToSelfPage />} /> {/* Separate Page */}
          <Route path="yearlygoals" element={<GoalSectionPage />} /> {/* Separate Page */}
          <Route path="achievements" element={<AchievementsPage />} /> {/* Separate Page */}
        </Route>
      </Routes>
    </DndProvider>  
  );
}

export default App;
