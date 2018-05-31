var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('echo');

    let user = req.query.user;
    let idx = req.query.id;

    console.log("user:",user);
    console.log("id:",idx);

    let re = [];
    re.push(user);
    re.push(idx);

    let str_json = JSON.stringify(re, null, 4);     //使用四个空格缩进

    res.send(str_json);

});

module.exports = router;
