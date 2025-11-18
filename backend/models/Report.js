
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define("Report", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location_text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("Pending", "In Progress", "Resolved"),
      defaultValue: "Pending"
    },
    category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: "Categories",
    key: "id"
    }
  }

  });

  return Report;
};
