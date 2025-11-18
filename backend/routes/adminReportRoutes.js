const express = require("express");
const router = express.Router();
const adminReportController = require("../controllers/adminReportController");
const auth = require("../middleware/authMiddleware");

// GET ALL REPORTS
router.get("/", auth, adminReportController.getAllReports);

// GET SINGLE REPORT
router.get("/:id", auth, adminReportController.getReportById);

// UPDATE STATUS
router.put("/:id/status", auth, adminReportController.updateStatus);

// ADD TIMELINE ENTRY
router.post("/:id/timeline", auth, adminReportController.addTimelineEntry);

module.exports = router;
