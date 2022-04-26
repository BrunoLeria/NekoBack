const express = require("express");
const app = express();
const port = 3005;
const bodyParser = require("body-parser");
const cors = require("cors");
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const db = require("./models/db.model");
const controler = require("./controllers/controller.js");
let corsOptions = {
  origin: "http://localhost:3005",
};

app.use(cors(corsOptions));
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


app.post("/createUsuario", (req, res) => {
  controler.createUsuario(req, res);
  res.json({ message: "Process finished!" });
});

db.sequelize.sync();