module.exports = (sequelize, Sequelize) => {
  const Conversas = sequelize.define(
    "conversas",
    {
      con_codigo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      con_fk_usu_codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      con_messagens: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      con_data_hora: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      con_cliente: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      con_chat_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Conversas;
};
