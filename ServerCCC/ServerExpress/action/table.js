let db_mysql = require('../model/dbMysql');
let res_json = require('./utils/response_json');
let deepClone = require('./utils/deepClone');
let table = {};

table.list = function(req, res, next) {

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
table.list_article = function(req, res, next) {

    let data = {};
    let arrary = [];
    let item1 ={};

    item1['id'] = 1;
    item1['timestamp'] = '1970-01-04 07:34:40';
    item1['title'] = "Mjct Jikhaq";
    item1['type'] = "US";
    item1['importance'] = '2';
    item1['status'] = 'published';
    item1['author'] = 'fff';

    let item2 = deepClone(item1);
    item2['title'] = 'item2';
    item2['type'] = 'CN';
    let item3 = deepClone(item1);
    item3['title'] = 'item3';
    item3['type'] = 'EU';

    arrary.push(item2);
    arrary.push(item3);
    arrary.push(item1);
    data["items"] = arrary;


    res.send(res_json(true,data,"获取table数据"));

};


module.exports = table;