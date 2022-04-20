module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "193cdaff72883a6255ef746268f52eea0eaa03d3aa84a638",
  DB: "app_neko_chat",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};