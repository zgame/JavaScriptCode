var express = require('express');
var router = express.Router();

let table = require("../action/table");


router.get('/list', function(req, res, next) {
    table.list(req, res, next);
});
router.get('/list_article', function(req, res, next) {
    table.list_article(req, res, next);
});


module.exports = router;