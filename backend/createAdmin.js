const bcrypt = require("bcryptjs");
const { User } = require("./models");
const sequelize = require("./config/database");

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      full_name: "Ekperah David",
      email: "admin@infrawatch.com",
      password_hash: hashedPassword,
      role: "admin",
      verified: true,
      points: 0,
      badges: []
    });

    console.log("Admin created successfully:", admin.toJSON());
    process.exit();

  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
