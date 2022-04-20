module.exports = (sequelize, Sequelize) => {
  const Usuarios = sequelize.define("usuarios", {
    usu_codigo: {
      type: Sequelize.INTEGER,
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
  });
  const Conversas = sequelize.define("conversas", {
    con_codigo: {
      type: Sequelize.INTEGER,
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
  return [Usuarios, Conversas];
};
