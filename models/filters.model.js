module.exports = (sequelize, Sequelize) => {
  const Filters = sequelize.define(
    "filters",
    {
      ftr_identification: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ftr_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      ftr_description: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Filters;
};
