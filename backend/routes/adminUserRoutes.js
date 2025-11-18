const express = require("express");
const router = express.Router();
const { User, Student, Staff, ServiceProvider, Report } = require("../models");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/authMiddleware");
const { Op } = require("sequelize");

// GET ALL USERS (excluding admins)
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: { [Op.ne]: "admin" }  // EXCLUDE ADMIN HERE
      },
      include: [
        { model: Student },
        { model: Staff },
        { model: ServiceProvider }
      ],
      order: [["createdAt", "DESC"]],
    });

    // Count reports per user
    const mapped = await Promise.all(
      users.map(async (u) => {
        const count = await Report.count({ where: { user_id: u.id } });

        return {
          id: u.id,
          full_name: u.full_name,
          email: u.email,
          role: u.role,
          avatar_url: u.avatar_url,
          active: u.active,
          createdAt: u.createdAt,
          reports: count,

          // Student fields
          registration_number: u.Student?.registration_number || null,
          student_department: u.Student?.department || null,

          // Staff fields
          staff_number: u.Staff?.staff_number || null,
          staff_department: u.Staff?.department || null,

          // Service Provider fields
          business_name: u.ServiceProvider?.business_name || null,
          service_type: u.ServiceProvider?.service_type || null,
          address: u.ServiceProvider?.address || null,
        };
      })
    );

    res.json({ users: mapped });


  } catch (error) {
    console.error("ADMIN GET USERS ERROR:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});


// UPDATE USER STATUS (activate / suspend)
router.put("/:id/status", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.active = !user.active;   // Toggle status
    await user.save();

    res.json({ message: "Status updated", active: user.active });

  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error);
    res.status(500).json({ message: "Error updating status" });
  }
});

router.get("/role/:role", async (req, res) => {
  try {
    const { role } = req.params;

    const users = await User.findAll({
      where: { role },
      include: [
        { model: Student },
        { model: Staff },
        { model: ServiceProvider }
      ]
    });

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch by role" });
  }
});


// RESET PASSWORD
router.put("/:id/reset-password", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newPassword = "InfraWatch" + Math.floor(Math.random() * 10000);

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password_hash = hashed;
    await user.save();

    res.json({
      message: "Password reset successfully",
      newPassword
    });

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
});

module.exports = router;
