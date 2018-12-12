var express = require('express');
var router = express.Router();

let server_list = require("../action/server_list");

router.get('/list', function(req, res, next) {
    server_list.list(req, res, next);
});
router.get('/add', function (req, res, next) {
    server_list.add(req, res, next);
});
router.get('/change', function (req, res, next) {
    server_list.change(req, res, next);
});
router.get('/del', function (req, res, next) {
    server_list.del(req, res, next);
});


module.exports = router;