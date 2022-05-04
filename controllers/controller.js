const db = require("../models/db.model");
const Usuario = db.usuarios;
const Conversa = db.conversas;
const Op = db.Sequelize.Op;
const webhooks = require("node-webhooks");
// Create and Save a new Usuario
exports.createUsuario = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.json({
      message: err || "Conteúdo não pode estar vazio!",
    });
  }

  // Create a Usuario
  await Usuario.create({
    usu_nome: req.body.usu_nome,
    usu_email: req.body.usu_email,
    usu_senha: req.body.usu_senha,
    usu_data_nascimento: req.body.usu_data_nascimento,
    usu_telefone: req.body.usu_telefone,
    usu_cep: req.body.usu_cep,
    usu_endereco: req.body.usu_endereco,
    usu_numero: req.body.usu_numero,
    usu_complemento: req.body.usu_complemento,
    usu_bairro: req.body.usu_bairro,
    usu_cidade: req.body.usu_cidade,
    usu_estado: req.body.usu_estado,
    usu_foto: req.body.usu_foto,
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Erro encontrado ao criar usuário novo.",
      });
    });
};
// Create and Save a new Conversa
exports.createConversa = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.json({
      message: err || "Conteúdo não pode estar vazio!",
    });
  }

  // Save Conversa in the database
  await Conversa.create({
    con_fk_usu_codigo: 1,
    con_usu_identificador: req.body.con_usu_identificador,
    con_messagens: req.body.con_messagens,
    con_cliente: req.body.con_cliente,
    con_chat_id: req.body.con_chat_id,
    con_chat_name: req.body.con_chat_name,
    con_from_me: req.body.con_from_me,
  })
    .then((data) => {
      const hooks = registerHooks();
      hooks.trigger("callback_hook", {
        msg: "Nova conversa criada.",
        data: data.dataValues,
      });
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Erro encontrado ao criar conversa nova.",
      });
    });
};
// Retrieve all Usuarios from the database.
exports.findAllUsuario = async (req, res) => {
  Usuario.findAll()
    .then((data) => {
      if (data.length < 1 && data.every((talk) => talk instanceof Conversa)) {
        return res.send({
          message: "Nenhum usuário encontrado.",
        });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Erro encontrado ao buscar usuários.",
      });
    });
};
// Retrieve all Conversas from the database.
exports.findAllConversa = (req, res) => {
  Conversa.findAll()
    .then((data) => {
      if (data.length < 1 && data.every((talk) => talk instanceof Conversa)) {
        return res.send({
          message: "Nenhuma conversa encontrada.",
        });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Erro encontrado ao buscar conversas.",
      });
    });
};
// Find a single Usuario with an id
exports.findOneUsuario = (req, res) => {
  Usuario.findByPk(req.query.id)
    .then((data) => {
      if (!data) {
        return res.send({
          message: "Usuário não encontrado com id = " + req.query.id,
        });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro ao buscar usuário com id = " + req.query.id,
      });
    });
};
// Find a single Usuario with an email
exports.findOneUsuarioByEmail = (req, res) => {
  Usuario.findOne({ where: { usu_email: req.query.email } })
    .then((data) => {
      if (!data) {
        return res.send({
          message: "Usuário não encontrado com e-mail = " + req.query.email,
        });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro ao buscar usuário com e-mail = " + req.query.email,
      });
    });
};
// Find a single Conversa with an id
exports.findOneConversa = (req, res) => {
  Conversa.findByPk(req.query.id)
    .then((data) => {
      if (!data) {
        return res.send({
          message: "Conversa não encontrada com id = " + req.query.id,
        });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro ao buscar coversa com id = " + req.query.id,
      });
    });
};
// Update a Usuario by the id in the request
exports.updateUsuario = (req, res) => {
  const id = req.query.id;

  Usuario.update(req.body, {
    where: { usu_codigo: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Usuario foi atualizado com sucesso!",
        });
      } else {
        return res.send({
          message: `Não foi possível atualizar o usuário com id = ${id}. Talvez o usuário não exista ou o body veio vazio.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro ao atualizar o usuário com o id = " + id,
      });
    });
};
// Update a Conversa by the id in the request
exports.updateConversa = (req, res) => {
  const id = req.query.id;

  Conversa.update(req.body, {
    where: { con_codigo: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Conversa foi atualizada com sucesso!",
        });
      } else {
        return res.send({
          message: `Não foi possível atualizar a conversa com id = ${id}. Talvez a conversa não exista ou o body veio vazio.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro ao atualizar a conversa com o id = " + id,
      });
    });
};
// Delete a Usuario with the specified id in the request
exports.deleteUsuario = (req, res) => {
  const id = req.query.id;

  Usuario.destroy({
    where: { usu_codigo: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Usuario foi deletado com sucesso!",
        });
      } else {
        return res.send({
          message: `Não foi possível deletar o usuário com id = ${id}. Talvez o usuário não exista.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro ao deletar o usuário com o id = " + id,
      });
    });
};
// Delete a Conversa with the specified id in the request
exports.deleteConversa = (req, res) => {
  const id = req.query.id;

  Conversa.destroy({
    where: { con_codigo: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Conversa foi deletada com sucesso!",
        });
      } else {
        return res.send({
          message: `Não foi possível deletar a conversa com id = ${id}. Talvez a conversa não exista.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro ao deletar a conversa com o id = " + id,
      });
    });
};
// Delete all Usuarios from the database.
exports.deleteAllUsuario = (req, res) => {
  Usuario.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      return res.send({
        message: `${nums} Usuarios were deleted successfully!`,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while removing all usuários.",
      });
    });
};
// Delete all Conversas from the database.
exports.deleteAllConversa = (req, res) => {
  Conversa.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      return res.send({
        message: `${nums} Conversas were deleted successfully!`,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while removing all conversas.",
      });
    });
};

const registerHooks = () => {
  return new webhooks({
    db: {
      callback_hook: ["http://localhost:3001/webhook-client"],
    },
  });
};
