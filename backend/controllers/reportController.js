const { Report, User } = require("../models");
const awardBadges = require("../utils/awardBadges");

// --------------------------------------
// CREATE REPORT + Award Points + Badges
// --------------------------------------

exports.createReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      title,
      description,
      category,
      category_id,
      location,
      latitude,
      longitude,
    } = req.body;

    const image_url = req.file ? req.file.path : null;

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    const newReport = await Report.create({
      user_id: userId,
      title,
      description,
      category,
      location_text: location,
      latitude: isNaN(lat) ? null : lat,
      longitude: isNaN(lng) ? null : lng,
      category_id,
      image_url
    });

    // Award points
    const user = await User.findByPk(userId);
    user.points += 10; // +10 points per report
    await user.save();

    // Award badges
    const newBadges = await awardBadges(user);

    return res.status(201).json({
      message: "Issue submitted successfully",
      report: newReport,
      pointsEarned: 10,
      newBadges: newBadges || []
    });

  } catch (error) {
    console.error("CREATE REPORT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// --------------------------------------
// Get My Reports
// --------------------------------------

exports.getMyReports = async (req, res) => {
  try {
    const userId = req.user.id;

    const reports = await Report.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
    });

    res.json({ reports });
  } catch (error) {
    console.error("GET MY REPORTS ERROR:", error);
    res.status(500).json({ message: "Server error fetching reports" });
  }
};

exports.getRecentReports = async (req, res) => {
  try {
    const userId = req.user.id;

    const reports = await Report.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
      limit: 5
    });

    res.json({ reports });

  } catch (error) {
    console.error("RECENT REPORTS ERROR:", error);
    res.status(500).json({ message: "Error fetching recent reports" });
  }
};


// --------------------------------------
// Get User Stats for Dashboard
// --------------------------------------

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const pending = await Report.count({ where: { user_id: userId, status: "Pending" } });
    const inProgress = await Report.count({ where: { user_id: userId, status: "In Progress" } });
    const resolved = await Report.count({ where: { user_id: userId, status: "Resolved" } });

    const user = await User.findByPk(userId);

    return res.json({
      pending,
      inProgress,
      resolved,
      total: pending + inProgress + resolved,
      points: user.points,
      badges: user.badges || []
    });

  } catch (error) {
    console.error("USER STATS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
