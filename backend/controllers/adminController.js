const { Report } = require("../models");

exports.getAdminStats = async (req, res) => {
  try {
    const total = await Report.count();
    const pending = await Report.count({ where: { status: "Pending" } });
    const inProgress = await Report.count({ where: { status: "In Progress" } });
    const resolved = await Report.count({ where: { status: "Resolved" } });

    return res.json({ total, pending, inProgress, resolved });

  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
