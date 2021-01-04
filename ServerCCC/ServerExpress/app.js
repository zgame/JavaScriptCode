let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let routes = require('./routes/routesUtils')
//--------------------------------------------------------------------------
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//--------------------------------跨域设置------------------------------------------
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //必须重新设置，把origin的域加上去
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'x-custom,Origin, X-Requested-With, Content-Type, Accept,x-token');
    res.header('Access-Control-Allow-Credentials', 'true');//和客户端对应，必须设置以后，才能接收cookie.
    if (req.method.toLowerCase() === 'options') {
        res.sendStatus(200);  // 让options尝试请求快速结束
    } else {
        next();
    }
};
app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//--------------------------------------路由--------------------------------------------------
let indexRouter = require('./routes/index');
let adminUser = require("./action/login");
let admin = require("./action/admin");
let table = require("./action/table");
let tb_recharge = require("./action/tb_recharge");
let tb_server_state = require("./action/tb_server_state");
let tb_server_list = require("./action/tb_server_list");
let tb_user_data = require("./action/tb_user_data");
let tb_all_statistic = require("./action/tb_all_statistic");



routes.Get(app,'/',indexRouter.Hello)
routes.Post(app,'/user/login',adminUser.Login)
routes.Post(app,'/user/logout',adminUser.Logout)
routes.Get(app,'/user/info',adminUser.Info)
routes.Get(app,'/admin', admin.getList)
routes.Get(app,'/admin/add', admin.addUser)
routes.Get(app,'/admin/change', admin.changeUser)
routes.Get(app,'/admin/del', admin.delUser)

routes.Get(app,'/table/list', table.list)
routes.Get(app,'/table/list_article', table.list_article)
routes.Get(app,'/recharge/list', tb_recharge.getList)
routes.Get(app,'/server_state/list', tb_server_state.list)
// 服务器列表
routes.Get(app,'/server_list/list', tb_server_list.list)
routes.Get(app,'/server_list/add', tb_server_list.add)
routes.Get(app,'/server_list/change', tb_server_list.change)
routes.Get(app,'/server_list/del', tb_server_list.del)
routes.Get(app,'/server_list/get', tb_server_list.clientGet)
// 玩家
routes.Get(app,'/user_data/get_user', tb_user_data.getUser)
routes.Get(app,'/user_data/log_list', tb_user_data.logList)
routes.Get(app,'/all_statistic/list', tb_all_statistic.getList)


// 路由集合
let game_stateRouter = require('./routes/tb_game_state');
let game_manager = require('./routes/tb_game_manager');
app.use('/game_state', game_stateRouter);
app.use('/game_manager', game_manager);






//--------------------------------------------------------------------------
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
