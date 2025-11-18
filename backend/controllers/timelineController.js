const { Timeline, Report } = require("../models");
const cloudinary = require("../config/cloudinary");

exports.getTimeline = async (req, res) => {
  try {
    const reportId = req.params.id;

    const timeline = await Timeline.findAll({
      where: { report_id: reportId },
      order: [["createdAt", "ASC"]],
    });

    res.json({ timeline });
  } catch (error) {
    console.error("GET TIMELINE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addTimeline = async (req, res) => {
  try {
    const { text, status } = req.body;
    const reportId = req.params.id;

    let imageUrl = null;
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      imageUrl = upload.secure_url;
    }

    // Save timeline entry
    const entry = await Timeline.create({
      report_id: reportId,
      text,
      status,
      added_by: "Admin",
      image_url: imageUrl,
    });

    // Update report status automatically
    const report = await Report.findByPk(reportId);
    report.status = status;
    await report.save();

    res.json({ message: "Timeline updated", entry });
  } catch (error) {
    console.error("ADD TIMELINE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
