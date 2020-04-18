const mongoose = require('mongoose');
require('../models/MatchModel');
var match = mongoose.model('match');

const sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.createMatch = function (req, res) {
    match
        .create({
            homeTeam: req.body.homeTeam,
            awayTeam: req.body.awayTeam,
            players: [
                {
                    name: req.body.homePlayer1,
                    team: req.body.homeTeam,
                },
                {
                    name: req.body.homePlayer2,
                    team: req.body.homeTeam,
                },
                {
                    name: req.body.homePlayer3,
                    team: req.body.homeTeam,
                },
                {
                    name: req.body.homePlayer4,
                    team: req.body.homeTeam,
                },
                {
                    name: req.body.homePlayer5,
                    team: req.body.homeTeam,
                },
                {
                    name: req.body.homePlayer6,
                    team: req.body.homeTeam,
                },
                {
                    name: req.body.homePlayer7,
                    team: req.body.homeTeam,
                },
                {
                    name: req.body.homePlayer8,
                    team: req.body.homeTeam,
                },
                {
                    name: req.body.homePlayer9,
                    team: req.body.homeTeam,
                },
                {
                    name: req.body.homePlayer10,
                    team: req.body.homeTeam,
                },
                {
                    name: req.body.homePlayer11,
                    team: req.body.homeTeam,
                },
                {
                    name: req.body.awayPlayer1,
                    team: req.body.awayTeam,
                },
                {
                    name: req.body.awayPlayer2,
                    team: req.body.awayTeam,
                },
                {
                    name: req.body.awayPlayer3,
                    team: req.body.awayTeam,
                },
                {
                    name: req.body.awayPlayer4,
                    team: req.body.awayTeam,
                },
                {
                    name: req.body.awayPlayer5,
                    team: req.body.awayTeam,
                },
                {
                    name: req.body.awayPlayer6,
                    team: req.body.awayTeam,
                },
                {
                    name: req.body.awayPlayer7,
                    team: req.body.awayTeam,
                },
                {
                    name: req.body.awayPlayer8,
                    team: req.body.awayTeam,
                },
                {
                    name: req.body.awayPlayer9,
                    team: req.body.awayTeam,
                },
                {
                    name: req.body.awayPlayer10,
                    team: req.body.awayTeam,
                },
                {
                    name: req.body.awayPlayer11,
                    team: req.body.awayTeam,
                },
            ],
        })
        .then(
            function (match) {
                sendJsonResponse(res, 201, match);
            },
            function (err) {
                if (err) {
                    sendJsonResponse(res, 400, err);
                }
            }
        )
       
};

module.exports.matchesReadOne = function (req, res) {
    match.findById(req.params.matchid).exec(function (err, match) {
        if (!match) {
            sendJsonResponse(res, 404, {
                message: 'Match not found',
            });
            return;
        }
        sendJsonResponse(res, 200, match);
    });
};

module.exports.matchesByTime = function (req, res) {
    match
        .find({})
        .sort({ updatedAt: 'desc' })
        .exec(function (err, matches) {
            sendJsonResponse(res, 200, matches);
        });
};

module.exports.playersUpdateBatting = function (req, res) {
    var team = req.params.teamname;
    match
        .findById(req.params.matchid)
        .select('players')
        .exec(function (err, Match) {
            var battingPlayers = [];
            if (!Match) {
                sendJsonResponse(res, 404, {
                    message: 'Match not found',
                });
                return;
            }
            if (Match.players && Match.players.length > 0) {
                for (var i = 0; i < Match.players.length; i++) {
                    battingPlayers[i] = Match.players[i];
                    if (Match.players[i].team == team) {
                        battingPlayers[i].batting = true;
                    } else {
                        battingPlayers[i].batting = false;
                    }
                }
                Match.save(function (err, Match) {
                    sendJsonResponse(res, 200, battingPlayers);
                });
            } else {
                sendJsonResponse(res, 404, {
                    message: 'Players not found',
                });
            }
        });
};

module.exports.playersUpdatePlaying = function (req, res) {
    match
        .findById(req.params.matchid)
        .select('players')
        .exec(function (err, Match) {
            var thisFacingBatter, thisBatter, thisBowler;
            if (!Match) {
                sendJsonResponse(res, 404, {
                    message: 'Match not found',
                });
                return;
            }
            if (Match.players && Match.players.length > 0) {
                thisFacingBatter = Match.players.id(req.params.facingbatterid);
                thisBatter = Match.players.id(req.params.batterid);
                thisBowler = Match.players.id(req.params.bowlerid);
                for (var i = 0; i < Match.players.length; i++) {
                    Match.players[i].playing = false;
                    Match.players[i].facing = false;
                }

                thisFacingBatter.playing = true;
                thisFacingBatter.facing = true;
                thisBatter.facing = false;
                thisBatter.playing = true;
                thisBowler.playing = true;
                Match.save(function (err, Match) {
                    sendJsonResponse(res, 200, Match);
                });
            } else {
                sendJsonResponse(res, 404, {
                    message: 'Players not found',
                });
            }
        });
};

module.exports.updateScore = function (req, res) {
    match
        .findById(req.params.matchid)
        .select('players')
        .exec(function (err, Match) {
            var thisBatter, thisBowler, thisFacingBatter;
            if (!Match) {
                sendJsonResponse(res, 404, {
                    message: 'Match not found',
                });
                return;
            }
            if (Match.players && Match.players.length > 0) {
                thisFacingBatter = Match.players.id(req.params.facingbatterid);
                thisBatter = Match.players.id(req.params.batterid);
                thisBowler = Match.players.id(req.params.bowlerid);

                thisFacingBatter.runsscored =
                    thisFacingBatter.runsscored + parseInt(req.params.score);
                thisBowler.ballsbowled += 1;
                thisFacingBatter.ballsfaced += 1;
                thisBowler.runsagainst += parseInt(req.params.score);
                if (
                    parseInt(req.params.score) != 0 &&
                    parseInt(req.params.score) % 2 != 0
                ) {
                    thisFacingBatter.facing = false;
                    thisBatter.facing = true;
                }
                Match.save(function (err, Match) {
                    updateOvers(Match._id);
                    updateScore(Match._id, parseInt(req.params.score));
                    sendJsonResponse(res, 200, Match);
                });
            } else {
                sendJsonResponse(res, 404, {
                    message: 'Players not found',
                });
            }
        });
};

var updateOvers = function (matchid) {
    match
        .findById(matchid)
        .select('oversPlayed')
        .exec(function (err, match) {
            if (!err) {
                doSetOvers(match);
            }
        });
};

var doSetOvers = function (match) {
    console.log(match);
    var overs;
    if (match.oversPlayed % 5 == 0 && match.oversPlayed % 10 != 0) {
        match.oversPlayed += 5;
    } else {
        match.oversPlayed += 1;
    }
    match.save(function (err) {
        console.log('Overs updated to ' + match.oversPlayed / 10);
    });
};

var updateScore = function (matchid, runsScored) {
    console.log('Update score for: ' + matchid + ' By ' + runsScored);
    match
        .findById(matchid)
        .select('score')
        .exec(function (err, match) {
            if (!err) {
                doSetScore(match, runsScored);
            }
        });
};

var doSetScore = function (match, runsScored) {
    var overs;
    match.score += runsScored;
    match.save(function (err) {
        console.log('score updated to ' + match.score);
    });
};

module.exports.playerUpdateOut = function (req, res) {
    match
        .findById(req.params.matchid)
        .select('players')
        .exec(function (err, Match) {
            var thisOutBatter, thisNewBatter;
            if (!Match) {
                sendJsonResponse(res, 404, {
                    message: 'Match not found',
                });
                return;
            }
            if (Match.players && Match.players.length > 0) {
                thisOutBatter = Match.players.id(req.params.outbatterid);
                thisNewBatter = Match.players.id(req.params.newbatterid);

                thisOutBatter.playing = false;
                thisOutBatter.out = true;
                if (thisOutBatter.facing == true) {
                    thisNewBatter.facing = true;
                }
                thisOutBatter.facing = false;

                thisNewBatter.playing = true;

                Match.save(function (err, Match) {
                    updateWicketsMatch(Match._id);
                    updatesWicketsPlayer(Match._id);
                    updateOvers(Match._id);
                    sendJsonResponse(res, 200, Match);
                });
            } else {
                sendJsonResponse(res, 404, {
                    message: 'Players not found',
                });
            }
        });
};

module.exports.getPlayers = function (req, res) {
    match
        .findById(req.params.matchid)
        .select('players')
        .exec(function (err, players) {
            if (!players) {
                sendJsonResponse(res, 404, {
                    message: 'Match not found',
                });
                return;
            }
            sendJsonResponse(res, 200, players);
        });
};

var updateWicketsMatch = function (matchid) {
    console.log('Update wickets for: ' + matchid);
    match
        .findById(matchid)
        .select('wickets')
        .exec(function (err, match) {
            if (!err) {
                doSetWickets(match);
            }
        });
};

var doSetWickets = function (match) {
    match.wickets += 1;
    match.save(function (err) {
        console.log('wickets updated to ' + match.wickets);
    });
};

var updatesWicketsPlayer = function (matchid) {
    console.log('Update wickets for: ' + matchid);
    match
        .findById(matchid)
        .select('players')
        .exec(function (err, match) {
            if (!err) {
                doSetPlayerWickets(match);
            }
        });
};

var doSetPlayerWickets = function (match) {
    for (var i = 0; i < match.players.length; i++) {
        if (
            match.players[i].batting == false &&
            match.players[i].playing == true
        ) {
            match.players[i].wicketsgained += 1;
        }
    }
    match.save(function (err) {
        console.log('players wickets updated');
    });
};
