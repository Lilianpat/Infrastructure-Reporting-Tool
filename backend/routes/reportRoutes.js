const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
const { Report } = require("../models");

const {
  createReport,
  getMyReports,
  getUserStats,
  getRecentReports
} = require("../controllers/reportController");

// Create report
router.post("/create", auth, upload.single("image"), createReport);

// My reports
router.get("/mine", auth, getMyReports);

// Dashboard Stats (original)
router.get("/stats", auth, getUserStats);

// Recent reports
router.get("/recent", auth, getRecentReports);

// Badge page stats (custom stats)
router.get("/stats/badges", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Report.count({ where: { user_id: userId } });
    const resolved = await Report.count({ where: { user_id: userId, status: "Resolved" } });

    // Temporary accuracy system
    const accuracy = total === 0 ? 0 : Math.floor(Math.random() * 40) + 60;

    res.json({
      total,
      resolved,
      accuracy
    });
  } catch (err) {
    console.error("BADGE STATS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
