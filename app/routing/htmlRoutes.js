var express = require("express");
var app = express.Router();
var path = require("path");

// var app = express();
// Basic Routes
// =============================================================



// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

module.exports = app;