require("express-async-errors");
const express = require("express");

const app = express();

const dbConnection = require("./startup/db");
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
const nodeEnv = app.get("env") === "development";

dbConnection.sync({ force: nodeEnv }).then(async () => {
  // Populate the Database
  // await getCourses();

  app.listen(port, () => console.log(`Listening on port ${port}...`));
});
