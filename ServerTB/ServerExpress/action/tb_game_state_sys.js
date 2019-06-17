let db_mysql = require('../model/dbMysql');
let res_json = require('./utils/response_json');
let deepClone = require('./utils/deepClone');
let tb_game_state_sys = {};

//------------------------------------------------------------------------------------------------------
// 系统日志
function system_log(req, res, data_base_name) {
    let limit = req.query.limit;
    let page = req.query.page;
    let serverip = req.query.serverip;
    let gameid = req.query.gameid;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;

    let data = {};
    let connection = db_mysql.connection();

    let sql = "SELECT * FROM "+  data_base_name + " where true  ";

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
    if (starttime !== '' && endtime !== '' && starttime !== "0-0-0 0:0:" && endtime !== "0-0-0 0:0:") {
        sql += "and time between '" + starttime + "' and '" + endtime + "'";
    } else {
        // sql += "and time between '2018-01-01' and '2019-01-01'"
        sql += " limit 100";
    }

    console.info('sql:' + sql);


    connection.query(sql, function (err, result) {
        db_mysql.close(connection);
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit * (page - 1), limit * page);
        data['total'] = result.length;
        res.send(res_json(true, data, "获取系统日志信息"+data_base_name));
    });
}

//---------------------------------邮件---------------------------------------------------------------------
tb_game_state_sys.mail = function(req, res, next) {
    system_log(req, res, "zzlog_statistic_mail");
};
//---------------------------------签到---------------------------------------------------------------------
tb_game_state_sys.signIn = function(req, res, next) {
    system_log(req, res, "zzlog_statistic_sign_in");
};
//---------------------------------整点--------------------------------------------------------------------
tb_game_state_sys.clockGold = function(req, res, next) {
    system_log(req, res, "zzlog_statistic_clock_gold");
};
//---------------------------------vip救济---------------------------------------------------------------------
tb_game_state_sys.vipDole = function(req, res, next) {
    system_log(req, res, "zzlog_statistic_vip_dole");
};
//---------------------------------幸运轮盘---------------------------------------------------------------------
tb_game_state_sys.luckyWheel = function(req, res, next) {
    system_log(req, res, "zzlog_statistic_lucky_wheel");
};

module.exports = tb_game_state_sys;