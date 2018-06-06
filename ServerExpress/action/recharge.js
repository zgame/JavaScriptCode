let db = require('../model/db');
let res_json = require('./utils/response_json');
let recharge = {};


//-------------------------获取充值信息----------------------------
recharge.getList = function (req, res, next) {
    let limit = req.query.limit;
    let page = req.query.page;
    let data = {};
    let connection = db.connection();
    let sql = "SELECT * FROM player_charge_rmb where time between '2018-01-01 00:00:00' and '2019-01-01 00:00:00'";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit*(page-1),limit*page) ;
        data['total'] = result.length;
        res.send(res_json(true, data, "获取所有用户信息"));
    });
};


module.exports = recharge;