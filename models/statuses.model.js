module.exports = (sequelize, Sequelize) => {
  const Statuses = sequelize.define(
    "statuses",
    {
      sts_identification: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sts_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      sts_description: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Statuses;
};
