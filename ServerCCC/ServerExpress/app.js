let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


//--------------------------------------------------------------------------

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let adminRouter = require('./routes/admin');
let tableRouter = require('./routes/table');
let rechargeRouter = require('./routes/tb_recharge');
let server_stateRouter = require('./routes/tb_server_state');
let game_stateRouter = require('./routes/tb_game_state');
let server_listRouter = require('./routes/tb_server_list');
let user_dataRouter = require('./routes/tb_user_data');
let all_statistic = require('./routes/tb_all_statistic');
let game_manager = require('./routes/tb_game_manager');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//--------------------------------跨域设置------------------------------------------
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://0.0.0.0:5001'); //必须重新设置，把origin的域加上去
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'x-custom,Origin, X-Requested-With, Content-Type, Accept,x-token');
    res.header('Access-Control-Allow-Credentials', 'true');//和客户端对应，必须设置以后，才能接收cookie.
    next();
};
app.use(allowCrossDomain);
//--------------------------------------------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/table', tableRouter);
app.use('/recharge', rechargeRouter);
app.use('/server_state', server_stateRouter);
app.use('/server_list', server_listRouter);
app.use('/game_state', game_stateRouter);
app.use('/user_data', user_dataRouter);
app.use('/all_statistic', all_statistic);
app.use('/game_manager', game_manager);


//----------------------------------------------------------------------------------------


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
