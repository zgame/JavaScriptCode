let dbRedis = require('../model/dbRedis');
let res_json = require('./utils/response_json');
let deepClone = require('./utils/deepClone');
let server_state = {};

server_state.list = function(req, res, next) {

    // console.log("server_state.list")
    let conn = dbRedis.connection()
    dbRedis.hset(conn,"hello1", "ss","vv")
    dbRedis.hget(conn,"hello1", "ss")

    let data = {};
    let arrary = [];
    let item1 ={};
    item1['id'] = 123;
    item1['title'] = "dddd";
    item1['status'] = "sdf";
    item1['author'] = 'fff';
    item1['display_time'] = '2008-08-07 08:01:02';
    item1['pageviews'] = 123;

    let item2 = deepClone(item1);
    item2['title'] = 'item2';
    item2['pageviews'] = 22;
    let item3 = deepClone(item2);
    item3['title'] = 'item3';
    item3['pageviews'] = 232;
    item3['status'] = '55';

    arrary.push(item2);
    arrary.push(item3);

    item1['author'] = "zsw";
    arrary.push(item1);
    data["items"] = arrary;


    res.send(res_json(true,data,"获取table数据"));
};


module.exports = server_state;