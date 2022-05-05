const db = require("../models/db.model");
const User = db.users;
const Talk = db.talks;
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
// Create and Save a new Talk
exports.createTalk = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.json({
      message: err || "Conteúdo não pode estar vazio!",
    });
  }

  // Save Talk in the database
  await Talk.create({
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
        message: err.message || "Erro encontrado ao criar talk nova.",
      });
    });
};
// Retrieve all Users from the database.
exports.findAllUser = async (req, res) => {
  User.findAll()
    .then((data) => {
      if (data.length < 1 && data.every((talk) => talk instanceof Talk)) {
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
// Retrieve all Talks from the database.
exports.findAllTalk = (req, res) => {
  Talk.findAll({
    order: [["con_chat_id", "con_data_hora"]],
  })
    .then((data) => {
      if (data.length < 1 && data.every((talk) => talk instanceof Talk)) {
        return res.send({
          message: "Nenhuma talk encontrada.",
        });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Erro encontrado ao buscar talks.",
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
// Find a single Talk with an id
exports.findOneTalk = (req, res) => {
  Talk.findByPk(req.query.id)
    .then((data) => {
      if (!data) {
        return res.send({
          message: "Talk não encontrada com id = " + req.query.id,
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
// Update a Talk by the id in the request
exports.updateTalk = (req, res) => {
  const id = req.query.id;

  Talk.update(req.body, {
    where: { con_codigo: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Talk foi atualizada com sucesso!",
        });
      } else {
        return res.send({
          message: `Não foi possível atualizar a talk com id = ${id}. Talvez a talk não exista ou o body veio vazio.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro ao atualizar a talk com o id = " + id,
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
// Delete a Talk with the specified id in the request
exports.deleteTalk = (req, res) => {
  const id = req.query.id;

  Talk.destroy({
    where: { con_codigo: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Talk foi deletada com sucesso!",
        });
      } else {
        return res.send({
          message: `Não foi possível deletar a talk com id = ${id}. Talvez a talk não exista.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro ao deletar a talk com o id = " + id,
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
// Delete all Talks from the database.
exports.deleteAllTalk = (req, res) => {
  Talk.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      return res.send({
        message: `${nums} Talks were deleted successfully!`,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while removing all talks.",
      });
    });
};
