const { Report, User } = require("../models");

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: [{ model: User, attributes: ["full_name", "email"] }],
      order: [["createdAt", "DESC"]],
    });

    res.json({ reports });
  } catch (error) {
    console.error("ADMIN REPORTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["full_name", "email"] }],
    });

    res.json({ report });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);

    report.status = req.body.status;
    await report.save();

    res.json({ success: true, report });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addTimelineEntry = async (req, res) => {
  res.json({ success: true });
};
