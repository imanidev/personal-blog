const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const path = require("path");
const middleware = express.Router();

middleware.use((req, res, next) => {
  console.log("Running all routes");
  next();
});

middleware.use(cors());
middleware.use(express.json());
middleware.use(cookieParser());
middleware.use(bodyParser.urlencoded({ extended: true }));
middleware.use(express.static(path.join(__dirname, "..", "build")));
middleware.use(logger("dev"));


module.exports = middleware;