const db = require("../models/db.model");
const Usuario = db.usuarios;
const Conversa = db.conversas;
const Op = db.Sequelize.Op;
// Create and Save a new Usuario
exports.createUsuario = (req, res) => {
  // Validate request
  if (!req.body) {
      console.log("Content can not be empty!");
  }

  // Create a Usuario
  const usuario = {
    usu_nome: req.body.usu_nome || "Untitled Usuario",
    usu_email: req.body.usu_email,
    usu_senha: req.body.usu_senha,
    usu_data_nascimento: req.body.usu_data_nascimento,
    usu_telefone: req.body.usu_telefone,
    usu_cep: req.body.usu_cep,
    usu_endereco: req.body.usu_endereco,
    usu_numero: req.body.usu_numero,
    usu_complemento: req.body.usu_complemento,
    usu_cidade: req.body.usu_cidade,
    usu_estado: req.body.usu_estado,
    usu_foto: req.body.usu_foto,
  };

  Usuario.create(usuario)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err.message || "Some error occurred while creating the Usuario.");
    });
};
// Create and Save a new Conversa
exports.createConversa = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Conversa
  const conversa = {
    con_codigo: req.body.con_codigo || "Untitled Conversa",
    con_fk_usu_codigo: req.body.con_fk_usu_codigo,
    con_messagens: req.body.con_messagens,
    con_data_hora: req.body.con_data_hora,
    con_cliente: req.body.con_cliente,
  };

  // Save Conversa in the database
  Conversa.create(conversa)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Conversa.",
      });
    });
};
// Retrieve all Usuarios from the database.
exports.findAllUsuario = (req, res) => {
  const usuarios = Usuario.findAll();
  res.send(Usuarios.every((Usuario) => Usuario instanceof Usuario)); // true
  res.send("All Usuarios:", JSON.stringify(Usuarios, null, 2));
};
// Retrieve all Conversas from the database.
exports.findAllConversa = (req, res) => {
  const conversas = Conversa.findAll();
  res.send(Conversas.every((Conversa) => Conversa instanceof Conversa)); // true
  res.send("All Conversas:", JSON.stringify(Conversas, null, 2));
};
// Find a single Usuario with an id
exports.findOneUsuario = (req, res) => {
  Usuario.findByPk(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Usuario with id=" + req.params.id,
      });
    });
};
// Find a single Conversa with an id
exports.findOneConversa = (req, res) => {
  Conversa.findByPk(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Conversa with id=" + req.params.id,
      });
    });
};
// Update a Usuario by the id in the request
exports.updateUsuario = (req, res) => {
  const id = req.params.id;

  Usuario.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Usuario was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Usuario with id=${id}. Maybe Usuario was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Usuario with id=" + id,
      });
    });
};
// Update a Conversa by the id in the request
exports.updateConversa = (req, res) => {
  const id = req.params.id;

  Conversa.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Conversa was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Conversa with id=${id}. Maybe Conversa was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Conversa with id=" + id,
      });
    });
};
// Delete a Usuario with the specified id in the request
exports.deleteUsuario = (req, res) => {
  const id = req.params.id;

  Usuario.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Usuario was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Usuario with id=${id}. Maybe Usuario was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Usuario with id=" + id,
      });
    });
};
// Delete a Conversa with the specified id in the request
exports.deleteConversa = (req, res) => {
  const id = req.params.id;

  Conversa.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Conversa was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Conversa with id=${id}. Maybe Conversa was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Conversa with id=" + id,
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
      res.send({ message: `${nums} Usuarios were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Usuarios.",
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
      res.send({ message: `${nums} Conversas were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Conversas.",
      });
    });
};
