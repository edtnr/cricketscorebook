const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

/* GET welcome page */
module.exports.welcome = function(req, res) { 
  res.render("welcome", {
    title: "Welcome to Cricket score book"
  });
};

module.exports.players = function(req, res) {
  console.log(req.body);
  res.render("players", {
    title: "Welcome to Cricket score book"
  });
};
