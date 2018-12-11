let db = require('../model/db');
let res_json = require('./utils/response_json');
let deepClone = require('./utils/deepClone');
let server_state = {};

server_state.list = function(req, res, next) {

    let limit = req.query.limit;
    let page = req.query.page;
    let data = {};
    let connection = db.connection();
    let sql = "SELECT * FROM game_state ";
    connection.query(sql, function (err, result) {
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


module.exports = server_state;