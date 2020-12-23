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

module.exports = RoutesUtils;