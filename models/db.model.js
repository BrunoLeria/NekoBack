const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    socketPath: "/var/run/mysqld/mysqld.sock",
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  timezone: "-03:00",
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.companies = require("./companies.model.js")(sequelize, Sequelize);
db.offices = require("./offices.model.js")(sequelize, Sequelize);
db.statuses = require("./statuses.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.offices.hasMany(db.users, { foreignKey: "usu_fk_ofc_identification" });
db.statuses.hasMany(db.users, { foreignKey: "usu_fk_sts_identification" });
db.companies.hasMany(db.users, { foreignKey: "usu_fk_cpn_identification" });
db.companies.hasMany(db.talks, { foreignKey: "tlk_fk_cpn_identification" });
db.talks = require("./talks.model.js")(sequelize, Sequelize);
db.talks.belongsTo(db.users, { foreignKey: "tlk_fk_usu_identification" });
module.exports = db;
