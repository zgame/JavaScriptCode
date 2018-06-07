let db = require('../model/db');
let res_json = require('./utils/response_json');
let recharge = {};


//-------------------------获取充值信息----------------------------
recharge.getList = function (req, res, next) {
    console.info('-------------recharge.getList--------------');
    let limit = req.query.limit;
    let page = req.query.page;
    let uid = req.query.uid;
    let channel = req.query.channel;
    let serverid = req.query.serverid;

    let data = {};
    let connection = db.connection();
    let sql = "SELECT * FROM player_charge_rmb where time between '2018-01-01 00:00:00' and '2019-01-01 00:00:00'";
    if (uid !== '') {
        sql += "and user_id ='" + uid + "'";
    }
    if (channel !== '') {
        sql += "and platform_id ='" + channel + "'";
    }
    if (serverid !== '') {
        sql += "and server_id ='" + serverid + "'";
    }
    console.info('sql:'+sql);

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit * (page - 1), limit * page);
        data['total'] = result.length;
        res.send(res_json(true, data, "获取所有用户信息"));
    });
};


module.exports = recharge;