import React, { useState } from "react";
import "../../styles/Sidebar.css"
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";



const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { logout } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login");
};

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button
        className="desktop-collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        ☰
      </button>

      <ul className="sidebar-links">
  <li><Link to="/dashboard">Dashboard</Link></li>
  <li><Link to="/report-issue">Report Issue</Link></li>
  <li><Link to="/my-reports">My Reports</Link></li>
  <li><Link to="/badges">Badges</Link></li>
  <li><Link to="/leaderboard">Leaderboard</Link></li>
  <li><Link to="/profile">Profile</Link></li>
  <li onClick={handleLogout} className="logout-link">
  Logout
</li>

</ul>

    </aside>
  );
};

export default Sidebar;
