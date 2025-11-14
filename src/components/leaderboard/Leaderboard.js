import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../../styles/Leaderboard.css";

// Dummy Users (replace with backend later)
const users = [
  {
    id: 1,
    name: "Lilian Obuzor",
    avatar: "https://ui-avatars.com/api/?name=Lilian+Obuzor&background=1abc9c&color=fff",
    reports: 34,
    accuracy: 88,
    impact: 12,
    badges: ["🥇", "🎯"],
  },
  {
    id: 2,
    name: "Chinedu Okoro",
    avatar: "https://ui-avatars.com/api/?name=Chinedu+Okoro&background=ffc107&color=000",
    reports: 21,
    accuracy: 76,
    impact: 4,
    badges: ["🥈"],
  },
  {
    id: 3,
    name: "Amara Nwoke",
    avatar: "https://ui-avatars.com/api/?name=Amara+Nwoke&background=3498db&color=fff",
    reports: 15,
    accuracy: 92,
    impact: 9,
    badges: ["📍", "🛠️"],
  },
  {
    id: 4,
    name: "Uche Moses",
    avatar: "https://ui-avatars.com/api/?name=Uche+Moses&background=e74c3c&color=fff",
    reports: 7,
    accuracy: 65,
    impact: 2,
    badges: ["🥉"],
  },
];

// Points Formula (used for sorting)
const calculatePoints = (u) => {
  return Math.floor(u.reports * 1.5 + u.accuracy * 0.6 + u.impact * 3);
};

const Leaderboard = () => {
  const [tab, setTab] = useState("reports"); // reports, accuracy, impact, points

  const sortedUsers = [...users].sort((a, b) => {
    if (tab === "reports") return b.reports - a.reports;
    if (tab === "accuracy") return b.accuracy - a.accuracy;
    if (tab === "impact") return b.impact - a.impact;
    if (tab === "points") return calculatePoints(b) - calculatePoints(a);
    return 0;
  });

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <Sidebar />

      <div className="leaderboard-container">
        <h2 className="page-title">Leaderboard</h2>

        {/* TABS */}
        <div className="leaderboard-tabs">
          {["reports", "accuracy", "impact", "points"].map((item) => (
            <button
              key={item}
              className={`tab-btn ${tab === item ? "active" : ""}`}
              onClick={() => setTab(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* LEADERBOARD LIST */}
        <div className="leaderboard-list">
          {sortedUsers.map((user, index) => (
            <div
  key={user.id}
  className={`leaderboard-card 
    ${index === 0 ? "gold-rank" : ""}
    ${index === 1 ? "silver-rank" : ""}
    ${index === 2 ? "bronze-rank" : ""}`}
>


              <div className="rank">
  {index === 0 && "🥇"}
  {index === 1 && "🥈"}
  {index === 2 && "🥉"}
  {index > 2 && index + 1}
</div>


              <div className="avatar-wrapper">
  {index === 0 && <div className="crown">👑</div>}
  <img src={user.avatar} alt={user.name} className="lb-avatar" />
</div>

              <div className="lb-info">
                <h3>{user.name}</h3>

                <p className="lb-metrics">
                  {tab === "reports" && <>Reports: <strong>{user.reports}</strong></>}
                  {tab === "accuracy" && <>Accuracy: <strong>{user.accuracy}%</strong></>}
                  {tab === "impact" && <>Impact Score: <strong>{user.impact}</strong></>}
                  {tab === "points" && <>Points: <strong>{calculatePoints(user)}</strong></>}
                </p>

                <div className="lb-badges">
                  {user.badges.map((b, i) => (
                    <span key={i} className="lb-badge">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;
