const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const errorHandler = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(helmet());
  app.use(cors());

  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
  }

  // Routes
  // app.use("/api/courses", courseRoutes);

  // Error Handler
  app.use(errorHandler);
};
