let db_mysql = require('../model/dbMysql');
let res_json = require('./utils/response_json');
let deepClone = require('./utils/deepClone');
let tb_game_state = {};

//------------------------------------------------------------------------------------------------------
// 实时的游戏状态
//------------------------------------------------------------------------------------------------------
tb_game_state.list = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    let serverip = req.query.serverip;
    let gameid = req.query.gameid;


    let data = {};
    let connection = db_mysql.connection();

    let sql = "SELECT * FROM state_game where true  ";

    // if (serverip !== '' || gameid !== '') {
    //     sql += "where "
    // }

    // 如果有服务器的ip
    if (serverip !== '') {
        sql += "and server_ip ='" + serverip + "'";
    }
    // 如果有game id
    if (gameid !== '') {
        sql += "and game_id =" + gameid + "";
    }
    console.info('sql:'+sql);


    connection.query(sql, function (err, result) {
        db_mysql.close(connection);
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit*(page-1),limit*page) ;
        data['total'] = result.length;
        res.send(res_json(true, data, "获取游戏状态信息"));
    });


};

//------------------------------------------------------------------------------------------------------
// 游戏状态的历史记录
//------------------------------------------------------------------------------------------------------

tb_game_state.recordList = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    let serverip = req.query.serverip;
    let gameid = req.query.gameid;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;

    let data = {};
    let connection = db_mysql.connection();

    let sql = "SELECT * FROM state_game_record where true  ";

    // if (serverip !== '' || gameid !== '') {
    //     sql += "where "
    // }

    // 如果有服务器的ip
    if (serverip !== '') {
        sql += "and server_ip ='" + serverip + "'";
    }
    // 如果有game id
    if (gameid !== '') {
        sql += "and game_id =" + gameid + "";
    }
    if (starttime !== '' && endtime !== ''&& starttime!== "0-0-0 0:0:" && endtime!== "0-0-0 0:0:" ) {
        sql += "and time between '"+starttime+"' and '"+endtime+"'";
    }else{
        // sql += "and time between '2018-01-01' and '2019-01-01'"
        sql += " limit 100";
    }

    console.info('sql:'+sql);


    connection.query(sql, function (err, result) {
        db_mysql.close(connection);
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit*(page-1),limit*page) ;
        data['total'] = result.length;
        res.send(res_json(true, data, "获取游戏状态信息"));
    });
};

//------------------------------------------------------------------------------------------------------
// 小奖池日志
//------------------------------------------------------------------------------------------------------

tb_game_state.pointsList = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    let serverip = req.query.serverip;
    let gameid = req.query.gameid;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;

    let data = {};
    let connection = db_mysql.connection();

    let sql = "SELECT * FROM log_statistic_points where true  ";

    // if (serverip !== '' || gameid !== '') {
    //     sql += "where "
    // }

    // 如果有服务器的ip
    if (serverip !== '') {
        sql += "and server_ip ='" + serverip + "'";
    }
    // 如果有game id
    if (gameid !== '') {
        sql += "and game_type =" + gameid + "";
    }
    if (starttime !== '' && endtime !== ''&& starttime!== "0-0-0 0:0:" && endtime!== "0-0-0 0:0:" ) {
        sql += "and time between '"+starttime+"' and '"+endtime+"'";
    }else{
        // sql += "and time between '2018-01-01' and '2019-01-01'"
        sql += " limit 100";
    }

    console.info('sql:'+sql);


    connection.query(sql, function (err, result) {
        db_mysql.close(connection);
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit*(page-1),limit*page) ;
        data['total'] = result.length;
        res.send(res_json(true, data, "获取小奖池日志信息"));
    });
};

//------------------------------------------------------------------------------------------------------
// 大奖池日志
//------------------------------------------------------------------------------------------------------

tb_game_state.jackpotList = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    let serverip = req.query.serverip;
    let gameid = req.query.gameid;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;

    let data = {};
    let connection = db_mysql.connection();

    let sql = "SELECT * FROM log_statistic_jackpot where true  ";

    // if (serverip !== '' || gameid !== '') {
    //     sql += "where "
    // }

    // 如果有服务器的ip
    if (serverip !== '') {
        sql += "and server_ip ='" + serverip + "'";
    }
    // 如果有game id
    if (gameid !== '') {
        sql += "and game_type =" + gameid + "";
    }
    if (starttime !== '' && endtime !== ''&& starttime!== "0-0-0 0:0:" && endtime!== "0-0-0 0:0:" ) {
        sql += "and time between '"+starttime+"' and '"+endtime+"'";
    }else{
        // sql += "and time between '2018-01-01' and '2019-01-01'"
        sql += " limit 100";
    }

    console.info('sql:'+sql);


    connection.query(sql, function (err, result) {
        db_mysql.close(connection);
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit*(page-1),limit*page) ;
        data['total'] = result.length;
        res.send(res_json(true, data, "获取大奖池日志信息"));
    });
};

//------------------------------------------------------------------------------------------------------
// 老虎机日志
//------------------------------------------------------------------------------------------------------

tb_game_state.tigerList = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    let serverip = req.query.serverip;
    let gameid = req.query.gameid;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;

    let data = {};
    let connection = db_mysql.connection();

    let sql = "SELECT * FROM zzlog_statistic_tiger where true  ";

    // if (serverip !== '' || gameid !== '') {
    //     sql += "where "
    // }

    // 如果有服务器的ip
    if (serverip !== '') {
        sql += "and server_ip ='" + serverip + "'";
    }
    // 如果有game id
    if (gameid !== '') {
        sql += "and game_type =" + gameid + "";
    }
    if (starttime !== '' && endtime !== ''&& starttime!== "0-0-0 0:0:" && endtime!== "0-0-0 0:0:" ) {
        sql += "and time between '"+starttime+"' and '"+endtime+"'";
    }else{
        // sql += "and time between '2018-01-01' and '2019-01-01'"
        sql += " limit 100";
    }

    console.info('sql:'+sql);


    connection.query(sql, function (err, result) {
        db_mysql.close(connection);
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit*(page-1),limit*page) ;
        data['total'] = result.length;
        res.send(res_json(true, data, "获取老虎机日志信息"));
    });
};

//------------------------------------------------------------------------------------------------------
// 翻牌日志
//------------------------------------------------------------------------------------------------------

tb_game_state.cardList = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    let serverip = req.query.serverip;
    let gameid = req.query.gameid;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;

    let data = {};
    let connection = db_mysql.connection();

    let sql = "SELECT * FROM zzlog_statistic_card where true  ";

    // if (serverip !== '' || gameid !== '') {
    //     sql += "where "
    // }

    // 如果有服务器的ip
    if (serverip !== '') {
        sql += "and server_ip ='" + serverip + "'";
    }
    // 如果有game id
    if (gameid !== '') {
        sql += "and game_type =" + gameid + "";
    }
    if (starttime !== '' && endtime !== ''&& starttime!== "0-0-0 0:0:" && endtime!== "0-0-0 0:0:" ) {
        sql += "and time between '"+starttime+"' and '"+endtime+"'";
    }else{
        // sql += "and time between '2018-01-01' and '2019-01-01'"
        sql += " limit 100";
    }

    console.info('sql:'+sql);


    connection.query(sql, function (err, result) {
        db_mysql.close(connection);
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit*(page-1),limit*page) ;
        data['total'] = result.length;
        res.send(res_json(true, data, "获取翻牌日志信息"));
    });
};


//------------------------------------------------------------------------------------------------------
// 热血日志
//------------------------------------------------------------------------------------------------------

tb_game_state.bloodList = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    let serverip = req.query.serverip;
    let gameid = req.query.gameid;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;

    let data = {};
    let connection = db_mysql.connection();

    let sql = "SELECT * FROM zzlog_statistic_blood where true  ";

    // if (serverip !== '' || gameid !== '') {
    //     sql += "where "
    // }

    // 如果有服务器的ip
    if (serverip !== '') {
        sql += "and server_ip ='" + serverip + "'";
    }
    // 如果有game id
    if (gameid !== '') {
        sql += "and game_type =" + gameid + "";
    }
    if (starttime !== '' && endtime !== ''&& starttime!== "0-0-0 0:0:" && endtime!== "0-0-0 0:0:" ) {
        sql += "and time between '"+starttime+"' and '"+endtime+"'";
    }else{
        // sql += "and time between '2018-01-01' and '2019-01-01'"
        sql += " limit 100";
    }

    console.info('sql:'+sql);


    connection.query(sql, function (err, result) {
        db_mysql.close(connection);
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit*(page-1),limit*page) ;
        data['total'] = result.length;
        res.send(res_json(true, data, "获取热血日志信息"));
    });
};

//------------------------------------------------------------------------------------------------------
// 轮盘日志
//------------------------------------------------------------------------------------------------------

tb_game_state.wheelList = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    let serverip = req.query.serverip;
    let gameid = req.query.gameid;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;

    let data = {};
    let connection = db_mysql.connection();

    let sql = "SELECT * FROM zzlog_statistic_wheel where true  ";

    // if (serverip !== '' || gameid !== '') {
    //     sql += "where "
    // }

    // 如果有服务器的ip
    if (serverip !== '') {
        sql += "and server_ip ='" + serverip + "'";
    }
    // 如果有game id
    if (gameid !== '') {
        sql += "and game_type =" + gameid + "";
    }
    if (starttime !== '' && endtime !== ''&& starttime!== "0-0-0 0:0:" && endtime!== "0-0-0 0:0:" ) {
        sql += "and time between '"+starttime+"' and '"+endtime+"'";
    }else{
        // sql += "and time between '2018-01-01' and '2019-01-01'"
        sql += " limit 100";
    }

    console.info('sql:'+sql);


    connection.query(sql, function (err, result) {
        db_mysql.close(connection);
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit*(page-1),limit*page) ;
        data['total'] = result.length;
        res.send(res_json(true, data, "获取轮盘日志信息"));
    });
};


module.exports = tb_game_state;