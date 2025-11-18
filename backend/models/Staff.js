module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    "Staff",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      staff_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: "Staff",
      timestamps: true
    }
  );

  return Staff;
};
