const express = require("express");
const app = express();
const port = 3005;
const bodyParser = require("body-parser");
const cors = require("cors");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const db = require("./models/db.model");
const controler = require("./controllers/controller.js");

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/createUser", (req, res) => {
  controler.createUser(req, res);
});

app.post("/createConversa", (req, res) => {
  controler.createConversa(req, res);
});

app.get("/findAllUser", async (req, res) => {
  let resp = await controler.findAllUser(req, res);
});

app.get("/findAllConversa", (req, res) => {
  controler.findAllConversa(req, res);
});

app.get("/findOneUser", (req, res) => {
  controler.findOneUser(req, res);
});

app.get("/findOneUserByEmail", (req, res) => {
  controler.findOneUserByEmail(req, res);
});

app.get("/findOneConversa", (req, res) => {
  controler.findOneConversa(req, res);
});

app.post("/updateUser", (req, res) => {
  controler.updateUser(req, res);
});

app.post("/updateConversa", (req, res) => {
  controler.updateConversa(req, res);
});

app.delete("/deleteUser", (req, res) => {
  controler.deleteUser(req, res);
});

app.delete("/deleteConversa", (req, res) => {
  controler.deleteConversa(req, res);
});

db.sequelize.sync();
