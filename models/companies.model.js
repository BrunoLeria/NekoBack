module.exports = (sequelize, Sequelize) => {
  const Companies = sequelize.define("companies", {
    cpn_identification: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cpn_name: { type: Sequelize.STRING, allowNull: false, unique: true },
    cpn_number_of_users: { type: Sequelize.INTEGER, defaultValue: 1 },
    cpn_status: {
      type: Sequelize.STRING(1),
      allowNull: false,
      defaultValue: "A",
    },
    cpn_postal_code: {
      type: Sequelize.STRING(8),
      allowNull: false,
      defaultValue: "",
    },
    cpn_adress: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
    cpn_street_number: {
      type: Sequelize.STRING(10),
      allowNull: false,
      defaultValue: "",
    },
    cpn_neighborhood: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
    cpn_city: {
      type: Sequelize.STRING(150),
      allowNull: false,
      defaultValue: "",
    },
    cpn_state: {
      type: Sequelize.STRING(150),
      allowNull: false,
      defaultValue: "",
    },
    cpn_company_name: {
      type: Sequelize.STRING(250),
      allowNull: false,
      defaultValue: "",
    },
    cpn_company_document: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "",
    },
    cpn_company_fantasy_name: {
      type: Sequelize.STRING(250),
      allowNull: false,
      defaultValue: "",
    },
    cpn_type: {
      type: Sequelize.STRING(25),
      allowNull: false,
      defaultValue: "",
    },
    cpn_size: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "",
    },
    cpn_insert_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    cpn_observation: { type: Sequelize.TEXT("long") },
    cpn_contact: {
      type: Sequelize.STRING(250),
      allowNull: false,
      defaultValue: "",
    },
    cpn_technician_name: {
      type: Sequelize.STRING(250),
      allowNull: false,
      defaultValue: "",
    },
    cpn_technician_phone: {
      type: Sequelize.STRING(15),
      allowNull: false,
      defaultValue: "",
    },
    cpn_technician_email: {
      type: Sequelize.STRING(250),
      allowNull: false,
      defaultValue: "",
    },
  });
};
