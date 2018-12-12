let db = require('../model/db');
let res_json = require('./utils/response_json');
let recharge = {};
let cTime = require('./utils/currentTime');

//-------------------------获取充值信息----------------------------
recharge.getList = function (req, res, next) {
    console.info('-------------recharge.getList--------------');
    let limit = req.query.limit;
    let page = req.query.page;
    let uid = req.query.uid;
    let channel = req.query.channel;
    let serverid = req.query.serverid;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;
    let time = req.query.time;      // 前端发过来的是一个数组[starttime, endtime] ， 备用

    let data = {};
    let connection = db.connection();
    let sql = "SELECT * FROM player_charge_rmb where ";


    // console.info('starttime:'+starttime);
    // console.info('endtime:'+endtime);
    if (starttime !== '' && endtime !== ''&& starttime!== "0-0-0 0:0:" && endtime!== "0-0-0 0:0:" ) {
        sql += "time between '"+starttime+"' and '"+endtime+"'";
    }else{
        sql += "time between '2018-01-01' and '2019-01-01'"
    }
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