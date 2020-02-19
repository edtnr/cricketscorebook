var request = require("request");
var apiOptions = {
    server : "http://localhost:3000"
  };

  module.exports.createMatch = function(req, res) {
    console.log(req.body);
    var requestOptions, path, postdata;
    path = "/api/matches";

    postdata= {
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
      awayPlayer11: req.body.awayPlayer11,
    }
    requestOptions= {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata,
    };
    request(
        requestOptions,
        function(err, response, body){
          
            console.log(body._id);
            if (response.statusCode===201){
              res.redirect("/load")
            } else {
              console.log(err)
            }
        }
    )
  }


module.exports.matchlist = function(req, res) {
    var requestOptions, path;
    path = "/api/loadmatches";
    requestOptions= {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
    };
    request(
        requestOptions,
        function(err, response, body){
            renderLoadingpage(req, res, body)
        }
    )
}

var renderLoadingpage = function(req, res, responseBody) {
    res.render("loadmatch", {
        title: "Load a match",
        matches: responseBody
    })
}

module.exports.home = function(req, res) {
    renderHomePage(req, res);
}

var renderHomePage = function(req, res) {
    res.render("welcome", {
        title: "Welcome to Cricket Score Book"
    });
}
  
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
}

var renderTeamPage = function(req, res) {
    res.render("teams", {
        title: "Team Setup",
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homePlayers: homePlayers,
        awayPlayers: awayPlayers
      });
}

module.exports.tossdetails = function (req, res) {
  var requestOptions, path;
  path = "/api/matches/" + req.params.matchid;
    requestOptions= {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
  };
  request(
    requestOptions,
    function(err, response, body){
        renderTossDetailsPage(req, res, body)
    }
) 
}

var renderTossDetailsPage = function(req, res, matchdata) {
  homePlayers = [];
  awayPlayers = [];
  homeTeam = matchdata.homeTeam;
  for (i = 0; i < matchdata.players.length; i++) {
    if(matchdata.players[i].home == true) {
      homePlayers.push(matchdata.players[i]);
    } 
    if(matchdata.players[i].home == false) {
      awayPlayers.push(matchdata.players[i])
    }
  }
  res.render("tossdetails", {
    homePlayers: homePlayers,
    awayPlayers: awayPlayers,
    homeTeam: matchdata.homeTeam,
    awayTeam: matchdata.awayTeam,
    matchid: matchdata._id
  })
}

var renderTossDetailsPage = function(req, res, matchdata) {
  homePlayers = [];
  awayPlayers = [];
  homeTeam = matchdata.homeTeam;
  awayTeam = matchdata.awayTeam;
  for (i = 0; i < matchdata.players.length; i++) {
    if(matchdata.players[i].home == true) {
      homePlayers.push(matchdata.players[i]);
    } 
    if(matchdata.players[i].home == false) {
      awayPlayers.push(matchdata.players[i])
    }
  }
  res.render("tossdetails", {
    homePlayers: homePlayers,
    awayPlayers: awayPlayers,
    homeTeam: matchdata.homeTeam,
    awayTeam: matchdata.awayTeam,
    matchid: matchdata._id
  })
}

module.exports.startingdetails = function (req, res) {
  console.log("HomeTeam: "+req.params.homeTeam);
    path = "/api/matches/" + matchid;
      requestOptions= {
          url: apiOptions.server + path,
          method: "GET",
          json: {},
    };
    request(
      requestOptions,
      function(err, response, body){
          return body;
      }
  ) 

}

module.exports.score = function(req, res) {
    var requestOptions, path;
    path = "/api/matches/" + req.params.matchid;
    requestOptions= {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
    };
    request(
        requestOptions,
        function(err, response, body){
          renderScoringpage(req, res, body);
        }
    )
}

var Players = [];
var bowlingPlayers= [];
var renderScoringpage = function(req, res, matchdata) {
    for (i = 0; i < matchdata.players.length; i++) {
        if(matchdata.players[i].batting == true && matchdata.players[i].playing ==true) {
          Players.push(matchdata.players[i]);
        } 
        if(matchdata.players[i].batting == false  && matchdata.players[i].playing ==true) {
          bowlingPlayers.push( matchdata.players[i])
        }
      }
      
    console.log(bowlingPlayers);
    res.render("scoring", {
        title: "Load a match",
        homeTeam: matchdata.homeTeam,
        awayTeam: matchdata.awayTeam,
        players: Players,
        bowlingPlayers: bowlingPlayers,
        overs: matchdata.oversPlayed 
    })
    Players = [];
  bowlingPlayers = [];
}


