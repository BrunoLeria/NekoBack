module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      usu_identification: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usu_name: {
        type: Sequelize.STRING,
      },
      usu_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      usu_password: {
        type: Sequelize.STRING,
      },
      usu_birthday: {
        type: Sequelize.DATEONLY,
      },
      usu_phone: {
        type: Sequelize.INTEGER,
      },
      usu_postal_code: {
        type: Sequelize.INTEGER,
      },
      usu_adress: {
        type: Sequelize.STRING,
      },
      usu_street_number: {
        type: Sequelize.INTEGER,
      },
      usu_complement: {
        type: Sequelize.STRING,
      },
      usu_neighborhood: {
        type: Sequelize.STRING,
      },
      usu_city: {
        type: Sequelize.STRING,
      },
      usu_state: {
        type: Sequelize.STRING,
      },
      usu_foreign: {
        type: Sequelize.BOOLEAN,
      },
      usu_photo: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Users;
};
