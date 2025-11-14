import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../../styles/user-dashboard.css"


const UserDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <Sidebar />

      <div className="dashboard-content">
        <h2 className="welcome-title">Welcome back, Lilian 👋</h2>
        <p className="welcome-sub">Here’s your summary for today</p>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stats-card">
            <h3>Total Reports</h3>
            <p className="value">12</p>
          </div>

          <div className="stats-card">
            <h3>Pending</h3>
            <p className="value">4</p>
          </div>

          <div className="stats-card">
            <h3>Resolved</h3>
            <p className="value">6</p>
          </div>

          <div className="stats-card">
            <h3>Your Points</h3>
            <p className="value">250</p>
          </div>
        </div>

        {/* Badges */}
        <div className="section-card">
          <h3>Your Badges</h3>
          <div className="badge-row">
            <div className="badge">🥇</div>
            <div className="badge">🔥</div>
            <div className="badge">🎯</div>
            <div className="badge">⭐</div>
          </div>
        </div>

        {/* Reports */}
        <div className="section-card">
          <h3>Recent Reports</h3>

          <ul className="report-list">
            <li className="report-item">
              <span>Pothole at Engineering Road</span>
              <span className="status pending">Pending</span>
            </li>

            <li className="report-item">
              <span>Broken Streetlight – Hostel Block</span>
              <span className="status resolved">Resolved</span>
            </li>

            <li className="report-item">
              <span>Flooding at Library Walkway</span>
              <span className="status in-progress">In Progress</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
