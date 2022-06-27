const db = require("../models/db.model");
const User = db.users;
const Talk = db.talks;
const Statuses = db.statuses;
const Offices = db.offices;
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
    usu_address: req.body.usu_address,
    usu_street_number: req.body.usu_street_number,
    usu_complement: req.body.usu_complement,
    usu_neighborhood: req.body.usu_neighborhood,
    usu_city: req.body.usu_city,
    usu_state: req.body.usu_state,
    usu_foreign: req.body.usu_foreign,
    usu_photo: req.body.usu_photo,
    usu_fk_ofc_identification: req.body.usu_fk_ofc_identification,
    usu_fk_sts_identification: req.body.usu_fk_sts_identification,
    usu_is_admin: req.body.usu_is_admin,
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
  await Talk.findOne({ where: { tlk_chat_id: req.body.tlk_chat_id } })
    .then(async (data) => {
      // Save Talk in the database
      await Talk.create({
        tlk_fk_usu_identification: data ? data.tlk_fk_usu_identification : 1,
        tlk_message: req.body.tlk_message,
        tlk_date_time: req.body.tlk_date_time,
        tlk_client: req.body.tlk_client,
        tlk_chat_id: req.body.tlk_chat_id,
        tlk_chat_name: req.body.tlk_chat_name,
        tlk_from_me: req.body.tlk_from_me,
        tlk_robot_instance: req.body.tlk_robot_instance,
        tlk_robot_token: req.body.tlk_robot_token,
      })
        .then((data) => {
          return res.status(200).send(data);
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message || "Erro encontrado ao criar conversa nova.",
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Erro encontrado ao validar conversas existentes",
      });
    });
};
// Retrieve all Users from the database.
exports.findAllUser = async (req, res) => {
  User.findAll()
    .then((data) => {
      if (data.length < 1 && data.every((user) => user instanceof User)) {
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
// Retrieve all Users from the database.
exports.findAllTeam = async (req, res) => {
  User.findAll({
    attributes: [
      "usu_identification",
      "usu_name",
      "usu_photo",
      "usu_fk_ofc_identification",
      "usu_fk_sts_identification",
      "usu_is_admin",
    ],
    where: {
      usu_identification: {
        [Op.not]: req.query.id,
      },
    },
  })
    .then((data) => {
      if (data.length < 1 && data.every((user) => user instanceof User)) {
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
    order: [["tlk_date_time", "DESC"], ["tlk_chat_id"]],
  })
    .then((data) => {
      if (data.length < 1 && data.every((talk) => talk instanceof Talk)) {
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

//Find all status from the database.
exports.findAllStatuses = (req, res) => {
  Statuses.findAll()
    .then((data) => {
      if (data.length < 1 || data == null) {
        return res.send({
          message: "Nenhum status encontrado.",
        });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Erro encontrado ao buscar status.",
      });
    });
};

//Find all status from the database.
exports.findAllOffices = (req, res) => {
  Offices.findAll({
    attributes: [
      ["ofc_identification", "id"],
      ["ofc_description", "name"],
    ],
  })
    .then((data) => {
      if (data.length < 1 || data == null) {
        return res.send({
          message: "Nenhum cargo encontrado.",
        });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Erro encontrado ao cargo status.",
      });
    });
};

// Retrieve one Talk.
exports.findOneTalkByChatId = (req, res) => {
  Talk.findAll({
    where: { tlk_chat_id: req.query.id },
    order: [["tlk_date_time"], ["tlk_chat_id"]],
  })
    .then((data) => {
      if (data.length < 1 && data.every((talk) => talk instanceof Talk)) {
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
// Find all Talks from the database with a given user id
exports.findAllTalkByUser = (req, res) => {
  const maxDaysFromLastMessage = new Date();
  maxDaysFromLastMessage.setDate(maxDaysFromLastMessage.getDate() - 30);

  Talk.findAll({
    where: {
      tlk_fk_usu_identification: {
        [Op.or]: [1, req.query.id],
      },
      tlk_date_time: {
        [Op.gt]: maxDaysFromLastMessage,
      },
    },
    order: [["tlk_date_time"], ["tlk_chat_id"]],
  })
    .then((data) => {
      if (data.length < 1 && data.every((talk) => talk instanceof Talk)) {
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
// Find a single Talk with an id
exports.findOneTalk = (req, res) => {
  Talk.findByPk(req.query.id)
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
    where: { usu_identification: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Usuário foi atualizado com sucesso!",
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
    where: { tlk_identification: id },
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
// Update all Talks with a given chat id with a given user id
exports.updateTalkToSignInUser = (req, res) => {
  const id = req.query.id;

  Talk.update(req.body, {
    where: { tlk_chat_id: id },
  })
    .then((num) => {
      if (num >= 1) {
        return res.send({
          message: "Conversa foi atualizada com sucesso!",
        });
      } else {
        return res.send({
          message: `Não foi possível atualizar a conversa com o chat id = ${id}. Talvez a conversa não exista ou o body veio vazio.`,
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
    where: { usu_identification: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Usuário foi deletado com sucesso!",
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
    where: { tlk_identification: id },
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
