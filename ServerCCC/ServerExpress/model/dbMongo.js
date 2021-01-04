let MongoClient = require('mongodb').MongoClient;
let dbMongo = {}
let url = "mongodb://patheaDev:LncDnQaR502NWaFdCVXMeKacglgnf3@47.92.150.31:27017/";


dbMongo.find = function (uId, collection, condition,callback) {
    MongoClient.connect(url,{useUnifiedTopology: true}).then((conn) => {
        // console.log("数据库已连接");
        let dbase = conn.db("sandrock").collection(collection);
        dbase.find(condition).toArray().then((arr) => {
            // console.log(arr);
            callback(arr)
        }).catch((err) => {
            console.log("mongo db 返回函数错误"+ err.toString());
        }).finally(() => {
            conn.close().then(r => {
            });
        });
    }).catch((err) => {
        console.log("数据库连接失败"+err.toString());
    });

};

module.exports = dbMongo;