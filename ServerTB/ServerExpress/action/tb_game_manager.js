let db_mysql = require('../model/dbMysql');
let db_redis = require('../model/dbRedis');
let res_json = require('./utils/response_json');
let deepClone = require('./utils/deepClone');
let cTime = require('./utils/currentTime');
let tb_game_manager = {};


//------------------------------------------------------------------------------------------------------
// 获得游戏公告
//------------------------------------------------------------------------------------------------------
tb_game_manager.getNotice = function(req, res, next) {
    let data = {};
    let connection = db_redis.connection();
    db_redis.hget(connection,"TB:TB_GameManager:GameNotice","GameNotice" , function (notice) {
        data["items"] = notice;
        data['total'] = 1;
        res.send(res_json(true, data, "获取公告"));
        db_redis.closeRedis(connection);
    }) ;
};
// 设置游戏公告
tb_game_manager.setNotice = function(req, res, next) {
    let notice = req.query.notice;
    let data = {};
    let connection = db_redis.connection();
    db_redis.hset(connection, "TB:TB_GameManager:GameNotice", "GameNotice", notice);
    data["items"] = notice;
    data['total'] = 1;
    res.send(res_json(true, data, "保存公告"));
    db_redis.closeRedis(connection);
};

//------------------------------------------------------------------------------------------------------
// 封号玩家列表 ,  封号这个只涉及到玩家UID，并且不能重复封号，所以采用redis的集合
//------------------------------------------------------------------------------------------------------
tb_game_manager.getConfineList = function(req, res, next) {
    let limit = req.query.limit;
    let page = req.query.page;
    let data = {};
    let connection = db_redis.connection();
    db_redis.smembers(connection,"TB:TB_GameManager:GameConfine", function (list) {
        // console.log("confine list: ",typeof  list);
        // console.log("confine list: ",list);
        data["items"] = list.slice(limit * (page - 1), limit * page);
        data['total'] = list.length;
        res.send(res_json(true, data, "获取封号列表"));
        db_redis.closeRedis(connection);
    }) ;
};
// 查询单个封号玩家
tb_game_manager.getConfine = function(req, res, next) {
    let userId = req.query.userId;
    let data = {};
    let connection = db_redis.connection();
    db_redis.sismember( connection,"TB:TB_GameManager:GameConfine", userId ,function (result) {
        data["items"] = result;
        data['total'] = 1;
        res.send(res_json(true, data, "查询玩家封号"));
        db_redis.closeRedis(connection);
    } );
};
// 封号这个玩家
tb_game_manager.setConfine = function(req, res, next) {
    let userId = req.query.userId;
    let data = {};
    let connection = db_redis.connection();
    db_redis.sadd(connection,"TB:TB_GameManager:GameConfine",  userId, function (result) {
        data["items"] = result;
        data['total'] = 1;
        res.send(res_json(true, data, "封号"));
        db_redis.closeRedis(connection);
    });
};
// 解除封号玩家
tb_game_manager.delConfine = function(req, res, next) {
    let userId = req.query.userId;
    let data = {};
    let connection = db_redis.connection();
    db_redis.srem(connection,"TB:TB_GameManager:GameConfine",  userId, function (result) {
        data["items"] = result;
        data['total'] = 1;
        res.send(res_json(true, data, "解除封号"));
        db_redis.closeRedis(connection);
    });
};



//------------------------------------------------------------------------------------------------------
// 跑马灯 ， 因为每条记录需要增删改查，所以选用redis的list
//------------------------------------------------------------------------------------------------------
tb_game_manager.getTip = function(req, res, next) {
    let data = {};
    let connection = db_redis.connection();
    db_redis.lrange(connection,"TB:TB_GameManager:GameTip", 0,-1,function (list) {
        // console.log("confine list: ",typeof  list);
        // console.log("confine list: ",list);
        data["items"] = list;
        data['total'] = list.length;
        res.send(res_json(true, data, "获取跑马灯"));
        db_redis.closeRedis(connection);
    }) ;
};
// 增加跑马灯
tb_game_manager.addTip = function(req, res, next) {
    let tip = req.query.tip;
    // console.log("tip    ",tip);
    let data = {};
    let connection = db_redis.connection();
    db_redis.rpush(connection,"TB:TB_GameManager:GameTip", tip.toString(), function (result) {
        data["items"] = result;
        data['total'] = 1;
        res.send(res_json(true, data, "增加跑马灯"));
        db_redis.closeRedis(connection);
    });
};
// 修改跑马灯
tb_game_manager.setTip = function(req, res, next) {
    let index = req.query.index;
    let tip = req.query.tip;
    let data = {};
    let connection = db_redis.connection();
    db_redis.lset(connection,"TB:TB_GameManager:GameTip", index ,  tip.toString(), function (result) {
        data["items"] = result;
        data['total'] = result.length;
        res.send(res_json(true, data, "修改跑马灯"));
        db_redis.closeRedis(connection);
    });
};
// 删除跑马灯记录
tb_game_manager.delTip = function(req, res, next) {
    let tip = req.query.tip;
    let data = {};
    let connection = db_redis.connection();
    db_redis.lrem(connection,"TB:TB_GameManager:GameTip",  0,tip, function (result) {
        data["items"] = result;
        data['total'] = result.length;
        res.send(res_json(true, data, "删除跑马灯"));
        db_redis.closeRedis(connection);
    });
};


//------------------------------------------------------------------------------------------------------
// 邮件 ， 因为每条记录需要增删改查，所以选用redis的list
//------------------------------------------------------------------------------------------------------
tb_game_manager.getMail = function(req, res, next) {
    let data = {};
    let connection = db_redis.connection();
    db_redis.lrange(connection,"TB:TB_GameManager:GameMail", 0,-1,function (list) {
        // console.log("confine list: ",typeof  list);
        // console.log("confine list: ",list);
        data["items"] = list;
        data['total'] = list.length;
        res.send(res_json(true, data, "获取邮件"));
        db_redis.closeRedis(connection);
    }) ;
};

// 日志记录
function LogRecordUserAction(roles, content, type) {
    let sql = "insert into user_log_statistic (user,action,content,time) values ('" + roles +
        "','" +  type +
        "','" + content +
        "','" + cTime.CurrentTime() + "')";
    // console.log(sql);
    let connection_mysql = db_mysql.connection();
    connection_mysql.query(sql, function (err, result) {
        db_mysql.close(connection_mysql);
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
        }
    });
}

// 增加邮件
tb_game_manager.addMail = function(req, res, next) {
    let mail = req.query.mail;
    let roles = req.query.roles;
    // console.log("who    ",roles);
    let data = {};
    let connection = db_redis.connection();
    db_redis.rpush(connection,"TB:TB_GameManager:GameMail", mail.toString(), function (result) {
        data["items"] = result;
        data['total'] = 1;
        res.send(res_json(true, data, "增加邮件"));
        db_redis.closeRedis(connection);
    });
    LogRecordUserAction(roles, mail.toString(), " 新增邮件 ");


};
// 修改邮件
tb_game_manager.setMail = function(req, res, next) {
    let index = req.query.index;
    let mail = req.query.mail;
    let roles = req.query.roles;
    let data = {};
    let connection = db_redis.connection();
    db_redis.lset(connection,"TB:TB_GameManager:GameMail", index ,  mail.toString(), function (result) {
        data["items"] = result;
        data['total'] = result.length;
        res.send(res_json(true, data, "修改邮件"));
        db_redis.closeRedis(connection);
    });
    LogRecordUserAction(roles, mail.toString(), " 修改邮件 ");
};
// 删除邮件
tb_game_manager.delMail = function(req, res, next) {
    let mail = req.query.mail;
    let roles = req.query.roles;
    let data = {};
    let connection = db_redis.connection();
    console.log("mail   ",mail);
    db_redis.lrem(connection,"TB:TB_GameManager:GameMail",  0, mail.toString(), function (result) {
        data["items"] = result;
        data['total'] = result.length;
        res.send(res_json(true, data, "删除邮件"));
        db_redis.closeRedis(connection);
    });
    LogRecordUserAction(roles, mail.toString(), " 删除邮件 ");
};



//------------------------------------------------------------------------------------------------------
// Ip白名单 ， 不能重复Ip，所以采用redis的集合
//------------------------------------------------------------------------------------------------------
tb_game_manager.getIp = function(req, res, next) {
    let data = {};
    let connection = db_redis.connection();
    db_redis.smembers(connection,"TB:TB_GameManager:GameWhiteIp", function (list) {
        data["items"] = list;
        data['total'] = list.length;
        res.send(res_json(true, data, "获取IP"));
        db_redis.closeRedis(connection);
    }) ;
};
// 增加
tb_game_manager.addIp = function(req, res, next) {
    let ip = req.query.ip;
    // console.log("tip    ",tip);
    let data = {};
    let connection = db_redis.connection();
    db_redis.sadd(connection,"TB:TB_GameManager:GameWhiteIp",  ip, function (result) {
        data["items"] = result;
        data['total'] = 1;
        res.send(res_json(true, data, "增加ip"));
        db_redis.closeRedis(connection);
    });
};
// 删除
tb_game_manager.delIp = function(req, res, next) {
    let ip = req.query.ip;
    let data = {};
    let connection = db_redis.connection();
    // console.log("mail   ",mail);
    db_redis.srem(connection,"TB:TB_GameManager:GameWhiteIp",  ip, function (result) {
        data["items"] = result;
        data['total'] = result.length;
        res.send(res_json(true, data, "删除ip"));
        db_redis.closeRedis(connection);
    });
};







module.exports = tb_game_manager;