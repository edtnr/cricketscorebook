var express = require("express");
var router = express.Router();
var ctrlMain = require("../controllers/matches");

router.get("/", ctrlMain.home);
router.post("/matches", ctrlMain.createMatch);
router.get("/load", ctrlMain.matchlist);

router.get("/teams", ctrlMain.teams);
router.get("/match/:matchid", ctrlMain.score);
router.post("/match/:matchid", ctrlMain.score);

router.get("/tossdetails/:matchid", ctrlMain.tossdetails);
router.post("/matches/:matchid", ctrlMain.editStartingPlayers);
router.post(
  "/startingdetails/:matchid/:homeTeam/:awayTeam",
  ctrlMain.startingdetails
);
router.post(
  "/matches/:matchid/players/:facingbatterid/:batterid/:bowlerid/scores",
  ctrlMain.updateScore
);
router.post(
  "/matches/:matchid/players/:facingbatterid/:batterid/:bowlerid",
  ctrlMain.swapPlayers
);
router.post("/matches/:matchid/players/out", ctrlMain.outPlayers);
router.get("/statistics", ctrlMain.getStatistics);
router.get("/match/stats/:matchid", ctrlMain.Statistics);
router.post("/matches/:matchid/out", ctrlMain.playerOut);
router.post("/retire/:matchid", ctrlMain.retirePlayer)

router.post("/match/split/:matchid", ctrlMain.splitInnings);
router.get("/match/extras/:matchid", ctrlMain.extras);
module.exports = router;
