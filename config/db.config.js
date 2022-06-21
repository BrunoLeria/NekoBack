module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "ba67dfd4uk8aa",
  DB: "app_neko_chat",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
