let db_mysql = require('../model/dbMysql');
let db_redis = require('../model/dbRedis');
let res_json = require('./utils/response_json');
let deepClone = require('./utils/deepClone');
let portia_control = {};

//------------------------------------------------------------------------------------------------------
// 服务器列表
//------------------------------------------------------------------------------------------------------
portia_control.list = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    // let serverip = req.query.serverip;
    // let gameid = req.query.gameid;

    let data = {};
    let connection = db_mysql.connection();

    let sql = "SELECT * FROM admin_control ";

    // if (serverip !== '' || gameid !== '') {
    //     sql += "where "
    // }

    // // 如果有服务器的ip
    // if (serverip !== '') {
    //     sql += "and server_ip ='" + serverip + "'";
    // }
    // // 如果有game id
    // if (gameid !== '') {
    //     sql += "and game_id =" + gameid + "";
    // }
    // console.info('sql:'+sql);


    connection.query(sql, function (err, result) {
        db_mysql.close(connection);
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit*(page-1),limit*page) ;
        data['total'] = result.length;
        res.send(res_json(true, data, "获取商城列表"));
    });
};

//-------------------------增加信息----------------------------
portia_control.add = function (req, res, next) {
    let id = req.query.id;
    let name = req.query.name;
    let value = req.query.value;


    let data = {};
    let connection = db_mysql.connection();
    let sql = "insert into admin_control (id, name, value) values ('"
        +id + "','"
        +name + "','"
        +value+"')";

    console.info(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[插入新用户  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"+err.message));
            return;
        }
        data["items"] = result;
        res.send(res_json(true, data, "增加新商城信息"));
    });
};
//-------------------------修改信息----------------------------
portia_control.change = function (req, res, next) {
    let id = req.query.id;
    let name = req.query.name;
    let value = req.query.value;


    let data = {};
    let connection = db_mysql.connection();
    let sql = "update admin_control set id = '"+ id+
        "', name = '"+ name +
        "', value = '"+ value +
        // "', recommendactivity = '"+ recommendactivity +
        // "', price = '"+ price +
        // "', discountprice = '"+ discountprice +
        // "', starttime = '"+ starttime +
        // "', endtime = '"+ endtime +
        "' where id = '"+id+"'";
    console.info(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"+err.message));
            return;
        }
        data["items"] = result;
        res.send(res_json(true, data, "修改商城信息"));
    });
};
//-------------------------删除信息----------------------------
portia_control.del = function (req, res, next) {
    let id = req.query.id;
    let data = {};
    let connection = db_mysql.connection();
    let sql = "DELETE FROM admin_control WHERE id= '"+id+"' ";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[删除  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result;
        res.send(res_json(true, data, "删除商城列表信息"));
    });
};


module.exports = portia_control;