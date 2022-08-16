const db = require("../models/db.model");
const Companies = db.companies;
const User = db.users;
const Talk = db.talks;
const Statuses = db.statuses;
const Offices = db.offices;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

// Create and Save a ne company
exports.createCompany = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.json({
      message: err || "Conteúdo não pode estar vazio!",
    });
  }

  // Create a company
  await Companies.create({
    cpn_name: req.body.cpn_name,
    cpn_number_of_users: req.body.cpn_number_of_users,
    cpn_status: req.body.cpn_status,
    cpn_postal_code: req.body.cpn_postal_code,
    cpn_adress: req.body.cpn_adress,
    cpn_street_number: req.body.cpn_street_number,
    cpn_neighborhood: req.body.cpn_neighborhood,
    cpn_city: req.body.cpn_city,
    cpn_state: req.body.cpn_state,
    cpn_company_name: req.body.cpn_company_name,
    cpn_company_document: req.body.cpn_company_document,
    cpn_company_fantasy_name: req.body.cpn_company_fantasy_name,
    cpn_type: req.body.cpn_type,
    cpn_size: req.body.cpn_size,
    cpn_insert_date: req.body.cpn_insert_date,
    cpn_observation: req.body.cpn_observation,
    cpn_contact: req.body.cpn_contact,
    cpn_technician_name: req.body.cpn_technician_name,
    cpn_technician_phone: req.body.cpn_technician_phone,
    cpn_technician_email: req.body.cpn_technician_email,
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro encontrado ao criar empresa nova. " + err.message,
      });
    });
};

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
    usu_fk_cpn_identification: req.body.usu_fk_cpn_identification,
    usu_is_admin: req.body.usu_is_admin,
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro encontrado ao criar usuário novo. " + err.message,
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
        tlk_fk_cpn_identification: req.body.tlk_fk_cpn_identification,
        tlk_fk_ftr_identification:
          data && data.tlk_high_priority ? data.tlk_fk_ftr_identification : 1,
        tlk_message: req.body.tlk_message,
        tlk_date_time: req.body.tlk_date_time,
        tlk_client: req.body.tlk_client,
        tlk_chat_id: req.body.tlk_chat_id,
        tlk_chat_name: req.body.tlk_chat_name,
        tlk_from_me: req.body.tlk_from_me,
        tlk_robot_instance: req.body.tlk_robot_instance,
        tlk_robot_token: req.body.tlk_robot_token,
        tlk_high_priority: data ? data.tlk_high_priority : 0,
      })
        .then((data) => {
          return res.status(200).send("Conversa criada com sucesso!");
        })
        .catch((err) => {
          return res.status(500).send({
            message: "Erro encontrado ao criar conversa nova. " + err.message,
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          "Erro encontrado ao validar conversas existente s" + err.message,
      });
    });
};
// Retrieve all Companies from the database.
exports.findAllCompanies = async (req, res) => {
  await Companies.findAll()
    .then((data) => {
      if (data.length < 1 && data.every((user) => user instanceof User)) {
        return res.send({
          message: "Nenhuma empresa encontrada.",
        });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro encontrado ao buscar empresas. " + err.message,
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
        message: "Erro encontrado ao buscar usuários. " + err.message,
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
        message: "Erro encontrado ao buscar usuários. " + err.message,
      });
    });
};
// Retrieve all Talks from the database.
exports.findAllTalk = (req, res) => {
  Talk.findAll({
    order: [["tlk_date_time", "DESC"], ["tlk_chat_id"], ["tlk_high_priority"]],
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
        message: "Erro encontrado ao buscar conversas. " + err.message,
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
        message: "Erro encontrado ao buscar status. " + err.message,
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
        message: "Erro encontrado ao cargo status. " + err.message,
      });
    });
};

// Retrieve one Company from the database.
exports.findOneCompany = async (req, res) => {
  if (!req.query.id) {
    return res.status(400).send({ message: "Id não fornecido." });
  }
  await Companies.findByPk(req.query.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Empresa não encontrada.",
        });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro encontrado ao buscar empresa. " + err.message,
      });
    });
};

// Retrieve one Talk.
exports.findOneTalkByChatId = (req, res) => {
  if (!req.query.id) {
    return res.status(400).send({
      message: "Chat Id não fornecido.",
    });
  }
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
        message: "Erro encontrado ao buscar conversas. " + err.message,
      });
    });
};
// Find all Talks from the database with a given user id
exports.findAllTalkByUser = async (req, res) => {
  try {
    const data = await sequelize.query(
      "SELECT * FROM talks WHERE `tlk_identification` IN ( SELECT MAX(`tlk_identification`) FROM talks WHERE tlk_fk_cpn_identification = " +
        req.query.idCompany +
        " AND (tlk_fk_usu_identification = 1 OR tlk_fk_usu_identification = " +
        req.query.id +
        ") GROUP BY `tlk_chat_id` ) ORDER BY `talks`.`tlk_date_time` DESC",
      {
        type: QueryTypes.SELECT,
      }
    );
    if (data.length < 1 && data.every((talk) => talk instanceof Talk)) {
      return res.send({
        message: "Nenhuma conversa encontrada.",
      });
    }
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message: "Erro encontrado ao buscar conversas. " + err.message,
    });
  }
};
exports.findAllTalkByCompany = async (req, res) => {
  try {
    const data = await sequelize.query(
      "SELECT * FROM talks WHERE `tlk_identification` IN ( SELECT MAX(`tlk_identification`) FROM talks WHERE tlk_fk_cpn_identification = " +
        req.query.idCompany +
        " GROUP BY `tlk_chat_id` ) ORDER BY `talks`.`tlk_date_time` DESC",
      {
        type: QueryTypes.SELECT,
      }
    );
    if (data.length < 1 && data.every((talk) => talk instanceof Talk)) {
      return res.send({
        message: "Nenhuma conversa encontrada.",
      });
    }
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message: "Erro encontrado ao buscar conversas. " + err.message,
    });
  }
};
// Find a single User with an id
exports.findOneUser = (req, res) => {
  if (!req.query.id) {
    return res.status(400).send({ message: "Id não fornecido." });
  }
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
        message:
          "Erro ao buscar usuário com id = " +
          req.query.id +
          ". " +
          err.message,
      });
    });
};
// Find a single User with an email
exports.findOneUserByEmail = (req, res) => {
  if (!req.query.email) {
    return res.status(400).send({ message: "Email não fornecido." });
  }
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
        message:
          "Erro ao buscar usuário com e-mail = " +
          req.query.email +
          ". " +
          err.message,
      });
    });
};
// Find a single Talk with an id
exports.findOneTalk = (req, res) => {
  if (!req.query.id) {
    return res.status(400).send({ message: "Id não fornecido." });
  }
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
        message:
          "Erro ao buscar coversa com id = " +
          req.query.id +
          ". " +
          err.message,
      });
    });
};
//Update a Company with an id
exports.updateCompany = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados não fornecidos.",
    });
  }
  if (!req.query.id) {
    return res.status(400).send({
      message: "Id não fornecido.",
    });
  }
  const id = req.query.id;

  Companies.update(req.body, { where: { com_identification: id } })
    .then((data) => {
      if (data == 0) {
        return res.status(404).send({
          message: "Empresa não encontrada.",
        });
      }
      return res.status(200).send({
        message: "Empresa atualizada com sucesso.",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Erro ao atualizar empresa. " + err.message,
      });
    });
};

// Update a User by the id in the request
exports.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados não fornecidos.",
    });
  }
  if (!req.query.id) {
    return res.status(400).send({
      message: "Id não fornecido.",
    });
  }
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
        message:
          "Erro ao atualizar o usuário com o id = " + id + ". " + err.message,
      });
    });
};
// Update a Talk by the id in the request
exports.updateTalk = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados não fornecidos.",
    });
  }
  if (!req.query.id) {
    return res.status(400).send({
      message: "Id não fornecido.",
    });
  }
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
        message:
          "Erro ao atualizar a conversa com o id = " + id + ". " + err.message,
      });
    });
};
// Update all Talks with a given chat id with a given user id
exports.updateTalkToSignInUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados não fornecidos.",
    });
  }
  if (!req.query.id) {
    return res.status(400).send({
      message: "Id não fornecido.",
    });
  }
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
        message:
          "Erro ao atualizar a conversa com o id = " + id + ". " + err.message,
      });
    });
};
// Update a Talk by the id in the request
exports.updateTalkSetHighPriority = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados não fornecidos.",
    });
  }
  if (!req.query.id) {
    return res.status(400).send({
      message: "Id não fornecido.",
    });
  }
  const id = req.query.id;
  const instance = req.query.instance;

  Talk.update(req.body, {
    where: {
      [Op.and]: [{ tlk_chat_id: id }, { tlk_robot_instance: instance }],
    },
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
        message:
          "Erro ao atualizar a conversa com o id = " + id + ". " + err.message,
      });
    });
};
// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
  if (!req.query.id) {
    return res.status(400).send({
      message: "Id não fornecido.",
    });
  }
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
        message:
          "Erro ao deletar o usuário com o id = " + id + ". " + err.message,
      });
    });
};
// Delete a Talk with the specified id in the request
exports.deleteTalk = (req, res) => {
  if (!req.query.id) {
    return res.status(400).send({
      message: "Id não fornecido.",
    });
  }
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
        message:
          "Erro ao deletar a conversa com o id = " + id + ". " + err.message,
      });
    });
};
exports.deleteCompany = (req, res) => {
  if (!req.query.id) {
    return res.status(400).send({
      message: "Id não fornecido.",
    });
  }
  const id = req.query.id;

  Company.destroy({
    where: { com_identification: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Empresa foi deletada com sucesso!",
        });
      } else {
        return res.send({
          message: `Não foi possível deletar a empresa com id = ${id}. Talvez a empresa não exista.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          "Erro ao deletar a empresa com o id = " + id + ". " + err.message,
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
          "Some error occurred while removing all usuários. " + err.message,
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
        message: "Some error occurred while removing all talks. " + err.message,
      });
    });
};
// Delete all Companies from the database.
exports.deleteAllCompanies = (req, res) => {
  Company.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      return res.send({
        message: `${nums} Companies were deleted successfully!`,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          "Some error occurred while removing all companies. " + err.message,
      });
    });
};
