module.exports = (sequelize, Sequelize) => {
    const Conversas = sequelize.define("conversas", {
      con_codigo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      con_fk_usu_codigo: {
        type: Sequelize.INTEGER,
      },
      con_messagens: {
        type: Sequelize.STRING,
      },
      con_data_hora: {
        type: Sequelize.DATE,
      },
      con_cliente: {
        type: Sequelize.STRING,
      },
    });
    return Conversas;
  };
  