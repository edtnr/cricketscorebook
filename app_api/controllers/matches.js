const mongoose = require("mongoose");
require("../models/MatchModel");
var match = mongoose.model("match");
var app = require("../../app");
console.log(app.homeTeam);

const sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.createMatch = function(req, res) {
  console.log(req.body);
  match
    .create({
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      players: [
        {
          name: req.body.homePlayer1,
          team: req.body.homeTeam
        },
        {
          name: req.body.homePlayer2,
          team: req.body.homeTeam
        },
        {
          name: req.body.homePlayer3,
          team: req.body.homeTeam
        },
        {
          name: req.body.homePlayer4,
          team: req.body.homeTeam
        },
        {
          name: req.body.homePlayer5,
          team: req.body.homeTeam
        },
        {
          name: req.body.homePlayer6,
          team: req.body.homeTeam
        },
        {
          name: req.body.homePlayer7,
          team: req.body.homeTeam
        },
        {
          name: req.body.homePlayer8,
          team: req.body.homeTeam
        },
        {
          name: req.body.homePlayer9,
          team: req.body.homeTeam
        },
        {
          name: req.body.homePlayer10,
          team: req.body.homeTeam
        },
        {
          name: req.body.homePlayer11,
          team: req.body.homeTeam
        },
        {
          name: req.body.awayPlayer1,
          team: req.body.awayTeam
        },
        {
          name: req.body.awayPlayer2,
          team: req.body.awayTeam
        },
        {
          name: req.body.awayPlayer3,
          team: req.body.awayTeam
        },
        {
          name: req.body.awayPlayer4,
          team: req.body.awayTeam
        },
        {
          name: req.body.awayPlayer5,
          team: req.body.awayTeam
        },
        {
          name: req.body.awayPlayer6,
          team: req.body.awayTeam
        },
        {
          name: req.body.awayPlayer7,
          team: req.body.awayTeam
        },
        {
          name: req.body.awayPlayer8,
          team: req.body.awayTeam
        },
        {
          name: req.body.awayPlayer9,
          team: req.body.awayTeam
        },
        {
          name: req.body.awayPlayer10,
          team: req.body.awayTeam
        },
        {
          name: req.body.awayPlayer11,
          team: req.body.awayTeam
        }
      ]
    })
    .then(
      function(match) {
        console.log(match);
        sendJsonResponse(res, 201, match);
      },
      function(err) {
        if (err) {
          sendJsonResponse(res, 400, err);
        }
      }
    )
    .catch(e => console.log(e));
};

module.exports.matchesReadOne = function(req, res) {
  if (req.params && req.params.matchid) {
    match.findById(req.params.matchid).exec(function(err, match) {
      if (!match) {
        sendJsonResponse(res, 404, {
          message: "match not found"
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      sendJsonResponse(res, 200, match);
    });
  } else {
    sendJsonResponse(res, 404, {
      message: "No Match ID"
    });
  }
};

module.exports.playersReadOne = function(req, res) {
  if (req.params && req.params.matchid && req.params.playerid) {
    match
      .findById(req.params.matchid)
      .select("awayPlayers")
      .exec(function(err, match) {
        var response, player;
        if (!match) {
          sendJsonResponse(res, 404, {
            message: "match not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        if (match.awayPlayers && match.awayPlayers.length > 0) {
          player = match.awayPlayers.id(req.params.playerid);
          if (!player) {
            sendJsonResponse(res, 404, { message: "playerid not found" });
          } else {
            response = {
              match: {
                id: req.params.matchid
              },
              player: player
            };
            sendJsonResponse(res, 200, response);
          }
        }
      });
  } else {
    sendJsonResponse(res, 404, {
      message: "No Match ID"
    });
  }
};

module.exports.matchesByTime = function(req, res) {
  match
    .find({})
    .sort({ updatedAt: "desc" })
    .exec(function(err, matches) {
      if (err) {
        sendJsonResponse(res, 404, err);
      } else {
        sendJsonResponse(res, 200, matches);
      }
    });
};

module.exports.playersUpdateBatting = function(req, res) {
  if (!req.params.matchid) {
    sendJsonResponse(res, 404, {
      message: "Match ID and player ID required"
    });
    return;
  }
  var team = req.params.teamname;
  console.log(team);
  match.findById(req.params.matchid)
  .select("players")
  .exec(function(err, Match) {
    var battingPlayers = [];
    if (!Match) {
      sendJsonResponse(res, 404, {
        message: "matchid not found"
      });
      return;
    } else if (err) {
      sendJsonResponse(res, 400, err);
      return;
    }

    if (Match.players && Match.players.length > 0) {
      for(i = 0; i< Match.players.length; i++) {
        battingPlayers[i] = Match.players[i];
        if(Match.players[i].team == team) {
          battingPlayers[i].batting = true;
          
        }
      }
      Match.save(function(err, Match) {
        if (err) {
          sendJsonResponse(res, 404, err);
        } else {
          sendJsonResponse(res, 200, battingPlayers);
        }
    })
  }
  });
};


module.exports.playersUpdatePlaying = function(req, res) {
  if (!req.params.matchid || !req.params.playerid) {
    sendJsonResponse(res, 404, {
      message: "Match ID and player ID required"
    });
    return;
  }
  match
    .findById(req.params.matchid)
    .select("players")
    .exec(function(err, Match) {
      var thisPlayer;
      if (!Match) {
        sendJsonResponse(res, 404, {
          message: "matchid not found"
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 400, err);
        return;
      }
      if (Match.players && Match.players.length > 0) {
        thisPlayer = Match.players.id(req.params.playerid);
        if (!thisPlayer) {
          sendJsonResponse(res, 404, {
            message: "playerid not found"
          });
        } else {
          thisPlayer.playing = true;
          Match.save(function(err, Match) {
            if (err) {
              sendJsonResponse(res, 404, err);
            } else {
              sendJsonResponse(res, 200, thisPlayer);
            }
          });
        }
      }
    });
};
