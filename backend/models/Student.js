module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      registration_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: "Students",
      timestamps: true
    }
  );

  return Student;
};
