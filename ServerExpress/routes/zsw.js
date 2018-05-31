var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:name', function(req, res, next) {

    console.log("-------------:",req.params.name);
    res.render('page-login', { title: req.params.name, list:[1,2,3,4,5] });
});

router.get('/zswAction', function(req, res, next) {

    console.log("-------------:",req.query);
    res.render('page-login', { title: req.params.name, list:[1,2,3,4,5] });
});




module.exports = router;
