let redis = require('redis')
let dbRedis = {}

//-----------------连接部分-----------------------
dbRedis.connection = function () {
    let client = redis.createClient(6382, '192.168.101.94')
    client.auth('123456',function () {
    // console.log("pwd ok")
    });

    return client
};

dbRedis.closeRedis = function(client){
    client.quit();
};

//--------------------哈希部分----------------------------
dbRedis.hset = function(client,dir,key,value){
    client.hset(dir,key,value.toString())
};

dbRedis.hget = function(client,dir,key, callback){
    client.hget(dir,key, function(err, value){
        // console.log("value:      ",value);
        if (err!==null) {
            console.log("err", err);
        }else {
            callback(value);
        }
    })

    // client.keys('All*',function (err,value){
    //     console.log("keys:      ",value)
    // })
};
// ------------------------集合部分-------------------------------
dbRedis.smembers = function(client,dir,callback){
    client.smembers(dir,function (err,value) {
        if (err!==null) {
            console.log("err", err);
        }else {
            callback(value);
        }
    })
};

dbRedis.sismember = function(client,dir,key,callback){
    client.sismember(dir,key,function (err,value) {
        if (err!==null) {
            console.log("err", err);
        }else {
            callback(value);
        }
    })
};

dbRedis.sadd = function(client,dir,key,callback){
    client.sadd(dir,key,function (err,value) {
        if (err!==null) {
            console.log("err", err);
        }else {
            callback(value);
        }
    })
};

dbRedis.srem = function(client,dir,key,callback){
    client.srem(dir,key,function (err,value) {
        if (err!==null) {
            console.log("err", err);
        }else {
            callback(value);
        }
    })
};


//---------------------------list部分--------------------------------
dbRedis.lrange = function(client,dir,min,max,callback){
    client.lrange(dir,min,max,function (err,value) {
        if (err!==null) {
            console.log("err", err);
        }else {
            callback(value);
        }
    })
};
// 修改index位置上的元素
dbRedis.lset = function(client,dir,index,value,callback){
    client.lset(dir,index,value,function (err,value) {
        if (err!==null) {
            console.log("err", err);
        }else {
            callback(value);
        }
    })
};
// 添加到末尾
dbRedis.rpush = function(client,dir,value,callback){
    client.rpush(dir,value,function (err,value) {
        if (err!==null) {
            console.log("err", err);
        }else {
            callback(value);
        }
    })
};
// 移除所有等于value的元素
dbRedis.lrem = function(client,dir,index,value,callback){
    client.lrem(dir,index,value,function (err,value) {
        if (err!==null) {
            console.log("err", err);
        }else {
            callback(value);
        }
    })
};
//--------------------------------------------------------------------



module.exports = dbRedis;