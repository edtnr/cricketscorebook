const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const indexRouter = require("./app_server/routes/index");
const usersRouter = require("./app_server/routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var homeTeam = "";
var awayTeam = "";

var homePlayers = [ {
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
}];

var awayPlayers = [ {
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
},
{
  name: ""
}];

app.post("/players", function(req, res) {
  homeTeam = req.body.homeTeam;
  awayTeam = req.body.awayTeam;
  console.log(req.body.homeTeam);
  res.render("players", {
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    homePlayers: homePlayers,
    awayPlayers: awayPlayers
  });
});

//route to home
app.get("/", function(req, res) {
  res.render("welcome", {
    title: "Welcome to Cricket Score book",
    homeTeam: homeTeam,
    awayTeam: awayTeam
  });
});

app.post("/tossdetails", function(req, res) {
  console.log(homeTeam);
  homePlayers = [
    {
      name: req.body.homePlayer1
    },
    {
      name: req.body.homePlayer2
    },
    {
      name: req.body.homePlayer3
    },
    {
      name: req.body.homePlayer4
    },
    {
      name: req.body.homePlayer5
    },
    {
      name: req.body.homePlayer6
    },
    {
      name: req.body.homePlayer7
    },
    {
      name: req.body.homePlayer8
    },
    {
      name: req.body.homePlayer9
    },
    {
      name: req.body.homePlayer10
    },
    {
      name: req.body.homePlayer11
    }
  ];
  console.log(homePlayers);
  awayPlayers = [
    {
      name: req.body.awayPlayer1
    },
    {
      name: req.body.awayPlayer2
    },
    {
      name: req.body.awayPlayer3
    },
    {
      name: req.body.awayPlayer4
    },
    {
      name: req.body.awayPlayer5
    },
    {
      name: req.body.awayPlayer6
    },
    {
      name: req.body.awayPlayer7
    },
    {
      name: req.body.awayPlayer8
    },
    {
      name: req.body.awayPlayer9
    },
    {
      name: req.body.awayPlayer10
    },
    {
      name: req.body.awayPlayer11
    }
  ];
  res.render("tossdetails", {
    title: "Details of coin toss",
    homePlayers: homePlayers,
    awayPlayers: awayPlayers,
    homeTeam: homeTeam,
    awayTeam: awayTeam
  });
});

app.get("/players", function(req, res) {
  res.render("players", {
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    homePlayers: homePlayers,
    awayPlayers: awayPlayers
  })
});

app.get("/tossdetails", function(req, res) {
  res.render("tossdetails", {
    title: "Details of coin toss",
    homePlayers: homePlayers,
    awayPlayers: awayPlayers,
    homeTeam: homeTeam,
    awayTeam: awayTeam
  })  
});

var battingPlayers = [];
var bowlingPlayers = [];

app.post("/startingdetails", function(req, res) {
  console.log(req.body.electedTo);
  console.log(req.body.tossWin);

  if (req.body.tossWin == homeTeam && req.body.electedTo == "Bat") {
    for (i = 0; i < homePlayers.length; i++) {
      battingPlayers[i] = homePlayers[i];
    }
    for (i = 0; i < awayPlayers.length; i++) {
      bowlingPlayers[i] = awayPlayers[i];
    }
  }
  if (req.body.tossWin == homeTeam && req.body.electedTo == "Bowl") {
    for (i = 0; i < awayPlayers.length; i++) {
      battingPlayers[i] = awayPlayers[i];
    }
    for (i = 0; i < homePlayers.length; i++) {
      bowlingPlayers[i] = homePlayers[i];
    }
  }
  if (req.body.tossWin == awayTeam && req.body.electedTo == "Bat") {
    for (i = 0; i < awayPlayers.length; i++) {
      battingPlayers[i] = awayPlayers[i];
    }
    for (i = 0; i < awayPlayers.length; i++) {
      bowlingPlayers[i] = homePlayers[i];
    }
  }
  if (req.body.tossWin == awayTeam && req.body.electedTo == "Bowl") {
    for (i = 0; i < homePlayers.length; i++) {
      battingPlayers[i] = homePlayers[i];
    }
    for (i = 0; i < awayPlayers.length; i++) {
      bowlingPlayers[i] = awayPlayers[i];
    }
  }
  console.log(battingPlayers);
  console.log(bowlingPlayers);
  res.render("startingdetails", {
    title: "Details of starting players",
    battingPlayers: battingPlayers,
    bowlingPlayers: bowlingPlayers
  });
});

app.get("/startingdetails", function(req, res) {
  console.log(battingPlayers)
  res.render("startingdetails", {
    title: "Details of starting players",
    battingPlayers: battingPlayers,
    bowlingPlayers: bowlingPlayers
  });
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
