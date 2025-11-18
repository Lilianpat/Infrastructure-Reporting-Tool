// backend/routes/leaderboardRoutes.js
const express = require("express");
const router = express.Router();
const { User, Report } = require("../models");
const auth = require("../middleware/authMiddleware");

// GET leaderboard
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Report,
          attributes: ["status"],
        },
      ],
    });

    // ✅ REMOVE ADMINS
    const nonAdminUsers = users.filter((u) => u.role !== "admin");

    const formatted = nonAdminUsers.map((u) => {
      const totalReports = u.Reports.length;
      const impact = u.Reports.filter((r) => r.status === "Resolved").length;

      // Placeholder accuracy until you track it properly
      const accuracy = 80;

      const points = Math.floor(
        totalReports * 1.5 + accuracy * 0.6 + impact * 3
      );

      return {
        id: u.id,
        name: u.full_name,
        avatar:
          u.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            u.full_name
          )}&background=1abc9c&color=fff`,
        reports: totalReports,
        accuracy,
        impact,
        points,
        badges: u.badges || [],
      };
    });

    res.json({ users: formatted });
  } catch (error) {
    console.error("LEADERBOARD ERROR:", error);
    res.status(500).json({ message: "Error loading leaderboard" });
  }
});

module.exports = router;
