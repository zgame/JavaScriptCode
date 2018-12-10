var express = require('express');
var router = express.Router();

let server_state = require("../action/server_state");

router.get('/list', function(req, res, next) {
    server_state.list(req, res, next);
});

module.exports = router;