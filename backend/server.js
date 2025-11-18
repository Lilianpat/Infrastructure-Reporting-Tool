const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
require("./models");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const userRoutes = require("./routes/userRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const contactRoutes = require("./routes/contactRoutes");
const auth = require("./middleware/authMiddleware");
const isAdmin = require("./middleware/adminMiddleware");
const adminUserRoutes = require("./routes/adminUserRoutes");
// const adminReportRoutes = require("./routes/adminReportRoutes"); // if you have it

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);          // login & register
app.use("/api/reports", reportRoutes);     // reports
app.use("/api/users", userRoutes);          // profile, stats, update
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/users", auth, isAdmin, adminUserRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/admin/reports", require("./routes/adminReportRoutes"));
app.use("/api/timeline", require("./routes/timelineRoutes"));
app.use("/api/admin/users", require("./routes/adminUserRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));


sequelize
  .sync()
  .then(() => console.log("Database synced."))
  .catch((err) => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
