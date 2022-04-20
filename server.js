// const express = require("express");
// const app = express();
// const port = 3005;
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const db = require("./app/models");
// let corsOptions = {
//   origin: "http://localhost:3005",
// };

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Hello World!" });
// });

// // set port, listen for requests
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}.`);
// });

// app.use(cors(corsOptions));
// // parse requests of content-type - application/json
// app.use(bodyParser.json());
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
// db.sequelize.sync();

// con.query(
//   'Show tables from app_neko_chat',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

const db = require("./model.js")(sequelize, Sequelize);
console.log(db);