module.exports = (sequelize, DataTypes) => {
  const Timeline = sequelize.define("Timeline", {
    report_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    added_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Update", 
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  return Timeline;
};
