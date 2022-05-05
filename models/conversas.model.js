module.exports = (sequelize, Sequelize) => {
  const Conversas = sequelize.define(
    "conversas",
    {
      con_identification: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      con_fk_usu_identification: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      con_message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      con_date_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      con_client: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      con_chat_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      con_chat_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      con_from_me: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Conversas;
};
