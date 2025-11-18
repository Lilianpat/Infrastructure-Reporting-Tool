const { User, Report } = require("../models");
const cloudinary = require("../config/cloudinary");
const bcrypt = require("bcryptjs");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Count reports
    const totalReports = await Report.count({ where: { user_id: userId } });
    const pending = await Report.count({
      where: { user_id: userId, status: "Pending" }
    });
    const resolved = await Report.count({
      where: { user_id: userId, status: "Resolved" }
    });
    const inProgress = await Report.count({
      where: { user_id: userId, status: "In Progress" }
    });

    return res.status(200).json({
      points: user.points,
      badges: user.badges || [],
      totalReports,
      pending,
      resolved,
      inProgress
    });

  } catch (err) {
    console.error("DASHBOARD STATS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Text fields
    const { fullName, email, phone, location } = req.body;
    user.full_name = fullName || user.full_name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.location = location || user.location;

    // Avatar upload (if exists)
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      user.avatar_url = result.secure_url;
    }

    await user.save();

    res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);

    const valid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!valid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password_hash = hashed;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProfileData = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    // This error will be caught by the route and turned into 500
    throw new Error("User not found");
  }

  return {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    points: user.points || 0,
    badges: user.badges || [],
  };
};

