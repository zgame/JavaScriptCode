var express = require('express');
var router = express.Router();

let recharge = require("../action/recharge");


router.get('/list', function(req, res, next) {
    recharge.getList(req, res, next);
});



module.exports = router;
