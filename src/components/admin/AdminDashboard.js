import React from "react";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const stats = {
    total: 52,
    pending: 18,
    inProgress: 12,
    resolved: 22,
  };

  return (
    <div className="admin-dashboard">

      <h2 className="admin-heading">Dashboard Overview</h2>

      {/* STAT CARDS */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h4>Total Reports</h4>
          <p className="stat-value">{stats.total}</p>
        </div>

        <div className="admin-stat-card">
          <h4>Pending</h4>
          <p className="stat-value">{stats.pending}</p>
        </div>

        <div className="admin-stat-card">
          <h4>In Progress</h4>
          <p className="stat-value">{stats.inProgress}</p>
        </div>

        <div className="admin-stat-card">
          <h4>Resolved</h4>
          <p className="stat-value">{stats.resolved}</p>
        </div>
      </div>

      <h3 className="sub-title">Recent Reports</h3>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Issue</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Broken Pipe</td>
              <td>Sanitation</td>
              <td className="pending">Pending</td>
              <td>2025-02-15</td>
            </tr>

            <tr>
              <td>Streetlight Fault</td>
              <td>Electrical</td>
              <td className="resolved">Resolved</td>
              <td>2025-02-14</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDashboard;
