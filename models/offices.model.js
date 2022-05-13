module.exports = (sequelize, Sequelize) => {
  const Offices = sequelize.define(
    "offices",
    {
      ofc_identification: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ofc_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      ofc_description: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Offices;
};
