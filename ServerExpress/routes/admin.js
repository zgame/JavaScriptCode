let express = require('express');
let router = express.Router();

let admin = require("../action/admin");

/* GET users listing. */
// router.get('/:name', function (req, res, next) {
//     console.log("-------------:", req.params.name);
//     res.render('page-login', {title: req.params.name, list: [1, 2, 3, 4, 5]});
// });

router.get('/', function (req, res, next) {
    admin.getList(req, res, next);
});
router.get('/add', function (req, res, next) {
    admin.addUser(req, res, next);
});
router.get('/change', function (req, res, next) {
    admin.changeUser(req, res, next);
});
router.get('/del', function (req, res, next) {
    admin.delUser(req, res, next);
});


module.exports = router;
