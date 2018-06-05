let db = require('../model/db');
let res_json = require('./utils/response_json');
let admin = {};


//-------------------------获取用户信息----------------------------
admin.getList = function (req, res, next) {
    let data = {};
    let connection = db.connection();
    let sql = "SELECT * FROM user ";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result;
        res.send(res_json(true, data, "获取所有用户信息"));
    });
};
//-------------------------增加用户信息----------------------------
admin.addUser = function (req, res, next) {
    let user_name = req.query.username;
    let user_pwd = req.query.pwd;
    let dashboard = Number(req.query.dashboard==='true');
    let statis = Number(req.query.statis==='true');
    let edit = Number(req.query.edit==='true');

    let data = {};
    let connection = db.connection();
    let sql = "insert into user (name,pwd,is_dashboard,is_statis,is_edit) values ('"+user_name+
        "','"+user_pwd+
        "','"+dashboard+
        "','"+statis+
        "','"+edit+ "')";
    console.info(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[插入新用户  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result;
        res.send(res_json(true, data, "插入新用户"));
    });
};
//-------------------------修改用户信息----------------------------
admin.changeUser = function (req, res, next) {
    let id = req.query.id;
    let user_name = req.query.username;
    let user_pwd = req.query.pwd;
    let dashboard = Number(req.query.dashboard==='true');
    let statis = Number(req.query.statis==='true');
    let edit = Number(req.query.edit==='true');

    let data = {};
    let connection = db.connection();
    let sql = "update user set name = '"+ user_name+
        "', pwd = '"+ user_pwd+
        "', is_dashboard = '"+ dashboard+
        "', is_statis = '"+ statis+
        "', is_edit = '"+ edit+
        "' where id = '"+id+"'";
    console.info(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result;
        res.send(res_json(true, data, "修改用户信息"));
    });
};
//-------------------------删除用户信息----------------------------
admin.delUser = function (req, res, next) {
    let id = req.query.id;
    let data = {};
    let connection = db.connection();
    let sql = "DELETE FROM user WHERE id= '"+id+"' ";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[删除  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result;
        res.send(res_json(true, data, "删除用户信息"));
    });
};

module.exports = admin;