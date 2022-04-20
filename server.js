const express = require("express");
const app = express();
const port = 3005;
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models/db.model");
let corsOptions = {
  origin: "http://localhost:3005",
};

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
db.sequelize.sync();
db.sequelize.showAllSchemas();