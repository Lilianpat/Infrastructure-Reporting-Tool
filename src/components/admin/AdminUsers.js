import React, { useState } from "react";
import "../../styles/AdminUsers.css";

const dummyUsers = [
  {
    id: 1,
    name: "Lilian Obuzor",
    email: "lilian@example.com",
    role: "Student",
    reports: 14,
    accuracy: 82,
    impact: 7,
    active: true,
    avatar: "https://ui-avatars.com/api/?name=Lilian+Obuzor&background=1abc9c&color=fff"
  },
  {
    id: 2,
    name: "Chinedu Okoro",
    email: "chinedu@example.com",
    role: "Staff",
    reports: 21,
    accuracy: 76,
    impact: 4,
    active: true,
    avatar: "https://ui-avatars.com/api/?name=Chinedu+Okoro&background=3498db&color=fff"
  },
  {
    id: 3,
    name: "Amaka Nwoke",
    email: "amaka@example.com",
    role: "Service Provider",
    reports: 9,
    accuracy: 69,
    impact: 3,
    active: false,
    avatar: "https://ui-avatars.com/api/?name=Amaka+Nwoke&background=e74c3c&color=fff"
  }
];

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleStatus = (user) => {
    alert(
      `${user.name} is now ${user.active ? "Deactivated" : "Activated"} (UI only)`
    );
  };

  const resetPassword = (user) => {
    alert(`Password reset link sent to: ${user.email} (UI only)`);
  };

  return (
    <div className="admin-users-page">
      <h2>Manage Users</h2>

      {/* USERS TABLE */}
      <div className="admin-users-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Reports</th>
              <th>Accuracy</th>
              <th>Impact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {dummyUsers.map((user) => (
              <tr key={user.id}>
                {/* USER INFO WITH AVATAR */}
                <td>
                  <div className="user-info">
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                    <span>{user.name}</span>
                  </div>
                </td>

                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.reports}</td>
                <td>{user.accuracy}%</td>
                <td>{user.impact}</td>

                <td className={user.active ? "active-status" : "inactive-status"}>
                  {user.active ? "Active" : "Suspended"}
                </td>

                <td className="action-buttons">
                  <button onClick={() => setSelectedUser(user)}>View</button>
                  <button onClick={() => resetPassword(user)}>Reset Password</button>
                  <button onClick={() => toggleStatus(user)}>
                    {user.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* USER DETAILS MODAL */}
      {selectedUser && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="user-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal"
              onClick={() => setSelectedUser(null)}
            >
              ×
            </button>

            <img
              src={selectedUser.avatar}
              alt="avatar"
              className="modal-avatar"
            />

            <h2>{selectedUser.name}</h2>

            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Reports:</strong> {selectedUser.reports}</p>
            <p><strong>Accuracy:</strong> {selectedUser.accuracy}%</p>
            <p><strong>Impact Score:</strong> {selectedUser.impact}</p>

            <button
              className="modal-action danger"
              onClick={() => toggleStatus(selectedUser)}
            >
              {selectedUser.active ? "Suspend User" : "Activate User"}
            </button>

            <button
              className="modal-action"
              onClick={() => resetPassword(selectedUser)}
            >
              Reset Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
