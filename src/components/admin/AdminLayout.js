import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../styles/AdminLayout.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const AdminLayout = () => {
  const { logout } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login");
};

  return (
    <div className="admin-wrapper">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-title">InfraWatch<br />Admin</h2>

        <ul className="admin-links">
          <li>
            <Link to="/admin/dashboard">
              <i className="ri-dashboard-fill"></i> Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/reports">
              <i className="ri-file-list-3-fill"></i> Manage Reports
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="ri-team-fill"></i> Users
            </Link>
          </li>

          <li>
            <Link to="/admin/categories">Categories</Link>
        </li>
        </ul>

        <button onClick={handleLogout} className="admin-logout">
          <i className="ri-logout-box-r-line"></i> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <div className="admin-content-area">

        {/* TOP NAV */}
        <header className="admin-topbar">
          <h3>Admin Panel</h3>
        </header>

        {/* PAGE CONTENT */}
        <main className="admin-main">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
