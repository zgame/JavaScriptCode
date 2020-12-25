let db_mysql = require('../model/dbMysql');
let res_json = require('./utils/response_json');
let ztime = require('./utils/currentTime');
let tb_server_state = {};

tb_server_state.list = function(req, res, next) {

    let limit =  req.query.limit;
    let page =  req.query.page;
    let serverid = req.query.serverid;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;


    let data = {};
    let connection = db_mysql.connection();
    let sql = "SELECT * FROM state_server where ";

    // console.info('starttime:'+starttime);
    // console.info('endtime:'+endtime);
    // 如果有时间的参数
    if (starttime !== '' && endtime !== '' && starttime!== "0-0-0 0:0:" && endtime!== "0-0-0 0:0:" ) {
        sql += "time between '"+starttime+"' and '"+endtime+"'";
    }else{
        sql += "time between '" +ztime.ToDay()+"' and '"+ ztime.Tomorrow()+"'"
        // sql += "time between '2018-01-01' and '2019-01-01'"
    }
    // 如果有服务器的ip
    if (serverid !== '') {
        sql += "and server_ip ='" + serverid + "'";
    }

    sql += " limit 1000";
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
        res.send(res_json(true, data, "获取服务器状态信息"));
    });


};


module.exports = tb_server_state;