var express = require('express');
var router = express.Router();

let tb_user_data = require("../action/tb_user_data");

router.get('/get_user', function(req, res, next) {
    tb_user_data.getUser(req, res, next);
});

router.get('/log_list', function(req, res, next) {
    tb_user_data.logList(req, res, next);
});

module.exports = router;