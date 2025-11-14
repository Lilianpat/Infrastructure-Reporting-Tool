import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../../styles/Badges.css";

import L from "leaflet";

// User stats (later from backend)
const userStats = {
  reports: 14,
  accuracy: 82,
  impact: 7,
};

// Calculate simple level
const userLevel = Math.floor(
  userStats.reports * 0.4 +
  (userStats.accuracy / 10) * 0.3 +
  userStats.impact * 0.3
);

// Badge data
const badgeRules = [
  { id: 1, name: "Bronze Reporter", type: "reports", requirement: 1, icon: "🥉", color: "#cd7f32", description: "Awarded for submitting your first report." },
  { id: 2, name: "Silver Reporter", type: "reports", requirement: 10, icon: "🥈", color: "#c0c0c0", description: "Awarded for submitting 10 reports." },
  { id: 3, name: "Gold Reporter", type: "reports", requirement: 25, icon: "🥇", color: "#ffd700", description: "Awarded for submitting 25 reports." },

  { id: 4, name: "Location Helper", type: "accuracy", requirement: 50, icon: "📍", color: "#1abc9c", description: "Your average accuracy is above 50%." },
  { id: 5, name: "Sharp Locator", type: "accuracy", requirement: 70, icon: "🎯", color: "#3498db", description: "Your location accuracy is above 70%." },
  { id: 6, name: "Geo Expert", type: "accuracy", requirement: 85, icon: "🧭", color: "#9b59b6", description: "Your accuracy is above 85%." },

  { id: 7, name: "Community Helper", type: "impact", requirement: 1, icon: "🤝", color: "#2ecc71", description: "At least 1 of your reports helped fix an issue." },
  { id: 8, name: "Infrastructure Fixer", type: "impact", requirement: 5, icon: "🛠️", color: "#f1c40f", description: "5 of your reports contributed to a fix." },
  { id: 9, name: "Urban Guardian", type: "impact", requirement: 15, icon: "🌆", color: "#e67e22", description: "15 impactful reports!" },
];

const Badges = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Determine which badges are the user's "next targets"
  const nextBadges = badgeRules
    .filter((b) => {
      const value =
        b.type === "reports"
          ? userStats.reports
          : b.type === "accuracy"
          ? userStats.accuracy
          : userStats.impact;

      return value < b.requirement;
    })
    .sort((a, b) => a.requirement - b.requirement)
    .slice(0, 3); // top 3 closest badges

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <Sidebar />

      <div className="badges-container">

        {/* SUMMARY */}
        <h2 className="page-title">Your Badge Progress</h2>

        <div className="summary-card">
          <h3>Level {userLevel}</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${userLevel}%` }}></div>
          </div>
          <p className="stats-row">
            Reports: <strong>{userStats.reports}</strong> &nbsp; | &nbsp;
            Accuracy: <strong>{userStats.accuracy}%</strong> &nbsp; | &nbsp;
            Impact: <strong>{userStats.impact}</strong>
          </p>
        </div>

        {/* NEXT BADGES */}
        <h3 className="section-title">Next Badges You Can Unlock</h3>

        <div className="next-badges-grid">
          {nextBadges.map((badge) => {
            const value =
              badge.type === "reports"
                ? userStats.reports
                : badge.type === "accuracy"
                ? userStats.accuracy
                : userStats.impact;

            const progress = Math.min((value / badge.requirement) * 100, 100);

            return (
              <div key={badge.id} className="next-badge-card">
                <div className="next-badge-header">
                  <span className="next-badge-icon">{badge.icon}</span>
                  <h4>{badge.name}</h4>
                </div>

                <p className="next-badge-req">
                  {value}/{badge.requirement} {badge.type}
                </p>

                <div className="small-progress-bar">
                  <div className="small-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BADGE COLLECTION */}
        <h3 className="section-title">All Badges</h3>

        <div className="badges-grid">
          {badgeRules.map((badge) => {
            const userValue =
              badge.type === "reports"
                ? userStats.reports
                : badge.type === "accuracy"
                ? userStats.accuracy
                : userStats.impact;

            const achieved = userValue >= badge.requirement;

            return (
              <div
                key={badge.id}
                className={`badge-card ${achieved ? "achieved" : "locked"}`}
                onClick={() => setSelectedBadge(badge)}
              >
                <div className="badge-icon" style={{ background: achieved ? badge.color : "#555" }}>
                  {badge.icon}
                </div>
                <h4>{badge.name}</h4>
                <p className="requirement-text">
                  {achieved ? "Unlocked" : `Requires ${badge.requirement} ${badge.type}`}
                </p>
              </div>
            );
          })}
        </div>

        {/* MODAL */}
        {selectedBadge && (
          <div className="badge-modal-overlay" onClick={() => setSelectedBadge(null)}>
            <div className="badge-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-badge-modal" onClick={() => setSelectedBadge(null)}>×</button>

              <div className="modal-badge-icon" style={{ background: selectedBadge.color }}>
                {selectedBadge.icon}
              </div>

              <h2>{selectedBadge.name}</h2>
              <p className="badge-description">{selectedBadge.description}</p>

              {/* Progress inside modal */}
              <p className="modal-progress-label">
                Progress toward unlocking:
              </p>

              {(() => {
                const val =
                  selectedBadge.type === "reports"
                    ? userStats.reports
                    : selectedBadge.type === "accuracy"
                    ? userStats.accuracy
                    : userStats.impact;

                const percent = Math.min((val / selectedBadge.requirement) * 100, 100);

                return (
                  <>
                    <div className="modal-progress-bar">
                      <div className="modal-progress-fill" style={{ width: `${percent}%` }}></div>
                    </div>

                    <p className="modal-progress-number">
                      {val} / {selectedBadge.requirement} {selectedBadge.type}
                    </p>
                  </>
                );
              })()}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Badges;
