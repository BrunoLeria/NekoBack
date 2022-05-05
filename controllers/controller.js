const db = require("../models/db.model");
const User = db.users;
const Conversa = db.conversas;
const Op = db.Sequelize.Op;
// Create and Save a new User
exports.createUser = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.json({
      message: err || "Conteúdo não pode estar vazio!",
    });
  }

  // Create a User
  await User.create({
    usu_name: req.body.usu_name,
    usu_email: req.body.usu_email,
    usu_password: req.body.usu_password,
    usu_birthday: req.body.usu_birthday,
    usu_phone: req.body.usu_phone,
    usu_postal_code: req.body.usu_postal_code,
    usu_adress: req.body.usu_adress,
    usu_street_number: req.body.usu_street_number,
    usu_complement: req.body.usu_complement,
    usu_neighborhood: req.body.usu_neighborhood,
    usu_city: req.body.usu_city,
    usu_state: req.body.usu_state,
    usu_foreign: req.body.usu_foreign,
    usu_photo: req.body.usu_photo,
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
    con_fk_usu_identification: 1,
    con_message: req.body.con_message,
    con_date_time: req.body.con_date_time,
    con_client: req.body.con_client,
    con_chat_id: req.body.con_chat_id,
    con_chat_name: req.body.con_chat_name,
    con_from_me: req.body.con_from_me,
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Erro encontrado ao criar conversa nova.",
      });
    });
};
// Retrieve all Users from the database.
exports.findAllUser = async (req, res) => {
  User.findAll()
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
  Conversa.findAll({
    order: [["con_chat_id", "con_data_hora"]],
  })
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
// Find a single User with an id
exports.findOneUser = (req, res) => {
  User.findByPk(req.query.id)
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
// Find a single User with an email
exports.findOneUserByEmail = (req, res) => {
  User.findOne({ where: { usu_email: req.query.email } })
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
// Update a User by the id in the request
exports.updateUser = (req, res) => {
  const id = req.query.id;

  User.update(req.body, {
    where: { usu_codigo: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "User foi atualizado com sucesso!",
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
// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.query.id;

  User.destroy({
    where: { usu_codigo: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "User foi deletado com sucesso!",
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
// Delete all Users from the database.
exports.deleteAllUser = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      return res.send({
        message: `${nums} Users were deleted successfully!`,
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
