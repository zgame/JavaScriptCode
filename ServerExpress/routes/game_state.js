var express = require('express');
var router = express.Router();

let game_state = require("../action/game_state");

router.get('/list', function(req, res, next) {
    game_state.list(req, res, next);
});

module.exports = router;