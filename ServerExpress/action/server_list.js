let db = require('../model/db');
let res_json = require('./utils/response_json');
let deepClone = require('./utils/deepClone');
let server_list = {};

server_list.list = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    // let serverip = req.query.serverip;
    // let gameid = req.query.gameid;

    let data = {};
    let connection = db.connection();

    let sql = "SELECT * FROM server_list ";

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
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit*(page-1),limit*page) ;
        data['total'] = result.length;
        res.send(res_json(true, data, "获取服务器列表"));
    });
};

//-------------------------增加信息----------------------------
server_list.add = function (req, res, next) {
    let user_name = req.query.name;
    let server = req.query.server;

    let data = {};
    let connection = db.connection();
    let sql = "insert into server_list (server_name,server_ip) values ('"+user_name+   "','"+server+"')";

    console.info(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[插入新用户  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result;
        res.send(res_json(true, data, "增加新服务器"));
    });
};
//-------------------------修改信息----------------------------
server_list.change = function (req, res, next) {
    let id = req.query.id;
    let user_name = req.query.name;
    let server = req.query.server;
    let server_state = req.query.state;

    let data = {};
    let connection = db.connection();
    let sql = "update server_list set server_name = '"+ user_name+
        "', server_ip = '"+ server +
        "', server_state = "+ server_state +
        " where id = '"+id+"'";
    console.info(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result;
        res.send(res_json(true, data, "修改服务器信息"));
    });
};
//-------------------------删除信息----------------------------
server_list.del = function (req, res, next) {
    let id = req.query.id;
    let data = {};
    let connection = db.connection();
    let sql = "DELETE FROM server_list WHERE id= '"+id+"' ";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[删除  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result;
        res.send(res_json(true, data, "删除服务器列表信息"));
    });
};



module.exports = server_list;