const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const courseRoutes = require("../routes/courseRoutes");
const topicRoutes = require("../routes/topicRoutes");
const errorHandler = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(helmet());
  app.use(cors());

  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
  }

  // Routes
  app.use("/api/courses", courseRoutes);
  app.use("/api/topics", topicRoutes);

  // Error Handler
  app.use(errorHandler);
};
