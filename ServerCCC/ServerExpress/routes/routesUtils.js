let RoutesUtils = {}

RoutesUtils.Get = function(router,dir,func){
    router.get(dir,function (req,res,next) {
        func(req,res,next)
    })
}
RoutesUtils.Post = function(router,dir,func){
    router.post(dir,function (req,res,next) {
        func(req,res,next)
    })
}

module.exports = RoutesUtils;