let router={}

router.Hello = function(req, res, next){
  res.render('index', { title: '统计后台Server' });
}

module.exports = router;
