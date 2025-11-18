const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");

// Only allow admins
router.get("/stats", auth, adminController.getAdminStats);

module.exports = router;
