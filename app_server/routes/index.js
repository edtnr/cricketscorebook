var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.welcome);

router.get('/players', ctrlMain.players)

module.exports = router;