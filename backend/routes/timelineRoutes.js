const express = require("express");
const router = express.Router();
const timelineController = require("../controllers/timelineController");
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");

// Get timeline
router.get("/:id", auth, timelineController.getTimeline);

// Add timeline entry + image upload
router.post("/:id", auth, upload.single("image"), timelineController.addTimeline);

module.exports = router;
