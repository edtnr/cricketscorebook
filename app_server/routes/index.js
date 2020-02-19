var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/matches');

router.get("/", ctrlMain.home);
router.post("/matches", ctrlMain.createMatch);
router.get("/load", ctrlMain.matchlist);

router.post("/teams", ctrlMain.teams);
router.get("/match/:matchid", ctrlMain.score)

router.get("/tossdetails/:matchid", ctrlMain.tossdetails);

router.post("/startingdetails/:matchid/:homeTeam/:awayTeam", ctrlMain.startingdetails)
module.exports = router;