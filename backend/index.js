const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());
require("./startup/db")();
//require("./models/associations")();
require("./startup/routes")(app);
//console.log("sequelize.models :", sequelize.models);
/* const Guide = require("./models/Guide")();

console.log("sequelize :", Object.keys(Guide.rawAttributes)); */

//console.log("sequelize.models :", sequelize.models);
/* async function syncDB() {
  await sequelize.sync();
}
syncDB(); */

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
