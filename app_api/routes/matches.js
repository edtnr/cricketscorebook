const express = require("express");
var app = express();
const router = express.Router();
const ctrlMatches = require("../controllers/matches");
const ctrlPlayers = require("../controllers/players");

//for matchs
router.get("/loadmatches", ctrlMatches.matchesByTime);
router.post("/matches", ctrlMatches.createMatch);
router.get("/matches/:matchid", ctrlMatches.matchesReadOne);
//router.put("/matches/:matchid", ctrlMatches.matchesUpdateOne);

//define player link
router.get("/matches/:matchid/players/:playerid", ctrlMatches.playersReadOne);
router.put("/matches/:matchid/players/:playerid", ctrlMatches.playersUpdatePlaying);
router.put("/matches/:matchid/:teamname", ctrlMatches.playersUpdateBatting);


module.exports = router;