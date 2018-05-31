let express = require('express');
let router = express.Router();

let zswAction = require("../action/zswAction");

/* GET users listing. */
router.get('/:name', function (req, res, next) {
    console.log("-------------:", req.params.name);
    res.render('page-login', {title: req.params.name, list: [1, 2, 3, 4, 5]});
});

router.get('/', function (req, res, next) {
    zswAction(req, res, next);
});


module.exports = router;
