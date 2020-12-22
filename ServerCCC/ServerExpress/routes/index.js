var express = require('express');
var router = express.Router();
var RouterUtils = require('./routesUtils')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: '统计后台Server' });
// });

let ss = function(req,res,next){
  res.render('index', { title: '统计后台Server111111111111111111111111111' });
}

RouterUtils.Get(router,'/', ss)


module.exports = router;
