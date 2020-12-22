var express = require('express');
var router = express.Router();

let tb_server_state = require("../action/tb_server_state");

router.get('/list', function(req, res, next) {
    tb_server_state.list(req, res, next);
});

module.exports = router;