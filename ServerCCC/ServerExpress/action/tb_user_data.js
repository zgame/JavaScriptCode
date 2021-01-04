let db_redis = require('../model/dbRedis');
let db_mysql = require('../model/dbMysql');
let db_mongo = require('../model/dbMongo');
let res_json = require('./utils/response_json');
let deepClone = require('./utils/deepClone');
let tb_user_data = {};

//------------------------------------------------------------------------------------------------------
// 玩家数据
//------------------------------------------------------------------------------------------------------

tb_user_data.getUser = function (req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    let userId = req.query.userId;

    let data = {};
    function returnError() {
        data["items"] = [];
        data['total'] = 0;
        res.send(res_json(true, data, "没有玩家数据"));
    }

    // 输入玩家id
    if (userId === "") {
        returnError();
        return;
    }

    db_mongo.find(userId,"User",{"userId": Number(userId) },function (user_data){


    console.log(user_data)
    // let connection = db_redis.connection();
    // TB:TB_AllPlayers:1000000001
    // db_redis.hget(connection,"TB:TB_AllPlayers:"+userId,userId , function (user_data) {
        if(user_data.length === 0){
            returnError();
            console.log("玩家uid不存在",userId);
            return;
        }

        console.log("type", typeof user_data);
        console.log("tb_user_data:", user_data[0]['userId']);
        // let user_data_struct = JSON.parse(user_data[0]);
        // console.log("struct " , user_data_struct["userId"]);

        data["items"] = user_data[0];
        data['total'] = 1;
        res.send(res_json(true, data, "玩家数据"));
        // db_redis.closeRedis(connection);
    }) ;




};

//------------------------------------------------------------------------------------------------------
// 玩家的历史记录
//------------------------------------------------------------------------------------------------------

tb_user_data.logList = function (req, res, next) {
    let limit = req.query.limit;
    let page = req.query.page;
    let userId = req.query.userId;

    let starttime = req.query.starttime;
    let endtime = req.query.endtime;

    let data = {};
    let connection = db_mysql.connection();

    function returnError() {
        data["items"] = [];
        data['total'] = 0;
        res.send(res_json(true, data, "没有玩家数据"));
    };

    let sql = "";

    // 查询一下是否有这个玩家




    // 输入玩家id
    if (userId !== '') {
        sql += "SELECT * FROM log_user_" + userId + " where true";
    } else {
        // 默认的空id
        returnError();
        return;
    }
    if (starttime !== '' && endtime !== '' && starttime !== "0-0-0 0:0:" && endtime !== "0-0-0 0:0:") {
        sql += " and time between '" + starttime + "' and '" + endtime + "'";
    }else {
        sql += " limit 1000";
    }
    console.info('sql:' + sql);

    connection.query(sql, function (err, result) {
        db_mysql.close(connection);
        // console.info("查询开始",result);
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            returnError();
            return;
        }

        data["items"] = result.slice(limit * (page - 1), limit * page);
        data['total'] = result.length;
        res.send(res_json(true, data, "获取玩家日志"));
    });
};


module.exports = tb_user_data;