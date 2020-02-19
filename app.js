const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const indexRouter = require("./app_server/routes/index");
const usersRouter = require("./app_server/routes/users");
const app = express();

require("./app_server/models/db");
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

const routesAPI = require("./app_api/routes/matches");
app.use("/api", routesAPI);

var routes = require('./app_server/routes/index');
app.use('/', routes);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./app_server/features/teams/TeamService");
require("./app_server/features/teams/TeamModel");
require("./app_server/models/PlayerModel");
require("./app_server/models/MatchModel");

const mongoose = require("mongoose");
//connect to database
const dbURI = "mongodb://localhost:27017/cricketscorebook";
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
/** 
const test = () => {
    const team = createTeam({
        teamname: "England",
        players: "Steve",
        homeoraway: "home",
        battingorbowling: "batting"
    })
    console.log(team);
}
test();
*/
var homeTeam = "";
var awayTeam = "";

var homePlayers = [
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
  },
  {
    name: ""
  }
];

var awayPlayers = [
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
  },
  {
    name: ""
  }
];

app.post("/players", function(req, res) {
  homeTeam = req.body.homeTeam;
  awayTeam = req.body.awayTeam;
  console.log(req.body.homeTeam);
  res.render("players", {
    title: "Player setup",
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    homePlayers: homePlayers,
    awayPlayers: awayPlayers
  });
});

//route to first setup page
app.get("/teams", function(req, res) {
  res.render("teams", {
    title: "Team Setup",
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
    title: "Player setup",
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    homePlayers: homePlayers,
    awayPlayers: awayPlayers
  });
});

app.get("/tossdetails", function(req, res) {
  res.render("tossdetails", {
    title: "Details of coin toss",
    homePlayers: homePlayers,
    awayPlayers: awayPlayers,
    homeTeam: homeTeam,
    awayTeam: awayTeam
  });
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
  console.log(battingPlayers);
  res.render("startingdetails", {
    title: "Details of starting players",
    battingPlayers: battingPlayers,
    bowlingPlayers: bowlingPlayers
  });
});

const TeamModel = mongoose.model("Team");
const PlayerModel = mongoose.model("Player");
const MatchModel = mongoose.model("Match");

var battingTeam = "";
var Players = [];
var bowlingPlayers = [];
app.get("/scoring", function(req, res) {
  TeamModel.findOne({ home: "true" })
    .lean()
    .exec(function(err, team) {
      battingTeam = team.teamName;
    });
  PlayerModel.find({ home: "true", batting: "true", playing: "true" })
    .lean()
    .exec(function(err, docs) {
      for (i = 0; i < docs.length; i++) {
        Players.push(docs[i].name);
      }
    });
  PlayerModel.find({ home: "false", batting: "false", playing: "true" })
    .lean()
    .exec(function(err, docs) {
      for (i = 0; i < docs.length; i++) {
        bowlingPlayers.push(docs[i].name);
      }
    });

  res.render("scoring", {
    title: "Begin scoring",
    homeTeam: battingTeam,
    awayTeam: awayTeam,
    players: Players,
    bowlingPlayers: bowlingPlayers
  });
  Players = [];
  bowlingPlayers = [];
});

app.post("/scoring", function(req, res) {
  PlayerModel.find({ home: "true", batting: "true", playing: "true" })
    .lean()
    .exec(function(err, docs) {
      for (i = 0; i < docs.length; i++) {
        Players.push(docs[i].name);
      }
    });
  PlayerModel.find({ home: "false", batting: "false", playing: "true" })
    .lean()
    .exec(function(err, docs) {
      for (i = 0; i < docs.length; i++) {
        bowlingPlayers.push(docs[i].name);
      }
    });

  for (i = 0; i < homePlayers.length; i++) {
    if (
      homePlayers[i].name == req.body.startingbatter1 ||
      homePlayers[i].name == req.body.startingbatter2
    ) {
      new PlayerModel({
        name: homePlayers[i].name,
        home: true,
        playing: true,
        batting: true
      })
        .save()
        .catch(e => console.log(e));
    } else {
      new PlayerModel({
        name: homePlayers[i].name,
        home: true,
        playing: false,
        batting: true
      })
        .save()
        .catch(e => console.log(e));
    }
  }

  if (JSON.stringify(homePlayers) === JSON.stringify(battingPlayers)) {
    new TeamModel({
      teamName: homeTeam,
      home: true,
      batting: true
    }).save();
    new TeamModel({
      teamName: awayTeam,
      home: false,
      batting: false
    }).save();
  } else if (JSON.stringify(homePlayers) == JSON.stringify(bowlingPlayers)) {
  }

  res.render("scoring", {
    homeTeam: homeTeam,
    title: "Begin Scoring",
    homeTeam: battingTeam,
    awayTeam: awayTeam,
    players: Players,
    bowlingPlayers: bowlingPlayers
  });
});



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
