let db_mysql = require('../model/dbMysql');
let db_redis = require('../model/dbRedis');
let res_json = require('./utils/response_json');
let deepClone = require('./utils/deepClone');
let portia_shop = {};

//------------------------------------------------------------------------------------------------------
// 服务器列表
//------------------------------------------------------------------------------------------------------
portia_shop.list = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    // let serverip = req.query.serverip;
    // let gameid = req.query.gameid;

    let data = {};
    let connection = db_mysql.connection();

    let sql = "SELECT * FROM shopmall ";

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
portia_shop.add = function (req, res, next) {
    let id = req.query.id;
    let sellingway = req.query.sellingway;
    let recommend = req.query.recommend;
    let recommendactivity = req.query.recommendactivity;
    let price = req.query.price;
    let discountprice = req.query.discountprice;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;
    let gift = req.query.gift;

    let data = {};
    let connection = db_mysql.connection();
    let sql = "insert into shopmall (id, sellingway, recommend, recommendactivity, price, discountprice, starttime, endtime, gift) values ('"
        +id + "','"
        +sellingway + "','"
        +recommend + "','"
        +recommendactivity + "','"
        +price + "','"
        +discountprice + "','"
        +starttime + "','"
        +endtime + "','"
        +gift+"')";

    console.info(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[插入新用户  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result;
        res.send(res_json(true, data, "增加新商城信息"));
    });
};
//-------------------------修改信息----------------------------
portia_shop.change = function (req, res, next) {
    let id = req.query.id;
    let sellingway = req.query.sellingway;
    let recommend = req.query.recommend;
    let recommendactivity = req.query.recommendactivity;
    let price = req.query.price;
    let discountprice = req.query.discountprice;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;
    let gift = req.query.gift;

    let data = {};
    let connection = db_mysql.connection();
    let sql = "update shopmall set id = '"+ id+
        "', sellingway = '"+ sellingway +
        "', recommend = '"+ recommend +
        "', recommendactivity = '"+ recommendactivity +
        "', price = '"+ price +
        "', discountprice = '"+ discountprice +
        "', starttime = '"+ starttime +
        "', endtime = '"+ endtime +
        "', gift = '"+ gift +
        "' where id = '"+id+"'";
    console.info(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result;
        res.send(res_json(true, data, "修改商城信息"));
    });
};
//-------------------------删除信息----------------------------
portia_shop.del = function (req, res, next) {
    let id = req.query.id;
    let data = {};
    let connection = db_mysql.connection();
    let sql = "DELETE FROM shopmall WHERE id= '"+id+"' ";
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


module.exports = portia_shop;