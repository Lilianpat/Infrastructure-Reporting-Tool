const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Load models
const User = require("./User")(sequelize, DataTypes);
const Student = require("./Student")(sequelize, DataTypes);
const Staff = require("./Staff")(sequelize, DataTypes);
const ServiceProvider = require("./ServiceProvider")(sequelize, DataTypes);
const Report = require("./Report")(sequelize, DataTypes);
const ContactMessage = require("./ContactMessage")(sequelize, DataTypes);
const Timeline = require("./Timeline")(sequelize, DataTypes);
const Category = require("./Category")(sequelize, DataTypes);


// Relationships
User.hasOne(Student, { foreignKey: "user_id" });
Student.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Staff, { foreignKey: "user_id" });
Staff.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(ServiceProvider, { foreignKey: "user_id" });
ServiceProvider.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Report, { foreignKey: "user_id" });
Report.belongsTo(User, { foreignKey: "user_id" });

Report.hasMany(Timeline, { foreignKey: "report_id" });
Timeline.belongsTo(Report, { foreignKey: "report_id" });

Category.hasMany(Report, { foreignKey: "category_id" });
Report.belongsTo(Category, { foreignKey: "category_id" });


// Export all models
module.exports = {
  sequelize,
  User,
  Student,
  Staff,
  ServiceProvider,
  Report,
  ContactMessage,
  Timeline,
  Category
};
