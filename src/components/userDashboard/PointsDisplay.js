"use client"

import { useState, useEffect } from "react"

const PointsDisplay = ({ userId }) => {
  const [userDashboardStats, setUserDashboardStats] = useState({
    totalPoints: 0,
    badges: [],
    rank: 0,
    nextBadge: null,
  })

  useEffect(() => {
    fetchUserDashboardStats()
  }, [userId])

  const fetchUserDashboardStats = async () => {
    try {
      // Mock data - replace with actual API call later
      const mockStats = {
        totalPoints: 250,
        badges: [
          { id: 1, name: "First Reporter", description: "Submitted first report", icon: "🥇" },
          { id: 2, name: "Community Helper", description: "Reached 50 points", icon: "🌟" },
          { id: 3, name: "Issue Detective", description: "Reached 100 points", icon: "🕵️" },
        ],
        rank: 15,
        nextBadge: { name: "Campus Guardian", pointsRequired: 300, currentPoints: 250, progress: 83 },
      }
      setUserDashboardStats(mockStats)
    } catch (error) {
      console.error("Error fetching user dashboard stats:", error)
    }
  }

  return (
    <div className="user-dashboard-card points-display">
      <div className="card-header">
        <h3>My Impact</h3>
        <div className="user-rank">Rank: #{userDashboardStats.rank}</div>
      </div>

      <div className="total-points">
        <span className="points-number">{userDashboardStats.totalPoints}</span>
        <span className="points-label">Total Points</span>
      </div>

      <div className="badges-section">
        <h4>Badges Earned</h4>
        <div className="badges-list">
          {userDashboardStats.badges.map((badge) => (
            <div key={badge.id} className="badge-item">
              <div className="badge-icon">{badge.icon}</div>
              <div className="badge-info">
                <div className="badge-name">{badge.name}</div>
                <div className="badge-desc">{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {userDashboardStats.nextBadge && (
        <div className="next-badge">
          <h4>Next Badge Progress</h4>
          <div className="badge-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${userDashboardStats.nextBadge.progress}%` }}></div>
            </div>
            <div className="progress-text">
              {userDashboardStats.nextBadge.name} ({userDashboardStats.nextBadge.currentPoints}/
              {userDashboardStats.nextBadge.pointsRequired} pts)
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PointsDisplay
