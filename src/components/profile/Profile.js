import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../../styles/Profile.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  // Dummy user data (replace with backend later)
  const [user, setUser] = useState({
    name: "Lilian Obuzor",
    email: "lilian@example.com",
    phone: "08012345678",
    location: "University of Nigeria Nsukka",
    joined: "January 2025",
    avatar: "https://ui-avatars.com/api/?name=Lilian+Obuzor&background=1abc9c&color=fff",
    level: 12,
    points: 450,
    badges: ["🥇", "🎯", "📍"],
  });

  const [newImage, setNewImage] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { logout } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login");
};


const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewURL = URL.createObjectURL(file);

  setNewImage(file);

  // Update user avatar preview (UI only)
  setUser({
    ...user,
    avatar: previewURL,
  });
};


  const [editing, setEditing] = useState(false);

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <Sidebar />

      <div className="profile-container">
        <h2 className="page-title">My Profile</h2>

        {/* PROFILE HEADER CARD */}
        <div className="profile-header-card">
          <div className="avatar-container">
  <img src={user.avatar} alt="avatar" className="profile-avatar" />

  <label className="change-avatar-btn">
    Change Picture
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      hidden
    />
  </label>
</div>

          <div>
            <h3>{user.name}</h3>
            <p className="profile-email">{user.email}</p>
            <p className="joined-text">Joined: {user.joined}</p>

            <button
              className="edit-profile-btn"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Stop Editing" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* EDITABLE FIELDS */}
        {editing && (
          <div className="edit-section">
            <h3>Edit Information</h3>

            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInput}
            />

            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInput}
            />

            <label>Location</label>
            <input
              type="text"
              name="location"
              value={user.location}
              onChange={handleInput}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
            />

            <button className="save-btn">Save Changes</button>
          </div>
        )}

        {/* ACCOUNT SETTINGS */}
        <div className="account-settings-card">
          <h3>Account Settings</h3>

         <button
  className="settings-btn"
  onClick={() => setShowPasswordModal(true)}
>
  Change Password
</button>

          <button className="settings-btn">Update Email</button>
          <button onClick={handleLogout}  className="settings-btn logout">Logout</button>
        </div>

        {/* GAMIFICATION SECTION */}
        <div className="gamification-section">
          <h3>Gamification</h3>

          <div className="stats-card">
            <p><strong>Level:</strong> {user.level}</p>
            <p><strong>Points:</strong> {user.points} XP</p>
          </div>

          <div className="badge-preview">
            {user.badges.map((b, i) => (
              <span key={i} className="profile-badge">{b}</span>
            ))}
          </div>

          <a href="/badges" className="view-all-badges">
            View All Badges →
          </a>
        </div>
        {showPasswordModal && (
  <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
    <div className="password-modal" onClick={(e) => e.stopPropagation()}>
      <button className="close-modal" onClick={() => setShowPasswordModal(false)}>
        ×
      </button>

      <h3>Change Password</h3>

      <input type="password" placeholder="Current Password" className="modal-input" />
      <input type="password" placeholder="New Password" className="modal-input" />
      <input type="password" placeholder="Confirm New Password" className="modal-input" />

      <button className="modal-save-btn">Update Password</button>
    </div>
  </div>
)}

      </div>
    </div>

    
  );
};

export default Profile;
