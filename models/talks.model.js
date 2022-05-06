module.exports = (sequelize, Sequelize) => {
  const Talks = sequelize.define(
    "talks",
    {
      tlk_identification: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      tlk_fk_usu_identification: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tlk_message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tlk_date_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      tlk_client: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tlk_chat_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tlk_chat_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tlk_from_me: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Talks;
};