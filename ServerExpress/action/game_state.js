let db = require('../model/db');
let res_json = require('./utils/response_json');
let deepClone = require('./utils/deepClone');
let game_state = {};

game_state.list = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    let serverip = req.query.serverip;
    let gameid = req.query.gameid;


    let data = {};
    let connection = db.connection();

    let sql = "SELECT * FROM game_state where true  ";

    // if (serverip !== '' || gameid !== '') {
    //     sql += "where "
    // }

    // 如果有服务器的ip
    if (serverip !== '') {
        sql += "and server_ip ='" + serverip + "'";
    }
    // 如果有game id
    if (gameid !== '') {
        sql += "and game_id =" + gameid + "";
    }
    // console.info('sql:'+sql);


    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT  ERROR] - ', err.message);
            res.send(res_json(false, "", "数据库错误！"));
            return;
        }
        data["items"] = result.slice(limit*(page-1),limit*page) ;
        data['total'] = result.length;
        res.send(res_json(true, data, "获取游戏状态信息"));
    });


};


module.exports = game_state;