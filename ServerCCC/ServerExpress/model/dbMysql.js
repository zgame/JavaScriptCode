let mysql = require('mysql');
let dbMysql = {}

//插入操作，注意使用异步返回查询结果
dbMysql.insert = function (connection, sql, paras, callback) {
    connection.query(sql, paras, function (error, results, fields) {
        if (error) throw error;
        callback(results.insertId);//返回插入的id
    });
};

//关闭数据库
dbMysql.close = function (connection) {
    //关闭连接
    connection.end(function (err) {
        if (err) {
            // return;
            console.log('关闭连接出错');
        } else {
            // console.log('关闭连接');
        }
    });
};

//获取数据库连接
dbMysql.connection = function () {
    //数据库配置
    let connection = mysql.createConnection({
        host: '192.168.0.207',
        user: 'root',
        password: 'brQqIpRZ',
        database: 'game_tb',
        port: 3307
    });
    //数据库连接
    connection.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    return connection;
};
module.exports = dbMysql;