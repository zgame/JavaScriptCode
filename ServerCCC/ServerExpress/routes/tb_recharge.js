var express = require('express');
var router = express.Router();

let tb_recharge = require("../action/tb_recharge");


router.get('/list', function(req, res, next) {
    tb_recharge.getList(req, res, next);
});



module.exports = router;
