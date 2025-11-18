const { type } = require("@testing-library/user-event/dist/type");

// backend/models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM("student", "staff", "service_provider", "admin"),
        defaultValue: "student"
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      avatar_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      badges: {
        type: DataTypes.JSON,
        defaultValue: []
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },

    },
    {
      tableName: "Users",
      timestamps: true
    }
  );

  return User;
};
