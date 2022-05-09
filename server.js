const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const port = 3005;
const bodyParser = require("body-parser");
const cors = require("cors");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const db = require("./models/db.model");
const controler = require("./controllers/controller.js");
const console = require("console");

// set port, listen for requests
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/createUser", (req, res) => {
  controler.createUser(req, res);
});

app.post("/createTalk", (req, res) => {
  controler.createTalk(req, res);
  io.emit("newTalk", "Atualizar conversas");
});

app.get("/findAllUser", async (req, res) => {
  let resp = await controler.findAllUser(req, res);
});

app.get("/findAllTalk", (req, res) => {
  controler.findAllTalk(req, res);
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

app.post("/updateUser", (req, res) => {
  controler.updateUser(req, res);
});

app.post("/updateTalk", (req, res) => {
  controler.updateTalk(req, res);
});

app.delete("/deleteUser", (req, res) => {
  controler.deleteUser(req, res);
});

app.delete("/deleteTalk", (req, res) => {
  controler.deleteTalk(req, res);
});

db.sequelize.sync();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Conection to socket.io");
  socket.on("message", ({ name, message }) => {
    console.log(name, message);
  });
});
