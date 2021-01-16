const express = require("express");
const account = require("../routes/account");
const guide = require("../routes/guide");
const places = require("../routes/places");
const upload = require("../routes/upload");
const comment = require("../routes/comment");
const goingTo = require("../routes/goingTo");

module.exports = function (app) {
  app.use(express.json());
  app.use("/uploads", express.static("uploads"));
  app.use("/api/account", account);
  app.use("/api/guide", guide);
  app.use("/api/places", places);
  app.use("/api/upload", upload);
  app.use("/api/comment", comment);
  app.use("/api/goingTo", goingTo);
};
