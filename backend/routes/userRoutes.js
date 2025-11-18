const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  getProfile,
  updateProfile,
  getDashboardStats,
  changePassword
} = require("../controllers/userController");

// GET current logged-in user
router.get("/me", auth, getProfile);

// Update profile
router.put("/update", auth, upload.single("avatar"), updateProfile);

// Dashboard stats
router.get("/dashboard-stats", auth, getDashboardStats);

// Change password
router.put("/change-password", auth, changePassword);

module.exports = router;
