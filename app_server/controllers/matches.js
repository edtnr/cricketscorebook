var request = require("request");
var apiOptions = {
  server: "http://localhost:3000"
};

module.exports.createMatch = function(req, res) {
  console.log(req.body);
  var requestOptions, path, postdata;
  path = "/api/matches";

  postdata = {
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    homePlayer1: req.body.homePlayer1,
    homePlayer2: req.body.homePlayer2,
    homePlayer3: req.body.homePlayer3,
    homePlayer4: req.body.homePlayer4,
    homePlayer5: req.body.homePlayer5,
    homePlayer6: req.body.homePlayer6,
    homePlayer7: req.body.homePlayer7,
    homePlayer8: req.body.homePlayer8,
    homePlayer9: req.body.homePlayer9,
    homePlayer10: req.body.homePlayer10,
    homePlayer11: req.body.homePlayer11,
    awayPlayer1: req.body.awayPlayer1,
    awayPlayer2: req.body.awayPlayer2,
    awayPlayer3: req.body.awayPlayer3,
    awayPlayer4: req.body.awayPlayer4,
    awayPlayer5: req.body.awayPlayer5,
    awayPlayer6: req.body.awayPlayer6,
    awayPlayer7: req.body.awayPlayer7,
    awayPlayer8: req.body.awayPlayer8,
    awayPlayer9: req.body.awayPlayer9,
    awayPlayer10: req.body.awayPlayer10,
    awayPlayer11: req.body.awayPlayer11
  };
  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };
  request(requestOptions, function(err, response, body) {
    console.log(body._id);
    if (response.statusCode === 201) {
      res.redirect("/tossdetails/" + body._id);
    } else {
      console.log(err);
    }
  });
};

module.exports.matchlist = function(req, res) {
  var requestOptions, path;
  path = "/api/loadmatches";
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    renderLoadingpage(req, res, body);
  });
};

var renderLoadingpage = function(req, res, responseBody) {
  res.render("loadmatch", {
    title: "Load a match",
    matches: responseBody
  });
};

module.exports.home = function(req, res) {
  renderHomePage(req, res);
};

var renderHomePage = function(req, res) {
  res.render("welcome", {
    title: "Welcome to Cricket Score Book"
  });
};

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
module.exports.teams = function(req, res) {
  renderTeamPage(req, res);
};

var renderTeamPage = function(req, res) {
  res.render("teams", {
    title: "Team Setup",
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    homePlayers: homePlayers,
    awayPlayers: awayPlayers
  });
};

module.exports.tossdetails = function(req, res) {
  var requestOptions, path;
  path = "/api/matches/" + req.params.matchid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    renderTossDetailsPage(req, res, body);
  });
};

var renderTossDetailsPage = function(req, res, matchdata) {
  homePlayers = [];
  awayPlayers = [];
  homeTeam = matchdata.homeTeam;
  for (i = 0; i < matchdata.players.length; i++) {
    if (matchdata.players[i].home == true) {
      homePlayers.push(matchdata.players[i]);
    }
    if (matchdata.players[i].home == false) {
      awayPlayers.push(matchdata.players[i]);
    }
  }
  res.render("tossdetails", {
    homePlayers: homePlayers,
    awayPlayers: awayPlayers,
    homeTeam: matchdata.homeTeam,
    awayTeam: matchdata.awayTeam,
    matchid: matchdata._id
  });
};

var renderTossDetailsPage = function(req, res, matchdata) {
  homePlayers = [];
  awayPlayers = [];
  homeTeam = matchdata.homeTeam;
  awayTeam = matchdata.awayTeam;
  for (i = 0; i < matchdata.players.length; i++) {
    if (matchdata.players[i].home == true) {
      homePlayers.push(matchdata.players[i]);
    }
    if (matchdata.players[i].home == false) {
      awayPlayers.push(matchdata.players[i]);
    }
  }
  res.render("tossdetails", {
    homePlayers: homePlayers,
    awayPlayers: awayPlayers,
    homeTeam: matchdata.homeTeam,
    awayTeam: matchdata.awayTeam,
    matchid: matchdata._id
  });
};

module.exports.startingdetails = function(req, res) {
  console.log("HomeTeam: " + req.params.homeTeam);

  if (req.body.tossWin == req.params.homeTeam && req.body.electedTo == "Bat") {
    battingTeam = req.params.homeTeam;
  } 
  else if (req.body.tossWin == req.params.awayTeam && req.body.electedTo == "Bat") {
    battingTeam = req.params.awayTeam;
  } 
  if (req.body.tossWin == req.params.homeTeam && req.body.electedTo == "Bowl")  {
    battingTeam = req.params.awayTeam;
  } else if (req.body.tossWin == req.params.awayTeam && req.body.electedTo == "Bowl")  {
    battingTeam = req.params.homeTeam;
  }
  path = "/api/matches/" + req.params.matchid + "/" + battingTeam;
  requestOptions = {
    url: apiOptions.server + path,
    method: "PUT",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    renderStartingDetailsPage(req, res, body);
  });
};

var renderStartingDetailsPage = function(req, res, matchdata) {
  battingPlayers = [];
  bowlingPlayers = [];
  console.log(req.params);
  for (i = 0; i < matchdata.length; i++) {
    if (matchdata[i].batting == true) {
      battingPlayers.push(matchdata[i]);
    } else {
      bowlingPlayers.push(matchdata[i]);
    }
  }
  res.render("startingdetails", {
    title: "Details of playing players",
    matchid: req.params.matchid,
    battingPlayers: battingPlayers,
    bowlingPlayers: bowlingPlayers
  });
  battingPlayers = [];
  bowlingPlayers = [];
};

module.exports.editStartingPlayers = function(req, res) {
  console.log(req.body);

  var requestOptions, path, postdata;
  path =
    "/api/matches/" +
    req.params.matchid +
    "/players/" +
    req.body.startingbatter1 +
    "/" +
    req.body.startingbatter2 +
    "/" +
    req.body.startingbowler;
  postdata = {};
  requestOptions = {
    url: apiOptions.server + path,
    method: "PUT",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    res.redirect("/match/" + body._id);
  });
};

module.exports.score = function(req, res) {
  var requestOptions, path;
  path = "/api/matches/" + req.params.matchid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    renderScoringpage(req, res, body);
  });
};

var Players = [];
var bowlingPlayers = [];
var renderScoringpage = function(req, res, matchdata) {
  Players = [];
  bowlingPlayers = [];
  for (i = 0; i < matchdata.players.length; i++) {
    if (
      matchdata.players[i].batting == true &&
      matchdata.players[i].playing == true &&
      matchdata.players[i].facing == true
    ) {
      Players[0] = matchdata.players[i];
    } else if (
      matchdata.players[i].batting == true &&
      matchdata.players[i].playing == true
    ) {
      Players[1] = matchdata.players[i];
    }
    if (
      matchdata.players[i].batting == false &&
      matchdata.players[i].playing == true
    ) {
      bowlingPlayers.push(matchdata.players[i]);
    }
  }

  console.log(bowlingPlayers);
  res.render("scoring", {
    title: "Start scoring!",
    homeTeam: matchdata.homeTeam,
    awayTeam: matchdata.awayTeam,
    players: Players,
    bowlingPlayers: bowlingPlayers,
    overs: matchdata.oversPlayed,
    matchid: matchdata._id,
    matchScore: matchdata.score,
    matchWickets: matchdata.wickets
  });
};

module.exports.updateScore = function(req, res) {
  console.log(req.body.scoring);

  var requestOptions, path;
  path =
    "/api/matches/" +
    req.params.matchid +
    "/players/" +
    req.params.facingbatterid +
    "/" +
    req.params.batterid +
    "/" +
    req.params.bowlerid +
    "/scores/" +
    req.body.scoring;
  postdata = {};
  requestOptions = {
    url: apiOptions.server + path,
    method: "PUT",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    req.method = "GET";
    res.redirect("/match/" + body._id);
  });
};

module.exports.swapPlayers = function(req, res) {
  var requestOptions, path, postdata;
  path =
    "/api/matches/" +
    req.params.matchid +
    "/players/" +
    req.params.facingbatterid +
    "/" +
    req.params.batterid +
    "/" +
    req.params.bowlerid;
  postdata = {};
  requestOptions = {
    url: apiOptions.server + path,
    method: "PUT",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    res.redirect("/match/" + body._id);
  });
};

module.exports.playerOut = function(req, res) {
  var requestOptions, path;
  path =
    "/api/matches/" +
    req.params.matchid +
    "/players/" +
    req.body.outbatter +
    "/" +
    req.body.newbatter;
  requestOptions = {
    url: apiOptions.server + path,
    method: "PUT",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
      req.method = "GET";
      res.redirect("/match/" + body._id);
  });
};

module.exports.outPlayers = function(req, res) {
  var requestOptions, path;
  path = "/api/matches/" + req.params.matchid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    renderOutPage(req, res, body, "out");
  });
};

var renderOutPage = function(req, res, matchdata, outOrRetired) {
    battingPlayers = [];
    playingPlayers = [];
    console.log(req.params);
    for (i = 0; i < matchdata.players.length; i++) {
      if (
        matchdata.players[i].batting == true &&
        matchdata.players[i].playing == true
      ) {
        playingPlayers.push(matchdata.players[i]);
      } else if (
        matchdata.players[i].batting == true &&
        matchdata.players[i].out == false
      ) {
        battingPlayers.push(matchdata.players[i]);
      }
    }

    res.render("playerout", {
      title: "Details of playing players",
      matchid: req.params.matchid,
      battingPlayers: battingPlayers,
      playingPlayers: playingPlayers,
      outOrRetired: outOrRetired
    });
};

module.exports.getStatistics = function(req, res) {
  var requestOptions, path;
  path = "/api/loadmatches";
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    renderStatsPage(req, res, body);
  });
};

var renderStatsPage = function(req, res, responseBody) {
  res.render("statistics", {
    title: "View statistics for any match",
    matches: responseBody
  });
};

module.exports.Statistics = function(req, res) {
  var requestOptions, path;
  path = "/api/matches/" + req.params.matchid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    renderMatchStats(req, res, body);
  });
};

var renderMatchStats = function(req, res, statsData) {
  Players = [];
  bowlingPlayers = [];
  for (i = 0; i < statsData.players.length; i++) {
    if (statsData.players[i].batting == true) {
      Players.push(statsData.players[i]);
    }
    if (statsData.players[i].batting == false) {
      bowlingPlayers.push(statsData.players[i]);
    }
  }
  res.render("matchStatistics", {
    title: "Statistics",
    battingPlayers: Players,
    bowlingPlayers: bowlingPlayers,
    overs: statsData.oversPlayed,
    homeTeam: statsData.homeTeam,
    awayTeam: statsData.awayTeam,
    matchScore: statsData.score,
    matchWickets: statsData.wickets
  });
};

module.exports.extras = function(req, res) {
  res.render("extras", {
    title: "Extra options",
    matchid: req.params.matchid
  });
};

module.exports.splitInnings = function(req, res) {
  var requestOptions, path;
  path = "/api/matches/" + req.params.matchid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    createNewInnings(req, res, body);
  });
};

var createNewInnings = function(req, res, matchdata) {
  homePlayers = [];
  awayPlayers = [];
  console.log("Innings:" + matchdata.players[0].name);
  for (i = 0; i < matchdata.players.length; i++) {
    if (matchdata.players[i].home == true) {
      homePlayers.push(matchdata.players[i].name);
    }
    if (matchdata.players[i].home == false) {
      awayPlayers.push(matchdata.players[i].name);
    }
  }
  console.log(homePlayers);
  var requestOptions, path, postdata;
  path = "/api/matches";
  postdata = {
    homeTeam: matchdata.homeTeam,
    awayTeam: matchdata.awayTeam,
    homePlayer1: matchdata.players[0].name,
    homePlayer2: matchdata.players[1].name,
    homePlayer3: matchdata.players[2].name,
    homePlayer4: matchdata.players[3].name,
    homePlayer5: matchdata.players[4].name,
    homePlayer6: matchdata.players[5].name,
    homePlayer7: matchdata.players[6].name,
    homePlayer8: matchdata.players[7].name,
    homePlayer9: matchdata.players[8].name,
    homePlayer10: matchdata.players[9].name,
    homePlayer11: matchdata.players[10].name,
    awayPlayer1: matchdata.players[11].name,
    awayPlayer2: matchdata.players[12].name,
    awayPlayer3: matchdata.players[13].name,
    awayPlayer4: matchdata.players[14].name,
    awayPlayer5: matchdata.players[15].name,
    awayPlayer6: matchdata.players[16].name,
    awayPlayer7: matchdata.players[17].name,
    awayPlayer8: matchdata.players[18].name,
    awayPlayer9: matchdata.players[19].name,
    awayPlayer10: matchdata.players[20].name,
    awayPlayer11: matchdata.players[21].name
  };
  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };
  request(requestOptions, function(err, response, body) {
    console.log(body._id);
    if (response.statusCode === 201) {
      res.redirect("/tossdetails/" + body._id);
    } else {
      console.log(err);
    }
  });
};

module.exports.retirePlayer = function(req, res) {
  var requestOptions, path;
  path = "/api/matches/" + req.params.matchid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body) {
    renderOutPage(req, res, body, "retiring");
  });
};
