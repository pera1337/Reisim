const express = require("express");
const account = require("../routes/account");
const guide = require("../routes/guide");
const places = require("../routes/places");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/account", account);
  app.use("/api/guide", guide);
  app.use("/api/places", places);
};
