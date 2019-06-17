var express = require('express');
var router = express.Router();

let tb_server_list = require("../action/tb_server_list");

router.get('/list', function(req, res, next) {
    tb_server_list.list(req, res, next);
});
router.get('/add', function (req, res, next) {
    tb_server_list.add(req, res, next);
});
router.get('/change', function (req, res, next) {
    tb_server_list.change(req, res, next);
});
router.get('/del', function (req, res, next) {
    tb_server_list.del(req, res, next);
});

router.get('/get', function (req, res, next) {
    tb_server_list.clientGet(req, res, next);
});


module.exports = router;