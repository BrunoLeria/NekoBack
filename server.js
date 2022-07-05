const express = require("express");
const { Server } = require("socket.io");
const fs = require("fs");
const http = require("http");
const https = require("https");
const privateKey = fs.readFileSync("./sslcert/privkey1.pem", "utf8");
const certificate = fs.readFileSync("./sslcert/fullchain1.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };
const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
const port = 3005;
const portHttps = 3006;
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models/db.model");
const controler = require("./controllers/controller.js");
const console = require("console");

httpServer.listen(port);
httpsServer.listen(portHttps);

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json({ type: "application/gzip" }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.json({ limit: "50mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/createCompany", (req, res) => {
  controler.createCompany(req, res);
});

app.post("/createUser", (req, res) => {
  controler.createUser(req, res);
});

app.post("/createTalk", (req, res) => {
  controler.createTalk(req, res);
  io.emit("newTalk", req.body);
});

app.get("/findAllCompanies", (req, res) => {
  controler.findAllCompanies(req, res);
});

app.get("/findAllUser", async (req, res) => {
  controler.findAllUser(req, res);
});

app.get("/findAllTeam", async (req, res) => {
  controler.findAllTeam(req, res);
});

app.get("/findAllTalk", (req, res) => {
  controler.findAllTalk(req, res);
});

app.get("/findAllStatuses", (req, res) => {
  controler.findAllStatuses(req, res);
});

app.get("/findAllOffices", (req, res) => {
  controler.findAllOffices(req, res);
});

app.get("/findOneCompany", (req, res) => {
  controler.findOneCompany(req, res);
});

app.get("/findOneUser", (req, res) => {
  controler.findOneUser(req, res);
});

app.get("/findOneUserByEmail", (req, res) => {
  controler.findOneUserByEmail(req, res);
});

app.get("/findOneTalk", (req, res) => {
  controler.findOneTalk(req, res);
});

app.get("/findOneTalkByChatId", (req, res) => {
  controler.findOneTalkByChatId(req, res);
});

app.get("/findAllTalkByUser", (req, res) => {
  controler.findAllTalkByUser(req, res);
});

app.get("/findAllTalkByCompany", (req, res) => {
  controler.findAllTalkByCompany(req, res);
});

app.post("/updateCompany", (req, res) => {
  controler.updateCompany(req, res);
});

app.post("/updateUser", (req, res) => {
  controler.updateUser(req, res);
  io.emit("userUpdated", "Atualizar o time");
});

app.post("/updateTalk", (req, res) => {
  controler.updateTalk(req, res);
});

app.post("/updateTalkToSignInUser", (req, res) => {
  controler.updateTalkToSignInUser(req, res);
  if (req.query.updateOtherClients) {
    io.emit("returnedToBot", "Atualizar outros clientes");
  }
});
app.post("/updateTalkSetHighPriority", (req, res) => {
  controler.updateTalkSetHighPriority(req, res);
  io.emit("newTalk", "Atualizar conversas");
});

app.delete("/deleteCompany", (req, res) => {
  controler.deleteCompany(req, res);
});

app.delete("/deleteUser", (req, res) => {
  controler.deleteUser(req, res);
});

app.delete("/deleteTalk", (req, res) => {
  controler.deleteTalk(req, res);
});

db.sequelize.sync();

//Web-hook

const io = new Server(httpsServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Conection to socket.io");
  socket.on("message", ({ name, message }) => {
    console.log(name);
  });
});
