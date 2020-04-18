const express = require("express");
var app = express();
const router = express.Router();
const ctrlMatches = require("../controllers/matches");

//for matchs
router.get("/loadmatches", ctrlMatches.matchesByTime);
router.post("/matches", ctrlMatches.createMatch);
router.get("/matches/:matchid", ctrlMatches.matchesReadOne);
//router.put("/matches/:matchid", ctrlMatches.matchesUpdateOne);

//define player link
router.get("/matches/:matchid/players", ctrlMatches.getPlayers);
router.put("/matches/:matchid/players/:facingbatterid/:batterid/:bowlerid", ctrlMatches.playersUpdatePlaying);
router.put("/matches/:matchid/:teamname", ctrlMatches.playersUpdateBatting);
router.put("/matches/:matchid/players/:facingbatterid/:batterid/:bowlerid/scores/:score", ctrlMatches.updateScore);
router.put("/matches/:matchid/players/:outbatterid/:newbatterid", ctrlMatches.playerUpdateOut);

module.exports = router;