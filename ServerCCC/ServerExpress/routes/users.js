var express = require('express');
var router = express.Router();

let user = require("../action/user");


router.post('/login', function(req, res, next) {
    user.login(req, res, next);
});
router.post('/logout', function(req, res, next) {
    user.logout(req, res, next);
});
router.get('/info', function(req, res, next) {
    user.info(req, res, next);
});


module.exports = router;
