const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ReportTimeline = sequelize.define("ReportTimeline", {
  note: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM("Pending", "In Progress", "Resolved"),
    allowNull: false
  }
});

module.exports = ReportTimeline;
