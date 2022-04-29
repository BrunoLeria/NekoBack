module.exports = (sequelize, Sequelize) => {
  const Usuarios = sequelize.define(
    "usuarios",
    {
      usu_codigo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usu_identificador: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      usu_nome: {
        type: Sequelize.STRING,
      },
      usu_email: {
        type: Sequelize.STRING,
      },
      usu_senha: {
        type: Sequelize.STRING,
      },
      usu_data_nascimento: {
        type: Sequelize.DATEONLY,
      },
      usu_telefone: {
        type: Sequelize.INTEGER,
      },
      usu_cep: {
        type: Sequelize.INTEGER,
      },
      usu_endereco: {
        type: Sequelize.STRING,
      },
      usu_numero: {
        type: Sequelize.INTEGER,
      },
      usu_complemento: {
        type: Sequelize.STRING,
      },
      usu_cidade: {
        type: Sequelize.STRING,
      },
      usu_estado: {
        type: Sequelize.STRING,
      },
      usu_foto: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Usuarios;
};
