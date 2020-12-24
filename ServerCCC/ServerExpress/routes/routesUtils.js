let RoutesUtils = {}

RoutesUtils.Get = function(app,dir,func){
    app.get(dir,function (req,res) {
        func(req,res)
    })
}
RoutesUtils.Post = function(app,dir,func){
    app.post(dir,function (req,res) {
        func(req,res)
    })
}


RoutesUtils.GetR = function(app,dir,func){
    app.get(dir,function (req,res,next) {
        func(req,res,next)
    })
}
RoutesUtils.PostR = function(app,dir,func){
    app.post(dir,function (req,res,next) {
        func(req,res,next)
    })
}


module.exports = RoutesUtils;