module.exports = (sequelize, DataTypes) => {
  const ServiceProvider = sequelize.define(
    "ServiceProvider",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      business_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      service_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: "ServiceProviders",
      timestamps: true
    }
  );

  return ServiceProvider;
};
