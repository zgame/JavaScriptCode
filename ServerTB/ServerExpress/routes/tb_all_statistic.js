var express = require('express');
var router = express.Router();

let tb_all_statistic = require("../action/tb_all_statistic");


router.get('/list', function(req, res, next) {
    tb_all_statistic.getList(req, res, next);
});



module.exports = router;
